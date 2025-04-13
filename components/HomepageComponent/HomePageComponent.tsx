"use client";
import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    PenTool, Book, Users, ChevronRight, Search,
    TrendingUp, Star, Code, Terminal, Coffee
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { BlogPostType, UserType } from '@/types/blogs-types';
import { registerServiceWorkerFirstTime } from '@/hooks/push-client';
import { cn } from '@/lib/utils';

// Dynamically import components with lazy loading
const CountUp = dynamic(() => import('react-countup'), { ssr: false });
const FeaturedAuthors = dynamic(() => import('./FeaturedAuthors'), { ssr: false });
const CategoryBrowser = dynamic(() => import('./CategoryBrowser'));
const NewsletterSection = dynamic(() => import('./NewsletterSection').then(mod => mod.NewsletterSection));
const RecentActivityFeed = dynamic(() => import('@/app/(manage)/author/RecentActivityFeed'));
const ContentToolsSection = dynamic(() => import('./ContentToolsSection'));
const TopCheatsheetsSection = dynamic(() => import('./TopCheatSheet'));
const FeatureBlog = dynamic(() => import('./FeatureBlog'));


const FeatureCard = ({ icon, title, description, action, link }: any) => {
    const { isDarkMode } = useTheme();
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
        >
            <Card className={cn(
                "h-full flex flex-col justify-between transition-all duration-300 border",
                isDarkMode ?
                    "bg-gray-800/50 hover:bg-gray-800 border-gray-700" :
                    "bg-white hover:bg-gray-50 border-gray-200"
            )}>
                <CardContent className="pt-6">
                    <div className={cn("mb-4 flex justify-center",
                        isDarkMode ? "text-blue-400" : "text-blue-600"
                    )}>{icon}</div>
                    <CardTitle className="text-2xl font-semibold mb-2 text-center">{title}</CardTitle>
                    <p className={cn("mb-4 text-center",
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>{description}</p>
                </CardContent>
                <CardContent className="pt-0">
                    <Link href={link} prefetch={false}>
                        <Button className={cn(
                            "w-full transition-all",
                            isDarkMode ?
                                "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600" :
                                "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                        )}>
                            {action} <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </motion.div>
    );
};

// Memoize static components for better performance
const TrendingTopics = React.memo(() => {
    const { isDarkMode } = useTheme();
    const topics = [
        { name: 'React', icon: <Code size={14} /> },
        { name: 'TypeScript', icon: <Terminal size={14} /> },
        { name: 'Web Dev', icon: <Coffee size={14} /> },
        { name: 'AI', icon: <Star size={14} /> },
        { name: 'DevOps', icon: <TrendingUp size={14} /> },
        { name: 'Next.js', icon: <Code size={14} /> },
        { name: 'UI/UX', icon: <PenTool size={14} /> }
    ];

    return (
        <div className="flex gap-2 flex-wrap justify-center">
            {topics.map((topic, index) => (
                <Link key={index} href={`/search?q=${topic.name}`} prefetch={false}>
                    <Badge
                        variant="secondary"
                        className={cn(
                            "px-3 py-1 cursor-pointer transition-colors",
                            isDarkMode ?
                                "hover:bg-blue-900/30 dark:bg-gray-700" :
                                "hover:bg-blue-100"
                        )}
                    >
                        <span className="mr-1">{topic.icon}</span>
                        {topic.name}
                    </Badge>
                </Link>
            ))}
        </div>
    );
});

TrendingTopics.displayName = 'TrendingTopics';

const SearchSection = React.memo(() => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();
    const { isDarkMode } = useTheme();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim() === '') return;
        router.push(`/search?q=${searchQuery}`);
    }

    return (
        <div className="relative max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className={cn(
                        "h-5 w-5 transition-colors",
                        isFocused ?
                            (isDarkMode ? "text-blue-400" : "text-blue-600") :
                            "text-gray-400"
                    )} />
                </div>
                <Input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={(e) => {
                        setIsFocused(true);
                        e.target.select();
                    }}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Search for topics, posts, or authors..."
                    className={cn(
                        "pl-10 pr-4 py-3 w-full rounded-xl transition-all duration-300",
                        isFocused ? "ring-2 border-transparent" : "border-2",
                        isDarkMode ?
                            (isFocused ? "ring-blue-500/50 bg-gray-800/90" : "border-gray-700 bg-gray-800") :
                            (isFocused ? "ring-blue-500/50 bg-white" : "border-gray-200 bg-white")
                    )}
                />
                <Button
                    type="submit"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                    Search
                </Button>
            </form>
        </div>
    );
});

SearchSection.displayName = 'SearchSection';

