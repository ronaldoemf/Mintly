import Header from "../components/Header-9c5mxJIsZPqJT48scUISKH0YfagNgE"
import PaymentForm from "../components/PaymentForm"

export default function PaymentPage() {
  return (
    <>
      <Header />
      <main className="bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-teal-900 dark:to-cyan-900 min-h-screen pt-[80px]">
        <PaymentForm />
      </main>
    </>
  )
}

