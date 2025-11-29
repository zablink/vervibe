# VerVibe Platform

แพลตฟอร์มไทยแห่งแรกที่ให้ศิลปิน/นักดนตรีได้รายได้ตรงจากแฟนคลับ แบบ subscription รายเดือน

## 🚀 Features

### ✅ เสร็จสมบูรณ์แล้ว

- **Frontend สวยงาม** - Tailwind CSS พร้อม gradient และ animations
- **Social Login** - Google & Facebook ผ่าน Supabase Auth
- **Omise Payment Gateway** - PromptPay, Cards, Internet Banking
- **Creator Dashboard** - Analytics, Revenue, Members, Posts
- **Admin Panel** - จัดการศิลปิน, Users, Website Settings
- **Tier System** - 4 preset tiers (฿49, ฿99, ฿199, ฿499)
- **Subdomain Support** - Automatic artist subdomains (artist.vervibe.art)
- **Analytics Dashboard** - Charts, Stats, Insights
- **Post Management** - Create, Schedule, Tier-gated content
- **Artist Discovery** - Search, Filter, Browse
- **Payment Flow** - Complete subscription flow

## 📁 Project Structure

```
vervibe-platform/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── auth/
│   │   ├── login/                  # Login page
│   │   └── callback/               # OAuth callback
│   ├── dashboard/
│   │   ├── page.tsx                # Artist/Fan dashboard
│   │   ├── tiers/                  # Tier management
│   │   ├── analytics/              # Analytics dashboard
│   │   └── posts/new/              # Create post
│   ├── admin/                      # Admin panel
│   ├── artists/                    # Browse artists
│   ├── artist/[slug]/              # Artist profile
│   ├── subscribe/[slug]/           # Subscribe flow
│   └── api/
│       ├── webhooks/omise/         # Omise webhooks
│       └── subscriptions/create/   # Create subscription
├── components/
│   └── Navbar.tsx
├── lib/
│   ├── prisma.ts
│   ├── supabase.ts
│   └── omise.ts
├── utils/
│   └── tiers.ts
├── prisma/
│   └── schema.prisma
└── middleware.ts                   # Subdomain routing
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (via Supabase)
- **Auth**: Supabase Auth (OAuth)
- **Payment**: Omise (PromptPay, Cards, Banking)
- **ORM**: Prisma
- **Charts**: Recharts
- **Icons**: Lucide React
- **Hosting**: Vercel

## 📦 Installation

1. **Clone repository**
```bash
git clone <repository-url>
cd vervibe-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# Omise
OMISE_PUBLIC_KEY=your_omise_public_key
OMISE_SECRET_KEY=your_omise_secret_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DOMAIN=vervibe.art
```

4. **Setup database**
```bash
npx prisma generate
npx prisma db push
```

5. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Supabase Setup

1. Create project at [supabase.com](https://supabase.com)
2. Get API keys from Settings > API
3. Enable OAuth providers:
   - Google: Settings > Auth > Providers > Google
   - Facebook: Settings > Auth > Providers > Facebook
4. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://yourdomain.com/auth/callback`

### Omise Setup

1. Create account at [omise.co](https://omise.co)
2. Get API keys from Dashboard
3. Setup webhook URL: `https://yourdomain.com/api/webhooks/omise`
4. Enable payment methods:
   - PromptPay
   - Credit/Debit Cards
   - Internet Banking

### Subdomain Setup (Production)

#### Option 1: Vercel (Recommended)
1. Deploy to Vercel
2. Add custom domain: `vervibe.art`
3. Add wildcard domain: `*.vervibe.art`
4. Vercel will handle DNS automatically

#### Option 2: Cloudflare
1. Add A record: `@` → your server IP
2. Add A record: `*` → your server IP
3. Enable "Proxied" for both records

## 🎨 Customization

### Website Settings (Admin Panel)
- Site Name & Title
- Logo & Favicon
- Primary Color
- Meta Description

Access: `/admin` (requires admin role)

### Tier Presets
Edit `utils/tiers.ts` to customize:
- Tier names
- Pricing
- Benefits

### Theme Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: {
    50: '#fdf4ff',
    // ... customize colors
  },
}
```

## 📊 Database Schema

Main tables:
- `User` - Users (artists & fans)
- `ArtistProfile` - Artist profiles
- `MembershipTier` - Subscription tiers
- `Subscription` - Active subscriptions
- `Post` - Content posts
- `Payment` - Payment records
- `Payout` - Artist payouts
- `Notification` - User notifications
- `SiteSetting` - Website settings

## 🔐 Security

- All payments via Omise (PCI compliant)
- OAuth authentication via Supabase
- Database RLS (Row Level Security)
- Environment variables for secrets
- Webhook signature verification

## 📈 Roadmap

- [ ] Live streaming
- [ ] Direct messaging
- [ ] Mobile apps (iOS/Android)
- [ ] Advanced analytics
- [ ] Merchandise integration
- [ ] Event ticketing
- [ ] API for third-party integrations

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

MIT License - see LICENSE file

## 💬 Support

- Email: support@vervibe.art
- Discord: [Join our server](https://discord.gg/vervibe)
- Documentation: [docs.vervibe.art](https://docs.vervibe.art)

---

Made with ❤️ for Thai artists
