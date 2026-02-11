import express from 'express';
import Contact from '../models/Contact.js';
import createEmailService from '../utils/emailService.js';

const router = express.Router();

// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Create new contact submission
    const newContact = new Contact({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone ? phone.trim() : '',
      subject: subject.trim(),
      message: message.trim()
    });

    // Save to database
    const savedContact = await newContact.save();

    // Create email service instance after environment variables are loaded
    const emailService = createEmailService();

    // Send email notification to HR
    const emailResult = await emailService.sendContactEmail({
      name: savedContact.name,
      email: savedContact.email,
      phone: savedContact.phone,
      subject: savedContact.subject,
      message: savedContact.message
    });

    if (!emailResult.success) {
      console.error('Failed to send contact email:', emailResult.error);
      // Continue with response even if email fails
    }

    // Send confirmation email to customer
    const confirmationResult = await emailService.sendContactConfirmationEmail({
      name: savedContact.name,
      email: savedContact.email,
      subject: savedContact.subject,
      message: savedContact.message
    });

    if (!confirmationResult.success) {
      console.error('Failed to send contact confirmation email:', confirmationResult.error);
      // Continue with response even if confirmation email fails
    }

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully!',
      data: {
        id: savedContact._id,
        name: savedContact.name,
        email: savedContact.email,
        subject: savedContact.subject,
        createdAt: savedContact.createdAt
      }
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again later.'
    });
  }
});

// GET /api/contact - Get all contact submissions (admin endpoint)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });

  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact submissions'
    });
  }
});

// GET /api/contact/:id - Get specific contact submission
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });

  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact submission'
    });
  }
});

// DELETE /api/contact/:id - Delete contact submission
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact submission deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact submission'
    });
  }
});

export default router;
