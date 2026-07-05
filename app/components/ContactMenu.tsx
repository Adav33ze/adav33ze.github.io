'use client'

import { useState, useRef, useEffect } from 'react'

export type ContactMethod = {
  label: string
  href: string
}

interface ContactMenuProps {
  label: string
  methods: ContactMethod[]
  /** 'link' — small underlined text (used inline, e.g. "Enquire →")
   *  'button' — full-width bordered button on a light background
   *  'button-dark' — full-width bordered button on a dark/black background
   */
  variant?: 'link' | 'button' | 'button-dark'
  align?: 'left' | 'right'
  className?: string
}

export default function ContactMenu({
  label,
  methods,
  variant = 'link',
  align = 'left',
  className = '',
}: ContactMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [])

  const triggerClasses = {
    link: 'text-xs uppercase tracking-widest border-b border-zinc-300 pb-1 text-zinc-500 hover:text-black hover:border-black transition-colors',
    button:
      'w-full text-center text-xs uppercase tracking-widest py-4 border border-black hover:bg-black hover:text-white transition-colors',
    'button-dark':
      'w-full text-center text-xs uppercase tracking-widest py-4 border border-white text-white hover:bg-white hover:text-black transition-colors',
  }[variant]

  return (
    <div ref={ref} className={`relative inline-block ${variant !== 'link' ? 'w-full' : ''} ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={triggerClasses}
      >
        {label} {variant === 'link' ? (open ? '↑' : '→') : ''}
      </button>

      {open && (
        <div
          className={`absolute z-20 mt-2 w-48 bg-white border border-black text-xs uppercase tracking-widest ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {methods.map((m) => (
            <a
              key={m.label}
              href={m.href}
              target={m.href.startsWith('http') ? '_blank' : undefined}
              rel={m.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="block px-4 py-3 border-b border-zinc-100 last:border-b-0 text-black hover:bg-black hover:text-white transition-colors"
              onClick={() => setOpen(false)}
            >
              {m.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
