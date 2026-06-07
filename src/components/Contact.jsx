import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import GitHubIcon from "./ui/GitHubIcon";
import { personalInfo } from "../data/portfolio";
import { SectionHeading, FadeIn } from "./ui/SectionHeading";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      formData.subject || "Portfolio Contact"
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          subtitle="Contact"
          title="Let's Connect"
          description="Have a project in mind? Let's build something intelligent together."
        />

        <div className="grid lg:grid-cols-5 gap-10">
          <FadeIn direction="left" className="lg:col-span-2">
            <div className="space-y-6">
              <div className="glass rounded-2xl p-6 gradient-border">
                <h3 className="text-xl font-bold mb-6">Get in Touch</h3>
                <div className="space-y-5">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">Email</p>
                      <p className="text-slate-300 group-hover:text-white transition-colors text-sm">
                        {personalInfo.email}
                      </p>
                    </div>
                  </a>

                  <a href={`tel:${personalInfo.phone.replace(/\s/g, "")}`} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                      <Phone className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">Phone</p>
                      <p className="text-slate-300 group-hover:text-white transition-colors text-sm">
                        {personalInfo.phone}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">Location</p>
                      <p className="text-slate-300 text-sm">Aurangabad, Maharashtra, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl glass hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <GitHubIcon className="w-5 h-5" />
                  <span className="font-medium">GitHub</span>
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
                >
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">Email</span>
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 gradient-border">
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-white placeholder:text-slate-600"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-white placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="subject" className="block text-sm font-medium text-slate-400 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project inquiry"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-white placeholder:text-slate-600"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-white placeholder:text-slate-600 resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent font-semibold hover:shadow-xl hover:shadow-primary/30 transition-shadow duration-300"
              >
                {submitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Opening Email Client...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
