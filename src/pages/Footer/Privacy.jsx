import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
      
      <div className="space-y-6 text-gray-600">
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Introduction</h2>
          <p>
            Welcome to [EBIBLOS] WE. We are committed to protecting your personal 
            information and your right to privacy. This Privacy Policy explains how we collect, use, and 
            disclose your personal information.
          </p>
        </section>

        <hr className="my-6 border-t border-gray-200" />

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Information We Collect</h2>
          <p className="mb-2">We collect personal information that you voluntarily provide to us, including:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Name and contact information (email, phone number, etc.)</li>
            <li>Account credentials</li>
            <li>Payment information</li>
            <li>Usage data and website analytics</li>
          </ul>
        </section>

        <hr className="my-6 border-t border-gray-200" />

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">How We Use Your Information</h2>
          <p>We use the information we collect for various purposes, including:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Providing and maintaining our services</li>
            <li>Processing transactions</li>
            <li>Communicating with you</li>
            <li>Improving our website and services</li>
            <li>Security and fraud prevention</li>
          </ul>
        </section>

        <hr className="my-6 border-t border-gray-200" />

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Data Sharing</h2>
          <p>
            We do not share your personal information with third parties except:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>With your consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect and defend our rights</li>
            <li>With service providers under confidentiality agreements</li>
          </ul>
        </section>

        <hr className="my-6 border-t border-gray-200" />

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information. 
            However, no method of transmission over the Internet is 100% secure.
          </p>
        </section>

        <hr className="my-6 border-t border-gray-200" />

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Access and request copies of your data</li>
            <li>Request correction or deletion</li>
            <li>Object to processing</li>
            <li>Request data portability</li>
          </ul>
        </section>

        <hr className="my-6 border-t border-gray-200" />

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Cookies</h2>
          <p>
            We use cookies and similar technologies to track activity on our website. You can instruct your 
            browser to refuse all cookies or indicate when a cookie is being sent.
          </p>
        </section>

        <hr className="my-6 border-t border-gray-200" />

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. We will notify you of any changes by posting 
            the new policy on this page.
          </p>
        </section>

        <hr className="my-6 border-t border-gray-200" />

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Contact Us</h2>
          <p>
            For questions about this Privacy Policy, contact us at:<br />
            <a href="mailto:privacy@example.com" className="text-blue-600 hover:underline">
              privacy@example.com
            </a>
          </p>
        </section>

        <p className="mt-8 text-gray-500 text-sm">
          Effective Date: [Insert Effective Date]
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;