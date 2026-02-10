import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Check, Loader2, FileText } from 'lucide-react';

interface ApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialPosition?: string;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose, initialPosition }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        position: initialPosition || '',
        coverLetter: ''
    });
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const fileInputRef = useRef<HTMLInputElement>(null);
    const timerRef = useRef<any>(null); // Use 'any' to accommodate NodeJS.Timeout or number

    // Prevent background scroll
    useEffect(() => {
        if (!isOpen) return;

        const rightPanel = document.getElementById('right-panel');
        // Capture specific elements to ensure strict cleanup
        const targetBody = document.body;

        // Apply locks
        targetBody.style.overflow = 'hidden';
        targetBody.classList.add('modal-open'); // Mark as open

        if (rightPanel) {
            rightPanel.style.overflow = 'hidden';
        }

        return () => {
            // Restore locks
            targetBody.style.overflow = '';
            targetBody.classList.remove('modal-open');
            targetBody.classList.remove('overflow-hidden');
            targetBody.classList.remove('no-scroll');

            // Re-query rightPanel to be safe, or use captured if valid
            const currentRightPanel = document.getElementById('right-panel');
            if (currentRightPanel) {
                currentRightPanel.style.overflow = '';
            } else if (rightPanel) {
                rightPanel.style.overflow = '';
            }
        };
    }, [isOpen]);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    useEffect(() => {
        if (isOpen && initialPosition) {
            setFormData(prev => ({ ...prev, position: initialPosition }));
        }
    }, [initialPosition, isOpen]);

    if (!isOpen) return null;


    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.fullName) newErrors.fullName = 'Full Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.position) newErrors.position = 'Position is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        // Simulate backend call
        timerRef.current = setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsSuccess(false);
                setFormData({ fullName: '', email: '', phone: '', position: '', coverLetter: '' });
                setFile(null);
            }, 2000);
        }, 2000);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            validateFile(e.target.files[0]);
        }
    };

    const validateFile = (file: File) => {
        // Check size (10MB) and type
        if (file.size > 10 * 1024 * 1024) {
            alert('File too large (Max 10MB)');
            return;
        }
        setFile(file);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-2xl bg-navy border border-gray-700 rounded-3xl shadow-2xl overflow-hidden animate-float">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-0 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-0 pointer-events-none" />

                <div className="relative z-10 p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Apply to VCAS</h2>
                            <p className="text-gray-400">Fill in your details and upload your resume.</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                                <Check className="w-10 h-10 text-green-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Application Submitted!</h3>
                            <p className="text-gray-400">Thank you for your interest. We will review your application and get back to you soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-300">Full Name *</label>
                                    <input
                                        type="text"
                                        className={`w-full bg-white/5 border ${errors.fullName ? 'border-red-500' : 'border-white/10'} rounded-xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors`}
                                        placeholder="John Doe"
                                        value={formData.fullName}
                                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                    />
                                    {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-300">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors"
                                        placeholder="+81 90-1234-5678"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-300">Email Address *</label>
                                    <input
                                        type="email"
                                        className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors`}
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                                </div>

                                {/* Position */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-300">Position *</label>
                                    <select
                                        className={`w-full bg-white/5 border ${errors.position ? 'border-red-500' : 'border-white/10'} rounded-xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors [&>option]:bg-navy`}
                                        value={formData.position}
                                        onChange={e => setFormData({ ...formData, position: e.target.value })}
                                    >
                                        <option value="">Select a position</option>
                                        <option value="Bilingual Java Full Stack Developer">Bilingual Java Full Stack Developer</option>
                                        <option value="Bilingual Project Manager">Bilingual Project Manager</option>
                                        <option value="Bilingual PMO Consultant">Bilingual PMO Consultant</option>
                                        <option value="Japanese Translator / Interpreter">Japanese Translator / Interpreter</option>
                                        <option value="General Application">General Application</option>
                                    </select>
                                    {errors.position && <p className="text-xs text-red-500">{errors.position}</p>}
                                </div>
                            </div>

                            {/* Resume Upload */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-300">Resume / CV</label>
                                <div
                                    className={`border-2 border-dashed ${isDragging ? 'border-primary bg-primary/10' : 'border-white/10 bg-white/5'} rounded-xl p-8 text-center transition-all cursor-pointer hover:border-primary/50`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFileSelect}
                                    />
                                    {file ? (
                                        <div className="flex items-center justify-center gap-3 text-primary font-medium">
                                            <FileText className="w-6 h-6" />
                                            <span>{file.name}</span>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setFile(null);
                                                }}
                                                className="p-1 hover:bg-white/10 rounded-full text-gray-400 hover:text-white"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                                                <Upload className="w-6 h-6 text-gray-400" />
                                            </div>
                                            <p className="text-gray-300 font-medium mb-1">Click to upload or drag and drop</p>
                                            <p className="text-sm text-gray-500">PDF, DOC, DOCX (Max 10MB)</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Cover Letter */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-300">Cover Letter</label>
                                <textarea
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors h-32 resize-none"
                                    placeholder="Tell us why you're a great fit..."
                                    value={formData.coverLetter}
                                    onChange={e => setFormData({ ...formData, coverLetter: e.target.value })}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Application'
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplicationModal;
