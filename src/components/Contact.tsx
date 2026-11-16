import { useState, type FormEvent } from 'react';
import { Download, Mail, MessageCircle, Phone, Send } from 'lucide-react';
import { contact, site } from '../data/site';
import { track } from '../lib/analytics';
import { Reveal } from './Reveal';
import SectionHeading from './SectionHeading';

type Status = 'idle' | 'sending' | 'success' | 'error';
const tel = contact.phone.replace(/[^\d+]/g, '');
const field =
  'w-full border border-paper/30 bg-transparent px-4 py-3.5 text-paper placeholder:text-paper/50 focus:border-accent focus:outline-none';

export default function Contact() {
  const dev = import.meta.env.DEV;
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const configured = Boolean(contact.formEndpoint || contact.email);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get('company')) return; // honeypot
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const subject = String(data.get('subject') || '').trim();
    const message = String(data.get('message') || '').trim();
    if (!name || !email || !message) {
      setStatus('error');
      setError('Please fill in your name, email and message.');
      return;
    }
    if (!configured) {
      setStatus('error');
      setError(dev ? 'No contact method is configured yet (set contact.email or contact.formEndpoint in src/data/site.ts).' : 'The form is temporarily unavailable. Please contact directly by email or phone.');
      return;
    }
    track('contact_form_submit', { method: contact.formEndpoint ? 'endpoint' : 'mailto' });
    if (contact.formEndpoint) {
      setStatus('sending');
      try {
        const res = await fetch(contact.formEndpoint, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, subject, message }),
        });
        if (!res.ok) throw new Error('bad status');
        setStatus('success');
        form.reset();
      } catch {
        setStatus('error');
        setError('Your message could not be sent. Please try again or contact directly.');
      }
      return;
    }
    const body = `${message}\n\n— ${name} (${email})`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject || `Enquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
    setStatus('success');
    form.reset();
  }

  const rows = [
    contact.email && { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}`, ev: 'email_click' },
    contact.phone && { icon: Phone, label: 'Phone', value: contact.phone, href: `tel:${tel}`, ev: 'phone_click' },
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href: string; ev: string }[];

  return (
    <section id="contact" className="bg-ink py-28 text-paper md:py-40" data-dark>
      <div className="container-page grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading index="07" label="Contact" title={contact.heading} dark />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-paper/80">{contact.text}</p>

            <ul className="mt-10 space-y-5">
              {rows.map((r) => (
                <li key={r.label}>
                  <a
                    href={r.href}
                    onClick={() => track(r.ev, { location: 'contact' })}
                    className="group flex items-center gap-4 border-b border-paper/20 pb-4 transition-colors hover:border-accent"
                  >
                    <r.icon size={18} className="text-accent" aria-hidden="true" />
                    <span>
                      <span className="label block text-paper/60">{r.label}</span>
                      <span className="break-all text-lg">{r.value}</span>
                    </span>
                  </a>
                </li>
              ))}
              {contact.location && (
                <li className="label text-paper/70">{contact.location}</li>
              )}
              {dev && !contact.location && <li className="label text-accent">Dev: location hidden until supplied</li>}
            </ul>

            <div className="mt-10 flex flex-wrap gap-4">
              {contact.whatsapp && (
                <a
                  href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(`Hello ${site.name}, I would like to discuss a project.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('whatsapp_click', { location: 'contact' })}
                  className="btn btn-light"
                >
                  <MessageCircle size={16} aria-hidden="true" /> WhatsApp
                </a>
              )}
              {contact.cvUrl && (
                <a href={contact.cvUrl} download onClick={() => track('cv_download')} className="btn btn-ghost-light">
                  <Download size={16} aria-hidden="true" /> Download CV
                </a>
              )}
              {contact.linkedin && (
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
                  LinkedIn
                </a>
              )}
              {contact.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
                  {s.label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-7">
          <form onSubmit={onSubmit} noValidate={false} className="space-y-6" aria-describedby="form-privacy">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="label mb-2 block text-paper/70">Name *</span>
                <input name="name" type="text" required autoComplete="name" className={field} placeholder="Your name" />
              </label>
              <label className="block">
                <span className="label mb-2 block text-paper/70">Email *</span>
                <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@example.com" />
              </label>
            </div>
            <label className="block">
              <span className="label mb-2 block text-paper/70">Subject</span>
              <input name="subject" type="text" className={field} placeholder="Project type or topic" />
            </label>
            <label className="block">
              <span className="label mb-2 block text-paper/70">Message *</span>
              <textarea name="message" required rows={6} className={field} placeholder="Tell me about your project" />
            </label>
            {/* Honeypot: hidden from people, filled by bots. */}
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
              <label>
                Company
                <input name="company" type="text" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <p id="form-privacy" className="text-sm text-paper/65">
              {contact.privacyNote}
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <button type="submit" disabled={status === 'sending'} className="btn btn-light disabled:opacity-60">
                {status === 'sending' ? 'Sending…' : contact.cta} <Send size={16} aria-hidden="true" />
              </button>
              <div role="status" aria-live="polite" className="text-sm">
                {status === 'success' && <p className="text-accent">Thank you — your message is on its way.</p>}
                {status === 'error' && (
                  <p role="alert" className="text-[#f0b4a8]">
                    {error}
                  </p>
                )}
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
