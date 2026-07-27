import { LoginForm } from '../components/LoginForm'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface LoginPageProps {
  onLogin: () => void
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-slate-950">
      <Header />

      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-md sm:max-w-md md:max-w-md">
          <div className="mx-auto w-full">
         
            <div className="mx-auto">

              <div className="flex justify-center">
                <LoginForm onSubmitSuccess={onLogin} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
