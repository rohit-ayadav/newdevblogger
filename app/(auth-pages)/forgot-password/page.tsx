"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { isValidEmail } from '@/lib/common-function';
import { findEmailFromUserName } from '@/action/checkUserNameAvailability';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, Home, Loader2, Mail } from 'lucide-react';

export default function ForgotPassword() {
    const [identifier, setIdentifier] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [cooldownTime, setCooldownTime] = useState(0);
    const router = useRouter();
    const { isDarkMode } = useTheme();

    // Effect to manage countdown timer
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (cooldownTime > 0) {
            timer = setInterval(() => {
                setCooldownTime(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => {
            if (timer) {
                clearInterval(timer); // Clear interval on unmount
                // Reset cooldown time
                setCooldownTime(0);
                // Reset attempts
                localStorage.setItem('passwordResetAttempts', '0');
            }
        }
    }, [cooldownTime]);

    // Check if request is allowed based on local storage
    const checkRequestAllowed = () => {
        const lastRequestTime = localStorage.getItem('lastPasswordResetRequest');
        if (lastRequestTime) {
            const timeSinceLastRequest = Date.now() - parseInt(lastRequestTime);
            return timeSinceLastRequest > 60000; // 60 seconds between requests
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Check if another request is too soon
        if (!checkRequestAllowed()) {
            setError('Please wait 60 seconds between reset requests');
            return;
        }

        // Check if we've exceeded max attempts
        const attempts = parseInt(localStorage.getItem('passwordResetAttempts') || '0');
        if (attempts >= 3) {
            // setError('Too many reset attempts. Please try again later.');
            // setCooldownTime(300); // 5-minute cooldown
            // return;
        }

        setIsLoading(true);
        const trimmedIdentifier = identifier.trim();

        if (!trimmedIdentifier) {
            setError('Email or username is required');
            setIsLoading(false);
            return;
        }

        try {
            let validatedEmail = trimmedIdentifier;
            if (!isValidEmail(trimmedIdentifier)) {
                const emailFromUserName = await findEmailFromUserName(trimmedIdentifier);
                if (emailFromUserName) {
                    validatedEmail = emailFromUserName;
                } else {
                    setError('Invalid email or username');
                    setIsLoading(false);
                    return;
                }
            }

            // Send password reset request
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: validatedEmail, username: trimmedIdentifier }),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.error || 'Password reset request failed');
            }

            // Store request timestamp and increment attempts
            localStorage.setItem('lastPasswordResetRequest', Date.now().toString());
            const currentAttempts = (parseInt(localStorage.getItem('passwordResetAttempts') || '0') + 1);
            localStorage.setItem('passwordResetAttempts', currentAttempts.toString());

            const result = await response.json();
            setSuccess(result.message || 'Password reset email sent. Please check your inbox.');
            setCooldownTime(30); // 30-second cooldown

        } catch (err) {
            const error = err as Error;
            toast.error(error.message || 'Password reset request failed');
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${isDarkMode
                ? 'bg-gray-900 text-gray-100'
                : 'bg-gray-50 text-gray-900'
            }`}>
            <div className="max-w-md w-full space-y-6">
                <div className="flex flex-col items-center space-y-2 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
                    <h2 className={`text-2xl sm:text-3xl font-extrabold text-center sm:text-left ${isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                        Reset Your Password
                    </h2>
                </div>

                <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800 shadow-gray-900/60' : 'bg-white shadow-gray-200/60'
                    }`}>
                    {!success ? (
                        <>
                            <p className={`mb-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                Enter your email address or username and we'll send you a link to reset your password.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {error && (
                                    <Alert variant="destructive" className={`animate-fadeIn transition-all ${isDarkMode
                                            ? 'bg-red-900/20 border-red-800 text-red-300'
                                            : 'bg-red-50 border-red-300 text-red-700'
                                        }`}>
                                        <AlertCircle className="h-4 w-4 mr-2" />
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                <div className="relative">
                                    <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'
                                        }`} />
                                    <input
                                        type="text"
                                        placeholder="Email address or username"
                                        value={identifier}
                                        onChange={(e) => {
                                            setIdentifier(e.target.value);
                                            setError(null);
                                        }}
                                        className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none transition-colors ${isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-white focus:ring-indigo-400 focus:border-indigo-400'
                                                : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                                            } ${error ? 'border-red-500' : ''}`}
                                        aria-label="Email or Username"
                                        required
                                        autoComplete='email'
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading || cooldownTime > 0}
                                    className={`w-full ${isDarkMode
                                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-indigo-800/50 disabled:text-gray-300'
                                            : 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-indigo-300'
                                        }`}
                                >
                                    {cooldownTime > 0 ? (
                                        <div className="flex items-center justify-center">
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Try again in {cooldownTime}s
                                        </div>
                                    ) : isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sending Reset Link...
                                        </div>
                                    ) : (
                                        'Send Reset Link'
                                    )}
                                </Button>

                                <div className="text-center mt-4">
                                    <Link href="/login">
                                        <Button
                                            type="button"
                                            variant="link"
                                            className={isDarkMode ? 'text-indigo-300' : 'text-indigo-600'}
                                        >
                                            Back to Login
                                        </Button>
                                    </Link>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="space-y-4">
                            <Alert className={`animate-fadeIn transition-all ${isDarkMode
                                    ? 'bg-green-900/20 border-green-800 text-green-300'
                                    : 'bg-green-50 border-green-300 text-green-700'
                                }`}>
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                <AlertDescription>{success}</AlertDescription>
                            </Alert>

                            <div className={`mt-4 p-4 rounded-md ${isDarkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-50 text-gray-600'
                                }`}>
                                <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'
                                    }`}>What happens next?</h3>
                                <ol className="list-decimal ml-5 text-sm space-y-1">
                                    <li>Check your email inbox for the reset link</li>
                                    <li>Click the link in the email to set a new password</li>
                                    <li>Use your new password to log in</li>
                                </ol>
                            </div>

                            <div className="text-center mt-6">
                                <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    You can request another reset in {cooldownTime} seconds
                                </p>
                                <Link href="/login">
                                    <Button
                                        className={`w-full ${isDarkMode
                                                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                                                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                                            }`}
                                    >
                                        Return to Login
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}