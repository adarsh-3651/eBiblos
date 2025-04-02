import React, { useState } from 'react';
import { 
  LifebuoyIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  ChatBubbleBottomCenterTextIcon 
} from '@heroicons/react/24/outline';

const Help = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Go to the Account Settings page and click 'Forgot Password'. You'll receive a reset link via email."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept Visa, Mastercard, PayPal, and Apple Pay. Cryptocurrencies coming soon!"
    },
    {
      question: "How can I track my order?",
      answer: "Check your Order History for tracking details. You'll also receive email updates."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes! We offer 30-day refunds for digital purchases. Physical books must be returned unopened."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-100 mb-6">
          <LifebuoyIcon className="h-10 w-10 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
          How can we help you?
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Quick answers, helpful guides, or direct support—we're here 24/7.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('faq')}
            className={`py-4 px-6 font-medium text-sm flex items-center gap-2 ${activeTab === 'faq' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
            FAQ
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`py-4 px-6 font-medium text-sm flex items-center gap-2 ${activeTab === 'contact' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <EnvelopeIcon className="h-5 w-5" />
            Contact Us
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      {activeTab === 'faq' && (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-lg transition-all duration-200 hover:shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center p-5 text-left"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <svg
                      className={`h-5 w-5 text-gray-500 transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedFaq === index && (
                    <div className="px-5 pb-5 text-gray-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      {activeTab === 'contact' && (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Methods */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Support Options</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                      <EnvelopeIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Email Us</h4>
                      <p className="text-gray-600">support@ebookstore.com</p>
                      <p className="text-sm text-gray-500 mt-1">Typically replies within 2 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                      <PhoneIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Call Us</h4>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9am-5pm EST</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      How can we help?
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Describe your issue..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Additional Resources */}
      <div className="max-w-7xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">More Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "User Guides",
              description: "Step-by-step tutorials for all features",
              icon: "📚"
            },
            {
              title: "Community Forum",
              description: "Get help from other users",
              icon: "💬"
            },
            {
              title: "Video Tutorials",
              description: "Watch our how-to videos",
              icon: "🎥"
            }
          ].map((resource, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">{resource.icon}</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{resource.title}</h3>
              <p className="text-gray-600">{resource.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;