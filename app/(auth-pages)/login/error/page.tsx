'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, ArrowLeft, ExternalLink, KeyRound, Loader2, LockIcon, LogIn, Mail } from 'lucide-react';
import LoadingEffect from '@/lib/LoadingEffect';

interface AuthErrorProps {
    callbackUrl?: string;
}

function AuthError({ callbackUrl: propCallbackUrl }: AuthErrorProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    const [isLinking, setIsLinking] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const { isDarkMode } = useTheme();

    // Process the callbackUrl if present, prioritize prop over search param
    const callbackUrl = propCallbackUrl || searchParams.get('callbackUrl') || '/';

    // Get the email from the query params (if available)
    const email = searchParams.get('email') || '';
    const provider = searchParams.get('provider') || '';

    useEffect(() => {
        // Pre-fetch the login page for faster transition
        router.prefetch('/login');
    }, [router]);

    // Map error codes to user-friendly messages
    const getErrorMessage = (errorCode: string | null) => {
        switch (errorCode) {
            case 'CredentialsSignin':
                return 'Invalid email or password. Please try again.';
            case 'OAuthAccountNotLinked':
                return `This ${provider || 'social'} account is not linked to your existing account.`;
            case 'EmailSignin':
                return 'Failed to send verification email. Please try again.';
            case 'SessionRequired':
                return 'You need to be signed in to access this page.';
            case 'CallbackUrlRequired':
                return 'No callback URL was provided for authentication.';
            case 'AccessDenied':
                return 'Access denied. You don\'t have permission to access this resource.';
            case 'Verification':
                return 'The verification link is invalid or has expired.';
            case 'Configuration':
                return 'There is a problem with the server configuration.';
            case 'TokenExpired':
                return 'Your authentication token has expired. Please sign in again.';
            default:
                return errorCode || 'An unexpected authentication error occurred.';
        }
    };

    const handleLinkAccounts = async () => {
        setIsLinking(true);
        try {
            // Get the provider from the params or default to a sensible option
            const providerToUse = provider || 'google';
            await signIn(providerToUse, { callbackUrl });
        } catch (err) {
            console.error('Error during account linking:', err);
            setIsLinking(false);
        }
    };

    const handleReturnToSignIn = () => {
        setIsRedirecting(true);
        router.push('/login');
    };

    // For the account linking issue specifically
    if (error === 'OAuthAccountNotLinked') {
        return (
            <div className={`min-h-screen flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
                }`}>
                <div className="max-w-md w-full space-y-6">
                    <div className="flex flex-col items-center space-y-2 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
                        <h2 className={`text-2xl sm:text-3xl font-extrabold text-center sm:text-left ${isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                            Account Linking Required
                        </h2>
                    </div>

                    <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800 shadow-gray-900/60' : 'bg-white shadow-gray-200/60'
                        }`}>
                        <Alert variant="destructive" className={`mb-4 animate-fadeIn transition-all ${isDarkMode
                                ? 'bg-yellow-900/20 border-yellow-800 text-yellow-300'
                                : 'bg-yellow-50 border-yellow-300 text-yellow-700'
                            }`}>
                            <AlertCircle className="h-4 w-4 mr-2" />
                            <AlertDescription>
                                We found an existing account with your email address, but it uses a different sign-in method.
                            </AlertDescription>
                        </Alert>

                        <div className={`mt-4 p-4 rounded-md ${isDarkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-50 text-gray-600'
                            }`}>
                            <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'
                                }`}>Account Details</h3>
                            <div className="space-y-2 text-sm">
                                {email && (
                                    <div className="flex items-center">
                                        <Mail className="h-4 w-4 mr-2" />
                                        <span>{email}</span>
                                    </div>
                                )}
                                {provider && (
                                    <div className="flex items-center">
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        <span>Sign in attempt with: {provider}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={`mt-4 p-4 rounded-md ${isDarkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-50 text-gray-600'
                            }`}>
                            <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'
                                }`}>What happens next?</h3>
                            <ol className="list-decimal ml-5 text-sm space-y-1">
                                <li>You can link this new method to your existing account</li>
                                <li>Or you can return to sign in with your original method</li>
                                <li>Account linking helps keep all your data in one place</li>
                            </ol>
                        </div>

                        <div className="flex flex-col space-y-3 mt-6">
                            <Button
                                onClick={handleLinkAccounts}
                                disabled={isLinking}
                                className={`w-full ${isDarkMode
                                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-indigo-800/50 disabled:text-gray-300'
                                        : 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-indigo-300'
                                    }`}
                            >
                                {isLinking ? (
                                    <div className="flex items-center justify-center">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Linking Accounts...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <KeyRound className="mr-2 h-4 w-4" />
                                        Link My Accounts
                                    </div>
                                )}
                            </Button>

                            <Button
                                onClick={handleReturnToSignIn}
                                disabled={isRedirecting}
                                variant="outline"
                                className={`w-full ${isDarkMode
                                        ? 'border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-200'
                                        : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-800'
                                    }`}
                            >
                                {isRedirecting ? (
                                    <div className="flex items-center justify-center">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Redirecting...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Return to Sign In
                                    </div>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Handle other types of errors
    return (
        <div className={`min-h-screen flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
            }`}>
            <div className="max-w-md w-full space-y-6">
                <div className="flex flex-col items-center space-y-2 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
                    <h2 className={`text-2xl sm:text-3xl font-extrabold text-center sm:text-left ${isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                        Authentication Error
                    </h2>
                </div>

                <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800 shadow-gray-900/60' : 'bg-white shadow-gray-200/60'
                    }`}>
                    <Alert variant="destructive" className={`mb-4 animate-fadeIn transition-all ${isDarkMode
                            ? 'bg-red-900/20 border-red-800 text-red-300'
                            : 'bg-red-50 border-red-300 text-red-700'
                        }`}>
                        <AlertCircle className="h-4 w-4 mr-2" />
                        <AlertDescription>
                            {getErrorMessage(error)}
                        </AlertDescription>
                    </Alert>

                    <div className={`mt-4 p-4 rounded-md ${isDarkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-50 text-gray-600'
                        }`}>
                        <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'
                            }`}>Troubleshooting tips</h3>
                        <ul className="list-disc ml-5 text-sm space-y-1">
                            {error === 'CredentialsSignin' && (
                                <>
                                    <li>Double-check your email and password</li>
                                    <li>Passwords are case sensitive</li>
                                    <li>Make sure Caps Lock is not enabled</li>
                                </>
                            )}
                            {error === 'SessionRequired' && (
                                <>
                                    <li>Your session may have expired</li>
                                    <li>Sign in again to continue</li>
                                </>
                            )}
                            {error === 'Verification' && (
                                <>
                                    <li>Your verification link has expired</li>
                                    <li>Request a new verification email</li>
                                </>
                            )}
                            {error !== 'CredentialsSignin' && error !== 'SessionRequired' && error !== 'Verification' && (
                                <>
                                    <li>Try signing in again</li>
                                    <li>Clear your browser cookies and cache</li>
                                    <li>Use a different sign-in method if available</li>
                                </>
                            )}
                        </ul>
                    </div>

                    <div className="flex flex-col space-y-3 mt-6">
                        <Button
                            onClick={handleReturnToSignIn}
                            disabled={isRedirecting}
                            className={`w-full ${isDarkMode
                                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-indigo-800/50 disabled:text-gray-300'
                                    : 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-indigo-300'
                                }`}
                        >
                            {isRedirecting ? (
                                <div className="flex items-center justify-center">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Redirecting to Sign In...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <LogIn className="mr-2 h-4 w-4" />
                                    Return to Sign In
                                </div>
                            )}
                        </Button>

                        {error === 'Verification' && (
                            <Link href="/forgot-password">
                                <Button
                                    variant="outline"
                                    className={`w-full mt-3 ${isDarkMode
                                            ? 'border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-200'
                                            : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-800'
                                        }`}
                                >
                                    <LockIcon className="mr-2 h-4 w-4" />
                                    Reset Password
                                </Button>
                            </Link>
                        )}

                        <Link href="/">
                            <Button
                                variant="link"
                                className={`w-full mt-2 ${isDarkMode ? 'text-indigo-300' : 'text-indigo-600'
                                    }`}
                            >
                                Return to Homepage
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AuthenticationError() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    return (
        <React.Suspense fallback={<LoadingEffect />}>
            <AuthError callbackUrl={callbackUrl} />
        </React.Suspense>
    );
}

export default AuthenticationError;