import React, { useEffect, useState, useCallback } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { List, ChevronRight, BookOpen, Hash, ArrowUpCircle, ChevronDown } from 'lucide-react';
import { TOCItem } from '@/types/blogs-types';

interface TableOfContentsProps {
    content: string;
    contentType?: 'html' | 'markdown';
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content, contentType = 'html' }) => {
    const [toc, setToc] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const [isExpanded, setIsExpanded] = useState(true);
    const { isDarkMode } = useTheme();

    useEffect(() => {
        // Dont expand TOC if content is empty and in mobile view
        if (content.length === 0 && window.innerWidth < 768) {
            setIsExpanded(false);
        }
    }, [content]);

    // Clean text formatting from markdown/html
    const cleanText = useCallback((text: string): string => {
        return text
            // Remove markdown formatting
            .replace(/\*\*(.*?)\*\*/g, '$1') // Bold **text**
            .replace(/\*(.*?)\*/g, '$1')     // Italic *text*
            .replace(/__(.*?)__/g, '$1')     // Bold __text__
            .replace(/_(.*?)_/g, '$1')       // Italic _text_
            .replace(/`(.*?)`/g, '$1')       // Inline code `text`
            .replace(/~~(.*?)~~/g, '$1')     // Strikethrough ~~text~~
            .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links [text](url)
            // Remove HTML tags
            .replace(/<[^>]*>/g, '')
            // Clean up extra whitespace
            .replace(/\s+/g, ' ')
            .trim();
    }, []);

    // Generate slug from text
    const generateSlug = useCallback((text: string): string => {
        return cleanText(text)
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
            .replace(/\s+/g, '-')         // Replace spaces with hyphens
            .replace(/-+/g, '-')          // Replace multiple hyphens with single hyphen
        // .replace(/^-+|-+$/g, '');     // Remove leading/trailing hyphens
    }, [cleanText]);

    useEffect(() => {
        const generateTOC = () => {
            if (contentType === 'markdown') {
                const headingRegex = /^(#{1,6})\s+(.+)$/gm;
                const headings: TOCItem[] = [];
                let match;

                while ((match = headingRegex.exec(content)) !== null) {
                    const level = match[1].length;
                    const rawText = match[2].trim();
                    const text = cleanText(rawText);
                    const id = generateSlug(text);

                    if (text) { // Only add if text is not empty after cleaning
                        headings.push({ level, text, id });
                    }
                }
                setToc(headings);
            } else if (contentType === 'html') {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = content;
                const headingElements = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');

                const headings: TOCItem[] = Array.from(headingElements)
                    .map(heading => {
                        const level = parseInt(heading.tagName[1]);
                        const rawText = heading.textContent || '';
                        const text = cleanText(rawText);
                        const id = heading.id || generateSlug(text);

                        return { level, text, id };
                    })
                    .filter(heading => heading.text); // Filter out empty headings

                setToc(headings);
            }
        };

        if (content) {
            generateTOC();
        }
    }, [content, contentType, cleanText, generateSlug]);

    useEffect(() => {
        const handleScroll = () => {
            const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            const scrollPosition = window.scrollY + 200; // Offset for better detection

            let currentHeading = '';
            let closestDistance = Infinity;

            headings.forEach(heading => {
                const rect = heading.getBoundingClientRect();
                const distance = Math.abs(rect.top);

                if (rect.top <= 200 && distance < closestDistance) {
                    closestDistance = distance;
                    currentHeading = heading.id || generateSlug(heading.textContent || '');
                }
            });

            setActiveId(currentHeading);
        };

        const throttledHandleScroll = throttle(handleScroll, 100);
        window.addEventListener('scroll', throttledHandleScroll);
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', throttledHandleScroll);
    }, [generateSlug]);

    // Simple throttle function
    function throttle(func: Function, delay: number) {
        let timeoutId: NodeJS.Timeout;
        let lastExecTime = 0;

        return function (...args: any[]) {
            const currentTime = Date.now();

            if (currentTime - lastExecTime > delay) {
                func(...args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func(...args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveId('');
    };

    const handleTocClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -100; // Offset for fixed headers
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
            setActiveId(id);
        }
    };

    const renderTOCItem = (item: TOCItem, index: number): JSX.Element => {
        const isActive = item.id === activeId;
        const indentClass = item.level > 1 ? `pl-${Math.min((item.level - 1) * 4, 16)}` : '';

        return (
            <li key={`${item.id}-${index}`} className="my-1">
                <button
                    onClick={() => handleTocClick(item.id)}
                    className={`
                        w-full text-left flex items-center py-2 px-3 rounded-lg text-sm
                        transition-all duration-200 ease-in-out group
                        ${indentClass}
                        ${isActive
                            ? isDarkMode
                                ? 'bg-blue-600/20 text-blue-300 border-l-2 border-blue-400'
                                : 'bg-blue-50 text-blue-700 border-l-2 border-blue-500'
                            : isDarkMode
                                ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }
                    `}
                >
                    {item.level === 1 ? (
                        <Hash className={`w-4 h-4 mr-2 flex-shrink-0 ${isActive ? 'opacity-100' : 'opacity-60'}`} />
                    ) : (
                        <ChevronRight className={`w-3 h-3 mr-2 flex-shrink-0 ${isActive ? 'opacity-100' : 'opacity-60'}`} />
                    )}
                    <span className="truncate" title={item.text}>
                        {item.text}
                    </span>
                </button>
            </li>
        );
    };

    if (toc.length === 0) {
        return null; // Don't render if no headings
    }

    return (
        <nav className={`
            sticky top-4 rounded-xl shadow-sm border transition-all duration-200
            ${isDarkMode
                ? 'bg-gray-800/95 backdrop-blur-sm border-gray-700'
                : 'bg-white/95 backdrop-blur-sm border-gray-200'
            }
        `}>
            <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <BookOpen className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Table of Contents
                        </h2>
                        <span className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                            }`}>
                            {toc.length}
                        </span>
                    </div>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={`p-2 rounded-lg transition-all duration-200 ${isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                            }`}
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    >
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <List className="w-4 h-4" />}
                    </button>
                </div>

                {isExpanded && (
                    <div className="space-y-2">
                        <ul className="space-y-1 max-h-96 overflow-y-auto  extra-thin-scrollbar scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                            {toc.map((item, index) => renderTOCItem(item, index))}
                        </ul>

                        <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
                            <button
                                onClick={scrollToTop}
                                className={`
                                    w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg
                                    text-sm font-medium transition-all duration-200
                                    ${isDarkMode
                                        ? 'bg-gray-700 hover:bg-gray-600 text-white hover:shadow-md'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:shadow-md'}
                                `}
                            >
                                <ArrowUpCircle className="w-4 h-4" />
                                Back to Top
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default TableOfContents;