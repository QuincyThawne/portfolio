import React, { useState } from 'react';
import portfolioData from '@/data/portfolioData';
import { Mail, MapPin, Send, Github, Linkedin, Twitter, CheckCircle, AlertCircle, Instagram, MessageCircle, Code2 } from 'lucide-react';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';
import emailjsConfig from '@/config/emailjs.config';

const ContactSection: React.FC = () => {
  const { contact, personal } = portfolioData;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'discord':
        return <MessageCircle className="w-5 h-5" />;
      case 'leetcode':
        return <Code2 className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check if EmailJS credentials are configured
      if (!emailjsConfig.serviceId || !emailjsConfig.templateId || !emailjsConfig.publicKey) {
        throw new Error('EmailJS not configured. Please set up environment variables.');
      }

      // Send email using EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: personal.name,
        time: new Date().toLocaleString(),
        title:'Message from Portfolio Contact Form'
      };

      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        templateParams,
        emailjsConfig.publicKey
      );
      
      // Show success notification
      toast.success('Message sent successfully!', {
        description: "Thanks for reaching out. I'll get back to you soon.",
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        duration: 5000,
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      
      // Show error notification
      toast.error('Failed to send message', {
        description: 'Please try again or email me directly at ' + personal.email,
        icon: <AlertCircle className="w-5 h-5 text-red-500" />,
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
          {contact.heading}
        </h2>
        <p className="text-sm md:text-base text-muted-foreground text-center mb-10 md:mb-12 max-w-xl mx-auto px-2">
          {contact.description}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Email Card */}
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border shadow-lg cursor-target">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a
                    href={`mailto:${personal.email}`}
                    className="text-foreground hover:text-primary transition-colors font-medium"
                  >
                    {personal.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-foreground font-medium">{personal.location}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border shadow-lg cursor-target">
              <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Connect with me</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {personal.socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 
                               text-muted-foreground hover:bg-primary/10 hover:text-primary 
                               transition-all duration-300"
                  >
                    {getIcon(link.platform)}
                    <span className="text-sm font-medium">{link.platform}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <div className="bg-green-500/10 rounded-2xl p-4 border border-green-500/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                  {contact.availability}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 bg-card/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border shadow-lg space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl
                             text-foreground placeholder:text-muted-foreground
                             focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                             transition-all duration-200"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl
                             text-foreground placeholder:text-muted-foreground
                             focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                             transition-all duration-200"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl
                           text-foreground placeholder:text-muted-foreground
                           focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                           transition-all duration-200 resize-none"
                placeholder="Tell me about your project or just say hi!"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 w-full
                         px-8 py-3.5 bg-primary text-primary-foreground rounded-xl font-medium
                         hover:opacity-90 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                         transition-all duration-300 shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
