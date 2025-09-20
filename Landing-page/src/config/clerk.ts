// Clerk Configuration for Landing Page
export const clerkConfig = {
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 'pk_test_Y29tcG9zZWQtdGFwaXItNTAuY2xlcmsuYWNjb3VudHMuZGV2JA',
  signInUrl: '/sign-in',
  signUpUrl: '/sign-up',
  afterSignInUrl: 'http://localhost:8080',
  afterSignUpUrl: 'http://localhost:8080',
};
