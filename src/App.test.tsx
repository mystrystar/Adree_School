import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from './components/LoginForm'

describe('login form', () => {
  it('submits valid credentials', async () => {
    const handleLogin = vi.fn()
    render(<LoginForm onSubmitSuccess={handleLogin} />)

    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/email/i), 'student@example.com')
    await user.type(screen.getByLabelText(/password/i), 'secret123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(handleLogin).toHaveBeenCalledTimes(1)
  })
})
