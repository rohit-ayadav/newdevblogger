"use client";
import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { AlertCircle, Eye, EyeOff, Home, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import LoadingEffect from '@/lib/LoadingEffect';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

function PasswordResetContent() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const { data, status } = useSession();
    const { isDarkMode } = useTheme();

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (status === 'authenticated') {
            setError('You are already logged in, you can change your password in your profile');
            toast.error('You are already logged in, you can change your password in your profile');
            new Promise(resolve => setTimeout(resolve, 3000)).then(() =>
                router.push('/profile'));
        }
        if (!searchParams.has('token') || !searchParams.has('email')) {
            setError('Invalid reset link');
            return;
        }
        const token = searchParams.get('token');
        const email = searchParams.get('email');
        setToken(token);
        setEmail(email);
    }, [searchParams, status, router]);

    useEffect(() => {
        if (password) {
            validatePassword(password);
            updatePasswordStrength(password);
        } else {
            setPasswordStrength(0);
        }
    }, [password]);

    const updatePasswordStrength = (pwd: string) => {
        let strength = 0;
        if (/[A-Z]/.test(pwd)) strength += 25;
        if (/[a-z]/.test(pwd)) strength += 25;
        if (/[0-9]/.test(pwd)) strength += 25;
        if (/[!@#$%^&*]/.test(pwd)) strength += 25;
        if (pwd.length < 8) strength = Math.min(strength, 50);
        setPasswordStrength(strength);
    };

    const validatePassword = (pwd: string) => {
        const errors: string[] = [];
        if (!/[A-Z]/.test(pwd)) errors.push("Must contain an uppercase letter");
        if (!/[a-z]/.test(pwd)) errors.push("Must contain a lowercase letter");
        if (!/[0-9]/.test(pwd)) errors.push("Must contain a number");
        if (!/[!@#$%^&*]/.test(pwd)) errors.push("Must contain a special character");
        if (pwd.length < 8) errors.push("Password must be at least 8 characters");
        if (errors.length === 0) setError(null);
        else
            setError(errors[0]);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!token || !email) {
            setError('Invalid reset link');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        validatePassword(password);
        if (error && error !== 'Passwords do not match' && error !== 'Invalid reset link') {
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    newPassword: password,
                    email,
                }),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.error || 'Password reset failed');
            }

            toast.success('Password reset successful');
            router.push('/login');
        } catch (err) {
            const error = err as Error;
            toast.error(error.message);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength < 50) return isDarkMode ? 'bg-red-700' : 'bg-red-500';
        if (passwordStrength < 100) return isDarkMode ? 'bg-yellow-600' : 'bg-yellow-500';
        return isDarkMode ? 'bg-green-600' : 'bg-green-500';
    };

    return (
        <div className={`min-h-screen flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${isDarkMode
                ? 'bg-gray-900 text-gray-100'
                : 'bg-gray-50 text-gray-900'
            }`}>
            <div className="max-w-md w-full space-y-8">
                <div className="flex flex-col items-center space-y-2 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
                    <h2 className={`text-2xl sm:text-3xl font-extrabold text-center sm:text-left ${isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                        Reset Your Password
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <Alert variant="destructive" className={`animate-fadeIn transition-all ${isDarkMode
                                ? 'bg-red-900/20 border-red-800 text-red-300'
                                : 'bg-red-50 border-red-300 text-red-700'
                            }`}>
                            <AlertCircle className="h-4 w-4 mr-2" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-4">
                        <div className="space-y-1">
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="New Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none pr-10 transition-colors ${isDarkMode
                                            ? 'bg-gray-800 border-gray-700 text-white focus:ring-indigo-400 focus:border-indigo-400'
                                            : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                                        } ${error && !error.includes('match') && !error.includes('link') ? 'border-red-500' : ''}`}
                                    required
                                    autoComplete='new-password'
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={`absolute inset-y-0 right-0 pr-3 flex items-center ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </Button>
                            </div>

                            {password.length > 0 && (
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Password strength</span>
                                        <span className={
                                            passwordStrength === 100
                                                ? (isDarkMode ? 'text-green-400' : 'text-green-600')
                                                : passwordStrength >= 75
                                                    ? (isDarkMode ? 'text-yellow-400' : 'text-yellow-600')
                                                    : (isDarkMode ? 'text-red-400' : 'text-red-600')
                                        }>
                                            {passwordStrength === 100 ? 'Strong' : passwordStrength >= 75 ? 'Good' : 'Weak'}
                                        </span>
                                    </div>
                                    <div className={`h-1 w-full rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                        <div
                                            className={`h-1 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                                            style={{ width: `${passwordStrength}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none pr-10 transition-colors ${isDarkMode
                                        ? 'bg-gray-800 border-gray-700 text-white focus:ring-indigo-400 focus:border-indigo-400'
                                        : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                                    } ${error && error.includes('match') ? 'border-red-500' : ''}`}
                                required
                                autoComplete='new-password'
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className={`absolute inset-y-0 right-0 pr-3 flex items-center ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </Button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading || Boolean(error)}
                        className={`w-full ${isDarkMode
                                ? 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-indigo-800 disabled:text-gray-300'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-indigo-300'
                            }`}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Resetting Password...
                            </>
                        ) : (
                            'Reset Password'
                        )}
                    </Button>

                    <div className="flex justify-center">
                        <Link href="/login" className={`text-sm ${isDarkMode ? 'text-indigo-300 hover:text-indigo-200' : 'text-indigo-600 hover:text-indigo-800'
                            }`}>
                            Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function PasswordReset() {
    return (
        <Suspense fallback={<LoadingEffect />}>
            <PasswordResetContent />
        </Suspense>
    );
}