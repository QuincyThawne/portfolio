# 🚀 Interactive Portfolio Website

A modern, interactive portfolio website featuring both a traditional portfolio view and an immersive pixel art game world. Built with React, TypeScript, Vite, and Tailwind CSS.

## ✨ Features

- **Dual Mode Experience**: Toggle between traditional portfolio and interactive game mode
- **Interactive Pixel World**: Explore a 2D pixel art world with NPCs and Easter eggs
- **Responsive Design**: Fully responsive across all devices
- **Dark Mode**: Built-in dark mode support
- **Contact Form**: Working email integration with EmailJS
- **Skills Visualization**: Interactive pentagon charts for skills display
- **Project Showcase**: Featured and other projects with images
- **Achievements Timeline**: Visual timeline of accomplishments
- **Smooth Animations**: Polished UI with modern animations

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Game Engine**: Phaser 3
- **Email Service**: EmailJS
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)
- [Git](https://git-scm.com/)

## 🚀 Local Development Setup

### 1. Clone the Repository

```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

### 2. Install Dependencies

```bash
npm install
# or
bun install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**To get EmailJS credentials:**
1. Go to [EmailJS.com](https://www.emailjs.com/) and sign up
2. Create an Email Service (Gmail, Outlook, etc.)
3. Create an Email Template with variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`
4. Get your Service ID, Template ID, and Public Key from the dashboard

### 4. Start Development Server

```bash
npm run dev
# or
bun run dev
```

Your site will be available at `http://localhost:5173`

## 📦 Building for Production

```bash
npm run build
# or
bun run build
```

The built files will be in the `dist` directory.

### Preview Production Build Locally

```bash
npm run preview
# or
bun run preview
```

## 🌐 Deploying to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration

3. **Configure Environment Variables**
   - In your Vercel project, go to "Settings" → "Environment Variables"
   - Add the following variables:
     ```
     VITE_EMAILJS_SERVICE_ID = your_service_id_here
     VITE_EMAILJS_TEMPLATE_ID = your_template_id_here
     VITE_EMAILJS_PUBLIC_KEY = your_public_key_here
     ```
   - Click "Save"

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add Environment Variables**
   ```bash
   vercel env add VITE_EMAILJS_SERVICE_ID
   vercel env add VITE_EMAILJS_TEMPLATE_ID
   vercel env add VITE_EMAILJS_PUBLIC_KEY
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Continuous Deployment

Once connected to GitHub, Vercel automatically deploys:
- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

## 🎨 Customization

### Update Personal Information

Edit `src/data/portfolioData.ts`:
- Personal details (name, email, location)
- Social media links
- Projects
- Skills
- Achievements

### Add Project Images

1. Place images in `src/assets/portfolio/`
2. Import in `portfolioData.ts`:
   ```typescript
   import myProjectImg from '@/assets/portfolio/myproject.png';
   ```
3. Use in project data:
   ```typescript
   imageUrl: myProjectImg
   ```

### Customize Theme

- Colors: `tailwind.config.ts`
- Components: `src/components/ui/`
- Styles: `src/index.css`

## 📁 Project Structure

```
new Portfolio/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, fonts, etc.
│   │   ├── portfolio/     # Project images
│   │   ├── sprites/       # Game sprites
│   │   └── tiles/         # Game tiles
│   ├── components/
│   │   ├── charts/        # Data visualization components
│   │   ├── game/          # Game-related components
│   │   ├── navbar/        # Navigation components
│   │   ├── portfolio/     # Portfolio section components
│   │   └── ui/            # Reusable UI components
│   ├── config/            # Configuration files
│   │   └── emailjs.config.ts
│   ├── context/           # React contexts
│   ├── data/              # Portfolio data
│   │   └── portfolioData.ts
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities
│   ├── pages/             # Page components
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── .env                   # Environment variables (not committed)
├── .env.example           # Example environment variables
├── vercel.json            # Vercel configuration
├── package.json           # Dependencies
└── vite.config.ts         # Vite configuration
```

## 🔒 Security Best Practices

- ✅ Environment variables are used for sensitive data
- ✅ `.env` is in `.gitignore` to prevent committing secrets
- ✅ EmailJS Public Key is safe for client-side use
- ✅ Rate limiting on EmailJS prevents abuse
- ⚠️ For production, consider adding reCAPTCHA to the contact form

## 🐛 Troubleshooting

### Contact Form Not Working

1. Verify environment variables are set in Vercel
2. Check EmailJS dashboard for email service status
3. Ensure template variables match: `{{from_name}}`, `{{from_email}}`, `{{message}}`
4. Check browser console for errors

### Build Failures on Vercel

1. Ensure all dependencies are in `package.json`
2. Check Node.js version compatibility
3. Review build logs in Vercel dashboard
4. Verify all image imports are correct

### Images Not Loading

1. Ensure images are in `src/assets/` (not `public/`)
2. Check import statements in `portfolioData.ts`
3. Verify image file extensions match imports

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

For questions or issues:
- Check the [Troubleshooting](#-troubleshooting) section
- Review [Vercel Documentation](https://vercel.com/docs)
- Check [EmailJS Documentation](https://www.emailjs.com/docs/)

---

**Made with ❤️ and lots of coffee** ☕
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
