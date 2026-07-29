import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Mail, Phone, MapPin, CheckCircle, MessageSquare } from "lucide-react";
import GitHubIcon from "./ui/GitHubIcon";
import { personalInfo } from "../data/portfolio";
import { SectionHeading, FadeIn } from "./ui/SectionHeading";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: Phone,
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/\s/g, "")}`,
    color: "from-secondary/20 to-secondary/5",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Aurangabad, Maharashtra",
    color: "from-accent/20 to-accent/5",
  },
];

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

  return (
    <section id="contact" className="relative py-28 md:py-36">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/8 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 section-divider top-0" />

      <div className="section-container relative">
        <SectionHeading
          number="08"
          subtitle="Contact"
          title="Let's Build Together"
          description="Ready to discuss your next AI project? I'd love to hear from you."
        />

        <div className="grid lg:grid-cols-12 gap-8">
          <FadeIn direction="left" className="lg:col-span-5">
            <div className="space-y-4 mb-8">
              {contactMethods.map((method) => (
                <motion.div
                  key={method.label}
                  whileHover={{ x: 4 }}
                  className={`glass-card rounded-2xl p-5 bg-gradient-to-r ${method.color}`}
                >
                  {method.href ? (
                    <a href={method.href} className="flex items-center gap-4 group">
                      <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center border border-white/8">
                        <method.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-0.5">
                          {method.label}
                        </p>
                        <p className="text-sm text-slate-200 group-hover:text-white transition-colors">
                          {method.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center border border-white/8">
                        <method.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-0.5">
                          {method.label}
                        </p>
                        <p className="text-sm text-slate-200">{method.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="flex gap-3">
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 btn-secondary flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold"
              >
                <GitHubIcon className="w-4 h-4" />
                GitHub
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex-1 btn-primary flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold"
              >
                <Mail className="w-4 h-4" />
                Email Me
              </a>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.15} className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 md:p-10 gradient-border">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold">Send a Message</h3>
                  <p className="text-xs text-slate-500">I'll get back to you within 24 hours</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-3.5 rounded-xl bg-black/30 border border-white/8 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 outline-none transition-all text-white placeholder:text-slate-600 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@company.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-black/30 border border-white/8 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 outline-none transition-all text-white placeholder:text-slate-600 text-sm"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="subject" className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="AI Project Collaboration"
                  className="w-full px-4 py-3.5 rounded-xl bg-black/30 border border-white/8 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 outline-none transition-all text-white placeholder:text-slate-600 text-sm"
                />
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project requirements..."
                  className="w-full px-4 py-3.5 rounded-xl bg-black/30 border border-white/8 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 outline-none transition-all text-white placeholder:text-slate-600 resize-none text-sm"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full btn-primary flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm"
              >
                <span className="flex items-center justify-center gap-2" aria-live="polite" role="status">
                  {submitted ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Opening Email Client...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
