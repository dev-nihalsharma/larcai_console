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
  ChevronDown,
  Copy,
  Check,
} from 'lucide-react';
import { isAuthenticated } from '../utils/auth';

const AVAILABLE_MODELS = [
  {
    id: 'o3-mini',
    name: 'ChatGPT-o3 mini',
    provider: 'OpenAI',
    tier: 'reasoning',
    cost: 4.0,
    strengths: 'Multi-step math, coding, logic',
  },
  {
    id: 'gpt-4.1',
    name: 'ChatGPT 4.1',
    provider: 'OpenAI',
    tier: 'powerful',
    cost: 10.0,
    strengths: 'Top accuracy, complex tasks',
  },
  {
    id: 'gpt-4.1-mini',
    name: 'ChatGPT 4.1 mini',
    provider: 'OpenAI',
    tier: 'fast',
    cost: 0.5,
    strengths: 'Fast simple Q&A, drafts',
  },
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    provider: 'Google AI',
    tier: 'powerful',
    cost: 5.0,
    strengths: 'Broad knowledge, long context',
  },
  
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'Google AI',
    tier: 'fast',
    cost: 0.1,
    strengths: 'Cheapest, high-volume requests',
  },
  {
    id: 'us.anthropic.claude-sonnet-4-20250514-v1:0',
    name: 'Claude 4 Sonnet',
    provider: 'Anthropic',
    tier: 'powerful',
    cost: 6.0,
    strengths: 'Careful writing, code review',
  },
  {
    id: 'anthropic.claude-sonnet-4-6',
    name: 'Claude 4.6 Sonnet',
    provider: 'Anthropic',
    tier: 'powerful',
    cost: 6.0,
    strengths: 'Better reasoning, natural dialogue',
  },
  {
    id: 'DeepSeek-V3-0324',
    name: 'DeepSeek V3',
    provider: 'DeepSeek',
    tier: 'powerful',
    cost: 1.5,
    strengths: 'Strong quality, low cost',
  },
  {
    id: 'us.meta.llama4-scout-17b-instruct-v1:0',
    name: 'Llama 4 Scout',
    provider: 'Meta',
    tier: 'fast',
    cost: 0.15,
    strengths: 'Quick efficient general chat',
  },
];

const APIs = [
  {
    method: 'GET',
    url: '/v1/agents/chat/?auto=true',
    name: 'Use Larc Router',
    description:
      'Use the /v1/agents/chat/ endpoint with auto set to true to leverage Larc Router. This allows the system to automatically determine the best agent and model to handle the request based on the prompt and context.',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': 'Your API Key',
    },
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
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': 'Your API Key',
    },
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

const POPULAR_TAGS = [
  { label: 'Using Larc Router', query: 'larc router' },
  { label: 'Selecting Model', query: 'model' },
  { label: 'All Models', query: '', scrollTo: 'available-models' },
];

const API_BASE_URL = 'http://3.110.170.44';

const METHOD_STYLES = {
  GET: 'bg-emerald-500/15 text-emerald-400 ring-emerald-500/25',
  POST: 'bg-blue-500/15 text-blue-400 ring-blue-500/25',
  PUT: 'bg-amber-500/15 text-amber-400 ring-amber-500/25',
  DELETE: 'bg-red-500/15 text-red-400 ring-red-500/25',
};

