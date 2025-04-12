"use client";
import React from 'react';
import { Mail, Linkedin, Instagram, Twitter, Code, Users, BarChart, Lock, Sparkles, ArrowRight, BookOpen, Globe, Search, Award, Terminal, FileCode, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from '@/context/ThemeContext';
import { GitHub } from 'react-feather';

const AboutPage = () => {
  const { isDarkMode } = useTheme();

  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-blue-500 dark:text-blue-400" />,
      emoji: "📝",
      title: "Smart Blog Editor",
      description: "Create content with Markdown, Visual & Raw HTML editors, with auto-generated tags and SEO suggestions."
    },
    {
      icon: <BarChart className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />,
      emoji: "📊",
      title: "Author Dashboard",
      description: "Track your blogs, views, drafts, and monitor Google indexing status all in one place."
    },
    {
      icon: <Users className="w-8 h-8 text-green-500 dark:text-green-400" />,
      emoji: "👤",
      title: "Author Portfolio",
      description: "Get your own public profile link that showcases your content and gets indexed by search engines."
    },
    {
      icon: <Terminal className="w-8 h-8 text-amber-500 dark:text-amber-400" />,
      emoji: "🔧",
      title: "Developer Tools",
      description: "Access built-in code formatter, markdown previewer, API tester, and JSON/Regex tools."
    },
    {
      icon: <FileCode className="w-8 h-8 text-purple-500 dark:text-purple-400" />,
      emoji: "📚",
      title: "Cheatsheets & Interview Prep",
      description: "Access DSA, React, Git tutorials and real interview questions from top companies."
    },
    {
      icon: <Search className="w-8 h-8 text-red-500 dark:text-red-400" />,
      emoji: "🔍",
      title: "SEO & Indexing",
      description: "Submit blogs to Google Search Console with built-in SEO scoring and performance insights."
    },
    {
      icon: <Calendar className="w-8 h-8 text-teal-500 dark:text-teal-400" />,
      emoji: "🏆",
      title: "Events & Contests",
      description: "Participate in writing challenges, win recognition, and get featured across our platform."
    },
    {
      icon: <Code className="w-8 h-8 text-slate-500 dark:text-slate-400" />,
      emoji: "💻",
      title: "Developer-Focused",
      description: "Built specifically for developers, tech writers, and engineering students who want to share knowledge."
    }
  ];

  const audiences = [
    {
      title: "Engineering Students",
      description: "Document your learning journey, prepare for interviews, and build your portfolio even before graduation.",
      color: "bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-800/20 dark:to-indigo-800/20"
    },
    {
      title: "Professional Developers",
      description: "Share expertise, enhance your personal brand, and connect with like-minded tech professionals.",
      color: "bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-800/20 dark:to-pink-800/20"
    },
    {
      title: "Tech Writers & Educators",
      description: "Create impactful technical content with tools designed specifically for explaining complex concepts.",
      color: "bg-gradient-to-br from-amber-500/10 to-orange-500/10 dark:from-amber-800/20 dark:to-orange-800/20"
    },
    {
      title: "Job Seekers",
      description: "Showcase your knowledge, build a discoverable portfolio, and stand out to potential employers.",
      color: "bg-gradient-to-br from-green-500/10 to-teal-500/10 dark:from-green-800/20 dark:to-teal-800/20"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,transparent,black)] opacity-10"></div>
        <div className="container mx-auto px-4 py-16 sm:py-20 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 items-center">
            <div className="lg:col-span-3">
              <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30">
                For developers, by developers
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                Welcome to <span className="text-blue-600 dark:text-blue-400">DevBlogger</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl">
                A powerful blogging platform crafted especially for developers, tech writers, and engineering students.
                From cracking interviews to teaching the world what you've learned — DevBlogger is where your developer
                journey meets content creation.
              </p>
              <div className="mt-8 flex gap-4 flex-wrap">
                <Button size="lg" className="rounded-md bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
                  Start Writing <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-md border-gray-300 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                  Explore Blogs
                </Button>
              </div>
            </div>
            <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-2xl dark:shadow-blue-900/10 ring-1 ring-gray-200 dark:ring-gray-800">
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-gradient-to-tr from-blue-100 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30">
                <img
                  src="/logo.png"
                  alt="DevBlogger Platform - A blogging platform for developers"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-white dark:bg-gray-900 py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30">
              Our Mission
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Empowering Developers Through Content Creation
            </h2>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
              To empower every developer to share, showcase, and shine in the digital world through writing.
              We believe every dev has unique knowledge worth sharing, content deserves visibility—not just
              publication, and portfolios are more than resumes.
            </p>
            <div className="mt-10 flex justify-center">
              <div className="inline-flex items-center rounded-full px-6 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300">
                <span className="text-sm font-medium">Join over 10,000 developers today</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-gray-900 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30">
              What We Offer
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Powerful Tools for Developer Content Creators
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              DevBlogger provides all the tools and features you need to create, share, and grow your technical content.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="group overflow-hidden transition-all duration-300 border-transparent bg-white dark:bg-gray-800/50 hover:shadow-lg dark:hover:shadow-gray-800/10 dark:border-gray-800 hover:border-blue-100 dark:hover:border-blue-900/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center transition-colors group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30">
                      {feature.icon}
                    </div>
                    <span className="text-2xl opacity-70">{feature.emoji}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Target Audience Section */}
      <div className="bg-white dark:bg-gray-900 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30">
              Who We Serve
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Who is DevBlogger for?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Our platform serves technical professionals at every stage of their career journey.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {audiences.map((audience, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-900/50 ${audience.color}`}
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {audience.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {audience.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Built By Developers Section */}
      <div className="bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-gray-900 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/30">
                Our Story
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
                Built By & For Developers
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                DevBlogger was born from the needs of students and developers who wanted a better way to write,
                grow, and be seen online — without the noise of generic platforms. We're continuously evolving —
                adding new features, tools, and events tailored just for you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Founder Section */}
      <div className="bg-white dark:bg-gray-900 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/30">
                Leadership
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
                Meet the Founder
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                The passionate mind behind DevBlogger
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-7 gap-12 items-center">
              <div className="order-2 md:order-1 md:col-span-4">
                <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">Rohit Kumar Yadav</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  A passionate full-stack developer with expertise in modern web technologies. With a strong foundation
                  in React, Node.js, and cloud technologies, Rohit has dedicated himself to creating tools that help
                  developers grow and succeed.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  Beyond coding, he's an avid technical writer and mentor who believes in the power of sharing knowledge
                  and building communities. His vision for DevBlogger stems from his own journey learning to code and
                  wanting to create the platform he wished existed when he started.
                </p>
                <div className="flex gap-4 items-center flex-wrap">
                  <a
                    href="mailto:rohitkuyada@gmail.com"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors"
                    aria-label="Email Rohit Kumar Yadav"
                  >
                    <Mail size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rohitkumaryadav-rky/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors"
                    aria-label="Rohit Kumar Yadav on LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="https://instagram.com/rohit.ayadav"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors"
                    aria-label="Rohit Kumar Yadav on Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="https://github.com/rohitkumaryadav"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors"
                    aria-label="Rohit Kumar Yadav on GitHub"
                  >
                    <GitHub size={20} />
                  </a>
                  <a
                    href="https://twitter.com/rohitkumaryadav"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors"
                    aria-label="Rohit Kumar Yadav on Twitter"
                  >
                    <Twitter size={20} />
                  </a>
                </div>
              </div>
              <div className="order-1 md:order-2 md:col-span-3 flex justify-center">
                <div className="relative rounded-2xl overflow-hidden border-8 border-white dark:border-gray-800 shadow-xl dark:shadow-gray-900/30 w-64 h-64 sm:w-72 sm:h-72">
                  <img
                    src="/founder.jpg"
                    alt="Rohit Kumar Yadav - Founder of DevBlogger"
                    className="h-full w-full object-cover object-center transition-all duration-300 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-blue-200 dark:bg-grid-blue-900 [mask-image:linear-gradient(0deg,transparent,black)] opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30">
            Get Started
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Write your first blog. Share your portfolio. Get discovered.
            Start sharing your knowledge, connect with other developers, and build your online presence on a platform designed specifically for technical content creators.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="rounded-md text-base bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
              Create Your Account <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-md border-gray-300 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
              Explore Resources
            </Button>
          </div>
        </div>
      </div>

      {/* Connect Section */}
      <div className="bg-white dark:bg-gray-900 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30">
              Let's Connect
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-8">
              Join Our Community
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-slate-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Contact Information</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      <a href="https://devblogger.in" className="hover:text-blue-600 dark:hover:text-blue-400">devblogger.in</a>
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      <a href="mailto:support@devblogger.in" className="hover:text-blue-600 dark:hover:text-blue-400">support@devblogger.in</a>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Connect With Us</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Twitter className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700 dark:text-gray-300">Follow us on Twitter for daily resources</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Instagram className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      <a href="https://whatsapp.com/channel/0029VaVd6px8KMqnZk7qGJ2t" className="hover:text-blue-600 dark:hover:text-blue-400">Join our WhatsApp Channel</a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Enhancement - Hidden sections for SEO */}
      <div className="sr-only">
        <h2>DevBlogger - A Platform for Developer Content Creation</h2>
        <p>
          DevBlogger is the ultimate platform for developers, tech writers, and engineering students to create and share technical content.
          Features include a smart blog editor, author dashboard, public portfolio, developer tools, cheatsheets, interview prep resources,
          SEO services, and blogging events.
        </p>
        <p>
          Keywords: developer blog platform, tech writing, coding portfolio, engineering blog, developer community,
          programming tutorials, tech content creation, software engineering blogs, coding interview prep
        </p>
      </div>
    </div>
  );
};

export default AboutPage;