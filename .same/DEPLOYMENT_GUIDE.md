# WCCIMS Deployment Guide

## 🎉 GitHub Repository Ready!

Your code is now live at: **https://github.com/emabi2002/wccims**

## 🚀 Deploy to Netlify (Recommended)

### Option 1: One-Click Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/emabi2002/wccims)

Click the button above to deploy automatically!

### Option 2: Manual Deployment (Step by Step)

#### Step 1: Prepare Supabase

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Click "New Project"
   - Choose organization and project name: "WCCIMS"
   - Choose a strong database password
   - Select region: Asia Pacific (Singapore) - closest to PNG
   - Click "Create new project"
   - Wait 2-3 minutes for setup

2. **Run Database Schema**
   - Click "SQL Editor" in left sidebar
   - Click "New query"
   - Copy entire contents of `.same/database-schema.sql`
   - Paste into SQL editor
   - Click "Run" (or press Ctrl/Cmd + Enter)
   - Wait for "Success" message

3. **Create Storage Buckets**
   - Click "Storage" in left sidebar
   - Click "Create bucket" for each:
     - `warehouse_documents` (public)
     - `stock_receipts` (public)
     - `temperature_logs` (public)
     - `inventory_adjustments` (public)
     - `quality_certificates` (public)
     - `dispatch_documents` (public)

