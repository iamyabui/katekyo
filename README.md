## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## フォルダー構成

以下共通で利用するコンポーネント及びページ毎にフォルダーを設けている。
・teacher：チャット以外の先生ユーザー用ページ
-common：各ページの共通コンポーネント
-myStudentDetail：担当生徒のプロフィールページページ
-myStudentList：担当生徒リストページ
-profileDetail：先生ユーザーのプロフィールページ
-profileEdit：先生ユーザーのプロフィールページ

・student：チャット以外の生徒ユーザー用ページ
-attendanceStatus：受講状況ページ
-common：各ページの共通コンポーネント
-profileDetail：生徒ユーザーのプロフィールページ
-profileEdit：生徒ユーザーのプロフィールページ

・login：ログイン（or 新規登録）ページ

・chat：チャット用ページ
-chatList：チャットリストページ（チャットしている生徒 or 先生のリスト）
-chatRoom：チャットルームページ

・common：共通コンポーネント
以下共通で利用する部品毎にフォルダを設けている
-buttons
-checkbox
-form
-header
-icon
-pulldown
-selectButtons

・top：トップページ（先生一覧ページ）
　-teacherDetail：先生詳細ページ
