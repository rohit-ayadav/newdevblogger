"use client";
import React from 'react'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

const SearchBar404 = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div>
            <div className="max-w-md mx-auto">
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                        placeholder="Search for content..."
                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 transition-colors duration-300 ${isDarkMode
                                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                            }`}
                    />
                    <Search
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'
                            }`}
                        onClick={handleSearch}
                    />
                </div>
            </div>
        </div>
    )
}

export default SearchBar404