import { Suspense, lazy, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { LoadingState } from './components/LoadingState'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { AUTH_STORAGE_KEY } from './constants/ui'

const LoginPage = lazy(() => import('./pages/LoginPage').then((module) => ({ default: module.LoginPage })))
const DashboardPage = lazy(() => import('./pages/DashboardPage').then((module) => ({ default: module.DashboardPage })))

const queryClient = new QueryClient()

const AppShell = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem(AUTH_STORAGE_KEY) === 'true'
  })

  useEffect(() => {
    window.localStorage.setItem(AUTH_STORAGE_KEY, String(isAuthenticated))
  }, [isAuthenticated])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

const ErrorFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-6 dark:bg-slate-950">
    <div className="w-full max-w-md rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-xl dark:border-slate-700 dark:bg-slate-900">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/30">
        <AlertTriangle className="h-8 w-8 text-red-500" />
      </div>

      <h1 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
        Unable to load the application
      </h1>

      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
        Something unexpected happened while loading the dashboard.
        Please try again.
      </p>

      <button
        onClick={() => window.location.reload()}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#173D6D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#102C54]"
      >
        <RefreshCw size={18} />
        Retry
      </button>
    </div>
  </div>
)
function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingState />}>
          <AppShell />
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
