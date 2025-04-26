import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { BlogPostType } from '@/types/blogs-types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SortDesc } from 'lucide-react';

interface AnalyticsProps {
    blogs: BlogPostType[];
    monthlyStats: { blog: string; month: string; views: number; likes: number }[];
    chartData: { displayMonth: string; views: number; likes: number }[];
    sortedBlogs: BlogPostType[];
    onSortChange: (value: string) => void;
    sortBy: string;
}

const Analytics = ({ blogs, monthlyStats, chartData, sortedBlogs, onSortChange, sortBy }: AnalyticsProps) => {
    // State for chart type
    const [chartMetric, setChartMetric] = useState<'both' | 'views' | 'likes'>('both');

    // Calculate engagement rates for all blogs
    const blogPerformanceData = sortedBlogs.map(blog => {
        const blogStats = monthlyStats.filter(stat => stat.blog === blog._id);
        const totalViews = blogStats.reduce((sum, stat) => sum + stat.views, 0);
        const totalLikes = blogStats.reduce((sum, stat) => sum + stat.likes, 0);
        const engagement = totalViews ? ((totalLikes / totalViews) * 100).toFixed(1) : "0";

        return {
            ...blog,
            totalViews,
            totalLikes,
            engagement: Number(engagement)
        };
    });

    // Handle chart metric change
    const handleChartMetricChange = (value: string) => {
        setChartMetric(value as 'both' | 'views' | 'likes');
    };

    return (
        <div className="w-full space-y-6">
            <Card className="border shadow-sm">
                <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-6">
                    <div>
                        <CardTitle className="text-lg sm:text-xl">Monthly Engagement Metrics</CardTitle>
                        <CardDescription>
                            Detailed breakdown of views, likes, and engagement rates
                        </CardDescription>
                    </div>
                    <div className="mt-2 sm:mt-0">
                        <Select
                            value={chartMetric}
                            onValueChange={handleChartMetricChange}
                        >
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Chart metrics" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="both">Views & Likes</SelectItem>
                            <SelectItem value="views">Views Only</SelectItem>
                            <SelectItem value="likes">Likes Only</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent className="px-2 sm:px-6">
                    <div className="h-64 sm:h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 10, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="displayMonth"
                                    tick={{ fontSize: 12 }}
                                    angle={-45}
                                    textAnchor="end"
                                    height={50}
                                />
                                {(chartMetric === 'both' || chartMetric === 'views') && (
                                    <YAxis
                                        yAxisId="left"
                                        orientation="left"
                                        stroke="#0088FE"
                                        tick={{ fontSize: 12 }}
                                        width={40}
                                    />
                                )}
                                {(chartMetric === 'both' || chartMetric === 'likes') && (
                                    <YAxis
                                        yAxisId={chartMetric === 'both' ? "right" : "left"}
                                        orientation={chartMetric === 'both' ? "right" : "left"}
                                        stroke="#00C49F"
                                        tick={{ fontSize: 12 }}
                                        width={40}
                                    />
                                )}
                                <Tooltip />
                                <Legend wrapperStyle={{ fontSize: 12, marginTop: 10 }} />
                                {(chartMetric === 'both' || chartMetric === 'views') && (
                                    <Bar
                                        yAxisId="left"
                                        dataKey="views"
                                        fill="#0088FE"
                                        name="Views"
                                        animationDuration={300}
                                    />
                                )}
                                {(chartMetric === 'both' || chartMetric === 'likes') && (
                                    <Bar
                                        yAxisId={chartMetric === 'both' ? "right" : "left"}
                                        dataKey="likes"
                                        fill="#00C49F"
                                        name="Likes"
                                        animationDuration={300}
                                    />
                                )}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card className="border shadow-sm">
                <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-6">
                    <div>
                        <CardTitle className="text-lg sm:text-xl">Top Performing Posts</CardTitle>
                        <CardDescription>
                            Your most viewed and liked blog posts
                        </CardDescription>
                    </div>
                    <Select value={sortBy} onValueChange={onSortChange}>
                        <SelectTrigger className="w-full sm:w-[180px] mt-2 sm:mt-0">
                            <div className="flex items-center gap-2">
                                <SortDesc size={16} />
                                <SelectValue placeholder="Sort by" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="recent">Most Recent</SelectItem>
                            <SelectItem value="popular">Most Views</SelectItem>
                            <SelectItem value="liked">Most Likes</SelectItem>
                            <SelectItem value="engaged">Highest Engagement</SelectItem>
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent className="px-0 sm:px-6">
                    <div className="overflow-x-auto">
                        <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                                    <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                                    <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Views</th>
                                    <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Likes</th>
                                    <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Engage</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                {blogPerformanceData.slice(0, 5).map((blog) => (
                                    <tr key={blog._id}>
                                        <td className="px-3 sm:px-6 py-2 sm:py-4">
                                            <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-[120px] sm:max-w-[200px]">
                                                {blog.title}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                {new Date(blog.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-3 sm:px-6 py-2 sm:py-4">
                                            <Badge variant="outline" className="capitalize text-xs">
                                                {blog.category}
                                            </Badge>
                                        </td>
                                        <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-900 dark:text-gray-100">
                                            {blog.totalViews.toLocaleString()}
                                        </td>
                                        <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-900 dark:text-gray-100">
                                            {blog.totalLikes.toLocaleString()}
                                        </td>
                                        <td className="px-3 sm:px-6 py-2 sm:py-4">
                                            <div className={`text-xs sm:text-sm ${blog.engagement > 5 ? 'text-green-600 dark:text-green-400' :
                                                    blog.engagement > 2 ? 'text-amber-600 dark:text-amber-400' :
                                                        'text-red-600 dark:text-red-400'
                                                }`}>
                                                {blog.engagement}%
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Analytics;