import React from 'react';
import {
  Search,
  BookOpen,
  Code2,
  Terminal,
  Cpu,
  ShieldCheck,
  Globe,
  HelpCircle,
  ArrowRight,
  ExternalLink,
  PlayCircle,
  ArrowDown,
  ArrowDownCircle,
} from 'lucide-react';
import { isAuthenticated } from '../utils/auth';

const DocumentationView = () => {
  const APIs = [
    {
      method: 'GET',
      url: '/v1/agents/chat/?auto=true',
      name: 'Use Larc Router',
      description:
        'Use the /v1/agents/chat/ endpoint with auto set to true to leverage Larc Router. This allows the system to automatically determine the best agent and model to handle the request based on the prompt and context.',
      body: {
        prompt: 'Write a Python script to calculate the 100th Fibonacci number.',
      },
      response: {
        success: 'true or false',
        message: 'Response Message',
        results: {},
        code: 'Status Code',
      },
    },
    {
      method: 'GET',
      url: '/v1/agents/chat/?auto=false',
      name: 'Chat With Selected Model',
      description:
        'Chat with the selected model using the /v1/agents/chat/ endpoint. Set auto to false to disable automatic agent execution and receive the agent plan in the response.',
      body: {
        prompt: 'Write a Python script to calculate the 100th Fibonacci number.',
        model: 'o3-mini',
      },
      response: {
        success: 'true or false',
        message: 'Response Message',
        results: {},
        code: 'Status Code',
      },
    },
  ];

  const [expandedAPI, setExpandedAPI] = React.useState(null);

  return (
    <div className='min-h-screen  bg-[#0e0e0e] text-[#e3e3e3] font-sans selection:bg-[#8ab4f8]/30'>
      {/* Hero Section */}
      <div className='bg-[#1e1f20] border-b border-[#3c4043] py-16 px-8'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='text-4xl font-bold mb-6 tracking-tight'>Documentation</h1>
          <div className='relative group'>
            <Search
              className='absolute left-5 top-1/2 -translate-y-1/2 text-[#9aa0a6] group-focus-within:text-[#8ab4f8] transition-colors'
              size={22}
            />
            <input
              type='text'
              placeholder='Search API Endpoints and Guides'
              className='w-full bg-[#0e0e0e] border border-[#3c4043] rounded-2xl py-4 pl-14 pr-6 text-lg outline-none focus:border-[#8ab4f8] focus:ring-1 focus:ring-[#8ab4f8] transition-all placeholder:text-[#5f6368]'
            />
          </div>
          <div className='flex gap-3 mt-4 text-sm text-[#9aa0a6]'>
            <span>Popular:</span>
            {['Authentication', 'Using Larc Router', 'Selecting Model'].map((tag) => (
              <button key={tag} className='hover:text-[#8ab4f8] underline decoration-[#3c4043] underline-offset-4'>
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
     
      <div className='py-6 px-8'>
        <div className='max-w-4xl mx-auto '>
          <div className='flex items-center gap-2 mb-8'>
            <Code2 className='text-blue-400' size={28} />
            <h2 className='text-3xl font-bold'>Quick Start </h2>
          </div>

          <div className='space-y-8'>
          {!isAuthenticated() && (
              <div className='bg-[#1e1f20] border border-[#3c4043] rounded-lg p-8 text-center'>
                <ShieldCheck className='text-[#8ab4f8] mx-auto mb-4' size={40} />
                <h3 className='text-2xl font-semibold text-[#e3e3e3] mb-2'>Sign In to Get Started</h3>
                <p className='text-[#9aa0a6] mb-6'>
                  Create an account or sign in to access the full API documentation and start building with Larc.
                </p>
                <button
                  onClick={() => (window.location.href = '/signin')}
                  className='bg-[#8ab4f8] hover:bg-blue-400 text-[#0e0e0e] px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto'
                >
                  Sign In
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
            {APIs.map((a) => (
              <div key={a.url} className='bg-[#1e1f20] border border-[#3c4043] rounded-lg p-6'>
                <div className='flex items-start justify-between mb-4'>
                  <h3 className='text-xl font-semibold text-[#e3e3e3]'>{a.name}</h3>
                </div>
                <p className='text-[#9aa0a6] mb-4'>{a.description}</p>
                <div className='flex gap-2 mb-4'>
                  <span className='bg-blue-600/20 text-blue-400 px-3 py-1 rounded text-xs font-mono'>{a.method}</span>
                  <span className='bg-[#2d2e31] text-[#9aa0a6] px-3 py-1 rounded text-xs font-mono flex-1'>
                    https://3.110.170.44{a.url}
                  </span>
                </div>
                <button
                  onClick={() => setExpandedAPI(expandedAPI === a.url ? null : a.url)}
                  className='flex items-center gap-2 text-[#8ab4f8] hover:text-blue-300 transition-colors'
                >
                  <ArrowDownCircle
                    size={18}
                    className={`transition-transform duration-600 ${expandedAPI === a.url ? 'rotate-180' : ''}`}
                  />
                  {expandedAPI === a.url ? 'Show Less' : 'Know More'}
                </button>

                {expandedAPI === a.url && (
                  <div className='mt-4 space-y-4 border-t border-[#3c4043] pt-4 animate-in fade-in slide-in-from-top-2 duration-600'>
                    <div>
                      <h4 className='text-sm font-semibold text-[#e3e3e3] mb-2'>Request Body:</h4>
                      <pre className='bg-[#0e0e0e] p-3 rounded text-xs text-[#9aa0a6] overflow-auto'>
                        {JSON.stringify(a.body, null, 2)}
                      </pre>
                    </div>
                    <div>
                      <h4 className='text-sm font-semibold text-[#e3e3e3] mb-2'>Response:</h4>
                      <pre className='bg-[#0e0e0e] p-3 rounded text-xs text-[#9aa0a6] overflow-auto'>
                        {JSON.stringify(a.response, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ))}
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationView;
