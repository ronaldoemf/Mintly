import Header from "../components/Header-9c5mxJIsZPqJT48scUISKH0YfagNgE"
import Footer from "../components/Footer"

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="bg-white dark:bg-gray-900 min-h-screen pt-[80px]">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Privacy Policy</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>
              At Zyra, we take your privacy seriously. This Privacy Policy describes how we collect, use, and share your
              personal information when you use our FinanceAI service.
            </p>
            <h2>Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, use our services,
              or communicate with us. This may include your name, email address, financial information, and any other
              information you choose to provide.
            </p>
            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, to develop new features,
              and to protect Zyra and our users.
            </p>
            <h2>Sharing of Information</h2>
            <p>
              We do not share your personal information with third parties except as described in this policy. We may
              share your information with service providers who perform services on our behalf, or when required by law.
            </p>
            <h2>Data Security</h2>
            <p>
              We use reasonable measures to help protect your personal information from loss, theft, misuse, and
              unauthorized access, disclosure, alteration, and destruction.
            </p>
            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page.
            </p>
            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@zyra.com.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

