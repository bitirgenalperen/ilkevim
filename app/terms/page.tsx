'use client';

import { useTranslation } from 'react-i18next'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowDownToLine, FileCheck, ShieldCheck, Scale, MousePointerClick, AlertCircle, BookOpen } from 'lucide-react';

export default function TermsPage() {
  const { t } = useTranslation('terms')

  const getTranslationArray = (key: string): string[] => {
    const result = t(key, { returnObjects: true })
    return Array.isArray(result) ? result : []
  }

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
            {t('header.back_button')}
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#1A2A44]">{t('header.title')}</h1>
              <p className="text-[#1A2A44]/80 mt-2">{t('header.effective_date')}</p>
            </div>
            <Button
              variant="outline"
              className="group inline-flex items-center border-[#D4AF37]/20 hover:bg-[#D4AF37]/5 hover:border-[#D4AF37]/40 text-[#D4AF37] self-start"
              onClick={() => window.print()}
            >
              <ArrowDownToLine size={16} className="mr-2 group-hover:animate-bounce" />
              {t('header.download_button')}
            </Button>
          </div>
          
          <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <AlertCircle className="text-[#D4AF37] shrink-0 mt-1" />
              <div>
                <p className="font-medium text-[#1A2A44]">{t('header.notice.title')}</p>
                <p className="text-gray-600 mt-1">{t('header.notice.description')}</p>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Table of Contents */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md mb-8">
          <h2 className="text-xl font-semibold text-[#1A2A44] mb-4 flex items-center">
            <BookOpen size={20} className="mr-2 text-[#D4AF37]" />
            {t('table_of_contents.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {getTranslationArray('table_of_contents.sections').map((section: string, index: number) => (
              <Link key={index} href={`#section-${index + 1}`} className="p-3 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 rounded-md text-[#1A2A44] transition-colors">
                {section}
              </Link>
            ))}
          </div>
        </Card>
        
        {/* Main Content */}
        <div className="space-y-8">
          {/* Section 1 */}
          <section id="section-1" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <FileCheck size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">{t('sections.acceptance.title')}</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <p>{t('sections.acceptance.description')}</p>
                
                <p>{t('sections.acceptance.agreement')}</p>
                
                <p>{t('sections.acceptance.changes')}</p>
              </div>
            </Card>
          </section>
          
          {/* Section 2 */}
          <section id="section-2" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <ShieldCheck size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">{t('sections.registration.title')}</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <h3>{t('sections.registration.account_creation.title')}</h3>
                <p>{t('sections.registration.account_creation.description')}</p>
                
                <h3>{t('sections.registration.account_responsibility.title')}</h3>
                <p>{t('sections.registration.account_responsibility.description')}</p>
                <ul>
                  {getTranslationArray('sections.registration.account_responsibility.items').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                
                <p>{t('sections.registration.account_responsibility.notice')}</p>
                
                <h3>{t('sections.registration.user_verification.title')}</h3>
                <p>{t('sections.registration.user_verification.description')}</p>
              </div>
            </Card>
          </section>
          
          {/* Section 3 */}
          <section id="section-3" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <FileCheck size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">{t('sections.property_listings.title')}</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <h3>{t('sections.property_listings.accuracy.title')}</h3>
                <p>{t('sections.property_listings.accuracy.description')}</p>
                
                <h3>{t('sections.property_listings.endorsement.title')}</h3>
                <p>{t('sections.property_listings.endorsement.description')}</p>
                
                <h3>{t('sections.property_listings.transactions.title')}</h3>
                <p>{t('sections.property_listings.transactions.description')}</p>
                <p>{t('sections.property_listings.transactions.recommendations')}</p>
                <ul>
                  {getTranslationArray('sections.property_listings.transactions.items').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </Card>
          </section>
          
          {/* Section 4 */}
          <section id="section-4" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <MousePointerClick size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">{t('sections.user_conduct.title')}</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <h3>{t('sections.user_conduct.prohibited.title')}</h3>
                <p>{t('sections.user_conduct.prohibited.description')}</p>
                <ul>
                  {getTranslationArray('sections.user_conduct.prohibited.items').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                
                <h3>{t('sections.user_conduct.content_removal.title')}</h3>
                <p>{t('sections.user_conduct.content_removal.description')}</p>
              </div>
            </Card>
          </section>
          
          {/* Section 5 */}
          <section id="section-5" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <FileCheck size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">{t('sections.intellectual_property.title')}</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <h3>{t('sections.intellectual_property.ilkevim_content.title')}</h3>
                <p>{t('sections.intellectual_property.ilkevim_content.description')}</p>
                
                <h3>{t('sections.intellectual_property.user_content.title')}</h3>
                <p>{t('sections.intellectual_property.user_content.description')}</p>
                
                <p>{t('sections.intellectual_property.user_content.warranty')}</p>
                <ul>
                  {getTranslationArray('sections.intellectual_property.user_content.items').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </Card>
          </section>
          
          {/* Section 6 */}
          <section id="section-6" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <Scale size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">{t('sections.limitation_liability.title')}</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <h3>{t('sections.limitation_liability.disclaimer.title')}</h3>
                <p>{t('sections.limitation_liability.disclaimer.description')}</p>
                
                <h3>{t('sections.limitation_liability.limitation.title')}</h3>
                <p>{t('sections.limitation_liability.limitation.description')}</p>
                <ul>
                  {getTranslationArray('sections.limitation_liability.limitation.items').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <p>{t('sections.limitation_liability.limitation.jurisdiction')}</p>
              </div>
            </Card>
          </section>
          
          {/* Section 7 */}
          <section id="section-7" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <AlertCircle size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">{t('sections.termination.title')}</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <p>{t('sections.termination.description')}</p>
                
                <p>{t('sections.termination.consequences')}</p>
                
                <p>{t('sections.termination.survival')}</p>
              </div>
            </Card>
          </section>
          
          {/* Section 8 */}
          <section id="section-8" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <Scale size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">{t('sections.governing_law.title')}</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <p>{t('sections.governing_law.description')}</p>
                
                <p>{t('sections.governing_law.disputes')}</p>
                
                <p>{t('sections.governing_law.contact')}</p>
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
              {t('related_links.privacy')}
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full md:w-auto border-[#D4AF37]/20 hover:bg-[#D4AF37]/5 hover:border-[#D4AF37]/40 text-[#D4AF37]">
              {t('related_links.register')}
            </Button>
          </Link>
        </div>
        
        {/* Last Updated */}
        <div className="mt-8 border-t border-[#D4AF37]/20 pt-4 text-sm text-[#1A2A44]/80 text-center">
          {t('last_updated')}
        </div>
      </div>
    </div>
  );
} 