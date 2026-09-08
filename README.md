# cloudsurfing Jupiter

Personal project. More coming soon.
# Manifesto

The public article lives at `/manifesto`, linked from the shared homepage navigation.
`content/manifesto.md` preserves the current approved copy; Git retains earlier revisions.
`content/manifesto.json` contains the same copy grouped into editorial paragraphs;
headings, emphasis, and the closing principles list are retained.

Run `npm run verify:manifesto` to check wording and order against the approved copy.
The reader layout reuses the homepage artwork with a static, muted background and
a dark content panel. It is rendered statically and requires no authentication.

Validation: production build, browser navigation from the homepage and back,
rendered-text comparison, and responsive checks at 320, 390, 768, and 1280 pixels.
