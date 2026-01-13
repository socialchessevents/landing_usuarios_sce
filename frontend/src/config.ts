// ============================================================
// CONFIGURATION FILE
// ============================================================
// 
// Modify these values to customize the landing page
//
// ============================================================

export const config = {
  // Beta Signup Form Endpoint
  // Replace with your actual API endpoint:
  // - Your own backend: "https://your-api.com/beta-signup"
  // - Formspree: "https://formspree.io/f/YOUR_FORM_ID"
  // - Netlify Forms: Just add name="beta-signup" netlify to the form
  // - Any webhook URL
  betaSignupApi: "https://formspree.io/f/YOUR_FORM_ID",

  // Google Forms Survey URL
  surveyUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeQFsCSq0LHRU47WYyAxKZjKn6UHFWJ8_cXQNDjMMa7bYhRKw/viewform?usp=dialog",

  // Social Links (optional)
  social: {
    instagram: "",
    twitter: "",
    linkedin: "",
  },

  // Contact Email
  contactEmail: "hola@chessevents.com",
};
