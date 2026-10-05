'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const InstagramIcon = ({ size = 24, className = '' }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock submit
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', emailOrPhone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="pt-24 lg:pt-28 min-h-screen bg-brand-cream pb-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl text-brand-dark mb-4">Contact Us</h1>
          <p className="text-neutral-500 max-w-lg mx-auto">
            Need help choosing your piece? Have a question about your order? Talk to us 💌
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div>
            <h2 className="font-heading text-2xl mb-8 border-b border-neutral-200 pb-4">Get in Touch</h2>
            
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-white flex items-center justify-center border border-neutral-200 text-brand-gold flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-wider uppercase mb-1">WhatsApp / Call</h3>
                  <p className="text-neutral-600 mb-2">+254 705 937 030</p>
                  <a href="https://wa.me/254705937030" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-brand-gold hover:underline">
                    MESSAGE ON WHATSAPP
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-white flex items-center justify-center border border-neutral-200 text-brand-gold flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-wider uppercase mb-1">Email</h3>
                  <p className="text-neutral-600 mb-2">hello@illharlee.co.ke</p>
                  <a href="mailto:hello@illharlee.co.ke" className="text-xs font-semibold text-brand-gold hover:underline">
                    SEND AN EMAIL
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-white flex items-center justify-center border border-neutral-200 text-brand-gold flex-shrink-0">
                  <InstagramIcon size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-wider uppercase mb-1">Social Media</h3>
                  <p className="text-neutral-600 mb-2">@ill.harlee_jewellery on IG and @ill.harlee_jewelery on TikTok</p>
                  <a href="https://www.instagram.com/ill.harlee_jewellery" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-brand-gold hover:underline">
                    DM ON INSTAGRAM
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-white flex items-center justify-center border border-neutral-200 text-brand-gold flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-wider uppercase mb-1">Location & Hours</h3>
                  <p className="text-neutral-600">Nairobi, Kenya</p>
                  <p className="text-neutral-600 text-sm mt-1">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                  <p className="text-neutral-600 text-sm">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border border-neutral-200 p-8 shadow-sm">
            <h2 className="font-heading text-2xl mb-6">Send a Message</h2>
            
            {submitted ? (
              <div className="bg-green-50 border border-green-200 p-6 text-center text-green-800">
                <p className="font-semibold mb-2">Message Sent!</p>
                <p className="text-sm">Thank you for reaching out. We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm text-neutral-600 mb-1">Name</label>
                  <input required type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-brand-gold focus:bg-white transition-colors text-sm" />
                </div>
                
                <div>
                  <label htmlFor="emailOrPhone" className="block text-sm text-neutral-600 mb-1">Email or Phone Number</label>
                  <input required type="text" id="emailOrPhone" name="emailOrPhone" value={formData.emailOrPhone} onChange={handleChange} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-brand-gold focus:bg-white transition-colors text-sm" />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm text-neutral-600 mb-1">Subject</label>
                  <input required type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-brand-gold focus:bg-white transition-colors text-sm" />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm text-neutral-600 mb-1">Message</label>
                  <textarea required id="message" name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-brand-gold focus:bg-white transition-colors text-sm resize-none" />
                </div>
                
                <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center">
                  {isSubmitting ? 'Sending...' : <><Send size={16} /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
