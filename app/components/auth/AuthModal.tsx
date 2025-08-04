"use client";

import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "signin" | "signup" | "forgot";
}

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = "signup",
}: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup" | "otp" | "forgot">(
    initialMode
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const validateForm = () => {
    if (mode === "signup") {
      if (
        !formData.email ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ) {
        setError("Please enter a valid email");
        return false;
      }
      if (!formData.password || formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        return false;
      }
      if (!formData.name) {
        setError("Full name is required");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return false;
      }
    } else if (mode === "otp") {
      if (!formData.otp || formData.otp.length !== 6) {
        setError("Please enter a valid 6-digit OTP");
        return false;
      }
    } else if (mode === "signin") {
      if (
        !formData.email ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ) {
        setError("Please enter a valid email");
        return false;
      }
      if (!formData.password || formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        return false;
      }
    } else if (mode === "forgot") {
      if (
        !formData.email ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ) {
        setError("Please enter a valid email");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      if (mode === "signup") {
        // Call API to generate and send OTP
        const response = await fetch("/api/auth/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            name: formData.name,
            password: formData.password,
          }),
        });

        const result = await response.json();
        if (!response.ok) {
          setError(result.error || "Failed to send OTP");
          setIsLoading(false);
          return;
        }

        // Switch to OTP verification mode
        setMode("otp");
      } else if (mode === "otp") {
        // Verify OTP and create user
        const response = await fetch("/api/auth/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            otp: formData.otp,
            name: formData.name,
            password: formData.password,
          }),
        });

        const result = await response.json();
        if (!response.ok) {
          setError(result.error || "Invalid or expired OTP");
          setIsLoading(false);
          return;
        }

        // OTP verified, proceed to sign in
        const signInResult = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
          name: formData.name,
          isSignUp: "true",
        });

        if (signInResult?.error) {
          setError(signInResult.error);
        } else {
          onClose();
          router.push("/");
        }
      } else if (mode === "signin") {
        // Signin mode
        const result = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
          isSignUp: "false",
        });

        if (result?.error) {
          setError(result.error);
        } else {
          onClose();
          router.push("/");
        }
      } else if (mode === "forgot") {
        // Forgot password: Send reset email
        const response = await fetch("/api/auth/forgetPassword", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        });

        const result = await response.json();
        if (!response.ok) {
          setError(result.error || "Failed to send reset email");
          setIsLoading(false);
          return;
        }

        // Show success message and close modal
        setError(null);
        alert("Password reset email sent. Please check your inbox.");
        onClose();
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubLogin = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await signIn("github", { callbackUrl: "/" });
    } catch (err) {
      setError("Failed to sign in with GitHub");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      otp: "",
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
    setError(null);
  };

  const switchMode = (newMode: "signin" | "signup" | "forgot") => {
    setMode(newMode);
    resetForm();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">C</span>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Codicle
                    </span>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {mode !== "otp" && (
                  <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                    <button
                      onClick={() => switchMode("signup")}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                        mode === "signup"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Sign Up
                    </button>
                    <button
                      onClick={() => switchMode("signin")}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                        mode === "signin"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Sign In
                    </button>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {mode === "signup"
                        ? "Create your account"
                        : mode === "otp"
                        ? "Verify OTP"
                        : mode === "forgot"
                        ? "Reset Password"
                        : "Welcome back"}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {mode === "signup"
                        ? "Join the developer community and start sharing your knowledge"
                        : mode === "otp"
                        ? "Enter the OTP sent to your email"
                        : mode === "forgot"
                        ? "Enter your email to receive a password reset link"
                        : "Sign in to your account to continue"}
                    </p>
                  </div>

                  {error && <div className="text-red-600 text-sm">{error}</div>}

                  {mode !== "otp" && (
                    <>
                      {mode === "signup" && (
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Full Name
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                              placeholder="Enter your full name"
                              required={mode === "signup"}
                            />
                          </div>
                        </div>
                      )}

                      {(mode === "signin" ||
                        mode === "signup" ||
                        mode === "forgot") && (
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                              placeholder="Enter your email"
                              required
                            />
                          </div>
                        </div>
                      )}

                      {(mode === "signin" || mode === "signup") && (
                        <div>
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Password
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type={showPassword ? "text" : "password"}
                              id="password"
                              name="password"
                              value={formData.password}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                              placeholder="Enter your password"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      )}

                      {mode === "signup" && (
                        <div>
                          <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Confirm Password
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              id="confirmPassword"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                              placeholder="Confirm your password"
                              required={mode === "signup"}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {mode === "otp" && (
                    <div>
                      <label
                        htmlFor="otp"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        OTP
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="otp"
                          name="otp"
                          value={formData.otp}
                          onChange={handleInputChange}
                          className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                          placeholder="Enter the 6-digit OTP"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {mode === "signin" && (
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => switchMode("forgot")}
                        className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {mode === "otp" && (
                    <div className="text-center mt-4">
                      <button
                        type="button"
                        onClick={async () => {
                          setIsLoading(true);
                          try {
                            const response = await fetch("/api/auth/send-otp", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                email: formData.email,
                                name: formData.name,
                                password: formData.password,
                              }),
                            });
                            const result = await response.json();
                            if (!response.ok) {
                              setError(result.error || "Failed to resend OTP");
                            } else {
                              setError(null);
                              alert("OTP resent successfully");
                            }
                          } catch (err) {
                            setError("Failed to resend OTP");
                          } finally {
                            setIsLoading(false);
                          }
                        }}
                        className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                        disabled={isLoading}
                      >
                        Resend OTP
                      </button>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2.5"
                  >
                    {isLoading
                      ? "Processing..."
                      : mode === "signup"
                      ? "Send OTP"
                      : mode === "otp"
                      ? "Verify OTP"
                      : mode === "forgot"
                      ? "Send Reset Link"
                      : "Sign In"}
                  </Button>

                  {mode === "signup" && (
                    <p className="text-xs text-gray-500 text-center">
                      By creating an account, you agree to our{" "}
                      <button className="text-purple-600 hover:text-purple-700 font-medium">
                        Terms of Service
                      </button>{" "}
                      and{" "}
                      <button className="text-purple-600 hover:text-purple-700 font-medium">
                        Privacy Policy
                      </button>
                    </p>
                  )}
                </form>

                {mode !== "otp" && mode !== "forgot" && (
                  <>
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <button
                        onClick={handleGitHubLogin}
                        disabled={isLoading}
                        className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span className="text-sm font-medium">
                          {isLoading ? "Processing..." : "GitHub"}
                        </span>
                      </button>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
