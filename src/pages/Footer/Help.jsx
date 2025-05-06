import React from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-gray-500">Last Updated: [Insert Date]</p>
          </div>

          {/* Content */}
          <div className="space-y-12 text-gray-600">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-l-4 border-blue-600 pl-4">
                Introduction
              </h2>
              <p className="leading-relaxed">
                Welcome to [Your Company Name] ("we," "our," or "us"). These Terms of Service govern 
                your use of our website and services. By accessing or using our platform, you agree 
                to comply with these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-l-4 border-blue-600 pl-4">
                User Responsibilities
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-medium text-gray-900 mb-4">You agree not to:</h3>
                <ul className="space-y-3">
                  {[
                    'Violate any laws or regulations',
                    'Infringe intellectual property rights',
                    'Upload harmful or malicious content',
                    'Disrupt service functionality',
                    'Share unauthorized access credentials'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <FaRegCheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-l-4 border-blue-600 pl-4">
                Intellectual Property
              </h2>
              <p className="leading-relaxed">
                All content on this platform, including text, graphics, logos, and software, is 
                our property or licensed to us. You may not reproduce, distribute, or create 
                derivative works without explicit permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-l-4 border-blue-600 pl-4">
                Termination
              </h2>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="leading-relaxed">
                  We reserve the right to suspend or terminate your account:
                </p>
                <ul className="list-disc list-inside mt-3 space-y-2">
                  <li>For violation of these terms</li>
                  <li>Upon request by legal authorities</li>
                  <li>For prolonged account inactivity</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-l-4 border-blue-600 pl-4">
                Governing Law
              </h2>
              <div className="flex items-center bg-gray-100 rounded-lg p-6">
                <span className="text-blue-600 mr-3">📍</span>
                <p>
                  These terms are governed by the laws of [Your Country/State]. Any disputes will 
                  be resolved in the courts of [Jurisdiction].
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-l-4 border-blue-600 pl-4">
                Changes to Terms
              </h2>
              <p className="leading-relaxed">
                We may update these terms periodically. Continued use after changes constitutes 
                acceptance. We'll notify users of significant changes through email or platform 
                notifications.
              </p>
            </section>

            <div className="mt-16 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
              <p className="text-gray-600">
                Questions about these terms? Reach us at:
                <a href="mailto:legal@example.com" className="ml-2 text-blue-600 hover:underline">
                  legal@example.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
{/* npm install react-icons
# or
yarn add react-icons */}