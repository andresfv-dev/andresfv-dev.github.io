import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, BrainCircuit, Code2, GitBranch, Mail, Terminal } from 'lucide-react'

function App() {
  const valueText = 'Transformo tus problemas complejos en soluciones digitales eficientes.'
  const [typedHeadline, setTypedHeadline] = useState('')
  const [currentSection, setCurrentSection] = useState('inicio')
  const typingDoneRef = useRef(false)

  useEffect(() => {
    const sections = [
      { id: 'hero', label: 'inicio' },
      { id: 'about', label: 'sobre mi' },
      { id: 'experience', label: 'experiencia' },
      { id: 'projects', label: 'proyectos' },
      { id: 'tools', label: 'herramientas' },
      { id: 'contact', label: 'contacto' },
    ]

    const observer = new window.IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (!visible.length) return

        const match = sections.find((section) => section.id === visible[0].target.id)
        if (match) setCurrentSection(match.label)
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: '-15% 0px -35% 0px',
      },
    )

    sections.forEach((section) => {
      const node = document.getElementById(section.id)
      if (node) observer.observe(node)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (typingDoneRef.current) return

    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setTypedHeadline(valueText.slice(0, index))

      if (index >= valueText.length) {
        typingDoneRef.current = true
        window.clearInterval(timer)
      }
    }, 36)

    return () => window.clearInterval(timer)
  }, [valueText])

  const experiences = [
    {
      role: 'Senior Full Stack Developer',
      company: 'AVM_SOLUTIONS_CORP',
      period: '2023 - PRES',
      description:
        'Liderazgo tecnico en arquitectura de microservicios y optimizacion de CI/CD con foco en observabilidad.',
    },
    {
      role: 'Full Stack Web Developer',
      company: 'TECH_LABS_INC',
      period: '2021 - 2023',
      description:
        'Desarrollo de interfaces reactivas y APIs robustas para plataformas cloud-native con despliegues automatizados.',
    },
  ]

  const projects = [
    {
      name: 'AVM System',
      year: '2023',
      description: 'Plataforma core para monitoreo automatizado y orquestacion de despliegues.',
      tags: ['AWS', 'DOCKER'],
    },
    {
      name: 'Dev Station',
      year: '2022',
      description: 'Entorno colaborativo para revisiones de codigo en tiempo real.',
      tags: ['REACT', 'NODE'],
    },
  ]

  return (
    <div className="min-h-dvh px-4 py-10">
      <div className="mx-auto w-full max-w-5xl">
        <div className="relative border-x border-[var(--c-border)] bg-[var(--c-surface)]">
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[var(--c-border)] bg-[var(--c-surface)]/95 px-5 backdrop-blur-sm md:px-8">
            <div className="text-base font-bold tracking-tight text-[var(--c-text)] md:text-lg">AVM_SYSTEM</div>
            <nav className="hidden items-center gap-6 text-xs text-[var(--c-muted)] md:flex">
              <a href="#hero" className="focus-ring transition-colors hover:text-[var(--c-accent)]">INICIO</a>
              <a href="#about" className="focus-ring transition-colors hover:text-[var(--c-accent)]">SOBRE MI</a>
              <a href="#experience" className="focus-ring transition-colors hover:text-[var(--c-accent)]">EXPERIENCIA</a>
              <a href="#projects" className="focus-ring transition-colors hover:text-[var(--c-accent)]">PROYECTOS</a>
              <a href="#contact" className="focus-ring transition-colors hover:text-[var(--c-accent)]">CONTACTO</a>
            </nav>
          </header>

          <main className="space-y-8 px-5 pb-16 pt-8 md:snap-y md:snap-mandatory md:px-8 md:pt-10">
            <section
              id="hero"
              className="hero-shell relative scroll-mt-24 space-y-7 overflow-hidden border border-[var(--c-border)] bg-[var(--c-base)] p-6 motion-safe:animate-fade-in md:min-h-[calc(100dvh-8rem)] md:snap-start md:p-8"
            >
              <p className="absolute left-6 top-6 z-10 inline-flex items-center gap-3 text-base text-[var(--c-muted)] md:text-lg">
                <span className="status-dot inline-block h-2.5 w-2.5 rounded-full bg-[var(--c-accent)]" aria-hidden="true" />
                [ SYSTEM_STATUS: {currentSection.toUpperCase()} ]
              </p>

              <div className="relative z-10 flex min-h-[60dvh] flex-col items-center justify-center gap-6 pt-10 text-center md:pt-14">
                <h1 className="max-w-4xl text-balance text-3xl font-bold leading-tight text-[var(--c-text)] md:text-5xl">
                  Bienvenido a mi portafolio, soy <span className="text-[var(--c-accent)]">Andres Felipe Velasquez Moreno</span>
                </h1>

                <div className="w-full max-w-3xl border border-[var(--c-border)] bg-[#09090b]/75 p-5 text-left text-sm leading-relaxed text-[var(--c-text)] backdrop-blur-[1px] md:p-6">
                  <p className="mb-2 text-xs text-[var(--c-muted)]">
                    <span className="text-[var(--c-accent)]">root@avm_system:~$</span> cat value_proposition.txt
                  </p>
                  {typedHeadline}
                  <span className="typing-cursor ml-1 inline-block w-3 text-[var(--c-accent)]">_</span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-2 md:pt-3">
                <a
                  href="#contact"
                  className="focus-ring inline-flex cursor-pointer items-center gap-2 border border-[#86efac] bg-green-300 px-6 py-3 text-base font-bold text-zinc-950 transition-colors hover:bg-green-200"
                >
                  [ CONTRATAME ↗ ]
                </a>
                <a
                  href="#"
                  className="focus-ring inline-flex cursor-pointer items-center gap-2 border border-[var(--c-border)] px-6 py-3 text-base font-semibold text-[var(--c-text)] transition-colors hover:border-[var(--c-accent)] hover:text-[var(--c-accent)]"
                >
                  [ LEER MI CV ]
                </a>
              </div>
              </div>
            </section>

            <section
              id="about"
              className="scroll-mt-24 space-y-5 border border-[var(--c-border)] bg-[var(--c-base)] p-6 md:min-h-[calc(100dvh-8rem)] md:snap-start md:p-8"
            >
              <p className="inline-flex items-center gap-3 text-sm text-[var(--c-muted)] md:text-base">
                <span className="status-dot inline-block h-2.5 w-2.5 rounded-full bg-[var(--c-accent)]" aria-hidden="true" />
                [ SYSTEM_STATUS: SOBRE MI ]
              </p>
              <div className="border-b border-[var(--c-border)] pb-2">
                <h2 className="text-2xl font-bold text-[var(--c-text)]">SOBRE MI</h2>
              </div>
              <div className="space-y-4">
                <div className="border border-[var(--c-border)] bg-[var(--c-base)] p-5 text-sm leading-relaxed text-[var(--c-text)] md:p-6">
                  <p className="mb-2 text-xs text-[var(--c-muted)]">
                    <span className="text-[var(--c-accent)]">root@avm_system:~$</span> cat description.txt
                  </p>
                  Especializado en construir arquitecturas digitales de alta precision con codigo limpio, interfaces minimalistas y enfoque en escalabilidad.
                </div>
                <div className="border border-[var(--c-border)] bg-[var(--c-base)] p-5 text-sm leading-relaxed text-[var(--c-text)] md:p-6">
                  <p className="mb-2 text-xs text-[var(--c-muted)]">
                    <span className="text-[var(--c-accent)]">root@avm_system:~$</span> cat sobre_mi.txt
                  </p>
                  Desarrollo productos web robustos con React y Node.js, priorizando rendimiento real, mantenibilidad y experiencia de usuario.
                  <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-[var(--c-accent)] align-middle motion-reduce:animate-none" />
                </div>
              </div>
            </section>

            <section
              id="experience"
              className="scroll-mt-24 space-y-5 border border-[var(--c-border)] bg-[var(--c-base)] p-6 motion-safe:animate-fade-in motion-safe:[animation-delay:120ms] md:min-h-[calc(100dvh-8rem)] md:snap-start md:p-8"
            >
              <p className="inline-flex items-center gap-3 text-sm text-[var(--c-muted)] md:text-base">
                <span className="status-dot inline-block h-2.5 w-2.5 rounded-full bg-[var(--c-accent)]" aria-hidden="true" />
                [ SYSTEM_STATUS: EXPERIENCIA ]
              </p>
              <div className="border-b border-[var(--c-border)] pb-2">
                <h2 className="text-2xl font-bold text-[var(--c-text)]">EXPERIENCIA</h2>
              </div>
              <div className="space-y-4">
                {experiences.map((item) => (
                  <article key={item.role} className="border border-[var(--c-border)] p-5 transition-colors hover:border-[var(--c-accent)] motion-reduce:transition-none md:p-6">
                    <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--c-accent)]">{item.role}</h3>
                        <p className="break-words text-xs text-[var(--c-muted)]">{item.company}</p>
                      </div>
                      <span className="text-xs text-[var(--c-secondary)]">{item.period}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-[var(--c-muted)]">{item.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section
              id="projects"
              className="scroll-mt-24 space-y-5 border border-[var(--c-border)] bg-[var(--c-base)] p-6 motion-safe:animate-fade-in motion-safe:[animation-delay:180ms] md:min-h-[calc(100dvh-8rem)] md:snap-start md:p-8"
            >
              <p className="inline-flex items-center gap-3 text-sm text-[var(--c-muted)] md:text-base">
                <span className="status-dot inline-block h-2.5 w-2.5 rounded-full bg-[var(--c-accent)]" aria-hidden="true" />
                [ SYSTEM_STATUS: PROYECTOS ]
              </p>
              <div className="border-b border-[var(--c-border)] pb-2">
                <h2 className="text-2xl font-bold text-[var(--c-text)]">PROYECTOS</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {projects.map((project) => (
                  <article key={project.name} className="border border-[var(--c-border)] p-5 transition-colors hover:border-[var(--c-accent)] motion-reduce:transition-none md:p-6">
                    <div className="mb-3 flex items-start justify-between">
                      <h3 className="text-lg font-semibold text-[var(--c-text)]">{project.name}</h3>
                      <span className="text-xs text-[var(--c-muted)]">{project.year}</span>
                    </div>
                    <p className="mb-4 text-sm text-[var(--c-muted)]">{project.description}</p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="break-words border border-[var(--c-border)] px-2 py-0.5 text-xs text-[var(--c-secondary)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a href="#" className="focus-ring inline-flex items-center gap-2 text-xs text-[var(--c-accent)] transition-opacity hover:opacity-90">
                      VIEW_SOURCE <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </article>
                ))}
              </div>
            </section>

            <section id="tools" className="scroll-mt-24 space-y-5 border border-[var(--c-border)] bg-[var(--c-base)] p-6 motion-safe:animate-fade-in motion-safe:[animation-delay:220ms] md:min-h-[calc(100dvh-8rem)] md:snap-start md:p-8">
              <p className="inline-flex items-center gap-3 text-sm text-[var(--c-muted)] md:text-base">
                <span className="status-dot inline-block h-2.5 w-2.5 rounded-full bg-[var(--c-accent)]" aria-hidden="true" />
                [ SYSTEM_STATUS: HERRAMIENTAS ]
              </p>
              <div className="border-b border-[var(--c-border)] pb-2">
                <h2 className="text-2xl font-bold text-[var(--c-text)]">HERRAMIENTAS</h2>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  ['VS_CODE', Code2],
                  ['OPENCODE AI', BrainCircuit],
                  ['GIT', GitBranch],
                ].map(([label, Icon]) => (
                  <div key={label} className="border border-[var(--c-border)] p-5 text-center transition-colors hover:bg-[var(--c-base)] motion-reduce:transition-none">
                    <Icon className="mx-auto mb-3 h-7 w-7 text-[var(--c-accent)]" aria-hidden="true" />
                    <p className="text-xs text-[var(--c-text)]">{label}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="contact" className="scroll-mt-24 space-y-5 border border-[var(--c-border)] bg-[var(--c-base)] p-6 md:min-h-[calc(100dvh-8rem)] md:snap-start md:p-8">
              <p className="inline-flex items-center gap-3 text-sm text-[var(--c-muted)] md:text-base">
                <span className="status-dot inline-block h-2.5 w-2.5 rounded-full bg-[var(--c-accent)]" aria-hidden="true" />
                [ SYSTEM_STATUS: CONTACTO ]
              </p>
              <div className="border-b border-[var(--c-border)] pb-2">
                <h2 className="text-2xl font-bold text-[var(--c-text)]">CONTACTO</h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-[var(--c-muted)]">
                Si queres colaborar o hablar sobre arquitectura y producto, mis canales estan abiertos.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href="https://github.com/andresfv-dev"
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex items-center gap-3 border border-[var(--c-border)] p-4 text-sm text-[var(--c-text)] transition-colors hover:border-[var(--c-secondary)]"
                >
                  <Terminal className="h-4 w-4 text-[var(--c-secondary)]" /> GITHUB <ArrowUpRight className="ml-auto h-4 w-4" />
                </a>
                <a
                  href="mailto:andresfelipevelasquezm08@gmail.com"
                  className="focus-ring inline-flex items-center gap-3 border border-[var(--c-border)] p-4 text-sm text-[var(--c-text)] transition-colors hover:border-[var(--c-secondary)]"
                >
                  <Mail className="h-4 w-4 text-[var(--c-secondary)]" /> EMAIL <ArrowUpRight className="ml-auto h-4 w-4" />
                </a>
              </div>
            </section>
          </main>

          <footer className="flex flex-col items-center justify-between gap-3 border-t border-[var(--c-border)] bg-[var(--c-base)] px-5 py-7 text-xs text-[var(--c-muted)] md:flex-row md:px-8">
            <p className="text-[var(--c-text)]">AVM_DEV_STATION</p>
            <p>Vite + React + Tailwind + Lucide</p>
            <a href="#hero" className="focus-ring inline-flex items-center gap-2 text-[var(--c-secondary)] transition-colors hover:text-[var(--c-accent)]">
              <Terminal className="h-4 w-4" /> root@avm_system:~
            </a>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default App
