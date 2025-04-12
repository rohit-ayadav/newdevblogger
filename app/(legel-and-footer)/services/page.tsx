import React from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Code,
  FileCode,
  GitBranch,
  Users,
  BookOpen,
  TrendingUp,
  Terminal,
  CloudCog,
  FileText,
  Briefcase,
  PenTool,
  BarChart,
  LayoutDashboard
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Tool } from 'react-feather';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  ctaText: string;
}

interface ServiceCategoryProps {
  title: string;
  description: string;
  services: {
    icon: React.ReactNode;
    title: string;
    description: string;
    features: string[];
    ctaText: string;
  }[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features, ctaText }) => (
  <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
    <CardHeader>
      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="mb-4 text-gray-600 dark:text-gray-300">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Badge variant="secondary" className="mr-2">
              ✓
            </Badge>
            {feature}
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      <Button className="w-full">{ctaText}</Button>
    </CardFooter>
  </Card>
);

const ServiceCategory: React.FC<ServiceCategoryProps> = ({ title, description, services }) => (
  <div className="mb-16">
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {services.map((service, index) => (
        <ServiceCard key={index} {...service} />
      ))}
    </div>
  </div>
);

const ServicesPage = () => {
  const serviceCategories = [
    {
      title: "🛠️ Developer Tools",
      description: "A curated set of tools made for developers to help streamline coding, blogging, and productivity.",
      services: [
        {
          icon: <Code className="text-white" size={24} />,
          title: "Markdown Previewer",
          description: "Write and preview markdown in real-time with syntax highlighting and custom themes.",
          features: ["Live preview", "Syntax highlighting", "Export to HTML/PDF"],
          ctaText: "Try Previewer"
        },
        {
          icon: <Tool className="text-white" size={24} />,
          title: "Code Formatter",
          description: "Automatically format your code according to popular style guides and custom rules.",
          features: ["Multiple language support", "Custom rules", "One-click formatting"],
          ctaText: "Format Code"
        },
        {
          icon: <Terminal className="text-white" size={24} />,
          title: "API Tester",
          description: "Test API endpoints with customizable requests and view formatted responses.",
          features: ["Request builder", "Response analyzer", "Authentication support"],
          ctaText: "Test APIs"
        },
        {
          icon: <FileCode className="text-white" size={24} />,
          title: "JSON Formatter",
          description: "Format, validate, and visualize JSON data with advanced tree view options.",
          features: ["Syntax validation", "Tree visualization", "One-click copying"],
          ctaText: "Format JSON"
        },
        {
          icon: <Code className="text-white" size={24} />,
          title: "RegEx Tester",
          description: "Build and test regular expressions with real-time matching and explanation.",
          features: ["Live testing", "Pattern explanation", "Common patterns library"],
          ctaText: "Test RegEx"
        }
      ]
    },
    {
      title: "📄 Cheatsheets",
      description: "Quick-access reference sheets for devs and learners.",
      services: [
        {
          icon: <FileText className="text-white" size={24} />,
          title: "DSA Cheatsheet",
          description: "Comprehensive data structures and algorithms reference with code examples.",
          features: ["Time complexity guides", "Implementation examples", "Problem-solving patterns"],
          ctaText: "View DSA Cheatsheet"
        },
        {
          icon: <FileText className="text-white" size={24} />,
          title: "React JS Cheatsheet",
          description: "Essential React concepts, hooks, and patterns for quick reference.",
          features: ["Hooks reference", "Component patterns", "Best practices"],
          ctaText: "View React Cheatsheet"
        },
        {
          icon: <FileText className="text-white" size={24} />,
          title: "Node.js & Express Cheatsheet",
          description: "Quick reference for Node.js features and Express framework patterns.",
          features: ["Common APIs", "Middleware patterns", "Error handling"],
          ctaText: "View Node.js Cheatsheet"
        },
        {
          icon: <FileText className="text-white" size={24} />,
          title: "System Design Summary",
          description: "Key principles and patterns for designing scalable systems and applications.",
          features: ["Architecture patterns", "Scaling strategies", "Case studies"],
          ctaText: "View System Design"
        },
        {
          icon: <GitBranch className="text-white" size={24} />,
          title: "Git & GitHub Commands",
          description: "Essential Git commands and GitHub workflow reference for developers.",
          features: ["Common workflows", "Advanced commands", "Troubleshooting help"],
          ctaText: "View Git Cheatsheet"
        }
      ]
    },
    {
      title: "💼 Interview Questions",
      description: "Prepare with real-world questions.",
      services: [
        {
          icon: <Briefcase className="text-white" size={24} />,
          title: "DSA Interview Sets",
          description: "Curated sets of data structure and algorithm questions from easy to hard.",
          features: ["Difficulty levels", "Solution approaches", "Time/space complexity analysis"],
          ctaText: "Practice DSA"
        },
        {
          icon: <Briefcase className="text-white" size={24} />,
          title: "Core CS Subjects",
          description: "Interview questions covering OS, DBMS, Computer Networks, and OOP concepts.",
          features: ["Subject-wise organization", "Quick revision notes", "Commonly asked questions"],
          ctaText: "Review Core CS"
        },
        {
          icon: <Users className="text-white" size={24} />,
          title: "HR & Behavioral Rounds",
          description: "Prepare for non-technical interviews with common questions and response strategies.",
          features: ["STAR method examples", "Situational questions", "Response frameworks"],
          ctaText: "Prepare Behavioral"
        },
        {
          icon: <Briefcase className="text-white" size={24} />,
          title: "Company-wise Questions",
          description: "Coding questions frequently asked in interviews at top tech companies.",
          features: ["Company-specific patterns", "Recent questions", "Difficulty analysis"],
          ctaText: "Explore Company Questions"
        }
      ]
    },
    {
      title: "✍️ Blog Writing Assistance",
      description: "Make writing easy and effective.",
      services: [
        {
          icon: <PenTool className="text-white" size={24} />,
          title: "AI-powered SEO Title Generator",
          description: "Generate engaging, SEO-optimized titles for your technical blog posts.",
          features: ["Keyword analysis", "Click-through optimization", "A/B testing"],
          ctaText: "Generate Titles"
        },
        {
          icon: <PenTool className="text-white" size={24} />,
          title: "Tag & Category Suggestions",
          description: "Automatically suggest relevant tags and categories for your technical content.",
          features: ["Content analysis", "Relevance scoring", "Trending topics"],
          ctaText: "Get Suggestions"
        },
        {
          icon: <PenTool className="text-white" size={24} />,
          title: "Image Fetch",
          description: "Find and insert relevant images from Unsplash or use custom image links.",
          features: ["Unsplash integration", "Custom link support", "Automated attribution"],
          ctaText: "Find Images"
        },
        {
          icon: <PenTool className="text-white" size={24} />,
          title: "Smart Editor",
          description: "Write in Markdown or WYSIWYG with code highlighting and instant preview.",
          features: ["Dual editing modes", "Code highlighting", "Autosave"],
          ctaText: "Open Editor"
        },
        {
          icon: <PenTool className="text-white" size={24} />,
          title: "Custom Blog URL Support",
          description: "Create SEO-friendly, custom URLs for your technical blog posts.",
          features: ["Slug generator", "Collision detection", "301 redirect management"],
          ctaText: "Configure URLs"
        }
      ]
    },
    {
      title: "📈 SEO Optimization",
      description: "Helping your blogs rank better.",
      services: [
        {
          icon: <BarChart className="text-white" size={24} />,
          title: "Meta Description Generator",
          description: "Create compelling meta descriptions that improve click-through rates from search results.",
          features: ["Character counter", "Keyword optimization", "CTR analysis"],
          ctaText: "Generate Meta Description"
        },
        {
          icon: <FileCode className="text-white" size={24} />,
          title: "Sitemap Generator",
          description: "Automatically generate and update XML sitemaps for better search engine indexing.",
          features: ["Auto-updates", "Priority settings", "Search engine submission"],
          ctaText: "Generate Sitemap"
        },
        {
          icon: <BarChart className="text-white" size={24} />,
          title: "Google Search Console Setup",
          description: "Easily connect and configure Google Search Console for your developer blog.",
          features: ["One-click setup", "Verification", "Data integration"],
          ctaText: "Setup Search Console"
        },
        {
          icon: <TrendingUp className="text-white" size={24} />,
          title: "Blog Performance Checker",
          description: "Analyze and optimize your blog posts for maximum search engine visibility.",
          features: ["Keyword density", "Readability score", "Technical SEO checks"],
          ctaText: "Check Performance"
        },
        {
          icon: <BarChart className="text-white" size={24} />,
          title: "Google Indexing Services",
          description: "Submit your content to Google for faster indexing and better visibility.",
          features: ["Priority indexing", "Status tracking", "Batch submission"],
          ctaText: "Index Content"
        }
      ]
    },
    {
      title: "🧑‍💻 Author Dashboard",
      description: "Your personal blogging space with power tools.",
      services: [
        {
          icon: <LayoutDashboard className="text-white" size={24} />,
          title: "Blog Analytics",
          description: "Track performance metrics for your blog posts with detailed insights.",
          features: ["View counts", "User engagement", "Traffic sources"],
          ctaText: "View Analytics"
        },
        {
          icon: <BarChart className="text-white" size={24} />,
          title: "SEO Score Tracker",
          description: "Monitor and improve the SEO score of each blog post over time.",
          features: ["Per-post scoring", "Improvement suggestions", "Trend analysis"],
          ctaText: "Check SEO Score"
        },
        {
          icon: <TrendingUp className="text-white" size={24} />,
          title: "Google Index Status",
          description: "Track the indexing status of your content in Google search results.",
          features: ["Indexing status", "Coverage issues", "URL inspection"],
          ctaText: "Check Index Status"
        },
        {
          icon: <Users className="text-white" size={24} />,
          title: "Profile Customization",
          description: "Personalize your author profile to build your personal brand.",
          features: ["Custom bio", "Social links", "Portfolio showcase"],
          ctaText: "Customize Profile"
        },
        {
          icon: <BookOpen className="text-white" size={24} />,
          title: "Content Management",
          description: "Manage your bookmarks, drafts, and comments from a central dashboard.",
          features: ["Draft management", "Comment moderation", "Content organization"],
          ctaText: "Manage Content"
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4 text-center">DevBlogger Services</h1>
      <p className="text-xl mb-12 text-center max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
        Everything you need to create, manage, and grow your developer blog. Built by developers, for developers.
      </p>

      {serviceCategories.map((category, index) => (
        <ServiceCategory
          key={index}
          title={category.title}
          description={category.description}
          services={category.services}
        />
      ))}

      <div className="mt-16 bg-gray-100 dark:bg-gray-800 rounded-lg p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Looking for Enterprise Solutions?</h2>
        <p className="text-center mb-6">
          We offer customized solutions for tech companies and large development teams.
        </p>
        <div className="flex justify-center">
          <Button variant="outline" className="mr-4">Contact Sales</Button>
          <Button>Book a Demo</Button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;