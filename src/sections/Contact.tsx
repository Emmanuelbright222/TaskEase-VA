import { useState } from 'react';
import GradientHeading from '../components/ui/GradientHeading';
import SectionWrapper from '../components/ui/SectionWrapper';
import InputField from '../components/ui/InputField';
import TextareaField from '../components/ui/TextareaField';
import { sendContactMessage } from '../lib/resend';
import { createToast } from '../components/ui/ToastContainer';

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: (formData.get('company') as string) || undefined,
      message: formData.get('message') as string
    };

    setLoading(true);
    const toastId = typeof crypto?.randomUUID === 'function' ? crypto.randomUUID() : String(Date.now());

    try {
      await sendContactMessage(payload);
      event.currentTarget.reset();
      createToast.emit({ id: toastId, message: 'Message sent successfully', type: 'success' });
    } catch (error) {
      console.error(error);
      createToast.emit({ id: `${toastId}-error`, message: 'Unable to send message. Please email me directly.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionWrapper id="contact">
      <div className="space-y-3">
        <GradientHeading>Contact</GradientHeading>
        <h3 className="section-heading">Tell me about the operational fire to put out</h3>
        <p className="text-slate-500 dark:text-slate-300">
          I reply within 24 hours on weekdays. Your details are stored in Supabase so I can keep track of our conversations.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-6 rounded-3xl border border-white/20 bg-white/70 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/50">
        <div className="grid gap-4 md:grid-cols-2">
          <InputField label="Name" name="name" required />
          <InputField label="Email" name="email" type="email" required />
          <InputField label="Company" name="company" />
        </div>
        <TextareaField label="How can I help?" name="message" rows={5} required />
        <button type="submit" className="button-primary" disabled={loading}>
          {loading ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </SectionWrapper>
  );
};

export default Contact;
