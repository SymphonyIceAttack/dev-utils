# <img src="public/base-logo.png" alt="KittyEncode Logo" width="40" height="40"> KittyEncode

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16.0.10-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC.svg)](https://tailwindcss.com/)

[🌐 Live Demo](https://kitty-encode.top) | [📖 Documentation](https://kitty-encode.top/blog) | [🐛 Bug Reports](https://github.com/SymphonyIceAttack/kitty-encode/issues) | [💡 Feature Requests](https://github.com/SymphonyIceAttack/kitty-encode/discussions)

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [🛠️ Tools](#️-tools)
- [🌍 Languages](#-languages)
- [🚀 Quick Start](#-quick-start)
- [📦 Installation](#-installation)
- [🎨 Technology Stack](#-technology-stack)
- [🏗️ Project Structure](#️-project-structure)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)

## 📖 About

**KittyEncode** is a comprehensive collection of free, fast, and secure online developer tools designed to make encoding, hashing, and data transformation tasks effortless. Built with modern web technologies and optimized for performance, KittyEncode provides instant solutions for common development challenges.

### 🎯 Why Choose KittyEncode?

- ✅ **Completely Free** - No registration, no limits, no hidden costs
- ⚡ **Lightning Fast** - Instant processing in your browser
- 🔒 **Privacy First** - All processing happens locally, no data sent to servers
- 🌍 **Multi-Language** - Full internationalization support
- 📱 **Mobile Friendly** - Responsive design for all devices
- 🔧 **Developer Focused** - Built by developers, for developers

## ✨ Features

### 🛡️ Security & Privacy
- **Local Processing**: All data stays in your browser
- **No Tracking**: Zero analytics or user tracking
- **No Registration**: Use immediately without signing up
- **Offline Capable**: Works without internet connection

### 🚀 Performance
- **Instant Results**: Real-time encoding/decoding
- **Bulk Processing**: Handle multiple items simultaneously
- **Optimized Algorithms**: Efficient implementations
- **Progressive Enhancement**: Fast loading and interaction

### 🌍 Accessibility
- **Multi-Language Support**: 7 languages supported
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Friendly**: ARIA labels and semantic HTML
- **Dark/Light Mode**: Automatic theme switching

## 🛠️ Tools

### 📡 Encoding Tools
- **[URL Encoder/Decoder](https://kitty-encode.top)** - Encode and decode URLs with percent encoding
- **[Base64 Encoder/Decoder](https://kitty-encode.top/tools/base64-encoder)** - Convert text to Base64 and vice versa
- **[Character Encoding Converter](https://kitty-encode.top/tools/encoding-converter)** - Convert between UTF-8, GBK, Hex, Binary, and Unicode

### 🔐 Security Tools
- **[MD5 Hash Generator](https://kitty-encode.top/tools/md5-generator)** - Generate MD5 checksums from text
- **[Password Generator](https://kitty-encode.top/tools/password-generator)** - Create secure, random passwords and API keys
- **[UUID Generator](https://kitty-encode.top/tools/uuid-generator)** - Generate RFC4122 compliant UUIDs (v1, v4, v7)

### 📚 Learning Resources
- **[Developer Blog](https://kitty-encode.top/blog)** - Comprehensive guides and tutorials
- **[Encoding Guide](https://kitty-encode.top/blog/encoding-guide)** - Understanding different encoding methods
- **[Security Best Practices](https://kitty-encode.top/blog/password-guide)** - Password and security recommendations

## 🌍 Languages

KittyEncode is fully internationalized and supports:

| Language | Code | Status |
|----------|------|--------|
| 🇺🇸 English | `en` | ✅ Complete |
| 🇨🇳 中文 | `zh` | ✅ Complete |
| 🇯🇵 日本語 | `ja` | ✅ Complete |
| 🇫🇷 Français | `fr` | ✅ Complete |
| 🇪🇸 Español | `es` | ✅ Complete |
| 🇷🇺 Русский | `ru` | ✅ Complete |
| 🇩🇪 Deutsch | `de` | ✅ Complete |

## 🚀 Quick Start

### Option 1: Use Online (Recommended)

Visit **[https://kitty-encode.top](https://kitty-encode.top)** and start using the tools immediately!

### Option 2: Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/SymphonyIceAttack/kitty-encode.git
   cd kitty-encode
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📦 Installation

### Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher (or pnpm)

### Development Setup

```bash
# Clone the repository
git clone https://github.com/SymphonyIceAttack/kitty-encode.git

# Navigate to project directory
cd kitty-encode

# Install dependencies
npm install

# Start development server
npm run dev

# Run linting
npm run lint

# Format code
npm run format

# Type checking
npm run type-check
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Technology Stack

### Core Technologies
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://reactjs.org/)** - User interface library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework

### UI Components
- **[Radix UI](https://www.radix-ui.com/)** - Low-level UI components
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[shadcn/ui](https://ui.shadcn.com/)** - Reusable UI components

### Development Tools
- **[Biome](https://biomejs.dev/)** - Fast formatter and linter
- **[PostCSS](https://postcss.org/)** - CSS transformation tool
- **[ESLint](https://eslint.org/)** - Code quality checker

### Security & Performance
- **[CryptoJS](https://cryptojs.gitbook.io/)** - JavaScript cryptography library
- **[QRCode](https://github.com/soldair/node-qrcode)** - QR code generator
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

## 🏗️ Project Structure

```
kitty-encode/
├── 📁 app/                     # Next.js App Router
│   ├── 📁 [lang]/             # Internationalized routes
│   │   ├── 📁 tools/          # Tool pages
│   │   ├── 📁 blog/           # Blog articles
│   │   ├── 📁 about/          # About page
│   │   ├── 📁 contact/        # Contact page
│   │   └── 📁 privacy/        # Privacy policy
│   ├── 📄 layout.tsx          # Root layout
│   ├── 📄 page.tsx            # Homepage
│   ├── 📄 sitemap.ts          # SEO sitemap
│   └── 📄 robots.ts           # SEO robots.txt
├── 📁 components/             # React components
│   ├── 📁 ui/                 # Reusable UI components
│   ├── 📁 tools/              # Tool-specific components
│   ├── 📁 blog/               # Blog components
│   ├── 📁 layout/             # Layout components
│   └── 📁 structured-data/    # SEO structured data
├── 📁 lib/                    # Utility functions
│   ├── 📁 translations/       # Internationalization files
│   ├── 📄 config.ts           # App configuration
│   └── 📄 utils.ts            # Helper functions
├── 📁 public/                 # Static assets
│   ├── 📄 base-logo.png       # Main logo
│   ├── 📄 icon.svg            # App icon
│   └── 📄 icon-*.png          # Theme icons
├── 📁 hooks/                  # Custom React hooks
├── 📁 context/                # React context providers
├── 📄 next.config.ts          # Next.js configuration
├── 📄 tailwind.config.ts      # Tailwind CSS configuration
├── 📄 tsconfig.json           # TypeScript configuration
├── 📄 biome.json              # Biome configuration
├── 📄 package.json            # Project dependencies
└── 📄 README.md               # Project documentation
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

1. **🐛 Report Bugs**
   - Use [GitHub Issues](https://github.com/SymphonyIceAttack/kitty-encode/issues)
   - Provide detailed reproduction steps
   - Include browser and OS information

2. **💡 Suggest Features**
   - Open a [GitHub Discussion](https://github.com/SymphonyIceAttack/kitty-encode/discussions)
   - Describe the feature and its use case
   - Consider adding translations

3. **🔧 Submit Pull Requests**
   - Fork the repository
   - Create a feature branch
   - Make your changes
   - Run tests and linting
   - Submit a pull request

4. **🌍 Improve Translations**
   - Add missing translations
   - Improve existing translations
   - Add new language support

### Development Guidelines

```bash
# Code style and formatting
npm run lint     # Check code quality
npm run format   # Format code

# Type checking
npm run type-check # Verify TypeScript types

# Build and test
npm run build    # Production build
npm run start    # Start production server
```

### Commit Message Format

```
type(scope): description

feat: add new URL encoding tool
fix: resolve base64 decoding issue
docs: update installation guide
style: format code with biome
refactor: improve component structure
test: add unit tests for encoding utils
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 SymphonyIceAttack

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

### Open Source Projects
- **[Next.js](https://nextjs.org/)** - Amazing React framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide](https://lucide.dev/)** - Beautiful icon library

### Community
- **Contributors** - Thanks to all contributors who helped improve KittyEncode
- **Users** - Feedback from the developer community
- **Translators** - Making KittyEncode accessible worldwide

### Inspiration
- Built for developers, by developers
- Inspired by the need for simple, fast, and reliable developer tools
- Focused on privacy and user experience

---

<div align="center">

**Made with ❤️ by [SymphonyIceAttack](https://github.com/SymphonyIceAttack)**

[![GitHub stars](https://img.shields.io/github/stars/SymphonyIceAttack/kitty-encode?style=social)](https://github.com/SymphonyIceAttack/kitty-encode)
[![GitHub forks](https://img.shields.io/github/forks/SymphonyIceAttack/kitty-encode?style=social)](https://github.com/SymphonyIceAttack/kitty-encode/fork)

[⬆ Back to Top](#-kittyencode)

</div>