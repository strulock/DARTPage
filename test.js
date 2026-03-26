const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
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

console.log('\nLink checks:');
check('HP official DART info page linked', html.includes('hptx.org/599/DART-Transportation-Information'));
check('HPCL endorsements linked', html.includes('highlandparkcommunityleague.org/2026-endorsements'));
check('Dallas County Votes linked', html.includes('dallascountyvotes.org'));
check('Mayor DMN op-ed linked', html.includes('dallasnews.com/opinion/commentary/2026/03/10'));
check('E&Y study linked', html.includes('acrobat.adobe.com'));

console.log('\nMobile/accessibility checks:');
check('Has viewport meta tag', html.includes('name="viewport"'));
check('Has nav-toggle for mobile', html.includes('nav-toggle'));
check('Hero CTAs in flex wrapper', html.includes('class="hero-ctas"'));
check('Nav Join Us uses CSS class', html.includes('class="nav-join"'));
check('No inline styles on hero CTA buttons', !html.includes('hero-cta" style='));
check('Logo has alt text', html.includes('alt="Highland Park Community League"'));

console.log(`\n${passed} passed, ${failed} failed\n`);
if (failed > 0) process.exit(1);
