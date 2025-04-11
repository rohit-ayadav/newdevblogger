import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Lock } from 'lucide-react';

interface PasswordInputProps {
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showPassword?: boolean;
    togglePassword?: () => void;
    isDarkMode?: boolean;
}

const PasswordInput = ({
    name,
    placeholder,
    value,
    onChange,
    isDarkMode = false
}: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(!showPassword);

    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className={`h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`} />
            </div>

            <input
                type={showPassword ? "text" : "password"}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none transition-colors ${isDarkMode
                        ? 'bg-gray-800 border-gray-700 text-white focus:ring-indigo-400 focus:border-indigo-400'
                        : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                    }`}
                required
                autoComplete={name === 'password' ? 'new-password' : 'current-password'}
            />

            <button
                type="button"
                onClick={togglePassword}
                className={`absolute inset-y-0 right-0 pr-3 flex items-center text-sm ${isDarkMode
                        ? 'text-gray-400 hover:text-gray-300'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                {showPassword ? (
                    <FaEyeSlash className="h-5 w-5" />
                ) : (
                    <FaEye className="h-5 w-5" />
                )}
            </button>
        </div>
    );
};

export default PasswordInput;