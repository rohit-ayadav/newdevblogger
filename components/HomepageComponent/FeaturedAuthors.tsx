import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book, Users } from 'react-feather';
import { Button } from '@/components/ui/button';
import { UserType } from '@/types/blogs-types';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cleanMarkdown } from '@/lib/common-function';
import React, { useEffect, useState } from 'react';
import { getTrendingAuthors } from '@/action/my-profile-action';
import ShowProfileImage from '../ShowProfileImage';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have this utility

const FeaturedAuthors = () => {
    const { isDarkMode } = useTheme();
    const [trendingAuthors, setTrendingAuthors] = React.useState<UserType[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [displayCount, setDisplayCount] = useState(4);

    useEffect(() => {
        const fetchTrendingAuthors = async () => {
            const authors = await getTrendingAuthors() as UserType[];
            setTrendingAuthors(authors);
            setLoading(false);
        };
        setLoading(true);
        fetchTrendingAuthors();
    }, []);

    // Update display count based on screen size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setDisplayCount(5); // 5 authors on lg screens
            } else if (window.innerWidth >= 768) {
                setDisplayCount(4); // 4 authors on md screens
            } else {
                setDisplayCount(4); // 4 authors on mobile as requested
            }
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (loading) {
        return (
            <section className={cn(
                "py-16",
                isDarkMode ? 'bg-gray-900' : 'bg-white'
            )}>
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                        <h2 className="text-3xl font-bold">Trending Authors</h2>
                    </div>
                    <div className="flex justify-center items-center py-12">
                        <div className={cn(
                            "animate-pulse w-8 h-8 rounded-full",
                            isDarkMode ? "bg-blue-600/50" : "bg-blue-400/50"
                        )}></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={cn(
            "py-16",
            isDarkMode ? 'bg-gray-900' : 'bg-white'
        )}>
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <h2 className="text-3xl font-bold">Trending Authors</h2>
                    <Link href="/author">
                        <Button
                            variant="default"
                            className={isDarkMode ? "bg-blue-600 hover:bg-blue-700" : ""}
                        >
                            View All <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                    {trendingAuthors.slice(0, displayCount).map((author, index) => (
                        <motion.div
                            key={author._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="h-full"
                        >
                            <Link href={`/author/${author.username}`}>
                                <Card className={cn(
                                    "h-full transition-all duration-300 border",
                                    isDarkMode ?
                                        "bg-gray-800/50 hover:bg-gray-800 border-gray-700" :
                                        "bg-white hover:bg-gray-50 border-gray-200"
                                )}>
                                    <CardContent className="pt-6 flex flex-col items-center">
                                        <div className={cn(
                                            "mb-4 w-20 h-20 rounded-full overflow-hidden border-2",
                                            isDarkMode ? "border-blue-500" : "border-blue-500"
                                        )}>
                                            <ShowProfileImage
                                                src={author.image}
                                                className="w-full h-full"
                                                size={80}
                                            />
                                        </div>
                                        <CardTitle className="text-lg font-semibold mb-1 text-center">
                                            {author.name}
                                        </CardTitle>
                                        <p className={cn(
                                            "text-sm text-center mb-2",
                                            isDarkMode ? "text-gray-300" : "text-gray-600"
                                        )}>
                                            @{author.username}
                                        </p>
                                        <div className="flex space-x-3 mb-3">
                                            <Badge
                                                variant="outline"
                                                className={cn(
                                                    "flex items-center",
                                                    isDarkMode ? "border-gray-700" : ""
                                                )}
                                            >
                                                <Book size={12} className="mr-1" />
                                                {author.noOfBlogs}
                                            </Badge>
                                            <Badge
                                                variant="outline"
                                                className={cn(
                                                    "flex items-center",
                                                    isDarkMode ? "border-gray-700" : ""
                                                )}
                                            >
                                                <Users size={12} className="mr-1" />
                                                {author.follower}
                                            </Badge>
                                        </div>
                                        <p className={cn(
                                            "text-xs text-center line-clamp-2",
                                            isDarkMode ? "text-gray-400" : "text-gray-500"
                                        )}>
                                            {author?.bio && cleanMarkdown(author?.bio).split("\n")[0].slice(0, 30) || "Tech enthusiast and content creator"}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedAuthors;