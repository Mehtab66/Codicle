import { Button } from "./components/ui/Button";
import { Card, CardContent } from "./components/ui/Card";
import { Badge } from "./components/ui/Badge";
import {
  Code2,
  Users,
  MessageCircle,
  Heart,
  BookOpen,
  TrendingUp,
  Star,
  GitBranch,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Codicle
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className={` {inter.className} text-gray-600 hover:text-gray-900 transition-colors`}
            >
              Features
            </Link>
            <Link
              href="#community"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Community
            </Link>
            <Link
              href="#pricing"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Pricing
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-700 hover:bg-purple-200"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  Join 50K+ Developers
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Where Developers
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {" "}
                    Connect{" "}
                  </span>
                  & Grow
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Share insightful articles, follow fellow coders, and engage
                  with the community. Build your developer presence and explore
                  new ideas in our collaborative platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Start Writing Today
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 bg-transparent"
                >
                  Explore Articles
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600">Developers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">100K+</div>
                  <div className="text-sm text-gray-600">Articles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">1M+</div>
                  <div className="text-sm text-gray-600">Interactions</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <Card className="p-6 bg-white shadow-xl border-0">
                  <CardContent className="p-0 space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          JS
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold">Sarah Chen</div>
                        <div className="text-sm text-gray-500">@sarahcodes</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Building Scalable React Applications
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Learn the best practices for structuring large React
                        applications with proper state management...
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>124</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>23</span>
                        </div>
                      </div>
                      <Badge variant="secondary">React</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Features
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Everything You Need to Grow as a Developer
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From writing articles to building connections, Codicle provides
              all the tools you need to thrive in the developer community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Write & Share Articles
                </h3>
                <p className="text-gray-600">
                  Create insightful technical articles with our powerful editor.
                  Share your knowledge and help others learn.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Follow Developers
                </h3>
                <p className="text-gray-600">
                  Connect with like-minded developers, follow their journey, and
                  stay updated with their latest content.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Engage & Discuss</h3>
                <p className="text-gray-600">
                  Like, comment, and engage in meaningful discussions. Build
                  relationships through thoughtful interactions.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Trending Topics</h3>
                <p className="text-gray-600">
                  Discover what's trending in the developer community and stay
                  ahead of the latest technologies.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
                  <GitBranch className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Code Collaboration
                </h3>
                <p className="text-gray-600">
                  Share code snippets, collaborate on projects, and learn from
                  the community's collective knowledge.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-violet-600 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Safe Environment</h3>
                <p className="text-gray-600">
                  Enjoy a respectful, moderated community where constructive
                  feedback and learning are prioritized.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section
        id="community"
        className="py-20 bg-gradient-to-r from-purple-600 to-pink-600"
      >
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Join a Thriving Developer Community
            </h2>
            <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">
              Connect with developers from around the world and be part of
              something bigger.
            </p>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">50K+</div>
                <div className="opacity-90">Active Developers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">100K+</div>
                <div className="opacity-90">Articles Published</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">500K+</div>
                <div className="opacity-90">Comments & Likes</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">150+</div>
                <div className="opacity-90">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Testimonials
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Loved by Developers Worldwide
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 border-0 shadow-md">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Codicle has transformed how I share knowledge and connect
                  with other developers. The community is incredibly
                  supportive!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold text-sm">AK</span>
                  </div>
                  <div>
                    <div className="font-semibold">Alex Kim</div>
                    <div className="text-sm text-gray-500">
                      Senior Frontend Developer
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-md">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The quality of articles and discussions on Codicle is
                  outstanding. It's become my go-to platform for learning."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold text-sm">MR</span>
                  </div>
                  <div>
                    <div className="font-semibold">Maria Rodriguez</div>
                    <div className="text-sm text-gray-500">
                      Full Stack Developer
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-md">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "I've built meaningful connections and learned so much from
                  the Codicle community. Highly recommended!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold text-sm">DJ</span>
                  </div>
                  <div>
                    <div className="font-semibold">David Johnson</div>
                    <div className="text-sm text-gray-500">
                      Backend Engineer
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Join the Community?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Start sharing your knowledge, connect with fellow developers, and
              grow your presence in the coding community today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Get Started for Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 bg-transparent"
              >
                Learn More
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-6 mt-8 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Free to join
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Start writing immediately
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Codicle</span>
              </div>
              <p className="text-gray-400 mb-4">
                Where developers connect, share knowledge, and grow together.
              </p>
              <div className="flex space-x-4">
                <Globe className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <GitBranch className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Write Articles
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Explore Content
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Trending
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    API Docs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Codicle. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
