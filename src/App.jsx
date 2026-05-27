import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, Mail, Terminal } from 'lucide-react'

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M12 .5C5.73.5.75 5.64.75 12c0 5.09 3.17 9.41 7.57 10.94.55.1.75-.25.75-.55v-2.05c-3.08.7-3.73-1.53-3.73-1.53-.5-1.33-1.23-1.68-1.23-1.68-1-.71.08-.7.08-.7 1.11.08 1.7 1.18 1.7 1.18.98 1.77 2.57 1.26 3.2.96.1-.73.38-1.26.68-1.55-2.46-.29-5.05-1.26-5.05-5.62 0-1.24.42-2.25 1.1-3.05-.11-.28-.48-1.45.1-3.02 0 0 .9-.3 2.95 1.16.85-.25 1.76-.38 2.67-.38.91 0 1.82.13 2.67.38 2.05-1.46 2.95-1.16 2.95-1.16.58 1.57.21 2.74.1 3.02.68.8 1.1 1.81 1.1 3.05 0 4.37-2.6 5.33-5.07 5.62.39.36.74 1.08.74 2.18v3.23c0 .3.2.65.76.55 4.39-1.53 7.56-5.85 7.56-10.94C23.25 5.64 18.27.5 12 .5z"
      />
    </svg>
  )
}

function App() {
  const welcomeText = 'Bienvenido'
  const [typed, setTyped] = useState('')
  const typingIndexRef = useRef(0)

  const emailHref = useMemo(() => {
    const user = 'andresfelipevelasquezm08'
    const domain = 'gmail.com'
    return `mailto:${user}@${domain}`
  }, [])

  const about = useMemo(
    () =>
      [
        'Soy Andres Felipe Velasquez Moreno. Me enfoco en construir interfaces web limpias, rapidas y accesibles.',
        'Me gusta trabajar con componentes reutilizables, sistemas de diseno y performance real (no solo Lighthouse).',
      ].join(' '),
    [],
  )

  useEffect(() => {
    typingIndexRef.current = 0
    setTyped('')
    const id = window.setInterval(() => {
      typingIndexRef.current += 1
      setTyped(welcomeText.slice(0, typingIndexRef.current))
      if (typingIndexRef.current >= welcomeText.length) window.clearInterval(id)
    }, 55)

    return () => window.clearInterval(id)
  }, [welcomeText])

  return (
    <div className="min-h-dvh px-4 py-10">
      <div className="mx-auto w-full max-w-5xl">
        <div className="rounded-2xl border border-[#27272A] bg-[#09090B]">
          <header className="flex flex-col gap-4 border-b border-[#27272A] px-6 py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#27272A] bg-[#0b0b0e] px-3 py-1 text-xs text-[#E4E4E7]">
                  <Terminal className="h-4 w-4 text-[#86EFAC]" />
                  <span className="text-[#86EFAC]">~ $</span>
                  <span>
                    {typed}
                    <span className="ml-0.5 inline-block h-4 w-2 translate-y-[2px] animate-pulse rounded-[2px] bg-[#86EFAC]" />
                  </span>
                </div>
                <div className="text-xs text-[#A1A1AA]">Vite + React + Tailwind + Lucide</div>
                <h1 className="text-balance text-2xl font-semibold tracking-tight text-[#E4E4E7] sm:text-3xl">
                  Andres Felipe Velasquez Moreno
                </h1>
              </div>

              <div className="rounded-xl border border-[#27272A] bg-[#0b0b0e] px-3 py-2 text-xs text-[#A1A1AA]">
                GitHub Pages deploy via GitHub Actions
              </div>
            </div>
          </header>

          <main className="grid gap-6 p-6 md:grid-cols-2">
            <section className="space-y-4">
              <div className="rounded-2xl border border-[#27272A] bg-[#0b0b0e] p-5">
                <div className="text-xs text-[#86EFAC]">about</div>
                <p className="mt-3 text-sm leading-6 text-[#E4E4E7]">{about}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  className="inline-flex items-center justify-between gap-3 rounded-2xl border border-[#27272A] bg-[#0b0b0e] px-4 py-3 text-sm text-[#E4E4E7] transition-colors hover:bg-[#101015]"
                  href="https://github.com/andresfv-dev"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="inline-flex items-center gap-2">
                    <GithubIcon className="h-4 w-4 text-[#E4E4E7]" />
                    Github
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[#86EFAC]" />
                </a>

                <a
                  className="inline-flex items-center justify-between gap-3 rounded-2xl border border-[#27272A] bg-[#0b0b0e] px-4 py-3 text-sm text-[#E4E4E7] transition-colors hover:bg-[#101015]"
                  href={emailHref}
                >
                  <span className="inline-flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#E4E4E7]" />
                    Correo electronico
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[#86EFAC]" />
                </a>
              </div>
            </section>

            <section className="rounded-2xl border border-[#27272A] bg-[#0b0b0e] p-5">
              <div className="flex h-full min-h-64 items-center justify-center rounded-xl border border-dashed border-[#27272A] text-xs text-[#A1A1AA]">
                Foto (placeholder)
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
