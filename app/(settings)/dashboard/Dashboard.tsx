"use client";
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserType, BlogPostType } from '@/types/blogs-types';
import Stats from './dashcomponent/Stats';
import Header from './dashcomponent/Header';
import Overview from './dashcomponent/Overview';
import Analytics from './dashcomponent/Analytics';
import BlogPost from './dashcomponent/BlogPost';

interface AuthorDashboardProps {
    user: UserType;
    blogs: BlogPostType[];
    monthlyStats: {
        blog: string; month: string; views: number; likes: number
    }[];
}

function AuthorDashboard({ user, blogs, monthlyStats }: AuthorDashboardProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get initial values from URL or use defaults
    const initialView = searchParams.get('view') || 'overview';
    const initialTimeframe = searchParams.get('timeframe') || '6months';
    const initialSort = searchParams.get('sort') || 'recent';

    const [timeframe, setTimeframe] = useState(initialTimeframe);
    const [sortBlogs, setSortBlogs] = useState(initialSort);
    const [selectedView, setSelectedView] = useState(initialView);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // Function to merge URL params without losing existing ones
    const updateUrlParams = useCallback((params: Record<string, string>) => {
        const url = new URL(window.location.href);
        const currentParams = new URLSearchParams(url.search);

        // Keep all blog-specific params if we're on the blogs tab
        const preserveParams = selectedView === 'blogs';

        // Update main dashboard params
        Object.entries(params).forEach(([key, value]) => {
            if (value) {
                url.searchParams.set(key, value);
            } else {
                url.searchParams.delete(key);
            }
        });

        // If we're switching to the blogs tab, preserve any existing blog params
        if (params.view === 'blogs' && selectedView !== 'blogs') {
            // Add any blog-specific params from the URL
            ['search', 'category', 'status', 'filters'].forEach(param => {
                const value = searchParams.get(param);
                if (value) url.searchParams.set(param, value);
            });
        }

        // If we're switching away from blogs tab, remove blog-specific params
        if (params.view && params.view !== 'blogs' && selectedView === 'blogs') {
            ['search', 'category', 'status', 'filters'].forEach(param => {
                url.searchParams.delete(param);
            });
        }

        // Replace the current URL without reloading the page
        router.replace(url.toString(), { scroll: false });
    }, [router, selectedView, searchParams]);

    // Handle tab change with URL update
    const handleViewChange = (view: string) => {
        setSelectedView(view);
        updateUrlParams({ view });
    };

    // Handle timeframe change with URL update
    const handleTimeframeChange = (value: string) => {
        setTimeframe(value);
        updateUrlParams({ timeframe: value });
    };

    // Handle sort change with URL update
    const handleSortChange = (value: string) => {
        setSortBlogs(value);
        updateUrlParams({ sort: value });
    };

    // Refresh data from parent
    const refreshData = useCallback(() => {
        setRefreshTrigger(prev => prev + 1);
    }, []);

    // Synchronize state with URL parameters when they change externally
    useEffect(() => {
        const viewParam = searchParams.get('view');
        const timeframeParam = searchParams.get('timeframe');
        const sortParam = searchParams.get('sort');

        if (viewParam && viewParam !== selectedView) setSelectedView(viewParam);
        if (timeframeParam && timeframeParam !== timeframe) setTimeframe(timeframeParam);
        if (sortParam && sortParam !== sortBlogs) setSortBlogs(sortParam);
    }, [searchParams]);

    // Prepare data for charts - memoized for performance
    const chartData = useMemo(() => {
        const months = [];
        const now = new Date();
        const monthCount = timeframe === '6months' ? 6 : 12;

        for (let i = 0; i < monthCount; i++) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            months.unshift(monthStr);
        }

        // Aggregate stats by month
        const monthlyData = months.map(month => {
            const stats = monthlyStats.filter(stat => stat.month === month);
            const totalViews = stats.reduce((sum, stat) => sum + stat.views, 0);
            const totalLikes = stats.reduce((sum, stat) => sum + stat.likes, 0);

            return {
                month,
                displayMonth: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                views: totalViews,
                likes: totalLikes,
                blogs: blogs.filter(blog => new Date(blog.createdAt).toISOString().startsWith(month)).length
            };
        });

        return monthlyData;
    }, [timeframe, monthlyStats, blogs]);

    // Get total stats - memoized to prevent recalculation
    const totalStats = useMemo(() => {
        const totalViews = monthlyStats.reduce((sum, stat) => sum + stat.views, 0);
        const totalLikes = monthlyStats.reduce((sum, stat) => sum + stat.likes, 0);
        const blogsThisMonth = blogs.filter(blog => {
            const now = new Date();
            const blogDate = new Date(blog.createdAt);
            return blogDate.getMonth() === now.getMonth() && blogDate.getFullYear() === now.getFullYear();
        }).length;

        return { totalViews, totalLikes, totalBlogs: blogs.length, blogsThisMonth };
    }, [blogs, monthlyStats]);

    // Category distribution for pie chart
    const categoryDistribution = useMemo(() => {
        const categories: { [key: string]: number } = {};
        blogs.forEach(blog => {
            if (!categories[blog.category]) categories[blog.category] = 0;
            categories[blog.category]++;
        });

        return Object.entries(categories).map(([name, value]) => ({ name, value }));
    }, [blogs]);

    // Sort blogs for display
    const sortedBlogs = useMemo(() => {
        return [...blogs].sort((a, b) => {
            switch (sortBlogs) {
                case 'popular':
                    return (b.views || 0) - (a.views || 0);
                case 'liked':
                    return (b.likes || 0) - (a.likes || 0);
                default: // recent
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        });
    }, [blogs, sortBlogs]);

    // Calculate engagement rate
    const engagementRate = useMemo(() => {
        if (totalStats.totalViews === 0) return 0;
        return ((totalStats.totalLikes / totalStats.totalViews) * 100).toFixed(1);
    }, [totalStats]);

    return (
        <div className="w-full px-2 sm:px-4 py-4 sm:py-8 mx-auto max-w-7xl">
            <Header user={user} />
            <Stats
                totalStats={totalStats}
                chartData={chartData}
                engagementRate={parseFloat(engagementRate.toString())}
            />

            <div className="mt-6 sm:mt-8">
                <Tabs value={selectedView} onValueChange={handleViewChange} className="w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <TabsList className="grid grid-cols-3 w-full max-w-md">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="analytics">Analytics</TabsTrigger>
                            <TabsTrigger value="blogs">Manage Blogs</TabsTrigger>
                        </TabsList>

                        {selectedView !== 'blogs' && (
                            <Select value={timeframe} onValueChange={handleTimeframeChange}>
                                <SelectTrigger className="w-full sm:w-[180px] mt-2 sm:mt-0">
                                    <SelectValue placeholder="Timeframe" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="6months">Last 6 Months</SelectItem>
                                    <SelectItem value="12months">Last 12 Months</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    </div>

                    {/* Lazy load tab content only when active */}
                    {selectedView === 'overview' && (
                        <TabsContent value="overview" className="mt-4 space-y-4 sm:space-y-8">
                            <Overview
                                chartData={chartData}
                                categoryDistribution={categoryDistribution}
                                timeframe={timeframe}
                            />
                        </TabsContent>
                    )}

                    {selectedView === 'analytics' && (
                        <TabsContent value="analytics" className="mt-4 space-y-4 sm:space-y-6">
                            <Analytics
                                blogs={blogs}
                                monthlyStats={monthlyStats}
                                chartData={chartData}
                                sortedBlogs={sortedBlogs}
                                onSortChange={handleSortChange}
                                sortBy={sortBlogs}
                            />
                        </TabsContent>
                    )}

                    {selectedView === 'blogs' && (
                        <TabsContent value="blogs" className="mt-4 space-y-4 sm:space-y-6">
                            <div className="w-full overflow-x-auto">
                                <BlogPost
                                    initialBlogs={blogs}
                                    initialStats={monthlyStats}
                                    parentRefreshTrigger={refreshTrigger}
                                />
                            </div>
                        </TabsContent>
                    )}
                </Tabs>
            </div>
        </div>
    );
}

export default AuthorDashboard;