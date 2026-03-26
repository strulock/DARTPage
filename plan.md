# DARTPage — Improvement Plan

Based on the full repo review conducted March 26, 2026.

---

## Already Completed

- [x] SEO meta description
- [x] Open Graph tags (title, description, type, url, image)
- [x] Twitter card tags
- [x] Canonical tag (`https://notodart.org`)
- [x] HPCL logo hosted locally (`hpcl-logo.png`)
- [x] Deploy workflow gated on tests passing (`needs: test`)
- [x] **Add `noreferrer` to external links** — all external links now use `rel="noopener noreferrer"`
- [x] **Add structured data (Schema.org)** — Event schema added to `<head>`
- [x] **Add OG share image** — 1200×630 `share-image.svg` created; `og:image` and `twitter:image` updated
- [x] **Expand test coverage** — heading hierarchy, all img alt attributes, internal anchors, file size check
- [x] **Fix `$9M` → `$8M`** — stat number, stat label (with projected $9M noted), hero subtext, and all meta tags updated
- [x] **Share image styling** — blue background, white VOTE/TO DART, gold italic underlined NO, gold border, NoToDART.org URL
- [x] **Share image layout** — resolved NO/TO DART overlap, rebalanced vertical spacing
- [x] **Consolidate inline styles into CSS classes** — all `style=` attributes removed; replaced with `.no-styled`, `.quote-link`, `.news-card--featured`, `.stat-only`, `.stat-single`, `.link-gold`, `.footer-tagline`, `.footer-election-date`, `.footer-polad`, `.footer-legal`
- [x] **Fix inconsistent NO styling** — `.no-styled` (italic + underline) applied consistently to all three NO instances (header, h2, footer)
- [x] **Replace hardcoded hex colors with CSS variables** — 5 new variables added to `:root`; all hardcoded hex colors replaced throughout CSS
- [x] **Optimize Google Fonts loading** — audited all weights; all are in use; added missing `fonts.gstatic.com` preconnect

### Lower Priority

- [x] **Add deployment notifications on failure** — `deploy.yml` now creates a GitHub issue (labeled `bug`) with a link to the failed run when deploy fails
- [x] **Add accessibility CI step** — new `accessibility.yml` workflow runs `pa11y` at WCAG2AA level on every PR and push to main using a local server and system Chrome
