# Suleman Portfolio

A modern, responsive portfolio website built with Next.js and Tailwind CSS.

## Features

- **Responsive Design**: Works perfectly on all devices
- **Modern UI**: Clean, professional design with smooth animations
- **Interactive Elements**: Animated skill progress bars, scroll reveals, and hover effects
- **Contact Form**: Functional contact form with validation
- **CV Download**: Generate and download PDF CV using jsPDF
- **SEO Optimized**: Proper meta tags and semantic HTML

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome
- **PDF Generation**: jsPDF
- **Deployment**: Ready for Vercel/Netlify

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## Project Structure

```
suleman-portfolio/
├── pages/
│   ├── _app.js          # App wrapper
│   ├── _document.js     # Document structure
│   └── index.js         # Main page
├── components/
│   └── SkillsCanvas.js  # Animated skills component
├── styles/
│   └── globals.css      # Global styles & Tailwind
├── public/              # Static assets
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

## Customization

- **Colors**: Update Tailwind config or modify classes
- **Content**: Edit text and images in `pages/index.js`
- **Skills**: Modify skills data in `components/SkillsCanvas.js`
- **Styling**: Adjust Tailwind classes throughout the components

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Netlify
1. Build command: `npm run build`
2. Publish directory: `out`
3. Deploy

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

This project is open source and available under the [MIT License](LICENSE).