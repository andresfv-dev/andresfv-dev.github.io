import { useEffect, useRef, useState } from 'react'
import {
  ArrowUpRight,
  Send,
  Terminal,
} from 'lucide-react'

function App() {
  const valueText = 'Transformo tus problemas complejos en soluciones digitales eficientes.'
  const [typedHeadline, setTypedHeadline] = useState('')
  const [currentSection, setCurrentSection] = useState('inicio')
  const [highlight, setHighlight] = useState('')
  const [isNavScrolled, setIsNavScrolled] = useState(false)
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [toast, setToast] = useState(null)
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

  useEffect(() => {
    const onScroll = () => setIsNavScrolled(window.scrollY > 24)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const experiences = [
    {
      role: 'Technical Product Manager',
      company: 'FUNDACIÓN GUARDIANES DEL CORAZÓN',
      period: 'MAYO 2026 - PRESENTE',
      description:
        'Lidero un equipo multidisciplinario de 5 personas en el ciclo completo de desarrollo y despliegue de la plataforma web institucional. Defino los requerimientos de la página web según las necesidades de la fundación y distribuyo las tareas del equipo para asegurar entregas a tiempo.',
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

  const techStack = [
    { name: 'PYTHON', category: 'backend', logoSrc: 'https://cdn.simpleicons.org/python/3776AB', logoAlt: 'Python logo' },
    { name: 'JAVA', category: 'backend', logoSrc: 'https://cdn.simpleicons.org/openjdk/ED8B00', logoAlt: 'Java logo' },
    { name: 'DOCKER', category: 'backend', logoSrc: 'https://cdn.simpleicons.org/docker/2496ED', logoAlt: 'Docker logo' },
    { name: 'POSTGRESQL', category: 'bases', logoSrc: 'https://cdn.simpleicons.org/postgresql/4169E1', logoAlt: 'PostgreSQL logo' },
    { name: 'JAVASCRIPT', category: 'frontend', logoSrc: 'https://cdn.simpleicons.org/javascript/F7DF1E', logoAlt: 'JavaScript logo' },
    { name: 'HTML', category: 'frontend', logoSrc: 'https://cdn.simpleicons.org/html5/E34F26', logoAlt: 'HTML5 logo' },
    { name: 'CSS', category: 'frontend', logoSrc: 'https://cdn.simpleicons.org/css/1572B6', logoAlt: 'CSS logo' },
  ]

  const onContactSubmit = (event) => {
    event.preventDefault()

    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT
    const trimmedName = contactName.trim()
    const trimmedEmail = contactEmail.trim()
    const trimmedMessage = contactMessage.trim()
    const recipient = 'andresfelipevelasquezm08@gmail.com'

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setToast({ type: 'error', message: 'Completá nombre, email y mensaje.' })
      return
    }

    if (!endpoint) {
      setToast({ type: 'error', message: 'Falta configurar VITE_CONTACT_ENDPOINT.' })
      return
    }

    const subject = `Nuevo mensaje de ${trimmedName} desde el portafolio`

    setIsSending(true)
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        to: recipient,
        name: trimmedName,
        email: trimmedEmail,
        subject,
        body: trimmedMessage,
        message: trimmedMessage,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('send_failed')
        }

        setContactName('')
        setContactEmail('')
        setContactMessage('')
        setToast({ type: 'success', message: 'Mensaje enviado correctamente.' })
      })
      .catch(() => {
        setToast({ type: 'error', message: 'No se pudo enviar. Probá de nuevo.' })
      })
      .finally(() => {
        setIsSending(false)
      })
  }

  const toolCards = [
    {
      label: 'SUPABASE',
      category: 'bases',
      logoSrc: 'https://cdn.simpleicons.org/supabase/3FCF8E',
      logoAlt: 'Supabase logo',
    },
    {
      label: 'GIT',
      category: '',
      logoSrc: 'https://cdn.simpleicons.org/git/F05032',
      logoAlt: 'Git logo',
    },
    {
      label: 'OPENCODE AI',
      category: '',
      logoSrc: 'https://opencode.ai/_build/assets/preview-opencode-logo-light-B5i-Y4z2.png',
      logoAlt: 'OpenCode logo',
    },
  ]

  const highlightOptions = [
    { key: '', label: 'NINGUNO' },
    { key: 'backend', label: 'BACKEND' },
    { key: 'frontend', label: 'FRONTEND' },
    { key: 'bases', label: 'BASES_DE_DATOS' },
  ]

  const contactLinks = [
    {
      href: 'mailto:andresfelipevelasquezm08@gmail.com',
      label: 'Email',
      logoSrc: 'https://cdn.simpleicons.org/gmail/EA4335',
    },
    {
      href: 'https://wa.me/573104387712',
      label: 'WhatsApp',
      logoSrc: 'https://cdn.simpleicons.org/whatsapp/25D366',
      external: true,
    },
    {
      href: 'https://github.com/andresfv-dev',
      label: 'GitHub',
      logoSrc: 'https://cdn.simpleicons.org/github/FFFFFF',
      external: true,
    },
  ]

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 3200)
    return () => window.clearTimeout(timer)
  }, [toast])

  return (
    <div className="min-h-dvh bg-[radial-gradient(circle_at_top,_rgba(134,239,172,0.12),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(255,179,178,0.12),_transparent_24%),#050506] px-4 py-6 md:px-6 md:py-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="relative rounded-[28px] border border-[var(--c-border)] bg-[linear-gradient(180deg,rgba(19,19,22,0.97),rgba(14,14,17,0.98))] shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
          <header
            className={
              'sticky top-3 z-30 mx-3 mt-3 flex h-16 items-center justify-between rounded-2xl border px-5 transition-colors duration-200 md:mx-5 md:px-8' +
              (isNavScrolled
                ? ' border-[var(--c-border)] bg-[rgba(8,8,10,0.72)] backdrop-blur-xl'
                : ' border-transparent bg-transparent')
            }
          >
            <div className="text-base font-bold tracking-tight text-[var(--c-text)] md:text-lg">AVM_SYSTEM</div>
            <nav className="hidden items-center gap-6 text-sm text-[var(--c-muted)] md:flex md:text-base">
              <a href="#hero" className="focus-ring transition-colors hover:text-[var(--c-accent)]">[ INICIO ]</a>
              <a href="#about" className="focus-ring transition-colors hover:text-[var(--c-accent)]">[ SOBRE MÍ ]</a>
              <a href="#experience" className="focus-ring transition-colors hover:text-[var(--c-accent)]">[ EXPERIENCIA ]</a>
              <a href="#projects" className="focus-ring transition-colors hover:text-[var(--c-accent)]">[ PROYECTOS ]</a>
              <a href="#contact" className="focus-ring transition-colors hover:text-[var(--c-accent)]">[ CONTACTO ]</a>
            </nav>
          </header>

          <main className="space-y-10 px-5 pb-16 pt-8 md:snap-y md:snap-mandatory md:space-y-12 md:px-8 md:pt-10">
            <section
              id="hero"
              className="hero-shell relative scroll-mt-24 space-y-7 overflow-hidden rounded-[24px] border border-[var(--c-border)] bg-[linear-gradient(180deg,rgba(14,14,17,0.96),rgba(10,10,12,0.98))] p-6 motion-safe:animate-fade-in md:min-h-[calc(100dvh-8rem)] md:snap-start md:p-10"
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

            <section id="about" className="scroll-mt-24 space-y-6 rounded-[24px] border border-[var(--c-border)] bg-[rgba(14,14,17,0.9)] p-6 md:min-h-[calc(100dvh-8rem)] md:snap-start md:p-10">
              <p className="inline-flex items-center gap-3 text-lg text-[var(--c-muted)] md:text-xl">
                <span className="status-dot inline-block h-2.5 w-2.5 rounded-full bg-[var(--c-accent)]" aria-hidden="true" />
                [ SYSTEM_STATUS: SOBRE MI ]
              </p>
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

            <section id="experience" className="scroll-mt-24 space-y-6 rounded-[24px] border border-[var(--c-border)] bg-[rgba(14,14,17,0.9)] p-6 motion-safe:animate-fade-in motion-safe:[animation-delay:120ms] md:min-h-[calc(100dvh-8rem)] md:snap-start md:p-10">
              <p className="inline-flex items-center gap-3 text-base text-[var(--c-muted)] md:text-lg">
                <span className="status-dot inline-block h-2.5 w-2.5 rounded-full bg-[var(--c-accent)]" aria-hidden="true" />
                [ SYSTEM_STATUS: EXPERIENCIA ]
              </p>
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

            <section id="projects" className="scroll-mt-24 space-y-6 rounded-[24px] border border-[var(--c-border)] bg-[rgba(14,14,17,0.9)] p-6 motion-safe:animate-fade-in motion-safe:[animation-delay:180ms] md:min-h-[calc(100dvh-8rem)] md:snap-start md:p-10">
              <p className="inline-flex items-center gap-3 text-base text-[var(--c-muted)] md:text-lg">
                <span className="status-dot inline-block h-2.5 w-2.5 rounded-full bg-[var(--c-accent)]" aria-hidden="true" />
                [ SYSTEM_STATUS: PROYECTOS ]
              </p>
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

            <section id="tools" className="scroll-mt-24 space-y-6 rounded-[24px] border border-[var(--c-border)] bg-[rgba(14,14,17,0.9)] p-6 motion-safe:animate-fade-in motion-safe:[animation-delay:220ms] md:min-h-[calc(100dvh-8rem)] md:snap-start md:p-10">
              <p className="inline-flex items-center gap-3 text-base text-[var(--c-muted)] md:text-lg">
                <span className="status-dot inline-block h-2.5 w-2.5 rounded-full bg-[var(--c-accent)]" aria-hidden="true" />
                [ SYSTEM_STATUS: HERRAMIENTAS ]
              </p>

              <div className="space-y-8 md:space-y-10">
                <div className="flex flex-col gap-3 rounded-[20px] border border-[var(--c-border)] bg-[rgba(19,19,22,0.72)] p-4 md:flex-row md:items-center md:justify-between md:p-5">
                  <span className="text-xs font-semibold tracking-[0.2em] text-[var(--c-muted)] md:text-sm">Resaltar tecnología</span>
                  <div className="flex flex-wrap items-center gap-3">
                    {highlightOptions.map((option) => (
                      <button
                        key={option.key || 'none'}
                        type="button"
                        onClick={() => setHighlight(option.key)}
                        className={
                          'focus-ring border border-[var(--c-border)] px-3 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-[var(--c-text)] transition-all hover:border-[var(--c-accent)] hover:text-[var(--c-accent)] md:text-xs' +
                          (highlight === option.key
                            ? ' border-[#86efac] bg-[rgba(134,239,172,0.08)] text-[#86efac] shadow-[0_0_0_1px_rgba(134,239,172,0.35)]'
                            : '')
                        }
                      >
                        [ {option.label} ]
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 xl:gap-4">
                  {toolCards.map(({ label, category, logoSrc, logoAlt, fallbackSrc }) => {
                    const isActive = highlight && category && highlight === category
                    const isDimmed = highlight && (!category || highlight !== category)

                    return (
                      <div
                        key={label}
                        className={
                          'group flex min-h-[176px] flex-col justify-between rounded-[20px] border border-[var(--c-border)] bg-[linear-gradient(180deg,rgba(19,19,22,0.92),rgba(11,11,13,0.96))] p-4 text-left transition-all motion-reduce:transition-none hover:-translate-y-1 hover:border-[var(--c-accent)] hover:shadow-[0_18px_50px_rgba(0,0,0,0.35)] md:min-h-[190px] md:p-5' +
                          (isActive
                            ? ' border-[#86efac] shadow-[0_0_0_1px_rgba(134,239,172,0.5),0_0_28px_rgba(134,239,172,0.35)]'
                            : '') +
                          (isDimmed ? ' opacity-70' : '')
                        }
                      >
                        <div className="mb-4 flex min-h-[68px] items-center justify-center md:min-h-[78px]">
                          {logoSrc ? (
                            <img
                              src={logoSrc}
                              alt={logoAlt || label}
                              loading="lazy"
                              onError={(e) => {
                                if (!fallbackSrc) return
                                e.currentTarget.onerror = null
                                e.currentTarget.src = fallbackSrc
                              }}
                              className="max-h-[68px] w-full object-contain md:max-h-[78px]"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center rounded-[18px] border border-dashed border-[var(--c-border)] bg-[rgba(255,255,255,0.02)] text-center text-xs tracking-[0.18em] text-[var(--c-muted)]">
                              [ LOGO ]
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <p className="text-base font-semibold tracking-[0.18em] text-[var(--c-text)] md:text-lg">{label}</p>
                          <p className="text-xs uppercase tracking-[0.16em] text-[var(--c-muted)]">
                            {category ? `[ ${category.toUpperCase()} ]` : '[ TOOLING ]'}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="pt-6 md:pt-10">
                  <p className="inline-flex items-center gap-3 text-base text-[var(--c-muted)] md:text-lg">
                    <span className="status-dot inline-block h-2.5 w-2.5 rounded-full bg-[var(--c-accent)]" aria-hidden="true" />
                    [ STATUS: HE_TRABAJADO_CON ]
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-6 md:pt-8">
                  {techStack.map((tech) => {
                    const isActive = highlight && tech.category === highlight
                    const isDimmed = highlight && tech.category !== highlight

                    return (
                      <span
                        key={tech.name}
                        className={
                          'inline-flex items-center gap-2 border border-[var(--c-border)] bg-[rgba(255,255,255,0.02)] px-4 py-2.5 text-sm font-semibold tracking-[0.16em] text-[var(--c-secondary)] transition-all md:text-base' +
                          (isActive
                            ? ' border-[#86efac] text-[#86efac] shadow-[0_0_0_1px_rgba(134,239,172,0.45),0_0_22px_rgba(134,239,172,0.3)]'
                            : '') +
                          (isDimmed ? ' opacity-65' : '')
                        }
                      >
                        <img
                          src={tech.logoSrc}
                          alt={tech.logoAlt}
                          loading="lazy"
                          className="h-5 w-5 object-contain md:h-6 md:w-6"
                        />
                        [ {tech.name} ]
                      </span>
                    )
                  })}
                </div>
              </div>
            </section>

            <section id="contact" className="scroll-mt-24 space-y-6 rounded-[24px] border border-[var(--c-border)] bg-[rgba(14,14,17,0.9)] p-6 md:min-h-[calc(100dvh-8rem)] md:snap-start md:p-10">
              <p className="inline-flex items-center gap-3 text-base text-[var(--c-muted)] md:text-lg">
                <span className="status-dot inline-block h-2.5 w-2.5 rounded-full bg-[var(--c-accent)]" aria-hidden="true" />
                [ SYSTEM_STATUS: CONTACTO ]
              </p>

              <div className="grid gap-6 md:grid-cols-[0.95fr_1.05fr] md:gap-8">
                <div className="flex flex-col items-center justify-center rounded-[22px] border border-[var(--c-border)] bg-[rgba(19,19,22,0.72)] px-6 py-10 text-center md:py-14">
                  <div className="flex flex-col items-center gap-5 pt-4 md:pt-6">
                    <div className="grid h-44 w-44 place-items-center rounded-full border border-[var(--c-border)] bg-[radial-gradient(circle_at_top,_rgba(134,239,172,0.18),_rgba(19,19,22,0.95)_70%)]">
                      <span className="text-xs text-[var(--c-muted)]">[ FOTO ]</span>
                    </div>

                    <div className="space-y-3">
                      <p className="text-base font-semibold tracking-[0.16em] text-[var(--c-text)]">Andres Felipe Velasquez Moreno</p>
                      <p className="mx-auto max-w-md text-sm leading-relaxed text-[var(--c-muted)]">
                        Si querés colaborar o hablar sobre arquitectura y producto, mis canales están abiertos.
                      </p>
                    </div>
                  </div>

                  <div className="flex w-full items-center justify-center gap-3 pt-4 md:pt-6">
                    {contactLinks.map(({ href, label, logoSrc, external, muted }) => (
                      <a
                        key={label}
                        href={href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noreferrer' : undefined}
                        className={
                          'focus-ring grid h-12 w-12 place-items-center rounded-full border border-[var(--c-border)] bg-[var(--c-surface)] transition-all hover:-translate-y-0.5 hover:border-[var(--c-accent)] hover:text-[var(--c-accent)]' +
                          (muted ? ' opacity-70' : '')
                        }
                        aria-label={label}
                      >
                        <img src={logoSrc} alt={`${label} logo`} className="h-5 w-5 object-contain" loading="lazy" />
                      </a>
                    ))}
                  </div>
                </div>

                <form onSubmit={onContactSubmit} className="space-y-4 rounded-[22px] border border-[var(--c-border)] bg-[rgba(19,19,22,0.72)] p-5 pt-10 md:p-6 md:pt-14">
                  <div className="bg-[var(--c-surface)] p-4">
                    <label className="mb-2 block text-xs text-[var(--c-muted)]">[ NOMBRE ]</label>
                    <input
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full border border-[var(--c-border)] bg-[var(--c-base)] px-3 py-2 text-sm text-[var(--c-text)] outline-none focus:border-[var(--c-accent)]"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="bg-[var(--c-surface)] p-4">
                    <label className="mb-2 block text-xs text-[var(--c-muted)]">[ EMAIL ]</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full border border-[var(--c-border)] bg-[var(--c-base)] px-3 py-2 text-sm text-[var(--c-text)] outline-none focus:border-[var(--c-accent)]"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div className="bg-[var(--c-surface)] p-4">
                    <label className="mb-2 block text-xs text-[var(--c-muted)]">[ MENSAJE ]</label>
                    <textarea
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      rows={5}
                      className="w-full resize-none border border-[var(--c-border)] bg-[var(--c-base)] px-3 py-2 text-sm text-[var(--c-text)] outline-none focus:border-[var(--c-accent)]"
                      placeholder="Contame en qué te puedo ayudar..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="focus-ring inline-flex w-full items-center justify-center gap-2 border border-[#86efac] bg-green-300 px-4 py-3 text-sm font-bold text-zinc-950 transition-colors hover:bg-green-200"
                  >
                    {isSending ? '[ ENVIANDO... ]' : '[ ENVIAR ]'} <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </section>
          </main>

          {toast ? (
            <div className="pointer-events-none fixed bottom-5 right-5 z-50">
              <div
                className={
                  'rounded-lg border px-4 py-3 text-sm shadow-xl backdrop-blur-sm ' +
                  (toast.type === 'success'
                    ? 'border-[#86efac] bg-[rgba(12,28,18,0.9)] text-[#b7f7cc]'
                    : 'border-[#ffb3b2] bg-[rgba(38,14,14,0.92)] text-[#ffd4d4]')
                }
                role="status"
                aria-live="polite"
              >
                {toast.message}
              </div>
            </div>
          ) : null}

          <footer className="flex flex-col items-center justify-between gap-3 border-t border-[var(--c-border)] bg-[rgba(14,14,17,0.92)] px-5 py-7 text-xs text-[var(--c-muted)] md:flex-row md:px-8">
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
