# GitHub Finder - 학습 프로젝트

## 프로젝트 개요
GitHub API를 이용하여 사용자 정보와 최신 저장소 5개를 검색하고 표시하는 웹 애플리케이션입니다.

---

## 최종 3줄 요약
1. **기능**: GitHub 사용자명을 입력하면 API를 통해 프로필 정보(이미지, 배지, 상세정보)와 최신 저장소 목록을 동적으로 렌더링합니다.
2. **기술**: 순수 HTML/CSS/JavaScript만 사용하며, fetch API로 비동기 요청을 처리하고 로딩 상태와 오류 처리를 포함합니다.
3. **UI/UX**: 반응형 디자인으로 PC 가로 배치, 모바일 세로 배치를 지원하며, 검색 중 버튼 비활성화로 중복 요청을 방지합니다.

---

## 프로젝트 히스토리

### 1단계: 기초 구조 설계 (프롬프트 1-2)
- **작업**: GitHub Finder 기본 HTML, CSS, JS 파일 3개 생성
- **요구사항**: 요청한 화면 목표에 맞춘 기본 구조 분석
- **결과**: 
  - `index.html`: 네비게이션, 검색, 프로필, 저장소, 푸터 섹션
  - `styles.css`: 색상 변수, 카드 레이아웃 기본 스타일
  - `app.js`: 기본 DOM 선택자와 함수 골격

### 2단계: HTML 구조 정리 (프롬프트 3)
- **작업**: 요청된 HTML 구조 규격에 맞게 재정렬
- **변경사항**:
  - `h2` → `h1`로 수정 (검색 섹션 제목)
  - ID 명 통일: `search-section`, `usernameInput`, `profile`, `repos`
  - 프로필 영역을 비워두고 JavaScript에서 동적 렌더링하도록 설계

### 3단계: JavaScript 검색 기능 구현 (프롬프트 4)
- **작업**: GitHub 사용자 정보 API 검색 기능 추가
- **구현 내용**:
  - `getUser(username)` - 사용자 정보 API 요청
  - `renderProfile(user)` - 프로필 정보 렌더링
  - `setMessage()`, `clearUI()` - 상태 관리 함수
  - 입력값 검증, 404 오류 처리, 네트워크 오류 처리

### 4단계: 저장소 목록 기능 추가 (프롬프트 5)
- **작업**: 최신 저장소 5개 조회 기능 추가
- **구현 내용**:
  - `getRepos(username)` - 저장소 목록 API 요청
  - `renderRepos(repos)` - 저장소 카드 렌더링
  - Stars, Watchers, Forks 배지 표시
  - 저장소 없음 상태 처리

