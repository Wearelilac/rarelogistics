'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { ChevronDown, MessageCircle, Phone } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: Record<string, FAQItem[]> = {
  'Parcel Collections': [
    {
      question: 'How do I ship my Takealot/Shein order to Lesotho?',
      answer: 'Simply provide your Takealot or Shein order details during booking. We collect from Bloemfontein or Ladybrand pickup points on our scheduled Tuesday and Friday runs. Enter the merchant\'s pickup address and your Lesotho delivery address in the checkout form.',
    },
    {
      question: 'Where is the Maseru collection hub located?',
      answer: 'Our main Maseru hub is located in the city center. Specific address details will be provided in your confirmation email and SMS. Collection hours are 8:00 AM to 5:00 PM, Monday to Saturday.',
    },
    {
      question: 'What items can I ship through Rare Logistics?',
      answer: 'We ship most legal items including clothing, electronics, documents, and household goods. We prohibit illegal items, hazardous materials, perishables, and unregistered commercial goods. Please declare contents accurately.',
    },
    {
      question: 'How long does delivery take?',
      answer: 'Standard delivery from Bloemfontein/Ladybrand to Maseru takes 1-2 days depending on the scheduled run. Local Maseru deliveries are typically same-day for orders placed before 12:00 PM.',
    },
  ],
  'Vehicle & Truck Rentals': [
    {
      question: 'What happens if a vehicle breaks down near AfriSki?',
      answer: 'All our rentals include roadside assistance. If you experience a breakdown, call our 24/7 support line at +266 6210 0202. We will dispatch assistance or arrange a replacement vehicle as quickly as possible.',
    },
    {
      question: 'Do rental rates include fuel?',
      answer: 'No, vehicles are provided with a full tank and must be returned with the same fuel level. If returned with less fuel, refueling charges will apply at current market rates plus a service fee.',
    },
    {
      question: 'What are the requirements for renting a vehicle?',
      answer: 'You must be at least 21 years old and have held a valid driver\'s license for a minimum of 2 years. A security deposit is required: M 2,000 for 7-seaters and M 3,500 for trucks.',
    },
    {
      question: 'Can I extend my rental period?',
      answer: 'Yes, you can extend your rental subject to availability. Contact us at least 24 hours before your return date to arrange an extension. Additional daily rates will apply.',
    },
  ],
  'Payments & Tracking': [
    {
      question: 'How do I track using my phone number?',
      answer: 'Currently, tracking is done using your unique tracking code (RL-PRC-XXXXX for parcels or RL-RNT-XXXXX for rentals). You can find this code in your confirmation SMS and email. Enter it in the tracking portal on our website.',
    },
    {
      question: 'What if my M-Pesa STK push fails?',
      answer: 'If the STK push times out or fails, please retry the payment. If issues persist, contact our support team at +266 6210 0202. You can also switch to alternative payment methods like EcoCash, card, or EFT.',
    },
    {
      question: 'Are there additional fees for using M-Pesa or EcoCash?',
      answer: 'No, we do not charge additional fees for M-Pesa or EcoCash payments. However, your mobile network provider may apply standard transaction fees according to their rates.',
    },
    {
      question: 'How do I get a refund if I cancel my booking?',
      answer: 'Full refunds are available for cancellations made 24 hours before dispatch or rental start. 50% refund for cancellations less than 24 hours before. Contact our support team to process refund requests.',
    },
  ],
};

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
    setOpenQuestion(null);
  };

  const toggleQuestion = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-primary mb-4">
              FAQ & Support
            </h1>
            <p className="text-lg text-brand-secondary">
              Find answers to common questions about our services
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/80 shadow-glass-md rounded-3xl p-8 mb-8">
            {Object.entries(faqData).map(([category, items]) => (
              <div key={category} className="mb-4 last:mb-0">
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <h3 className="font-semibold text-brand-primary">{category}</h3>
                  <motion.div
                    animate={{ rotate: openCategory === category ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="text-brand-secondary" size={20} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openCategory === category && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 space-y-3">
                        {items.map((item, index) => (
                          <div key={index} className="border-l-2 border-slate-200 pl-4">
                            <button
                              onClick={() => toggleQuestion(item.question)}
                              className="w-full text-left py-2"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-brand-primary text-sm">{item.question}</span>
                                <motion.div
                                  animate={{ rotate: openQuestion === item.question ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <ChevronDown className="text-brand-secondary" size={16} />
                                </motion.div>
                              </div>
                            </button>
                            <AnimatePresence>
                              {openQuestion === item.question && (
                                <motion.p
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="text-sm text-brand-secondary leading-relaxed overflow-hidden"
                                >
                                  {item.answer}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Contact Support Box */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-8 border border-purple-200">
            <h2 className="text-2xl font-bold text-brand-primary mb-4">Still Need Help?</h2>
            <p className="text-brand-secondary mb-6">
              Our support team is available to assist you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/26662100202"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-sm flex items-center justify-center space-x-2 shadow-glow-emerald hover:from-emerald-700 hover:to-teal-700 transition-all"
              >
                <MessageCircle size={20} />
                <span>WhatsApp Us</span>
              </a>
              <a
                href="tel:+26662100202"
                className="flex-1 px-6 py-4 rounded-2xl bg-white border border-slate-300 text-brand-primary font-semibold text-sm flex items-center justify-center space-x-2 hover:bg-slate-50 transition-colors"
              >
                <Phone size={20} />
                <span>Call +266 6210 0202</span>
              </a>
            </div>
            <div className="mt-6 text-sm text-brand-secondary">
              <p><strong>Support Hours:</strong> Monday - Saturday, 8:00 AM - 6:00 PM</p>
              <p><strong>Email:</strong> support@rarelogistics.co.ls</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
