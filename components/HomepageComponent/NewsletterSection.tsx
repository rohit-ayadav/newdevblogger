import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PenTool } from 'react-feather';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils'; // Assuming you have this utility

export const NewsletterSection = () => {
    const { isDarkMode } = useTheme();
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [isSubscribing, setIsSubscribing] = useState(false);
    const [isTouched, setIsTouched] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubscribing(true);
        const response = await fetch("/api/subscribe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email.toLowerCase().trim() }),
        });
        if (response.ok) {
            toast({
                title: "Success!",
                description: "Successfully subscribed to newsletter! 🎉",
                duration: 5000,
            });
            setEmail("");
            setIsTouched(false);
        } else {
            const data = await response.json();
            toast({
                variant: "destructive",
                title: "Failed to subscribe",
                description: data.message || "Please try again later.",
            });
        }
        setIsSubscribing(false);
    };

    return (
        <section className={cn(
            "py-16",
            isDarkMode ? 'bg-gray-900' : 'bg-white'
        )}>
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                <Card className={cn(
                    "overflow-hidden border",
                    isDarkMode ?
                        'bg-gray-800 border-gray-700' :
                        'bg-blue-50 border-blue-100'
                )}>
                    <div className="relative">
                        <div className={cn(
                            "absolute inset-0",
                            isDarkMode ?
                                "bg-gradient-to-r from-blue-900/20 to-indigo-900/20" :
                                "bg-gradient-to-r from-blue-600/20 to-indigo-600/20"
                        )} />
                        <CardContent className="relative py-10 md:py-12 flex flex-col items-center text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="w-full"
                            >
                                <div className={cn(
                                    "mb-6 p-4 rounded-full inline-block",
                                    isDarkMode ? "bg-gray-700 text-blue-400" : "bg-blue-100 text-blue-600"
                                )}>
                                    <PenTool size={32} />
                                </div>
                                <h3 className="text-3xl font-bold mb-4">Stay in the Loop</h3>
                                <p className={cn(
                                    "mb-8 max-w-lg mx-auto",
                                    isDarkMode ? "text-gray-300" : "text-gray-600"
                                )}>
                                    Subscribe to our weekly newsletter and get the latest tech articles,
                                    job opportunities, and coding tips delivered straight to your inbox.
                                </p>

                                <form onSubmit={handleSubscribe} className="w-full max-w-md mx-auto">
                                    <div className="flex gap-3 flex-col sm:flex-row">
                                        <Input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className={cn(
                                                "flex-grow",
                                                isDarkMode ?
                                                    'bg-gray-700 border-gray-600 focus:border-blue-500' :
                                                    'bg-white border-gray-200 focus:border-blue-500'
                                            )}
                                        />
                                        <Button
                                            type="submit"
                                            disabled={isSubscribing}
                                            className={cn(
                                                "transition-all whitespace-nowrap",
                                                isDarkMode ?
                                                    "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600" :
                                                    "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                                            )}
                                        >
                                            {isSubscribing ? "Subscribing..." : "Subscribe"}
                                        </Button>
                                    </div>
                                </form>
                            </motion.div>
                        </CardContent>
                    </div>
                </Card>
            </div>
        </section>
    );
};