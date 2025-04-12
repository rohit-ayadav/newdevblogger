"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Shield,
    Mail,
    Printer,
    Download,
    Eye,
    BookOpen,
    Globe,
    Lock,
    AlertTriangle
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const PrivacyPolicy = () => {
    const { isDarkMode } = useTheme();
    const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
    const [viewMode, setViewMode] = useState('accordion');

    const policyData = [
        {
            title: "1. Information We Collect",
            content: "DevBlogger collects information necessary to provide our services to developers and bloggers. This includes: (a) Account Information: your name, email address, username, password, and profile information; (b) Content Data: blog posts, code snippets, comments, and other content you create; (c) Usage Data: information about how you use our platform, including IP address, browser type, operating system, referring URLs, page views, and actions taken on the platform; (d) Technical Data: analytics, cookies, and similar technologies that automatically collect information about your devices and browsing actions. We collect information in compliance with applicable data protection laws and only what is necessary to provide our services."
        },
        {
            title: "2. How We Use Your Information",
            content: "DevBlogger uses your information to: (a) Provide, maintain, and improve our platform features and functionality; (b) Process transactions and manage your account; (c) Send technical notices, updates, security alerts, and administrative messages; (d) Respond to your comments and questions and provide customer service; (e) Monitor and analyze usage patterns to enhance user experience; (f) Detect, prevent, and address technical issues, fraud, or illegal activities; (g) Personalize content recommendations and learning resources; (h) With your consent, send product updates and marketing communications, which you can opt out of at any time. We process your personal data based on contract performance, legitimate interests, legal obligations, and consent where required."
        },
        {
            title: "3. Information Sharing and Disclosure",
            content: "DevBlogger does not sell your personal information. We share information only in the following circumstances: (a) With third-party service providers who help us operate our platform (hosting providers, payment processors, analytics providers) who are bound by confidentiality obligations; (b) With other users when you choose to make your content public; (c) If required by law, regulation, or legal process; (d) To protect the rights, property, and safety of DevBlogger, our users, and the public; (e) In connection with a business transfer, merger, or acquisition; (f) With your consent or at your direction. We implement appropriate safeguards for international data transfers where applicable."
        },
        {
            title: "4. Data Retention and Storage",
            content: "DevBlogger retains your personal information for as long as necessary to fulfill the purposes for which it was collected, including providing our services, complying with legal obligations, resolving disputes, and enforcing our agreements. When determining retention periods, we consider: (a) The amount, nature, and sensitivity of the personal data; (b) The potential risk of harm from unauthorized use or disclosure; (c) Whether we can achieve the purposes of processing through other means; (d) Legal, contractual, and regulatory requirements. You can request deletion of your account and associated data at any time, subject to legitimate retention requirements. Your content may remain available if you've made it public or shared it with others."
        },
        {
            title: "5. Your Rights and Choices",
            content: "Depending on your location, you may have rights regarding your personal information: (a) Access and portability: Request a copy of your personal information in a structured, machine-readable format; (b) Correction: Update or correct inaccurate data; (c) Deletion: Request deletion of your personal information in certain circumstances; (d) Restriction: Limit how we use your data in certain circumstances; (e) Objection: Object to processing based on legitimate interests and direct marketing; (f) Consent withdrawal: Withdraw consent at any time where processing is based on consent. To exercise these rights, visit your account settings or contact our privacy team at privacy@devblogger.com. We will respond to requests in accordance with applicable laws. You also have the right to lodge a complaint with a supervisory authority in your jurisdiction."
        },
        {
            title: "6. Cookies and Similar Technologies",
            content: "DevBlogger uses cookies and similar technologies to enhance your experience, collect information about usage patterns, and enable certain site functionality. We use different types of cookies: (a) Essential cookies: Necessary for the platform to function properly (authentication, security); (b) Preference cookies: Remember your settings and preferences; (c) Analytics cookies: Help us understand how users interact with our platform; (d) Marketing cookies: Used to deliver relevant advertising. You can manage cookie preferences through your browser settings or our cookie preferences center. Blocking essential cookies may impact site functionality. We retain cookie data for varying periods depending on the cookie type, but no longer than necessary for the purpose collected."
        },
        {
            title: "7. Data Security",
            content: "DevBlogger implements comprehensive technical and organizational measures to protect your personal information from unauthorized access, use, disclosure, alteration, or destruction. Our security measures include: (a) Encryption of sensitive data in transit and at rest using industry-standard protocols; (b) Regular security assessments and penetration testing; (c) Access controls and authentication requirements; (d) Secure development practices and code reviews; (e) Regular security training for all employees; (f) Incident response procedures. While we implement safeguards, no method of transmission over the Internet or electronic storage is 100% secure. We promptly notify users of security incidents as required by applicable laws."
        },
        {
            title: "8. Children's Privacy",
            content: "DevBlogger is designed for adult developers and content creators. We do not knowingly collect or solicit personal information from anyone under 16 years of age. If we learn we have collected personal information from a child under 16, we will promptly delete that information. If you believe we might have information from or about a child under 16, please contact us immediately at privacy@devblogger.com. Parents or guardians who believe their child has submitted personal information to our site should contact us to request deletion."
        },
        {
            title: "9. Legal Basis for Processing (EU/EEA Users)",
            content: "For users in the European Economic Area (EEA), United Kingdom, or Switzerland, we rely on the following legal bases to process your personal data: (a) Contractual necessity: To provide services you have requested or to take steps prior to entering into a contract with you; (b) Legitimate interests: When processing is necessary for our legitimate interests or those of a third party, provided your rights do not override these interests; (c) Compliance with legal obligations: When we're required to process your data to comply with a legal obligation; (d) Consent: When you have given us specific consent to process your data. We identify the legal basis for each processing purpose in our detailed processing activities documentation, which you can request by contacting us."
        },
        {
            title: "10. International Data Transfers",
            content: "DevBlogger operates globally and may transfer your information to countries with different data protection laws than your country of residence. When transferring data internationally, we implement appropriate safeguards in accordance with applicable law, which may include: (a) Standard Contractual Clauses approved by the European Commission; (b) Binding Corporate Rules; (c) Approved certification mechanisms or codes of conduct. You have the right to obtain information about these safeguards by contacting us as described in the 'Contact Us' section."
        },
        {
            title: "11. Third-Party Links and Services",
            content: "The DevBlogger platform may contain links to third-party websites, products, or services that are not owned or controlled by us. We are not responsible for the privacy practices of these third parties. This Privacy Policy applies solely to information collected by DevBlogger. We encourage you to review the privacy policies of any third-party sites or services before providing them with your personal information. When you use third-party integrations through our platform, your information may be collected and processed according to their privacy policies as well as ours."
        },
        {
            title: "12. Platform Features and Content Processing",
            content: "DevBlogger provides specialized features for developers, including code highlighting, code snippet repositories, and technical content publishing. To enable these services, we may process technical content you create, store, or share, including source code. We respect the intellectual property rights of developers and only process this content to provide our services. You retain ownership of the content you create, subject to the licenses granted in our Terms of Service. You control the visibility settings of your content (public, private, or shared with specific users)."
        },
        {
            title: "13. Changes to This Privacy Policy",
            content: "We may update this Privacy Policy periodically to reflect changes in our practices, services, or applicable laws. When we make changes, we will update the 'Last updated' date at the top of this policy and notify you through: (a) A prominent notice on our website; (b) Email notifications for significant changes; (c) Account notifications within the platform. We encourage you to review the Privacy Policy whenever you access our platform. Your continued use of DevBlogger following changes to this policy constitutes acceptance of those changes. If you do not agree with the revised policy, you should discontinue your use of our platform."
        },
        {
            title: "14. California Privacy Rights",
            content: "California residents have additional rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA): (a) Right to know what personal information we collect, use, and disclose; (b) Right to delete personal information we collected from you; (c) Right to correct inaccurate personal information; (d) Right to opt-out of the sale or sharing of personal information; (e) Right to limit use and disclosure of sensitive personal information; (f) Right to non-discrimination for exercising your rights. To exercise these rights, follow the instructions in the 'Your Rights and Choices' section above. We do not sell personal information as defined by the CCPA/CPRA. We may disclose certain categories of information for business purposes as described in this Privacy Policy."
        },
        {
            title: "15. Contact Us",
            content: "If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact our Privacy Team at privacy@devblogger.com or write to us at: DevBlogger Privacy Office, 123 Developer Way, Suite 456, San Francisco, CA 94105, USA. For users in the European Economic Area, we have appointed a Data Protection Officer who can be reached at dpo@devblogger.com. If you have a disability and need this policy in an alternative format, please contact us using the information above."
        }
    ];

    const fontSizeClasses = {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg'
    };

    const handlePrint = () => {
        window.print();
    };

    const handleDownloadPDF = () => {
        alert("This functionality is not implemented yet. Please use the print option to save as PDF.");
    };

    const handleContactUs = () => {
        window.location.href = "/contacts";
    };

    const renderFullText = () => (
        <div className={`space-y-6 ${fontSizeClasses[fontSize]}`}>
            {policyData.map((policy, index) => (
                <div key={index} className="mb-8">
                    <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">{policy.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{policy.content}</p>
                </div>
            ))}
        </div>
    );

    const renderAccordion = () => (
        <Accordion type="single" collapsible className={`w-full ${fontSizeClasses[fontSize]}`}>
            {policyData.map((policy, index) => (
                <AccordionItem
                    value={`item-${index}`}
                    key={index}
                    className="border-b border-gray-200 dark:border-gray-700"
                >
                    <AccordionTrigger className="hover:bg-gray-50 dark:hover:bg-gray-800 px-4 py-3 rounded transition-colors text-gray-900 dark:text-gray-100">
                        {policy.title}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                        <p>{policy.content}</p>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Card className="shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900">
                <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3 mb-2">
                        <Shield className="h-6 w-6 text-primary" />
                        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-50">Privacy Policy</CardTitle>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Badge variant="outline" className="font-medium">
                            Last updated: April 12, 2025
                        </Badge>
                        <div className="flex items-center text-amber-600 dark:text-amber-400">
                            <AlertTriangle size={14} className="mr-1" />
                            <span className="text-xs">This document contains important information about your rights</span>
                        </div>
                    </div>
                </CardHeader>

                <div className="px-6 py-4 bg-white dark:bg-gray-850 border-b border-gray-200 dark:border-gray-700">
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
                            <Globe className="h-5 w-5 text-primary mr-2" />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">DevBlogger Privacy Policy</h2>
                        </div>
                        <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                            This Privacy Policy describes how DevBlogger ("we", "our", or "us") collects, uses, and shares your personal information
                            when you use our website, platform, or services. As a developer-focused blogging platform, we understand the importance
                            of privacy and data protection. Please read this Privacy Policy carefully to understand our practices regarding your personal information.
                        </p>
                        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-100 dark:border-blue-800 mb-6">
                            <div className="flex items-center mb-2">
                                <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                                <h3 className="font-medium text-blue-800 dark:text-blue-300">Our Commitment to Your Privacy</h3>
                            </div>
                            <p className="text-blue-700 dark:text-blue-300 text-sm">
                                DevBlogger is committed to protecting the privacy and security of your personal information.
                                We design our platform with privacy in mind and strive to be transparent about our data practices.
                                We only collect information that is necessary to provide our services, and we give you control over your data.
                            </p>
                        </div>
                    </div>

                    {viewMode === 'accordion' ? renderAccordion() : renderFullText()}
                </CardContent>

                <CardFooter className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6 flex flex-col sm:flex-row sm:justify-between gap-4">
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
                        <span>Contact Privacy Team</span>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default PrivacyPolicy;