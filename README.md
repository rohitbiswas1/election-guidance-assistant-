# 🗳️ VoteWise — Your Smart Election Guidance Assistant

<div align="center">

![VoteWise Banner](https://img.shields.io/badge/VoteWise-Election%20Guidance%20Assistant-1a56db?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0tMiAxNWwtNS01IDEuNDEtMS40MUwxMCAxNC4xN2w3LjU5LTcuNTlMMTkgOGwtOSA5eiIvPjwvc3ZnPg==)

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**Empowering every citizen to vote with confidence.**

[Live Demo](#) · [Report Bug](https://github.com/rohitbiswas1/election-guidance-assistant-/issues) · [Request Feature](https://github.com/rohitbiswas1/election-guidance-assistant-/issues)

</div>

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Problem Statement](#-problem-statement)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Team](#-team)
- [License](#-license)

---

## 🎯 About the Project

**VoteWise** is an AI-powered web application designed to demystify the democratic process for every citizen. Whether you're a first-time voter or an engaged civic participant, VoteWise provides personalised, accurate, and up-to-date guidance on elections — from voter registration and polling booth locations to understanding candidates, manifestos, and the voting process itself.

> "Democracy works best when voters are informed. VoteWise makes that possible."

Built for a hackathon/competition setting, this project demonstrates how modern web technologies and AI can be combined to solve a real civic problem at scale.

---

## 🚨 Problem Statement

Millions of eligible voters skip elections every year — not out of apathy, but because of confusion, misinformation, and lack of accessible, trustworthy information. Key barriers include:

- Not knowing **how or where to register** to vote
- Confusion about **which candidates or parties** align with personal values
- Uncertainty about **what documents are required** at polling stations
- **Language barriers** preventing access to official election information
- **Information overload** from fragmented, inconsistent government portals

VoteWise addresses all of these pain points in one unified, intelligent platform.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🤖 **AI Election Assistant** | Ask natural language questions about elections and get instant, accurate answers |
| 🗺️ **Polling Booth Locator** | Find your nearest polling station with directions |
| 📋 **Voter Registration Guide** | Step-by-step guidance tailored to your state/region |
| 🏛️ **Candidate & Party Profiles** | Unbiased summaries of candidates, parties, and key policy positions |
| 📅 **Election Calendar** | Stay updated on upcoming elections, deadlines, and key dates |
| 📄 **Document Checklist** | Know exactly what to bring on voting day |
| 🌐 **Multi-language Support** | Guidance in regional languages for wider accessibility |
| 📱 **Fully Responsive UI** | Seamless experience on mobile, tablet, and desktop |

---

## 🛠️ Tech Stack

### Frontend
- **[React 19](https://react.dev/)** — Component-based UI with the latest concurrent features
- **[TypeScript 5.9](https://www.typescriptlang.org/)** — Full type safety across the entire codebase
- **[Vite 7](https://vitejs.dev/)** — Lightning-fast build tool and dev server
- **[Tailwind CSS 4](https://tailwindcss.com/)** — Utility-first styling for rapid, consistent UI development
- **[clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge)** — Clean conditional class management

### Build & Tooling
- **[vite-plugin-singlefile](https://github.com/richardtallent/vite-plugin-singlefile)** — Packages the entire app into a single portable HTML file for offline distribution
- **TypeScript strict mode** — Ensuring maximum code reliability

### Architecture Patterns
- Component-driven development
- Custom hooks for shared logic
- Separation of concerns (UI / data / utilities)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     VoteWise Frontend                   │
│                   (React + TypeScript)                  │
├───────────────┬────────────────────┬────────────────────┤
│   UI Layer    │   Business Logic   │    Data Layer      │
│  Components   │   Custom Hooks     │   Static Data /    │
│  Tailwind CSS │   State Management │   API Adapters     │
├───────────────┴────────────────────┴────────────────────┤
│                   Vite Build Pipeline                   │
│          (TypeScript → JS → Single HTML File)           │
└─────────────────────────────────────────────────────────┘
```

The app is architected as a **single-page application (SPA)** that can also be compiled into a **single self-contained HTML file** — enabling offline usage and easy distribution, which is crucial in areas with limited internet connectivity.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/rohitbiswas1/election-guidance-assistant-.git

# 2. Navigate into the project directory
cd election-guidance-assistant-

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173** by default.

### Building for Production

```bash
# Standard production build
npm run build

# Preview the production build locally
npm run preview
```

The production build outputs to the `dist/` folder. Thanks to `vite-plugin-singlefile`, the output is a single `index.html` file that contains all assets inline — no server required.

---

## 📁 Project Structure

```
election-guidance-assistant-/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Route-level page components
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Helper functions & utilities
│   ├── data/               # Static data (candidates, FAQs, etc.)
│   ├── types/              # TypeScript type definitions
│   ├── main.tsx            # Application entry point
│   └── App.tsx             # Root component & routing
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project metadata & scripts
└── README.md               # You are here!
```

---

## 📸 Screenshots

> *(Add screenshots or a GIF demo of your application here)*

```
[Home Screen]         [AI Chat Assistant]      [Polling Booth Locator]
    📸                      📸                        📸
```

---

## 🗺️ Roadmap

- [x] Core UI scaffold with React + TypeScript + Tailwind
- [x] Single-file build for offline distribution
- [ ] AI-powered Q&A chatbot integration
- [ ] Geolocation-based polling booth finder
- [ ] Candidate comparison tool
- [ ] PWA support for offline access
- [ ] Regional language support (Hindi, Bengali, Tamil, etc.)
- [ ] Voter registration status checker (API integration)
- [ ] Accessibility (WCAG 2.1 AA compliance)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m 'feat: add your feature'`
4. **Push** to the branch: `git push origin feature/your-feature-name`
5. **Open a Pull Request**

Please follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages.

---

## 👥 Team

| Name | Role | GitHub |
|---|---|---|
| Rohit Biswas | Developer & Designer | [@rohitbiswas1](https://github.com/rohitbiswas1) |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Election Commission of India](https://eci.gov.in/) for publicly available election data
- [React](https://react.dev/), [Vite](https://vitejs.dev/), and [Tailwind CSS](https://tailwindcss.com/) communities for excellent tooling
- All open-source contributors whose libraries power this project

---

<div align="center">

Made with ❤️ for a more informed democracy

**⭐ Star this repo if you found it useful!**

</div>
