import React from 'react';

const SupportPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Support Center</h1>
      
      <div className="space-y-8">
        {/* Contact Card */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              Email: <a href="mailto:support@example.com" className="text-blue-600 hover:underline">support@example.com</a>
            </p>
            <p className="text-gray-600">Phone: +1 (555) 123-4567</p>
            
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
          
          {/* FAQ Items */}
          <div className="space-y-4">
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">How do I reset my password?</h3>
              <p className="text-gray-600">
                1. Go to the login page and click "Forgot Password"<br />
                2. Enter your registered email address<br />
                3. Check your email for a password reset link<br />
                4. Follow the instructions to set a new password
              </p>
            </div>

            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards (Visa, Mastercard, American Express), PayPal, 
                and bank transfers. All transactions are securely processed through our payment gateway.
              </p>
            </div>

            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">How can I track my order?</h3>
              <p className="text-gray-600">
                1. Log in to your account<br />
                2. Go to "Order History"<br />
                3. Click on the order you want to track<br />
                4. You'll find tracking information and carrier details
              </p>
            </div>

            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">What is your refund policy?</h3>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee for most products. Digital products may have 
                different refund conditions. Please contact our support team for specific cases.
              </p>
            </div>

            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">How do I update my account information?</h3>
              <p className="text-gray-600">
                1. Log in to your account<br />
                2. Navigate to "Account Settings"<br />
                3. Make your changes<br />
                4. Click "Save Changes" to update your information
              </p>
            </div>
          </div>
        </div>

        {/* Additional Help Section */}
        <div className="mt-12 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Still Need Help?</h2>
          <p className="text-gray-600 mb-4">
            Visit our <a href="/knowledge-base" className="text-blue-600 hover:underline">Knowledge Base</a> 
            or submit a support ticket:
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Submit Support Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;