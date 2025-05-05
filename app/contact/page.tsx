'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { companyInfo } from '@/data/company-info'
import { PropertyMap } from '@/components/PropertyMap'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
  MessageSquareText,
  ArrowRight,
  Facebook,
  Instagram,
  Twitter,
  Linkedin
} from 'lucide-react'

// Contact info data
const contactInfo = [
  {
    icon: Phone,
    title: 'Call Us',
    details: [companyInfo.phone],
    color: 'from-[#D4AF37] to-[#D4AF37]/80'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    details: [companyInfo.address.split(', ')[0] + ', ' + companyInfo.address.split(', ')[1], companyInfo.address.split(', ')[2] + ', ' + companyInfo.address.split(', ')[3] + ', ' + companyInfo.address.split(', ')[4]],
    color: 'from-[#D4AF37] to-[#D4AF37]/80'
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: ['Monday-Friday: 9AM-6PM', 'Saturday: 10AM-4PM', 'Sunday: Closed'],
    color: 'from-[#D4AF37] to-[#D4AF37]/80'
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: [companyInfo.email],
    color: 'from-[#D4AF37] to-[#D4AF37]/80'
  }
]

// FAQ data
const faqs = [
  {
    question: 'What does Freehold mean?',
    answer: 'Freehold means that you own both the property and the land it sits on indefinitely. You have complete ownership rights and full control over your property without having to pay ground rent or service charges to a landlord.'
  },
  {
    question: 'What is a Leasehold property?',
    answer: 'Leasehold means you have the right to use a property for a set period (typically 99-999 years), but the land it stands on belongs to the freeholder. You\'ll need to pay ground rent and service charges, and will need to comply with certain conditions in the lease agreement.'
  },
  {
    question: 'What are service charges and ground rent?',
    answer: 'Service charges are fees paid by leaseholders for maintaining shared areas and facilities of a building, such as hallways, elevators, gardens, and structural elements. Ground rent is a separate fee paid to the freeholder for the land the property sits on.'
  },
  {
    question: 'Can a lease term be extended?',
    answer: 'Yes, leaseholders can extend their lease term, but this process can be costly. The price varies depending on the remaining lease duration, property value, and ground rent amount. It\'s advisable to extend a lease before it falls below 80 years, as it becomes more expensive after this point.'
  },
  {
    question: 'How does a mortgage work?',
    answer: 'A mortgage is a loan taken from a bank or building society to buy a property. The property serves as security for the loan until it\'s fully repaid. You\'ll make monthly repayments over a term (typically 25-35 years), which includes both the capital amount borrowed and interest.'
  },
  {
    question: 'How are mortgage interest rates determined?',
    answer: 'Mortgage interest rates can be fixed or variable. A fixed rate remains the same for a set period (typically 2-5 years), providing payment certainty. Variable rates change based on the Bank of England base rate or the lender\'s standard variable rate, which can go up or down affecting your monthly payments.'
  },
  {
    question: 'What is an Agreement in Principle (AIP)?',
    answer: 'An Agreement in Principle (AIP), also known as a Mortgage in Principle, is a pre-approval from a mortgage provider indicating how much they might be willing to lend you. It\'s based on a soft credit check and your declared income. An AIP helps you understand your budget and shows sellers you\'re a serious buyer.'
  },
  {
    question: 'What does Exchange of Contracts mean?',
    answer: 'Exchange of Contracts is the point when signed contracts are exchanged between the buyer and seller, making the agreement legally binding. At this stage, the buyer typically pays a deposit (usually 5-10% of the purchase price). After exchange, neither party can back out without significant financial penalties.'
  },
  {
    question: 'When does Completion occur?',
    answer: 'Completion is the final stage of the property buying process when ownership legally transfers to the buyer. The buyer\'s solicitor transfers the remaining funds to the seller\'s solicitor, and the keys are handed over to the new owner. Completion often happens 1-4 weeks after exchange of contracts.'
  },
  {
    question: 'What documents are required for a mortgage application?',
    answer: 'Documents typically required include proof of identity (passport or driving license), proof of address (utility bills, bank statements), proof of income (payslips, tax returns for self-employed), bank statements (usually 3-6 months), details of existing debts, and information about the property you\'re buying.'
  },
  {
    question: 'What are the additional costs when buying a property?',
    answer: 'Additional costs include stamp duty (a government tax based on property price), solicitor/conveyancing fees, mortgage arrangement fees, property survey costs, Land Registry fees, removal costs, and potentially service charges or ground rent for leasehold properties.'
  },
  {
    question: 'How do Help to Buy schemes work?',
    answer: 'Help to Buy schemes are government initiatives designed to help first-time buyers and those looking to move up the property ladder. These include equity loans (where the government lends up to 20% of the property value, or 40% in London), shared ownership (buying a share of a property and paying rent on the rest), and other specialized programs.'
  },
  {
    question: 'How should I prepare for a property viewing?',
    answer: 'Before viewing a property, research the area, prepare a list of questions about the property, bring a measuring tape for room dimensions, take photos (with permission), and consider visiting at different times of day to assess natural light and noise levels. Arrive with a clear idea of your requirements to make the most of each viewing.'
  },
  {
    question: 'What should I look for during a property viewing?',
    answer: 'Focus on structural issues (cracks, damp patches, uneven floors), check all fixtures and fittings, test water pressure and heating, look at the condition of windows and doors, assess storage space, and check mobile reception. Outside, examine the roof, gutters, garden boundaries, and parking arrangements. Always consider the property\'s orientation for natural light.'
  },
  {
    question: 'How many properties should I view before making a decision?',
    answer: 'There\'s no set number, as it depends on your familiarity with the area and clarity about your requirements. On average, serious buyers view 8-10 properties before making an offer. It\'s important to balance thorough research against the risk of losing properties in a fast-moving market.'
  },
  {
    question: 'What factors should I consider when deciding how much to offer?',
    answer: 'Consider recent sold prices for similar properties in the area, the property\'s condition and any work needed, how long it\'s been on the market, your financial position, current market conditions, and whether there are other interested buyers. A good estate agent can provide guidance on what constitutes a reasonable offer.'
  },
  {
    question: 'Can I make an offer below the asking price?',
    answer: 'Yes, it\'s common to negotiate on property prices. The success of a lower offer depends on factors like market conditions, the seller\'s motivation, how long the property has been listed, and whether there are competing offers. In a buyer\'s market or for properties needing work, there\'s often more room for negotiation.'
  },
  {
    question: 'What happens after my offer is accepted?',
    answer: 'After offer acceptance, you\'ll need to instruct a solicitor, apply for a mortgage (if required), arrange a property survey, and complete legal checks. The process typically takes 8-12 weeks to reach exchange of contracts and completion. Your offer remains "subject to contract" until contracts are exchanged, meaning either party can still legally withdraw.'
  },
  {
    question: 'What types of property surveys are available?',
    answer: 'There are three main types: Condition Reports (basic overview, best for new-build properties), HomeBuyer Reports (more detailed, suitable for conventional properties in reasonable condition), and Building/Structural Surveys (comprehensive assessment, recommended for older, unusual, or renovation properties). Each offers increasing levels of detail and cost.'
  },
  {
    question: 'Is a survey really necessary if the mortgage lender does a valuation?',
    answer: 'Yes. A mortgage valuation is primarily for the lender\'s benefit to confirm the property is adequate security for the loan. It\'s not designed to identify structural issues or defects. A proper survey protects your investment by identifying problems that could require expensive repairs or affect the property\'s value or safety.'
  },
  {
    question: 'What should I do if the survey finds problems?',
    answer: 'First, discuss the findings with your surveyor to understand their severity. For significant issues, you have several options: ask the seller to fix the problems before completion, renegotiate the price to reflect repair costs, request further specialist reports, or in serious cases, withdraw from the purchase. Many issues are negotiable rather than deal-breakers.'
  },
  {
    question: 'What additional considerations apply to international buyers?',
    answer: 'International buyers face additional considerations including higher stamp duty rates (additional 2% for non-UK residents), potential currency exchange risks, more complex mortgage options (though many UK banks offer international products), and different tax implications. You\'ll also need a UK bank account and should consider appointing a UK-based solicitor specializing in international transactions.'
  },
  {
    question: 'Can foreign nationals buy property in the UK?',
    answer: 'Yes, the UK property market is open to foreign buyers with no restrictions on property ownership. However, non-UK residents pay an additional 2% stamp duty surcharge. If you\'re not a UK resident, you\'ll need to complete identity verification procedures under Anti-Money Laundering regulations and may face different mortgage lending criteria.'
  },
  {
    question: 'What should I consider when buying a property as a rental investment?',
    answer: 'Focus on rental yield (typically 4-7% is considered good), capital growth potential, tenant demand in the area, property type suitability, maintenance requirements, and additional costs like landlord insurance and management fees. You\'ll also need to comply with legal obligations including safety certificates, deposit protection, and potentially landlord licensing depending on the location.'
  },
  {
    question: 'What are the tax implications of owning rental property?',
    answer: 'Rental income is subject to income tax, and you\'ll need to file a self-assessment tax return. You can deduct allowable expenses including mortgage interest (restricted to basic rate tax relief), maintenance costs, letting agent fees, insurance, and utility bills you pay directly. Capital Gains Tax applies when selling a rental property, although reliefs may be available. Consider consulting a tax specialist for personalized advice.'
  }
]

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState('contact')
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [showOptionalDetails, setShowOptionalDetails] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      
      // Reset after showing success message
      setTimeout(() => {
        setIsSubmitted(false)
        setFormState({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
      }, 3000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "50px", amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <span className="inline-flex items-center rounded-lg bg-[#D4AF37]/10 px-3 py-1 text-sm font-medium text-[#D4AF37] ring-1 ring-inset ring-[#D4AF37]/20">
              Get In Touch
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "50px", amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#1A2A44] to-[#1A2A44]/80 bg-clip-text text-transparent"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "50px", amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            We&apos;re here to help you with your property needs. Reach out to our team and we&apos;ll get back to you as soon as possible.
          </motion.p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'contact'
                  ? 'bg-white text-[#D4AF37] shadow-sm'
                  : 'text-gray-600 hover:text-[#D4AF37]'
              } transition-all duration-200`}
            >
              Contact Form
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'faq'
                  ? 'bg-white text-[#D4AF37] shadow-sm'
                  : 'text-gray-600 hover:text-[#D4AF37]'
              } transition-all duration-200`}
            >
              FAQs
            </button>
          </div>
        </div>

        {activeTab === 'contact' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Form */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm shadow-lg border border-[#D4AF37]/20">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#1A2A44]">
                    Have questions?
                  </h2>
                  <p className="text-gray-600">
                    Fill out the form below and we&apos;ll call as soon as possible.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="+44 1234 567890"
                        value={formState.phone}
                        onChange={handleChange}
                        required
                        className="border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setShowOptionalDetails(!showOptionalDetails)}
                      className="flex items-center gap-2 text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors duration-200"
                    >
                      <span className="text-sm font-medium">Optional Details</span>
                      <ArrowRight className={`h-4 w-4 transition-transform duration-200 ${showOptionalDetails ? '-rotate-90' : 'rotate-90'}`} />
                    </button>
                  </div>

                  <div className={`space-y-4 transition-all duration-300 ${showOptionalDetails ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formState.email}
                          onChange={handleChange}
                          className="border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="Property Inquiry"
                          value={formState.subject}
                          onChange={handleChange}
                          className="border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="How can we help you?"
                        rows={5}
                        value={formState.message}
                        onChange={handleChange}
                        className="border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div>
                    <Button
                      type="submit"
                      disabled={isSubmitting || isSubmitted}
                      className={`w-full bg-[#D4AF37] text-white transition-all duration-200 hover:bg-[#D4AF37]/90 ${
                        isSubmitted ? 'bg-green-600' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : isSubmitted ? (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Message Sent!
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm shadow-lg border border-[#D4AF37]/20 h-full">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#1A2A44]">
                    Contact Information
                  </h2>
                  <p className="text-gray-600">
                    Reach out directly or visit our office.
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <div key={info.title} className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${info.color} flex-shrink-0`}>
                        <info.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{info.title}</h3>
                        <div className="mt-1 space-y-1">
                          {info.details.map((detail, i) => (
                            <p key={i} className="text-gray-600 text-sm">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    {[
                      { Icon: Facebook, href: companyInfo.socialMedia.facebook },
                      { Icon: Twitter, href: companyInfo.socialMedia.twitter },
                      { Icon: Instagram, href: companyInfo.socialMedia.instagram },
                      { Icon: Linkedin, href: 'https://linkedin.com' }
                    ].map((item, i) => (
                      <a
                        key={i}
                        href={item.href}
                        className="p-2 rounded-full bg-gray-100 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-colors duration-200"
                      >
                        <item.Icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        ) : (
          /* FAQ Section */
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm shadow-lg border border-[#D4AF37]/20">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#1A2A44]">
                  Simplify Your Real Estate Processes with Frequently Asked Questions
                </h2>
                <p className="text-gray-600">
                  We answer the most common questions about property buying, selling, and mortgage processes. Here, you can find the basic information to assist you when buying or renting property.
                </p>
              </div>

              <div className="space-y-8">
                {/* Freehold Section */}
                <div>
                  <h3 className="text-xl font-semibold text-[#1A2A44] mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-[#D4AF37] rounded-full"></div>
                    Freehold
                  </h3>
              <div className="space-y-4">
                    {faqs.slice(0, 1).map((faq, index) => (
                  <div 
                    key={index}
                        className="border border-[#D4AF37]/20 rounded-lg overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-300"
                  >
                    <button
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                          className="flex justify-between items-center w-full p-4 text-left hover:bg-[#D4AF37]/5 transition-colors duration-200"
                    >
                          <span className="font-medium text-[#1A2A44]">{faq.question}</span>
                          <ArrowRight className={`h-5 w-5 text-[#D4AF37] transition-transform duration-200 ${
                        activeFaq === index ? 'rotate-90' : ''
                      }`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${
                      activeFaq === index ? 'max-h-40' : 'max-h-0'
                    }`}>
                          <div className="p-4 pt-0 bg-[#D4AF37]/5">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
                  </div>
                </div>

                {/* Leasehold Section */}
                <div>
                  <h3 className="text-xl font-semibold text-[#1A2A44] mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-[#D4AF37] rounded-full"></div>
                    Leasehold
                  </h3>
                  <div className="space-y-4">
                    {faqs.slice(1, 4).map((faq, index) => (
                      <div 
                        key={index + 1}
                        className="border border-[#D4AF37]/20 rounded-lg overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-300"
                      >
                        <button
                          onClick={() => setActiveFaq(activeFaq === index + 1 ? null : index + 1)}
                          className="flex justify-between items-center w-full p-4 text-left hover:bg-[#D4AF37]/5 transition-colors duration-200"
                        >
                          <span className="font-medium text-[#1A2A44]">{faq.question}</span>
                          <ArrowRight className={`h-5 w-5 text-[#D4AF37] transition-transform duration-200 ${
                            activeFaq === index + 1 ? 'rotate-90' : ''
                          }`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${
                          activeFaq === index + 1 ? 'max-h-40' : 'max-h-0'
                        }`}>
                          <div className="p-4 pt-0 bg-[#D4AF37]/5">
                            <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mortgage Section */}
                <div>
                  <h3 className="text-xl font-semibold text-[#1A2A44] mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-[#D4AF37] rounded-full"></div>
                    Mortgage
                  </h3>
                  <div className="space-y-4">
                    {faqs.slice(4, 6).map((faq, index) => (
                      <div 
                        key={index + 4}
                        className="border border-[#D4AF37]/20 rounded-lg overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-300"
                      >
                        <button
                          onClick={() => setActiveFaq(activeFaq === index + 4 ? null : index + 4)}
                          className="flex justify-between items-center w-full p-4 text-left hover:bg-[#D4AF37]/5 transition-colors duration-200"
                        >
                          <span className="font-medium text-[#1A2A44]">{faq.question}</span>
                          <ArrowRight className={`h-5 w-5 text-[#D4AF37] transition-transform duration-200 ${
                            activeFaq === index + 4 ? 'rotate-90' : ''
                          }`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${
                          activeFaq === index + 4 ? 'max-h-40' : 'max-h-0'
                        }`}>
                          <div className="p-4 pt-0 bg-[#D4AF37]/5">
                            <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Agreement in Principle Section */}
                <div>
                  <h3 className="text-xl font-semibold text-[#1A2A44] mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-[#D4AF37] rounded-full"></div>
                    Agreement in Principle (AIP)
                  </h3>
                  <div className="space-y-4">
                    {faqs.slice(6, 7).map((faq, index) => (
                      <div 
                        key={index + 6}
                        className="border border-[#D4AF37]/20 rounded-lg overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-300"
                      >
                        <button
                          onClick={() => setActiveFaq(activeFaq === index + 6 ? null : index + 6)}
                          className="flex justify-between items-center w-full p-4 text-left hover:bg-[#D4AF37]/5 transition-colors duration-200"
                        >
                          <span className="font-medium text-[#1A2A44]">{faq.question}</span>
                          <ArrowRight className={`h-5 w-5 text-[#D4AF37] transition-transform duration-200 ${
                            activeFaq === index + 6 ? 'rotate-90' : ''
                          }`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${
                          activeFaq === index + 6 ? 'max-h-40' : 'max-h-0'
                        }`}>
                          <div className="p-4 pt-0 bg-[#D4AF37]/5">
                            <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exchange of Contracts Section */}
                <div>
                  <h3 className="text-xl font-semibold text-[#1A2A44] mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-[#D4AF37] rounded-full"></div>
                    Exchange of Contracts
                  </h3>
                  <div className="space-y-4">
                    {faqs.slice(7, 8).map((faq, index) => (
                      <div 
                        key={index + 7}
                        className="border border-[#D4AF37]/20 rounded-lg overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-300"
                      >
                        <button
                          onClick={() => setActiveFaq(activeFaq === index + 7 ? null : index + 7)}
                          className="flex justify-between items-center w-full p-4 text-left hover:bg-[#D4AF37]/5 transition-colors duration-200"
                        >
                          <span className="font-medium text-[#1A2A44]">{faq.question}</span>
                          <ArrowRight className={`h-5 w-5 text-[#D4AF37] transition-transform duration-200 ${
                            activeFaq === index + 7 ? 'rotate-90' : ''
                          }`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${
                          activeFaq === index + 7 ? 'max-h-40' : 'max-h-0'
                        }`}>
                          <div className="p-4 pt-0 bg-[#D4AF37]/5">
                            <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Completion Section */}
                <div>
                  <h3 className="text-xl font-semibold text-[#1A2A44] mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-[#D4AF37] rounded-full"></div>
                    Completion
                  </h3>
                  <div className="space-y-4">
                    {faqs.slice(8, 9).map((faq, index) => (
                      <div 
                        key={index + 8}
                        className="border border-[#D4AF37]/20 rounded-lg overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-300"
                      >
                        <button
                          onClick={() => setActiveFaq(activeFaq === index + 8 ? null : index + 8)}
                          className="flex justify-between items-center w-full p-4 text-left hover:bg-[#D4AF37]/5 transition-colors duration-200"
                        >
                          <span className="font-medium text-[#1A2A44]">{faq.question}</span>
                          <ArrowRight className={`h-5 w-5 text-[#D4AF37] transition-transform duration-200 ${
                            activeFaq === index + 8 ? 'rotate-90' : ''
                          }`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${
                          activeFaq === index + 8 ? 'max-h-40' : 'max-h-0'
                        }`}>
                          <div className="p-4 pt-0 bg-[#D4AF37]/5">
                            <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Information Section */}
                <div>
                  <h3 className="text-xl font-semibold text-[#1A2A44] mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-[#D4AF37] rounded-full"></div>
                    Additional Information
                  </h3>
                  <div className="space-y-4">
                    {faqs.slice(9, 12).map((faq, index) => (
                      <div 
                        key={index + 9}
                        className="border border-[#D4AF37]/20 rounded-lg overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-300"
                      >
                        <button
                          onClick={() => setActiveFaq(activeFaq === index + 9 ? null : index + 9)}
                          className="flex justify-between items-center w-full p-4 text-left hover:bg-[#D4AF37]/5 transition-colors duration-200"
                        >
                          <span className="font-medium text-[#1A2A44]">{faq.question}</span>
                          <ArrowRight className={`h-5 w-5 text-[#D4AF37] transition-transform duration-200 ${
                            activeFaq === index + 9 ? 'rotate-90' : ''
                          }`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${
                          activeFaq === index + 9 ? 'max-h-80' : 'max-h-0'
                        }`}>
                          <div className="p-4 pt-0 bg-[#D4AF37]/5">
                            <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Property Viewing Section */}
                <div>
                  <h3 className="text-xl font-semibold text-[#1A2A44] mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-[#D4AF37] rounded-full"></div>
                    Property Viewing
                  </h3>
                  <div className="space-y-4">
                    {faqs.slice(12, 15).map((faq, index) => (
                      <div 
                        key={index + 12}
                        className="border border-[#D4AF37]/20 rounded-lg overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-300"
                      >
                        <button
                          onClick={() => setActiveFaq(activeFaq === index + 12 ? null : index + 12)}
                          className="flex justify-between items-center w-full p-4 text-left hover:bg-[#D4AF37]/5 transition-colors duration-200"
                        >
                          <span className="font-medium text-[#1A2A44]">{faq.question}</span>
                          <ArrowRight className={`h-5 w-5 text-[#D4AF37] transition-transform duration-200 ${
                            activeFaq === index + 12 ? 'rotate-90' : ''
                          }`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${
                          activeFaq === index + 12 ? 'max-h-60' : 'max-h-0'
                        }`}>
                          <div className="p-4 pt-0 bg-[#D4AF37]/5">
                            <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Making an Offer Section */}
                <div>
                  <h3 className="text-xl font-semibold text-[#1A2A44] mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-[#D4AF37] rounded-full"></div>
                    Making an Offer
                  </h3>
                  <div className="space-y-4">
                    {faqs.slice(15, 18).map((faq, index) => (
                      <div 
                        key={index + 15}
                        className="border border-[#D4AF37]/20 rounded-lg overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-300"
                      >
                        <button
                          onClick={() => setActiveFaq(activeFaq === index + 15 ? null : index + 15)}
                          className="flex justify-between items-center w-full p-4 text-left hover:bg-[#D4AF37]/5 transition-colors duration-200"
                        >
                          <span className="font-medium text-[#1A2A44]">{faq.question}</span>
                          <ArrowRight className={`h-5 w-5 text-[#D4AF37] transition-transform duration-200 ${
                            activeFaq === index + 15 ? 'rotate-90' : ''
                          }`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${
                          activeFaq === index + 15 ? 'max-h-60' : 'max-h-0'
                        }`}>
                          <div className="p-4 pt-0 bg-[#D4AF37]/5">
                            <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Property Surveys Section */}
                <div>
                  <h3 className="text-xl font-semibold text-[#1A2A44] mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-[#D4AF37] rounded-full"></div>
                    Property Surveys
                  </h3>
                  <div className="space-y-4">
                    {faqs.slice(18, 21).map((faq, index) => (
                      <div 
                        key={index + 18}
                        className="border border-[#D4AF37]/20 rounded-lg overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-300"
                      >
                        <button
                          onClick={() => setActiveFaq(activeFaq === index + 18 ? null : index + 18)}
                          className="flex justify-between items-center w-full p-4 text-left hover:bg-[#D4AF37]/5 transition-colors duration-200"
                        >
                          <span className="font-medium text-[#1A2A44]">{faq.question}</span>
                          <ArrowRight className={`h-5 w-5 text-[#D4AF37] transition-transform duration-200 ${
                            activeFaq === index + 18 ? 'rotate-90' : ''
                          }`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${
                          activeFaq === index + 18 ? 'max-h-60' : 'max-h-0'
                        }`}>
                          <div className="p-4 pt-0 bg-[#D4AF37]/5">
                            <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* International Buyers Section */}
                <div>
                  <h3 className="text-xl font-semibold text-[#1A2A44] mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-[#D4AF37] rounded-full"></div>
                    UK Market for International Buyers
                  </h3>
                  <div className="space-y-4">
                    {faqs.slice(21, 23).map((faq, index) => (
                      <div 
                        key={index + 21}
                        className="border border-[#D4AF37]/20 rounded-lg overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-300"
                      >
                        <button
                          onClick={() => setActiveFaq(activeFaq === index + 21 ? null : index + 21)}
                          className="flex justify-between items-center w-full p-4 text-left hover:bg-[#D4AF37]/5 transition-colors duration-200"
                        >
                          <span className="font-medium text-[#1A2A44]">{faq.question}</span>
                          <ArrowRight className={`h-5 w-5 text-[#D4AF37] transition-transform duration-200 ${
                            activeFaq === index + 21 ? 'rotate-90' : ''
                          }`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${
                          activeFaq === index + 21 ? 'max-h-60' : 'max-h-0'
                        }`}>
                          <div className="p-4 pt-0 bg-[#D4AF37]/5">
                            <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rental Investment Section */}
                <div>
                  <h3 className="text-xl font-semibold text-[#1A2A44] mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-[#D4AF37] rounded-full"></div>
                    Rental Investment
                  </h3>
                  <div className="space-y-4">
                    {faqs.slice(23, 25).map((faq, index) => (
                      <div 
                        key={index + 23}
                        className="border border-[#D4AF37]/20 rounded-lg overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-300"
                      >
                        <button
                          onClick={() => setActiveFaq(activeFaq === index + 23 ? null : index + 23)}
                          className="flex justify-between items-center w-full p-4 text-left hover:bg-[#D4AF37]/5 transition-colors duration-200"
                        >
                          <span className="font-medium text-[#1A2A44]">{faq.question}</span>
                          <ArrowRight className={`h-5 w-5 text-[#D4AF37] transition-transform duration-200 ${
                            activeFaq === index + 23 ? 'rotate-90' : ''
                          }`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${
                          activeFaq === index + 23 ? 'max-h-60' : 'max-h-0'
                        }`}>
                          <div className="p-4 pt-0 bg-[#D4AF37]/5">
                            <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
              </div>

                <div className="mt-8 pt-6 border-t border-[#D4AF37]/20 text-center">
                <p className="text-gray-600 mb-4">
                  Still have questions? Contact our support team directly.
                </p>
                <Button 
                  onClick={() => setActiveTab('contact')}
                    className="bg-[#D4AF37] text-white hover:bg-[#D4AF37]/90 transition-all duration-200"
                >
                  <MessageSquareText className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Map Section */}
        <div className="mb-16">
          <PropertyMap 
            area="Soho"
            city="London"
            address={companyInfo.address}
            title="Our Office Location"
          />
        </div>
      </div>
    </div>
  )
} 