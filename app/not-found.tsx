"use client";
import React from 'react';
import Link from 'next/link';
import { HomeIcon, ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDarkMode } from '@/hooks/useDarkMode';
import SearchBar404 from './_component/SearchBar404';
import { useTheme } from '@/context/ThemeContext';

const NotFoundPage = () => {
    const { isDarkMode } = useTheme();

    // Popular pages with more meaningful structure
    const popularPages = [
        { label: 'Blog', href: '/blogs', icon: <ExternalLink className="w-3 h-3" /> },
        { label: 'Dashboard', href: '/dashboard', icon: <ExternalLink className="w-3 h-3" /> },
        { label: 'About', href: '/about', icon: <ExternalLink className="w-3 h-3" /> },
        { label: 'Contact', href: '/contacts', icon: <ExternalLink className="w-3 h-3" /> },
        { label: 'Help Center', href: '/help', icon: <ExternalLink className="w-3 h-3" /> },
    ];

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300
      ${isDarkMode
                ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100'
                : 'bg-gradient-to-b from-gray-50 to-white text-gray-900'}`}>
            <div className="max-w-2xl w-full text-center space-y-8">
                {/* Animated 404 section */}
                <div className="relative animate-pulse">
                    <h1 className={`text-[150px] font-bold select-none
            ${isDarkMode ? 'text-gray-800' : 'text-gray-200'}`}>
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                            className={`w-48 h-48 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        >
                            <path
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>

                {/* Error Message with improved copy */}
                <div className="space-y-4">
                    <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Page Not Found
                    </h2>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-md mx-auto`}>
                        We've searched high and low, but couldn't find the page you're looking for.
                        Let's get you back on track to what you need.
                    </p>
                </div>

                {/* Search bar with dark mode support */}
                <div className={`${isDarkMode ? 'dark' : ''}`}>
                    <SearchBar404 isDarkMode={isDarkMode} />
                </div>

                {/* Action Buttons with improved styling */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                    <Button
                        onClick={() => window.history.back()}
                        variant={isDarkMode ? "secondary" : "outline"}
                        className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 shadow-sm 
                            transition-colors duration-300
                            ${isDarkMode
                                ? 'hover:bg-gray-700 text-gray-100 border-gray-700'
                                : 'hover:bg-gray-100 text-gray-800 border-gray-300'
                            }`}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </Button>
                    <Link href="/" passHref>
                        <Button
                            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 shadow-sm
                                transition-colors duration-300
                                ${isDarkMode
                                    ? 'bg-blue-600 hover:bg-blue-700'
                                    : 'bg-blue-600 hover:bg-blue-700'
                                } text-white`}
                        >
                            <HomeIcon className="w-4 h-4" />
                            Back to Home
                        </Button>
                    </Link>
                </div>

                {/* Popular Pages section with improved visual design */}
                <div className={`pt-8 border-t transition-colors duration-300 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <h3 className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'} mb-4`}>
                        Popular Pages
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {popularPages.map(({ label, href, icon }) => (
                            <Link
                                key={label}
                                href={href}
                                className={`text-sm transition-all duration-300 ${isDarkMode
                                    ? 'text-gray-300 hover:text-blue-400 bg-gray-800 hover:bg-gray-700'
                                    : 'text-gray-600 hover:text-blue-600 bg-gray-100 hover:bg-gray-200'
                                    } flex items-center gap-1 rounded-full px-3 py-1`}
                            >
                                {label} {icon}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;