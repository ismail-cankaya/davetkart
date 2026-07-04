# Davetkart Project Guidelines

## Architecture & Tech Stack
- **Framework:** React 19 (with TypeScript)
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animations & Transitions:** Motion (`motion` library)
- **Icons:** Lucide React (`lucide-react`)
- **AI Integration:** Google GenAI (`@google/genai`)

## Design & UI/UX Principles (Core Focus)
- **Modern & Premium Aesthetics:** The UI must look highly professional and state-of-the-art. Avoid generic designs. Use modern typography, well-curated color palettes, and sleek layouts.
- **Dynamic Transitions:** Always implement smooth micro-animations, hover states, and page transitions using the `motion` library. The interface should feel alive and responsive.
- **High-Quality Components:** Build reusable, encapsulated components leveraging Tailwind CSS utilities.

## Setup & Commands
- **Install dependencies:** `npm install`
- **Development Server:** `npm run dev` (Runs on `http://localhost:3000`)
- **Build:** `npm run build`
- **Type Checking:** `npm run lint`


## Enterprise & Professional Architectural Guidelines
To maintain a high-quality, production-ready SaaS application, all new development MUST adhere to the following enterprise-level standards. Unprofessional or prototype-level methods (like heavy prop drilling or relying solely on localStorage for core data) are strictly prohibited.

### 1. State Management (Enterprise Level)
- **No Prop Drilling:** Do not pass state deeply through multiple components (e.g., passing `invitation` or `handleInputChange` down 3-4 levels).
- **Global State Libraries:** For complex, application-wide states (like Invitation Data, RSVP lists), use professional state management libraries such as **Zustand**, **Redux Toolkit**, or **Jotai**. (Migrate away from monolithic hooks).
- **Context API:** For simpler scoped states, use React Context.
- **Hook Modularity:** Do not create monolithic hooks (e.g., a massive `useAppState` handling everything). Break hooks down by feature domain (e.g., `useInvitationStore`, `useRSVPStore`, `useUIStore`).

### 2. Backend & Data Persistence
- **API Integration:** Client-side mock data and `localStorage` are only for temporary caching or offline support. Core application data (User accounts, Invitations, RSVPs) must be managed via a proper Backend API.
- **File Uploads:** Do not rely on `URL.createObjectURL` for permanent file storage. Image/Video uploads must be sent to a backend or cloud storage provider (e.g., AWS S3, Cloudinary), and the resulting secure URL should be stored in the database.

### 3. Component Architecture
- **Separation of Concerns:** Keep business logic outside of UI components. UI components should only concern themselves with rendering data and emitting events.
- **Atomic Design:** Build UI using small, reusable, and testable components (e.g., under `src/components/ui`).

### 4. General Coding Standards
- **Strict TypeScript:** Write strict, strongly typed TypeScript code. Define explicit interfaces/types for all data structures and API responses. Avoid `any`.
- **Code Splitting:** Continue utilizing `React.lazy` and `React.Suspense` for heavy components to optimize First Contentful Paint (FCP).
- **Documentation:** Use Github-style Markdown when creating documentation and include clear comments for complex business logic.

