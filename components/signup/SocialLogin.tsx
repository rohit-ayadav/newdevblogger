import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { signIn } from 'next-auth/react'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { Loader2 } from 'lucide-react'
import { SiGoogle } from 'react-icons/si'
import Google from 'next-auth/providers/google'

interface SocialLoginProps {
    isLoading: boolean;
    isDarkMode?: boolean;
}

const SocialLogin = ({ isLoading, isDarkMode }: SocialLoginProps) => {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
                <Button
                    variant="outline"
                    onClick={() => signIn('google')}
                    disabled={isLoading}
                    className={`${isDarkMode
                        ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-white hover:text-gray-200'
                        : 'bg-white hover:bg-gray-50 text-gray-900'
                        }`}
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                        <SiGoogle
                            size={16}
                            color={isDarkMode ? '#D1D5DB' : '#374151'}
                        />
                    )}
                    Google
                </Button>
                <Button
                    variant="outline"
                    onClick={() => signIn('github')}
                    disabled={isLoading}
                    className={`transition-colors ${isDarkMode
                        ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                        : 'bg-white hover:bg-gray-50 text-gray-900'
                        }`}
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                        <FaGithub
                            size={16}
                            color={isDarkMode ? '#D1D5DB' : '#374151'}
                        />
                    )}
                    GitHub
                </Button>
            </div>
        </div>
    )
}

export default SocialLogin;