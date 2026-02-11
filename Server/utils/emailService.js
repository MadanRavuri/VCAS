import axios from 'axios';

class EmailService {
  constructor() {
    // Don't initialize in constructor - do it lazily
  }

  getCredentials() {
    return {
      apiKey: process.env.BREVO_API_KEY,
      hrEmail: process.env.HR_EMAIL
    };
  }

  validateCredentials() {
    const { apiKey, hrEmail } = this.getCredentials();
    
    if (!apiKey) {
      console.error('BREVO_API_KEY is not set in environment variables');
    }
    if (!hrEmail) {
      console.error('HR_EMAIL is not set in environment variables');
    }
    
    return { apiKey, hrEmail };
  }

  async sendContactEmail(contactData) {
    const { apiKey, hrEmail } = this.validateCredentials();
    if (!apiKey || !hrEmail) {
      const error = 'Missing Brevo API key or HR email configuration';
      console.error('sendContactEmail:', error);
      return { success: false, error };
    }

    try {
      const emailData = {
        sender: {
          name: 'VCAS HR Team',
          email: hrEmail
        },
        to: [
          {
            email: hrEmail,
            name: 'HR Department'
          }
        ],
        subject: `New Contact Form Submission: ${contactData.subject}`,
        htmlContent: this.generateContactEmailTemplate(contactData),
        replyTo: {
          email: contactData.email,
          name: contactData.name
        }
      };

      const response = await axios.post(
        'https://api.brevo.com/v3/smtp/email',
        emailData,
        {
          headers: {
            'api-key': apiKey,
            'Content-Type': 'application/json'
          }
        }
      );

      return { success: true, messageId: response.data.messageId };
    } catch (error) {
      console.error('Brevo email error (contact):', error.response?.data || error.message);
      return { 
        success: false, 
        error: error.response?.data?.message || error.message 
      };
    }
  }

  async sendContactConfirmationEmail(contactData) {
    const { apiKey, hrEmail } = this.validateCredentials();
    if (!apiKey) {
      const error = 'Missing Brevo API key configuration';
      console.error('sendContactConfirmationEmail:', error);
      return { success: false, error };
    }

    try {
      const emailData = {
        sender: {
          name: 'VCAS HR Team',
          email: hrEmail
        },
        to: [
          {
            email: contactData.email,
            name: contactData.name
          }
        ],
        subject: 'Thank you for contacting VCAS',
        htmlContent: this.generateContactConfirmationTemplate(contactData)
      };

      const response = await axios.post(
        'https://api.brevo.com/v3/smtp/email',
        emailData,
        {
          headers: {
            'api-key': apiKey,
            'Content-Type': 'application/json'
          }
        }
      );

      return { success: true, messageId: response.data.messageId };
    } catch (error) {
      console.error('Brevo email error (contact confirmation):', error.response?.data || error.message);
      return { 
        success: false, 
        error: error.response?.data?.message || error.message 
      };
    }
  }

  async sendJobApplicationEmail(applicationData) {
    const { apiKey, hrEmail } = this.validateCredentials();
    if (!apiKey || !hrEmail) {
      const error = 'Missing Brevo API key or HR email configuration';
      console.error('sendJobApplicationEmail:', error);
      return { success: false, error };
    }

    try {
      const emailData = {
        sender: {
          name: 'VCAS HR Team',
          email: hrEmail
        },
        to: [
          {
            email: hrEmail,
            name: 'HR Department'
          }
        ],
        subject: `New Job Application: ${applicationData.position}`,
        htmlContent: this.generateJobApplicationEmailTemplate(applicationData),
        replyTo: {
          email: applicationData.email,
          name: applicationData.name
        },
        attachments: applicationData.resumeFile ? [{
          name: `${applicationData.name.replace(/\s+/g, '_')}_resume.pdf`,
          content: applicationData.resumeFile
        }] : []
      };

      const response = await axios.post(
        'https://api.brevo.com/v3/smtp/email',
        emailData,
        {
          headers: {
            'api-key': apiKey,
            'Content-Type': 'application/json'
          }
        }
      );

      return { success: true, messageId: response.data.messageId };
    } catch (error) {
      console.error('Brevo email error (job application):', error.response?.data || error.message);
      return { 
        success: false, 
        error: error.response?.data?.message || error.message 
      };
    }
  }

  async sendJobApplicationConfirmationEmail(applicationData) {
    const { apiKey, hrEmail } = this.validateCredentials();
    if (!apiKey) {
      const error = 'Missing Brevo API key configuration';
      console.error('sendJobApplicationConfirmationEmail:', error);
      return { success: false, error };
    }

    try {
      const emailData = {
        sender: {
          name: 'VCAS HR Team',
          email: hrEmail
        },
        to: [
          {
            email: applicationData.email,
            name: applicationData.name
          }
        ],
        subject: `Thank you for applying to VCAS - ${applicationData.position}`,
        htmlContent: this.generateJobApplicationConfirmationTemplate(applicationData)
      };

      const response = await axios.post(
        'https://api.brevo.com/v3/smtp/email',
        emailData,
        {
          headers: {
            'api-key': apiKey,
            'Content-Type': 'application/json'
          }
        }
      );

      return { success: true, messageId: response.data.messageId };
    } catch (error) {
      console.error('Brevo email error (job application confirmation):', error.response?.data || error.message);
      return { 
        success: false, 
        error: error.response?.data?.message || error.message 
      };
    }
  }

