import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Book } from 'react-feather';
import { BlogPostType, UserType } from '@/types/blogs-types';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { formatRelativeTime } from '@/utils/date-formatter';
import ShowProfileImage from '@/components/ShowProfileImage';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have this utility

const RecentActivityFeed = ({ posts, users }: { posts: BlogPostType[], users: UserType[] }) => {
    const { isDarkMode } = useTheme();

    const recentActivities = [...posts]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 6);

    return (
        <section className={cn(
            "py-16",
            isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
        )}>
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <h2 className="text-3xl font-bold">Recent Activity</h2>
                    <Link href="/blogs">
                        <Button
                            variant="default"
                            className={isDarkMode ? "bg-blue-600 hover:bg-blue-700" : ""}
                        >
                            View All <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
                    {recentActivities.map((activity, index) => {
                        const author = users.find(user => user.email === activity.createdBy);
                        const timeAgo = formatRelativeTime(activity.createdAt);

                        return (
                            <motion.div
                                key={activity._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={`/blogs/${activity.slug}`}>
                                    <Card className={cn(
                                        "transition-all duration-300 border",
                                        isDarkMode ?
                                            'bg-gray-800 hover:bg-gray-700 border-gray-700' :
                                            'bg-white hover:bg-gray-50 border-gray-200'
                                    )}>
                                        <CardContent className="py-4 flex items-center">
                                            <div className="flex-shrink-0 mr-4">
                                                {author?.image ? (
                                                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
                                                        <ShowProfileImage src={author.image} className="w-full h-full" size={48} />
                                                    </div>
                                                ) : (
                                                    <div className={cn(
                                                        "w-12 h-12 rounded-full flex items-center justify-center",
                                                        isDarkMode ?
                                                            "bg-gray-700 text-blue-400" :
                                                            "bg-blue-100 text-blue-600"
                                                    )}>
                                                        {author?.name.charAt(0).toUpperCase() || 'U'}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-grow">
                                                <div className="flex items-center flex-wrap gap-2">
                                                    <p className="font-semibold">{author?.name || 'Unknown Author'}</p>
                                                    <Badge
                                                        variant="outline"
                                                        className={cn(
                                                            "px-2 py-0 text-xs",
                                                            isDarkMode ? "border-gray-700" : ""
                                                        )}
                                                    >
                                                        {activity.category}
                                                    </Badge>
                                                </div>
                                                <p className={cn(
                                                    "font-medium",
                                                    isDarkMode ? "text-blue-400" : "text-blue-600"
                                                )}>
                                                    {activity.title}
                                                </p>
                                                <div className={cn(
                                                    "flex items-center flex-wrap text-xs mt-1",
                                                    isDarkMode ? "text-gray-400" : "text-gray-500"
                                                )}>
                                                    <p>{timeAgo}</p>
                                                    <div className="mx-2">•</div>
                                                    <div className="flex items-center">
                                                        <Book size={12} className="mr-1" />
                                                        {activity.views || 0} views
                                                    </div>
                                                    <div className="mx-2">•</div>
                                                    <div className="flex items-center">
                                                        <Star size={12} className="mr-1" />
                                                        {activity.likes || 0} likes
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default RecentActivityFeed;