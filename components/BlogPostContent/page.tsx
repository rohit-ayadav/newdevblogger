"use client";

import React, { Suspense, useEffect, useMemo, useCallback } from 'react';
import { Author, BlogPostType } from '@/types/blogs-types';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorBoundary } from 'react-error-boundary';
import BlogPostHeader from '../BlogPostHeader/page';
import BlogPostFooter from '../BlogPostFooter/page';
import { useTheme } from '@/context/ThemeContext';
import { incrementView } from '@/lib/viewIncrement';
import CommentSection from '@/app/_component/CommentComponent/Comment';
import RC from '@/app/blogs/components/RC';
import MarkdownContent from '../ShowMD/MarkDownContent';

const SKELETON_COUNT = 3;
const VIEW_INCREMENT_DELAY = 1000; // 1 sec delay

interface BlogPostClientContentProps {
    initialData: BlogPostType;
    id: string;
    author: Author;
}

// Improved Error Fallback with better styling
const ErrorFallback = ({
    error,
    resetErrorBoundary
}: {
    error: Error;
    resetErrorBoundary: () => void
}) => (
    <div className="flex flex-col items-center justify-center py-12 px-4 mx-auto max-w-md">
        <div className="text-center space-y-4 p-6 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
            <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">
                Something went wrong
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
                {error.message || "We couldn't load this content. Please try again."}
            </p>
            <button
                onClick={resetErrorBoundary}
                className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded-md 
                    hover:bg-blue-600 transition-colors duration-200
                    dark:bg-blue-600 dark:hover:bg-blue-700 
                    focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
                Try again
            </button>
        </div>
    </div>
);

// Improved Loading Skeleton with better responsive design
const SectionSkeleton = () => (
    <div className="space-y-6 p-4 sm:p-6">
        <div className="space-y-4">
            <Skeleton className="h-6 w-32 sm:h-8 sm:w-48 dark:bg-gray-700" />
            <div className="space-y-4">
                {Array(SKELETON_COUNT).fill(null).map((_, i) => (
                    <div key={i} className="space-y-3">
                        <Skeleton className="h-24 sm:h-32 w-full rounded-lg dark:bg-gray-700" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full dark:bg-gray-700" />
                            <Skeleton className="h-4 w-4/5 dark:bg-gray-700" />
                            <Skeleton className="h-4 w-3/5 dark:bg-gray-700" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const BlogPostContainer = ({
    children,
    className = ""
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    // <div className={`w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 ${className}`}>
    <div>
        {children}
    </div>
);

const BlogPostClientContent: React.FC<BlogPostClientContentProps> = ({
    initialData,
    id,
    author
}) => {
    const { isDarkMode } = useTheme();

    const postStats = useMemo(() => ({
        likes: initialData.likes || 0,
        views: initialData.views || 0
    }), [initialData.likes, initialData.views]);

    const contentSections = useMemo(() => {
        if (initialData.language === 'markdown') {
            return initialData.content.split(/(?=^##\s)/m);
        }
        return null;
    }, [initialData.content, initialData.language]);

    // Optimized view increment
    useEffect(() => {
        const timer = setTimeout(() => {
            incrementView(id, false);
        }, VIEW_INCREMENT_DELAY);

        return () => clearTimeout(timer);
    }, [id]);

    const handleError = useCallback((error: Error) => {
        console.error('Blog post error:', error);
    }, []);

    // Memoized theme classes for better performance
    const themeClasses = useMemo(() =>
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
        , [isDarkMode]);

    const proseClasses = useMemo(() => {
        const baseClasses = 'prose max-w-none';
        const responsiveClasses = 'prose-sm sm:prose-base lg:prose-lg';
        const themeSpecificClasses = isDarkMode
            ? 'prose-invert prose-headings:text-gray-100 prose-p:text-gray-200 prose-a:text-blue-400 prose-strong:text-white prose-code:text-gray-200'
            : 'prose-headings:text-gray-800 prose-p:text-gray-600 prose-a:text-blue-600 prose-strong:text-black prose-code:text-gray-800';

        return `${baseClasses} ${responsiveClasses} ${themeSpecificClasses}`;
    }, [isDarkMode]);

    const containerClasses = useMemo(() =>
        `min-h-screen transition-colors duration-300 ${themeClasses}`
        , [themeClasses]);

    const commentSectionClasses = useMemo(() =>
        `mt-8 sm:mt-12 pt-6 sm:pt-8 border-t rounded-lg ${isDarkMode ? 'border-gray-800 bg-gray-900/30' : 'border-gray-200 bg-gray-50/50'
        }`
        , [isDarkMode]);

    return (
        <div className={containerClasses}>
            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onError={handleError}
                onReset={() => window.location.reload()}
            >
                {/* Header with responsive improvements */}
                <div className="w-full">
                    <BlogPostHeader
                        post={initialData}
                        author={author}
                        isDarkMode={isDarkMode}
                    />
                </div>

                <BlogPostContainer>
                    {/* Main Article Content */}
                    <article className={proseClasses}>
                        <ErrorBoundary
                            FallbackComponent={ErrorFallback}
                            onError={handleError}
                        >
                            <Suspense fallback={<SectionSkeleton />}>
                                {contentSections ? (
                                    <MarkdownContent sections={contentSections} />
                                ) : (
                                    <RC {...initialData} />
                                )}
                            </Suspense>
                        </ErrorBoundary>
                    </article>

                    <div className="mt-8 sm:mt-12">
                        <BlogPostFooter
                            post={initialData}
                            likes={postStats.likes}
                            views={postStats.views}
                            id={id}
                        />
                    </div>

                    <section
                        className={commentSectionClasses}
                        aria-label="Comments section"
                    >
                        <ErrorBoundary
                            FallbackComponent={ErrorFallback}
                            onError={handleError}
                        >
                            <Suspense fallback={<SectionSkeleton />}>
                                <CommentSection postId={id} />
                            </Suspense>
                        </ErrorBoundary>
                    </section>
                </BlogPostContainer>
            </ErrorBoundary>
        </div>
    );
};

export default BlogPostClientContent;