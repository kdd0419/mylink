# 마이링크 (My Link)

Linktree 스타일의 링크 모음 서비스. GitHub, 블로그, 포트폴리오 등 여러 링크를 하나의 공개 URL로 공유할 수 있습니다.

## 주요 기능

- Google 소셜 로그인
- 링크 추가 / 수정 / 삭제 (순서 정렬)
- 프로필 인라인 편집 (이름, 유저네임, 소개)
- 링크 클릭 수 추적
- `/stats` — 링크별 클릭 통계 차트 (recharts)
- `/[username]` — 인증 없이 접근 가능한 공개 공유 페이지

## 기술 스택

| 영역 | 사용 기술 |
|------|-----------|
| 프레임워크 | Next.js 16 (App Router, Turbopack) |
| UI | shadcn/ui, Tailwind CSS v4, lucide-react |
| 상태 관리 | TanStack Query v5 |
| 백엔드/DB | Firebase Firestore, Firebase Auth |
| 폼 검증 | React Hook Form + Zod |
| 차트 | Recharts |
| 알림 | Sonner |
| 테마 | next-themes (다크/라이트 모드) |

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 Firebase 프로젝트 설정값을 입력합니다:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### 3. 개발 서버 실행

```bash
npm run dev
```

## 명령어

```bash
npm run dev        # 개발 서버 실행 (Turbopack)
npm run build      # 프로덕션 빌드
npm run lint       # ESLint 검사
npm run format     # Prettier 포맷 (.ts/.tsx)
npm run typecheck  # TypeScript 타입 검사
```

## 데이터 구조 (Firestore)

```
users/{uid}                  ← 사용자 프로필 (displayName, username, bio, photoURL)
users/{uid}/links/{linkId}   ← 링크 목록 (title, url, clickCount, createdAt)
```

## UI 컴포넌트 추가

shadcn/ui 컴포넌트는 아래 명령어로 추가합니다:

```bash
npx shadcn@latest add <component>
```
