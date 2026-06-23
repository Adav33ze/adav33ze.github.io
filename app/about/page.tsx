import Link from 'next/link'
import NavBar from '../components/NavBar'

export const metadata = {
  title: 'About — Abdulrahman | Architect & Interior Designer',
  description: 'Abdulrahman is an Architect and Interior Designer based in Abuja, with over a decade of experience in residential, hospitality, and institutional design across Nigeria and internationally.',
}

const career = [
  {
    role: 'Project Operations Manager',
    company: 'Fazab International Limited',
    period: 'October 2024 — Present',
    description: 'Overseeing projects from inception to completion as part of the senior management team — coordinating design, statutory approvals, and on-site delivery across multiple concurrent developments. Directing collaboration with environmental consultants, regulators, and contractors to keep projects compliant and on schedule.',
  },
  {
    role: 'Senior Architect',
    company: 'NEELDS',
    period: '2022 — 2024',
    description: 'Led architectural design and documentation across residential and institutional projects. Managed client briefs, design development, and coordination with structural and MEP consultants through to construction.',
  },
  {
    role: 'Architect & Interior Designer',
    company: 'Ariah Gray',
    period: '2020 — 2022',
    description: 'Delivered end-to-end architectural and interior design services for high-end residential clients. Responsible for concept design, material specification, contractor coordination, and site supervision.',
  },
  {
    role: 'Architect & Project Manager',
    company: 'Components Consults',
    period: '2017 — 2020',
    description: 'Managed residential and commercial projects from concept through to handover, handling design, approvals, scheduling, and on-site quality control.',
  },
  {
    role: 'Designer',
    company: 'Viz Creative',
    period: '2015 — 2017',
    description: 'Produced architectural visualizations, graphic design, and branding work for clients across the built environment sector.',
  },
  {
    role: 'IT Support / Administrative Officer',
    company: 'ICICE Al Noor',
    period: '2013 — 2015',
    description: 'Early career role supporting operations and IT infrastructure while establishing design practice foundations.',
  },
]

const education = [
  {
    degree: "Master's in Interior Design",
    institution: 'Obafemi Awolowo University',
    year: '2026',
  },
  {
    degree: 'B.Sc. Architecture',
    institution: 'Ahmadu Bello University',
    year: '2013',
  },
]

const services = [
  'Architectural Design',
  'Interior Design',
  '3D Architectural Visualisation',
  'Construction Supervision',
  'Project Management',
  'Curb Appeal & Facade Design',
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      {/* NAV */}
      <NavBar forceLight />

      {/* HEADER */}
      <header className="pt-40 pb-16 px-6 md:px-12 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <p className="text-xs uppercase tracking-widest text-zinc-400 mb-6">Profile</p>
            <h1 className="font-display text-5xl md:text-7xl font-light tracking-tight leading-tight">
              Abdulrahman
            </h1>
            <p className="font-body text-xs uppercase tracking-widest text-zinc-400 mt-4">
              Architect & Interior Designer — Abuja, Nigeria
            </p>
          </div>
          <div className="lg:col-span-4 space-y-3 text-xs uppercase tracking-wider text-zinc-400">
            <div>
              <span className="text-zinc-300">Based in</span>
              <span className="ml-3 text-black">Abuja, Nigeria</span>
            </div>
            <div>
              <span className="text-zinc-300">Available for</span>
              <span className="ml-3 text-black">Local & International Projects</span>
            </div>
            <div>
              <span className="text-zinc-300">Contact</span>
              <a href="mailto:hello@adav33ze.com.ng" className="ml-3 text-black hover:opacity-50 transition-opacity">
                hello@adav33ze.com.ng
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* BIO */}
      <section className="py-24 px-6 md:px-12 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-widest text-zinc-400">Introduction</p>
          </div>
          <div className="lg:col-span-8 space-y-5 text-zinc-700 font-light leading-relaxed text-sm md:text-base max-w-3xl">
            <p>
              I'm an Architect and Interior Designer with over a decade of experience leading 
              projects from early concept through to completed construction. My practice sits 
              at the intersection of architecture and interiors — every project I take on is 
              considered spatially, structurally, and down to the finish.
            </p>
            <p>
              I'm currently Project Operations Manager at Fazab International Limited in Abuja, 
              where I oversee multiple concurrent developments from inception to handover. Before 
              that, I've worked across senior architectural, consultancy, and design roles — 
              building a track record in residential, hospitality, and institutional work.
            </p>
            <p>
              adav33ze — meaning "bringer of wealth" — is my personal brand. A name that reflects 
              the value I aim to bring to every project and collaboration. I work with clients 
              across Nigeria and internationally, and I'm always open to meaningful projects 
              regardless of where they are.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 px-6 md:px-12 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-widest text-zinc-400">What I Do</p>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service, i) => (
                <div key={i} className="flex items-center gap-4 py-4 border-b border-zinc-100">
                  <span className="text-xs text-zinc-300 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-sm font-light text-zinc-800">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CAREER */}
      <section className="py-24 px-6 md:px-12 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-widest text-zinc-400">Experience</p>
          </div>
          <div className="lg:col-span-8 divide-y divide-zinc-100">
            {career.map((item, i) => (
              <div key={i} className="py-8 first:pt-0">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                  <div>
                    <h3 className="font-body text-base font-normal text-black">{item.role}</h3>
                    <p className="text-sm text-zinc-500 font-light">{item.company}</p>
                  </div>
                  <span className="text-xs uppercase tracking-widest text-zinc-400 shrink-0">{item.period}</span>
                </div>
                <p className="text-sm font-light text-zinc-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="py-24 px-6 md:px-12 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-widest text-zinc-400">Education</p>
          </div>
          <div className="lg:col-span-8 divide-y divide-zinc-100">
            {education.map((item, i) => (
              <div key={i} className="py-8 first:pt-0 flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                <div>
                  <h3 className="font-body text-base font-normal text-black">{item.degree}</h3>
                  <p className="text-sm text-zinc-500 font-light">{item.institution}</p>
                </div>
                <span className="text-xs uppercase tracking-widest text-zinc-400 shrink-0">{item.year}</span>
              </div>
            ))}
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
          <div className="flex gap-8 flex-wrap">
            <a
              href="mailto:hello@adav33ze.com.ng"
              className="text-xs uppercase tracking-widest border-b border-white pb-1 hover:opacity-50 transition-opacity"
            >
              Send an Email →
            </a>
            <a
              href="http://wa.me/2348065506222"
              className="text-xs uppercase tracking-widest border-b border-zinc-600 pb-1 text-zinc-400 hover:text-white hover:border-white transition-colors"
            >
              WhatsApp →
            </a>
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
