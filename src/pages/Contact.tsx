
import { useState } from 'react';
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Navbar from '../components/Navbar';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We've received your message and will get back to you soon.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pt-24">
      <Navbar />
      <Container className="py-12 md:py-16">
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          <div className="space-y-3 animate-fade-in">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-muted-foreground text-lg">
              We'd love to hear from you! Reach out with any questions or feedback.
            </p>
          </div>
          <Separator className="bg-gradient-to-r from-primary/20 to-primary/5" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-8 animate-slide-up">
              <div className="bg-secondary/30 p-6 rounded-xl border border-border/50 hover:shadow-md transition-all">
                <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <a href="mailto:info@recfit.com" className="text-primary hover:underline">
                        info@recfit.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <a href="tel:+15551234567" className="hover:text-primary">
                        (555) 123-4567
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-foreground/80">
                        123 Recreation Avenue<br />
                        Fitness City, FC 12345
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden border border-border h-[250px] shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.3063874233135!2d-74.00597485!3d40.7127753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDE4JzM0LjQiTiA4NMKwMjUnMTQuMCJX!5e0!3m2!1sen!2sus!4v1620293521378!5m2!1sen!2sus"
                  className="w-full h-full border-0"
                  loading="lazy"
                  title="Location Map"
                />
              </div>
            </div>
            
            <div className="bg-white dark:bg-secondary/20 rounded-xl p-6 md:p-8 shadow-sm border border-border/50 animate-slide-up" style={{animationDelay: '150ms'}}>
              <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    rows={5}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
          
          <div className="mt-12 bg-gradient-to-r from-secondary to-secondary/20 p-8 rounded-xl text-center">
            <h3 className="text-xl font-medium mb-3">Join Our Community</h3>
            <p>Follow us on social media to stay updated with the latest fitness trends and events.</p>
            <div className="flex justify-center gap-4 mt-5">
              {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map(platform => (
                <div 
                  key={platform} 
                  className="p-3 bg-white/70 dark:bg-secondary/70 rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer"
                >
                  {platform.charAt(0)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
