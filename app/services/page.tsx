import Link from 'next/link'
import NavBar from '../components/NavBar'
import ContactMenu from '../components/ContactMenu'
import servicesData from '../../data/services.json'
import renderingPackages from '../../data/rendering-packages.json'
import contactData from '../../data/contact.json'
import { getUsdToNgnRate, formatNgn } from '../../lib/exchange-rate'

export const metadata = {
  title: 'Services & Pricing — Abdulrahman | Architect & Interior Designer',
  description:
    'Architectural design, interior design, and project delivery services in Abuja, Nigeria — plus fixed pricing for photorealistic 3D renders.',
}

type Service = {
  title: string
  description: string
}

type Tier = {
  name: string
  renderCount: number
  bestFor: string
  turnaround: string
  price: number
  revisionsIncluded: number
}

type Category = {
  id: string
  label: string
  tiers: Tier[]
}

type AddOn = {
  label: string
  amountUsd: number
  isDelta: boolean
}

export default async function ServicesPricingPage() {
  const { services } = servicesData as { services: Service[] }
  const { categories, addOns } = renderingPackages as { categories: Category[]; addOns: AddOn[] }

  const rate = await getUsdToNgnRate()
  const toNgn = (usd: number) => usd * rate

  const { email, whatsappNumber, telegramUsername } = contactData as {
    email: string
    whatsappNumber: string
    telegramUsername: string
  }
  const contactMethods = [
    { label: 'WhatsApp', href: `https://wa.me/${whatsappNumber}` },
    { label: 'Telegram', href: `https://t.me/${telegramUsername}` },
    { label: 'Email', href: `mailto:${email}` },
  ]

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      <NavBar forceLight />

      {/* HEADER */}
      <header className="pt-40 pb-16 px-6 md:px-12 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <p className="text-xs uppercase tracking-widest text-zinc-400 mb-6">
              Services &amp; Pricing
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-light tracking-tight leading-tight">
              What I do, and what<br />the renders cost.
            </h1>
          </div>
          <div className="lg:col-span-4 space-y-3 text-xs uppercase tracking-wider text-zinc-400">
            <div>
              <span className="text-zinc-300">Design services</span>
              <span className="ml-3 text-black">Scoped per project</span>
            </div>
            <div>
              <span className="text-zinc-300">Visualisation</span>
              <span className="ml-3 text-black">Fixed Pricing</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-zinc-300">Contact</span>
              <ContactMenu label="Get in touch" methods={contactMethods} />
            </div>
          </div>
        </div>
      </header>

      {/* SERVICES — unpriced, numbered list */}
      <section className="py-24 px-6 md:px-12 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-widest text-zinc-400">Design Services</p>
            <p className="text-sm font-light text-zinc-500 mt-4 max-w-xs">
              Every project is scoped individually. Get in touch for a quote.
            </p>
          </div>
          <div className="lg:col-span-8 divide-y divide-zinc-100">
            {services.map((service, i) => (
              <div
                key={service.title}
                className="py-8 first:pt-0 flex flex-col md:flex-row md:justify-between md:items-start gap-3"
              >
                <div className="flex gap-4 md:gap-6">
                  <span className="text-xs text-zinc-300 tabular-nums pt-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-body text-base font-normal text-black">{service.title}</h3>
                    <p className="text-sm font-light text-zinc-600 leading-relaxed mt-2 max-w-xl">
                      {service.description}
                    </p>
                  </div>
                </div>
                <ContactMenu
                  label="Enquire"
                  methods={contactMethods}
                  align="right"
                  className="shrink-0 ml-10 md:ml-0"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RENDERING PACKAGES */}
      <section className="py-24 px-6 md:px-12 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-widest text-zinc-400">Visualisation Packages</p>
            <p className="text-sm font-light text-zinc-500 mt-4 max-w-xs">
              Fixed pricing, 3 rounds of revision included on every package.
            </p>
          </div>
          <div className="lg:col-span-8" />
        </div>

        <div className="max-w-7xl mx-auto space-y-16">
          {categories.map((category) => (
            <div key={category.id}>
              <p className="text-xs uppercase tracking-widest text-zinc-400 mb-6">{category.label}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-200">
                {category.tiers.map((tier) => {
                  const ngnPrice = toNgn(tier.price)
                  return (
                    <div key={tier.name} className="bg-white p-8 flex flex-col">
                      <p className="text-xs uppercase tracking-widest text-zinc-400 mb-6">
                        {tier.renderCount} Renders
                      </p>
                      <h3 className="font-display text-3xl font-light tracking-tight mb-2">{tier.name}</h3>
                      <p className="text-sm font-light text-zinc-500 mb-8">{tier.bestFor}</p>

                      <p className="font-display text-4xl md:text-5xl font-light tracking-tight mb-1">
                        {formatNgn(ngnPrice)}
                      </p>
                      <p className="text-xs uppercase tracking-widest text-zinc-400 mb-8">
                        ≈ ${tier.price} USD
                      </p>

                      <div className="text-xs uppercase tracking-widest text-zinc-400 space-y-3 mb-10">
                        <div className="flex justify-between border-t border-zinc-100 pt-3">
                          <span>Turnaround</span>
                          <span className="text-black">{tier.turnaround}</span>
                        </div>
                        <div className="flex justify-between border-t border-zinc-100 pt-3">
                          <span>Revisions</span>
                          <span className="text-black">{tier.revisionsIncluded} included</span>
                        </div>
                      </div>

                      <ContactMenu
                        label={`Select ${tier.name}`}
                        methods={contactMethods}
                        variant="button"
                        className="mt-auto"
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ADD-ONS */}
      <section className="py-24 px-6 md:px-12 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-widest text-zinc-400">Add-ons</p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {addOns.map((addOn) => {
              const ngnAmount = toNgn(addOn.amountUsd)
              const sign = addOn.isDelta ? '+' : ''
              return (
                <div key={addOn.label} className="flex flex-col gap-2">
                  <span className="text-sm font-light text-zinc-600">{addOn.label}</span>
                  <span className="font-body text-sm text-black">
                    {sign}
                    {formatNgn(ngnAmount)}
                  </span>
                  <span className="text-xs text-zinc-400">
                    {sign}${addOn.amountUsd} USD
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 md:px-12 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-6">Collaboration</p>
          <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight max-w-2xl mb-12 leading-tight">
            Have a project in mind? Let's talk it through.
          </h2>
          <div className="max-w-xs">
            <ContactMenu label="Get in touch" methods={contactMethods} variant="button-dark" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-zinc-500 text-[10px] uppercase tracking-widest py-8 px-6 md:px-12 flex justify-between items-center border-t border-zinc-900">
        <p>© 2026 Abdulrahman. All rights reserved.</p>
        <Link href="/" className="hover:text-white transition-colors">Back to Home</Link>
      </footer>
    </div>
  )
}
