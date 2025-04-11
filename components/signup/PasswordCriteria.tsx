import { Check, X } from 'lucide-react';
import { PasswordCriteriaType } from './useSignupForm';

interface PasswordCriteriaProps {
    criteria: PasswordCriteriaType;
    isDarkMode?: boolean;
}

const PasswordCriteria = ({ criteria, isDarkMode = false }: PasswordCriteriaProps) => {
    const allCriteriaMet = Object.values(criteria).every(c => c);

    if (allCriteriaMet) {
        return (
            <div className="flex items-center text-sm">
                <Check className={isDarkMode ? "text-green-400" : "text-green-500"} size={16} />
                <span className={`ml-2 ${isDarkMode ? "text-green-400" : "text-green-600"}`}>Valid password</span>
            </div>
        );
    }

    return (
        <div className={`space-y-1 text-sm rounded-md p-2 ${isDarkMode ? "bg-gray-800/50" : "bg-gray-50"
            }`}>
            <div className="flex items-center">
                {criteria.hasUppercase ? (
                    <Check className={isDarkMode ? "text-green-400" : "text-green-500"} size={16} />
                ) : (
                    <X className={isDarkMode ? "text-red-400" : "text-red-500"} size={16} />
                )}
                <span className={`ml-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>Uppercase letter</span>
            </div>

            <div className="flex items-center">
                {criteria.hasLowercase ? (
                    <Check className={isDarkMode ? "text-green-400" : "text-green-500"} size={16} />
                ) : (
                    <X className={isDarkMode ? "text-red-400" : "text-red-500"} size={16} />
                )}
                <span className={`ml-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>Lowercase letter</span>
            </div>

            <div className="flex items-center">
                {criteria.hasNumber ? (
                    <Check className={isDarkMode ? "text-green-400" : "text-green-500"} size={16} />
                ) : (
                    <X className={isDarkMode ? "text-red-400" : "text-red-500"} size={16} />
                )}
                <span className={`ml-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>Number</span>
            </div>

            <div className="flex items-center">
                {criteria.hasSpecialChar ? (
                    <Check className={isDarkMode ? "text-green-400" : "text-green-500"} size={16} />
                ) : (
                    <X className={isDarkMode ? "text-red-400" : "text-red-500"} size={16} />
                )}
                <span className={`ml-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>Special character</span>
            </div>

            <div className="flex items-center">
                {criteria.hasEightChars ? (
                    <Check className={isDarkMode ? "text-green-400" : "text-green-500"} size={16} />
                ) : (
                    <X className={isDarkMode ? "text-red-400" : "text-red-500"} size={16} />
                )}
                <span className={`ml-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>8+ characters</span>
            </div>
        </div>
    );
};

export default PasswordCriteria;