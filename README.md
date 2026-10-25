# PulseHer

> **Clear steps. Faster action. CPR guidance with women in mind.**

PulseHer is a lightweight, login-free, women-centred emergency guidance website and Progressive Web App (PWA) designed to eliminate bystander hesitation during an adult cardiac arrest and help close the bystander CPR gender gap.

---

## 🚑 Key Features

- **Two Clear Entry Doors**:
  - **"Help me decide"**: Step-by-step observable checks (responsiveness and normal breathing) to support hesitant bystanders with safe defaults.
  - **"I know CPR is needed"**: Instant shortcut straight to the 110 bpm metronome, timer, and Hands-Only CPR instructions.
- **Women-Centred Reassurance**:
  - Reassures bystanders that standard adult CPR technique is identical for women and men.
  - Clarifies legal protections under Good Samaritan laws.
  - Promotes confidence and representation without altering clinical standards.
- **Integrated Emergency CPR Guidance**:
  - High-precision elapsed time counter (`mm:ss`).
  - Web Audio API look-ahead scheduler for a rock-solid 110 bpm metronome (100–120 bpm range).
  - Synchronized visual pulse ring for noisy environments or muted devices.
  - Prominent AED alert and instructions to follow the device's voice prompts.
- **Zero Friction & High Safety**:
  - No login, no sign-up, no cookies, no tracking.
  - Pinned `Call 112` emergency bar with one-click direct dialing on mobile and copy fallback on desktop.
  - Deterministic decision logic (no AI hallucination risks in emergency flows).
  - Educational guidance prototype aligned with AHA Adult BLS guidelines and Indian ERSS 112.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **Routing**: React Router DOM (v6)
- **Styling**: Vanilla CSS Design System with WCAG AAA accessible custom properties
- **Audio & Hardware Web APIs**: Web Audio API, Screen Wake Lock API

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/shreyaaaa6/EqualRescue.git

# Navigate to project directory
cd EqualRescue

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
```

---

## ⚠️ Safety Disclaimer

PulseHer is an educational guidance prototype, not a clinical protocol or diagnostic tool. It does not replace emergency dispatchers, certified CPR training, or an Automated External Defibrillator (AED). In any real emergency, always call **112** immediately and follow the dispatcher's instructions.
