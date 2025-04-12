"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    FileText,
    Mail,
    Printer,
    Download,
    Eye,
    BookOpen,
    Code,
    ExternalLink,
    AlertCircle,
    Check,
    Search,
    Shield,
    Copyright
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const TermsOfService = () => {
    const { isDarkMode } = useTheme();
    const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
    const [viewMode, setViewMode] = useState('accordion');
    const [effectiveFontSize, setEffectiveFontSize] = useState<string>('');

    useEffect(() => {
        // Apply font size changes when fontSize state changes
        switch (fontSize) {
            case 'small':
                setEffectiveFontSize('text-sm');
                break;
            case 'medium':
                setEffectiveFontSize('text-base');
                break;
            case 'large':
                setEffectiveFontSize('text-lg');
                break;
            default:
                setEffectiveFontSize('text-base');
        }
    }, [fontSize]);

    const termsData = [
        {
            title: "1. Acceptance of Terms",
            content: "These Terms of Service (\"Terms\") constitute a binding legal agreement between you and DevBlogger (\"we\", \"our\", \"us\"). By accessing or using our website, platform, or services, you agree to be bound by these Terms. If you do not agree to these Terms, do not access or use the platform. We may modify these Terms at any time, and your continued use of the platform following any changes constitutes your acceptance of the modified Terms. It is your responsibility to review these Terms periodically. We will make reasonable efforts to notify users of significant changes through notices on our platform or via email to registered users."
        },
        {
            title: "2. User Responsibilities",
            content: "You agree to use DevBlogger in accordance with all applicable laws and regulations. You are solely responsible for your conduct on the platform and any content you submit. You expressly agree not to:\n\na) Post or transmit any content that is illegal, harmful, threatening, abusive, defamatory, obscene, or otherwise objectionable;\n\nb) Engage in any activity that could disable, overburden, or impair the proper functioning of the platform;\n\nc) Attempt to gain unauthorized access to any part of the platform;\n\nd) Use our developer tools or SEO services for spam, malicious activities, or any purpose that violates applicable laws;\n\ne) Post content that infringes upon intellectual property rights, privacy rights, or other rights of third parties;\n\nf) Misrepresent your identity or affiliation with any person or organization;\n\ng) Use automated means, including bots, scrapers, or spiders, to access or use the platform without our express permission;\n\nh) Harvest or collect user information without consent.\n\nWe reserve the right to remove any content and suspend or terminate access for users who violate these responsibilities."
        },
        {
            title: "3. Account Registration and Security",
            content: "To access certain features of DevBlogger, you must create an account. You agree to provide accurate, current, and complete information during registration and to maintain and promptly update this information. You are responsible for maintaining the confidentiality of your account credentials and for all activities conducted through your account. You agree to immediately notify us of any unauthorized use of your account. We reserve the right to suspend or terminate your account at our discretion. DevBlogger accounts are for individual use only, and you may not share your account credentials with others. We may implement verification measures to ensure account security and prevent abuse. Account privileges may vary based on user role, reputation, and standing in the community."
        },
        {
            title: "4. Content Ownership and Licensing",
            content: "Content ownership on DevBlogger works as follows:\n\na) Blog Posts and Articles: You retain ownership of the original content you create and post on DevBlogger. However, by posting content, you grant DevBlogger a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display the content in connection with our services. If you delete your content, we will cease displaying it to other users, but archived or cached copies may remain. DevBlogger reserves the right to preserve content if required by law or for legitimate business purposes. We may also continue to display and use your content if it has been substantially edited or enhanced by our team, in which case it will be clearly marked as \"Edited by DevBlogger\";\n\nb) Developer Resources: Any tools, templates, or resources we provide remain the intellectual property of DevBlogger;\n\nc) Comments and Feedback: By submitting comments or feedback, you grant us a perpetual, irrevocable right to use such contributions without compensation.\n\nd) Content Preservation: DevBlogger may, at its discretion, preserve blog content of significant educational value even after a user deletes their account, but in such cases, author attribution may be changed to \"DevBlogger Community\"."
        },
        {
            title: "5. Code Snippets and Technical Content",
            content: "DevBlogger is a platform focused on technical content and code sharing. The following terms apply specifically to code and technical content: (a) Code Snippets: By default, code snippets you share publicly on DevBlogger are made available under the MIT License unless you explicitly specify a different open source license; (b) Attribution Requirements: When using code or technical solutions from DevBlogger, proper attribution to the original author is required unless otherwise specified; (c) No Warranty: All code and technical solutions are provided \"as is\" without warranty of any kind. Users implement such code at their own risk; (d) Prohibited Content: You may not post code or technical instructions designed for malicious purposes, including but not limited to malware, unauthorized access tools, or exploits; (e) Best Practices: We encourage adherence to industry best practices and secure coding standards when sharing technical content. DevBlogger may apply syntax highlighting, formatting, or minor corrections to shared code without altering its functionality."
        },
        {
            title: "6. Google Indexing & SEO Services",
            content: "DevBlogger offers SEO optimization and indexing services as part of our platform. Content is automatically indexed by default to improve discoverability. By using our platform, you acknowledge and agree that:\n\na) Permission Grant: You explicitly grant DevBlogger permission to submit your blog links and content to Google Search Console, other search engines, and related indexing services;\n\nb) No Guarantees: We do not guarantee specific search engine rankings or indexing outcomes;\n\nc) Compliance Requirement: Content submitted for indexing must comply with search engine guidelines and our Terms of Service;\n\nd) Opt-Out Option: You may opt out of automatic indexing services through your account settings, but this may affect the discoverability of your content;\n\ne) Optimization Recommendations: SEO tools and recommendations are provided for guidance only, and implementation is at your discretion;\n\nf) Technical Modifications: DevBlogger may make technical modifications to your content's metadata, schema markup, and HTML structure to improve SEO performance without altering the substance of your content. We may also aggregate anonymized SEO performance data to improve our services."
        },
        {
            title: "7. Developer Tools and Resources",
            content: "DevBlogger provides various developer tools and resources, including but not limited to code formatters, API testers, and documentation tools. When using these tools, you agree that: (a) Usage Limitations: Tools are provided for personal and professional development purposes and may have usage limits based on your account type; (b) Third-Party Dependencies: Some tools may incorporate open source components or third-party services, subject to their respective licenses; (c) Data Processing: Information processed through our tools may be temporarily stored to provide the service but will not be shared with third parties; (d) Feature Availability: We reserve the right to modify, limit, or discontinue any tool or feature at our discretion; (e) Feedback: We welcome feedback on our developer tools, and by providing such feedback, you grant us permission to incorporate your suggestions without compensation. These tools are designed to enhance developer productivity and are continually improved based on community feedback and technological advancements."
        },
        {
            title: "8. Community Guidelines and Content Moderation",
            content: "DevBlogger is a professional community of developers and technical content creators. To maintain a productive environment, we enforce the following community guidelines: (a) Respectful Communication: Interact respectfully with other users, even in cases of technical disagreement; (b) Constructive Feedback: Provide constructive feedback on technical content rather than dismissive criticism; (c) Original Content: Publish original content, or clearly indicate and properly attribute any referenced or quoted material; (d) Relevant Content: Keep content relevant to development, programming, or closely related technical topics; (e) No Harassment: Harassment, discrimination, or personal attacks against other users are strictly prohibited; (f) Content Moderation: DevBlogger employs both automated systems and human moderators to enforce these guidelines. Content flagged as violating our guidelines may be reviewed, removed, or subject to other moderation actions; (g) Appeals Process: If you believe your content was incorrectly moderated, you may appeal through our designated process. We reserve the right to remove or restrict access to any content that violates these guidelines."
        },
        {
            title: "9. Intellectual Property Rights",
            content: "Intellectual property on DevBlogger is governed by the following terms: (a) Platform Content: All platform-provided content, including but not limited to the DevBlogger name, logo, design elements, proprietary code, features, and documentation not explicitly released under an open source license, are the exclusive property of DevBlogger; (b) User Content: You retain ownership of content you create, subject to the licenses granted to DevBlogger in these Terms; (c) Copyright Claims: If you believe content on DevBlogger infringes your copyright, submit a DMCA notice to legal@devblogger.com with: identification of the copyrighted work, identification of the allegedly infringing material, your contact information, a statement of good faith belief in infringement, a statement of accuracy under penalty of perjury, and your physical or electronic signature; (d) Counter-Notices: Users whose content is removed due to a copyright claim may submit a counter-notice if they believe the removal was in error; (e) Repeat Infringers: We maintain a policy of terminating accounts of users who repeatedly infringe intellectual property rights. DevBlogger respects intellectual property rights and expects users to do the same."
        },
        {
            title: "10. Privacy and Data Protection",
            content: "Your privacy is important to us. Our Privacy Policy, which is incorporated into these Terms by reference, explains how we collect, use, and protect your information. By using DevBlogger, you consent to the data practices described in our Privacy Policy. Key aspects include: (a) Information Collection: We collect information necessary to provide our services, including registration details, content you post, and usage data; (b) Data Usage: We use collected data to operate and improve the platform, personalize your experience, and communicate with you; (c) Data Security: We implement reasonable security measures to protect your information, though no method of transmission over the Internet is 100% secure; (d) Third-Party Services: Some features may involve third-party services with their own privacy policies; (e) User Controls: We provide tools for you to access, correct, or delete certain information; (f) Communications: By creating an account, you consent to receive service-related communications from us. You may opt out of marketing communications. Our complete Privacy Policy should be reviewed carefully, as it contains important information about your rights and our obligations regarding your data."
        },
        {
            title: "11. Limitation of Liability",
            content: "To the maximum extent permitted by applicable law: (a) In no event shall DevBlogger, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses resulting from your access to or use of (or inability to access or use) the platform or any content thereon; (b) We are not liable for any damages resulting from: use or implementation of code snippets or technical solutions shared on the platform, unauthorized access to your account, errors or omissions in any content, viruses or similar programs transmitted through the platform, or service interruptions; (c) Our aggregate liability for all claims relating to the platform shall not exceed the greater of $100 or the amount paid by you to DevBlogger for the past six months of service; (d) These limitations apply to all causes of action in the aggregate, including breach of contract, breach of warranty, negligence, strict liability, misrepresentations, and other torts; (e) These limitations apply even if DevBlogger has been advised of the possibility of such damages."
        },
        {
            title: "12. Disclaimer of Warranties",
            content: "DevBlogger provides the platform and its services on an \"AS IS\" and \"AS AVAILABLE\" basis, without any warranties of any kind, whether express or implied. Specifically: (a) We expressly disclaim all warranties of any kind, including but not limited to implied warranties of merchantability, fitness for a particular purpose, non-infringement, and any warranties arising from course of dealing or usage of trade; (b) We make no warranty that the platform will meet your requirements, be secure or error-free, that defects will be corrected, or that the platform is free of viruses or other harmful components; (c) No advice or information, whether oral or written, obtained from DevBlogger or through the platform creates any warranty not expressly stated in these Terms; (d) Content, including code snippets and technical guides, is provided without warranties of accuracy, reliability, or suitability for any purpose; (e) While we strive to provide quality content and services, technical information and code may contain errors or inaccuracies. Implementation of any code or technical solutions is at your own risk and discretion. This disclaimer constitutes an essential part of these Terms."
        },
        {
            title: "13. Indemnification",
            content: "You agree to defend, indemnify, and hold harmless DevBlogger, its parent company, officers, directors, employees, and agents from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to: (a) Your violation of these Terms; (b) Your user content or activities on the platform; (c) Your use of any content, tools, or services available through the platform; (d) Your violation of the rights of any third party, including intellectual property, privacy, publicity, or other personal or proprietary rights; (e) Any claim that your content caused damage to a third party; (f) Any violation of applicable laws or regulations. This defense and indemnification obligation will survive the termination of these Terms and your use of the platform. We reserve the right, at our own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will cooperate with us in asserting any available defenses."
        },
        {
            title: "14. Termination",
            content: "Either you or DevBlogger may terminate this agreement at any time with or without cause or prior notice. Upon termination: (a) Your access to our services will cease, and your account may be deactivated or deleted; (b) Content Retention: We may retain certain information as required by law or as necessary for legitimate business purposes; (c) Content Preservation: As described in Section 4, DevBlogger may preserve content of significant educational value even after account deletion, with attribution changed to \"DevBlogger Community\"; (d) Persistent Terms: The following sections survive termination: Content Ownership and Licensing, Intellectual Property Rights, Limitation of Liability, Disclaimer of Warranties, Indemnification, and any other provision that by its nature should survive termination; (e) Reactivation: At our discretion, we may allow account reactivation within a certain period after termination. We reserve the right to refuse service to anyone for any reason at any time, including for violations of these Terms or any applicable laws or regulations."
        },
        {
            title: "15. Governing Law and Dispute Resolution",
            content: "These Terms shall be governed by and construed in accordance with the laws of the United States and the State of California, without regard to its conflict of law provisions. For any dispute arising under these Terms: (a) Informal Resolution: We encourage you to contact us first to seek an informal resolution to any dispute; (b) Binding Arbitration: Any dispute, controversy, or claim arising out of or relating to these Terms shall be settled by binding arbitration in accordance with the commercial arbitration rules of the American Arbitration Association. The arbitration shall be conducted in San Francisco, California, and judgment on the arbitration award may be entered in any court having jurisdiction; (c) Class Action Waiver: Any arbitration shall be conducted on an individual basis and not as a class, consolidated, or representative action; (d) Exceptions: Nothing in these Terms prevents either party from seeking injunctive or other equitable relief in a court of competent jurisdiction; (e) Limitation Period: Any claim arising out of or related to these Terms must be filed within one year after such claim arose, otherwise, the claim is permanently barred."
        },
        {
            title: "16. General Provisions",
            content: "The following general provisions apply to these Terms: (a) Entire Agreement: These Terms constitute the entire agreement between you and DevBlogger regarding your use of the platform; (b) Severability: If any provision of these Terms is found to be unenforceable, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect; (c) No Waiver: Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights; (d) Assignment: You may not assign or transfer these Terms without our prior written consent, but we may assign or transfer these Terms without restriction; (e) Force Majeure: We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control; (f) Headings: Section titles in these Terms are for convenience only and have no legal or contractual effect; (g) Updates: We may update these Terms at any time by posting the updated terms on our platform. Your continued use after any changes indicates your acceptance of the updated Terms; (h) Contact: Questions about these Terms should be sent to legal@devblogger.com."
        }
    ];

    const handlePrint = () => {
        window.print();
    };

    const handleDownloadPDF = () => {
        alert("This functionality is not implemented yet. Please use the print option to save as PDF.");
    };

    const handleContactUs = () => {
        window.location.href = "/contact";
    };

    const renderFullText = () => (
        <div className={`space-y-6 ${effectiveFontSize}`}>
            {termsData.map((term, index) => (
                <div key={index} className="mb-8">
                    <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">{term.title}</h3>
                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                        {term.content}
                    </div>
                </div>
            ))}
        </div>
    );

    const renderAccordion = () => (
        <Accordion type="single" collapsible className={`w-full ${effectiveFontSize}`}>
            {termsData.map((term, index) => (
                <AccordionItem
                    value={`item-${index}`}
                    key={index}
                    className="border-b border-gray-200 dark:border-gray-700"
                >
                    <AccordionTrigger className="hover:bg-gray-50 dark:hover:bg-gray-800 px-4 py-3 rounded transition-colors text-gray-900 dark:text-gray-100">
                        {term.title}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                        <div className="whitespace-pre-line">
                            {term.content}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Card className="shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900 print:shadow-none">
                <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3 mb-2">
                        <FileText className="h-6 w-6 text-primary" />
                        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-50">Terms of Service</CardTitle>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Badge variant="outline" className="font-medium">
                            Last updated: April 12, 2025
                        </Badge>
                        <div className="flex items-center text-amber-600 dark:text-amber-400">
                            <AlertCircle size={14} className="mr-1" />
                            <span className="text-xs">These terms constitute a binding legal agreement</span>
                        </div>
                    </div>
                </CardHeader>

                <div className="px-6 py-4 bg-white dark:bg-gray-850 border-b border-gray-200 dark:border-gray-700 print:hidden">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <Tabs defaultValue="accordion" value={viewMode} onValueChange={setViewMode} className="w-full md:w-auto">
                            <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800">
                                <TabsTrigger value="accordion" className="flex items-center space-x-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                                    <BookOpen className="h-4 w-4" />
                                    <span>Accordion</span>
                                </TabsTrigger>
                                <TabsTrigger value="full" className="flex items-center space-x-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                                    <Eye className="h-4 w-4" />
                                    <span>Full Text</span>
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>

                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Text Size:</span>
                            <Button
                                variant={fontSize === 'small' ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFontSize('small')}
                                className="h-8 px-2 dark:text-gray-200 dark:border-gray-600"
                            >
                                A
                            </Button>
                            <Button
                                variant={fontSize === 'medium' ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFontSize('medium')}
                                className="h-8 px-2 dark:text-gray-200 dark:border-gray-600"
                            >
                                A+
                            </Button>
                            <Button
                                variant={fontSize === 'large' ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFontSize('large')}
                                className="h-8 px-2 dark:text-gray-200 dark:border-gray-600"
                            >
                                A++
                            </Button>
                        </div>
                    </div>
                </div>

                <CardContent className="p-6 dark:bg-gray-900">
                    <div className="mb-6">
                        <div className="flex items-center mb-4">
                            <Code className="h-5 w-5 text-primary mr-2" />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">DevBlogger Terms of Service</h2>
                        </div>

                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
                            <p className={`text-gray-700 dark:text-gray-300 leading-relaxed ${effectiveFontSize}`}>
                                These Terms of Service ("Terms") govern your use of DevBlogger ("we", "our", "us") and all related services.
                                By accessing or using our website or services, you agree to be bound by these Terms.
                                If you do not agree to these Terms, do not use the platform.
                            </p>
                            <p className={`text-gray-700 dark:text-gray-300 mt-3 ${effectiveFontSize}`}>
                                <strong>Important Notice:</strong> By using DevBlogger, your content will be automatically indexed in search engines by default to improve discoverability. You can opt out of this feature in your account settings.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800 flex flex-col">
                                <div className="flex items-center mb-2">
                                    <Copyright className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                                    <h3 className="font-medium text-blue-800 dark:text-blue-300">Content Ownership</h3>
                                </div>
                                <p className="text-blue-700 dark:text-blue-300 text-sm flex-grow">
                                    You retain ownership of your original content, while granting DevBlogger usage rights.
                                    We may preserve valuable content with proper attribution even after deletion.
                                </p>
                            </div>

                            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800 flex flex-col">
                                <div className="flex items-center mb-2">
                                    <Search className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 flex-shrink-0" />
                                    <h3 className="font-medium text-green-800 dark:text-green-300">Auto-Indexing & SEO</h3>
                                </div>
                                <p className="text-green-700 dark:text-green-300 text-sm flex-grow">
                                    Content is automatically indexed in search engines by default.
                                    Our platform optimizes your content for search engines to maximize discoverability.
                                </p>
                            </div>

                            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800 flex flex-col">
                                <div className="flex items-center mb-2">
                                    <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2 flex-shrink-0" />
                                    <h3 className="font-medium text-purple-800 dark:text-purple-300">Developer Protections</h3>
                                </div>
                                <p className="text-purple-700 dark:text-purple-300 text-sm flex-grow">
                                    Code snippets are shared under the MIT License by default.
                                    We've included special provisions for technical content to protect both creators and users.
                                </p>
                            </div>
                        </div>
                    </div>

                    {viewMode === 'accordion' ? renderAccordion() : renderFullText()}
                </CardContent>

                <CardFooter className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6 flex flex-col sm:flex-row sm:justify-between gap-4 print:hidden">
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                            onClick={handlePrint}
                        >
                            <Printer size={16} />
                            <span>Print</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                            onClick={handleDownloadPDF}
                        >
                            <Download size={16} />
                            <span>Download PDF</span>
                        </Button>
                    </div>

                    <Button
                        variant="default"
                        className="flex items-center gap-2 dark:bg-primary dark:text-white dark:hover:bg-primary/90"
                        onClick={handleContactUs}
                    >
                        <Mail size={16} />
                        <span>Contact Team</span>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default TermsOfService;