'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ArrowLeft, 
  ArrowDownToLine, 
  Cookie, 
  ShieldCheck, 
  Settings2, 
  Info, 
  BookOpen,
  AlertCircle,
  Lock,
} from 'lucide-react';

export default function CookiePolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-teal-50 to-white pt-24 pb-16">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium mb-6"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-teal-950">Cookie Policy</h1>
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
              <Cookie className="text-amber-500 shrink-0 mt-1" size={24} />
              <div>
                <p className="font-medium text-gray-900">This Cookie Policy explains how Ilkevim uses cookies and similar technologies on our website.</p>
                <p className="text-gray-600 mt-1">We have created this policy to provide you with clear and explicit information about the technologies we use, helping you make informed decisions about your browsing experience.</p>
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
              1. What Are Cookies?
            </Link>
            <Link href="#section2" className="p-3 bg-teal-50 hover:bg-teal-100 rounded-md text-teal-700 transition-colors">
              2. Types of Cookies We Use
            </Link>
            <Link href="#section3" className="p-3 bg-teal-50 hover:bg-teal-100 rounded-md text-teal-700 transition-colors">
              3. How We Use Cookies
            </Link>
            <Link href="#section4" className="p-3 bg-teal-50 hover:bg-teal-100 rounded-md text-teal-700 transition-colors">
              4. Third-Party Cookies
            </Link>
            <Link href="#section5" className="p-3 bg-teal-50 hover:bg-teal-100 rounded-md text-teal-700 transition-colors">
              5. Managing Your Cookie Preferences
            </Link>
            <Link href="#section6" className="p-3 bg-teal-50 hover:bg-teal-100 rounded-md text-teal-700 transition-colors">
              6. Cookie Policy Updates
            </Link>
          </div>
        </Card>
        
        {/* Main Content */}
        <div className="space-y-8">
          {/* Section 1 */}
          <section id="section1" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-teal-100 rounded-full p-2 text-teal-700">
                <Cookie size={20} />
              </div>
              <h2 className="text-2xl font-bold text-teal-950">1. What Are Cookies?</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-teal-100 shadow-md">
              <div className="prose prose-teal max-w-none">
                <p>Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide valuable information to website owners.</p>
                
                <p>Cookies allow a website to recognize your device and remember your preferences, helping to enhance your browsing experience. They are not harmful and do not contain personal information like your email address or payment details.</p>
                
                <h3>1.1 How Cookies Work</h3>
                <p>When you visit our website, we may send a cookie to your browser. Your browser stores the cookie in a small file on your computer or mobile device. When you return to our website, your browser sends the cookie back to us, allowing us to recognize you and tailor your experience accordingly.</p>
                
                <h3>1.2 Cookie Lifespan</h3>
                <p>Cookies can be classified into two categories based on their lifespan:</p>
                <ul>
                  <li><strong>Session Cookies:</strong> These cookies are temporary and are erased when you close your browser. They are essential for certain website functionalities.</li>
                  <li><strong>Persistent Cookies:</strong> These cookies remain on your device for a specified period or until you delete them manually. They help remember your preferences for future visits.</li>
                </ul>
              </div>
            </Card>
          </section>
          
          {/* Section 2 */}
          <section id="section2" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-teal-100 rounded-full p-2 text-teal-700">
                <Settings2 size={20} />
              </div>
              <h2 className="text-2xl font-bold text-teal-950">2. Types of Cookies We Use</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-teal-100 shadow-md">
              <div className="prose prose-teal max-w-none">
                <p>We use several types of cookies on our website, each serving a specific purpose:</p>
                
                <h3>2.1 Essential Cookies</h3>
                <p>These cookies are necessary for the proper functioning of our website. They enable core features such as security, network management, and account access. You cannot opt out of these cookies as the website cannot function properly without them.</p>
                <p><strong>Examples:</strong> Authentication cookies, load balancing cookies, security cookies.</p>
                
                <h3>2.2 Functional Cookies</h3>
                <p>These cookies enhance the functionality of our website by storing your preferences. They remember your choices, such as your preferred language or region, to provide a more personalized experience.</p>
                <p><strong>Examples:</strong> Language preference cookies, location cookies, customization cookies.</p>
                
                <h3>2.3 Analytics Cookies</h3>
                <p>These cookies collect anonymous information about how visitors use our website. They help us understand which pages are the most popular, how visitors move around the site, and whether they encounter any error messages. This allows us to improve our website and your browsing experience.</p>
                <p><strong>Examples:</strong> Google Analytics cookies, heat mapping cookies, page visit tracking.</p>
                
                <h3>2.4 Advertising Cookies</h3>
                <p>These cookies are used to deliver advertisements that are relevant to you and your interests. They are also used to limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns.</p>
                <p><strong>Examples:</strong> Third-party advertising cookies, social media cookies, retargeting cookies.</p>
                
                <div className="bg-teal-50 p-4 rounded-lg mt-4 border border-teal-100">
                  <p className="text-sm text-teal-700 mb-0"><strong>Note:</strong> Ilkevim strives to be transparent about the cookies we use. You can manage your cookie preferences using our Cookie Preferences Manager at the top of this page.</p>
                </div>
              </div>
            </Card>
          </section>
          
          {/* Section 3 */}
          <section id="section3" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-teal-100 rounded-full p-2 text-teal-700">
                <Info size={20} />
              </div>
              <h2 className="text-2xl font-bold text-teal-950">3. How We Use Cookies</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-teal-100 shadow-md">
              <div className="prose prose-teal max-w-none">
                <p>Ilkevim uses cookies for various purposes to enhance your experience on our website:</p>
                
                <h3>3.1 Website Functionality</h3>
                <ul>
                  <li>Remembering your login details so you don&apos;t have to re-enter them</li>
                  <li>Storing your property search preferences and criteria</li>
                  <li>Maintaining your session information when navigating between pages</li>
                  <li>Enabling features such as property comparison and favorites</li>
                </ul>
                
                <h3>3.2 Website Performance and Analytics</h3>
                <ul>
                  <li>Understanding how visitors interact with our website</li>
                  <li>Identifying popular pages and user navigation patterns</li>
                  <li>Detecting and addressing technical issues</li>
                  <li>Gathering anonymous statistical data to improve our services</li>
                </ul>
                
                <h3>3.3 Personalization</h3>
                <ul>
                  <li>Tailoring property recommendations based on your browsing history</li>
                  <li>Remembering your language and region preferences</li>
                  <li>Customizing the display of content based on your device</li>
                  <li>Saving your display preferences (such as grid/list view)</li>
                </ul>
                
                <h3>3.4 Marketing and Advertising</h3>
                <ul>
                  <li>Displaying relevant property advertisements that match your interests</li>
                  <li>Measuring the effectiveness of our marketing campaigns</li>
                  <li>Limiting the frequency of advertisements you see</li>
                  <li>Enabling remarketing features to reach you on other websites</li>
                </ul>
              </div>
            </Card>
          </section>
          
          {/* Section 4 */}
          <section id="section4" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-teal-100 rounded-full p-2 text-teal-700">
                <ShieldCheck size={20} />
              </div>
              <h2 className="text-2xl font-bold text-teal-950">4. Third-Party Cookies</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-teal-100 shadow-md">
              <div className="prose prose-teal max-w-none">
                <p>Some cookies on our website are placed by third-party services that appear on our pages. These third parties may collect information about your online activities over time and across different websites when you use our website.</p>
                
                <h3>4.1 Third-Party Service Providers</h3>
                <p>We partner with various third-party services to enhance our website functionality and provide a better user experience. These may include:</p>
                <ul>
                  <li><strong>Analytics Partners:</strong> We use Google Analytics to understand how visitors interact with our website.</li>
                  <li><strong>Marketing Services:</strong> We work with advertising platforms to deliver relevant property advertisements.</li>
                  <li><strong>Social Media Platforms:</strong> Our website includes features from social media platforms like Facebook, Twitter, and Instagram.</li>
                  <li><strong>Mapping Services:</strong> We use Google Maps to display property locations and enable location-based searches.</li>
                  <li><strong>Payment Processors:</strong> For secure payment processing when you make transactions on our platform.</li>
                </ul>
                
                <h3>4.2 How Third-Party Cookies Work</h3>
                <p>These third-party services may use cookies, web beacons, or similar technologies to collect information about your interactions with our website and other websites. They use this information to:</p>
                <ul>
                  <li>Measure and analyze traffic and browsing behavior</li>
                  <li>Show you targeted advertisements based on your interests</li>
                  <li>Improve their own services and their relationship with us</li>
                  <li>Enable social sharing and other social media functionality</li>
                </ul>
                
                <div className="bg-amber-50 p-4 rounded-lg mt-4 border border-amber-100">
                  <p className="text-sm text-amber-700 mb-0"><strong>Important:</strong> Third-party cookies are governed by the respective third parties&apos; privacy policies, not Ilkevim&apos;s Privacy Policy. We encourage you to review the privacy policies of these third parties for more information on how they process your data.</p>
                </div>
              </div>
            </Card>
          </section>
          
          {/* Section 5 */}
          <section id="section5" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-teal-100 rounded-full p-2 text-teal-700">
                <Lock size={20} />
              </div>
              <h2 className="text-2xl font-bold text-teal-950">5. Managing Your Cookie Preferences</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-teal-100 shadow-md">
              <div className="prose prose-teal max-w-none">
                <p>You have the right to decide whether to accept or reject cookies. While essential cookies are necessary for website functionality, you can control other types of cookies in several ways:</p>
                
                <h3>5.1 Our Cookie Preferences Manager</h3>
                <p>You can use our Cookie Preferences Manager at the top of this page to customize your cookie settings on our website. Your preferences will be saved and remembered for future visits.</p>
                
                <h3>5.2 Browser Settings</h3>
                <p>Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies, delete cookies, or alert you when cookies are being sent. The methods for doing so vary from browser to browser, but you can typically find these settings in the &quot;Options&quot;, &quot;Preferences&quot; or &quot;Settings&quot; menu.</p>
                
                <p>Here are links to instructions for managing cookies in common browsers:</p>
                <ul>
                  <li><a href="https://support.google.com/chrome/answer/95647" className="text-teal-600 hover:text-teal-700" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" className="text-teal-600 hover:text-teal-700" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" className="text-teal-600 hover:text-teal-700" target="_blank" rel="noopener noreferrer">Safari</a></li>
                  <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-teal-600 hover:text-teal-700" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
                </ul>
                
                <h3>5.3 Third-Party Opt-Out Tools</h3>
                <p>For advertising cookies specifically, you can use these industry tools to manage your preferences:</p>
                <ul>
                  <li><a href="https://www.youronlinechoices.com/" className="text-teal-600 hover:text-teal-700" target="_blank" rel="noopener noreferrer">Your Online Choices</a> (EU)</li>
                  <li><a href="https://optout.aboutads.info/" className="text-teal-600 hover:text-teal-700" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance</a> (US)</li>
                  <li><a href="https://youradchoices.ca/en/tools" className="text-teal-600 hover:text-teal-700" target="_blank" rel="noopener noreferrer">Ad Choices</a> (Canada)</li>
                </ul>
                
                <h3>5.4 Impact of Rejecting Cookies</h3>
                <p>Please note that if you choose to reject certain cookies, you may not be able to use some features of our website to their full functionality. For example:</p>
                <ul>
                  <li>You may need to provide information or preferences each time you visit our website</li>
                  <li>Certain personalized features may not work</li>
                  <li>You may see advertisements that are less relevant to your interests</li>
                </ul>
                
                <div className="bg-teal-50 p-4 rounded-lg mt-4 border border-teal-100">
                  <p className="text-sm text-teal-700 mb-0"><strong>Tip:</strong> You can delete cookies stored on your device at any time, but this may result in the loss of information that enables you to use our website more efficiently.</p>
                </div>
              </div>
            </Card>
          </section>
          
          {/* Section 6 */}
          <section id="section6" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-teal-100 rounded-full p-2 text-teal-700">
                <AlertCircle size={20} />
              </div>
              <h2 className="text-2xl font-bold text-teal-950">6. Cookie Policy Updates</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-teal-100 shadow-md">
              <div className="prose prose-teal max-w-none">
                <p>We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will be posted on this page with an updated effective date.</p>
                
                <p>We encourage you to review this Cookie Policy periodically to stay informed about our use of cookies. Your continued use of our website after any changes to this Cookie Policy constitutes your acceptance of the new policy.</p>
                
                <p>For significant changes that materially affect your privacy rights, we will provide a more prominent notice, such as an email notification or a banner on our website.</p>
                
                <p>If you have any questions about our Cookie Policy or how we use cookies, please contact us using the details provided below.</p>
              </div>
            </Card>
          </section>
        </div>
        
        {/* Contact Us */}
        <div className="mt-12 bg-teal-50 border border-teal-100 rounded-lg p-6">
          <h2 className="text-xl font-bold text-teal-900 mb-4">Have Questions?</h2>
          <p className="text-teal-700 mb-4">If you have any questions about our Cookie Policy, please contact us at:</p>
          <div className="space-y-2">
            <p className="font-medium">Ilkevim UK Limited</p>
            <p>123 Property Lane, London, SW1A 1AA</p>
            <p>Email: privacy@ilkevim.co.uk</p>
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
          <Link href="/terms">
            <Button variant="outline" className="w-full md:w-auto border-teal-200 hover:bg-teal-50 hover:border-teal-300 text-teal-700">
              View Terms and Conditions
            </Button>
          </Link>
        </div>
        
        {/* Last Updated */}
        <div className="mt-8 border-t border-teal-100 pt-4 text-sm text-teal-600 text-center">
          This Cookie Policy was last updated on June 1, 2024.
        </div>
      </div>
    </div>
  );
} 