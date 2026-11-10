# @events-lab/shared-components

Shared UI for the Events Lab dashboards. Admin and client apps import this package; they do not copy components.

The GitHub repository is [events-Lab/shared-compoenents](https://github.com/events-Lab/shared-compoenents). The folder keeps that spelling. The npm name is `@events-lab/shared-components`.

## What it exports

Source is grouped so primitives, shells, marketplace cards, and domain widgets stay separate. Everything public is re-exported from `src/index.ts`.

```
src/
  lib/            types, money, media, availability, cx
  ui/             button, fields, table, dialog, toast, gallery
  layout/         admin sidebar shell, client storefront header
  marketplace/    category, brand, product, and event cards
  domain/         CRM cards, cart summary, login and note forms
  theme.css       Tailwind v4 color tokens (primary, secondary, accent)
```

```tsx
import {
  AppShell,
  StorefrontShell,
  Button,
  CategoryCard,
  formatEgp,
} from "@events-lab/shared-components";
```

Apps load the theme from their global CSS:

```css
@import "tailwindcss";
@import "@events-lab/shared-components/theme.css";
@source "../shared-compoenents/src";
```

`next`, `react`, and `react-dom` are peer dependencies (Next.js 16+, React 19+). This package is TypeScript source, not a built bundle. Consuming apps list it in `transpilePackages`.

```bash
npm run typecheck
```

## Events Lab layout

[events-Lab](https://github.com/events-Lab) is three repositories, not a monorepo on GitHub:

| Repository | Package | Role |
| --- | --- | --- |
| `events-Lab/shared-compoenents` | `@events-lab/shared-components` | this package |
| `events-Lab/admin-dashboard` | operator app | http://localhost:3000 |
| `events-Lab/client-dashboard` | client storefront | http://localhost:3001 |

Check them out as siblings under a local `events-lab` folder and install from a private workspace `package.json` there. Both apps depend on this repo with `file:../shared-compoenents`, so the folder name has to match the repository name.

```bash
mkdir events-lab && cd events-lab
git clone https://github.com/events-Lab/shared-compoenents.git
git clone https://github.com/events-Lab/admin-dashboard.git
git clone https://github.com/events-Lab/client-dashboard.git
```

Workspace `package.json` (kept only in that local folder):

```json
{
  "name": "events-lab",
  "private": true,
  "workspaces": [
    "shared-compoenents",
    "admin-dashboard",
    "client-dashboard"
  ],
  "scripts": {
    "dev:admin": "npm run dev -w admin-dashboard",
    "dev:client": "npm run dev -w client-dashboard",
    "build": "npm run build -w admin-dashboard && npm run build -w client-dashboard",
    "typecheck": "npm run typecheck -w @events-lab/shared-components"
  }
}
```

```bash
npm install
npm run dev:admin
npm run dev:client
```

Commit and push from this directory when the shared UI changes. App-only changes belong in their own repositories.
