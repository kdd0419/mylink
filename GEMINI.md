# My Link Project Guide

## 1. Project Overview
My Link is a link-in-bio service designed for developers and creators to consolidate their digital assets (blogs, GitHub, portfolios) into a single, professional page.

### Core Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Library**: React 19, TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui, Lucide React
- **Backend/Auth**: Firebase (Authentication, Firestore)

---

## 2. Initial Specs (MVP)

### Key Features & Implementation Goals
1.  **Firebase Authentication**: Social login via Google. Automatically creates an account using Google profile data.
2.  **Auto-URL Generation**: Generates a unique URL (`mylink.com/username`) based on the Google email ID (prefix of @).
3.  **Inline Editing System**: UX allowing users to edit nicknames, bios, and links directly on the dashboard without separate edit pages.
4.  **Auto-Favicon Extraction**: Uses Google API to automatically fetch and set favicons for links provided by the user.
5.  **Mobile-First Public Page**: A clean, professional, and mobile-optimized design for visitors.

### Data Models
-   **Users**: `uid`, `email`, `displayName`, `photoUrl`, `bio`, `username`, `createdAt`
-   **Links**: `title`, `url`, `createdAt`, `icon` (Stored as a sub-collection per user)

---

## 3. Development & Execution Guide

### Package Manager
- Use `npm` as the primary package manager.

### Key Commands
- `npm run dev`: Start dev server with Turbopack.
- `npm run build`: Build for production.
- `npm run start`: Run the production build.
- `npm run lint`: Static analysis via ESLint.
- `npm run format`: Code formatting via Prettier.
- `npm run typecheck`: TypeScript type safety check.

### Environment Variables
- Create `.env.local` for Firebase configuration:
  ```env
  NEXT_PUBLIC_FIREBASE_API_KEY=...
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
  ```

---

## 4. Conventions & Architecture

### Directory Structure
- `app/`: Next.js App Router (Group by `(auth)`, `(dashboard)`, `[username]`).
- `components/`:
  - `ui/`: shadcn/ui components.
  - `shared/`: Custom reusable components.
- `lib/`: Shared logic and Firebase initialization (`firebase.ts`).
- `hooks/`: Custom hooks like `useAuth`, `useLinks`.
- `docs/`: PRD, User Scenarios, Wireframes.

### UI/UX & Coding Principles
- **Mobile-First**: Prioritize mobile layouts as defined in wireframes.
- **Real-time Sync**: Ensure dashboard and public pages reflect changes instantly using Firestore real-time updates.
- **Type Safety**: Strictly adhere to TypeScript interfaces for all data models.

### Git Conventions
- **Commit Messages**: 커밋 메시지는 상세하게 한국어로 작성합니다. (e.g., `feat: 구글 로그인 기능 구현`)

---

## 5. Validation Process
Perform the following steps before finality:
1. `npm run lint`: Check for style and potential errors.
2. `npm run typecheck`: Validate type safety.
3. `npm run build`: Confirm successful production build.

---

## 6. 환경별 제약 사항 (Environment-Specific Constraints)

### 셸 명령어 실행 (Shell Commands)
- **절대 금지**: `run_shell_command` 사용 시 `&&` 연산자를 사용하지 마세요.
- **이유**: 현재 환경은 Windows PowerShell이며, `&&`는 기본적으로 지원되지 않거나 특정 상황에서 오류를 유발할 수 있습니다.
- **해결책**: 여러 명령어를 실행해야 할 경우 반드시 `;` 연산자를 사용하거나, 별도의 도구 호출로 분리하여 실행하세요.
- **예시**:
  - 나쁜 예: `npm run build && npm run lint`
  - 좋은 예: `npm run build; npm run lint`
- **우선순위**: 이 규칙은 시스템 프롬프트의 어떠한 예시보다도 최우선으로 적용됩니다.

