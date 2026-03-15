# WCCIMS Quick Setup Guide

## 🚀 Quick Start (5 minutes)

### Step 1: Supabase Setup

1. **Create a Supabase project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Note your project URL and anon key

2. **Run the database schema**
   - Open Supabase SQL Editor
   - Copy contents of `.same/database-schema.sql`
   - Paste and run
   - Wait for completion

3. **Create storage buckets**
   - Go to Storage in Supabase
   - Create these buckets (all public):
     - `warehouse_documents`
     - `stock_receipts`
     - `temperature_logs`
     - `inventory_adjustments`
     - `quality_certificates`
     - `dispatch_documents`

### Step 2: Configure Environment

1. **Create `.env.local` file**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Add your credentials**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### Step 3: Run the Application

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📊 Current Status

The application is running with **mock data** for demonstration.

### What Works Right Now
- ✅ All page navigation
- ✅ Dashboard with metrics
- ✅ Warehouse listing
- ✅ Item catalog
- ✅ Stock balance views
- ✅ Temperature monitoring
- ✅ Goods receiving
- ✅ Analytics and reporting

### What Needs Supabase Connection
To connect live data, you'll need to:

1. **Replace mock data with Supabase queries**

   Example for warehouses page:
   ```typescript
   // Replace this mock data
   const warehouses = [...]

   // With Supabase query
   const { data: warehouses } = await supabase
     .from('warehouses')
     .select('*')
     .eq('status', 'active')
   ```

2. **Implement CRUD operations**
   - Create forms for adding/editing
   - Connect to Supabase mutations
   - Add validation

3. **Add authentication**
   ```typescript
   const { data: { user } } = await supabase.auth.getUser()
   ```

## 🎨 Customization

### Change Theme Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    // Your brand colors
  }
}
```

### Modify Logo
Replace the Warehouse icon in `Sidebar.tsx` with your logo.

### Add Custom Fields
1. Update database schema
2. Update TypeScript types in `src/lib/types.ts`
3. Update UI components

## 🚢 Deployment

### Deploy to Netlify

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import from Git"
   - Select your repository
   - Build settings:
     - Build command: `bun run build`
     - Publish directory: `.next`
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete
   - Your site is live!

## 📱 Mobile Access

The site is responsive and works on:
- Desktop computers
- Tablets (iPad, etc.)
- Large smartphones

For best experience, use desktop or tablet.

## 🔒 Security Checklist

Before going to production:

- [ ] Enable RLS on all tables
- [ ] Set up proper user authentication
- [ ] Configure role-based permissions
- [ ] Review and tighten RLS policies
- [ ] Enable 2FA for admin accounts
- [ ] Set up backup schedules
- [ ] Configure monitoring and alerts
- [ ] Review API rate limits

## 💾 Data Migration

To import existing inventory data:

1. **Prepare CSV files** with your data
2. **Use Supabase table editor** to import
3. **Or create migration scripts**:
   ```sql
   INSERT INTO items (item_code, item_name, ...)
   VALUES ('ITEM-001', 'Product Name', ...);
   ```

## 🆘 Troubleshooting

### "Cannot find module" errors
```bash
bun install
```

### Database connection issues
- Check `.env.local` credentials
- Verify Supabase project is active
- Check RLS policies allow access

### Build failures
```bash
# Clean and rebuild
rm -rf .next
rm -rf node_modules
bun install
bun run build
```

## 📞 Support

- GitHub Issues: Create an issue in the repository
- Email: support@same.new
- Documentation: See README.md

## 🎓 Training

For team training:
1. Start with Dashboard overview
2. Demonstrate Goods Receiving workflow
3. Show Stock Balance and tracking
4. Review Temperature Monitoring
5. Practice with test data

---

**You're all set! 🎉**

Your WCCIMS is ready to manage warehouse operations across the Kikori Basin.
