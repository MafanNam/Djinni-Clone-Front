import continueWithSocialAuth from "@/utils/continue-with-social-auth";

export const continueWithGoogle = () =>
  continueWithSocialAuth('google-oauth2', 'google');