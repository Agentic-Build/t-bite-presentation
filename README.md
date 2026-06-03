# T-bite Presentation

這個 repo 是 **T-bite** 的期末簡報資料整理處；原先以 open-slide 製作，最後正式報告改用 Google Slides 手工完成。

- 簡報主題：T-bite — Enterprise Corporate Catering System
- 情境：TSMC / 大型企業廠區訂餐流程
- 報告時間：正式報告約 10–12 分鐘，Q&A 約 3–5 分鐘
- 最終版簡報：[`exports/t-bite-final-google-slides.pdf`](exports/t-bite-final-google-slides.pdf)
- HackMD 摘要備份：[`docs/t-bite-hackmd-summary.md`](docs/t-bite-hackmd-summary.md)
- open-slide 草稿 deck：`slides/t-bite/index.tsx`
- 主系統 repo：<https://github.com/Agentic-Build/corporate-catering-system>

## 專案目的

這份簡報不是主系統本身，而是用來說明 T-bite 的期末專題成果：

1. 企業訂餐場景中的實際痛點。
2. 員工、廠商、TSMC / 福委會 / Admin 三方需求。
3. T-bite 如何把需求轉成系統功能與流程。
4. 系統的 Cloud Native Architecture 與工程設計考量。
5. 測試、可靠性、營運與 demo flow。

核心訊息：**T-bite is not just a lunch ordering app; it is a cloud-native workflow system for enterprise meal coordination.**

## 安裝

本專案使用 open-slide、React、Vite 與 pnpm。

```bash
pnpm install
```

如果本機沒有 pnpm，可以先啟用 Corepack：

```bash
corepack enable
corepack prepare pnpm@latest --activate
pnpm install
```

## 啟動 dev server

```bash
pnpm dev
```

啟動後依 terminal 顯示的網址開啟瀏覽器，進入 `T-bite` deck。

## Build

```bash
pnpm build
```

build 成功後會產生靜態輸出，可用於部署或後續預覽。

## Preview built output

```bash
pnpm preview
```

## PDF 輸出

open-slide 主要提供瀏覽器播放與靜態 build。若要輸出 PDF，建議流程：

1. 執行 `pnpm dev` 或 `pnpm preview`。
2. 在瀏覽器開啟 `slides/t-bite`。
3. 進入 fullscreen / presentation view。
4. 使用瀏覽器列印功能選擇「Save as PDF」。

若課程或團隊後續指定自動化 PDF 匯出工具，可再加入對應流程，但目前第一版不新增依賴。

## Repo 結構

```text
t-bite-presentation/
├── slides/
│   ├── getting-started/        # open-slide 初始化範例 deck
│   └── t-bite/
│       ├── index.tsx           # T-bite 主要簡報
│       └── assets/             # T-bite slide-local assets；目前第一版未使用外部圖片
├── docs/
│   └── speaker-notes.md        # 每頁講稿大綱與轉場
├── assets/                     # 全域可重用 assets
├── open-slide.config.ts
├── package.json
└── README.md
```

## Deck outline

目前 `slides/t-bite/index.tsx` 包含 15 頁，符合「至少 14 頁」要求：

1. Cover — T-bite / Enterprise Corporate Catering System / 課程期末專題脈絡
2. Problem Context — 企業訂餐痛點
3. Stakeholder Word Cloud — 員工、廠商、Admin 三色文字雲
4. User Stories & Requirements — 三種角色的 user stories
5. What is T-bite? — T-bite 的一句話定義與平台定位
6. End-to-End Service Flow — 下訂、接單、配送、取餐驗證、Admin 月結
7. Requirement-to-Feature Mapping — Problem / Feature / Implementation
8. System Architecture — Employee / Vendor / Admin Portal、Backend API、DB、Auth / RBAC、Cloud Runtime
9. Cloud Native Design Thinking — frontend/backend separation、stateless、service boundary、scalability、maintainability、observability
10. Demand & Capacity Reasoning — 訂單量、廠商負載、cutoff 尖峰與配送窗口推理
11. Implementation Highlights — 多角色入口、菜單、訂單、取餐驗證、Admin 對帳
12. Testing & Validation — functional、scenario-based、role-based、demo path validation
13. Reliability & Operations — 未送達、取餐爭議、月結資料、Admin 稽核
14. Demo Flow & Closing — demo 主線
15. Conclusion — 最後總結句

## 和主系統 repo 的關係

- 本 repo：`t-bite-presentation`，只負責期末專題簡報。
- 主系統 repo：<https://github.com/Agentic-Build/corporate-catering-system>，負責 T-bite 主要產品 / 系統實作。
- 第一版簡報根據目前 README、題目背景與合理工程假設完成；尚未直接引用主系統截圖。
- 若主系統 repo 後續提供正式 UI screenshot，可以放到 `slides/t-bite/assets/` 並替換 Implementation Highlights 的 mock product cards。

## 第一版假設

因為目前簡報 repo 不含主系統原始碼與截圖，第一版採用以下假設：

1. 系統採用多角色入口：Employee Portal、Vendor Portal、Admin Portal。
2. Backend 以 single Backend API / modular monolith 方式呈現，並在 domain boundary 上區分 Menu、Order、Pickup、Settlement。
3. Authentication / Role-based Access 是系統必要能力，但簡報先以架構區塊呈現。
4. Database 保存 orders、users、menu items、pickup records、exception logs 與 settlement records。
5. Deployment / Cloud Runtime 以 stateless web/API process、環境設定與 build artifact 為主要 cloud-native 說明重點。
6. 測試策略以課程期末 demo 可驗證的 scenario-based 與 role-based testing 為主。

## 常用 commands

| Command | Description |
| --- | --- |
| `pnpm install` | 安裝依賴 |
| `pnpm dev` | 啟動 open-slide dev server |
| `pnpm build` | 建置靜態成果 |
| `pnpm preview` | 預覽 build 成果 |
| `pnpm sync:skills` | 同步 open-slide agent skills |
