# T-bite Speaker Notes

這份講稿大綱對應 `slides/t-bite/index.tsx`。不是逐字稿，而是每頁的講述重點與轉場邏輯。

## 第一版假設

- 簡報 repo 不包含主系統 repo 的原始碼或截圖，因此 Implementation Highlights 先使用 mock product cards 呈現。
- 架構以 single Backend API / modular monolith 作為第一版說明方式；service boundary 先以 Menu、Order、Pickup、Settlement 等 domain boundary 呈現。
- Authentication / RBAC、Database、Cloud Runtime 是必要架構能力，但本簡報先以概念與架構圖呈現，不聲稱已有特定雲端供應商或特定 managed service。
- 測試內容以期末專題 demo 可驗證的 functional、scenario-based、role-based testing 為主。

---

## 1. Cover

**這頁要講什麼**

- 開場介紹 T-bite：企業訂餐系統，不是單純 lunch ordering app。
- 強調這是 cloud-native software engineering 課程期末專題。
- 報告主線會從問題情境一路講到架構、實作、測試與 demo。

**轉場到下一頁**

- 接著先說明為什麼企業訂餐值得被系統化，從現有痛點開始。

---

## 2. Problem Context

**這頁要講什麼**

- 大型企業或廠區訂餐不是小規模團購；參與者多、時間固定、責任需要清楚。
- 常見痛點包括：固定餐點、選擇有限、人工協調、紀錄分散、發生爭議時難追蹤。
- 這些問題不是單一 UI 能解決，而是流程與資料管理問題。

**轉場到下一頁**

- 既然問題牽涉流程，就要先理解不同角色分別在意什麼。

---

## 3. Stakeholder Word Cloud

**這頁要講什麼**

- 三種顏色代表三方：員工、廠商、TSMC / 福委會 / Admin。
- 員工關心便利、選擇、取餐與未送達；廠商關心菜單、產能、備餐與配送；Admin 關心審核、稽核、對帳與可追溯。
- 強調我們不是只從「員工點餐」出發，而是把企業級協作問題視為完整問題空間。

**轉場到下一頁**

- 接著把這些痛點整理成比較具體的 user stories 與 requirements。

---

## 4. User Stories & Requirements

**這頁要講什麼**

- 用三個角色各列 2–3 個需求，讓需求來源清楚。
- 員工需要清楚訂餐與取餐；廠商需要供應量與訂單彙整；Admin 需要稽核與月結資料。
- 這頁的重點是需求不是憑空長出來，而是從 stakeholder pain points 轉換而來。

**轉場到下一頁**

- 有了需求後，下一步定義 T-bite 到底要解決什麼。

---

## 5. What is T-bite?

**這頁要講什麼**

- 用一句話定義：T-bite 是連接員工、外部餐廳與企業福委會的企業訂餐平台。
- 它不是只處理下訂，而是把訂餐、供應、取餐驗證與對帳放進同一個 workflow。
- 四個區塊分別代表三個角色入口與共同資料紀錄。

**轉場到下一頁**

- 接著用 end-to-end flow 說明這個 workflow 在真實使用時如何運作。

---

## 6. End-to-End Service Flow

**這頁要講什麼**

- 走過完整流程：員工訂餐、廠商接單備餐、餐點送達、QR code / 員工 ID 驗證、Admin 檢視紀錄與月結。
- 強調每一步都會留下狀態或紀錄，讓後續爭議和對帳有依據。
- 這頁建立 audience 對系統主流程的共同理解。

**轉場到下一頁**

- 有了流程後，再說明需求如何對應到實際 feature 與 implementation。

---

## 7. Requirement-to-Feature Mapping

**這頁要講什麼**

- 表格從 Problem → Feature → Implementation，展示需求與工程實作的對應。
- 例如選擇有限對應多商家菜單；供應量不穩對應每日供應上限；取餐爭議對應 pickup record。
- 這頁要表達 feature selection 是 problem-driven，而不是任意堆功能。

