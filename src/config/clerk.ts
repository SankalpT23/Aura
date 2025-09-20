// Clerk Configuration
export const clerkConfig = {
  publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_Y29tcG9zZWQtdGFwaXItNTAuY2xlcmsuYWNjb3VudHMuZGV2JA',
  signInUrl: '/login',
  signUpUrl: '/sign-up',
  afterSignInUrl: '/',
  afterSignUpUrl: '/',
};
