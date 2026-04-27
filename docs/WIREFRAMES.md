# 마이링크 (My Link) - 와이어프레임 (Wireframes)

이 문서는 '마이링크' 서비스의 주요 화면 구조 및 페이지 간 흐름을 정의합니다. 모든 화면은 모바일 퍼스트(Mobile-First) 디자인을 따릅니다.

## 0. 페이지 흐름도 (Page Flow)

서비스의 주요 사용자별 이동 경로를 나타냅니다.

```mermaid
graph TD
    %% 소유자 흐름
    Owner((소유자)) --> Landing[1. 랜딩 페이지]
    Landing -- "Google 로그인" --> Auth{인증 및 회원 확인}
    
    Auth -- "신규 유저" --> CreateAcc[계정 생성 및 프로필 초기화]
    CreateAcc --> Dash[2. 대시보드]
    
    Auth -- "기존 유저" --> Dash
    
    Dash -- "링크/프로필 관리" --> Dash
    Dash -- "로그아웃" --> Landing

    %% 방문자 및 소유자 결과물 흐름
    Visitor((방문자)) --> Public[3. 공개 페이지]
    Dash -. "URL 공유" .-> Public
    
    Public -- "링크 버튼 클릭" --> External[외부 페이지 / New Tab]
    
    style Owner fill:#f9f,stroke:#333,stroke-width:2px
    style Visitor fill:#bbf,stroke:#333,stroke-width:2px
    style Dash fill:#dfd,stroke:#333,stroke-width:2px
    style Public fill:#ffd,stroke:#333,stroke-width:2px
    style External fill:#eee,stroke:#333,stroke-dasharray: 5 5
    style Auth fill:#fff,stroke:#333,stroke-width:2px
```

---

## 1. 랜딩 페이지 (Landing Page)

비로그인 사용자가 처음 마주하는 페이지로, 서비스 소개와 구글 로그인 기능을 제공합니다.

```text
+---------------------------------------+
|  My Link                              | <--- 로고
+---------------------------------------+
|                                       |
|          Welcome to My Link           | <--- 메인 카피
|                                       |
|     나만의 링크들을 하나의 페이지로   | <--- 서비스 설명
|      깔끔하게 정리하고 공유하세요.    |
|                                       |
|       +-----------------------+       |
|       | [G] Google로 시작하기 |       | <--- 구글 로그인 버튼
|       +-----------------------+       |
|                                       |
|                                       |
|          [ 서비스 미리보기 ]          | <--- 서비스 목업 이미지
|          [     Mockup      ]          |
|                                       |
+---------------------------------------+
|          Made with My Link            |
+---------------------------------------+
```

### 주요 컴포넌트 구조 (Mermaid)
```mermaid
graph TD
    subgraph Landing_Layout
        L1[Logo] --> L2[Main Copy & Description]
        L2 --> L3[Google Login Button]
        L3 --> L4[Service Preview Mockup]
        L4 --> L5[Footer]
    end
```

---

## 2. 대시보드 (Dashboard - Owner)

사용자가 자신의 프로필과 링크를 관리하는 화면입니다.

```text
+---------------------------------------+
|  My Link               [ Logout ]     | <--- 헤더 (상단 고정)
+---------------------------------------+
|                                       |
|       +-----------------------+       |
|       |       [ Profile ]     |       | <--- 프로필 이미지 (고정)
|       +-----------------------+       |
|                                       |
|       [ 닉네임 (Username) ]           | <--- 클릭 시 인라인 편집
|                                       |
|   mylink.com/ [ URL ID      ]         | <--- 고정 주소 + 입력창
|                                       |
|       [ 한 줄 소개 (Bio)  ]           | <--- 클릭 시 인라인 편집
|                                       |
+---------------------------------------+
|                                       |
|       [ + 새 링크 추가 ]              | <--- 링크 추가 버튼
|                                       |
+---------------------------------------+
|                                       |
|  +---------------------------------+  |
|  | [Icon]  [ 제목 (Title) ]    [X] |  | <--- 링크 아이템 (편집/삭제)
|  |         [ URL          ]        |  |
|  +---------------------------------+  |
|                                       |
|  +---------------------------------+  |
|  | [Icon]  [ 제목 (Title) ]    [X] |  |
|  |         [ URL          ]        |  |
|  +---------------------------------+  |
|                                       |
+---------------------------------------+
```

### 주요 컴포넌트 구조 (Mermaid)
```mermaid
graph TD
    subgraph Dashboard_Layout
        A[Header: Logo & Logout] --> B[Profile Section]
        B --> C[Link Management Section]
    end

    subgraph Profile_Section
        B1[Profile Image]
        B2[Username: Inline Edit]
        B3[URL ID: mylink.com/ + Input]
        B4[Bio: Inline Edit Area]
    end

    subgraph Link_Management
        C1[Add Link Button]
        C2[Link List]
        C2 --> C2a[Favicon + Title/URL Edit + Delete]
    end
```

---

## 3. 공개 페이지 (Public Page - Visitor)

방문자가 링크를 확인하고 클릭하는 화면입니다.

```text
+---------------------------------------+
|                                       |
|                                       |
|       +-----------------------+       |
|       |       [ Profile ]     |       |
|       +-----------------------+       |
|                                       |
|            닉네임 (Username)          |
|                                       |
|             한 줄 소개 (Bio)          |
|                                       |
|                                       |
+---------------------------------------+
|                                       |
|  +---------------------------------+  |
|  | [Icon]       Link Title         |  | <--- 링크 클릭 시 외부 이동
|  +---------------------------------+  |
|                                       |
|  +---------------------------------+  |
|  | [Icon]       Link Title         |  |
|  +---------------------------------+  |
|                                       |
|  +---------------------------------+  |
|  | [Icon]       Link Title         |  |
|  +---------------------------------+  |
|                                       |
+---------------------------------------+
|          Made with My Link            |
+---------------------------------------+
```

### 주요 컴포넌트 구조 (Mermaid)
```mermaid
graph TD
    subgraph Public_Layout
        P1[Profile Image] --> P2[Username]
        P2 --> P3[Bio]
        P3 --> L1[Link Button 1]
        P3 --> L2[Link Button 2]
        P3 --> L3[Link Button n]
        Ln[Link Buttons] --> F[Footer: Brand Tag]
        L1 -- "새 탭으로 이동" --> Ext[외부 URL]
    end
```

---
마지막 업데이트: 2026-04-27