  generateContactEmailTemplate(data) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Form Submission</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9fafb; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #374151; }
          .value { margin-top: 5px; padding: 10px; background: white; border-radius: 5px; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${data.email}</div>
            </div>
            ${data.phone ? `
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${data.phone}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Subject:</div>
              <div class="value">${data.subject}</div>
            </div>
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
            <div class="field">
              <div class="label">Submitted:</div>
              <div class="value">${new Date().toLocaleString()}</div>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from the VCAS website contact form.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  generateContactConfirmationTemplate(data) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Thank you for contacting VCAS</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9fafb; }
          .message { margin-bottom: 20px; padding: 15px; background: white; border-radius: 5px; border-left: 4px solid #2563eb; }
          .details { margin-bottom: 20px; }
          .field { margin-bottom: 10px; }
          .label { font-weight: bold; color: #374151; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
          .button { display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Contacting VCAS!</h1>
          </div>
          <div class="content">
            <div class="message">
              <p>Dear ${data.name},</p>
              <p>Thank you for reaching out to us. We have received your message and our team will get back to you within 24-48 hours.</p>
            </div>
            
            <div class="details">
              <h3>Your Message Details:</h3>
              <div class="field">
                <div class="label">Subject:</div>
                <div>${data.subject}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div>${data.message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>

            <div class="message">
              <p><strong>What happens next?</strong></p>
              <ul>
                <li>Our team will review your message</li>
                <li>We'll respond to your inquiry within 24-48 hours</li>
                <li>You'll receive a detailed response at ${data.email}</li>
              </ul>
            </div>

            <div style="text-align: center;">
              <a href="https://vcas.com" class="button">Visit Our Website</a>
            </div>
          </div>
          <div class="footer">
            <p>This is an automated confirmation email. Please do not reply to this message.</p>
            <p>© 2024 VCAS. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  generateJobApplicationEmailTemplate(data) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Job Application</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9fafb; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #374151; }
          .value { margin-top: 5px; padding: 10px; background: white; border-radius: 5px; }
          .skills { display: flex; flex-wrap: wrap; gap: 5px; }
          .skill { background: #e5e7eb; padding: 5px 10px; border-radius: 15px; font-size: 12px; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Job Application</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${data.email}</div>
            </div>
            ${data.phone ? `
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${data.phone}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Position Applied:</div>
              <div class="value">${data.position}</div>
            </div>
            ${data.experience ? `
            <div class="field">
              <div class="label">Experience:</div>
              <div class="value">${data.experience.replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}
            ${data.education ? `
            <div class="field">
              <div class="label">Education:</div>
              <div class="value">${data.education.replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}
            ${data.skills && data.skills.length > 0 ? `
            <div class="field">
              <div class="label">Skills:</div>
              <div class="value">
                <div class="skills">
                  ${data.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
                </div>
              </div>
            </div>
            ` : ''}
            ${data.coverLetter ? `
            <div class="field">
              <div class="label">Cover Letter:</div>
              <div class="value">${data.coverLetter.replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Resume:</div>
              <div class="value">${data.resumeFile ? 'Attached to this email' : 'No resume uploaded'}</div>
            </div>
            <div class="field">
              <div class="label">Submitted:</div>
              <div class="value">${new Date().toLocaleString()}</div>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from the VCAS website job application form.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  generateJobApplicationConfirmationTemplate(data) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Thank you for applying to VCAS</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9fafb; }
          .message { margin-bottom: 20px; padding: 15px; background: white; border-radius: 5px; border-left: 4px solid #2563eb; }
          .details { margin-bottom: 20px; }
          .field { margin-bottom: 10px; }
          .label { font-weight: bold; color: #374151; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
          .button { display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
          .timeline { background: white; padding: 15px; border-radius: 5px; margin: 15px 0; }
          .step { margin-bottom: 10px; padding-left: 20px; position: relative; }
          .step:before { content: "✓"; color: #2563eb; font-weight: bold; position: absolute; left: 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Applying to VCAS!</h1>
          </div>
          <div class="content">
            <div class="message">
              <p>Dear ${data.name},</p>
              <p>Thank you for your interest in the <strong>${data.position}</strong> position at VCAS. We have successfully received your application and our hiring team will review it carefully.</p>
            </div>
            
            <div class="details">
              <h3>Your Application Details:</h3>
              <div class="field">
                <div class="label">Position Applied:</div>
                <div>${data.position}</div>
              </div>
              ${data.phone ? `
              <div class="field">
                <div class="label">Contact Email:</div>
                <div>${data.email}</div>
              </div>
              <div class="field">
                <div class="label">Contact Phone:</div>
                <div>${data.phone}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Resume:</div>
                <div>${data.resumeFile ? 'Successfully uploaded' : 'No resume uploaded'}</div>
              </div>
            </div>

            <div class="timeline">
              <h3>What happens next?</h3>
              <div class="step">Our hiring team will review your application</div>
              <div class="step">If your profile matches our requirements, we'll contact you within 5-7 business days</div>
              <div class="step">You may be invited for an initial phone screening</div>
              <div class="step">Selected candidates will proceed to technical interviews</div>
              <div class="step">Final decision and offer process</div>
            </div>

            <div class="message">
              <p><strong>Tips for the next steps:</strong></p>
              <ul>
                <li>Keep an eye on your email for updates from our team</li>
                <li>Make sure your contact information is up to date</li>
                <li>Prepare to discuss your experience and skills</li>
                <li>Research VCAS to learn more about our company culture</li>
              </ul>
            </div>

            <div style="text-align: center;">
              <a href="https://vcas.com/careers" class="button">View More Opportunities</a>
            </div>
          </div>
          <div class="footer">
            <p>This is an automated confirmation email. Please do not reply to this message.</p>
            <p>For inquiries, please contact our HR team at hr@vcas.com</p>
            <p>© 2024 VCAS. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

// Factory function to create email service when needed
function createEmailService() {
  return new EmailService();
}

export default createEmailService;
