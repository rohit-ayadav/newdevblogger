'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function AuthError() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    const [isLinking, setIsLinking] = useState(false);

    // Process the callbackUrl if present
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    // For the account linking issue specifically
    if (error === 'OAuthAccountNotLinked') {
        // Extract provider information from error message if available
        const errorDescription = searchParams.get('error_description') || '';
        // The error might contain: "To confirm your identity, sign in with the same account you used originally."

        // Get the email from the query params (if available)
        const email = searchParams.get('email') || '';

        const handleLinkAccounts = async () => {
            setIsLinking(true);
            // The user has confirmed they want to link accounts
            // Redirect them back to sign in with the original provider
            // You might need to store the current provider in session or URL param
            try {
                // Get the provider from the database or session
                const provider = searchParams.get('provider') || 'google'; // Default to 'google' if not provided
                await signIn(provider, { callbackUrl });
            } catch (error) {
                console.error('Error during account linking:', error);
            }
        };

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Account Linking Required</h1>
                    <p className="mb-4">
                        We found an existing account with your email address, but it was created using a different sign-in method.
                        {email && <span className="font-medium"> ({email})</span>}
                    </p>
                    <p className="mb-6">
                        For security, please sign in using your original method, or click below to link this new method to your existing account.
                    </p>

                    <div className="flex flex-col gap-4">
                        <button
                            onClick={handleLinkAccounts}
                            disabled={isLinking}
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
                        >
                            {isLinking ? 'Processing...' : 'Link My Accounts'}
                        </button>

                        <button
                            onClick={() => router.push('/auth/signin')}
                            className="border border-gray-300 bg-white text-gray-700 py-2 px-4 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                        >
                            Return to Sign In
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Handle other types of errors
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h1>
                <p className="mb-6">
                    {error === 'CredentialsSignin'
                        ? 'Invalid credentials. Please check your email and password.'
                        : error || 'An error occurred during authentication.'}
                </p>
                <button
                    onClick={() => router.push('/auth/signin')}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Return to Sign In
                </button>
            </div>
        </div>
    );
}