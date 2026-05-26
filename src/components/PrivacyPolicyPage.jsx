import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className='min-h-screen bg-[#0e0e0e] py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto bg-black rounded-lg shadow-md p-8'>
        <h1 className='text-4xl font-bold text-white mb-8'>Privacy Policy</h1>

        <div className='space-y-8 text-gray-300'>
          <section>
            <h2 className='text-2xl font-semibold text-white mb-3'>1. Introduction</h2>
            <p>
              We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-white mb-3'>2. Information We Collect</h2>
            <p className='mb-2'>We may collect information about you in a variety of ways, including:</p>
            <ul className='list-disc list-inside space-y-1 ml-2'>
              <li>Personal identification information (name, email, etc.)</li>
              <li>Device information and usage data</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-white mb-3'>3. Use of Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className='list-disc list-inside space-y-1 ml-2'>
              <li>Provide, operate, and maintain our services</li>
              <li>Improve and personalize your experience</li>
              <li>Send administrative information and updates</li>
              <li>Respond to your inquiries and support requests</li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-white mb-3'>4. Disclosure of Your Information</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may disclose information
              when required by law or to protect our rights.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-white mb-3'>5. Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-white mb-3'>6. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at support@larcai.com</p>
          </section>

          <p className='text-sm text-gray-300 mt-12'>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