4. **Get API Credentials**
   - Click "Settings" → "API"
   - Copy your:
     - **Project URL** (e.g., https://xxxxx.supabase.co)
     - **Anon/Public Key** (starts with eyJhbG...)
   - Keep these safe - you'll need them in Step 3

#### Step 2: Deploy to Netlify

1. **Sign up/Login to Netlify**
   - Go to https://netlify.com
   - Click "Sign up" or "Log in"
   - Choose "Sign up with GitHub"

2. **Import Your Repository**
   - Click "Add new site" → "Import an existing project"
   - Click "GitHub"
   - Search for "wccims"
   - Click on your repository

3. **Configure Build Settings**
   ```
   Build command: bun run build
   Publish directory: .next
   ```

4. **Add Environment Variables**
   - Before deploying, click "Add environment variables"
   - Add these two variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL = your_project_url_from_step1
     NEXT_PUBLIC_SUPABASE_ANON_KEY = your_anon_key_from_step1
     ```

5. **Deploy**
   - Click "Deploy wccims"
   - Wait 2-3 minutes for build
   - Your site will be live at: https://[random-name].netlify.app

#### Step 3: Configure Your Domain (Optional)

1. **Add Custom Domain**
   - In Netlify dashboard, click "Domain settings"
   - Click "Add custom domain"
   - Enter your domain (e.g., wccims.kikoribasin.pg)
   - Follow DNS configuration instructions

2. **Enable HTTPS**
   - Netlify automatically enables HTTPS
   - Wait for SSL certificate provisioning (1-2 minutes)

## 🔒 Post-Deployment Security

### Enable Authentication

1. **Configure Supabase Auth**
   ```sql
   -- In Supabase SQL Editor
   -- Create first admin user
   INSERT INTO auth.users (email, encrypted_password, email_confirmed_at)
   VALUES (
     'admin@kikoribasin.pg',
     crypt('YourSecurePassword123!', gen_salt('bf')),
     NOW()
   );
   ```

2. **Set Up Email Templates**
   - Supabase → Authentication → Email Templates
   - Customize confirmation and password reset emails

### Configure Row Level Security

The database schema includes RLS policies. To activate:

```sql
-- Already enabled in schema, but verify:
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';
```

All tables should show `rowsecurity = true`.

## 📊 Connect Live Data

Currently, the app uses mock data. To connect real data:

### Update Each Page Component

Example for Warehouses page:

```typescript
// In src/app/warehouses/page.tsx

// Replace:
const warehouses = [ /* mock data */ ]

// With:
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    async function fetchWarehouses() {
      const { data } = await supabase
        .from('warehouses')
        .select('*')
        .eq('status', 'active')
        .order('warehouse_name');

      if (data) setWarehouses(data);
    }

    fetchWarehouses();
  }, []);

  // ... rest of component
}
```

Repeat for all pages:
- `src/app/page.tsx` (Dashboard)
- `src/app/items/page.tsx` (Items)
- `src/app/stock-balance/page.tsx` (Stock Balance)
- `src/app/temperature/page.tsx` (Temperature)
- `src/app/receiving/page.tsx` (Receiving)
- `src/app/analytics/page.tsx` (Analytics)

### Add Real-Time Updates

```typescript
useEffect(() => {
  const channel = supabase
    .channel('warehouses_changes')
    .on('postgres_changes',
      { event: '*', schema: 'public', table: 'warehouses' },
      () => fetchWarehouses()
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}, []);
```

## 🧪 Testing Your Deployment

### 1. Smoke Test
- ✅ Site loads at your Netlify URL
- ✅ All navigation links work
- ✅ Dashboard displays correctly
- ✅ No console errors

### 2. Data Test
- ✅ Insert test warehouse in Supabase
- ✅ Refresh app and see it appear
- ✅ Try creating items
- ✅ Test stock balance calculations

### 3. Performance Test
- Run Lighthouse audit (Chrome DevTools)
- Target scores:
  - Performance: 90+
  - Accessibility: 95+
  - Best Practices: 90+
  - SEO: 90+

## 🔧 Troubleshooting

### Build Fails
```bash
# Check build locally first:
cd wccims
bun install
bun run build

# If it works locally but fails on Netlify:
# - Check Node version (set to 18+ in Netlify)
# - Verify environment variables are set
```

### Database Connection Errors
- Verify Supabase URL and key are correct
- Check Supabase project is active (not paused)
- Verify RLS policies allow public access for now

### Missing Data
- Check browser console for errors
- Verify Supabase tables have data
- Check RLS policies aren't blocking queries

## 📈 Monitoring

### Set Up Monitoring

1. **Netlify Analytics**
   - Enable in Netlify dashboard
   - Track visitors and performance

2. **Supabase Dashboard**
   - Monitor database queries
   - Check API usage
   - Review logs

3. **Error Tracking** (Optional)
   - Add Sentry for error tracking
   - Monitor production issues

## 🔄 Continuous Deployment

Every time you push to GitHub, Netlify will:
1. Pull latest code
2. Run build
3. Deploy automatically
4. Update your site

To update the system:
```bash
# Make changes locally
git add .
git commit -m "Your changes"
git push origin main

# Netlify deploys automatically!
```

## 🎓 Training Your Team

### Access Levels

Create users with different roles:

```sql
INSERT INTO user_profiles (id, full_name, role, phone, status)
SELECT
  auth.uid(),
  'Username',
  'warehouse_manager', -- or other role
  '+675 xxx xxxx',
  'active';
```

### User Roles Available
1. System Administrator
2. Warehouse Manager
3. Inventory Controller
4. Cold Chain Officer
5. Receiving Clerk
6. Dispatch Clerk
7. Quality Officer
8. Hub Coordinator
9. Executive Viewer

## 📞 Support

### Deployment Issues
- GitHub: https://github.com/emabi2002/wccims/issues
- Netlify Support: https://www.netlify.com/support/
- Supabase Support: https://supabase.com/support

### System Issues
- Email: support@same.new
- Documentation: See README.md

## ✅ Deployment Checklist

- [ ] Supabase project created
- [ ] Database schema executed
- [ ] Storage buckets created
- [ ] API credentials copied
- [ ] Netlify account created
- [ ] Repository imported
- [ ] Environment variables set
- [ ] Site deployed successfully
- [ ] Custom domain configured (optional)
- [ ] HTTPS enabled
- [ ] First admin user created
- [ ] Test data added
- [ ] All pages tested
- [ ] Team members invited
- [ ] Monitoring enabled

## 🎉 You're Live!

Your WCCIMS is now running at:
- **GitHub**: https://github.com/emabi2002/wccims
- **Netlify**: https://[your-site].netlify.app
- **Custom Domain**: (if configured)

Next steps:
1. Add real inventory data
2. Train your team
3. Monitor usage
4. Iterate and improve

---

**Congratulations on deploying WCCIMS! 🚀**
