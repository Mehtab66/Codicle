import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "../../../libs/mongoDb";
import User from "../../../models/UserModel";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        name: { label: "Full Name", type: "text" },
        isSignUp: { label: "Is Sign Up", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error("Authorize: Missing email or password", {
            credentials,
          });
          throw new Error("Email and password are required");
        }

        try {
          await connectDB();

          if (credentials.isSignUp === "true") {
            // Validate name for signup
            if (!credentials.name || credentials.name.trim() === "") {
              console.error("Authorize: Missing or empty name for signup", {
                credentials,
              });
              throw new Error("Full name is required for signup");
            }

            const existingUser = await User.findOne({
              email: credentials.email,
            });
            if (existingUser) {
              console.error("Authorize: User already exists", {
                email: credentials.email,
              });
              throw new Error("User already exists");
            }

            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const user = new User({
              name: credentials.name.trim(),
              email: credentials.email.trim(),
              password: hashedPassword,
            });

            try {
              await user.save();
              console.log("Authorize: User created", {
                id: user._id,
                email: user.email,
                name: user.name,
              });
            } catch (saveError) {
              console.error("Authorize: Failed to save user", {
                error: saveError,
              });
              throw new Error("Failed to create user");
            }

            return {
              id: user._id.toString(),
              name: user.name ?? null,
              email: user.email ?? null,
            };
          } else {
            const user = await User.findOne({ email: credentials.email });
            if (!user || !user.password) {
              console.error("Authorize: No user found", {
                email: credentials.email,
              });
              throw new Error("No user found with this email");
            }

            const isValid = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (!isValid) {
              console.error("Authorize: Invalid password", {
                email: credentials.email,
              });
              throw new Error("Invalid password");
            }

            console.log("Authorize: User authenticated", {
              id: user._id,
              email: user.email,
              name: user.name,
            });
            return {
              id: user._id.toString(),
              name: user.name ?? null,
              email: user.email ?? null,
            };
          }
        } catch (error) {
          console.error("Authorize: Error", { error });
          throw error instanceof Error
            ? error
            : new Error("Authentication failed");
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      try {
        if (user) {
          token.id = user.id ?? "";
            token.name = user.name ?? undefined;
          token.email = user.email ?? null;
          console.log("JWT: Token updated with user data", { token, user });
        }
        if (account?.provider === "github") {
          await connectDB();
          let dbUser = await User.findOne({ email: token.email });
          if (!dbUser) {
            dbUser = new User({
              name: token.name ?? "",
              email: token.email ?? "",
              image: user.image ?? null,
            });
            try {
              await dbUser.save();
              console.log("JWT: GitHub user created", {
                id: dbUser._id,
                email: dbUser.email,
                name: dbUser.name,
              });
            } catch (saveError) {
              console.error("JWT: Failed to save GitHub user", {
                error: saveError,
              });
              throw new Error("Failed to create GitHub user");
            }
          }
          token.id = dbUser._id.toString();
          token.name = dbUser.name ?? undefined;
          console.log("JWT: Token updated for GitHub", { token });
        }
        return token;
      } catch (error) {
        console.error("JWT: Error", { error });
        throw error instanceof Error ? error : new Error("JWT callback failed");
      }
    },
    async session({ session, token }) {
      try {
        if (session.user && token.id) {
          session.user.id = token.id;
          session.user.name = token.name ?? undefined;
          session.user.email = token.email ?? null;
          console.log("Session: Updated session", { session, token });
        } else {
          console.error("Session: Invalid token or session", {
            token,
            session,
          });
          throw new Error("Invalid token or session");
        }
        return session;
      } catch (error) {
        console.error("Session: Error", { error });
        throw error instanceof Error
          ? error
          : new Error("Session callback failed");
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
