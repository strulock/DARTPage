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

---

## Remaining Items

### High Priority

- [ ] **Consolidate inline styles into CSS classes**
  Multiple elements use inline `style=` attributes that should be CSS classes. Key offenders:
  - Nav title bar `<em style="font-style:italic; text-decoration:underline;">`
  - Section title `<em style="text-decoration:underline;">`
  - Footer `<p style="font-family:...">` blocks
  - Mayor quote link `style="text-decoration:none; color:inherit;"`
  - Featured news card `style="border-color:...; background:..."`
  Create a reusable `.no-styled` class (italic + underline + gold) for all "NO" instances.
  Consider enabling `"inline-style-disabled": true` in `.htmlhintrc`.

- [ ] **Fix inconsistent NO styling**
  In the nav title bar, "NO" is italic + underlined. In the case-for-withdrawal section title, "NO" is underlined but not italic. Should use a single CSS class everywhere for consistency.

### Medium Priority

- [ ] **Replace hardcoded hex colors with CSS variables**
  Several colors used in CSS are not referenced from `:root` variables:
  - `#fdfaf5` (featured news card hover)
  - `#f1ece2` (news section background)
  - `#374151`, `#4b5563` (text colors in FAQ and reasons sections)
  Add these to the `:root` block and replace all direct usages.

- [ ] **Optimize Google Fonts loading**
  Three font families are loaded with many weight/style variants (~150–240KB total).
  Audit which weights are actually used and remove unused variants from the import URL.
  Consider whether all three families are necessary.

- [ ] **Expand test coverage**
  Current tests cover basic content and links but are missing:
  - Heading hierarchy validation (h1 → h2 only, no skipped levels)
  - All image `alt` attributes (beyond the logo)
  - No broken internal anchor links (`#reasons`, `#news`, `#faq` exist as IDs)
  - Page file size check (warn if >100KB)

- [ ] **Add `noreferrer` to external links**
  External links use `rel="noopener"` but not `noreferrer`. Adding `noreferrer` prevents
  the referring URL from being sent to linked sites, a minor privacy improvement.
  Find/replace `rel="noopener"` → `rel="noopener noreferrer"` throughout.

### Lower Priority

- [ ] **Add structured data (Schema.org)**
  Add a `<script type="application/ld+json">` block to `<head>` with Event schema:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Highland Park DART Withdrawal Election",
    "startDate": "2026-05-02",
    "location": {
      "@type": "Place",
      "name": "Highland Park, Texas"
    },
    "organizer": {
      "@type": "Organization",
      "name": "Highland Park Community League"
    }
  }
  ```
  Helps search engines surface the election date in results.

- [ ] **Add OG image**
  Currently `og:image` points to `hpcl-logo.png` which is a small logo on a transparent
  background — not ideal for social previews. Create a dedicated 1200×630px share image
  (e.g., "Vote NO to DART — May 2, 2026" on navy background with gold text) and update
  the `og:image` and `twitter:image` tags.

- [ ] **Add deployment notifications on failure**
  The deploy workflow completes silently on failure. Add a step to post a notification
  (GitHub issue, Slack, or email) when deployment fails.

- [ ] **Add Lighthouse / accessibility CI step**
  Add a CI step using `pa11y` or `axe` to automatically catch accessibility regressions
  on each PR. Could be a separate workflow file.
