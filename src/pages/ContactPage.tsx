import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, Clock } from 'lucide-react';
import BackgroundVideo from '../components/BackgroundVideo';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      } else {
        alert(data.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: <Mail className="w-6 h-6" />, label: "Email", value: "business@vcasconsulting.com", href: "mailto:business@vcasconsulting.com" },
    { icon: <Phone className="w-6 h-6" />, label: "Phone", value: "044-400-1821", href: "tel:0444001821" },
    { icon: <MapPin className="w-6 h-6" />, label: "Office", value: <span className="block leading-relaxed">Kanagawa-ken,<br />Kawasaki-shi,<br />Kawasaki-ku,<br />Shimonamiki 11-5-4-809</span>, href: "#" }
  ];

  return (
    <div className="pb-24">
      {/* Hero Section with Video */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <BackgroundVideo
            src="/contact.mp4"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/40 to-transparent" />
        </div>
      </section>

      {/* Contact Content & Form Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-center">

            {/* Left Side: Content Section */}
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900 tracking-tight">
                Let's <span className="text-primary">Connect</span>
              </h2>
              <p className="text-gray-600 text-lg mb-12 leading-relaxed">
                Whether you have a question about our services, pricing, or want to discuss a potential collaboration, our team is ready to answer all your questions.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, i) => (
                  <a
                    key={i}
                    href={info.href}
                    className="flex items-center gap-6 p-6 rounded-3xl bg-white border border-gray-100 shadow-md hover:shadow-xl hover:border-primary/20 transition-all group hover:-translate-y-1 overflow-hidden"
                  >
                    <div className="w-14 h-14 min-w-[3.5rem] rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      {info.icon}
                    </div>
                    <div className="flex flex-col justify-center w-full">
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{info.label}</div>
                      <div className={`font-bold text-gray-900 whitespace-normal leading-snug ${info.label === 'Email' ? 'text-sm' : 'text-lg'}`}>{info.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Right Side: Contact Form Card */}
            <div className="p-10 rounded-3xl relative overflow-hidden shadow-2xl border border-white/10"
              style={{
                background: 'linear-gradient(rgba(8, 25, 60, 0.85), rgba(15, 45, 95, 0.85)), url("/service.mp4")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}>

              <div className="absolute inset-0 backdrop-blur-[2px] -z-10"></div>

              <h3 className="text-2xl font-black mb-8 text-white relative z-10">Send us a message</h3>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white uppercase tracking-widest pl-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-6 py-4 rounded-xl focus:outline-none transition-all placeholder:text-white/60 text-white border border-white/15 focus:border-blue-400"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-white uppercase tracking-widest pl-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 rounded-xl focus:outline-none transition-all placeholder:text-white/60 text-white border border-white/15 focus:border-blue-400"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-white uppercase tracking-widest pl-2">Subject</label>
                  <div className="relative">
                    <select
                      className="w-full px-6 py-4 rounded-xl focus:outline-none transition-all text-white appearance-none cursor-pointer border border-white/15 focus:border-blue-400 [&>option]:text-gray-900"
                      style={{ background: 'rgba(255,255,255,0.08)' }}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Project Proposal">Project Proposal</option>
                      <option value="Careers">Careers</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/60">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-white uppercase tracking-widest pl-2">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your project..."
                    className="w-full px-6 py-4 rounded-xl focus:outline-none transition-all placeholder:text-white/60 resize-none text-white border border-white/15 focus:border-blue-400"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-full text-white font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-blue-500/30 ${isSubmitting ? 'opacity-80 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
                  style={{ background: 'linear-gradient(to right, #2563eb, #3b82f6)' }}
                >
                  {isSubmitting ? (
                    <>Sending... <Loader2 className="w-5 h-5 animate-spin" /></>
                  ) : (
                    <>Submit Request <Send className="w-5 h-5" /></>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Find Us Section */}
      <section className="py-24 bg-muted relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left Side: Office Details */}
            <div className="flex flex-col justify-center space-y-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900 tracking-tight">
                  Find <span className="text-primary">Us</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Visit our office to discuss your business and IT initiatives in person. We are centrally located and easy to reach.
                </p>
              </div>

              <div className="space-y-8">
                {/* Location Block */}
                <div className="flex items-start gap-6 p-6 rounded-3xl bg-white border border-gray-100 shadow-md group hover:shadow-lg hover:border-primary/30 transition-all">
                  <div className="w-14 h-14 min-w-[3.5rem] rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform mt-1">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">VCAS Location</div>
                    <div className="text-lg font-bold text-gray-900 leading-relaxed">
                      Kanagawa-ken,<br />Kawasaki-Shi,<br />Kawasaki-ku,<br />Shimonamiki 11-5-4-809
                    </div>
                  </div>
                </div>

                {/* Hours Block */}
                <div className="flex items-start gap-6 p-6 rounded-3xl bg-white border border-gray-100 shadow-md group hover:shadow-lg hover:border-primary/30 transition-all">
                  <div className="w-14 h-14 min-w-[3.5rem] rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform mt-1">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Hours</div>
                    <div className="text-xs sm:text-base font-bold text-gray-900 leading-relaxed whitespace-nowrap">
                      Mon – Fri: 9:00 AM – 6:00 PM
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Map */}
            <div className="h-[500px] w-full rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-xl relative group">
              <iframe
                src="https://maps.google.com/maps?q=11-5-4-809%20Shimonamiki%2C%20Kawasaki-ku%2C%20Kawasaki-shi%2C%20Kanagawa-ken&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="VCAS Location Map"
                className="w-full h-full border-0 rounded-3xl"
              ></iframe>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
