# Typography system

Single source of truth for type across the site. All text uses design tokens from `app/globals.css`; no raw `px` or ad-hoc `rem` for font sizes (except icons).

---

## Token table

| Token | Size (rem) | Line-height | Weight | Usage |
|-------|------------|-------------|--------|--------|
| **--text-h1** | clamp(1.75, 4.5vw, 3.5) | --lh-h1 (1.2) | semibold | Hero headline |
| **--text-h2** | clamp(1.375, 2.5vw, 2) | --lh-h2 (1.3) | medium | Section titles |
| **--text-h3** | 1.375 (22px) | --lh-h3 (1.3) | medium | Card titles, subsections |
| **--text-h4** | 1.125 (18px) | --lh-h4 (1.3) | medium | Pricing name, small headings |
| **--text-body-lg** | 1.125 (18px) | --lh-body (1.55) | regular/light | Section leads, intro paragraphs |
| **--text-body** | 1 (16px) | --lh-body | regular/light | Body copy, lists, inputs |
| **--text-body-sm** | 0.875 (14px) | --lh-caption | regular | Secondary body (deliverables intro) |
| **--text-caption** | 0.875 (14px) | --lh-caption (1.43) | regular/medium | Nav, footer, labels, captions |
| **--text-overline** | 0.6875 (11px) | — | semibold | Section numbers, badges, form labels |
| **--text-lead** | 1.25 (20px) | --lh-body | regular/light | Hero narrative, narrative lead |
| **--text-price** | 1.5 (24px) | — | regular | Price display |
| **--text-logo** | 1.125 (18px) | — | semibold | Site logo |
| **--text-button** | 1 (16px) | — | medium | Buttons, CTAs |
| **--text-input** | 1 (16px) | — | regular | Input/textarea |
| **--text-label** | 0.6875 (11px) | — | medium | Form labels (overline style) |
| **--text-helper** | 0.875 (14px) | — | regular | Form helper/error/success |

### Line-height tokens

| Token | Value | Use for |
|-------|--------|---------|
| --lh-h1 | 1.2 | Hero title |
| --lh-h1-mobile | 1.1 | Hero title on small screens |
| --lh-h2, --lh-h3, --lh-h4 | 1.3 | Headings |
| --lh-body, --lh-body-default | 1.55 | Body, leads |
| --lh-relaxed | 1.6 | Long narrative |
| --lh-caption | 1.43 | Captions, small copy |
| --leading-normal | 1.5 | Lists, mobile narrative |

### Font-weight tokens (3 weights)

| Token | Value |
|-------|--------|
| --font-light | 300 |
| --font-regular | 400 |
| --fw-regular | 400 |
| --font-medium, --fw-medium | 500 |
| --font-semibold, --fw-semibold | 600 |

### Letter-spacing tokens

| Token | Value | Use for |
|-------|--------|--------|
| --tracking-tight | -0.025em | H1, logo |
| --tracking-wide | 0.01em | Body, links |
| --tracking-wider | 0.04em | Nav, footer, captions |
| --tracking-widest | 0.06em | Overline, hero label |
| --tracking-num | 0.08em | Section numbers |
| --tracking-label | 0.05em | Labels, badges, uppercase blocks |

---

## Responsive behavior

- **Base:** `html { font-size: 16px }`. All type in `rem`.
- **H1 (hero):** `clamp(1.75rem, 4.5vw, 3.5rem)` — fluid from 28px to 56px. Mobile uses `--text-scale-28` (1.75rem) and `--lh-h1-mobile` (1.1) inside `@media (max-width: 480px)`.
- **H2 (section heading):** `clamp(1.375rem, 2.5vw, 2rem)` — 22px–32px.
- **Logo:** Default `--text-logo` (1.125rem); mobile `--text-logo-mobile` (1.0625rem) at 480px.
- **Hero label:** Mobile `--text-scale-13` (0.8125rem).
- No other type uses breakpoint overrides; fluid clamp handles scaling.

---

## Do / Don't

### Do

- Use semantic tokens for every text element: `font-size: var(--text-body)`, `line-height: var(--lh-body)`.
- Use `--text-h2` (or `--section-heading-*`) for all section titles.
- Use `--text-overline` for section numbers, badges, and form labels.
- Use `--text-button` and `--btn-primary-*` for buttons.
- Use `--text-helper` for form error/success messages.
- Keep max line length via `max-width: var(--content-prose)` (720px) for long copy.
- Use 2–3 weights only: light (300), regular (400), medium (500), semibold (600).

### Don't

- Don’t set `font-size` in `px` (except for icons or fixed UI like 1px borders).
- Don’t use raw `rem` for type (e.g. `1.25rem`) — use a token (e.g. `var(--text-lead)`).
- Don’t add new one-off line-heights; use `--lh-*` or `--leading-*`.
- Don’t use font-weight 700+ (no bold/black) for the main hierarchy.
- Don’t mix different letter-spacing values for the same role; use `--tracking-*`.

### Exceptions (documented)

- **`.heroDropdownOption`** uses `font-size: 0.4em` so the dropdown label scales with the hero title; no token.
- **Icon/control elements** (e.g. close button with symbol) may use `line-height: 1` for vertical centering; not body text.

---

## Where tokens are used

| Area | Tokens used |
|------|-------------|
| **Hero** | --text-h1, --lh-h1, --text-lead, --text-caption (label), --text-button |
| **Nav** | --text-logo, --text-caption, --font-medium, --tracking-wider |
| **Section titles** | --section-heading-font-size (--text-h2), --lh-h2, --fw-medium |
| **Section leads** | --section-lead-font-size (--text-body-lg), --lh-body |
| **Cards (solution, pricing)** | --text-h3, --text-h4, --text-price, --text-caption, --text-body-lg, --text-overline (badge) |
| **Forms** | --text-label, --text-input, --text-helper, --text-button (submit) |
| **FAQ** | --text-body, --lh-body, --font-medium (summary) |
| **Footer** | --text-caption, --tracking-wider |
| **Buttons** | --text-button, --btn-primary-font-size, --btn-primary-font-weight |

---

## Optional React components

`app/components/Typography.jsx` exports semantic wrappers that apply token-based classes for reuse:

- `H1`, `H2`, `H3`, `H4` — headings
- `Text` (body, bodyLg, bodySm)
- `Label`, `HelperText`

These map to the same CSS variables; use them for new sections or refactor existing markup to use them over time.
