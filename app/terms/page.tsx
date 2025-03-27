'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ArrowDownToLine, FileCheck, ShieldCheck, Scale, MousePointerClick, AlertCircle, BookOpen } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-teal-50 to-white pt-24 pb-16">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/register"
            className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium mb-6"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Registration
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-teal-950">Terms and Conditions</h1>
              <p className="text-teal-700 mt-2">Effective Date: June 1, 2024</p>
            </div>
            <Button
              variant="outline"
              className="group inline-flex items-center border-teal-200 hover:bg-teal-50 hover:border-teal-300 text-teal-700 self-start"
              onClick={() => window.print()}
            >
              <ArrowDownToLine size={16} className="mr-2 group-hover:animate-bounce" />
              Download PDF
            </Button>
          </div>
          
          <Card className="p-6 bg-white/90 backdrop-blur-sm border-teal-100 shadow-md mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <AlertCircle className="text-amber-500 shrink-0 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Please read these Terms and Conditions carefully before using our platform.</p>
                <p className="text-gray-600 mt-1">By accessing or using the Ilkevim website and services, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access the service.</p>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Table of Contents */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm border-teal-100 shadow-md mb-8">
          <h2 className="text-xl font-semibold text-teal-900 mb-4 flex items-center">
            <BookOpen size={20} className="mr-2 text-teal-600" />
            Table of Contents
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link href="#section1" className="p-3 bg-teal-50 hover:bg-teal-100 rounded-md text-teal-700 transition-colors">
              1. Acceptance of Terms
            </Link>
            <Link href="#section2" className="p-3 bg-teal-50 hover:bg-teal-100 rounded-md text-teal-700 transition-colors">
              2. Registration and Account
            </Link>
            <Link href="#section3" className="p-3 bg-teal-50 hover:bg-teal-100 rounded-md text-teal-700 transition-colors">
              3. Property Listings
            </Link>
            <Link href="#section4" className="p-3 bg-teal-50 hover:bg-teal-100 rounded-md text-teal-700 transition-colors">
              4. User Conduct
            </Link>
            <Link href="#section5" className="p-3 bg-teal-50 hover:bg-teal-100 rounded-md text-teal-700 transition-colors">
              5. Intellectual Property
            </Link>
            <Link href="#section6" className="p-3 bg-teal-50 hover:bg-teal-100 rounded-md text-teal-700 transition-colors">
              6. Limitation of Liability
            </Link>
            <Link href="#section7" className="p-3 bg-teal-50 hover:bg-teal-100 rounded-md text-teal-700 transition-colors">
              7. Termination
            </Link>
            <Link href="#section8" className="p-3 bg-teal-50 hover:bg-teal-100 rounded-md text-teal-700 transition-colors">
              8. Governing Law
            </Link>
          </div>
        </Card>
        
        {/* Main Content */}
        <div className="space-y-8">
          {/* Section 1 */}
          <section id="section1" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-teal-100 rounded-full p-2 text-teal-700">
                <FileCheck size={20} />
              </div>
              <h2 className="text-2xl font-bold text-teal-950">1. Acceptance of Terms</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-teal-100 shadow-md">
              <div className="prose prose-teal max-w-none">
                <p>By accessing or using the Ilkevim platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, along with our Privacy Policy.</p>
                
                <p>These terms constitute a legally binding agreement between you and Ilkevim regarding your use of our website, mobile applications, and related services. We reserve the right to modify these terms at any time, and such modifications shall be effective immediately upon posting the modified terms on the platform.</p>
                
                <p>Your continued use of our services following any changes to these Terms and Conditions constitutes your acceptance of those changes. It is your responsibility to review these Terms regularly to stay informed of any updates.</p>
              </div>
            </Card>
          </section>
          
          {/* Section 2 */}
          <section id="section2" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-teal-100 rounded-full p-2 text-teal-700">
                <ShieldCheck size={20} />
              </div>
              <h2 className="text-2xl font-bold text-teal-950">2. Registration and Account</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-teal-100 shadow-md">
              <div className="prose prose-teal max-w-none">
                <h3>2.1 Account Creation</h3>
                <p>To access certain features of our platform, you may be required to register for an account. When you register, you agree to provide accurate, current, and complete information about yourself as prompted by our registration forms.</p>
                
                <h3>2.2 Account Responsibility</h3>
                <p>You are solely responsible for:</p>
                <ul>
                  <li>Maintaining the confidentiality of your account password and username</li>
                  <li>Restricting access to your computer or mobile device</li>
                  <li>All activities that occur under your account</li>
                </ul>
                
                <p>You agree to notify Ilkevim immediately of any unauthorized use of your account or any other breach of security. Ilkevim will not be liable for any loss that you may incur as a result of someone else using your password or account, either with or without your knowledge.</p>
                
                <h3>2.3 User Verification</h3>
                <p>To ensure the integrity of our platform, we may conduct verification procedures for users, especially for property owners and agents. By creating an account, you consent to these verification procedures, which may include identity verification and credential validation.</p>
              </div>
            </Card>
          </section>
          
          {/* Section 3 */}
          <section id="section3" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-teal-100 rounded-full p-2 text-teal-700">
                <FileCheck size={20} />
              </div>
              <h2 className="text-2xl font-bold text-teal-950">3. Property Listings</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-teal-100 shadow-md">
              <div className="prose prose-teal max-w-none">
                <h3>3.1 Accuracy of Information</h3>
                <p>Information about properties is provided by property owners, agents, or other third parties. While we strive to ensure the accuracy of all information on our platform, Ilkevim does not guarantee the accuracy, completeness, or reliability of any property listings, descriptions, or related information.</p>
                
                <h3>3.2 No Endorsement</h3>
                <p>The inclusion of any property listings on our platform does not constitute an endorsement or recommendation by Ilkevim. We do not verify the legality, quality, safety, or other aspects of the properties listed on our platform.</p>
                
                <h3>3.3 Property Inquiries and Transactions</h3>
                <p>Ilkevim acts solely as a platform connecting property seekers with property owners and agents. We are not a party to any agreements or transactions between users. Any transaction, communication, or dispute that may arise between users is solely between those users.</p>
                
                <p>Before making any decision regarding a property, we strongly recommend:</p>
                <ul>
                  <li>Conducting thorough research</li>
                  <li>Visiting the property in person</li>
                  <li>Verifying all information directly with the property owner or agent</li>
                  <li>Seeking professional advice where appropriate</li>
                </ul>
              </div>
            </Card>
          </section>
          
          {/* Section 4 */}
          <section id="section4" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-teal-100 rounded-full p-2 text-teal-700">
                <MousePointerClick size={20} />
              </div>
              <h2 className="text-2xl font-bold text-teal-950">4. User Conduct</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-teal-100 shadow-md">
              <div className="prose prose-teal max-w-none">
                <h3>4.1 Prohibited Activities</h3>
                <p>When using our platform, you agree not to:</p>
                <ul>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Post false, misleading, or fraudulent content</li>
                  <li>Impersonate another person or entity</li>
                  <li>Post content that is defamatory, obscene, or otherwise objectionable</li>
                  <li>Use the platform to send unsolicited communications</li>
                  <li>Interfere with or disrupt the platform or servers</li>
                  <li>Attempt to gain unauthorized access to any part of the platform</li>
                  <li>Use data mining, robots, or similar data gathering methods</li>
                  <li>Circumvent any measures we use to restrict access to the platform</li>
                </ul>
                
                <h3>4.2 Content Removal</h3>
                <p>Ilkevim reserves the right, but has no obligation, to monitor the content posted on our platform. We may remove any content that violates these Terms or is otherwise objectionable, at our sole discretion and without notice.</p>
              </div>
            </Card>
          </section>
          
          {/* Section 5 */}
          <section id="section5" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-teal-100 rounded-full p-2 text-teal-700">
                <FileCheck size={20} />
              </div>
              <h2 className="text-2xl font-bold text-teal-950">5. Intellectual Property</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-teal-100 shadow-md">
              <div className="prose prose-teal max-w-none">
                <h3>5.1 Ilkevim Content</h3>
                <p>All content provided on the platform, including but not limited to text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of Ilkevim or its content suppliers and is protected by international copyright laws.</p>
                
                <h3>5.2 User Content</h3>
                <p>By posting, uploading, or otherwise submitting any content to our platform, you grant Ilkevim a non-exclusive, worldwide, royalty-free, perpetual, irrevocable license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content in any media.</p>
                
                <p>You represent and warrant that:</p>
                <ul>
                  <li>You own or have the necessary licenses, rights, consents, and permissions to use and authorize Ilkevim to use all intellectual property rights in and to any content that you submit</li>
                  <li>The content does not infringe upon the intellectual property rights of any third party</li>
                </ul>
              </div>
            </Card>
          </section>
          
          {/* Section 6 */}
          <section id="section6" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-teal-100 rounded-full p-2 text-teal-700">
                <Scale size={20} />
              </div>
              <h2 className="text-2xl font-bold text-teal-950">6. Limitation of Liability</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-teal-100 shadow-md">
              <div className="prose prose-teal max-w-none">
                <h3>6.1 Disclaimer of Warranties</h3>
                <p>THE ILKEVIM PLATFORM AND ALL CONTENT, FUNCTIONS, AND SERVICES PROVIDED THROUGH THE PLATFORM ARE PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.</p>
                
                <h3>6.2 Limitation of Liability</h3>
                <p>IN NO EVENT SHALL ILKEVIM, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS, BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:</p>
                <ul>
                  <li>Your access to or use of or inability to access or use the platform</li>
                  <li>Any conduct or content of any third party on the platform</li>
                  <li>Any content obtained from the platform</li>
                  <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                </ul>
                
                <p>In jurisdictions where the exclusion or limitation of liability for consequential or incidental damages is not allowed, our liability shall be limited to the maximum extent permitted by law.</p>
              </div>
            </Card>
          </section>
          
          {/* Section 7 */}
          <section id="section7" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-teal-100 rounded-full p-2 text-teal-700">
                <AlertCircle size={20} />
              </div>
              <h2 className="text-2xl font-bold text-teal-950">7. Termination</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-teal-100 shadow-md">
              <div className="prose prose-teal max-w-none">
                <p>Ilkevim reserves the right to terminate or suspend your account and access to the platform immediately, without prior notice or liability, for any reason, including, without limitation, if you breach these Terms and Conditions.</p>
                
                <p>Upon termination, your right to use the platform will immediately cease. If you wish to terminate your account, you may simply discontinue using the platform or contact us to request account deletion.</p>
                
                <p>All provisions of these Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p>
              </div>
            </Card>
          </section>
          
          {/* Section 8 */}
          <section id="section8" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-teal-100 rounded-full p-2 text-teal-700">
                <Scale size={20} />
              </div>
              <h2 className="text-2xl font-bold text-teal-950">8. Governing Law</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-teal-100 shadow-md">
              <div className="prose prose-teal max-w-none">
                <p>These Terms shall be governed and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law provisions.</p>
                
                <p>Any dispute arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the courts located within the United Kingdom.</p>
                
                <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.</p>
              </div>
            </Card>
          </section>
        </div>
        
        {/* Contact Us */}
        <div className="mt-12 bg-teal-50 border border-teal-100 rounded-lg p-6">
          <h2 className="text-xl font-bold text-teal-900 mb-4">Have Questions?</h2>
          <p className="text-teal-700 mb-4">If you have any questions about these Terms and Conditions, please contact us at:</p>
          <div className="space-y-2">
            <p className="font-medium">Ilkevim UK Limited</p>
            <p>123 Property Lane, London, SW1A 1AA</p>
            <p>Email: legal@ilkevim.co.uk</p>
            <p>Phone: +44 20 1234 5678</p>
          </div>
        </div>
        
        {/* Related Links */}
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <Link href="/privacy">
            <Button variant="outline" className="w-full md:w-auto border-teal-200 hover:bg-teal-50 hover:border-teal-300 text-teal-700">
              View Privacy Policy
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" className="w-full md:w-auto border-teal-200 hover:bg-teal-50 hover:border-teal-300 text-teal-700">
              Return to Registration
            </Button>
          </Link>
        </div>
        
        {/* Last Updated */}
        <div className="mt-8 border-t border-teal-100 pt-4 text-sm text-teal-600 text-center">
          These Terms and Conditions were last updated on June 1, 2024.
        </div>
      </div>
    </div>
  );
} 