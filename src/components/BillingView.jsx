import React, { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { load } from '@cashfreepayments/cashfree-js';
import {
  usage_details,
  buy_credits,
  credit_success_callback,
} from '../api/billing';

const GST_RATE = 0.18;
const MIN_CREDITS = 9; // ₹9 × 1.18 ≥ ₹10 minimum order on server

const BillingView = () => {
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [creditsInput, setCreditsInput] = useState(String(MIN_CREDITS));
  const [phone, setPhone] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [modalError, setModalError] = useState(null);

  const loadDashboard = async () => {
    const res = await usage_details();
    if (res) {
      setBalance(res.balance ?? 0);
      setHistory(res.history ?? []);
    }
  };

  useEffect(() => {
    const run = async () => {
      try {
        await loadDashboard();
      } catch {
        setError('Failed to load billing info');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const creditsNum = useMemo(() => {
    const n = parseInt(String(creditsInput).replace(/\D/g, ''), 10);
    return Number.isFinite(n) ? n : 0;
  }, [creditsInput]);

  const pricing = useMemo(() => {
    const subtotal = creditsNum;
    const gst = Math.round(subtotal * GST_RATE * 100) / 100;
    const total = Math.round((subtotal + gst) * 100) / 100;
    return { subtotal, gst, total };
  }, [creditsNum]);

  const openModal = () => {
    setModalOpen(true);
    setModalError(null);
    setSuccessMessage(null);
  };

  const closeModal = () => {
    if (checkoutLoading) return;
    setModalOpen(false);
    setModalError(null);
  };

  const runCheckout = async () => {
    setModalError(null);
    setSuccessMessage(null);

    if (creditsNum < MIN_CREDITS) {
      setModalError(`Enter at least ${MIN_CREDITS} credits (minimum order ₹10 incl. GST).`);
      return;
    }
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setModalError('Enter a valid phone number (min 10 digits).');
      return;
    }

    setCheckoutLoading(true);
    let orderId = null;
    try {
      const order = await buy_credits({
        credits: creditsNum,
        phone: phoneDigits.slice(-15),
      });
      orderId = order.order_id;
      const sessionId = order.payment_session_id;
      if (!sessionId) {
        throw new Error('No payment session from server');
      }

      const mode =
        import.meta.env.VITE_CASHFREE_MODE === 'production'
          ? 'production'
          : 'sandbox';
      const cashfree = await load({ mode });

      const checkoutResult = await new Promise((resolve, reject) => {
        try {
          const out = cashfree.checkout({
            paymentSessionId: sessionId,
            redirectTarget: '_modal',
          });
          if (out && typeof out.then === 'function') {
            out.then(resolve).catch(reject);
          } else {
            resolve(out);
          }
        } catch (e) {
          reject(e);
        }
      });

      if (checkoutResult?.error) {
        throw new Error(checkoutResult.error.message || 'Payment failed');
      }

      const success = await credit_success_callback(orderId);
      if (success?.status !== 'success') {
        throw new Error(success?.error || 'Could not confirm payment');
      }

   
      await loadDashboard();
      setSuccessMessage(
        `Payment successful. Added ${success.credits_added ?? creditsNum} credits.`
      );

    } catch (err) {
      const msg =
        err?.error ||
        err?.message ||
        (typeof err === 'string' ? err : 'Checkout failed');
      setModalError(String(msg));
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className='p-8 w-2/3 mx-auto animate-in fade-in duration-500'>
      <h1 className='text-3xl font-bold mb-8'>Usage & Billing</h1>

      {successMessage && !modalOpen && (
        <div
          className='mb-6 rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3 text-green-200'
          role='status'
        >
          {successMessage}
        </div>
      )}

      <div className='grid gap-6 mb-8'>
        <div className='lg:col-span-2 bg-[#1e1f20] border border-[#3c4043] p-6 rounded-2xl'>
          <div className='flex justify-between items-start mb-6'>
            <div>
              <h3 className='text-xl font-bold text-[#8ab4f8]'>Credit Balance</h3>
              <p className='text-sm text-gray-500 mt-1'>Add Credits to keep using LarcAI API</p>
            </div>
            <button
              type='button'
              onClick={openModal}
              className='text-xs bg-[#8ab4f8]/20 hover:bg-[#8ab4f8]/30 text-[#8ab4f8] px-3 py-1.5 rounded-md transition-colors'
            >
              Add balance
            </button>
          </div>

          <div className='space-y-4'>
            {loading ? (
              <p className='text-gray-400'>Loading...</p>
            ) : error ? (
              <p className='text-red-400'>Failed To Fetch</p>
            ) : (
              <h2 className='text-xl font-bold text-white'>
                {balance.toLocaleString('en-IN', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}{' '}
                credits
              </h2>
            )}
          </div>
        </div>
      </div>

      <h2 className='text-xl font-bold mb-4'>Recent Transactions</h2>
      <div className='bg-[#1e1f20] border border-[#3c4043] rounded-2xl overflow-hidden'>
        <table className='w-full text-left text-sm'>
          <thead>
            <tr className='border-b border-[#3c4043] bg-black/20'>
              <th className='px-6 py-4 font-medium text-gray-400'>Date</th>
              <th className='px-6 py-4 font-medium text-gray-400'>Credits</th>
              <th className='px-6 py-4 font-medium text-gray-400'>Amount</th>
              <th className='px-6 py-4 font-medium text-gray-400'>Status</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-[#3c4043]'>
            {loading ? (
              <tr>
                <td colSpan='4' className='px-6 py-4 text-gray-400 text-center'>
                  Loading...
                </td>
              </tr>
            ) : history.length === 0 ? (
              <tr>
                <td colSpan='4' className='px-6 py-4 text-gray-400 text-center'>
                  No transactions found.
                </td>
              </tr>
            ) : (
              history.map((transaction, index) => (
                <tr key={index}>
                  <td className='px-6 py-4 text-gray-300'>{transaction.date}</td>
                  <td className='px-6 py-4'>{transaction.credits}</td>
                  <td className='px-6 py-4'>₹{transaction.amount}</td>
                  <td className='px-6 py-4 text-green-400'>{transaction.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4'
          role='dialog'
          aria-modal='true'
          aria-labelledby='add-balance-title'
          onClick={closeModal}
        >
          <div
            className='relative w-full max-w-md rounded-2xl border border-[#3c4043] bg-[#1e1f20] p-6 shadow-xl'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type='button'
              onClick={closeModal}
              disabled={checkoutLoading}
              className='absolute right-4 top-4 rounded-lg p-1 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-40'
              aria-label='Close'
            >
              <X className='h-5 w-5' />
            </button>

            <h2 id='add-balance-title' className='text-lg font-bold text-white pr-10'>
              Add balance
            </h2>
            <p className='mt-1 text-sm text-gray-500'>
              Credits are added to your account after payment. 18% GST applies.
            </p>
           

            <div className='mt-6 space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-300 mb-1.5'>
                  Number of credits (Min 9 credits)
                </label>
                <input
                  type='text'
                  inputMode='numeric'
                  value={creditsInput}
                  onChange={(e) => setCreditsInput(e.target.value)}
                  className='w-full rounded-lg border border-[#3c4043] bg-[#131314] px-3 py-2 text-white placeholder:text-gray-600 focus:border-[#8ab4f8] focus:outline-none focus:ring-1 focus:ring-[#8ab4f8]'
                  placeholder={`Min ${MIN_CREDITS}`}
                  disabled={checkoutLoading}
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-300 mb-1.5'>
                  Phone No.
                </label>
                <input
                  type='tel'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className='w-full rounded-lg border border-[#3c4043] bg-[#131314] px-3 py-2 text-white placeholder:text-gray-600 focus:border-[#8ab4f8] focus:outline-none focus:ring-1 focus:ring-[#8ab4f8]'
                  placeholder='10-digit mobile number'
                  disabled={checkoutLoading}
                />
              </div>

              <div className='rounded-xl border border-[#3c4043] bg-black/20 px-4 py-3 text-sm'>
                <div className='flex justify-between text-gray-300'>
                  <span>Subtotal (₹1 / credit)</span>
                  <span>₹{pricing.subtotal.toFixed(2)}</span>
                </div>
                <div className='mt-2 flex justify-between text-gray-300'>
                  <span>GST (18%)</span>
                  <span>₹{pricing.gst.toFixed(2)}</span>
                </div>
                <div className='mt-3 flex justify-between border-t border-[#3c4043] pt-3 font-semibold text-white'>
                  <span>Total</span>
                  <span>₹{pricing.total.toFixed(2)}</span>
                </div>
              </div>

              {modalError && (
                <p className='text-sm text-red-400' role='alert'>
                  {modalError}
                </p>
              )}
              {successMessage && (
                <p className='text-sm text-green-400' role='status'>
                  {successMessage}
                </p>
              )}

              <button
                type='button'
                onClick={runCheckout}
                disabled={
                  checkoutLoading || creditsNum < MIN_CREDITS || !phone.trim()
                }
                className='w-full rounded-lg bg-[#8ab4f8] py-2.5 font-medium text-[#131314] transition-colors hover:bg-[#a8c4fa] disabled:cursor-not-allowed disabled:opacity-40'
              >
                {checkoutLoading ? 'Processing…' : 'Checkout'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingView;
