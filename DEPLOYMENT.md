# Deployment Guide

This guide covers deploying your law firm website to production.

## Pre-Deployment Checklist

- [ ] Database is set up and populated with initial data
- [ ] Admin account is created
- [ ] All content is reviewed and approved
- [ ] Environment variables are configured
- [ ] Build completes successfully (`npm run build`)
- [ ] Website tested on multiple devices and browsers

## Environment Variables

Make sure these are set in your production environment:

```
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_supabase_anon_key
```

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel offers excellent performance and easy deployment for React apps.

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel --prod
```

4. **Configure Environment Variables:**
   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings > Environment Variables
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

### Option 2: Netlify

Netlify is another excellent choice for static sites.

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Build the project:**
```bash
npm run build
```

3. **Deploy:**
```bash
netlify deploy --prod --dir=dist
```

4. **Configure Environment Variables:**
   - Go to Site settings > Environment variables
   - Add your Supabase credentials

### Option 3: Traditional Hosting (cPanel, etc.)

1. **Build the project:**
```bash
npm run build
```

2. **Upload files:**
   - Upload all files from the `dist` folder to your web server
   - Make sure `.env` file is NOT uploaded (it's for local development only)

3. **Configure Environment Variables:**
   - Set environment variables through your hosting control panel
   - Or create a server-side configuration file

## Post-Deployment Steps

### 1. Update Supabase Settings

Go to your Supabase project dashboard:

1. **Authentication Settings:**
   - Navigate to Authentication > URL Configuration
   - Add your production URL to Site URL
   - Add redirect URLs for authentication

2. **CORS Settings:**
   - Navigate to Settings > API
   - Add your production domain to allowed origins if needed

### 2. Test Everything

- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Staff profiles display properly
- [ ] Practice areas are accessible
- [ ] Insights page shows articles
- [ ] Contact form is functional
- [ ] Admin login works
- [ ] Admin can create/edit/delete content
- [ ] Images load correctly
- [ ] Mobile responsiveness works
- [ ] All animations function smoothly

### 3. Set Up Analytics (Optional)

Consider adding:
- Google Analytics
- Supabase Analytics
- Custom event tracking

### 4. Security Hardening

- [ ] Enable HTTPS (SSL certificate)
- [ ] Set up security headers
- [ ] Configure CSP (Content Security Policy)
- [ ] Enable rate limiting on API endpoints
- [ ] Set up backup schedule for database

### 5. Performance Optimization

- [ ] Enable CDN if available
- [ ] Configure caching headers
- [ ] Optimize images (consider using a CDN)
- [ ] Enable compression (gzip/brotli)
- [ ] Set up performance monitoring

## Domain Configuration

### Custom Domain Setup

1. **Purchase/Transfer Domain:**
   - Buy from registrars like Namecheap, GoDaddy, etc.
   - Example: `adansonia.co.ke` or `kiambambithi.com`

2. **DNS Configuration:**

   For Vercel:
   ```
   A Record:  @ → 76.76.21.21
   CNAME:     www → cname.vercel-dns.com
   ```

   For Netlify:
   ```
   A Record:  @ → 75.2.60.5
   CNAME:     www → your-site.netlify.app
   ```

3. **SSL Certificate:**
   - Most platforms (Vercel, Netlify) provide free SSL
   - Certificate should auto-provision within 24 hours

### Email Setup

For professional emails (admin@adansonia.info):

1. **Option A: Google Workspace**
   - Purchase Google Workspace
   - Verify domain ownership
   - Configure MX records

2. **Option B: Custom Email Hosting**
   - Use your domain registrar's email service
   - Configure MX records as provided

## Maintenance

### Regular Tasks

**Weekly:**
- Review and respond to contact form submissions
- Check for broken links
- Monitor website performance

**Monthly:**
- Update insights/articles
- Review and update staff profiles
- Check security updates
- Review analytics

**Quarterly:**
- Update practice area information
- Review and update privacy policy
- Backup database
- Performance audit

### Updates and Backups

1. **Database Backups:**
```bash
# Supabase provides automatic backups
# You can also export data manually from the dashboard
```

2. **Code Backups:**
   - Keep code in version control (Git)
   - Tag releases for easy rollback

3. **Content Backups:**
   - Regular exports of staff profiles
   - Save insights as markdown files
   - Document practice area updates

## Troubleshooting

### Build Fails

Check:
- Node version compatibility
- Package dependencies
- TypeScript errors
- Environment variables

### Database Connection Issues

Verify:
- Supabase URL is correct
- API key is valid
- RLS policies are configured
- Network connectivity

### Performance Issues

Solutions:
- Enable caching
- Optimize images
- Use CDN for assets
- Minimize bundle size

## Monitoring

Set up monitoring for:
- Uptime (UptimeRobot, Pingdom)
- Error tracking (Sentry)
- Performance (Lighthouse CI)
- User analytics (Google Analytics)

## Support Resources

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Supabase Docs: https://supabase.com/docs
- React Router: https://reactrouter.com

---

For questions about deployment, consult the platform-specific documentation or contact your hosting provider.
