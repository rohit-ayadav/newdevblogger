import { FC } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface FormHeaderProps {
    isDarkMode?: boolean;
}

const FormHeader: FC<FormHeaderProps> = ({ isDarkMode }) => {
    const themeContext = useTheme();
    const isDark = isDarkMode !== undefined ? isDarkMode : themeContext.isDarkMode;

    return (
        <div className="text-center mb-6">
            <h2 className={`text-2xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-gray-900'
                }`}>
                Create your account
            </h2>
            <p className={`mt-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                Join us to get started
            </p>
        </div>
    );
};

export default FormHeader;