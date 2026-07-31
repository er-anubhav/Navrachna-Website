# Navrachna Foundation for Entrepreneurship Development (NFED)

> **Official Portal for Navrachna Foundation** — An autonomous, sector-agnostic startup incubator and premium co-working ecosystem operated under the aegis of **I.T.S Engineering College**, Greater Noida.

🌐 **Live Demo**: [https://navrachna.vercel.app](https://navrachna.vercel.app)

---

## 🚀 Overview

Navrachna Foundation for Entrepreneurship Development (NFED) empowers early-stage founders, research innovators, and student entrepreneurs with early-stage velocity, high-fidelity mentorship, prototyping infrastructure, state-of-the-art incubation, and institutional seed grants.

This repository contains the official production web platform for Navrachna Foundation, engineered with modern frontend practices, dynamic UI animations, and seamless mobile responsiveness.

---

## ✨ Key Features

- 🏛️ **About Navrachna Foundation & Vision/Mission**: Comprehensive institutional overview, core values, and strategic regional incubator node roadmap.
- 👨‍💼 **Leadership Messages**: Insights and vision from executive leadership including Chairman, Vice Chairman, Director, and Advisor / In-Charge.
- 📜 **Flagship Incubation Schemes**: Detailed information on government grants & fellowships including **MSME BI**, **DST**, **Startin-Up**, and **NewGen-IEDC**.
- 🛠️ **Engineering Prototyping Facilities**: Interactive specification explorer for Fabrication Labs, 3D Printers, High-End Compute Workstations, and Co-Working Infrastructure.
- 🗂️ **Interactive WebGL Card Stack**: Interactive 3D drag/touch card stack showcasing physical workspaces using `OGL` WebGL rendering.
- 🏢 **Portfolio Startups Showcase**: Marquee slider and responsive grid featuring resident incubated ventures and alumni companies.
- 📢 **Live Announcement Ticker & Modal**: Real-time ticker and interactive modal for active hackathons, grant calls, and competitions.
- 📱 **Mobile-First Responsive Layout**: Optimized typography, spacing, and micro-interactions for seamless experience across mobile, tablet, and desktop devices.

---

## 🛠️ Technology Stack

- **Core Framework**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations & Graphics**: [Motion](https://motion.dev/) & [OGL (WebGL)](https://github.com/oamap/ogl)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Hosting & Deployment**: Firebase Hosting

---

## 📁 Project Structure

```text
Navrachnawebsite/
├── public/                     # Static assets and favicon
├── src/
│   ├── assets/                 # Brand logos, team photos, and facility media
│   ├── components/             # Reusable UI components
│   │   ├── HeaderV1.jsx        # Navigation header with hamburger menu
│   │   ├── FooterV1.jsx        # Site footer & quick links
│   │   ├── Stack.jsx           # Interactive WebGL 3D card stack
│   │   ├── CircularGallery.jsx # Circular gallery component
│   │   └── BorderGlow.jsx      # Glowing card container component
│   ├── data/                   # Centralized content datasets
│   │   └── siteContent.js      # Site content, navigation structure & schemes data
│   ├── pages/                  # Page route views
│   │   ├── LandingPage.jsx     # Main landing page
│   │   └── AboutPage.jsx       # About Us page
│   ├── App.jsx                 # Application entry route router
│   ├── main.jsx                # DOM root mount
│   └── index.css               # Global CSS & Tailwind imports
├── firebase.json               # Firebase Hosting configuration
├── firestore.rules            # Firestore security rules
├── vite.config.js              # Vite build configuration
└── package.json                # Project dependencies and scripts
```

---

## ⚙️ Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/er-anubhav/Navrachna.git
   cd Navrachna
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Scripts & Commands

| Command           | Description                                                  |
| :---------------- | :----------------------------------------------------------- |
| `npm run dev`     | Starts the local Vite development server with HMR.           |
| `npm run build`   | Builds optimized production bundle in the `dist/` directory. |
| `npm run preview` | Previews the local production build built in `dist/`.        |
| `npm run lint`    | Runs ESLint static code analysis.                            |

---

## 🌐 Deployment

The project is configured for seamless deployment to **Firebase Hosting**.

To build and deploy:

```bash
# Generate production bundle
npm run build

# Deploy to Firebase
npx firebase-tools deploy
```

---

## 🏛️ Aegis & Support

Operated under the aegis of **I.T.S Engineering College**, Greater Noida.  
For inquiries, incubation support, or partnership opportunities, visit [Navrachna Foundation](https://navrachnafoundation.com).
