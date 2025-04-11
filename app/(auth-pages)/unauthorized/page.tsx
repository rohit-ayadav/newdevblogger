"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AlertCircle, ArrowLeft, Home, ShieldOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function UnauthorizedPage() {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isDarkMode } = useTheme();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <div className={`flex items-center justify-center min-h-screen p-4 transition-colors duration-200 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
            }`}>
            <Card className={`w-full max-w-md shadow-md ${isDarkMode
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-200 text-gray-900'
                }`}>
                <CardHeader className="space-y-1">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-red-100 dark:bg-red-900/30">
                        <ShieldOff className={`h-8 w-8 ${isDarkMode ? 'text-red-400' : 'text-red-600'
                            }`} />
                    </div>
                    <CardTitle className={`text-2xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                        Unauthorized Access
                    </CardTitle>
                    <CardDescription className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                        You don't have permission to access this page
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className={`p-4 rounded-lg mb-4 ${isDarkMode ? 'bg-amber-900/20' : 'bg-amber-50'
                        }`}>
                        <div className="flex items-start">
                            <AlertCircle className={`h-5 w-5 mt-0.5 mr-3 flex-shrink-0 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'
                                }`} />
                            <p className={`text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-800'
                                }`}>
                                Sorry, you don't have the necessary permissions to view this page. If you believe this is an error, please contact the administrator.
                            </p>
                        </div>
                    </div>

                    <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                        <p>You can try:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>Logging in with a different account</li>
                            <li>Returning to the previous page</li>
                            <li>Going to the home page</li>
                        </ul>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button
                        variant="outline"
                        onClick={() => router.back()}
                        className={`w-full sm:w-1/2 ${isDarkMode
                                ? 'border-gray-700 hover:bg-gray-700 text-white'
                                : 'border-gray-300 hover:bg-gray-100 text-gray-800'
                            }`}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Go Back
                    </Button>

                    <Button
                        className={`w-full sm:w-1/2 ${isDarkMode
                                ? 'bg-indigo-600 hover:bg-indigo-700'
                                : 'bg-indigo-600 hover:bg-indigo-700'
                            }`}
                        asChild
                    >
                        <Link href="/blogs">
                            <Home className="h-4 w-4 mr-2" />
                            Return to Home
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}