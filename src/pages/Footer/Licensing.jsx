import React from 'react';

const LicensingPage = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Software Licensing</h1>
          <p className="text-gray-600">Effective Date: [Insert Date]</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-12">
          {/* License Types */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 border-b-2 border-blue-600 pb-2">
              License Types
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Personal Use</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Single user installation
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Non-commercial projects
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Lifetime updates
                  </li>
                </ul>
                <p className="mt-4 font-medium text-blue-800">Free for personal use</p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-purple-800 mb-4">Commercial License</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Multiple users/organizations
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Redistribution rights
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Priority support
                  </li>
                </ul>
                <p className="mt-4 font-medium text-purple-800">Starting at $99/year</p>
              </div>
            </div>
          </section>

          {/* Copyright Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
              Copyright Notice
            </h2>
            <div className="bg-gray-100 p-6 rounded-lg">
              <p className="text-gray-700">
                © {currentYear} [Your Company Name]. All rights reserved.<br />
                The software and documentation are protected by copyright laws and international treaties.
              </p>
            </div>
          </section>

          {/* Permissions & Restrictions */}
          <div className="grid md:grid-cols-2 gap-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b-2 border-green-600 pb-2">
                Permissions
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full mr-3">✓</span>
                  Modify source code for personal use
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full mr-3">✓</span>
                  Use in personal/non-commercial projects
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full mr-3">✓</span>
                  Create derivative works for internal use
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b-2 border-red-600 pb-2">
                Restrictions
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full mr-3">✗</span>
                  Resell or redistribute original software
                </li>
                <li className="flex items-start">
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full mr-3">✗</span>
                  Remove copyright notices
                </li>
                <li className="flex items-start">
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full mr-3">✗</span>
                  Use trademarks without permission
                </li>
              </ul>
            </section>
          </div>

          {/* Contact Section */}
          <section className="bg-blue-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">License Inquiries</h2>
            <p className="text-gray-700 mb-6">
              Contact us for custom licensing options or volume discounts
            </p>
            <a 
              href="mailto:licensing@example.com"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Licensing Team
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LicensingPage;