# x402 Bazaar Explorer

간단한 x402 바자르(Bazaar) 마켓플레이스 탐색기입니다. JSON 형식의 바자르 판매 정보를 웹 UI로 확인할 수 있습니다.

## 라이브 웹페이지

[바자르 탐색기](https://bazaar.boutlet.app/)에서 배포된 탐색기 페이지를 확인할 수 있습니다.

## 실행 전 설치

로컬에 20버전 이상의 node.js가 설치되어 있어야합니다.
패키지 매니저는 yarn 4.9.2 버전을 사용합니다.

패키지 설치하기

```bash
yarn
```

커스텀 Facilitator 연결과 세션 비밀키 값 변경이 필요한 경우 환경변수를 설정합니다. 아래 커맨드로 .env.example을 복사하여 .env 파일을 생성합니다.

```bash
cp .env.example .env
```

다음 환경 변수를 설정합니다. 모든 환경변수는 선택적이며 `FACILITATOR_URL`이 없을 경우 기본 CDP Facilitator로 연결됩니다.

- `FACILITATOR_URL` - Facilitator URL (List Resources 옵션이 활성화되지 않은 Facilitator의 경우 바자르 목록을 반환하지 않음)
- `SESSION_SECRET` - 테마와 언어 설정 세션에 사용되는 비밀키

## 실행 및 배포

### 개발 환경으로 실행

```bash
yarn dev
```

### 서버 빌드

```bash
yarn build
```

### 빌드된 서버 실행

```bash
yarn start
```

(참고: `yarn build`후에 `yarn start`로 빌드된 서버를 실행하게 되면 더 이상 .env 파일의 환경 변수는 참조되지 않습니다)

## 구조

```plaintext
├── .vscode
│   └── settings.json       # VS Code 설정 파일 (저장시 eslint와 prettier 포맷팅)
├── .yarn
│   └── releases            # Yarn 파일
├── app                     # 리액트라우터 App 폴더
│   ├── .server             # Vite 서버사이드 전용 폴더
│   │   ├── controllers     # Request&Response 컨트롤러
│   │   ├── lib             # 유틸리티 (서버 사이드에서만 사용)
│   │   ├── locales         # 다국어 언어셋 폴더
│   │   │   ├── en          # 영어 네임스페이스 언어셋
│   │   │   ├── ko          # 한국어 네임스페이스 언어셋
│   │   │   └── types.d.ts  # 언어 JSON 파일 타입 정의
│   │   ├── schemas         # 요청 파라미터 유효성 검증 JSON Schema
│   │   └── services        # 서비스 로직
│   ├── common              # 공통
│   │   ├── constants.ts    # 공통 상수
│   │   └── types.d.ts      # 공통 타입
│   ├── components          # 컴포넌트
│   │   ├── svg             # svg 파일 폴더 (SVGR로 리액트 컴포넌트로 사용)
│   │   └── ui              # 커스텀 UI 컴포넌트 폴더
│   ├── hooks               # 커스텀 훅
│   ├── lib                 # 유틸리티
│   ├── routes              # 경로 폴더
│   │   ├── apis            # API 경로 폴더
│   │   └── pages           # 리액트 페이지 경로 폴더
│   ├── app.css             # TailwindCSS 스타일 설정
│   ├── root.tsx            # 리액트라우터 Root 파일
│   └── routes.ts           # 경로 설정 파일
├── public
│   └── favicon.ico         # 파비콘
├── .env.example            # 환경변수 예제
├── .eslintignore           # ES Lint 제외 파일
├── .eslintrc.cjs           # ES Lint 설정 파일
├── .gitignore              # Git 제외 파일
├── .prettierignore         # Prettier 제외 파일
├── .prettierrc.cjs         # Prettier 설정 파일
├── .yarnrc.yml             # Yarn 설정 파일
├── component.json          # shadcn/ui 설정 파일
├── package.json            # node.js 패키지 설정 파일
├── react-router.config.ts  # 리액트라우터 설정 파일
├── README.md               # README 파일
├── tsconfig.json           # 타입스크립트 설정
├── vite.config.ts          # Vite 설정
└── yarn.lock
```
