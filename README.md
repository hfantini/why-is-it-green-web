# why-is-it-green-web

> If it's green, we ship.  
> A toy app used to experiment with CI/CD and containerized deployments.

---

## 🧠 About

**why-is-it-green-web** is a minimal Vue 3 single-page application created as a playground for:

- CI/CD pipelines
- Docker image builds
- Trunk-based development
- Semantic versioning
- Cloud deployment (Render or similar platforms)

The application itself is intentionally simple and humorous.  
The real goal is infrastructure experimentation.

---

## 🎨 What It Does

- Displays the current "deploy mood"
- Shows a loading state on bootstrap
- Allows users to request a (mocked) excuse
- Simulates async behavior with separate loading states

Future versions will integrate with a backend API.

---

## 🛠️ Tech Stack

- Vue 3
- Vite
- TypeScript
- CSS (no UI framework)

---

## 🚀 Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

## 🧪 Project Goals

This project is intentionally small in scope but aims to simulate real-world practices:

- Feature branches
- Pull request workflow
- Protected main branch
- Automated CI checks
- Docker multi-stage builds
- Version tagging for releases
- Cloud deployment

---

## 📦 Versioning Strategy

Tags will represent production-ready releases.

Example:

```
v0.1.0
v0.2.0
v1.0.0
```

No tags are created until the application is fully deployable.

---

## 📄 License
TBD

---

Built for experimentation, not for monitoring your actual production system. Probably.