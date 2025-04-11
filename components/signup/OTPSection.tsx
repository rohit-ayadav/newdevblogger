import { FC, useEffect } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { FormData } from './useSignupForm';
import { Loader2, KeyRound } from 'lucide-react';

interface OTPSectionProps {
    formData: FormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleResendOTP: () => void;
    handleSubmit: () => void;
    isLoading: boolean;
    timer: number;
    setTimer: React.Dispatch<React.SetStateAction<number>>;
    isDarkMode?: boolean;
}

const OTPSection: FC<OTPSectionProps> = ({
    formData,
    handleChange,
    handleResendOTP,
    handleSubmit,
    isLoading,
    timer,
    setTimer,
    isDarkMode = false
}) => {
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [timer, setTimer]);

    return (
        <div className="grid gap-4">
            <div className="space-y-2">
                <div className={`p-3 rounded-md text-sm ${isDarkMode
                        ? 'bg-indigo-900/20 text-indigo-300 border border-indigo-800'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                    }`}>
                    <p>We've sent a verification code to your email. Please enter it below.</p>
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <KeyRound className={`h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'
                            }`} />
                    </div>

                    <input
                        type="text"
                        name="otp"
                        placeholder="Enter verification code"
                        value={formData.otp}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none transition-colors ${isDarkMode
                                ? 'bg-gray-800 border-gray-700 text-white focus:ring-indigo-400 focus:border-indigo-400'
                                : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                            }`}
                        required
                        maxLength={6}
                        autoComplete="one-time-code"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        onClick={handleResendOTP}
                        disabled={timer > 0 || isLoading}
                        className={`text-sm transition-colors ${timer > 0 || isLoading
                                ? (isDarkMode ? 'text-gray-500' : 'text-gray-400')
                                : (isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500')
                            }`}
                        type="button"
                    >
                        Resend code {timer > 0 && `(${timer}s)`}
                    </button>

                    {timer > 0 && (
                        <Badge variant={isDarkMode ? "outline" : "secondary"} className={`animate-pulse ${isDarkMode
                                ? 'border-indigo-700 text-indigo-400 bg-indigo-900/20'
                                : 'bg-indigo-100 text-indigo-700'
                            }`}>
                            Wait {timer}s
                        </Badge>
                    )}
                </div>
            </div>

            <Button
                onClick={handleSubmit}
                disabled={isLoading || !formData.otp}
                className={`w-full ${isDarkMode
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-indigo-800/50 disabled:text-gray-300'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-indigo-300'
                    }`}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                    </>
                ) : (
                    'Create Account'
                )}
            </Button>
        </div>
    );
};

export default OTPSection;