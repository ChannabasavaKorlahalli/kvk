import { useState } from 'react';
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mykanrlz';
const commodities = ['Rice', 'Pulses', 'Neem Oil', 'Maize', 'Multiple / Other'];
const phoneNumber = '+91 9448525079';
const phoneHref = 'tel:+919448525079';
const whatsappHref = 'https://wa.me/919448525079';

export function Contact({ embedded = false }) {
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    setSubmitting(true);
    setError('');
    setSucceeded(false);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'Unable to send your enquiry. Please try again.');
      }

      form.reset();
      setSucceeded(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send your enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className={embedded ? 'pb-12 lg:pb-16' : 'border-t border-white/[0.06] py-24 lg:py-32'}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {!embedded && (
            <Reveal>
              <p className="eyebrow">Contact</p>
              <h2 className="section-heading mt-4">Request an import quotation</h2>
              <p className="section-lead">
                Share your commodity, volume, and destination. Our export desk responds with availability,
                specifications, and commercial terms.
              </p>
              <div className="mt-10 space-y-4">
                <a href={phoneHref} className="flex items-center gap-3 text-creamMuted transition hover:text-gold">
                  <Phone size={18} className="text-gold" />
                  {phoneNumber}
                </a>
                <a href={whatsappHref} className="flex items-center gap-3 text-creamMuted transition hover:text-gold">
                  <MessageCircle size={18} className="text-gold" />
                  WhatsApp {phoneNumber}
                </a>
                <a href="mailto:exports@vaaliadvisory.com" className="flex items-center gap-3 text-creamMuted transition hover:text-gold">
                  <Mail size={18} className="text-gold" />
                  exports@vaaliadvisory.com
                </a>
                <p className="flex items-center gap-3 text-creamMuted">
                  <MapPin size={18} className="text-gold" />
                  India · Global export operations
                </p>
              </div>
            </Reveal>
          )}

          {embedded && (
            <Reveal>
              <div className="space-y-4 lg:sticky lg:top-28">
                <a href={phoneHref} className="flex items-center gap-3 text-creamMuted transition hover:text-gold">
                  <Phone size={18} className="text-gold" />
                  {phoneNumber}
                </a>
                <a href={whatsappHref} className="flex items-center gap-3 text-creamMuted transition hover:text-gold">
                  <MessageCircle size={18} className="text-gold" />
                  WhatsApp {phoneNumber}
                </a>
                <a href="mailto:exports@vaaliadvisory.com" className="flex items-center gap-3 text-creamMuted transition hover:text-gold">
                  <Mail size={18} className="text-gold" />
                  exports@vaaliadvisory.com
                </a>
                <p className="flex items-center gap-3 text-creamMuted">
                  <MapPin size={18} className="text-gold" />
                  India · Global export operations
                </p>
              </div>
            </Reveal>
          )}

          <Reveal delay={1} className={embedded ? 'lg:col-span-1' : ''}>
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 lg:p-8">
              <input type="hidden" name="_subject" value="Import Quote Request" />
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-1">
                  <span className="mb-1.5 block text-xs text-creamMuted">Name</span>
                  <input name="name" required className="input-field" autoComplete="name" />
                </label>
                <label className="block sm:col-span-1">
                  <span className="mb-1.5 block text-xs text-creamMuted">Company</span>
                  <input name="company" required className="input-field" autoComplete="organization" />
                </label>
                <label className="block sm:col-span-1">
                  <span className="mb-1.5 block text-xs text-creamMuted">Country</span>
                  <input name="country" required className="input-field" autoComplete="country-name" />
                </label>
                <label className="block sm:col-span-1">
                  <span className="mb-1.5 block text-xs text-creamMuted">Commodity</span>
                  <select name="commodity" required className="input-field" defaultValue="">
                    <option value="" disabled>
                      Select commodity
                    </option>
                    {commodities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs text-creamMuted">Quantity requirement</span>
                  <input name="quantity" required className="input-field" placeholder="e.g. 2 x 20ft containers / 500 MT" />
                </label>
                <label className="block sm:col-span-1">
                  <span className="mb-1.5 block text-xs text-creamMuted">Phone</span>
                  <input name="phone" type="tel" required className="input-field" autoComplete="tel" />
                </label>
                <label className="block sm:col-span-1">
                  <span className="mb-1.5 block text-xs text-creamMuted">Email</span>
                  <input name="email" type="email" required className="input-field" autoComplete="email" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs text-creamMuted">Message</span>
                  <textarea name="message" rows={4} className="input-field resize-none" placeholder="Variety, specs, Incoterms, target port..." />
                </label>
              </div>
              {error && <p className="mt-4 text-center text-sm text-red-400">{error}</p>}
              <button type="submit" disabled={submitting} className="btn-gold mt-6 w-full">
                {submitting ? 'Sending…' : 'Send import enquiry'} <ArrowRight size={18} />
              </button>
              {succeeded && (
                <p className="mt-4 text-center text-sm text-gold">Thanks — your enquiry was sent.</p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
