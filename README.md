# Premium Developer Portfolio 🚀

A high-performance, aesthetically stunning portfolio website built with **Next.js 15**, **Tailwind CSS**, and **Framer Motion**. Designed for developers who want to showcase their work with a professional, modern, and interactive interface.

![Portfolio Preview](https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop)

## ✨ Features

- **Modern UI/UX**: Clean, dark-mode-first design with premium aesthetics.
- **Glassmorphism**: Beautiful frosted-glass components and cards.
- **Micro-animations**: Smooth transitions and hover effects using Framer Motion.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
- **Performance Optimized**: Built on Next.js 15 for lightning-fast load times.
- **Interactive Sections**:
  - Dynamic Hero with tech stack integration.
  - Logo Marquee for social proof/skills.
  - Project Showcase with case study links.
  - Video Dashboard for product demonstrations.
  - Functional-ready Contact Form with validation.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Outfit & Inter (Google Fonts)
- **Deployment**: Optimized for [Vercel](https://vercel.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm / yarn / pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 📂 Project Structure

```text
├── app/
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utility functions
│   ├── globals.css       # Global styles and Tailwind imports
│   ├── layout.tsx        # Root layout and metadata
│   └── page.tsx          # Main entry point
├── public/               # Static assets (images, icons, etc.)
└── next.config.ts        # Next.js configuration
```

## 📝 Configuration

### Environment Variables

Create a `.env.local` file in the root directory and add any necessary environment variables (e.g., for form handling services like Formspree).

```bash
# Example
NEXT_PUBLIC_FORM_ID=your_form_id
```

### Profile Customization

Update the following files to match your profile:
- `app/layout.tsx`: Change the metadata (title, description).
- `app/components/ContactForm.tsx`: Update your email and contact details.
- `app/components/Hero.tsx`: Customize your headline and tech stack.

### 🖼️ Assets

The portfolio is configured to use local images for projects and the profile section. Place your assets in the following directories:

- **Projects**: `public/projects/`
  - `semarketplace.jpg`
  - `indofooty.jpg`
  - `netflix.jpg`
- **Profile**: `public/profile/`
  - `me.jpg`

Ensure the filenames match those referenced in `app/components/Projects.tsx` and `app/components/About.tsx`.



## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

Built with ❤️ by [Kevin Pratama](https://github.com/kevinpratama)
