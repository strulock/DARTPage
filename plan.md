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

### Lower Priority

- [ ] **Add deployment notifications on failure**
  The deploy workflow completes silently on failure. Add a step to post a notification
  (GitHub issue, Slack, or email) when deployment fails.

- [ ] **Add Lighthouse / accessibility CI step**
  Add a CI step using `pa11y` or `axe` to automatically catch accessibility regressions
  on each PR. Could be a separate workflow file.
