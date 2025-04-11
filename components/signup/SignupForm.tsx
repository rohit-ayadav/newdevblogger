'use client';
import { FC } from 'react';
import FormHeader from './FormHeader';
import FormFields from './FormFields';
import OTPSection from './OTPSection';
import SocialLogin from './SocialLogin';
import useSignupForm from './useSignupForm';
import { Button } from '../ui/button';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Separator } from '../ui/separator';

const SignupForm: FC = () => {
    const {
        formData,
        passwordCriteria,
        isLoading,
        otpRequested,
        timer,
        setTimer,
        error,
        handleChange,
        handleRequestOTP,
        handleResendOTP,
        handleSubmit,
        isUsernameAvailable
    } = useSignupForm();
    const router = useRouter();
    const { isDarkMode } = useTheme();

    return (
        <div className={`rounded-lg transition-colors duration-200 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
            <FormHeader isDarkMode={isDarkMode} />

            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        background: isDarkMode ? '#1f2937' : '#ffffff',
                        color: isDarkMode ? '#f3f4f6' : '#111827',
                        borderColor: isDarkMode ? '#374151' : '#e5e7eb'
                    }
                }}
            />

            {error && error.message && (
                <Alert variant="destructive" className={`animate-shake mb-6 transition-colors ${isDarkMode
                        ? 'bg-red-900/20 border-red-800 text-red-300'
                        : 'bg-red-50 border-red-300 text-red-700'
                    }`}>
                    <AlertCircle className="h-4 w-4 mr-2" />
                    {error.title && <AlertTitle>{error.title}</AlertTitle>}
                    <AlertDescription>{error.message}</AlertDescription>
                </Alert>
            )}

            <div className="grid gap-6">
                <FormFields
                    formData={formData}
                    handleChange={handleChange}
                    passwordCriteria={passwordCriteria}
                    usernameAvailable={isUsernameAvailable}
                    isDarkMode={isDarkMode}
                />

                {otpRequested ? (
                    <OTPSection
                        formData={formData}
                        handleChange={handleChange}
                        handleResendOTP={handleResendOTP}
                        handleSubmit={handleSubmit}
                        isLoading={isLoading}
                        timer={timer}
                        setTimer={setTimer}
                        isDarkMode={isDarkMode}
                    />
                ) : (
                    <div className="grid gap-4">
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'
                            }`}>
                            We'll send an OTP to your email to verify your account
                        </p>
                        <Button
                            onClick={handleRequestOTP}
                            disabled={isLoading || !formData.email}
                            className={`w-full ${isDarkMode
                                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-indigo-800/50 disabled:text-gray-300'
                                    : 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-indigo-300'
                                }`}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                'Request OTP'
                            )}
                        </Button>
                    </div>
                )}

                <div className="relative my-2">
                    <div className={`absolute inset-0 flex items-center ${isDarkMode ? 'opacity-70' : ''}`}>
                        <Separator className={isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className={`px-2 ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'
                            }`}>
                            Or continue with
                        </span>
                    </div>
                </div>

                <SocialLogin isLoading={isLoading} isDarkMode={isDarkMode} />

                <div className="text-center">
                    <Link href="/login">
                        <Button
                            type="button"
                            variant="link"
                            className={isDarkMode ? 'text-indigo-300 hover:text-indigo-200' : 'text-indigo-600 hover:text-indigo-800'}
                        >
                            Already have an account? Login
                        </Button>
                    </Link>
                </div>

                {/* Privacy Policy and Terms of Use Notice */}
                <div className={`text-xs text-center mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                    By signing up, you agree to our{' '}
                    <Link href="/toc" className={`font-medium ${isDarkMode ? 'text-indigo-300 hover:text-indigo-200' : 'text-indigo-600 hover:text-indigo-500'
                        }`}>
                        Terms of Use
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className={`font-medium ${isDarkMode ? 'text-indigo-300 hover:text-indigo-200' : 'text-indigo-600 hover:text-indigo-500'
                        }`}>
                        Privacy Policy
                    </Link>.
                </div>
            </div>
        </div>
    );
};

export default SignupForm;