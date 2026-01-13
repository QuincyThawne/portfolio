# Email Configuration Guide

## Setting up EmailJS for Contact Form

Your portfolio now includes a working email feature using EmailJS. Follow these steps to complete the setup:

### 1. Create an EmailJS Account
- Go to [https://www.emailjs.com/](https://www.emailjs.com/)
- Sign up for a free account (allows 200 emails/month)

### 2. Add an Email Service
1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note your **Service ID** (e.g., `service_abc123`)

### 3. Create an Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template structure:

**Subject:**
```
New Portfolio Contact - {{from_name}}
```

**Body:**
```
Hello {{to_name}},

You have received a new message from your portfolio website.

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save and note your **Template ID** (e.g., `template_xyz789`)

### 4. Get Your Public Key
1. Go to **Account** > **General**
2. Find your **Public Key** (also called User ID)
3. Copy it (e.g., `AbCdEfGhIjKlMnOp`)

### 5. Update Configuration
1. Open `src/config/emailjs.config.ts`
2. Replace the placeholder values:

```typescript
export const emailjsConfig = {
  serviceId: 'service_abc123',      // Your Service ID
  templateId: 'template_xyz789',    // Your Template ID
  publicKey: 'AbCdEfGhIjKlMnOp',    // Your Public Key
};
```

### 6. Test the Form
1. Run your development server: `npm run dev`
2. Navigate to the Contact section
3. Fill out and submit the form
4. Check your email inbox for the message

## Important Notes

- **Free Tier Limits:** 200 emails per month
- **Security:** Your public key is safe to include in frontend code
- **Spam Protection:** Consider adding reCAPTCHA for production
- **Email Delivery:** Check your spam folder if emails don't arrive
- **Gmail Users:** You may need to enable "Less secure app access" or use an App Password

## Troubleshooting

### Emails not sending?
- Verify all three credentials are correct
- Check browser console for errors
- Ensure EmailJS service is properly configured
- Test the template in EmailJS dashboard

### Getting 403 errors?
- Check if your public key is correct
- Verify your account is active
- Make sure you've confirmed your email address

### Emails going to spam?
- Add your domain to EmailJS settings
- Set up SPF/DKIM records (for custom domains)
- Ask recipients to whitelist your email

## Additional Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS React Guide](https://www.emailjs.com/docs/examples/reactjs/)
- [Support](https://www.emailjs.com/support/)
