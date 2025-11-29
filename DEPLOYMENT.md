# Deployment Guide - VerVibe Platform

## 🚀 Quick Deploy to Vercel

### Prerequisites
- Vercel account
- Supabase account
- Omise account
- Domain name (vervibe.art)

### Step 1: Deploy to Vercel

1. Push code to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. Import to Vercel
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Configure build settings (auto-detected)

3. Add Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
OMISE_PUBLIC_KEY=
OMISE_SECRET_KEY=
NEXT_PUBLIC_APP_URL=https://vervibe.art
NEXT_PUBLIC_DOMAIN=vervibe.art
```

4. Deploy!

### Step 2: Setup Custom Domain

1. In Vercel project settings:
- Go to "Domains"
- Add domain: `vervibe.art`
- Add wildcard: `*.vervibe.art`

2. Update DNS (at your domain registrar):
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: *
Value: cname.vercel-dns.com
```

3. Wait for DNS propagation (up to 24 hours)

### Step 3: Setup Database

1. In Supabase:
```sql
-- Copy schema from prisma/schema.prisma
-- Or use Prisma migrate in production mode
```

2. Run migrations:
```bash
npx prisma migrate deploy
```

### Step 4: Configure Webhooks

1. Omise Dashboard:
- Go to Webhooks
- Add endpoint: `https://vervibe.art/api/webhooks/omise`
- Enable events:
  - charge.complete
  - charge.failed
  - subscription.cancelled

### Step 5: Test Everything

1. Test signup/login
2. Test artist profile creation
3. Test subscription flow
4. Test payment (use Omise test cards)
5. Test subdomain: `artist-slug.vervibe.art`

## 🔧 Environment-Specific Configuration

### Development
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Staging
```env
NEXT_PUBLIC_APP_URL=https://staging.vervibe.art
```

### Production
```env
NEXT_PUBLIC_APP_URL=https://vervibe.art
```

## 📊 Performance Optimization

1. **Enable caching**
```js
// next.config.js
module.exports = {
  // ... existing config
  headers: async () => [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, s-maxage=60' }
      ]
    }
  ]
}
```

2. **Image optimization**
- Use Next.js Image component
- Configure domains in next.config.js

3. **Database optimization**
- Add indexes (already in schema)
- Use connection pooling

## 🔐 Security Checklist

- [ ] Environment variables secured
- [ ] Webhook signatures verified
- [ ] HTTPS enabled
- [ ] CORS configured
- [ ] Rate limiting (via Vercel)
- [ ] Database RLS enabled
- [ ] API routes protected

## 📈 Monitoring

### Vercel Analytics
- Automatically enabled
- View at Vercel Dashboard

### Error Tracking (Optional)
Add Sentry:
```bash
npm install @sentry/nextjs
```

### Uptime Monitoring
- Use UptimeRobot or Pingdom
- Monitor: `https://vervibe.art`

## 🔄 CI/CD

Vercel auto-deploys:
- Production: Push to `main` branch
- Preview: Pull requests

## 🗄️ Backup Strategy

1. **Database backups** (Supabase)
- Auto-backups enabled
- Manual: Settings > Database > Backups

2. **File storage backups**
- Use Supabase storage backup
- Or separate S3 bucket

## 📱 Post-Deployment Tasks

1. Submit to search engines
2. Setup Google Analytics
3. Configure email notifications
4. Test all payment methods
5. Monitor error logs
6. Setup support channels

## 🆘 Troubleshooting

### Subdomain not working
- Check DNS propagation: `dig artist.vervibe.art`
- Verify wildcard certificate
- Check middleware.ts logic

### Payment failing
- Verify Omise keys
- Check webhook URL
- Test with Omise test cards

### Build errors
- Clear Vercel cache
- Check environment variables
- Review build logs

## 📞 Support

Need help deploying?
- Email: dev@vervibe.art
- Discord: [Join server](https://discord.gg/vervibe)

---

Happy deploying! 🎉
