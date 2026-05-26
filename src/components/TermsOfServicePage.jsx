export default function TermsOfServicePage() {
  return (
    <div className='min-h-screen bg-[#0e0e0e] py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto bg-black rounded-lg shadow-md p-8'>
        <h1 className='text-4xl font-bold text-white mb-8'>Terms of Service</h1>

        <div className='space-y-6 text-gray-300'>
          <section>
            <h2 className='text-2xl font-semibold text-white mb-3'>1. Acceptance of Terms</h2>
            <p>
              By accessing and using this application, you accept and agree to be bound by the terms and provision of
              this agreement.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-white mb-3'>2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on our
              application for personal, non-commercial transitory viewing only. This is the grant of a license, not a
              transfer of title, and under this license you may not:
            </p>
            <ul className='list-disc list-inside mt-2 space-y-1'>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer the application</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-white mb-3'>3. Disclaimer</h2>
            <p>
              The materials on our application are provided on an 'as is' basis. We make no warranties, expressed or
              implied, and hereby disclaim and negate all other warranties including, without limitation, implied
              warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
              intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-white mb-3'>4. Limitations</h2>
            <p>
              In no event shall our company or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability
              to use the materials on our application.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-white mb-3'>5. Accuracy of Materials</h2>
            <p>
              The materials appearing on our application could include technical, typographical, or photographic errors.
              We do not warrant that any of the materials on our application are accurate, complete, or current. We may
              make changes to the materials contained on our application at any time without notice.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-white mb-3'>6. Links</h2>
            <p>
              We have not reviewed all of the sites linked to our website and are not responsible for the contents of
              any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any
              such linked website is at the user's own risk.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-white mb-3'>7. Modifications</h2>
            <p>
              We may revise these terms of service for our application at any time without notice. By using this
              application, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-white mb-3'>8. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of your jurisdiction,
              and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <div className='mt-8 p-4 bg-gray-700 rounded-lg border border-gray-600'>
            <p className='text-sm text-gray-400'>Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
