import { useState } from 'react';
import { Mail, Phone, User, MessageSquare } from 'lucide-react';

export default function BillingSupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    issue: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, issue } = formData;
    const subject = 'Support Request from Billing';
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nIssue:\n${issue}`;

    window.location.href = `mailto:itsnihal.sharma@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setFormData({ name: '', email: '', phone: '', issue: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className='min-h-screen py-12 px-4' style={{ backgroundColor: '#0e0e0e' }}>
      <div className='max-w-md mx-auto bg-[#1e1f20] rounded-lg shadow-lg p-8 border border-gray-800'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-white mb-2'>Billing Support</h1>
          <p className='text-gray-400'>We're here to help with any billing questions</p>
        </div>

        {submitted && (
          <div className='mb-6 p-4 bg-green-950 border border-green-800 rounded-lg text-green-400 text-sm'>
            ✓ Request submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-5'>
          <div className='relative'>
            <User className='absolute left-3 top-3.5 w-5 h-5 text-gray-500' />
            <input
              type='text'
              name='name'
              placeholder='Your Name'
              value={formData.name}
              onChange={handleChange}
              required
              className='w-full pl-10 pr-4 py-2.5 bg-black border border-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>

          <div className='relative'>
            <Mail className='absolute left-3 top-3.5 w-5 h-5 text-gray-500' />
            <input
              type='email'
              name='email'
              placeholder='Your Email'
              value={formData.email}
              onChange={handleChange}
              required
              className='w-full pl-10 pr-4 py-2.5 bg-black border border-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>

          <div className='relative'>
            <Phone className='absolute left-3 top-3.5 w-5 h-5 text-gray-500' />
            <input
              type='tel'
              name='phone'
              placeholder='Your Phone'
              value={formData.phone}
              onChange={handleChange}
              required
              className='w-full pl-10 pr-4 py-2.5 bg-black border border-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>

          <div className='relative'>
            <MessageSquare className='absolute left-3 top-3.5 w-5 h-5 text-gray-500' />
            <textarea
              name='issue'
              placeholder='Describe your issue'
              value={formData.issue}
              onChange={handleChange}
              required
              className='w-full pl-10 pr-4 py-2.5 bg-black border border-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg'
          >
            Send Support Request
          </button>
        </form>

        <p className='text-center text-gray-500 text-xs mt-6'>Expected response within 24 hours</p>
      </div>
    </div>
  );
}