**轉場到下一頁**

- 接著從功能層往下看系統架構，說明 T-bite 如何被設計成 cloud-native 系統。

---

## 8. System Architecture

**這頁要講什麼**

- Employee Portal、Vendor Portal、Admin Portal 分別處理不同角色工作。
- Backend API 作為統一服務入口，連到 Auth / RBAC、Database 與 Cloud Runtime。
- 第一版假設是 single Backend API / modular monolith；重點是 boundary 清楚、可維護、未來可拆分。

**轉場到下一頁**

- 架構圖之外，再把這些設計連回課程中的 cloud-native concepts。

---

## 9. Cloud Native Design Thinking

**這頁要講什麼**

- Cloud Native 不只是部署到雲上，而是系統是否容易部署、擴充、觀測與維護。
- 逐一說明 frontend/backend separation、stateless service、service boundary、scalability、maintainability、observability。
- 把 T-bite 的多角色特性連到 separation of concerns 與維運需求。

**轉場到下一頁**

- 接著用一些簡單工程公式，說明我們如何思考需求量與容量。

---

## 10. Demand & Capacity Reasoning

**這頁要講什麼**

- 用四個簡單公式回憶課程中的容量與負載推理。
- Expected Daily Orders 影響資料量；Vendor Load 影響供應上限；Peak Request Pressure 影響 cutoff 前 API 壓力；Delivery Window Load 影響配送與取餐設計。
- 重點不是精準數學，而是展示設計背後有工程假設。

**轉場到下一頁**

- 從工程推理回到目前第一版實作，說明我們完成了哪些核心亮點。

---

## 11. Implementation Highlights

**這頁要講什麼**

- 第一版聚焦在可 demo 的主流程：多角色入口、菜單管理、訂單流程、取餐驗證、Admin 紀錄與對帳。
- 說明目前簡報 repo 沒有主系統截圖，因此這頁先以 mock cards 呈現。
- 正式報告前若有主系統截圖，可以替換成實際頁面。

**轉場到下一頁**

- 系統做出來後，需要說明如何驗證它真的能支援這些流程。

---

## 12. Testing & Validation

**這頁要講什麼**

- 測試分成 functional、scenario-based、role-based、demo path validation。
- 對 T-bite 來說，最重要的是跨角色流程是否能走完，而不是只測單一頁面。
- demo path validation 確保現場報告能在有限時間內穩定展示。

**轉場到下一頁**

- 測試之外，企業流程還要考慮 reliability 與 operations。

---

## 13. Reliability & Operations

**這頁要講什麼**

- 可靠性不是只靠系統不當機，也包括狀態清楚、資料不散落、爭議可追蹤。
- 未送達記錄、取餐爭議追蹤、月結資料保留與 Admin 稽核都是營運可靠性的部分。
- 對企業訂餐而言，保留共同事實比單純提供點餐 UI 更重要。

**轉場到下一頁**

- 接著把所有內容收束成現場 demo flow，讓 audience 知道接下來會看到什麼。

---

## 14. Demo Flow & Closing

**這頁要講什麼**

- 清楚列出 demo 主線：員工下訂 → 廠商管理訂單 → 取餐驗證 → Admin 查看紀錄。
- 強調 demo 不追求展示所有功能，而是展示完整 workflow。
- 這頁也是進入實機展示前的 guide。

**轉場到下一頁**

- demo 前或 demo 後用最後一頁收束整份簡報的核心價值。

---

## 15. Conclusion

**這頁要講什麼**

- 重申總結句：T-bite is not just a lunch ordering app; it is a cloud-native workflow system for enterprise meal coordination.
- 總結三個價值：problem-driven、multi-stakeholder、cloud-native thinking。
- 結束時可以邀請 Q&A，或轉進 live demo。

**轉場到 Q&A**

- 若先 demo，結論後接 demo；若已 demo 完，結論後進 Q&A。
