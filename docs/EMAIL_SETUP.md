# Email Setup with Nodemailer

This project uses Nodemailer to send emails through a custom SMTP provider.

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env.local` and fill in your SMTP provider details:

```bash
cp .env.example .env.local
```

### 2. Required Environment Variables

```env
# SMTP Server Settings
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_SECURE=false

# SMTP Authentication
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-email-password

# Email Settings (Optional)
SMTP_FROM=your-email@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com

# EHLO Domain (Required for custom SMTP providers)
EHLO_DOMAIN=yourdomain.com
```

### 3. SMTP Configuration Notes

- **SMTP_SECURE**: 
  - `true` for port 465 (SSL)
  - `false` for port 587 (TLS)
- **SMTP_FROM**: Optional, falls back to `SMTP_USER` if not provided
- **ADMIN_EMAIL**: Optional, falls back to `SMTP_USER` if not provided
- **EHLO_DOMAIN**: Required for custom SMTP providers to set the EHLO domain

### 4. Email Types

The system sends two types of emails:

1. **Confirmation Email**: Sent to the user who submitted the interest form
2. **Notification Email**: Sent to the admin team about new submissions

### 5. Email Templates

Both emails use beautiful HTML templates with:
- Responsive design that works on all email clients
- Professional styling with your brand colors
- Clean, modern layout
- Proper email formatting

### 6. Testing

To test the email functionality:

1. Start your development server: `npm run dev`
2. Submit the interest form on your website
3. Check both the user's email and admin email for the respective messages

### 7. Deployment

Make sure to set the environment variables in your deployment platform:

- **Vercel**: Add variables in Project Settings > Environment Variables
- **Netlify**: Add variables in Site Settings > Environment Variables
- **Other platforms**: Follow their respective environment variable setup guides

### 8. Troubleshooting

Common issues:

- **Authentication failed**: Check your SMTP credentials
- **Connection timeout**: Verify SMTP host and port
- **SSL/TLS errors**: Ensure `SMTP_SECURE` matches your port configuration
- **EHLO domain errors**: Make sure `EHLO_DOMAIN` is set correctly
- **Emails not received**: Check spam folders and email provider settings

### 9. Security Notes

- Never commit `.env.local` to version control
- Use strong passwords for SMTP authentication
- Consider using app-specific passwords for Gmail/Outlook
- Regularly rotate SMTP credentials
- The system uses `rejectUnauthorized: false` for custom SMTP providers

### 10. Custom SMTP Provider Configuration

For custom SMTP providers, the configuration includes:
- TLS settings with `rejectUnauthorized: false`
- Custom EHLO domain setting
- Proper servername configuration

This ensures compatibility with various custom SMTP servers that may have different certificate requirements.