// Stats section component - extracted for better code organization
const StatsSection = React.memo(({ totalUsers, totalBlogs, totalLikes, totalViews, isDarkMode }: { totalUsers: number; totalBlogs: number; totalLikes: number; totalViews: number; isDarkMode: boolean }) => {

    return (
        <section className={cn(
            "py-16",
            isDarkMode ? "bg-gray-800/50" : "bg-gray-50"
        )}>
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {[
                        { label: 'Active Writers', value: totalUsers, icon: <PenTool size={24} /> },
                        { label: 'Articles Published', value: totalBlogs, icon: <Book size={24} /> },
                        { label: 'Total Reactions', value: totalLikes, icon: <Star size={24} /> },
                        { label: 'Monthly Readers', value: totalViews, icon: <Users size={24} /> }
                    ].map((stat, index) => (
                        <Card
                            key={index}
                            className={cn(
                                "text-center transition-transform hover:scale-105",
                                isDarkMode ?
                                    "bg-gray-800 border-gray-700" :
                                    "bg-white border-gray-200"
                            )}
                        >
                            <CardContent className="pt-6">
                                <div className={cn(
                                    "mb-4 flex justify-center",
                                    isDarkMode ? "text-blue-400" : "text-blue-600"
                                )}>
                                    {stat.icon}
                                </div>
                                <div className={cn(
                                    "text-4xl font-bold",
                                    isDarkMode ? "text-blue-400" : "text-blue-600"
                                )}>
                                    <CountUp end={stat.value} duration={2} useEasing />
                                </div>
                                <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                                    {stat.label}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
});

StatsSection.displayName = 'StatsSection';

// Loading fallback component
const SectionLoading = () => (
    <div className="w-full py-16 flex justify-center items-center">
        <div
            className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent border-blue-500"
            role="status"
            aria-label="Loading"
        ></div>
    </div>
);

interface HomePageProps {
    posts: BlogPostType[];
    users: UserType[];
    totalLikes: number;
    totalViews: number;
    totalBlogs: number;
    totalUsers: number;
}

const HomePage = ({ posts, users, totalLikes, totalViews, totalBlogs, totalUsers }: HomePageProps) => {
    const { isDarkMode } = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);

    // Load critical sections first
    const [loadPriority1, setLoadPriority1] = useState(false);
    const [loadPriority2, setLoadPriority2] = useState(false);
    const [loadPriority3, setLoadPriority3] = useState(false);

    // Set initial visibility for animations
    useEffect(() => {
        setIsVisible(true);
        setIsMounted(true);

        // Stagger the loading of non-critical sections
        const timer1 = setTimeout(() => setLoadPriority1(true), 100);
        const timer2 = setTimeout(() => setLoadPriority2(true), 1000);
        const timer3 = setTimeout(() => setLoadPriority3(true), 2000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    // Register service worker
    useEffect(() => {
        if (isMounted) {
            registerServiceWorkerFirstTime();
        }
    }, [isMounted]);

    // Apply dark mode class to body
    useEffect(() => {
        if (isMounted) {
            document.body.classList.toggle('dark', isDarkMode);
        }
    }, [isDarkMode, isMounted]);

    // Setup intersection observer for lazy loading sections
    useEffect(() => {
        if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
            interface LazySectionTarget extends Element {
                dataset: {
                    lazysection?: string;
                };
            }


            const handleIntersection: IntersectionObserverCallback = (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const target = entry.target as Element;
                        if ('dataset' in (target as LazySectionTarget) && (target as LazySectionTarget).dataset.lazysection) {
                            const sectionId = (target as HTMLElement).dataset.lazysection;
                            if (sectionId === 'priority1') setLoadPriority1(true);
                            if (sectionId === 'priority2') setLoadPriority2(true);
                            if (sectionId === 'priority3') setLoadPriority3(true);
                        }
                    }
                });
            };

            const observer = new IntersectionObserver(handleIntersection, {
                rootMargin: '200px'
            });

            document.querySelectorAll('[data-lazysection]').forEach(section => {
                observer.observe(section);
            });

            return () => observer.disconnect();
        }
    }, [isMounted]);

    // Only render on client side to avoid hydration errors with SSR
    if (!isMounted) {
        return null;
    }

    return (
        <div className={cn(
            "min-h-screen transition-colors duration-300",
            isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        )}>
            <ToastContainer theme={isDarkMode ? "dark" : "light"} limit={3} />

            {/* Hero Section - Critical render */}
            <section
                ref={heroRef}
                className={cn(
                    "relative overflow-hidden py-20 md:py-32",
                    isDarkMode ? "bg-gray-900" : "bg-white"
                )}
            >
                <div className={cn(
                    "absolute inset-0 opacity-70",
                    isDarkMode ?
                        "bg-gradient-to-r from-blue-900/20 to-indigo-900/20" :
                        "bg-gradient-to-r from-blue-600/20 to-indigo-600/20"
                )} />

                {/* Reduce background animations for better performance */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className={cn(
                                "absolute rounded-full",
                                isDarkMode ? "bg-blue-800/10" : "bg-blue-600/10"
                            )}
                            style={{
                                width: `${Math.random() * 300 + 100}px`,
                                height: `${Math.random() * 300 + 100}px`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                x: [0, Math.random() * 100 - 50],
                                y: [0, Math.random() * 100 - 50],
                            }}
                            transition={{
                                repeat: Infinity,
                                repeatType: "reverse",
                                duration: Math.random() * 15 + 15, // Slower animations use less CPU
                            }}
                        />
                    ))}
                </div>

                <div className="container mx-auto px-4 sm:px-6 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className={cn(
                            "text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent",
                            isDarkMode ?
                                "bg-gradient-to-r from-blue-400 to-indigo-400" :
                                "bg-gradient-to-r from-blue-600 to-indigo-600"
                        )}>
                            Where Developers Share Knowledge
                        </h1>
                        <p className={cn(
                            "text-xl mb-8 max-w-3xl mx-auto",
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                        )}>
                            Join our thriving community of developers. Share insights, learn from peers,
                            and stay ahead in the tech world.
                        </p>
                        <SearchSection />
                        <div className="mt-8">
                            <TrendingTopics />
                        </div>

                        <div className="mt-12 space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center">
                            <Link href="/create" prefetch={false}>
                                <Button
                                    size="lg"
                                    className={cn(
                                        "w-full sm:w-auto transition-all",
                                        isDarkMode ?
                                            "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600" :
                                            "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                                    )}
                                >
                                    Start Writing <PenTool className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/blogs" prefetch={false}>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className={cn(
                                        "w-full sm:w-auto",
                                        isDarkMode ? "border-gray-700 text-white" : ""
                                    )}
                                >
                                    Explore Blogs <Book className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Category Browser - Priority 1 */}
            <div data-lazysection="priority1">
                {loadPriority1 ? (
                    <Suspense fallback={<SectionLoading />}>
                        <CategoryBrowser />
                    </Suspense>
                ) : <SectionLoading />}
            </div>

            {/* Featured Blog - Priority 1 */}
            {loadPriority1 && (
                <Suspense fallback={<SectionLoading />}>
                    <FeatureBlog posts={posts} users={users} isDarkMode={isDarkMode} />
                </Suspense>
            )}

            {/* Top Cheatsheets - Priority 2 */}
            <div data-lazysection="priority2">
                {loadPriority2 ? (
                    <Suspense fallback={<SectionLoading />}>
                        <TopCheatsheetsSection />
                    </Suspense>
                ) : loadPriority1 ? <SectionLoading /> : null}
            </div>

            {/* Featured Authors - Priority 2 */}
            {loadPriority2 && (
                <Suspense fallback={<SectionLoading />}>
                    <FeaturedAuthors />
                </Suspense>
            )}

            {/* Why DevBlogger - Priority 1 */}
            <section className={cn(
                "py-16",
                isDarkMode ? "bg-gray-900" : "bg-white"
            )}>
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                        <h2 className="text-3xl font-bold">Why DevBlogger?</h2>
                        <Link href="/services">
                            <Button
                                variant="default"
                                className={isDarkMode ? "bg-blue-600 hover:bg-blue-700" : ""}
                            >
                                Know More
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        <FeatureCard
                            icon={<PenTool size={48} />}
                            title="Write & Share"
                            description="Share your technical insights and experiences. Build your personal brand in tech."
                            action="Start Writing"
                            link="/create"
                        />
                        <FeatureCard
                            icon={<Book size={48} />}
                            title="Learn & Grow"
                            description="Access quality technical content. Stay updated with the latest in tech."
                            action="Start Learning"
                            link="/blogs"
                        />
                        <FeatureCard
                            icon={<Users size={48} />}
                            title="Connect & Network"
                            description="Join a community of passionate developers. Collaborate and grow together."
                            action="Join Community"
                            link="https://whatsapp.com/channel/0029VaVd6px8KMqnZk7qGJ2t"
                        />
                    </div>
                </div>
            </section>

            {/* Priority 3 sections - lower importance */}
            {loadPriority3 && (
                <>
                    {/* Content Tools Section */}
                    <Suspense fallback={<SectionLoading />}>
                        <ContentToolsSection />
                    </Suspense>

                    {/* Newsletter Section */}
                    <Suspense fallback={<SectionLoading />}>
                        <NewsletterSection />
                    </Suspense>

                    {/* Recent Activity Feed */}
                    <Suspense fallback={<SectionLoading />}>
                        <RecentActivityFeed posts={posts} users={users} />
                    </Suspense>
                </>
            )}

            {/* Stats Section - Always visible but optimized */}
            <StatsSection
                totalUsers={totalUsers}
                totalBlogs={totalBlogs}
                totalLikes={totalLikes}
                totalViews={totalViews}
                isDarkMode={isDarkMode}
            />
        </div>
    );
};

export default HomePage;