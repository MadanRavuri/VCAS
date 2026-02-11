import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import Resume from '../models/Resume.js';
import createEmailService from '../utils/emailService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
    }
  }
});

// POST /api/resume - Submit job application
router.post('/', upload.single('resumeFile'), async (req, res) => {
  try {
    const { name, email, phone, position, experience, education, skills, coverLetter } = req.body;

    // Validation
    if (!name || !email || !position) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and position'
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

    // Convert file to base64 if uploaded
    let resumeFileBase64 = '';
    if (req.file) {
      resumeFileBase64 = req.file.buffer.toString('base64');
    }

    // Parse skills if it's a string
    let parsedSkills = [];
    if (skills) {
      try {
        parsedSkills = Array.isArray(skills) ? skills : JSON.parse(skills);
      } catch (e) {
        parsedSkills = skills.split(',').map(skill => skill.trim()).filter(skill => skill);
      }
    }

    // Create new resume submission
    const newResume = new Resume({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone ? phone.trim() : '',
      position: position.trim(),
      experience: experience ? experience.trim() : '',
      education: education ? education.trim() : '',
      skills: parsedSkills,
      resumeFile: resumeFileBase64,
      coverLetter: coverLetter ? coverLetter.trim() : ''
    });

    // Save to database
    const savedResume = await newResume.save();

    // Create email service instance after environment variables are loaded
    const emailService = createEmailService();

    // Send email notification to HR
    const emailResult = await emailService.sendJobApplicationEmail({
      name: savedResume.name,
      email: savedResume.email,
      phone: savedResume.phone,
      position: savedResume.position,
      experience: savedResume.experience,
      education: savedResume.education,
      skills: savedResume.skills,
      coverLetter: savedResume.coverLetter,
      resumeFile: savedResume.resumeFile
    });

    if (!emailResult.success) {
      console.error('Failed to send job application email:', emailResult.error);
      // Continue with response even if email fails
    }

    // Send confirmation email to applicant
    const confirmationResult = await emailService.sendJobApplicationConfirmationEmail({
      name: savedResume.name,
      email: savedResume.email,
      phone: savedResume.phone,
      position: savedResume.position,
      experience: savedResume.experience,
      education: savedResume.education,
      skills: savedResume.skills,
      coverLetter: savedResume.coverLetter,
      resumeFile: savedResume.resumeFile
    });

    if (!confirmationResult.success) {
      console.error('Failed to send job application confirmation email:', confirmationResult.error);
      // Continue with response even if confirmation email fails
    }

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      data: {
        id: savedResume._id,
        name: savedResume.name,
        email: savedResume.email,
        position: savedResume.position,
        createdAt: savedResume.createdAt
      }
    });

  } catch (error) {
    console.error('Resume submission error:', error);
    
    // Handle multer errors
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File size too large. Maximum size is 10MB'
        });
      }
      return res.status(400).json({
        success: false,
        message: 'File upload error: ' + error.message
      });
    }

    // Handle file type errors
    if (error.message === 'Only PDF, DOC, and DOCX files are allowed') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }

    // Handle database connection errors
    if (error.name === 'MongoNetworkError' || error.name === 'MongoTimeoutError') {
      return res.status(503).json({
        success: false,
        message: 'Database connection error. Please try again later.'
      });
    }

    // Generic error - always return JSON
    res.status(500).json({
      success: false,
      message: 'Failed to submit application. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/resume - Get all resume submissions (admin endpoint)
router.get('/', async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: resumes.length,
      data: resumes
    });

  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch resume submissions'
    });
  }
});

// GET /api/resume/:id - Get specific resume submission
router.get('/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume submission not found'
      });
    }

    res.status(200).json({
      success: true,
      data: resume
    });

  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch resume submission'
    });
  }
});

// GET /api/resume/:id/download - Download resume file
router.get('/:id/download', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume submission not found'
      });
    }

    if (!resume.resumeFile) {
      return res.status(404).json({
        success: false,
        message: 'No resume file found'
      });
    }

    // Convert base64 back to buffer
    const fileBuffer = Buffer.from(resume.resumeFile, 'base64');
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${resume.name.replace(/\s+/g, '_')}_resume.pdf"`);
    res.send(fileBuffer);

  } catch (error) {
    console.error('Error downloading resume:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to download resume'
    });
  }
});

// DELETE /api/resume/:id - Delete resume submission
router.delete('/:id', async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);
    
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume submission not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Resume submission deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting resume:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete resume submission'
    });
  }
});

export default router;
