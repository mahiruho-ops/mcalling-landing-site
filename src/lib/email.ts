import nodemailer from 'nodemailer';

// Email configuration interface
interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  tls: {
    rejectUnauthorized: boolean;
    servername: string;
  };
  name: string;
}

// Email data interface
interface EmailData {
  name: string;
  email: string;
  company?: string;
  message?: string;
  interestType?: string;
  countryCode?: string;
  phone?: string;
  industry?: string;
}

// Create transporter
const createTransporter = () => {
  const config: EmailConfig = {
    host: process.env.SMTP_HOST!,
    port: parseInt(process.env.SMTP_PORT!),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
    tls: {
      rejectUnauthorized: false,
      servername: process.env.EHLO_DOMAIN!, // This sets the EHLO domain
    },
    name: process.env.EHLO_DOMAIN!,
  };

  return nodemailer.createTransport(config);
};

// HTML template for confirmation email to user
const getConfirmationEmailHTML = (data: EmailData): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Your Interest</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f8f9fa;
            }
            .container {
                background-color: white;
                border-radius: 8px;
                padding: 40px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
            }
            .logo {
                font-size: 24px;
                font-weight: bold;
                color: #2563eb;
                margin-bottom: 10px;
            }
            h1 {
                color: #1f2937;
                margin-bottom: 20px;
            }
            .content {
                margin-bottom: 30px;
            }
            .highlight {
                background-color: #f3f4f6;
                padding: 15px;
                border-radius: 6px;
                border-left: 4px solid #2563eb;
                margin: 20px 0;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                color: #6b7280;
                font-size: 14px;
            }
            .button {
                display: inline-block;
                background-color: #2563eb;
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 6px;
                margin: 20px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">MChatbot</div>
                <h1>Thank You for Your Interest!</h1>
            </div>
            
            <div class="content">
                <p>Hi ${data.name},</p>
                
                <p>Thank you for reaching out to us! We've received your interest form submission and are excited to learn more about your project.</p>
                
                <div class="highlight">
                    <strong>Your submission details:</strong><br>
                    Name: ${data.name}<br>
                    Email: ${data.email}<br>
                    ${data.phone ? `Phone: ${data.countryCode || ''} ${data.phone}<br>` : ''}
                    ${data.company ? `Company: ${data.company}<br>` : ''}
                    ${data.industry ? `Industry: ${data.industry}<br>` : ''}
                    ${data.interestType ? `Interest Type: ${data.interestType}<br>` : ''}
                    ${data.message ? `Message: ${data.message}` : ''}
                </div>
                
                <p>Our team will review your information and get back to you within 24-48 hours. We're looking forward to discussing how MChatbot can help with your project!</p>
                
                <p>If you have any urgent questions, feel free to reach out to us directly.</p>
                
                <p>Best regards,<br>
                The MChatbot Team</p>
            </div>
            
            <div class="footer">
                <p>This email was sent to ${data.email} because you submitted an interest form on our website.</p>
                <p>&copy; 2024 MChatbot. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// HTML template for notification email to admin
const getNotificationEmailHTML = (data: EmailData): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Interest Form Submission</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f8f9fa;
            }
            .container {
                background-color: white;
                border-radius: 8px;
                padding: 40px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                background-color: #fef3c7;
                padding: 20px;
                border-radius: 6px;
                border-left: 4px solid #f59e0b;
            }
            .alert {
                color: #92400e;
                font-weight: bold;
                font-size: 18px;
            }
            .submission-details {
                background-color: #f9fafb;
                padding: 20px;
                border-radius: 6px;
                margin: 20px 0;
                border: 1px solid #e5e7eb;
            }
            .field {
                margin-bottom: 10px;
            }
            .label {
                font-weight: bold;
                color: #374151;
            }
            .value {
                color: #6b7280;
                margin-left: 10px;
            }
            .timestamp {
                text-align: center;
                color: #6b7280;
                font-size: 14px;
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="alert">🔔 New Interest Form Submission</div>
            </div>
            
            <div class="submission-details">
                <div class="field">
                    <span class="label">Name:</span>
                    <span class="value">${data.name}</span>
                </div>
                <div class="field">
                    <span class="label">Email:</span>
                    <span class="value">${data.email}</span>
                </div>
                ${data.phone ? `
                <div class="field">
                    <span class="label">Phone:</span>
                    <span class="value">${data.countryCode || ''} ${data.phone}</span>
                </div>
                ` : ''}
                ${data.company ? `
                <div class="field">
                    <span class="label">Company:</span>
                    <span class="value">${data.company}</span>
                </div>
                ` : ''}
                ${data.industry ? `
                <div class="field">
                    <span class="label">Industry:</span>
                    <span class="value">${data.industry}</span>
                </div>
                ` : ''}
                ${data.interestType ? `
                <div class="field">
                    <span class="label">Interest Type:</span>
                    <span class="value">${data.interestType}</span>
                </div>
                ` : ''}
                ${data.message ? `
                <div class="field">
                    <span class="label">Message:</span>
                    <span class="value">${data.message}</span>
                </div>
                ` : ''}
            </div>
            
            <div class="timestamp">
                Submitted on: ${new Date().toLocaleString('en-US', {
                  timeZone: 'UTC',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })} UTC
            </div>
        </div>
    </body>
    </html>
  `;
};

// Send confirmation email to user
export const sendConfirmationEmail = async (data: EmailData): Promise<void> => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"MChatbot" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: 'Thank You for Your Interest - MChatbot',
      html: getConfirmationEmailHTML(data),
    };

    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to: ${data.email}`);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw new Error('Failed to send confirmation email');
  }
};

// Send notification email to admin
export const sendNotificationEmail = async (data: EmailData): Promise<void> => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"MChatbot" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: `New Interest Form Submission from ${data.name}`,
      html: getNotificationEmailHTML(data),
    };

    await transporter.sendMail(mailOptions);
    console.log(`Notification email sent to admin: ${process.env.ADMIN_EMAIL || process.env.SMTP_USER}`);
  } catch (error) {
    console.error('Error sending notification email:', error);
    throw new Error('Failed to send notification email');
  }
};

// Send both emails
export const sendInterestFormEmails = async (data: EmailData): Promise<void> => {
  try {
    // Send both emails in parallel for better performance
    await Promise.all([
      sendConfirmationEmail(data),
      sendNotificationEmail(data)
    ]);
    
    console.log('Both confirmation and notification emails sent successfully');
  } catch (error) {
    console.error('Error sending interest form emails:', error);
    throw error;
  }
};
