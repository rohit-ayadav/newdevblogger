import { FC } from 'react';
import PasswordInput from './PasswordInput';
import PasswordCriteria from './PasswordCriteria';
import { FormData, PasswordCriteriaType } from './useSignupForm';
import { User, Mail, Check, X } from 'lucide-react';

interface FormFieldsProps {
    formData: FormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    passwordCriteria: PasswordCriteriaType;
    usernameAvailable: boolean;
    isDarkMode?: boolean;
}

const FormFields: FC<FormFieldsProps> = ({
    formData,
    handleChange,
    passwordCriteria,
    usernameAvailable,
    isDarkMode = false
}) => {
    return (
        <div className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
                {/* Full Name Input */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className={`h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'
                            }`} />
                    </div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none transition-colors ${isDarkMode
                                ? 'bg-gray-800 border-gray-700 text-white focus:ring-indigo-400 focus:border-indigo-400'
                                : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                            }`}
                        required
                        autoComplete="name"
                    />
                </div>

                {/* Username Input */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-500' : 'text-gray-400'
                            }`}>@</span>
                    </div>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none transition-colors ${isDarkMode
                                ? 'bg-gray-800 border-gray-700 text-white focus:ring-indigo-400 focus:border-indigo-400'
                                : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                            } ${formData.username && !usernameAvailable
                                ? 'border-red-500'
                                : formData.username && usernameAvailable
                                    ? (isDarkMode ? 'border-green-600' : 'border-green-500')
                                    : ''
                            }`}
                        required
                        autoComplete="username"
                    />

                    {formData.username && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            {usernameAvailable ? (
                                <Check className="h-5 w-5 text-green-500" />
                            ) : (
                                <X className="h-5 w-5 text-red-500" />
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Username Availability Feedback */}
            {formData.username && (
                <div className={`text-sm flex items-center space-x-1 ${usernameAvailable
                        ? (isDarkMode ? 'text-green-400' : 'text-green-600')
                        : (isDarkMode ? 'text-red-400' : 'text-red-600')
                    }`}>
                    {usernameAvailable ? (
                        <>
                            <Check className="h-4 w-4" />
                            <span>Username is available</span>
                        </>
                    ) : (
                        <>
                            <X className="h-4 w-4" />
                            <span>Username is not available</span>
                        </>
                    )}
                </div>
            )}

            {/* Email Input */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className={`h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'
                        }`} />
                </div>
                <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none transition-colors ${isDarkMode
                            ? 'bg-gray-800 border-gray-700 text-white focus:ring-indigo-400 focus:border-indigo-400'
                            : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                        }`}
                    required
                    autoComplete="email"
                />
            </div>

            {/* Password Input */}
            <PasswordInput
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                showPassword={false}
                togglePassword={() => { }}
                isDarkMode={isDarkMode}
            />

            {/* Password Criteria */}
            {formData.password && (
                <PasswordCriteria
                    criteria={passwordCriteria}
                    isDarkMode={isDarkMode}
                />
            )}

            {/* Confirm Password Input */}
            <PasswordInput
                name="confirmPass"
                placeholder="Confirm Password"
                value={formData.confirmPass}
                onChange={handleChange}
                showPassword={false}
                togglePassword={() => { }}
                isDarkMode={isDarkMode}
            />

            {/* Password Match Feedback */}
            {formData.password !== formData.confirmPass && formData.confirmPass && (
                <div className={`text-sm flex items-center space-x-1 ${isDarkMode ? 'text-red-400' : 'text-red-600'
                    }`}>
                    <X className="h-4 w-4" />
                    <span>Passwords do not match</span>
                </div>
            )}
            {formData.password === formData.confirmPass && formData.confirmPass && (
                <div className={`text-sm flex items-center space-x-1 ${isDarkMode ? 'text-green-400' : 'text-green-600'
                    }`}>
                    <Check className="h-4 w-4" />
                    <span>Passwords match</span>
                </div>
            )}
        </div>
    );
};

export default FormFields;