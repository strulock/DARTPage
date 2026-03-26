const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const stats = fs.statSync('index.html');
let passed = 0;
let failed = 0;

function check(description, condition) {
  if (condition) {
    console.log(`  ✓ ${description}`);
    passed++;
  } else {
    console.error(`  ✗ ${description}`);
    failed++;
  }
}

console.log('\nContent checks:');
check('Has doctype', html.startsWith('<!DOCTYPE html>'));
check('Has page title', html.includes('<title>Vote NO to DART'));
check('Has hero section', html.includes('class="hero"'));
check('Has stat band', html.includes('class="stat-band"'));
check('Has reasons section', html.includes('id="reasons"'));
check('Has news section', html.includes('id="news"'));
check('Has FAQ section', html.includes('id="faq"'));
check('Has footer', html.includes('<footer>'));
check('Has election date May 2 2026', html.includes('May 2, 2026'));
check('No "special election" in site copy (news headlines excluded)', !html.replace(/href="[^"]*"/gi, '').replace(/<div class="news-headline">[^<]*<\/div>/gi, '').toLowerCase().includes('special election'));
check('Has Vote NO headline', html.includes('Vote') && html.includes('class="no"'));

check('Has meta description', html.includes('<meta name="description"'));
check('Has canonical link', html.includes('<link rel="canonical"'));
check('Has OG title', html.includes('property="og:title"'));
check('Has OG description', html.includes('property="og:description"'));
check('Has Twitter card', html.includes('name="twitter:card"'));
check('Logo hosted locally', html.includes('src="hpcl-logo.png"'));
check('Has structured data JSON-LD', html.includes('application/ld+json'));

console.log('\nLink checks:');
check('HP official DART info page linked', html.includes('hptx.org/599/DART-Transportation-Information'));
check('HPCL vote-no-to-dart linked', html.includes('highlandparkcommunityleague.org/vote-no-to-dart/'));
check('Dallas County Votes linked', html.includes('dallascountyvotes.org'));
check('Mayor DMN op-ed linked', html.includes('dallasnews.com/opinion/commentary/2026/03/10'));
check('E&Y study linked', html.includes('acrobat.adobe.com'));
check('External links use noopener noreferrer', !html.includes('rel="noopener"') || html.includes('rel="noopener noreferrer"'));
check('No bare noopener without noreferrer', (() => {
  const matches = html.match(/rel="noopener(?!\s+noreferrer)[^"]*"/g);
  return !matches || matches.length === 0;
})());

console.log('\nMobile/accessibility checks:');
check('Has viewport meta tag', html.includes('name="viewport"'));
check('Has nav-toggle for mobile', html.includes('nav-toggle'));
check('Hero CTAs in flex wrapper', html.includes('class="hero-ctas"'));
check('Nav Join Us uses CSS class', html.includes('class="nav-join"'));
check('No inline styles on hero CTA buttons', !html.includes('hero-cta" style='));
check('Logo has alt text', html.includes('alt="Highland Park Community League"'));
check('All img tags have alt attributes', (() => {
  const imgs = html.match(/<img[^>]*>/gi) || [];
  return imgs.every(tag => /alt="[^"]*"/.test(tag));
})());

console.log('\nStructure checks:');
check('Exactly one h1', (html.match(/<h1[\s>]/gi) || []).length === 1);
check('No skipped heading levels (h3 without h2)', (() => {
  const hasH2 = html.includes('<h2');
  const hasH3 = html.includes('<h3');
  return !hasH3 || hasH2;
})());
check('Internal anchor #reasons exists', html.includes('id="reasons"'));
check('Internal anchor #news exists', html.includes('id="news"'));
check('Internal anchor #faq exists', html.includes('id="faq"'));
check('Page file size under 200KB', stats.size < 200 * 1024);
check('Page file size warning if over 100KB', (() => {
  if (stats.size >= 100 * 1024) {
    console.log(`    (info: index.html is ${Math.round(stats.size / 1024)}KB — consider optimizing)`);
  }
  return true;
})());

console.log(`\n${passed} passed, ${failed} failed\n`);
if (failed > 0) process.exit(1);
