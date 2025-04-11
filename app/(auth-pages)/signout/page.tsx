"use client";
import React, { useEffect, useState } from 'react';
import { LogOut, AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { signOut, useSession } from 'next-auth/react';

const SignOutPage = () => {
    const { isDarkMode } = useTheme();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { data, status } = useSession();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    const handleSignOut = async () => {
        setIsLoading(true);

        try {
            await signOut({
                redirect: false,
                callbackUrl: '/login',
            });
            router.push('/blogs');
        } catch (error) {
            console.error('Error signing out:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        router.back();
    };

    if (status === 'loading') {
        return (
            <div className={`min-h-screen flex items-center justify-center transition-colors duration-200 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
                }`}>
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen flex items-center justify-center transition-colors duration-200 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
            } p-4`}>
            <Card className={`w-full max-w-md shadow-md border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
                }`}>
                <CardHeader className="text-center">
                    <div className={`mx-auto mb-4 p-3 rounded-full ${isDarkMode ? 'bg-red-900/30' : 'bg-red-100'
                        }`}>
                        <LogOut className={`h-8 w-8 ${isDarkMode ? 'text-red-400' : 'text-red-600'
                            }`} />
                    </div>
                    <CardTitle className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                        Sign Out
                    </CardTitle>
                    <CardDescription className={
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }>
                        Are you sure you want to sign out of your account?
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className={`flex items-start p-4 rounded-lg ${isDarkMode ? 'bg-amber-900/20' : 'bg-amber-50'
                        }`}>
                        <AlertTriangle className={`h-5 w-5 mt-0.5 mr-3 flex-shrink-0 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'
                            }`} />
                        <p className={`text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-800'
                            }`}>
                            You'll need to sign in again to access your account and personalized features.
                        </p>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button
                        variant="outline"
                        onClick={handleCancel}
                        className={`w-full sm:w-1/2 ${isDarkMode
                                ? 'border-gray-700 hover:bg-gray-700 text-white'
                                : 'border-gray-300 hover:bg-gray-100 text-gray-800'
                            }`}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleSignOut}
                        disabled={isLoading}
                        className="w-full sm:w-1/2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Signing out...
                            </>
                        ) : (
                            "Sign Out"
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SignOutPage;