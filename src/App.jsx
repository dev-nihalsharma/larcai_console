import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import LogsView from './components/Rightbar';
import APIKeysView from './components/APIKeysView';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import DocumentationView from './components/DocumentationView';
import BillingView from './components/BillingView';
import TermsOfServicePage from './components/TermsOfServicePage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import BillingSupportPage from './components/BillingSupportPage';
import { isAuthenticated } from './utils/auth';
function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  // State to manage modal visibility

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const isAuth = isAuthenticated();

  return (
    <div className='flex h-screen w-full overflow-hidden bg-black text-white font-sans'>
      {isAuth ? (
        <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} onSignInClick={() => setIsSignInOpen(true)} />
      ) : null}

      <div className='flex-1 flex flex-col min-w-0 overflow-auto bg-[#0e0e0e]'>
        <Routes>
          {!isAuth ? (
            <>
              <Route path='/signin' element={<SignInPage />} />
              <Route path='/signup' element={<SignUpPage />} />
              <Route path='*' element={<Navigate to='/signin' />} />
              <Route path='/documentations' element={<DocumentationView />} />
            </>
          ) : (
            <>
              <Route path='/api-keys' element={<APIKeysView />} />
              <Route path='/billing' element={<BillingView />} />
              {/* Settings Menu Routes */}
              <Route path='/terms' element={<TermsOfServicePage />} />
              <Route path='/privacy' element={<PrivacyPolicyPage />} />
              <Route path='/billing-support' element={<BillingSupportPage />} />
              <Route path='*' element={<Navigate to='/documentations' />} />
              <Route path='/documentations' element={<DocumentationView />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
