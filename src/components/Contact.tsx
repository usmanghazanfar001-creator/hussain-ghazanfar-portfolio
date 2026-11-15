import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Linkedin, Mail, MapPin, MessageCircle, Phone, User } from 'lucide-react';
import { contact, site } from '../data/site';
import { Reveal } from './Reveal';
import SectionHeading from './SectionHeading';

type Values = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;
type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'demo' | 'error';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!emailRe.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  if (v.message.trim().length < 10) e.message = 'Please write at least 10 characters.';
  return e;
}

const waLink = (number: string) =>
  `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${site.name}, I would like to discuss a project.`)}`;

interface RowProps {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
  placeholder: string;
  external?: boolean;
}

function Row({ icon: Icon, label, value, href, placeholder, external }: RowProps) {
  return (
    <li className="flex items-start gap-5 border-t border-paper/15 py-5">
      <Icon size={20} strokeWidth={1.3} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
      <div className="min-w-0">
        <p className="label text-paper/60">{label}</p>
        {value ? (
          href ? (
            <a
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="mt-1 block break-words font-display text-2xl text-paper underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              {value}
            </a>
          ) : (
            <p className="mt-1 break-words font-display text-2xl text-paper">{value}</p>
          )
        ) : (
          <p className="mt-1 font-display text-2xl italic text-paper/45">
            {placeholder} <span className="label ml-2 not-italic !text-[10px] text-accent">Placeholder</span>
          </p>
        )}
      </div>
    </li>
  );
}

export default function Contact() {
  const [values, setValues] = useState<Values>({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const errors = validate(values);

  const show = (k: keyof Values) => (touched[k] ? errors[k] : undefined);
  const set = (k: keyof Values) => (e: { target: { value: string } }) => setValues((v) => ({ ...v, [k]: e.target.value }));
  const blur = (k: keyof Values) => () => setTouched((t) => ({ ...t, [k]: true }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errors).length) return;

    if (contact.formEndpoint) {
      setStatus('sending');
      try {
        const res = await fetch(contact.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error('Request failed');
        setStatus('sent');
        setValues({ name: '', email: '', message: '' });
        setTouched({});
      } catch {
        setStatus('error');
      }
    } else if (contact.email) {
      const subject = encodeURIComponent(`Project enquiry from ${values.name.trim()}`);
      const body = encodeURIComponent(`${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`);
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
      setStatus('mailto');
    } else {
      setStatus('demo');
    }
  }

  const field =
    'w-full border-b bg-transparent py-3 text-base text-ink placeholder:text-muted-strong/70 focus:border-ink focus:outline-none';

  return (
    <section id="contact" className="bg-ink py-28 text-paper md:py-40" data-dark>
      <div className="container-page grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading index="07" label="Contact" title={contact.heading} dark>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-paper/75">{contact.text}</p>
          </SectionHeading>

          <Reveal delay={0.1} className="mt-14">
            <ul>
              <Row icon={User} label="Name" value={site.name} placeholder="" />
              <Row icon={Mail} label="Email" value={contact.email} href={`mailto:${contact.email}`} placeholder="email@yourdomain.com" />
              <Row icon={Phone} label="Phone" value={contact.phone} href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`} placeholder="+00 000 0000000" />
              <Row icon={MessageCircle} label="WhatsApp" value={contact.whatsapp ? `+${contact.whatsapp.replace(/\D/g, '')}` : ''} href={contact.whatsapp ? waLink(contact.whatsapp) : undefined} placeholder="WhatsApp number" external />
              <Row icon={Linkedin} label="LinkedIn" value={contact.linkedin ? contact.linkedin.replace(/^https?:\/\/(www\.)?/, '') : ''} href={contact.linkedin || undefined} placeholder="linkedin.com/in/username" external />
              <Row icon={MapPin} label="Location" value={contact.location} placeholder="City, Country" />
            </ul>

            <div className="mt-8">
              {contact.whatsapp ? (
                <a href={waLink(contact.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn btn-light">
                  <MessageCircle size={16} aria-hidden="true" /> Chat on WhatsApp
                </a>
              ) : (
                <span className="btn cursor-not-allowed border border-paper/25 text-paper/45" aria-disabled="true">
                  <MessageCircle size={16} aria-hidden="true" /> WhatsApp — number not added yet
                </span>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-6">
          <form onSubmit={onSubmit} noValidate className="bg-paper p-8 text-ink md:p-12" aria-label="Contact form">
            <p className="label text-accent-deep">Send a message</p>
            <h3 className="mt-3 font-display text-4xl font-medium">Tell me about your project</h3>

            <div className="mt-10 space-y-8">
              {(
                [
                  ['name', 'Name', 'text', 'name'],
                  ['email', 'Email', 'email', 'email'],
                ] as const
              ).map(([k, label, type, auto]) => (
                <div key={k}>
                  <label htmlFor={`f-${k}`} className="label text-muted-strong">
                    {label}
                  </label>
                  <input
                    id={`f-${k}`}
                    type={type}
                    autoComplete={auto}
                    value={values[k]}
                    onChange={set(k)}
                    onBlur={blur(k)}
                    aria-invalid={Boolean(show(k))}
                    aria-describedby={show(k) ? `e-${k}` : undefined}
                    className={`${field} ${show(k) ? 'border-red-700' : 'border-line'}`}
                  />
                  {show(k) && (
                    <p id={`e-${k}`} className="mt-2 text-sm text-red-700">
                      {show(k)}
                    </p>
                  )}
                </div>
              ))}
              <div>
                <label htmlFor="f-message" className="label text-muted-strong">
                  Message
                </label>
                <textarea
                  id="f-message"
                  rows={5}
                  value={values.message}
                  onChange={set('message')}
                  onBlur={blur('message')}
                  aria-invalid={Boolean(show('message'))}
                  aria-describedby={show('message') ? 'e-message' : undefined}
                  className={`${field} resize-y ${show('message') ? 'border-red-700' : 'border-line'}`}
                />
                {show('message') && (
                  <p id="e-message" className="mt-2 text-sm text-red-700">
                    {show('message')}
                  </p>
                )}
              </div>
            </div>

            <button type="submit" disabled={status === 'sending'} className="btn btn-solid mt-10 w-full disabled:opacity-60 sm:w-auto">
              {status === 'sending' ? 'Sending…' : 'Send Message'} <ArrowUpRight size={16} aria-hidden="true" />
            </button>

            <div role="status" aria-live="polite" className="mt-6 text-sm leading-relaxed">
              {status === 'sent' && <p className="text-graphite">Thank you — your message has been sent.</p>}
              {status === 'mailto' && <p className="text-graphite">Your email app should open with the message ready to send.</p>}
              {status === 'error' && <p className="text-red-700">Something went wrong. Please try again or use the contact details.</p>}
              {status === 'demo' && (
                <p className="border border-dashed border-accent-deep/60 p-4 text-graphite">
                  Form validated successfully. No contact email or form endpoint is configured yet, so nothing was sent. Add
                  one in <code className="font-mono text-xs">src/data/site.ts</code>.
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
