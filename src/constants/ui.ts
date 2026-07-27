// App & Header
export const APP_TITLE = 'Adree School'
export const FOOTER_ALT = 'Adree School'
export const PROFILE_ARIA_LABEL = 'Profile'
export const LOGOUT_TEXT = 'Logout'
export const AUTH_STORAGE_KEY = 'student-dashboard-auth'

export const DASHBOARD_LABEL = 'Student Dashboard'

// Search & Filters
export const SEARCH_PLACEHOLDER = 'Search students by name or email...'
export const COMPANY_SEARCH_PLACEHOLDER = 'Search company'
export const KEYBOARD_SHORTCUT = 'Ctrl + K'
export const SEARCH_ARIA_LABEL = 'Search students'
export const SORT_ARIA_LABEL = 'Sort students'

// Filters Panel
export const FILTERS_LABEL = 'Filters'
export const FILTERS_SUBTITLE = 'By employer'
export const FILTERS_RESET = 'Reset'
export const FILTERS_SELECTED_LABEL = 'Selected'
export const FILTERS_RESET_BUTTON = 'Reset filters'
export const FILTERS_APPLY_BUTTON = 'Apply filters'

// Login Form
export const LOGIN_TITLE = 'Welcome Back'
export const LOGIN_SUBTITLE = 'Sign in to continue to your student dashboard.'
export const LOGIN_EMAIL_LABEL = 'Email'
export const LOGIN_PASSWORD_LABEL = 'Password'
export const LOGIN_EMAIL_REQUIRED = 'Email is required'
export const LOGIN_EMAIL_INVALID = 'Enter a valid email address'
export const LOGIN_PASSWORD_REQUIRED = 'Password is required'
export const LOGIN_PASSWORD_MIN = 'Password must be at least 6 characters'
export const LOGIN_SUBMIT = 'Sign in'
export const LOGIN_SUBMITTING = 'Signing in…'
export const LOGIN_DEMO_EMAIL = 'demo@adree.test'
export const LOGIN_DEMO_PASSWORD = 'Password123'

// States
export const ERROR_MESSAGE = 'We could not load the student records right now. Please retry in a moment.'
export const ERROR_TITLE = 'Something went wrong'
export const ERROR_RETRY_BUTTON = 'Retry'
export const APP_ERROR_TITLE = 'Unable to load the application'
export const APP_ERROR_MESSAGE = 'Something unexpected happened while loading the dashboard. Please try again.'

export const EMPTY_MESSAGE = 'Try clearing the filters or searching with a different name or email.'
export const EMPTY_TITLE = 'No students found'
export const EMPTY_RESET_BUTTON = 'Reset Filters'

// Footer
export const FOOTER_COPY = `© ${new Date().getFullYear()} Adree School`

// Sort
export const SORT_OPTIONS = [
  { value: 'asc', label: 'Name A-Z' },
  { value: 'desc', label: 'Name Z-A' },
] as const

export type SortDirection = (typeof SORT_OPTIONS)[number]['value']
