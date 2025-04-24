import React from 'react'
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { BlogPostType, UserType } from '@/types/blogs-types';
import { cn } from '@/lib/utils'; // Assuming you have this utility
import PostCard from '@/app/_component/Post/PostCard';
import { motion, AnimatePresence } from 'framer-motion';

const FeatureBlog = ({ posts, users, isDarkMode, isTechNews }: { posts: BlogPostType[], users: UserType[], isDarkMode: boolean, isTechNews: boolean }) => {
    return (
        <div>
            {/* Featured Posts Section */}
            <section className={cn(
                "py-16 relative overflow-hidden",
                isDarkMode ? "bg-gray-800/50" : "bg-gray-50"
            )}>
                {/* Background decoration elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className={cn(
                        "absolute w-64 h-64 rounded-full opacity-20 blur-3xl",
                        isDarkMode ? "bg-blue-800" : "bg-blue-400"
                    )} style={{ top: '10%', left: '-5%' }} />
                    <div className={cn(
                        "absolute w-96 h-96 rounded-full opacity-10 blur-3xl",
                        isDarkMode ? "bg-indigo-800" : "bg-indigo-400"
                    )} style={{ bottom: '5%', right: '-10%' }} />
                </div>

                <div className="container mx-auto px-4 sm:px-6 relative">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
                        <div>
                            <span className={cn(
                                "inline-block text-sm font-semibold mb-2 px-3 py-1 rounded-full",
                                isDarkMode ? "bg-blue-900/50 text-blue-300" : "bg-blue-100 text-blue-700"
                            )}>
                                Must Read
                            </span>
                            <h2 className="text-3xl font-bold">
                                {isTechNews ? "Latest in Tech News" : "Featured Posts"}                                {/* Animated underline */}
                                <span className={cn(
                                    "ml-2 inline-block w-10 h-1 rounded",
                                    isDarkMode ? "bg-blue-500" : "bg-blue-600"
                                )}></span>
                            </h2>
                            <p className={cn(
                                "mt-2 text-base max-w-xl",
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                            )}>
                                Hand-picked articles from our top contributors that shouldn't be missed
                            </p>
                        </div>
                        <Link href="/blogs">
                            <Button
                                variant="default"
                                className={cn(
                                    "relative group overflow-hidden",
                                    isDarkMode ?
                                        "bg-blue-600 hover:bg-blue-700" :
                                        "bg-blue-600 hover:bg-blue-700"
                                )}
                            >
                                <span className="relative z-10 flex items-center">
                                    {isTechNews ? "View All Tech News" : "Explore More"}
                                    <ChevronRight className={cn(
                                        "ml-1 h-4 w-4 transition-transform duration-300",
                                        "group-hover:translate-x-1"
                                    )} />
                                </span>
                                <span className={cn(
                                    "absolute inset-0 w-0 bg-gradient-to-r from-indigo-600 to-blue-500 transition-all duration-300",
                                    "group-hover:w-full"
                                )}></span>
                            </Button>
                        </Link>
                    </div>

                    {/* Featured post cards with enhanced animation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {posts.slice(0, 3).map((post, index) => (
                            <motion.div
                                key={post._id || index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: index * 0.15,
                                    duration: 0.5,
                                    ease: "easeOut"
                                }}
                                className={cn(
                                    "h-full transition-all duration-300",
                                    "hover:-translate-y-2"
                                )}
                            >
                                <div className={cn(
                                    "rounded-md overflow-hidden border h-full shadow-sm",
                                    isDarkMode ?
                                        "border-gray-700 shadow-gray-900/20" :
                                        "border-gray-200 shadow-gray-200/50"
                                )}>
                                    <PostCard
                                        post={post}
                                        user={users.find(user => user.email === post.createdBy) || {
                                            email: '', name: '', image: '', bio: '', follower: 0,
                                            following: 0, noOfBlogs: 0, createdAt: '', updatedAt: '',
                                            theme: '', _id: '', website: '',
                                            socialLinks: { linkedin: '', github: '', twitter: '', instagram: '', facebook: '' },
                                            isEmailVerified: false, username: '', role: ''
                                        }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Load more button (only shown when there are more than 3 posts) */}
                    {posts.length > 3 && (
                        <div className="mt-12 text-center">
                            <Link href={isTechNews ? "/tech-news" : "/blogs"}>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className={cn(
                                        "border-2 rounded-full px-8",
                                        isDarkMode ?
                                            "border-gray-700 hover:bg-gray-700/50" :
                                            "hover:bg-gray-100"
                                    )}
                                >
                                    {isTechNews ? "View All Tech News" : "Explore More"}
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default FeatureBlog
