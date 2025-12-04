## Plan: Connect Hostinger Domain to Vercel ## 
A step-by-step guide to connect your Hostinger domain to your Vercel deployment by configuring DNS records.

# Steps #
Add domain in Vercel: Go to your Vercel project → Settings → Domains → Click "Add" → Enter neuva.com → Add again for www.neuva.com

Access Hostinger DNS settings: Log in to Hostinger → Click "Domains" in sidebar → Select your domain → Click "DNS / Nameservers" → Select "Manage DNS records"

Remove conflicting records: Delete any existing A record with name @ and any CNAME record with name www

Add A record for root domain: Click "Add Record" → Type: A → Name: @ → Points to: 76.76.21.21 → TTL: 3600 → Save

Add CNAME record for www: Click "Add Record" → Type: CNAME → Name: www → Points to: cname.vercel-dns.com → TTL: 3600 → Save

Verify connection: Return to Vercel Domains settings → Wait 5-30 minutes → Domain status should turn green ✓ with SSL auto-provisioned

# Further Considerations # 
Propagation delay? Check status at dnschecker.org — full propagation can take up to 48 hours in rare cases
SSL not working? Vercel auto-provisions SSL once DNS propagates; if issues persist after 48 hours, try removing and re-adding the domain in Vercel

## Optimization ##
- Add comprehensive metadata in layout.tsx: Expand the basic "Neuva" title and "Brand Your Way" description to include keywords, OpenGraph tags, Twitter cards, canonical URL, and Google verification code.

- Create sitemap and robots files: Add app/sitemap.ts and app/robots.ts using Next.js built-in metadata API to help Google efficiently crawl and index your site.

- Implement JSON-LD structured data: Add Organization schema and FAQPage schema to page.tsx or layout for rich snippets in Google search results (star ratings, FAQ dropdowns).

- Set up Google Search Console: Verify domain ownership via HTML meta tag or DNS record in Hostinger, then submit sitemap.xml and request indexing.

- Integrate a headless CMS (Sanity or Payload CMS): Connect to your Next.js app to manage services, testimonials, portfolio items, and achievement images without code changes.

- Create an OpenGraph image: Add /public/og-image.jpg (1200x630px) for social media sharing previews.

- CMS Choice? Sanity (free tier, real-time preview, great Next.js plugin) vs Payload CMS (TypeScript native, self-hosted) — recommend Sanity for easier setup.

- Blog section for content marketing? Adding /blog pages with case studies and insights would significantly boost long-tail keyword traffic — requires additional page routes.

- Performance optimization? Your site uses three.js (~500KB) which impacts Core Web Vitals — consider lazy loading the 3D components or replacing with lighter alternatives for better SEO scores.