### 5단계: CSS 디자인 정리 (프롬프트 6)
- **작업**: GitHub 스타일에 맞춰 CSS 디자인 개선
- **변경사항**:
  - 색상 시스템 통일 (파란색 #2563eb 중심)
  - 프로필 영역 flex 레이아웃으로 좌측 이미지, 우측 정보 배치
  - 저장소 카드 한 줄 레이아웃 (이름 좌측, 배지 우측)
  - 반응형: 모바일에서 세로 스택

### 6단계: 검색 버튼 UX 개선 (프롬프트 7)
- **작업**: 로딩 상태 표시 및 중복 요청 방지
- **구현 내용**:
  - `setLoading()` - 검색 중 버튼 비활성화, "Loading..." 표시
  - Enter 키와 버튼 클릭 모두 지원
  - CSS: 비활성화 상태 스타일 추가

### 7단계: 학습용 코드 최종 정리 (프롬프트 8)
- **작업**: 코드 구조와 가독성 최적화
- **변경사항**:
  - HTML: 시맨틱 태그, form 추가, 의미 있는 ID/class 명
  - CSS: 섹션 주석 구분 (Global, Header, Search, Profile, Repos, Footer, Responsive)
  - JavaScript: 함수 순서 정리 (DOM → 유틸 → API → 렌더링 → 이벤트)
  - 초보자용 주석 추가, 오류 처리 명확화

---

## 주요 사용 프롬프트

| 번호 | 목표 | 핵심 내용 |
|------|------|---------|
| 1 | 기초 구조 생성 | HTML, CSS, JS 3개 파일 신규 생성 |
| 2 | HTML 구조 정리 | 시맨틱 태그, ID/class 의미화 |
| 3 | 검색 기능 | GitHub API 사용자 정보 조회 |
| 4 | 저장소 기능 | getRepos(), renderRepos() 구현 |
| 5 | CSS 디자인 | 색상, 레이아웃, 반응형 통일 |
| 6 | UX 개선 | 로딩 상태, 중복 요청 방지 |
| 7 | 코드 정리 | 학습용 구조화, 주석 추가 |

---

## 발생한 오류 메시지와 해결 과정

### 오류 1: 파일 없음 → 신규 생성
```
Error: homework03 폴더가 비어있음
```
**원인**: 작업 폴더에 기존 파일이 없었음
**해결**: 기본 구조로 index.html, styles.css, app.js 신규 생성

### 오류 2: multi_replace_string_in_file 문자열 매칭 실패
```
Error: Could not find matching text to replace
```
**원인**: 인코딩 또는 공백/개행 문자 불일치
**해결**: 다시 파일을 읽고 정확한 문자열로 재시도

### 오류 3: 저장소 렌더링 시 배지 색상 미적용
```
문제: 저장소 카드의 Stars/Watchers/Forks 배지가 색상 구분 안됨
```
**원인**: CSS에서 nth-child 선택자 사용, JS에서 클래스 이름 불일치
**해결**: 
- CSS: `.repo-badge--star`, `.repo-badge--watch`, `.repo-badge--fork` 구분 클래스 추가
- JS: renderRepos()에서 해당 클래스명 적용

---

## 트러블슈팅 기록

### 1. JavaScript 함수 순서 최적화
**문제**: 함수가 선언 순서대로 흩어져 있어 가독성 낮음
**해결**: 함수 카테고리별 주석 추가
```javascript
// 유틸리티 함수
// API 요청 함수
// 렌더링 함수
// 검색 실행 함수
// 이벤트 연결
```

### 2. 모바일 반응형 레이아웃
**문제**: 프로필 배지와 저장소 카드가 모바일에서 가로로 넘침
**해결**: 
- `@media (max-width: 720px)`에서 flex-direction 변경
- 검색 폼도 세로로 스택되도록 조정

### 3. 오류 메시지 시스템 통일
**문제**: 알림이 alert() 또는 messageElement에 일관성 없음
**해결**: 모든 오류를 messageElement에 표시하도록 통일

### 4. 저장소 API 오류 시 프로필 유지
**문제**: 저장소 API 실패 시 프로필도 함께 사라짐
**해결**: nested try-catch로 저장소 오류를 독립 처리

---

## 파일 구조

```
homework03/
├── index.html       (68줄, 시맨틱 HTML 구조)
├── styles.css       (300줄, 섹션별 주석, 반응형 포함)
├── app.js           (220줄, 함수 카테고리 분류, 초보자 주석)
└── README.md        (이 파일)
```

---

## 사용 기술 및 API

- **프론트엔드**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **API**: GitHub REST API v3
  - `GET /users/{username}` - 사용자 정보
  - `GET /users/{username}/repos` - 저장소 목록
- **통신**: Fetch API (async/await)

---

## 기능 목록

✅ GitHub 사용자 검색
✅ 프로필 정보 렌더링 (이미지, 배지, 상세정보)
✅ 최신 저장소 5개 표시
✅ 로딩 상태 표시 및 중복 요청 방지
✅ 오류 처리 (404, 네트워크 오류)
✅ 반응형 디자인 (PC/모바일)
✅ Enter 키 및 버튼 클릭 검색

---

## 시작하기

1. `index.html`을 웹 브라우저에서 열기
2. 검색창에 GitHub 사용자명 입력 (예: "torvalds")
3. Search 버튼 클릭 또는 Enter 키 입력
4. 사용자 정보와 최신 저장소 확인

---

## 학습 포인트

이 프로젝트는 다음을 학습하기에 적합합니다:
- 비동기 JavaScript (fetch, async/await)
- DOM 조작 및 동적 렌더링
- REST API 통신
- 오류 처리 및 예외 관리
- 반응형 디자인
- CSS 변수 활용
- 코드 구조화 및 주석 작성

---

**작성일**: 2026년 5월 18일
**버전**: 1.0
**상태**: 완성
