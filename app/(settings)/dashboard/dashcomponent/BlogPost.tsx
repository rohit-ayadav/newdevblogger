import React, { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BlogPostType } from '@/types/blogs-types';
import { PostCard } from '../PostCard';
import { CATEGORIES } from '@/types/blogs-types';
import { Search, Filter, SortDesc, PlusCircle, RefreshCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { fetchAuthorData } from '@/action/personalDashboardData';

const BLOG_STATUSES = [
    { value: 'all', label: 'All Posts' },
    { value: 'approved', label: 'Published' },
    { value: 'draft', label: 'Drafts' },
    { value: 'pending_review', label: 'Pending Review' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'archived', label: 'Archived' },
    { value: 'private', label: 'Private' },
    { value: 'deleted', label: 'Trash' }
];

interface BlogPostProps {
    // Optional props that could be passed from parent
    initialBlogs?: BlogPostType[];
    initialStats?: { blog: string; month: string; views: number; likes: number }[];
    parentRefreshTrigger?: number;
}

const BlogPost = ({ initialBlogs, initialStats, parentRefreshTrigger }: BlogPostProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get initial values from URL parameters
    const initialSearch = searchParams.get('search') || '';
    const initialCategory = searchParams.get('category') || 'all';
    const initialSort = searchParams.get('sort') || 'recent';
    const initialStatus = searchParams.get('status') || 'all';
    const initialFilterExpanded = searchParams.get('filters') === 'expanded';

    // State with URL parameters
    const [search, setSearch] = useState(initialSearch);
    const [category, setCategory] = useState(initialCategory);
    const [sortBlogs, setSortBlogs] = useState(initialSort);
    const [activeStatus, setActiveStatus] = useState(initialStatus);
    const [isFilterExpanded, setIsFilterExpanded] = useState(initialFilterExpanded);

    // Data state
    const [filteredBlogs, setFilteredBlogs] = useState<BlogPostType[]>([]);
    const [blogs, setBlogs] = useState<BlogPostType[]>(initialBlogs || []);
    const [monthlyStats, setMonthlyStats] = useState<{
        blog: string; month: string; views: number; likes: number
    }[]>(initialStats || []);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(!initialBlogs);
    const [refreshing, setRefreshing] = useState(false);

    // Update URL parameters when state changes
    const updateUrlParams = (params: Record<string, string>) => {
        const url = new URL(window.location.href);

        // Update each parameter
        Object.entries(params).forEach(([key, value]) => {
            if (value) {
                url.searchParams.set(key, value);
            } else {
                url.searchParams.delete(key);
            }
        });

        // Replace the current URL without reloading the page
        router.replace(url.toString(), { scroll: false });
    };

    // Handle search change with debounce
    const handleSearchChange = (value: string) => {
        setSearch(value);
        // Debounce URL update for search to avoid too many history entries
        const debounceTimer = setTimeout(() => {
            updateUrlParams({ search: value || '' });
        }, 500);

        return () => clearTimeout(debounceTimer);
    };

    // Handle category change
    const handleCategoryChange = (value: string) => {
        setCategory(value);
        updateUrlParams({ category: value === 'all' ? '' : value });
    };

    // Handle sort change
    const handleSortChange = (value: string) => {
        setSortBlogs(value);
        updateUrlParams({ sort: value === 'recent' ? '' : value });
    };

    // Handle status change
    const handleStatusChange = (value: string) => {
        setActiveStatus(value);
        updateUrlParams({ status: value === 'all' ? '' : value });
    };

    // Handle filter expansion toggle
    const toggleFilterExpanded = () => {
        const newState = !isFilterExpanded;
        setIsFilterExpanded(newState);
        updateUrlParams({ filters: newState ? 'expanded' : '' });
    };

    // Count blogs by status for badge counters
    const statusCounts = useMemo(() => {
        const counts: Record<string, number> = { all: blogs.length };

        blogs.forEach(blog => {
            const status = blog.status || 'draft';
            counts[status] = (counts[status] || 0) + 1;
        });

        return counts;
    }, [blogs]);

    // Fetch data function
    const fetchData = async () => {
        setLoading(true);
        setError(null);
        setRefreshing(true);

        try {
            const result = await fetchAuthorData();
            if (result?.error) {
                setError(result.error);
            } else {
                setBlogs(result.blogs || []);
                setMonthlyStats(result.monthlyStats || []);
            }
        } catch (err) {
            setError("Failed to fetch data. Please try again.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Initial data fetch
    useEffect(() => {
        if (!initialBlogs) {
            fetchData();
        }
    }, []);

    // Refresh when triggered from parent
    useEffect(() => {
        if (parentRefreshTrigger) {
            fetchData();
        }
    }, [parentRefreshTrigger]);

    // Sync state with URL parameters when they change externally
    useEffect(() => {
        const searchParam = searchParams.get('search');
        const categoryParam = searchParams.get('category');
        const sortParam = searchParams.get('sort');
        const statusParam = searchParams.get('status');
        const filtersParam = searchParams.get('filters');

        if (searchParam !== null && searchParam !== search) setSearch(searchParam);
        if (categoryParam !== null && categoryParam !== category && categoryParam !== '') setCategory(categoryParam);
        if (categoryParam === null && category !== 'all') setCategory('all');
        if (sortParam !== null && sortParam !== sortBlogs && sortParam !== '') setSortBlogs(sortParam);
        if (sortParam === null && sortBlogs !== 'recent') setSortBlogs('recent');
        if (statusParam !== null && statusParam !== activeStatus && statusParam !== '') setActiveStatus(statusParam);
        if (statusParam === null && activeStatus !== 'all') setActiveStatus('all');
        if ((filtersParam === 'expanded') !== isFilterExpanded) setIsFilterExpanded(filtersParam === 'expanded');
    }, [searchParams]);

    // Sort blogs based on sortBlogs criteria
    const sortedBlogs = useMemo(() => {
        return [...blogs].sort((a, b) => {
            switch (sortBlogs) {
                case 'popular':
                    return (b.views || 0) - (a.views || 0);
                case 'liked':
                    return (b.likes || 0) - (a.likes || 0);
                case 'oldest':
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                case 'a-z':
                    return a.title.localeCompare(b.title);
                case 'z-a':
                    return b.title.localeCompare(a.title);
                default: // recent
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        });
    }, [blogs, sortBlogs]);

    // Filter blogs based on search, category, and status
    useEffect(() => {
        const filtered = sortedBlogs.filter(post => {
            const matchesSearch = search ? (
                post.title.toLowerCase().includes(search.toLowerCase()) ||
                (post.content && post.content.toLowerCase().includes(search.toLowerCase()))
            ) : true;
            const matchesCategory = category === 'all' || post.category === category;
            const matchesStatus = activeStatus === 'all' || post.status === activeStatus;
            return matchesSearch && matchesCategory && matchesStatus;
        });

        setFilteredBlogs(filtered);
    }, [search, category, activeStatus, sortedBlogs]);

    return (
        <div className="w-full">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Blog Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Manage and monitor all your blog posts</p>
                </div>
                <Button className="flex items-center gap-2" onClick={() => router.push('/create')}>
                    <PlusCircle size={16} />
                    <span>Create New Post</span>
                </Button>
            </div>

            <Card className="border shadow-sm">
                <CardHeader className="pb-0">
                    <Tabs value={activeStatus} onValueChange={handleStatusChange} className="w-full">
                        <div className="overflow-x-auto pb-2">
                            <TabsList className="h-auto p-1">
                                {BLOG_STATUSES.map(status => (
                                    <TabsTrigger key={status.value} value={status.value} className="flex items-center gap-2 py-2">
                                        {status.label}
                                        <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs">
                                            {statusCounts[status.value] || 0}
                                        </Badge>
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        <div className="mt-4 flex flex-col md:flex-row justify-between gap-3">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Search posts by title or content..."
                                    className="pl-9 w-full md:w-80"
                                    value={search}
                                    onChange={e => handleSearchChange(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button variant="outline" className="flex items-center gap-2" onClick={fetchData} disabled={refreshing}>
                                    <RefreshCcw size={16} className={refreshing ? 'animate-spin' : ''} />
                                    <span>Refresh</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex items-center gap-2"
                                    onClick={toggleFilterExpanded}
                                >
                                    <Filter size={16} />
                                    <span>Filters</span>
                                </Button>

                                <Select value={sortBlogs} onValueChange={handleSortChange}>
                                    <SelectTrigger className="w-full sm:w-[180px]">
                                        <div className="flex items-center gap-2">
                                            <SortDesc size={16} />
                                            <SelectValue placeholder="Sort by" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="recent">Most Recent</SelectItem>
                                        <SelectItem value="popular">Most Popular</SelectItem>
                                        <SelectItem value="liked">Most Liked</SelectItem>
                                        <SelectItem value="oldest">Oldest</SelectItem>
                                        <SelectItem value="a-z">A - Z</SelectItem>
                                        <SelectItem value="z-a">Z - A</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {isFilterExpanded && (
                            <div className="mt-4 p-4 bg-muted/30 rounded-md">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium mb-1 block">Category</label>
                                        <Select value={category} onValueChange={handleCategoryChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Filter by category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Categories</SelectItem>
                                                {CATEGORIES.map(cat => (
                                                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-1 block">Date Range</label>
                                        <Select defaultValue="all-time">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select time range" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all-time">All Time</SelectItem>
                                                <SelectItem value="this-month">This Month</SelectItem>
                                                <SelectItem value="last-month">Last Month</SelectItem>
                                                <SelectItem value="this-year">This Year</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="text-red-500 text-center py-4">
                                {error}
                            </div>
                        )}

                        {/* Render content for the active status tab only */}
                        {BLOG_STATUSES.map(status => (
                            <TabsContent
                                key={status.value}
                                value={status.value}
                                className={`mt-6 ${loading || refreshing ? 'opacity-50 pointer-events-none' : ''}`}
                            >
                                {filteredBlogs.length === 0 ? (
                                    <div className="text-center py-12 bg-muted/30 rounded-lg">
                                        <h3 className="text-lg font-medium mb-2">No blog posts found</h3>
                                        <p className="text-muted-foreground mb-4">
                                            {search ? 'No posts match your search criteria.' : `You don't have any ${status.label.toLowerCase()} yet.`}
                                        </p>
                                        {status.value === 'draft' && (
                                            <Button
                                                variant="outline"
                                                onClick={() => router.push('/create')}
                                                className="flex items-center gap-2"
                                            >
                                                <PlusCircle size={16} className="mr-2" />
                                                Create a new draft
                                            </Button>
                                        )}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                                        {filteredBlogs.map((post: BlogPostType) => {
                                            const postStats = monthlyStats.filter(stat => stat.blog === post._id);
                                            const totalViews = postStats.reduce((sum, stat) => sum + stat.views, 0);
                                            const totalLikes = postStats.reduce((sum, stat) => sum + stat.likes, 0);

                                            const enhancedPost = {
                                                ...post,
                                                views: totalViews,
                                                likes: totalLikes
                                            };

                                            return (
                                                <PostCard
                                                    key={post._id}
                                                    post={enhancedPost}
                                                    showStats={true}
                                                    refreshData={fetchData}
                                                />
                                            );
                                        })}
                                    </div>
                                )}
                            </TabsContent>
                        ))}
                    </Tabs>
                </CardHeader>
            </Card>
        </div>
    );
};

export default BlogPost;