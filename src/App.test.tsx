import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from './components/LoginForm'

describe('login form', () => {
  it('submits valid credentials', async () => {
    const handleLogin = vi.fn()
    render(<LoginForm onSubmitSuccess={handleLogin} />)

    const user = userEvent.setup()

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)

    await user.clear(emailInput)
    await user.type(emailInput, 'student@example.com')
    await user.clear(passwordInput)
    await user.type(passwordInput, 'secret123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(handleLogin).toHaveBeenCalledTimes(1)
  })
})