const ApiEndpointCard = ({ api, isExpanded, onToggle }) => {
  const methodStyle = METHOD_STYLES[api.method] ?? METHOD_STYLES.GET;
  const [copied, setCopied] = React.useState(false);
  const fullUrl = `${API_BASE_URL}${api.url}`;

  const copyEndpoint = () => {
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <article className='rounded-2xl border border-[#3c4043] bg-[#1e1f20] overflow-hidden transition-shadow duration-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)]'>
      <div className='p-6 sm:p-7'>
        <div className='grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 items-center'>
          <span
            className={`row-start-1 col-start-1 self-center inline-flex items-center justify-center h-7 min-w-[3.25rem] px-2.5 rounded-md text-xs font-bold font-mono tracking-wide ring-1 ring-inset ${methodStyle}`}
          >
            {api.method}
          </span>
          <h3 className='row-start-1 col-start-2 min-w-0 text-lg sm:text-xl font-semibold text-[#e3e3e3] leading-snug tracking-tight'>
            {api.name}
          </h3>
          <p className='row-start-2 col-span-2 text-sm text-[#9aa0a6] leading-relaxed'>
            {api.description}
          </p>
        </div>

        <div className='mt-5 rounded-xl bg-[#0e0e0e] border border-[#3c4043] px-4 py-3 font-mono text-xs sm:text-sm'>
          <div className='flex items-center justify-between gap-3 mb-1.5'>
            <div className='flex items-center gap-2 text-[#5f6368]'>
              <Terminal size={14} className='shrink-0' />
              <span className='uppercase tracking-wider text-[10px] font-sans font-medium'>Endpoint</span>
            </div>
            <button
              type='button'
              onClick={copyEndpoint}
              className='shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-sans font-medium text-[#9aa0a6] border border-[#3c4043] bg-[#1e1f20] hover:bg-[#2d2e31] hover:text-[#e3e3e3] transition-colors'
              aria-label={copied ? 'URL copied' : 'Copy endpoint URL'}
            >
              {copied ? (
                <>
                  <Check size={14} className='text-emerald-400' />
                  <span className='text-emerald-400'>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <p className='overflow-x-auto whitespace-nowrap'>
            <span className='text-[#9aa0a6]'>{API_BASE_URL}</span>
            <span className='text-[#8ab4f8]'>{api.url}</span>
          </p>
        </div>

        <button
          type='button'
          onClick={onToggle}
          aria-expanded={isExpanded}
          className='mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#8ab4f8] hover:text-blue-300 transition-colors'
        >
          <span
            className={`flex items-center justify-center w-7 h-7 rounded-full bg-[#2d2e31] border border-[#3c4043] transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          >
            <ChevronDown size={16} />
          </span>
          {isExpanded ? 'Hide request details' : 'View request details'}
        </button>

        {isExpanded && (
          <div className='mt-6 pt-6 border-t border-[#3c4043] space-y-4'>
            {[
              { label: 'Headers', data: api.headers },
              { label: 'Request body', data: api.body },
              { label: 'Response', data: api.response },
            ].map((section) => (
              <div
                key={section.label}
                className='rounded-xl border border-[#3c4043] bg-[#0e0e0e] overflow-hidden'
              >
                <div className='px-4 py-2.5 border-b border-[#3c4043] bg-[#141414]'>
                  <span className='text-xs font-semibold uppercase tracking-wider text-[#9aa0a6]'>
                    {section.label}
                  </span>
                </div>
                <pre className='p-4 text-xs sm:text-sm text-[#c4c7c5] overflow-x-auto leading-relaxed'>
                  {JSON.stringify(section.data, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

const matchesQuery = (query, ...fields) => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = fields
    .flat()
    .map((f) => String(f ?? '').toLowerCase())
    .join(' ');
  return haystack.includes(q);
};

const DocumentationView = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [expandedAPI, setExpandedAPI] = React.useState(null);

  const filteredApis = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return APIs;
    return APIs.filter((api) =>
      matchesQuery(
        q,
        api.name,
        api.description,
        api.url,
        api.method,
        JSON.stringify(api.headers),
        JSON.stringify(api.body),
        JSON.stringify(api.response),
      ),
    );
  }, [searchQuery]);

  const filteredModels = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return AVAILABLE_MODELS;
    return AVAILABLE_MODELS.filter((model) =>
      matchesQuery(
        q,
        model.name,
        model.id,
        model.provider,
        model.tier,
        model.strengths,
        String(model.cost),
      ),
    );
  }, [searchQuery]);

  const hasActiveSearch = searchQuery.trim().length > 0;
  const noResults = hasActiveSearch && filteredApis.length === 0 && filteredModels.length === 0;

  const handlePopularTag = (tag) => {
    setSearchQuery(tag.query);
    if (tag.scrollTo) {
      requestAnimationFrame(() => {
        document.getElementById(tag.scrollTo)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  };

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search API endpoints and models'
              className='w-full bg-[#0e0e0e] border border-[#3c4043] rounded-2xl py-4 pl-14 pr-6 text-lg outline-none focus:border-[#8ab4f8] focus:ring-1 focus:ring-[#8ab4f8] transition-all placeholder:text-[#5f6368]'
            />
          </div>
          {noResults && (
            <p className='mt-4 text-sm text-[#9aa0a6]'>
              No results for &ldquo;<span className='text-[#e3e3e3]'>{searchQuery.trim()}</span>&rdquo;. Try
              another keyword or clear the search.
            </p>
          )}
          <div className='flex flex-wrap gap-3 mt-4 text-sm text-[#9aa0a6]'>
            <span>Popular:</span>
            {POPULAR_TAGS.map((tag) => (
              <button
                key={tag.label}
                type='button'
                onClick={() => handlePopularTag(tag)}
                className='hover:text-[#8ab4f8] underline decoration-[#3c4043] underline-offset-4'
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      

      <div id='api-endpoints' className='px-8 mt-10'>
        <div className='max-w-4xl mx-auto '>
          <div className='flex items-center gap-2 mb-8'>
            <Code2 className='text-blue-400' size={28} />
            <h2 className='text-3xl font-bold'>Quick Start </h2>
          </div>

          <div className='space-y-5'>
          {!isAuthenticated() && !hasActiveSearch && (
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
            {hasActiveSearch && filteredApis.length === 0 && (
              <p className='text-[#9aa0a6] text-sm'>No matching API endpoints.</p>
            )}
            {filteredApis.map((a) => (
              <ApiEndpointCard
                key={a.url}
                api={a}
                isExpanded={expandedAPI === a.url}
                onToggle={() => setExpandedAPI(expandedAPI === a.url ? null : a.url)}
              />
            ))}

            
          
          </div>
          
        </div>
      </div>
      {/* Models List */}
      <div id='available-models' className='py-12 px-8 border-b border-[#3c4043]'>
        <div className='max-w-4xl mx-auto'>
          <div className='flex items-center gap-2 '>
            <Cpu className='text-[#8ab4f8]' size={28} />
            <h2 className='text-3xl font-bold'>Available Models</h2>
          </div>
          <p className='text-[#9aa0a6] mb-8 text-sm'>
            Pass a model <span className='font-mono text-[#e3e3e3]'>id</span> in the request body when{' '}
            <span className='font-mono text-[#e3e3e3]'>auto=false</span>. Each request deducts the listed
            credit cost from your balance.
          </p>
          <div className='overflow-x-auto rounded-lg border border-[#3c4043]'>
            <table className='w-full text-left text-sm border-collapse'>
              <thead>
                <tr className='bg-[#1e1f20] border-b border-[#3c4043]'>
                  <th className='px-4 py-3 font-semibold text-[#e3e3e3] whitespace-nowrap'>Name</th>
                  <th className='px-4 py-3 font-semibold text-[#e3e3e3] whitespace-nowrap'>Model ID</th>
                  <th className='px-4 py-3 font-semibold text-[#e3e3e3] whitespace-nowrap'>Provider</th>
                  <th className='px-4 py-3 font-semibold text-[#e3e3e3] whitespace-nowrap'>Tier</th>
                  <th className='px-4 py-3 font-semibold text-[#e3e3e3] whitespace-nowrap'>Cost</th>
                  <th className='px-4 py-3 font-semibold text-[#e3e3e3] whitespace-nowrap'>Strengths</th>
                </tr>
              </thead>
              <tbody>
                {filteredModels.length === 0 ? (
                  <tr>
                    <td colSpan={6} className='px-4 py-8 text-center text-[#9aa0a6] text-sm'>
                      {hasActiveSearch ? 'No matching models.' : 'No models available.'}
                    </td>
                  </tr>
                ) : (
                  filteredModels.map((model, index) => (
                    <tr
                      key={model.id}
                      className={`border-b border-[#3c4043] last:border-b-0 ${
                        index % 2 === 0 ? 'bg-[#0e0e0e]' : 'bg-[#141414]'
                      } hover:bg-[#1e1f20] transition-colors`}
                    >
                      <td className='px-4 py-3 font-medium text-[#e3e3e3] whitespace-nowrap'>{model.name}</td>
                      <td className='px-4 py-3 font-mono text-[#8ab4f8] text-xs align-top'>{model.id}</td>
                      <td className='px-4 py-3 text-[#9aa0a6] whitespace-nowrap'>{model.provider}</td>
                      <td className='px-4 py-3 capitalize text-purple-300 whitespace-nowrap'>{model.tier}</td>
                      <td className='px-4 py-3 text-emerald-400 whitespace-nowrap'>
                        {model.cost} credit{model.cost === 1 ? '' : 's'}
                      </td>
                      <td className='px-4 py-3 text-[#9aa0a6] whitespace-nowrap'>{model.strengths}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationView;
