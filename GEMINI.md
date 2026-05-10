# My Link Project Guide

## 1. Project Overview
My Link는 개발자와 크리에이터를 위한 'Link-in-bio' 서비스입니다. 블로그, GitHub, 포트폴리오 등 흩어져 있는 디지털 자산을 하나의 프로페셔널한 페이지로 모아 관리하고 공유할 수 있습니다.

### Core Tech Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Library**: React 19, TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui, Lucide React
- **Backend/Auth**: Firebase 12 (Authentication, Firestore, Storage)

---

## 2. Core Features & Implementation

### 2.1 Authentication (Firebase Auth)
- **Google Login**: `GoogleAuthProvider` 및 `signInWithPopup`을 통한 소셜 로그인.
- **State Management**: `onAuthStateChanged`를 활용하여 `useAuth` 훅에서 실시간 인증 상태 관리.
- **User Provisioning**: 첫 로그인 시 구글 프로필(email, displayName, photoURL)을 기반으로 `users/{uid}` 문서를 자동 생성.

### 2.2 My Page (Personalized Dashboard)
- **User Context**: 로그인 상태에 따라 `Landing` 페이지 또는 개인화된 `마이페이지` 노출.
- **Data Isolation**: 모든 링크 데이터는 Firestore의 `users/{uid}/links` 서브 컬렉션에서 독립적으로 관리.
- **Inline Editing**: 닉네임, 한 줄 소개, 링크 정보를 페이지 이동 없이 즉시 수정하는 UX 지향.

### 2.3 Link Management
- **Personalized CRUD**: `useLinks(uid)` 훅을 통해 현재 로그인한 유저의 링크 목록만 조회/추가/수정/삭제.
- **Auto-Favicon**: Google Favicon API를 사용하여 입력된 URL의 아이콘을 자동으로 추출 및 표시.

---

## 3. Directory Structure & Conventions

### 3.1 Directory Structure
- `app/`: Next.js App Router (메인 페이지 및 라우팅 로직).
- `components/`:
  - `ui/`: shadcn/ui 기반 원자적(Atomic) 컴포넌트.
  - `shared/`: `Header`, `Landing`, `LinkItem`, `Dialog` 등 서비스 도메인 공통 컴포넌트.
- `hooks/`: `useAuth`, `useLinks` 등 핵심 비즈니스 로직 및 상태 관리.
- `lib/`: `firebase.ts` (초기화), `utils.ts` (유틸리티), `validations.ts` (Zod 스키마).
- `data/`: `user.ts`, `links.ts` 등 데이터 모델 정의 및 정적 데이터.
- `docs/`: PRD, 와이어프레임, 시나리오 문서.

### 3.2 Coding Principles
- **Mobile-First**: 모든 UI는 모바일 환경을 최우선으로 하며, Tailwind CSS를 사용하여 반응형 대응.
- **Type Safety**: API 응답 및 상태 관리에 TypeScript 인터페이스를 엄격히 적용.
- **Clean Architecture**: 컴포넌트는 UI 전달에 집중하고, 복잡한 로직은 Custom Hooks로 분리.

---

## 4. Environment & Commands

### 4.1 Environment Variables (.env.local)
```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### 4.2 Key Commands
- `npm run dev`: 개발 서버 실행 (Turbopack).
- `npm run build`: 프로덕션 빌드 생성.
- `npm run lint`: ESLint 정적 분석.
- `npm run typecheck`: TypeScript 타입 검사.

---

## 5. 중요 제약 사항 (Constraints)

### 5.1 셸 명령어 실행 (Shell Commands)
- **Windows PowerShell 환경**: `run_shell_command` 사용 시 `&&` 연산자를 절대 사용하지 마세요.
- **해결책**: 명령어 구분 시 반드시 `;`를 사용하세요 (예: `npm run build; npm run lint`).

### 5.2 데이터 관리
- **Firestore Path**: 개인 데이터는 반드시 `users/{uid}/...` 경로를 준수하여 데이터 격리를 보장해야 합니다.
- **Favicon**: 아이콘 저장 대신 Google API(`https://www.google.com/s2/favicons?domain=...`)를 활용한 실시간 렌더링을 우선합니다.
