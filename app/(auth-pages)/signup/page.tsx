"use client";
import { FC } from 'react';
import { Check, Globe } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import SignupForm from '@/components/signup/SignupForm';

interface BrandFeatureProps {
    text: string;
}

const BrandFeature: FC<BrandFeatureProps> = ({ text }) => {
    const { isDarkMode } = useTheme();

    return (
        <div className="flex items-center space-x-2">
            <Check className={`w-5 h-5 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{text}</span>
        </div>
    );
};

const SignupContainer: FC = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`min-h-screen grid place-items-center p-4 transition-colors duration-200 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
            }`}>
            <div className="w-full max-w-4xl">
                <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
                    <div className={`rounded-lg shadow-md overflow-hidden ${isDarkMode ? 'bg-gray-800 shadow-gray-950/60' : 'bg-white shadow-gray-200/60'
                        }`}>
                        <div className="p-2 sm:p-6">
                            <SignupForm />
                        </div>
                    </div>

                    <div className="hidden md:flex flex-col">
                        {/* Brand section */}
                        <div className={`rounded-lg p-8 h-full flex flex-col shadow-md transition-colors duration-200 ${isDarkMode
                            ? 'bg-gradient-to-br from-indigo-950 to-indigo-900 shadow-gray-950/60'
                            : 'bg-gradient-to-br from-indigo-50 to-indigo-100 shadow-gray-200/60'
                            }`}>
                            {/* Logo Section */}
                            <div className="mb-8 text-center">
                                <div className={`w-16 h-16 rounded-full shadow-md flex items-center justify-center mx-auto mb-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'
                                    }`}>
                                    <img
                                        src="/logo.png"
                                        alt="DevBlogger Logo"
                                        className="w-12 h-auto rounded-full"
                                    />
                                </div>
                                <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-indigo-300' : 'text-indigo-800'
                                    }`}>
                                    Welcome to DevBlogger
                                </h3>
                                <p className={`text-sm ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                                    }`}>
                                    Your platform for tech insights
                                </p>
                            </div>

                            {/* Features List */}
                            <div className="space-y-4 mb-8">
                                <BrandFeature text="Write and share technical articles" />
                                <BrandFeature text="Connect with fellow developers" />
                                <BrandFeature text="Build your tech portfolio" />
                                <BrandFeature text="Stay updated with latest trends" />
                            </div>

                            {/* Social Proof */}
                            <div className="mt-auto">
                                <div className={`rounded-lg p-4 shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'
                                    }`}>
                                    <div className="flex justify-between mb-2">
                                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}>Active Writers</div>
                                        <div className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'
                                            }`}>10K+</div>
                                    </div>
                                    <div className="flex justify-between mb-4">
                                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}>Articles Published</div>
                                        <div className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'
                                            }`}>50K+</div>
                                    </div>
                                    <div className="flex -space-x-2">
                                        {[...Array(5)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${isDarkMode
                                                    ? 'border-gray-800 bg-indigo-900'
                                                    : 'border-white bg-indigo-100'
                                                    }`}
                                            >
                                                <img
                                                    src="/api/placeholder/24/24"
                                                    alt={`User ${i + 1}`}
                                                    className="w-6 h-6 rounded-full"
                                                    onError={(e) => {
                                                        e.currentTarget.onerror = null;
                                                        e.currentTarget.src = '';
                                                        if (e.currentTarget.parentElement) {
                                                            e.currentTarget.parentElement.innerHTML = `<span class="${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                                                                }">${String.fromCharCode(65 + i)}</span>`;
                                                        }
                                                    }}
                                                />
                                            </div>
                                        ))}
                                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-white text-xs ${isDarkMode
                                            ? 'border-gray-800 bg-indigo-700'
                                            : 'border-white bg-indigo-600'
                                            }`}>
                                            +99
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badge */}
                            <div className="mt-4 text-center">
                                <p className={`text-xs flex items-center justify-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    <span>Trusted by developers worldwide</span>
                                    <Globe className="w-3 h-3" />
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Mobile version of brand features */}
                    <div className="md:hidden mt-4">
                        <div className={`rounded-lg p-6 shadow-md ${isDarkMode
                            ? 'bg-gray-800 shadow-gray-950/60'
                            : 'bg-white shadow-gray-200/60'
                            }`}>
                            <h3 className={`text-lg font-bold mb-4 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                Why join DevBlogger?
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <BrandFeature text="Write & share articles" />
                                <BrandFeature text="Connect with devs" />
                                <BrandFeature text="Build your portfolio" />
                                <BrandFeature text="Stay updated" />
                            </div>
                            <div className="mt-4 text-center">
                                <p className={`text-xs flex items-center justify-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    <span>Joined by 10K+ developers worldwide</span>
                                    <Globe className="w-3 h-3" />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupContainer;