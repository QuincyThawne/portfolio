// ============================================
// EmailJS Configuration
// ============================================
// This configuration uses environment variables to keep your
// EmailJS credentials secure. 
//
// For local development:
// 1. Copy .env.example to .env
// 2. Fill in your EmailJS credentials in .env
//
// For Vercel deployment:
// 1. Add environment variables in Vercel Dashboard
// 2. Go to Project Settings > Environment Variables
// 3. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
//
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Add an Email Service (Gmail, Outlook, etc.) in the EmailJS dashboard
// 3. Create an Email Template with these template variables:
//    - {{from_name}} - Sender's name
//    - {{from_email}} - Sender's email
//    - {{to_name}} - Your name
//    - {{message}} - The message content
//
// 4. Get your credentials from EmailJS dashboard:
//    - Service ID: Found in Email Services section
//    - Template ID: Found in Email Templates section
//    - Public Key: Found in Account > API Keys
// ============================================

export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
};

// ============================================
// Example EmailJS Template:
// ============================================
// Subject: New Portfolio Contact - {{from_name}}
//
// Body:
// Hello {{to_name}},
//
// You have received a new message from your portfolio website.
//
// Name: {{from_name}}
// Email: {{from_email}}
//
// Message:
// {{message}}
//
// ---
// This message was sent from your portfolio contact form.
// ============================================

export default emailjsConfig;
