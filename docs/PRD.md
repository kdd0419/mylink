# 마이링크 (My Link) - PRD (기능 정의서)

| 버전 | 작성일 | 상태 |
| :--- | :--- | :--- |
| v0.1 | 2026-04-11 | 초안 (Draft) |

## 1. 프로젝트 개요

- **프로젝트 명**: 마이링크 (My Link)
- **목적**: 개발자와 크리에이터가 자신의 작업물, 포트폴리오, 소설 미디어 등 흩어진 다양한 디지털 자산을 **세련되고 직관적인 하나의 링크**로 통합하여 효율적으로 관리하고 공유할 수 있는 서비스를 제공합니다.
- **대상 사용자**: 
  - **Primary**: 자신의 기술 블로그, GitHub 작업물, 프로젝트 데모 등을 효과적으로 보여주고 싶은 개발자
  - **Secondary**: 디자인, 영상 등 시각적 포트폴리오 링크 관리가 필요한 크리에이터
  - **General**: 자신의 정체성을 표현하고 싶은 모든 디지털 유저

---

## 2. 핵심 기능 목록

### 필수 기능 (MVP)
1. **사용자 인증**: Google 소셜 로그인 (Firebase Auth 기반)
2. **프로필 관리**: 프로필 이미지 (Google 프로필 이미지 자동 사용), 닉네임, 한 줄 소개 편집, 수정은 별도의 수정 폼/모달 없이 텍스트를 클릭하여 즉시 수정하는 인라인 수정으로 구현
3. **링크 관리 (CRUD)**: 사용자 맞춤형 링크 생성, 수정, 삭제, 버튼 제목 및 URL 설정, 링크의 파비콘을 Google APi로 갸져와서 이이콘 설정
4. **사용자 페이지**: 각 사용자 전용 URL (`mylink.com/username`) 제공
5. **퍼블릭 페이지 (뷰어)**: 방문자가 보는 실제 프로필 페이지로 반응형 디자인과 (모바일 최적화), shadcn/ui 기반의 깔끔하고 전문적인 UI 표출

### 추후 제공 예정
- **방문자 통계 (Analytics)**: 링크 클릭 수 및 방문자 유입 경로 분석 (Firestore 기반)
---

## 3. 기능 상세 설명

### 3.1 사용자 인증
- **진입점**: 메인 랜딩 페이지의 "Google로 시작하기" 버튼.
- **로직**: Firebase Auth SDK 활용 팝업/리다이렉트 로그인.
- **초기값**: Google gmail 아이디의 앞부분을 가져와서 사용(DisplayName)과 사진(PhotoURL)을 가져와서 프로필 초기값으로 설정

### 3.2 대시보드 (Admin) - 인라인 에디팅 중심
- 로그인 후 진입하는 메인 관리 화면.
- **편집 패널**:
  - **프로필 탭**: 닉네임, 소개글 수정.
  - **중복 검사**: 닉네임 수정 시 유일성 검사 필요 (URL로 사용되므로).
  - **링크 탭**: 링크 목록 노출, "새 링크 추가" 버튼.
  - 각 링크 아이템: 삭제 버튼. 

### 3.3 링크 데이터 구조
- 기본 link 타입:
 - Title: 링크 제목
 - URL: 이동 경로
 - icon: 링크의 파비콘으로 이이콘 설정

### 3.4 디자인 시스템 (UI/UX)
- 프레임워크: `shadcn/ui` (Tailwind CSS 기반).
- 톤앤매너:
  - 개발자 친화적인 깔끔함 (Clean, Minimal).
  - 과한 장식보다는 가독성과 정보 전달에 집중.
  - 기본 폰트: Inter 또는 Pretendard 권장.

### 3.5 프로필 페이지 및 공유
- **공유용 URL**: `mylink.com/[사용자아이디]` 형태의 짧은 주소를 통해 외부(인스타그램, X 등)로 쉽게 전파할 수 있습니다.
- **프로필 이미지**: 초기 가입 시 Google 계정의 프로필 이미지를 그대로 사용합니다.
- **자동 ID 생성**: 가입 시 Google 이메일의 ID 영역(@ 앞자리)을 기반으로 사용자 고유 URL을 자동 할당합니다.
- **자기소개**: 사용자 페이지 상단에 노출될 간단한 텍스트 소개글을 작성할 수 있습니다.

### 3.6 데이터 및 인프라
- **데이터 저장소**: 모든 사용자 정보와 링크 데이터는 Firebase Firestore에 저장됩니다.

---

## 4. 데이터베이스 모델링 (NoSQL - Firestore DB 제안)

### 4.1 `users` (Collection)
사용자의 기본 정보 및 프로필 설정을 저장합니다.
- **Document ID**: `{uid}` (Firebase Auth UID)
- **Fields**:
  - `email`: string (사용자 이메일)
  - `displayName`: string (닉네임/표시 이름)
  - `photoUrl`: string (프로필 이미지 URL)
  - `bio`: string (한 줄 소개)
  - `username`: string (고유 사용자 ID, URL 경로로 사용)
  - `createdAt`: timestamp (계정 생성일)
```json
{
  "uid": "google_uid_123",
  "email": "user@example.com",
  "displayName": "Kim Dev",
  "photoUrl": "https://...",
  "bio": "Frontend Developer",
  "username": "dev_kim",
  "createdAt": "timestamp"
}
```

### 4.2 `links` (Sub-collection)
`users/{uid}/links` 경로에 위치하며, 각 사용자가 생성한 링크 목록을 저장합니다.
- **Document ID**: 자동 생성 (Auto-generated ID)
- **Fields**:
  - `title`: string (링크 제목)
  - `url`: string (이동할 대상 URL)
  - `createdAt`: timestamp (링크 생성일)
```json
{
  "id": "link_uuid",
  "title": "My Blog",
  "url": "https://blog.example.com",
  "createdAt": "timestamp"
}
```


---

## 5. 디자인 컨셉 및 UI
- **스타일**: 깔끔하고 모던한 개발자 중심의 디자인 (Dark Mode 기본 지원 포함 고려)
- **프레임워크**: React/Next.js (예정) + Tailwind CSS + shadcn/ui

---
마지막 업데이트: 2026-04-11
