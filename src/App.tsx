import { Suspense, lazy, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { LoadingState } from './components/LoadingState'

const LoginPage = lazy(() => import('./pages/LoginPage').then((module) => ({ default: module.LoginPage })))
const DashboardPage = lazy(() => import('./pages/DashboardPage').then((module) => ({ default: module.DashboardPage })))

const queryClient = new QueryClient()

const AppShell = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem('student-dashboard-auth') === 'true'
  })

  useEffect(() => {
    window.localStorage.setItem('student-dashboard-auth', isAuthenticated ? 'true' : 'false')
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
  <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6 text-center dark:bg-slate-950">
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h1 className="text-xl font-semibold">Something went wrong</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Please refresh the page and try again.</p>
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
