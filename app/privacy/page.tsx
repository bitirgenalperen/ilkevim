'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('privacy');

  const getTranslationArray = (key: string): string[] => {
    const value = t(key, { returnObjects: true });
    return Array.isArray(value) ? value : [];
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
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
              <Shield className="text-[#D4AF37] shrink-0 mt-1" />
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
              <Link 
                key={index}
                href={`#section${index + 1}`} 
                className="p-3 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 rounded-md text-[#1A2A44] transition-colors"
              >
                {section}
              </Link>
            ))}
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
              <h2 className="text-2xl font-bold text-[#1A2A44]">{t('sections.information_collection.title')}</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <p>{t('sections.information_collection.description')}</p>
                
                <h3>{t('sections.information_collection.personal_info.title')}</h3>
                <p>{t('sections.information_collection.personal_info.description')}</p>
                <ul>
                  {getTranslationArray('sections.information_collection.personal_info.items').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <p>{t('sections.information_collection.personal_info.note')}</p>
                
                <h3>{t('sections.information_collection.non_personal_info.title')}</h3>
                <p>{t('sections.information_collection.non_personal_info.description')}</p>
                <ul>
                  {getTranslationArray('sections.information_collection.non_personal_info.items').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h3>{t('sections.information_collection.third_party.title')}</h3>
                <p>{t('sections.information_collection.third_party.description')}</p>
              </div>
            </Card>
          </section>
          
          {/* Section 2 */}
          <section id="section2" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <Eye size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">{t('sections.information_usage.title')}</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <p>{t('sections.information_usage.description')}</p>
                
                <h3>{t('sections.information_usage.services.title')}</h3>
                <ul>
                  {getTranslationArray('sections.information_usage.services.items').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                
                <h3>{t('sections.information_usage.communication.title')}</h3>
                <ul>
                  {getTranslationArray('sections.information_usage.communication.items').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                
                <h3>{t('sections.information_usage.analytics.title')}</h3>
                <ul>
                  {getTranslationArray('sections.information_usage.analytics.items').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                
                <h3>{t('sections.information_usage.legal.title')}</h3>
                <ul>
                  {getTranslationArray('sections.information_usage.legal.items').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
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
              <h2 className="text-2xl font-bold text-[#1A2A44]">{t('sections.disclosure.title')}</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <p>{t('sections.disclosure.description')}</p>
                
                <h3>{t('sections.disclosure.service_providers.title')}</h3>
                <p>{t('sections.disclosure.service_providers.description')}</p>
                <ul>
                  {getTranslationArray('sections.disclosure.service_providers.items').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h3>{t('sections.disclosure.property_parties.title')}</h3>
                <p>{t('sections.disclosure.property_parties.description')}</p>
                
                <h3>{t('sections.disclosure.business_transfers.title')}</h3>
                <p>{t('sections.disclosure.business_transfers.description')}</p>
                
                <h3>{t('sections.disclosure.legal_requirements.title')}</h3>
                <p>{t('sections.disclosure.legal_requirements.description')}</p>
                
                <h3>{t('sections.disclosure.consent.title')}</h3>
                <p>{t('sections.disclosure.consent.description')}</p>
              </div>
            </Card>
          </section>
          
          {/* Section 4 */}
          <section id="section4" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <Lock size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">{t('sections.security.title')}</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <p>{t('sections.security.description')}</p>
                <ul>
                  {getTranslationArray('sections.security.measures').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                
                <p>{t('sections.security.disclaimer')}</p>
                
                <p>{t('sections.security.breach_notification')}</p>
              </div>
            </Card>
          </section>
          
          {/* Section 5 */}
          <section id="section5" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <Cookie size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">{t('sections.cookies.title')}</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <h3>{t('sections.cookies.cookies.title')}</h3>
                <p>{t('sections.cookies.cookies.description')}</p>
                
                <p>{t('sections.cookies.cookies.types.title')}</p>
                <ul>
                  {getTranslationArray('sections.cookies.cookies.types.items').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                
                <h3>{t('sections.cookies.management.title')}</h3>
                <p>{t('sections.cookies.management.description')}</p>
                
                <h3>{t('sections.cookies.analytics.title')}</h3>
                <p>{t('sections.cookies.analytics.description')}</p>
              </div>
            </Card>
          </section>
          
          {/* Section 6 */}
          <section id="section6" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <Globe size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">{t('sections.third_party_websites.title')}</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <p>{t('sections.third_party_websites.description')}</p>
                <p>{t('sections.third_party_websites.disclaimer')}</p>
                <p>{t('sections.third_party_websites.additional_info')}</p>
              </div>
            </Card>
          </section>
          
          {/* Section 7 */}
          <section id="section7" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <AlertCircle size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">{t('sections.children_privacy.title')}</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <p>{t('sections.children_privacy.description')}</p>
              </div>
            </Card>
          </section>
          
          {/* Section 8 */}
          <section id="section8" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <Shield size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">{t('sections.rights_choices.title')}</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <h3>{t('sections.rights_choices.access_control.title')}</h3>
                <p>{t('sections.rights_choices.access_control.description')}</p>
                <ul>
                  {getTranslationArray('sections.rights_choices.access_control.items').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <p>{t('sections.rights_choices.access_control.note')}</p>
                
                <h3>{t('sections.rights_choices.marketing.title')}</h3>
                <p>{t('sections.rights_choices.marketing.description')}</p>
                
                <h3>{t('sections.rights_choices.retention.title')}</h3>
                <p>{t('sections.rights_choices.retention.description')}</p>
              </div>
            </Card>
          </section>
          
          {/* Section 9 */}
          <section id="section9" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <Clock size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">{t('sections.changes.title')}</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <p>{t('sections.changes.description')}</p>
                <p>{t('sections.changes.review')}</p>
                <p>{t('sections.changes.notification')}</p>
              </div>
            </Card>
          </section>
          
          {/* Section 10 */}
          <section id="section10" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#D4AF37]/10 rounded-full p-2 text-[#D4AF37]">
                <Mail size={20} />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44]">{t('sections.contact.title')}</h2>
            </div>
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#D4AF37]/20 shadow-md">
              <div className="prose prose-[#1A2A44] max-w-none">
                <p>{t('sections.contact.description')}</p>
                <ul>
                  {getTranslationArray('sections.contact.items').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <p>{t('sections.contact.dpo')}</p>
              </div>
            </Card>
          </section>
        </div>
        
        {/* EEA and UK Rights */}
        <div className="mt-12 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-lg p-6">
          <h2 className="text-xl font-bold text-[#1A2A44] mb-4">{t('eea_uk_rights.title')}</h2>
          <div className="prose prose-[#1A2A44] max-w-none">
            <p>{t('eea_uk_rights.description')}</p>
            
            <p><strong>{t('eea_uk_rights.legal_basis.title')}</strong> {t('eea_uk_rights.legal_basis.description')}</p>
            <ul>
              {getTranslationArray('eea_uk_rights.legal_basis.items').map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            
            <p><strong>{t('eea_uk_rights.international_transfers.title')}</strong> {t('eea_uk_rights.international_transfers.description')}</p>
            
            <p><strong>{t('eea_uk_rights.complaints.title')}</strong> {t('eea_uk_rights.complaints.description')}</p>
          </div>
        </div>
        
        {/* Related Links */}
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <Link href="/terms">
            <Button variant="outline" className="w-full md:w-auto border-[#D4AF37]/20 hover:bg-[#D4AF37]/5 hover:border-[#D4AF37]/40 text-[#D4AF37]">
              {t('related_links.terms')}
            </Button>
          </Link>
          <Link href="/register">
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