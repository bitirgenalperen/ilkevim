'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ArrowLeft, 
  ArrowDownToLine, 
  Shield, 
  Cookie, 
  Lock, 
  Mail, 
  Share2, 
  Globe, 
  Clock, 
  Eye, 
  FileText, 
  BookOpen,
  AlertCircle 
} from 'lucide-react';

export default function PrivacyPage() {
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
              <h1 className="text-3xl md:text-4xl font-bold text-[#1A2A44]">Privacy Policy</h1>
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
              <Shield className="text-[#D4AF37] shrink-0 mt-1" />
              <div>
                <p className="font-medium text-[#1A2A44]">Your privacy is important to us.</p>
                <p className="text-gray-600 mt-1">This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.</p>
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
              1. Information We Collect
            </Link>
            <Link href="#section2" className="p-3 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 rounded-md text-[#1A2A44] transition-colors">
              2. How We Use Your Information
            </Link>
            <Link href="#section3" className="p-3 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 rounded-md text-[#1A2A44] transition-colors">
              3. Disclosure of Your Information
            </Link>
            <Link href="#section4" className="p-3 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 rounded-md text-[#1A2A44] transition-colors">
              4. Security of Your Information
            </Link>
            <Link href="#section5" className="p-3 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 rounded-md text-[#1A2A44] transition-colors">
              5. Cookies and Tracking Technologies
            </Link>
            <Link href="#section6" className="p-3 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 rounded-md text-[#1A2A44] transition-colors">
              6. Third-Party Websites
            </Link>
            <Link href="#section7" className="p-3 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 rounded-md text-[#1A2A44] transition-colors">
              7. Children&apos;s Privacy
            </Link>
            <Link href="#section8" className="p-3 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 rounded-md text-[#1A2A44] transition-colors">
              8. Your Rights and Choices
            </Link>
            <Link href="#section9" className="p-3 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 rounded-md text-[#1A2A44] transition-colors">
              9. Changes to This Privacy Policy
            </Link>
            <Link href="#section10" className="p-3 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 rounded-md text-[#1A2A44] transition-colors">
              10. Contact Us
            </Link>
          </div>
        </Card>
        
        {/* Main Content */}
        <div className="space-y-8">
          {/* Section 1 */}
          <section id="section1" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <FileText size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">1. Information We Collect</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <p>We collect several types of information from and about users of our platform, including:</p>
                
                <h3>1.1 Personal Information</h3>
                <p>We may collect personal identification information from users in various ways, including, but not limited to, when users visit our site, register on the site, fill out a form, and in connection with other activities, services, features or resources we make available on our platform. This may include:</p>
                <ul>
                  <li>Contact information (such as name, email address, phone number)</li>
                  <li>Profile information (such as username and password)</li>
                  <li>Demographic information (such as postal address)</li>
                  <li>Preference information (such as property preferences and search history)</li>
                  <li>Financial information (for property transactions or subscription payments)</li>
                  <li>Identity verification documents (for property owners and agents)</li>
                </ul>
                <p>Users may, however, visit our site anonymously. We will collect personal identification information from users only if they voluntarily submit such information to us.</p>
                
                <h3>1.2 Non-Personal Information</h3>
                <p>We may collect non-personal identification information about users whenever they interact with our platform. Non-personal identification information may include:</p>
                <ul>
                  <li>Browser name</li>
                  <li>Type of computer or device</li>
                  <li>Technical information about users&apos; means of connection to our platform, such as the operating system, the Internet service providers utilized, and other similar information</li>
                  <li>Usage data (such as pages visited, time spent on pages, links clicked)</li>
                </ul>

                <h3>1.3 Information From Third Parties</h3>
                <p>We may receive information about you if you use any of the other websites we operate or the other services we provide. We also work closely with third parties (including, for example, business partners, service providers, advertising networks, analytics providers, and search information providers) and may receive information about you from them.</p>
              </div>
            </Card>
          </section>
          
          {/* Section 2 */}
          <section id="section2" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <Eye size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">2. How We Use Your Information</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <p>We may use the information we collect from you for the following purposes:</p>
                
                <h3>2.1 Provide and Improve Services</h3>
                <ul>
                  <li>To provide and maintain our platform</li>
                  <li>To improve our platform and user experience</li>
                  <li>To personalize your experience and deliver content and product offerings relevant to your interests</li>
                  <li>To match property seekers with appropriate property listings</li>
                  <li>To facilitate communication between property seekers and property owners/agents</li>
                  <li>To process transactions and send related information including confirmations and invoices</li>
                </ul>
                
                <h3>2.2 Communication</h3>
                <ul>
                  <li>To respond to your inquiries, comments, or questions</li>
                  <li>To send you technical notices, updates, security alerts, and support and administrative messages</li>
                  <li>To send promotional communications, such as providing you with information about services, features, surveys, newsletters, offers, promotions, contests, and events</li>
                  <li>To notify you about changes to our platform or any products or services we offer or provide through it</li>
                </ul>
                
                <h3>2.3 Analytics and Research</h3>
                <ul>
                  <li>To analyze trends, administer the platform, track users&apos; movements around the platform, and gather demographic information about our user base as a whole</li>
                  <li>To monitor and analyze the effectiveness of our platform and marketing activities</li>
                  <li>To conduct research and development to improve our products and services</li>
                </ul>
                
                <h3>2.4 Legal Compliance and Protection</h3>
                <ul>
                  <li>To comply with legal obligations</li>
                  <li>To enforce our terms and conditions and other policies</li>
                  <li>To protect our rights, privacy, safety or property, and/or that of our affiliates, you or others</li>
                  <li>To detect, prevent, or otherwise address fraud, security, or technical issues</li>
                </ul>
              </div>
            </Card>
          </section>
          
          {/* Section 3 */}
          <section id="section3" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <Share2 size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">3. Disclosure of Your Information</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <p>We may disclose personal information that we collect or you provide as described in this privacy policy:</p>
                
                <h3>3.1 Service Providers</h3>
                <p>We may share your information with third-party vendors, service providers, contractors, or agents who perform functions on our behalf, such as:</p>
                <ul>
                  <li>Payment processors</li>
                  <li>Customer service providers</li>
                  <li>Email and SMS service providers</li>
                  <li>Analytics providers</li>
                  <li>Security and fraud prevention services</li>
                  <li>Hosting and technology providers</li>
                </ul>

                <h3>3.2 Property Parties</h3>
                <p>When you express interest in a property, we may share your contact information and inquiry details with the property owner or agent associated with that listing to facilitate communication. Similarly, if you list a property, certain information may be shared with potential buyers or renters who express interest.</p>
                
                <h3>3.3 Business Transfers</h3>
                <p>If we are involved in a merger, acquisition, financing due diligence, reorganization, bankruptcy, receivership, sale of company assets, or transition of service to another provider, your information may be transferred as part of such a transaction as permitted by law and/or contract.</p>
                
                <h3>3.4 Legal Requirements</h3>
                <p>We may disclose your information where we believe disclosure is necessary or required by law or regulation, to comply with legal process served on us, or to protect the rights, property, or safety of Ilkevim, our users, or others.</p>
                
                <h3>3.5 With Your Consent</h3>
                <p>We may disclose your personal information for any other purpose with your consent.</p>
              </div>
            </Card>
          </section>
          
          {/* Section 4 */}
          <section id="section4" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <Lock size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">4. Security of Your Information</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. These measures include:</p>
                <ul>
                  <li>Encryption of sensitive data both in transit and at rest</li>
                  <li>Regular security assessments and penetration testing</li>
                  <li>Access controls and authentication procedures</li>
                  <li>Secure data storage and backup procedures</li>
                  <li>Regular staff training on data protection and security practices</li>
                </ul>
                
                <p>However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security. Therefore, we cannot ensure or warrant the security of any information you transmit to us, and you do so at your own risk.</p>
                
                <p>We will make any legally required disclosures of any breach of the security, confidentiality, or integrity of your unencrypted electronically stored &quot;personal data&quot; to you via email or conspicuous posting on this website in the most expedient time possible and without unreasonable delay, consistent with (i) the legitimate needs of law enforcement or (ii) any measures necessary to determine the scope of the breach and restore the reasonable integrity of the data system.</p>
              </div>
            </Card>
          </section>
          
          {/* Section 5 */}
          <section id="section5" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <Cookie size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">5. Cookies and Tracking Technologies</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <h3>5.1 Cookies</h3>
                <p>We use cookies and similar tracking technologies to track activity on our platform and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device.</p>
                
                <p>We use the following types of cookies:</p>
                <ul>
                  <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly and cannot be switched off in our systems.</li>
                  <li><strong>Performance Cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.</li>
                  <li><strong>Functionality Cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization.</li>
                  <li><strong>Targeting Cookies:</strong> These cookies may be set through our site by our advertising partners to build a profile of your interests and show you relevant advertisements on other sites.</li>
                </ul>
                
                <h3>5.2 Cookie Management</h3>
                <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our platform. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer.</p>
                
                <h3>5.3 Analytics</h3>
                <p>We may use third-party Service Providers, such as Google Analytics, to monitor and analyze the use of our platform. These services may track details such as the frequency with which users visit our platform, what pages they visit, and what other sites they used prior to coming to our platform. We use the information we get from these services to improve our platform.</p>
              </div>
            </Card>
          </section>
          
          {/* Section 6 */}
          <section id="section6" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <Globe size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">6. Third-Party Websites</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <p>Our platform may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party&apos;s site. We strongly advise you to review the Privacy Policy of every site you visit.</p>
                
                <p>We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services. These third-party services may have their own privacy policies and customer service policies. For more information about a third party&apos;s privacy practices, you should consult the third party&apos;s privacy policy.</p>
                
                <p>In addition, we are not responsible for the information collection, use, disclosure, or security practices (including the data security practices) of other organizations, such as Facebook, Apple, Google, Microsoft, or any other app developer, app provider, social media platform provider, operating system provider, or device manufacturer.</p>
              </div>
            </Card>
          </section>
          
          {/* Section 7 */}
          <section id="section7" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <AlertCircle size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">7. Children&apos;s Privacy</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <p>Our platform is not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us. If we discover that a child under 18 has provided us with personal information, we will delete such information from our servers immediately.</p>
              </div>
            </Card>
          </section>
          
          {/* Section 8 */}
          <section id="section8" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <Shield size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">8. Your Rights and Choices</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <h3>8.1 Access and Control</h3>
                <p>You have certain rights regarding your personal information. These may include the rights to:</p>
                <ul>
                  <li>Access and receive a copy of your personal data</li>
                  <li>Rectify or update your personal data</li>
                  <li>Request deletion of your personal data</li>
                  <li>Restrict or object to our processing of your personal data</li>
                  <li>Request that we transfer your personal data to another service provider (data portability)</li>
                  <li>Withdraw consent where our processing is based on your consent</li>
                </ul>
                
                <p>You can exercise many of these rights by accessing your account settings or contacting us using the contact information provided below.</p>
                
                <h3>8.2 Marketing Communications</h3>
                <p>You have the right to opt-out of marketing communications we send you at any time. You can exercise this right by clicking on the &quot;unsubscribe&quot; or &quot;opt-out&quot; link in the marketing emails we send you, or by contacting us using the contact information provided below.</p>
                
                <h3>8.3 Data Retention</h3>
                <p>We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.</p>
              </div>
            </Card>
          </section>
          
          {/* Section 9 */}
          <section id="section9" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <Clock size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">9. Changes to This Privacy Policy</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Effective Date&quot; at the top of this Privacy Policy.</p>
                
                <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page. Your continued use of our platform following the posting of changes to this policy will be deemed your acceptance of those changes.</p>
                
                <p>If we make material changes to this policy, we will make reasonable efforts to notify you, such as by sending you an email to the email address specified in your account, posting a notice on our home page, or by other means consistent with applicable law.</p>
              </div>
            </Card>
          </section>
          
          {/* Section 10 */}
          <section id="section10" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <Mail size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">10. Contact Us</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <ul>
                  <li><strong>By email:</strong> privacy@ilkevim.co.uk</li>
                  <li><strong>By phone:</strong> +44 20 1234 5678</li>
                  <li><strong>By mail:</strong> Data Protection Officer, Ilkevim UK Limited, 123 Property Lane, London, SW1A 1AA, United Kingdom</li>
                </ul>
                
                <p>For data subjects in the European Union, please note that we have appointed a Data Protection Officer who can be contacted regarding any issues related to the processing of your personal data. Our Data Protection Officer can be contacted at dpo@ilkevim.co.uk.</p>
              </div>
            </Card>
          </section>
        </div>
        
        {/* EEA and UK Rights */}
        <div className="mt-12 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-lg p-6">
          <h2 className="text-xl font-bold text-[#1A2A44] mb-4">Additional Information for EEA and UK Residents</h2>
          <div className="prose prose-[#1A2A44] max-w-none">
            <p>If you are a resident of the European Economic Area (EEA) or the United Kingdom, you have certain additional rights under the General Data Protection Regulation (GDPR) and the UK GDPR.</p>
            
            <p><strong>Legal Basis for Processing:</strong> We will only process your personal data when we have a legal basis to do so. The legal bases we rely on include:</p>
            <ul>
              <li>Your consent</li>
              <li>Performance of a contract with you</li>
              <li>Compliance with a legal obligation</li>
              <li>Protection of vital interests</li>
              <li>Performance of a task carried out in the public interest</li>
              <li>Our legitimate interests, provided they are not overridden by your rights and freedoms</li>
            </ul>
            
            <p><strong>International Transfers:</strong> Your personal data may be transferred to, and processed in, countries other than the country in which you are resident. These countries may have data protection laws that are different from the laws of your country. We have implemented appropriate safeguards to ensure that your personal data remains protected in accordance with this Privacy Policy.</p>
            
            <p><strong>Complaints:</strong> If you are a resident of the EEA or UK and you believe we are unlawfully processing your personal data, you have the right to lodge a complaint with your local data protection supervisory authority.</p>
          </div>
        </div>
        
        {/* Related Links */}
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <Link href="/terms">
            <Button variant="outline" className="w-full md:w-auto border-[#D4AF37]/20 hover:bg-[#D4AF37]/5 hover:border-[#D4AF37]/40 text-[#D4AF37]">
              View Terms and Conditions
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
          This Privacy Policy was last updated on June 1, 2024.
        </div>
      </div>
    </div>
  );
} 