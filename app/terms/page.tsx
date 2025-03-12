import Header from "../components/Header-9c5mxJIsZPqJT48scUISKH0YfagNgE"
import Footer from "../components/Footer"

export default function TermsOfService() {
  return (
    <>
      <Header />
      <main className="bg-white dark:bg-gray-900 min-h-screen pt-[80px]">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Terms of Service</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>
              Please read these Terms of Service ("Terms") carefully before using the FinanceAI service operated by
              Zyra.
            </p>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of
              the terms, then you may not access the service.
            </p>
            <h2>2. Use of Service</h2>
            <p>
              You agree to use the service only for lawful purposes and in accordance with these Terms. You are
              responsible for maintaining the confidentiality of your account and password.
            </p>
            <h2>3. Intellectual Property</h2>
            <p>
              The service and its original content, features, and functionality are and will remain the exclusive
              property of Zyra and its licensors.
            </p>
            <h2>4. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason
              whatsoever, including without limitation if you breach the Terms.
            </p>
            <h2>5. Limitation of Liability</h2>
            <p>
              In no event shall Zyra, nor its directors, employees, partners, agents, suppliers, or affiliates, be
              liable for any indirect, incidental, special, consequential or punitive damages.
            </p>
            <h2>6. Changes</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time.</p>
            <h2>7. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at terms@zyra.com.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

