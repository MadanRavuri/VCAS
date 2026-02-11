import React, { useState, useRef, useEffect } from 'react';
import { Upload, Check, Loader2, FileText, ArrowLeft, X } from 'lucide-react';

const ApplicationPage: React.FC<{ onNavigate: (page: any) => void; initialPosition?: string }> = ({ onNavigate, initialPosition }) => {

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        position: initialPosition || 'General Application',
        coverLetter: ''
    });
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (initialPosition) {
            setFormData(prev => ({ ...prev, position: initialPosition }));
        }
    }, [initialPosition]);

    useEffect(() => {
        // Scroll to top on mount
        const rightPanel = document.getElementById('right-panel');
        if (rightPanel) {
            rightPanel.scrollTo({ top: 0, behavior: 'auto' });
        } else {
            window.scrollTo(0, 0);
        }
    }, []);

    const timerRef = useRef<any>(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.fullName) newErrors.fullName = 'Full Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.position) newErrors.position = 'Position is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.fullName);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('position', formData.position);
            formDataToSend.append('experience', '');
            formDataToSend.append('education', '');
            formDataToSend.append('skills', '[]');
            formDataToSend.append('coverLetter', formData.coverLetter);
            
            if (file) {
                formDataToSend.append('resumeFile', file);
            }

            const response = await fetch('/api/resume', {
                method: 'POST',
                body: formDataToSend,
            });

            // Check if response is OK before parsing JSON
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server response:', errorText);
                
                // Try to parse as JSON, fallback to text
                let errorMessage = 'Server error occurred';
                try {
                    const errorData = JSON.parse(errorText);
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch (e) {
                    errorMessage = errorText || errorMessage;
                }
                
                throw new Error(errorMessage);
            }

            const data = await response.json();

            if (data.success) {
                setIsSuccess(true);
                timerRef.current = setTimeout(() => {
                    setIsSuccess(false);
                    setFormData({ fullName: '', email: '', phone: '', position: 'General Application', coverLetter: '' });
                    setFile(null);
                    onNavigate('career');
                }, 3000);
            } else {
                alert(data.message || "Failed to submit application. Please try again.");
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            alert("Network error. Please check your connection and try again.");
        } finally {
            setIsSubmitting(false);
        }
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

    if (isSuccess) {
        return (
            <div className="min-h-screen py-24 flex items-center justify-center container mx-auto px-6">
                <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-2xl text-center max-w-2xl w-full animate-float">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                        <Check className="w-12 h-12 text-green-500" />
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
                    <p className="text-gray-600 text-lg mb-8">Thank you for your interest in joining VCAS. Our team will review your application and get back to you shortly.</p>
                    <button
                        onClick={() => onNavigate('career')}
                        className="px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                        Back to Careers
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-24 container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => onNavigate('career')}
                    className="flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors group font-medium"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Careers
                </button>

                <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-2xl relative overflow-hidden">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

                    <div className="mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Apply to <span className="text-primary">VCAS</span></h1>
                        <p className="text-gray-600 text-lg">Fill in your details below. For general applications, tell us about your skills and interests.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Full Name *</label>
                                <input
                                    type="text"
                                    className={`w-full bg-gray-50 border ${errors.fullName ? 'border-red-500' : 'border-gray-200'} rounded-xl px-5 py-4 text-gray-900 focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all`}
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                />
                                {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Email Address *</label>
                                <input
                                    type="email"
                                    className={`w-full bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl px-5 py-4 text-gray-900 focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all`}
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-gray-900 focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                                    placeholder="+81 90-1234-5678"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>

                            {/* Position */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Position *</label>
                                <select
                                    className={`w-full bg-gray-50 border ${errors.position ? 'border-red-500' : 'border-gray-200'} rounded-xl px-5 py-4 text-gray-900 focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all appearance-none cursor-pointer`}
                                    value={formData.position}
                                    onChange={e => setFormData({ ...formData, position: e.target.value })}
                                >
                                    <option value="">Select a position</option>
                                    <option value="General Application">General Application</option>
                                    <option value="Bilingual Java Full Stack Developer">Bilingual Java Full Stack Developer</option>
                                    <option value="Bilingual Project Manager">Bilingual Project Manager</option>
                                    <option value="Bilingual PMO Consultant">Bilingual PMO Consultant</option>
                                    <option value="Japanese Translator / Interpreter">Japanese Translator / Interpreter</option>
                                </select>
                                {errors.position && <p className="text-xs text-red-500">{errors.position}</p>}
                            </div>
                        </div>

                        {/* Resume Upload */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Resume / CV</label>
                            <div
                                className={`border-2 border-dashed ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-200 bg-gray-50'} rounded-xl p-10 text-center transition-all cursor-pointer hover:border-primary/50 hover:bg-white group`}
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
                                    <div className="flex items-center justify-center gap-4 text-primary font-medium">
                                        <FileText className="w-8 h-8" />
                                        <span className="text-lg text-gray-900">{file.name}</span>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setFile(null);
                                            }}
                                            className="p-2 hover:bg-gray-200 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="w-16 h-16 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Upload className="w-8 h-8 text-primary/60 group-hover:text-primary transition-colors" />
                                        </div>
                                        <p className="text-gray-900 font-bold text-lg mb-2">Click to upload or drag and drop</p>
                                        <p className="text-sm text-gray-500">PDF, DOC, DOCX (Max 10MB)</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Cover Letter */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Cover Letter</label>
                            <textarea
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-gray-900 focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all h-40 resize-none placeholder:text-gray-400"
                                placeholder="Tell us why you're a great fit..."
                                value={formData.coverLetter}
                                onChange={e => setFormData({ ...formData, coverLetter: e.target.value })}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-5 rounded-full bg-primary text-white font-bold text-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    Submitting Application...
                                </>
                            ) : (
                                <>
                                    Submit Application
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ApplicationPage;
