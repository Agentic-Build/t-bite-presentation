# 06-03 T-Bite: AI Agent 驅動的企業團膳系統開發實驗：從需求、程式生成到可觀測性驗證

[image]

> 最終版簡報已改用 Google Slides 手工完成並完成正式報告；PDF 備份放在 repo：
> [t-bite-final-google-slides.pdf](https://github.com/Agentic-Build/t-bite-presentation/blob/main/exports/t-bite-final-google-slides.pdf)。
> open-slide 版本保留為開發過程與草稿紀錄，不是最終報告版。

## 核心概要

第10組真正交付的不是一個「訂餐系統」，而是一套以 AI Agent 為主要開發者、以可觀測性作為驗證介面的軟體生產實驗。Engineering Team 將台積電 T-bite 企業團膳需求拆成員工端、商家端、福委會管理端三個前端，後端採 Go 單一映像檔搭配不同角色啟動，部署在 Kubernetes，並以 Argo CD、Grafana、SonarQube、CVE 掃描、壓測與故障注入建立交付基線；其核心論證是：若需求文字能被轉譯成 backlog、feature branch、測試與 observability loop，AI Agent 可以產出 15 萬行等級的可運行 codebase，甚至在 10 萬員工、200 商家、200 pickup points、約百萬級 backend API request 的壓測情境下達到每秒約 571 人請求處理量。真正的風險也暴露得很清楚：後端與 schema 可被 Agent 快速改動並達成效能目標，但前端行為、accessibility、使用者預期與產品語意才是主要失真點；資料庫 schema 因優化 loop 頻繁變動，短期提高自動化速度，長期卻可能形成治理與部署穩定性的隱性債務。We are taking the bet that AI-native development can move from「寫程式」升級到「觀察、修正、驗證系統行為」，但這個賭注成立的條件不是 token 成本，而是需求邊界、前端體驗、schema 變更治理與事故責任鏈必須被重新設計。

---

## AI 原生交付模型：從需求文字到可觀測系統

### 1. 方法論的主張：Agent 不是助手，是開發流程主體

第10組採用 agent-based view 來重建整個系統開發流程，而不是只把 AI 當成補程式碼工具。原始需求、訪談與小組討論先被整理成角色需求，再轉換成 backlog、待釐清問題與 feature 任務。

核心流程如下：

- **需求結構化**：將員工、商家、福委會三方需求拆開。
  - 員工：訂餐、修改、取消訂餐、領餐。
  - 商家：排菜、備餐、處理餐點交付。
  - 福委會：管理商家、廠區、權限、客訴、稽核與結算。
- **Greenfield harness**：團隊自行建立一套 harness，讓 AI 研究需求、整理 backlog、建立 repo knowledge，再逐一執行 feature。
- **隔離式開發**：每個 feature 以獨立 Git branch 進行，完成後經 review loop 整合。
- **第一版產出**：初始 codebase 約 30 小時生成完成，後續再透過測試、觀測與修正迭代。

這裡的重點不是「AI 會寫 code」，而是團隊試圖把需求工程、任務切分、程式生成、測試、review、部署觀測全部納入同一條 AI-driven pipeline。

### 2. 可觀測性迴圈：把 Agent 的黑箱輸出變成可驗證行為

Engineering Team 發現純粹讓 Agent 自測，會產生人類不容易理解的驗證方式，因此建立 **behaviors and observability improvement loop**：

- Agent 先設計問題情境。
- 系統透過 Grafana、logs、metrics、traces 觀察實際行為。
- Agent 根據觀測結果修正 code 與 configuration。
- 系統重新測試並回到觀測迴圈。

這個設計的戰略意義在於：驗證介面不交給 Agent 自說自話，而是接到人類工程團隊看得懂的 Grafana 與系統指標。這降低了 AI 生成系統的信任成本，也讓「行為是否正確」比「程式碼看起來合理」更重要。

---

## 產品架構：企業團膳不是 Uber Eats 複製品

### 1. 業務差異決定架構差異

第10組一開始用 Uber Eats 作為直覺參照，但很快指出企業團膳場景有本質不同：

- **不是即時外送**：餐點需要預先訂購。
- **有提前送單週期**：例如七天前送單的流程需求。
- **一餐可能跨多商家組合**：不是單一商家單筆外送。
- **集中送達取餐點**：不是每位員工獨立外送。
- **金流與結算不同**：牽涉企業自結、薪資批次、商家稽核與客訴處理。

因此，系統不是消費者外送平台的縮小版，而是企業內部履約、結算、稽核與權限治理平台。

### 2. 三前端分離：用角色邊界降低複雜度

Application Team 將系統拆成三個獨立前端：

- **員工端**：只處理選餐、訂餐、修改、取消與領餐。
- **商家端**：只處理菜單、備餐、交付與履約。
- **福委會管理端**：處理商家管理、廠區、權限、客訴、稽核、結算與治理。

三個前端均採 SvelteKit 與 Tailwind。後端則使用 Go，透過同一個 image 以不同 role 啟動不同服務。這讓開發上保留 monolithic 的一致性，部署上則能達到 role-level scaling。

### 3. QR Code 履約流：把每份餐點變成可追蹤事件

系統設計了 QR Code flow，從商家備餐、送達 pickup point，到員工領餐，都透過 QR Code 建立數位足跡。這個設計讓餐點履約不再只是一筆訂單狀態，而是一串可稽核的事件資料。

其後台價值包括：

- 商家可查看履約與備餐狀態。
- 福委會可追蹤客訴與異常。
- 稽核與薪資批次計算可依據實際履約紀錄。
- 每份餐點的流程狀態可被系統化查詢。

---

## 隱私與推薦策略：平台不持有使用者偏好，Agent 持有

第10組刻意沒有在平台內建立傳統推薦系統。其假設是：每位使用者未來應持有自己的個人 Agent，由該 Agent 管理素食偏好、特殊飲食需求、運動習慣、推薦邏輯等個人資訊。

這個設計的邏輯是：

- 平台只提供菜單、訂單、履約與交易流程。
- 使用者個人 Agent 存放偏好資料。
- 個人 Agent 讀取平台資訊後替使用者完成選餐與訂餐。
- 平台避免收集非必要個資，降低資料治理負擔。

這是一個明確的產品哲學選擇：推薦不必集中在平台，個人化可以外移到使用者端 Agent。好處是隱私負擔下降；風險是短期內依賴尚未成熟的個人 Agent 生態。

---

## 品質驗證與效能邊界：後端穩，前端脆

### 1. 四層測試結構

Testing Team 將驗證分成四層：

- **Unit Test**：驗證 domain rules。
- **Integration Test**：驗證 API 資料流。
- **End-to-End Test**：驗證員工、商家、福委會三方流程。
- **Manual Heuristic Evaluation**：人工檢查前端可用性與行為預期。

品質 gate 包含 SonarQube、SQL security scan、SQL injection guard、OpenAPI conversion，以及 CI/CD 中的 CVE 檢查與 code smell 檢查。

### 2. 壓測結果：物理現場可能比後端更先成為瓶頸

目前部署規模假設較小：50 名員工、10 個商家、150 個 menu items、19 個取餐地點。壓測則放大到：

- 10 萬名員工。
- 200 個商家。
- 200 個 pickup points。
- 約百萬級 backend API request。
- 每秒可處理約 571 人 request。

Presenter 的判斷是：在這個測試結果下，系統的主要限制可能不在 backend API，而在大量員工同時抵達取餐點時的物理排隊與現場流程。

### 3. 故障注入：用 Pod 刪除測恢復能力

Reliability Test 包含隨機刪除一個 Kubernetes pod，觀察系統是否能在三分鐘內回到 ready 狀態。驗證項目包括：

- 員工是否仍可瀏覽選單。
- 訂單是否仍可成功。
- quota conflict 是否如預期出現。
- Grafana 是否能看見 recovery 過程。

這裡建立的是基本 operational confidence，而不是完整災難復原能力。它證明系統能承受單一 pod 層級干擾，但尚未證明資料層、跨服務依賴或大規模故障下的韌性。

---

## 真正的缺口：前端語意、Schema 治理、事故責任鏈

### 1. 前端是 AI 生成系統的主要失真點

在問答中，團隊明確承認：Agent 過不去的地方大多在前端。後端問題相對少，前端則出現大量需要人工 regression testing 與 heuristic evaluation 的情境。

主要問題包括：

- 使用者預期行為不符。
- accessibility 檢查未達預期。
- 前端互動細節錯誤。
- 功能語意不清導致錯誤產物。
- Agent 可能生成不必要功能，例如將月結報表做給員工端觀看，最後反而需要刪功能。

這揭示一個關鍵事實：AI 對結構化後端與效能優化較有把握，但對模糊的人機互動、權限語意、使用者心智模型仍高度不穩。

### 2. Schema 快速變動是雙面刃

Jacob 補充說，database schema 在 optimization loop 中會隨 scenario、SLA、performance 要求不斷變動。團隊認為這些 schema 可能已不適合人逐一檢查，因為 Agent 會為了效能與需求自行調整。

這是一個高槓桿但高風險的設計：

- **正面**：Agent 可快速重構資料結構以滿足效能與功能。
- **負面**：schema 變更過於頻繁，實際部署後可能難以維持穩定 migration、資料相容性與審計可追溯性。
- **隱含需求**：未來需要對 schema 變更速度、治理規則與 migration policy 另立 requirement。

### 3. SRE 責任鏈仍不夠硬

問答中，當被問到監控發現問題時誰處理，Jacob 回答第一線會是 agent 的 SREs，若較麻煩再回到團隊處理。這暴露出目前事故責任鏈仍偏概念化。

現況看起來是：

- Grafana 與 observability 已存在。
- Agent SRE 被設定為第一線分類者。
- 複雜問題仍需人類團隊承接。
- 但升級條件、值班責任、事故分級、rollback 權限與 SLA owner 未被明確定義。

這是從 demo system 走向 production system 前必須補上的治理層。

---

## 成本現實：Token 成本可接受，治理成本才是主戰場

第10組統計整體 codebase 約 15 萬行，聲稱沒有任何 code 是成員自行撰寫。初版耗費約 3.6 billion tokens，包含後期改善、測試、reinforcement check、home environment 等總計約 10 billion tokens。若按 enterprise token 價格換算，約每小時 30 美金，年化約 260K 美金，並以一名 engineer 的成本作為比較基準；但實際使用的是 ChatGPT Pro 與 CodeMax 方案，因此展示的是 enterprise pricing 假設下的估算。

這個數字的戰略解讀很直接：AI 生成 code 的邊際成本已經低到可以支撐大型 prototype，但 production 成本不會主要卡在 token，而會卡在以下四件事：

- 需求是否足夠清晰。
- 前端體驗是否能被精準驗證。
- schema 與資料 migration 是否能被治理。
- 事故發生時誰有權決策、誰負責恢復、誰承擔後果。
