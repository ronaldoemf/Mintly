import Header from "../components/Header-9c5mxJIsZPqJT48scUISKH0YfagNgE"
import SignInForm from "../components/SignInForm"

export default function SignInPage() {
  return (
    <>
      <Header />
      <main className="bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-teal-900 dark:to-cyan-900 min-h-screen pt-[80px]">
        <SignInForm />
      </main>
    </>
  )
}

