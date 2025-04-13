import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CodeSquare, ChevronRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils'; // Assuming you have this utility

const TopCheatsheetsSection = () => {
    const { isDarkMode } = useTheme();

    // Top 3 cheatsheets with icons matching your existing style
    const topCheatsheets = [
        {
            icon: <CodeSquare size={48} />,
            title: "Python Cheatsheet",
            description: "Quick reference for Python syntax, built-in functions, and common libraries for faster development.",
            action: "View Cheatsheet",
            link: "/cheatsheets/python"
        },
        {
            icon: <CodeSquare size={48} />,
            title: "JavaScript Cheatsheet",
            description: "Essential JavaScript concepts, ES6+ features, and DOM manipulation techniques in one place.",
            action: "View Cheatsheet",
            link: "/cheatsheets/javascript"
        },
        {
            icon: <BookOpen size={48} />,
            title: "Git Commands",
            description: "Master version control with this comprehensive guide to essential Git commands and workflows.",
            action: "View Cheatsheet",
            link: "/cheatsheets/git"
        }
    ];

    return (
        <section className={cn(
            "py-16",
            isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        )}>
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <h2 className="text-3xl font-bold">Popular Cheatsheets</h2>
                    <Link href="/cheatsheets">
                        <Button
                            variant="default"
                            className={isDarkMode ? "bg-blue-600 hover:bg-blue-700" : ""}
                        >
                            View All <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {topCheatsheets.map((sheet, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="h-full"
                        >
                            <Card className={cn(
                                "h-full flex flex-col justify-between transition-all duration-300 border",
                                isDarkMode ?
                                    "bg-gray-800/50 hover:bg-gray-800 border-gray-700" :
                                    "bg-white hover:bg-gray-50 border-gray-200"
                            )}>
                                <CardContent className="pt-6">
                                    <div className={cn(
                                        "mb-4 flex justify-center",
                                        isDarkMode ? "text-blue-400" : "text-blue-600"
                                    )}>
                                        {sheet.icon}
                                    </div>
                                    <CardTitle className="text-2xl font-semibold mb-2 text-center">
                                        {sheet.title}
                                    </CardTitle>
                                    <p className={cn(
                                        "mb-4 text-center",
                                        isDarkMode ? "text-gray-300" : "text-gray-600"
                                    )}>
                                        {sheet.description}
                                    </p>
                                </CardContent>
                                <CardContent className="pt-0">
                                    <Link href={sheet.link}>
                                        <Button className={cn(
                                            "w-full transition-all",
                                            isDarkMode ?
                                                "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600" :
                                                "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                                        )}>
                                            {sheet.action} <ChevronRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopCheatsheetsSection;