"use client"

import { useState } from "react"
import Image from "next/image"
import styles from "./page.module.css"

export default function Home() {
  const [formState, setFormState] = useState("idle")
  const [formError, setFormError] = useState("")
  const [selectedService, setSelectedService] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const name = form.name.value?.trim() || ""
    const email = form.email.value?.trim() || ""
    const message = form.message.value?.trim() || ""

    if (!name || !email || !message) {
      setFormState("error")
      setFormError("Please fill in all fields.")
      return
    }

    setFormState("sending")
    setFormError("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, service: selectedService }),
      })
      const data = await res.json()

      if (data.ok) {
        setFormState("sent")
        form.reset()
        setSelectedService(null)
      } else {
        setFormState("error")
        setFormError(data.error || "Something went wrong.")
      }
    } catch {
      setFormState("error")
      setFormError("Network error. Please try again.")
    }
  }

  function addService(name) {
    setSelectedService(name)
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <a href="#" className={styles.logo} aria-label="Safe Mode home">
            <span className={styles.logoIcon}>
              <Image src="/logo.png" alt="" width={32} height={32} priority />
            </span>
            <span className={styles.logoText}>Safe Mode</span>
          </a>
          <ul className={styles.navLinks}>
            <li><a href="/#solutions">Solutions</a></li>
            <li><a href="/#why-us">Why us</a></li>
            <li><a href="/work">Work</a></li>
            <li><a href="/#faq">FAQ</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main>
        {/* 01 Hero */}
        <section id="hero" className={styles.hero}>
          <span className={styles.heroLabel} aria-hidden>01</span>

          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              9/10 ideas don&apos;t hold up. Let&apos;s check yours early.
            </h1>
            <p className={styles.heroNarrative}>
              Product + UX team for moments that need decisions, not more options.<br />
              Fixed scope. Capped sprints. No wandering—we force the hard calls and leave you with a backlog and flows ready for engineering.
            </p>
            <div className={styles.heroCtas}>
              <a href="#contact" className={styles.ctaPrimary}>
                Start a conversation
              </a>
              <a href="/work" className={styles.ctaSecondary}>
                Check out our work
              </a>
            </div>
          </div>
        </section>

        {/* 02 Deliverables — narrative + Product & UX tiles */}
        <section id="deliverables" className={styles.deliverablesSection}>
          <span className={styles.sectionNum}>02</span>
          <p className={styles.narrativeLead}>
            You don&apos;t need more opinions. You need decisions.
          </p>
          <p className={styles.narrativeFollow}>
            We cut noise. We make tradeoffs. We leave you with artifacts your team can ship from.
          </p>

          <div className={styles.deliverablesGroup}>
            <h3 className={styles.deliverablesGroupTitle}>Product</h3>
            <div className={styles.deliverablesGrid}>
              <div className={styles.deliverableTile}>
                <span className={styles.deliverableIcon} aria-hidden>
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 4h12l6 6v18H8V4z" /><path d="M20 4v6h6" /></svg>
                </span>
                <span className={styles.deliverableLabel}>Product brief</span>
              </div>
              <div className={styles.deliverableTile}>
                <span className={styles.deliverableIcon} aria-hidden>
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="16" cy="14" r="8" /><path d="M10 22a6 6 0 0 1 12 0" /><path d="M16 10v2M14 14h4" /></svg>
                </span>
                <span className={styles.deliverableLabel}>Problem statement and JTBD</span>
              </div>
              <div className={styles.deliverableTile}>
                <span className={styles.deliverableIcon} aria-hidden>
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8h20M6 14h20M6 20h14" /></svg>
                </span>
                <span className={styles.deliverableLabel}>PRD</span>
              </div>
              <div className={styles.deliverableTile}>
                <span className={styles.deliverableIcon} aria-hidden>
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h24v4H4zM4 14h24v4H4zM4 22h16v4H4z" /></svg>
                </span>
                <span className={styles.deliverableLabel}>Prioritized backlog</span>
              </div>
              <div className={styles.deliverableTile}>
                <span className={styles.deliverableIcon} aria-hidden>
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 24l8-8 8 8M16 16V8" /><path d="M4 28h24" /></svg>
                </span>
                <span className={styles.deliverableLabel}>MVP scope and tradeoffs</span>
              </div>
              <div className={styles.deliverableTile}>
                <span className={styles.deliverableIcon} aria-hidden>
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 24V8l12 8 12-8v16" /><path d="M4 16l12 8 12-8" /></svg>
                </span>
                <span className={styles.deliverableLabel}>Success metrics</span>
              </div>
            </div>
          </div>

          <div className={styles.deliverablesGroup}>
            <h3 className={styles.deliverablesGroupTitle}>UX</h3>
            <div className={styles.deliverablesGrid}>
              <div className={styles.deliverableTile}>
                <span className={styles.deliverableIcon} aria-hidden>
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="14" cy="14" r="6" /><path d="M20 20l4 4" /></svg>
                </span>
                <span className={styles.deliverableLabel}>Research insights summary</span>
              </div>
              <div className={styles.deliverableTile}>
                <span className={styles.deliverableIcon} aria-hidden>
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="16" cy="10" r="4" /><path d="M8 28c0-4 4-8 8-8s8 4 8 8" /></svg>
                </span>
                <span className={styles.deliverableLabel}>Personas or proto-personas</span>
              </div>
              <div className={styles.deliverableTile}>
                <span className={styles.deliverableIcon} aria-hidden>
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 16h6l4-8 4 12 4-4h6" /></svg>
                </span>
                <span className={styles.deliverableLabel}>User journeys</span>
              </div>
              <div className={styles.deliverableTile}>
                <span className={styles.deliverableIcon} aria-hidden>
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="6" width="24" height="20" rx="1" /><path d="M4 12h24M10 12v14" /></svg>
                </span>
                <span className={styles.deliverableLabel}>Wireframes</span>
              </div>
              <div className={styles.deliverableTile}>
                <span className={styles.deliverableIcon} aria-hidden>
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="24" height="24" rx="2" /><path d="M4 12h24M12 4v24" /></svg>
                </span>
                <span className={styles.deliverableLabel}>High-fidelity designs</span>
              </div>
              <div className={styles.deliverableTile}>
                <span className={styles.deliverableIcon} aria-hidden>
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h10v10H4zM18 4h10v10H18zM4 18h10v10H4zM18 18h10v10H18z" /></svg>
                </span>
                <span className={styles.deliverableLabel}>Design system foundations</span>
              </div>
            </div>
          </div>
        </section>

        {/* 03 Why work with us + Our process */}
        <section id="why-us" className={styles.whySection}>
          <span className={styles.sectionNum}>03</span>
          <h2 className={styles.whyTitle}>Why work with us</h2>
          <p className={styles.whyLead}>
            We cut through opinions, kill weak ideas early, and make the hard tradeoffs most teams avoid. We don&apos;t chase consensus or comfort. We drive momentum and results. You leave with concrete product and UX artifacts your team can ship immediately, not slides that die in a folder.
          </p>
          <ul className={styles.whyBulletList}>
            <li>30+ years across Product, UX, and software. We&apos;ve shipped and we&apos;ve failed. Lessons earned inside teams at:</li>
          </ul>
          <div className={styles.companyLogos}>
            <span className={styles.companyLogoName}>Amazon</span>
            <span className={styles.companyLogoName}>Autodesk</span>
            <span className={styles.companyLogoName}>Zillow</span>
            <span className={styles.companyLogoName}>Chewy</span>
            <span className={styles.companyLogoName}>TikTok</span>
            <span className={styles.companyLogoName}>T-Mobile</span>
            <span className={styles.companyLogoName}>BlackBerry</span>
            <span className={styles.companyLogoName}>VMware</span>
          </div>
          <a href="#how-it-works" className={styles.processBtn}>Our process</a>
        </section>

        {/* 04 How it works */}
        <section id="how-it-works" className={styles.processSection}>
          <span className={styles.sectionNum}>04</span>
          <h2 className={styles.sectionTitle}>How it works</h2>
          <ol className={styles.steps}>
            <li>
              <span className={styles.stepNum}>1</span>
              <div>
                <strong>Kickoff and alignment</strong> — We lock scope, outcomes, and success metrics so there’s no drift. You get a clear brief and we agree on what “done” looks like.
              </div>
            </li>
            <li>
              <span className={styles.stepNum}>2</span>
              <div>
                <strong>Research and synthesis</strong> — User insights are gathered and turned into clear decisions. No report that sits in a drawer; we produce a decision log and prioritized opportunities.
              </div>
            </li>
            <li>
              <span className={styles.stepNum}>3</span>
              <div>
                <strong>Backlog and flows</strong> — Groomed backlog with acceptance criteria, plus UX flows and key screens for the features that will move the needle.
              </div>
            </li>
            <li>
              <span className={styles.stepNum}>4</span>
              <div>
                <strong>Handoff</strong> — Design foundations and documentation your team can build on. We leave you ready to implement, not wondering what to do next.
              </div>
            </li>
          </ol>
        </section>

        {/* 05 Solutions — three offerings */}
        <section id="solutions" className={styles.solutionsSection}>
          <span className={styles.sectionNum}>05</span>
          <h2 className={styles.solutionsTitle}>Solutions</h2>

          <article className={styles.solutionBlock}>
            <span className={styles.solutionNum}>01</span>
            <h3 className={styles.solutionTitle}>Product &amp; UX Audit</h3>
            <p className={styles.solutionPrice}>$525 · 90-minute senior review</p>
            <p className={styles.solutionWho}>For founders and product leaders who want clarity before spending more time or money on engineering.</p>
            <div className={styles.solutionGrid}>
              <div>
                <h4 className={styles.blockLabel}>How it works</h4>
                <ul className={styles.bulletList}>
                  <li>We review your product, roadmap, and UX against your business goals</li>
                  <li>We pinpoint the real bottleneck slowing you down</li>
                  <li>We pressure-test assumptions and call out trade-offs</li>
                  <li>We recommend the smartest next move</li>
                </ul>
              </div>
              <div>
                <h4 className={styles.blockLabel}>What you get</h4>
                <ul className={styles.bulletList}>
                  <li>A 1-page executive audit with clear priorities</li>
                  <li>A direct recommendation: quick fixes, a focused sprint, or deeper discovery</li>
                  <li>A follow-up call to unblock decisions and reduce risk</li>
                </ul>
              </div>
            </div>
            <a href="#contact" className={styles.addServiceBtn} onClick={(e) => { e.preventDefault(); addService("Product & UX Audit"); }}>Add service</a>
          </article>

          <article className={`${styles.solutionBlock} ${styles.solutionBlockFlagship}`}>
            <span className={styles.flagshipBadge}>Flagship</span>
            <span className={styles.solutionNum}>02</span>
            <h3 className={styles.solutionTitle}>Discovery Program</h3>
            <p className={styles.solutionPrice}>$18,500 · 3 sprints · fixed scope</p>
            <p className={styles.solutionWho}>For teams building or evolving a core product who need clarity and speed, not guesses.</p>
            <div className={styles.solutionGrid}>
              <div>
                <h4 className={styles.blockLabel}>How it works</h4>
                <ul className={styles.bulletList}>
                  <li>Lock scope, success criteria, and constraints upfront</li>
                  <li>Run focused research and document decisions, not opinions</li>
                  <li>Turn insights into a build-ready backlog</li>
                  <li>Design only what moves the product forward</li>
                </ul>
              </div>
              <div>
                <h4 className={styles.blockLabel}>What you get</h4>
                <ul className={styles.bulletList}>
                  <li>A ship-ready backlog with clear acceptance criteria</li>
                  <li>Research synthesis and a decision log for alignment</li>
                  <li>UX flows and key screens for the critical path</li>
                  <li>Design foundations your team can extend with confidence</li>
                </ul>
              </div>
            </div>
            <a href="#contact" className={styles.addServiceBtn} onClick={(e) => { e.preventDefault(); addService("Discovery Program"); }}>Add service</a>
          </article>

          <article className={styles.solutionBlock}>
            <span className={styles.solutionNum}>03</span>
            <h3 className={styles.solutionTitle}>Add a Sprint</h3>
            <p className={styles.solutionPrice}>$6,200 · 1 sprint extension</p>
            <p className={styles.solutionWho}>For teams already working with us or who need a few extra sprints to finish strong.</p>
            <div className={styles.solutionGrid}>
              <div>
                <h4 className={styles.blockLabel}>How it works</h4>
                <ul className={styles.bulletList}>
                  <li>Same team, same context</li>
                  <li>Scope locked before kickoff</li>
                  <li>Focused on closing gaps, not opening new ones</li>
                </ul>
              </div>
              <div>
                <h4 className={styles.blockLabel}>What you get</h4>
                <ul className={styles.bulletList}>
                  <li>Additional flows, screens, or backlog items</li>
                  <li>Updated design system and documentation</li>
                  <li>Clean, low-friction handoff to your team</li>
                </ul>
              </div>
            </div>
            <a href="#contact" className={styles.addServiceBtn} onClick={(e) => { e.preventDefault(); addService("Add a Sprint"); }}>Add service</a>
          </article>
        </section>

        {/* 06 FAQ */}
        <section id="faq" className={styles.section}>
          <div className={styles.card}>
            <span className={styles.sectionNum}>06</span>
            <h2 className={styles.sectionTitle}>FAQ</h2>
            <div className={styles.faq}>
              <details className={styles.faqItem} open>
                <summary>What do you deliver?</summary>
                <div className={styles.faqBody}>
                  Build-ready product and UX artifacts: a clear product brief, research synthesis, a prioritized backlog with acceptance criteria, UX flows, and design foundations your team can extend.
                </div>
              </details>
              <details className={styles.faqItem} open>
                <summary>Who is this for?</summary>
                <div className={styles.faqBody}>
                  Founders and product teams at any stage who need clarity, alignment, and momentum.
                </div>
              </details>
              <details className={styles.faqItem} open>
                <summary>What problem do you actually solve?</summary>
                <div className={styles.faqBody}>
                  Ambiguity. Too many ideas, too many opinions, and not enough decisions.
                </div>
              </details>
              <details className={styles.faqItem} open>
                <summary>How is this different from an agency or consultancy?</summary>
                <div className={styles.faqBody}>
                  We don&apos;t optimize for output or recommendations. We optimize for decisions and shippable direction.
                </div>
              </details>
              <details className={styles.faqItem} open>
                <summary>Is this discovery, strategy, or execution?</summary>
                <div className={styles.faqBody}>
                  Discovery that collapses into execution. Strategy only matters if it changes what gets built next.
                </div>
              </details>
              <details className={styles.faqShowAll}>
                <summary className={styles.faqShowAllSummary}>Show all FAQs</summary>
                <div className={styles.faqMore}>
                  <details className={styles.faqItem}>
                    <summary>How do you keep scope under control?</summary>
                    <div className={styles.faqBody}>
                      Outcomes are locked up front. Sprints are capped. Tradeoffs are written down. New work replaces existing work.
                    </div>
                  </details>
                  <details className={styles.faqItem}>
                    <summary>What if priorities change mid-engagement?</summary>
                    <div className={styles.faqBody}>
                      We adjust by re-cutting scope. We don&apos;t expand timelines.
                    </div>
                  </details>
                  <details className={styles.faqItem}>
                    <summary>How fast do you work?</summary>
                    <div className={styles.faqBody}>
                      Most engagements run 2–6 weeks. Speed comes from focus, not shortcuts.
                    </div>
                  </details>
                  <details className={styles.faqItem}>
                    <summary>Who will we work with?</summary>
                    <div className={styles.faqBody}>
                      A small senior Product and UX team with 30+ years across product, design, and software.
                    </div>
                  </details>
                  <details className={styles.faqItem}>
                    <summary>Do you work with existing teams or replace them?</summary>
                    <div className={styles.faqBody}>
                      We work alongside your team. The goal is to unblock and accelerate, not replace.
                    </div>
                  </details>
                  <details className={styles.faqItem}>
                    <summary>Do you do user research?</summary>
                    <div className={styles.faqBody}>
                      Yes, when it reduces risk. We avoid research that doesn&apos;t inform decisions.
                    </div>
                  </details>
                  <details className={styles.faqItem}>
                    <summary>Will you talk to customers or users?</summary>
                    <div className={styles.faqBody}>
                      Yes, if it improves confidence in what gets built next.
                    </div>
                  </details>
                  <details className={styles.faqItem}>
                    <summary>What if we already have a roadmap?</summary>
                    <div className={styles.faqBody}>
                      We pressure-test it and reduce risk before more is built.
                    </div>
                  </details>
                  <details className={styles.faqItem}>
                    <summary>What if we already know what to build?</summary>
                    <div className={styles.faqBody}>
                      Then we help confirm it or expose weak assumptions early.
                    </div>
                  </details>
                  <details className={styles.faqItem}>
                    <summary>How do you handle stakeholder disagreement?</summary>
                    <div className={styles.faqBody}>
                      We surface it early and resolve it with evidence and tradeoffs, not politics.
                    </div>
                  </details>
                  <details className={styles.faqItem}>
                    <summary>What happens after the engagement?</summary>
                    <div className={styles.faqBody}>
                      You own everything. Backlog, designs, decisions, and rationale. No dependency. No retainer.
                    </div>
                  </details>
                  <details className={styles.faqItem}>
                    <summary>What&apos;s the biggest risk of working with you?</summary>
                    <div className={styles.faqBody}>
                      You&apos;ll be forced to make decisions you&apos;ve been avoiding.
                    </div>
                  </details>
                  <details className={styles.faqItem}>
                    <summary>What&apos;s the biggest risk of not working with you?</summary>
                    <div className={styles.faqBody}>
                      Shipping the wrong thing with confidence.
                    </div>
                  </details>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* 07 Contact */}
        <section id="contact" className={styles.contactSection}>
          <span className={styles.sectionNum}>07</span>
          <h2 className={styles.contactTitle}>Send one note.</h2>
          <p className={styles.contactLead}>
            Tell us what you’re building and where it’s stuck. We’ll reply with a clear next step.
          </p>
          <form onSubmit={handleSubmit} className={styles.form}>
            {selectedService && (
              <div className={styles.selectedService}>
                <span>Inquiring about: <strong>{selectedService}</strong></span>
                <button type="button" className={styles.selectedServiceClear} onClick={() => setSelectedService(null)} aria-label="Remove service">×</button>
              </div>
            )}
            <label className={styles.label}>
              Name <span className={styles.required}>*</span>
              <input type="text" name="name" required className={styles.input} disabled={formState === "sending"} />
            </label>
            <label className={styles.label}>
              Email <span className={styles.required}>*</span>
              <input type="email" name="email" required className={styles.input} disabled={formState === "sending"} />
            </label>
            <label className={styles.label}>
              Message <span className={styles.required}>*</span>
              <textarea name="message" rows={4} required className={styles.textarea} disabled={formState === "sending"} />
            </label>
            {formState === "error" && <p className={styles.formError} role="alert">{formError}</p>}
            {formState === "sent" && <p className={styles.formSuccess}>Message sent. We’ll get back to you soon.</p>}
            <button type="submit" className={styles.submit} disabled={formState === "sending"}>
              {formState === "sending" ? "Sending…" : "Let’s chat"}
            </button>
          </form>
        </section>

        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <nav className={styles.footerNav}>
              <a href="#solutions">Solutions</a>
              <a href="#deliverables">Deliverables</a>
              <a href="#why-us">Why us</a>
              <a href="#how-it-works">How it works</a>
              <a href="/work">Work</a>
              <a href="#contact">Contact</a>
            </nav>
            <p className={styles.footerText}>Safe Mode — Product & UX discovery studio.</p>
          </div>
        </footer>
      </main>
    </>
  )
}
