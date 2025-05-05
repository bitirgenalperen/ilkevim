'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowDownToLine, FileCheck, ShieldCheck, Scale, MousePointerClick, AlertCircle, BookOpen } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/register"
            className="inline-flex items-center text-[#D4AF37] hover:text-[#D4AF37]/80 font-medium mb-6"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Registration
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#1A2A44]">Terms and Conditions</h1>
              <p className="text-[#1A2A44]/80 mt-2">Effective Date: June 1, 2024</p>
            </div>
            <Button
              variant="outline"
              className="group inline-flex items-center border-[#D4AF37]/20 hover:bg-[#D4AF37]/5 hover:border-[#D4AF37]/40 text-[#D4AF37] self-start"
              onClick={() => window.print()}
            >
              <ArrowDownToLine size={16} className="mr-2 group-hover:animate-bounce" />
              Download PDF
            </Button>
          </div>
          
          <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <AlertCircle className="text-[#D4AF37] shrink-0 mt-1" />
              <div>
                <p className="font-medium text-[#1A2A44]">Please read these Terms and Conditions carefully before using our platform.</p>
                <p className="text-gray-600 mt-1">By accessing or using the ilkevim website and services, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access the service.</p>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Table of Contents */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md mb-8">
          <h2 className="text-xl font-semibold text-[#1A2A44] mb-4 flex items-center">
            <BookOpen size={20} className="mr-2 text-[#D4AF37]" />
            Table of Contents
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link href="#section1" className="p-3 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 rounded-md text-[#1A2A44] transition-colors">
              1. Acceptance of Terms
            </Link>
            <Link href="#section2" className="p-3 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 rounded-md text-[#1A2A44] transition-colors">
              2. Registration and Account
            </Link>
            <Link href="#section3" className="p-3 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 rounded-md text-[#1A2A44] transition-colors">
              3. Property Listings
            </Link>
            <Link href="#section4" className="p-3 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 rounded-md text-[#1A2A44] transition-colors">
              4. User Conduct
            </Link>
            <Link href="#section5" className="p-3 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 rounded-md text-[#1A2A44] transition-colors">
              5. Intellectual Property
            </Link>
            <Link href="#section6" className="p-3 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 rounded-md text-[#1A2A44] transition-colors">
              6. Limitation of Liability
            </Link>
            <Link href="#section7" className="p-3 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 rounded-md text-[#1A2A44] transition-colors">
              7. Termination
            </Link>
            <Link href="#section8" className="p-3 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 rounded-md text-[#1A2A44] transition-colors">
              8. Governing Law
            </Link>
          </div>
        </Card>
        
        {/* Main Content */}
        <div className="space-y-8">
          {/* Section 1 */}
          <section id="section1" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <FileCheck size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">1. Acceptance of Terms</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <p>By accessing or using the ilkevim platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, along with our Privacy Policy.</p>
                
                <p>These terms constitute a legally binding agreement between you and ilkevim regarding your use of our website, mobile applications, and related services. We reserve the right to modify these terms at any time, and such modifications shall be effective immediately upon posting the modified terms on the platform.</p>
                
                <p>Your continued use of our services following any changes to these Terms and Conditions constitutes your acceptance of those changes. It is your responsibility to review these Terms regularly to stay informed of any updates.</p>
              </div>
            </Card>
          </section>
          
          {/* Section 2 */}
          <section id="section2" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <ShieldCheck size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">2. Registration and Account</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <h3>2.1 Account Creation</h3>
                <p>To access certain features of our platform, you may be required to register for an account. When you register, you agree to provide accurate, current, and complete information about yourself as prompted by our registration forms.</p>
                
                <h3>2.2 Account Responsibility</h3>
                <p>You are solely responsible for:</p>
                <ul>
                  <li>Maintaining the confidentiality of your account password and username</li>
                  <li>Restricting access to your computer or mobile device</li>
                  <li>All activities that occur under your account</li>
                </ul>
                
                <p>You agree to notify ilkevim immediately of any unauthorized use of your account or any other breach of security. ilkevim will not be liable for any loss that you may incur as a result of someone else using your password or account, either with or without your knowledge.</p>
                
                <h3>2.3 User Verification</h3>
                <p>To ensure the integrity of our platform, we may conduct verification procedures for users, especially for property owners and agents. By creating an account, you consent to these verification procedures, which may include identity verification and credential validation.</p>
              </div>
            </Card>
          </section>
          
          {/* Section 3 */}
          <section id="section3" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <FileCheck size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">3. Property Listings</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <h3>3.1 Accuracy of Information</h3>
                <p>Information about properties is provided by property owners, agents, or other third parties. While we strive to maintain the accuracy of all information on our platform, ilkevim does not guarantee the accuracy, completeness, or reliability of any property listings, descriptions, or related information.</p>
                
                <h3>3.2 No Endorsement</h3>
                <p>The inclusion of any property listings on our platform does not constitute an endorsement or recommendation by ilkevim. We do not verify the legality, quality, safety, or other aspects of the properties listed on our platform.</p>
                
                <h3>3.3 Property Inquiries and Transactions</h3>
                <p>ilkevim acts solely as a platform connecting property seekers with property owners and agents. We are not a party to any agreements or transactions between users. Any transaction, communication, or dispute that may arise between users is solely between those users.</p>
                
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
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <MousePointerClick size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">4. User Conduct</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
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
                <p>ilkevim reserves the right, but has no obligation, to monitor the content posted on our platform. We may remove any content that violates these Terms or is otherwise objectionable, at our sole discretion and without notice.</p>
              </div>
            </Card>
          </section>
          
          {/* Section 5 */}
          <section id="section5" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <FileCheck size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">5. Intellectual Property</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <h3>5.1 ilkevim Content</h3>
                <p>The content on our platform, including but not limited to text, graphics, logos, images, and software, is the property of ilkevim or its content suppliers and is protected by international copyright laws.</p>
                
                <h3>5.2 User Content</h3>
                <p>By posting, uploading, or otherwise submitting any content to our platform, you grant ilkevim a non-exclusive, worldwide, royalty-free, perpetual, irrevocable license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content in any media.</p>
                
                <p>You represent and warrant that:</p>
                <ul>
                  <li>You own or have the necessary licenses, rights, consents, and permissions to use and authorize ilkevim to use all intellectual property rights in and to any content that you submit</li>
                  <li>The content does not infringe upon the intellectual property rights of any third party</li>
                </ul>
              </div>
            </Card>
          </section>
          
          {/* Section 6 */}
          <section id="section6" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <Scale size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">6. Limitation of Liability</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <h3>6.1 Disclaimer of Warranties</h3>
                <p>THE ILKEVIM PLATFORM AND ALL CONTENT, FUNCTIONS, AND SERVICES PROVIDED THROUGH THE PLATFORM ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE,&quot; WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.</p>
                
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
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <AlertCircle size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">7. Termination</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <p>ilkevim reserves the right to terminate or suspend your account and access to the platform immediately, without prior notice or liability, for any reason, including, without limitation, if you breach these Terms and Conditions.</p>
                
                <p>Upon termination, your right to use the platform will immediately cease. If you wish to terminate your account, you may simply discontinue using the platform or contact us to request account deletion.</p>
                
                <p>All provisions of these Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p>
              </div>
            </Card>
          </section>
          
          {/* Section 8 */}
          <section id="section8" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <Scale size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">8. Governing Law</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <p>These Terms shall be governed and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law provisions.</p>
                
                <p>Any dispute arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the courts located within the United Kingdom.</p>
                
                <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.</p>
              </div>
            </Card>
          </section>
        </div>
        
        {/* Contact Us */}
        <div className="mt-12 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-lg p-6">
          <h2 className="text-xl font-bold text-[#1A2A44] mb-4">Have Questions?</h2>
          <p className="text-[#1A2A44]/80 mb-4">If you have any questions about these Terms and Conditions, please contact us at:</p>
          <div className="space-y-2">
            <p className="font-medium text-[#1A2A44]">ilkevim UK Limited</p>
            <p className="text-[#1A2A44]/80">123 Property Lane, London, SW1A 1AA</p>
            <p className="text-[#1A2A44]/80">Email: legal@ilkevim.co.uk</p>
            <p className="text-[#1A2A44]/80">Phone: +44 20 1234 5678</p>
          </div>
        </div>
        
        {/* Related Links */}
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <Link href="/privacy">
            <Button variant="outline" className="w-full md:w-auto border-[#D4AF37]/20 hover:bg-[#D4AF37]/5 hover:border-[#D4AF37]/40 text-[#D4AF37]">
              View Privacy Policy
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" className="w-full md:w-auto border-[#D4AF37]/20 hover:bg-[#D4AF37]/5 hover:border-[#D4AF37]/40 text-[#D4AF37]">
              Return to Registration
            </Button>
          </Link>
        </div>
        
        {/* Last Updated */}
        <div className="mt-8 border-t border-[#D4AF37]/20 pt-4 text-sm text-[#1A2A44]/80 text-center">
          These Terms and Conditions were last updated on June 1, 2024.
        </div>
      </div>
    </div>
  );
} 