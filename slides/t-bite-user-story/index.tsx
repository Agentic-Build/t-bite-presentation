import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

import adminAudit from './assets/admin-audit.png';
import adminHome from './assets/admin-home.png';
import adminVendors from './assets/admin-vendors.png';
import dockerServices from './assets/docker-services.png';
import employeeHome from './assets/employee-home.png';
import employeeOrder from './assets/employee-order.png';
import loginAdmin from './assets/login-admin.png';
import loginEmployee from './assets/login-employee.png';
import loginMerchant from './assets/login-merchant.png';
import merchantCompliance from './assets/merchant-compliance.png';
import merchantHome from './assets/merchant-home.png';
import merchantMenus from './assets/merchant-menus.png';

export const design: DesignSystem = {
  palette: {
    bg: '#0b0f14',
    text: '#f5f7fb',
    accent: '#15b8a6',
  },
  fonts: {
    display: '"Inter", "Noto Sans TC", "PingFang TC", system-ui, sans-serif',
    body: '"Inter", "Noto Sans TC", "PingFang TC", system-ui, sans-serif',
  },
  typeScale: {
    hero: 132,
    body: 32,
  },
  radius: 8,
};

const palette = {
  bg: design.palette.bg,
  text: design.palette.text,
  accent: design.palette.accent,
  panel: '#111821',
  panel2: '#16202c',
  panel3: '#1d2a38',
  ink: '#f5f7fb',
  soft: '#c9d4e5',
  muted: '#8fa0b8',
  line: 'rgba(245,247,251,0.12)',
  lineStrong: 'rgba(245,247,251,0.26)',
  cyan: '#15b8a6',
  blue: '#5b9cff',
  amber: '#f4b740',
  green: '#55d187',
  coral: '#ff6b66',
  violet: '#b18cff',
  slate: '#65758d',
};

const font = {
  display: design.fonts.display,
  body: design.fonts.body,
  mono: '"SF Mono", "Cascadia Code", ui-monospace, Menlo, monospace',
};

const fill: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  boxSizing: 'border-box',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  letterSpacing: 0,
};

const grid: CSSProperties = {
  position: 'absolute',
  inset: 0,
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
  backgroundSize: '96px 96px',
  opacity: 0.55,
};

const diagonal: CSSProperties = {
  position: 'absolute',
  right: -260,
  top: 0,
  width: 860,
  height: 1080,
  transform: 'skewX(-14deg)',
  background: '#121b28',
  borderLeft: `1px solid ${palette.line}`,
};

const Header = ({ page, label }: { page: string; label: string }) => (
  <div
    style={{
      position: 'absolute',
      left: 88,
      right: 88,
      top: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontFamily: font.mono,
      fontSize: 18,
      color: palette.muted,
      textTransform: 'uppercase',
    }}
  >
    <span>T-Bite user story</span>
    <span>
      {page} / {label}
    </span>
  </div>
);

const Slide = ({
  page,
  label,
  children,
  pad = 88,
}: {
  page: string;
  label: string;
  children: ReactNode;
  pad?: number;
}) => (
  <section style={{ ...fill, padding: `${pad}px` }}>
    <div style={grid} />
    <Header page={page} label={label} />
    <div style={{ position: 'relative', zIndex: 1, height: '100%', paddingTop: 46 }}>{children}</div>
  </section>
);

const Kicker = ({ children, color = palette.cyan }: { children: ReactNode; color?: string }) => (
  <div
    style={{
      color,
      fontFamily: font.mono,
      fontSize: 22,
      fontWeight: 760,
      textTransform: 'uppercase',
      marginBottom: 18,
    }}
  >
    {children}
  </div>
);

const Title = ({ children, width = 1320, size = 72 }: { children: ReactNode; width?: number; size?: number }) => (
  <h1
    style={{
      margin: 0,
      maxWidth: width,
      fontFamily: font.display,
      fontSize: size,
      lineHeight: 1.04,
      fontWeight: 880,
      letterSpacing: 0,
    }}
  >
    {children}
  </h1>
);

const Lead = ({ children, width = 1180 }: { children: ReactNode; width?: number }) => (
  <p style={{ margin: '22px 0 0', maxWidth: width, color: palette.soft, fontSize: 31, lineHeight: 1.46 }}>
    {children}
  </p>
);

const Rule = ({ color = palette.cyan, width = 180 }: { color?: string; width?: number }) => (
  <div style={{ width, height: 7, background: color, borderRadius: 8, margin: '28px 0 0' }} />
);

const Card = ({
  title,
  body,
  color = palette.cyan,
  children,
  minHeight = 150,
}: {
  title: ReactNode;
  body?: ReactNode;
  color?: string;
  children?: ReactNode;
  minHeight?: number;
}) => (
  <div
    style={{
      minHeight,
      borderRadius: 8,
      background: palette.panel,
      border: `1px solid ${palette.line}`,
      boxSizing: 'border-box',
      padding: 26,
      boxShadow: '0 18px 44px rgba(0,0,0,0.22)',
    }}
  >
    <div style={{ width: 54, height: 6, borderRadius: 8, background: color, marginBottom: 18 }} />
    <div style={{ fontSize: 30, fontWeight: 820, lineHeight: 1.18 }}>{title}</div>
    {body ? <div style={{ marginTop: 12, color: palette.soft, fontSize: 24, lineHeight: 1.38 }}>{body}</div> : null}
    {children}
  </div>
);

const Label = ({ children, color = palette.cyan }: { children: ReactNode; color?: string }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      minHeight: 42,
      padding: '0 16px',
      borderRadius: 8,
      border: `1px solid ${color}88`,
      background: `${color}18`,
      color,
      fontSize: 20,
      fontWeight: 760,
      fontFamily: font.mono,
    }}
  >
    {children}
  </span>
);

const ImageFrame = ({
  src,
  title,
  caption,
  fit = 'cover',
  height = 360,
}: {
  src: string;
  title?: string;
  caption?: string;
  fit?: 'cover' | 'contain';
  height?: number;
}) => (
  <figure
    style={{
      margin: 0,
      borderRadius: 8,
      overflow: 'hidden',
      border: `1px solid ${palette.line}`,
      background: '#eef2f7',
      boxShadow: '0 26px 70px rgba(0,0,0,0.28)',
    }}
  >
    {title ? (
      <figcaption
        style={{
          height: 44,
          background: '#111827',
          color: palette.soft,
          display: 'flex',
          alignItems: 'center',
          padding: '0 18px',
          fontFamily: font.mono,
          fontSize: 16,
        }}
      >
        {title}
      </figcaption>
    ) : null}
    <img
      src={src}
      alt={title ?? caption ?? 'T-Bite screenshot'}
      style={{
        display: 'block',
        width: '100%',
        height,
        objectFit: fit,
        background: '#f5f7fb',
      }}
    />
    {caption ? (
      <figcaption
        style={{
          background: palette.panel2,
          color: palette.soft,
          fontSize: 18,
          lineHeight: 1.32,
          padding: '12px 16px',
        }}
      >
        {caption}
      </figcaption>
    ) : null}
  </figure>
);

const Quote = ({ speaker, children, color }: { speaker: string; children: ReactNode; color: string }) => (
  <div
    style={{
      borderLeft: `8px solid ${color}`,
      background: palette.panel,
      borderRadius: 8,
      padding: '22px 26px',
      fontSize: 30,
      lineHeight: 1.34,
      color: palette.ink,
    }}
  >
    <div style={{ fontFamily: font.mono, fontSize: 18, color, marginBottom: 10 }}>{speaker}</div>
    {children}
  </div>
);

const Row = ({ left, mid, right, color = palette.cyan }: { left: ReactNode; mid: ReactNode; right: ReactNode; color?: string }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '0.72fr 1.08fr 1.2fr',
      gap: 12,
      alignItems: 'stretch',
      marginBottom: 12,
    }}
  >
    <div style={{ borderRadius: 8, border: `1px solid ${palette.line}`, background: `${color}16`, padding: 18, fontSize: 23, fontWeight: 760, color }}>
      {left}
    </div>
    <div style={{ borderRadius: 8, border: `1px solid ${palette.line}`, background: palette.panel, padding: 18, fontSize: 23, lineHeight: 1.32, color: palette.soft }}>
      {mid}
    </div>
    <div style={{ borderRadius: 8, border: `1px solid ${palette.line}`, background: palette.panel, padding: 18, fontSize: 23, lineHeight: 1.32, color: palette.soft }}>
      {right}
    </div>
  </div>
);

const FlowStep = ({ no, title, body, color }: { no: string; title: string; body: ReactNode; color: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '82px 1fr', gap: 18, alignItems: 'start' }}>
    <div
      style={{
        width: 82,
        height: 82,
        borderRadius: 8,
        background: `${color}1f`,
        border: `1px solid ${color}aa`,
        color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: font.mono,
        fontSize: 28,
        fontWeight: 860,
      }}
    >
      {no}
    </div>
    <div style={{ minHeight: 106, borderRadius: 8, background: palette.panel, border: `1px solid ${palette.line}`, padding: 22 }}>
      <div style={{ fontSize: 28, fontWeight: 820 }}>{title}</div>
      <div style={{ marginTop: 8, color: palette.soft, fontSize: 23, lineHeight: 1.36 }}>{body}</div>
    </div>
  </div>
);

const Metric = ({ value, label, color }: { value: string; label: ReactNode; color: string }) => (
  <div
    style={{
      borderRadius: 8,
      background: palette.panel,
      border: `1px solid ${palette.line}`,
      padding: '28px 24px',
      minHeight: 150,
    }}
  >
    <div style={{ color, fontSize: 54, fontWeight: 880, lineHeight: 1 }}>{value}</div>
    <div style={{ marginTop: 14, color: palette.soft, fontSize: 23, lineHeight: 1.34 }}>{label}</div>
  </div>
);

const Checklist = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      borderRadius: 8,
      background: palette.panel,
      border: `1px solid ${palette.line}`,
      padding: 26,
      fontSize: 24,
      lineHeight: 1.5,
      color: palette.soft,
    }}
  >
    {children}
  </div>
);

const Cover: Page = () => (
  <section style={{ ...fill, padding: '96px 104px' }}>
    <div style={grid} />
    <div style={diagonal} />
    <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 64, height: '100%', alignItems: 'center' }}>
      <div>
        <Kicker>T-Bite · complete user story</Kicker>
        <h1
          style={{
            margin: 0,
            fontFamily: font.display,
            fontSize: 126,
            lineHeight: 0.96,
            fontWeight: 900,
            letterSpacing: 0,
          }}
        >
          從「網站能跑嗎」到可驗收流程
        </h1>
        <Lead width={830}>
          根據 5173 / 5174 / 5175 實際畫面、Authentik 登入脈絡、Docker 服務與 Chrome 測試結果，整理成一份完整 product user story。
        </Lead>
        <Rule color={palette.coral} width={280} />
        <div style={{ marginTop: 34, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Label color={palette.cyan}>Employee 5173</Label>
          <Label color={palette.blue}>Merchant 5174</Label>
          <Label color={palette.amber}>Admin 5175</Label>
          <Label color={palette.green}>Authentik SSO</Label>
        </div>
      </div>
      <div style={{ position: 'relative', height: 770 }}>
        <div style={{ position: 'absolute', left: 0, top: 20, width: 610 }}>
          <ImageFrame src={employeeHome} title="employee portal verified in Chrome" height={350} />
        </div>
        <div style={{ position: 'absolute', right: 0, top: 250, width: 610 }}>
          <ImageFrame src={merchantHome} title="merchant portal verified in Chrome" height={340} />
        </div>
        <div style={{ position: 'absolute', left: 80, bottom: 0, width: 620 }}>
          <ImageFrame src={adminHome} title="admin portal verified in Chrome" height={320} />
        </div>
      </div>
    </div>
  </section>
);

const Trigger: Page = () => (
  <Slide page="01" label="trigger">
    <Kicker color={palette.coral}>Origin signal</Kicker>
    <Title width={1320}>真正的需求不是「登入帳密是多少」，而是新成員能否自己把系統跑通</Title>
    <Lead width={1380}>
      這次測試從團隊對話開始：有人能把 `make dev` 跑起來，但不確定三個入口、Authentik 帳號、seeded identities 與文件在哪裡銜接。
    </Lead>
    <div style={{ marginTop: 52, display: 'grid', gridTemplateColumns: '1.06fr 0.94fr', gap: 34 }}>
      <div style={{ display: 'grid', gap: 20 }}>
        <Quote speaker="Takala" color={palette.cyan}>跑看看網站能不能跑起來，還需要加入什麼功能</Quote>
        <Quote speaker="Teammate" color={palette.amber}>登入的帳密是下面那兩組嗎？但我登不進去，還是有寫在哪個文件？</Quote>
        <Quote speaker="Takala" color={palette.green}>你要先去 authentik 創建你的帳號</Quote>
      </div>
      <div style={{ display: 'grid', gap: 18 }}>
        <ImageFrame src={loginEmployee} title="employee login surface" height={204} fit="contain" />
        <ImageFrame src={loginMerchant} title="merchant login surface" height={204} fit="contain" />
        <ImageFrame src={loginAdmin} title="admin login surface" height={204} fit="contain" />
      </div>
    </div>
  </Slide>
);

const SystemSnapshot: Page = () => (
  <Slide page="02" label="system snapshot">
    <Kicker>What is running locally</Kicker>
    <Title width={1240}>這是一個三入口、SSO 驅動、以營運資料為核心的企業訂餐系統</Title>
    <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '0.92fr 1.08fr', gap: 38, alignItems: 'start' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <Card title="Employee" body="員工訂餐、購物車、訂單與取餐" color={palette.cyan} />
        <Card title="Merchant" body="商家菜單、訂單、合規與對帳" color={palette.blue} />
        <Card title="Admin" body="廠商、扣款、異常、稽核與 DLQ" color={palette.amber} />
        <Card title="Core services" body="Postgres, Redis, NATS, MinIO, Authentik" color={palette.green} />
        <div style={{ gridColumn: '1 / span 2' }}>
          <Checklist>
            <div><b>Ports:</b> 5173 employee, 5174 merchant, 5175 admin, 8080 API, 9002 Authentik, 9001 MinIO.</div>
            <div><b>Dev command:</b> `make dev` brings up host processes while Docker dependencies stay running.</div>
          </Checklist>
        </div>
      </div>
      <ImageFrame src={dockerServices} title="local Docker dependency stack" height={600} fit="contain" />
    </div>
  </Slide>
);

const PersonaMap: Page = () => (
  <Slide page="03" label="personas">
    <Kicker>Personas</Kicker>
    <Title>四個角色各自有不同的成功定義</Title>
    <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22 }}>
      <Card title="員工 Employee" color={palette.cyan} minHeight={560}>
        <div style={{ marginTop: 18, color: palette.soft, fontSize: 24, lineHeight: 1.46 }}>
          想在截止前快速知道今天有哪些餐點、價格、供應狀態，並用公司 SSO 安全下訂。
        </div>
        <div style={{ marginTop: 26 }}>
          <Label color={palette.cyan}>Success</Label>
        </div>
        <div style={{ marginTop: 14, color: palette.muted, fontSize: 22, lineHeight: 1.42 }}>
          不問任何人就能完成下訂、查單與取餐。
        </div>
      </Card>
      <Card title="商家 Merchant" color={palette.blue} minHeight={560}>
        <div style={{ marginTop: 18, color: palette.soft, fontSize: 24, lineHeight: 1.46 }}>
          需要維護每日菜單、供應上限、接單狀態、合規資料與收款對帳。
        </div>
        <div style={{ marginTop: 26 }}>
          <Label color={palette.blue}>Success</Label>
        </div>
        <div style={{ marginTop: 14, color: palette.muted, fontSize: 22, lineHeight: 1.42 }}>
          午餐尖峰前可以準確備餐，不靠聊天訊息彙整。
        </div>
      </Card>
      <Card title="營運 Admin" color={palette.amber} minHeight={560}>
        <div style={{ marginTop: 18, color: palette.soft, fontSize: 24, lineHeight: 1.46 }}>
          管理供應商、薪資扣款、投訴、異常訂單、稽核事件與資料管線。
        </div>
        <div style={{ marginTop: 26 }}>
          <Label color={palette.amber}>Success</Label>
        </div>
        <div style={{ marginTop: 14, color: palette.muted, fontSize: 22, lineHeight: 1.42 }}>
          每筆訂單、爭議與對帳都能回到同一份事實。
        </div>
      </Card>
      <Card title="開發 / Demo Owner" color={palette.green} minHeight={560}>
        <div style={{ marginTop: 18, color: palette.soft, fontSize: 24, lineHeight: 1.46 }}>
          要讓同學、助教或新成員照 README 跑起環境，登入三入口並完成指定 demo path。
        </div>
        <div style={{ marginTop: 26 }}>
          <Label color={palette.green}>Success</Label>
        </div>
        <div style={{ marginTop: 14, color: palette.muted, fontSize: 22, lineHeight: 1.42 }}>
          Auth、seed、local ports 與測試結果都可被快速驗證。
        </div>
      </Card>
    </div>
  </Slide>
);

const NorthStar: Page = () => (
  <Slide page="04" label="north star">
    <Kicker color={palette.green}>Product promise</Kicker>
    <Title width={1420}>T-Bite 的 user story 主軸：把企業午餐從聊天協調變成可驗收的 workflow</Title>
    <Lead width={1360}>
      不是單純「便當電商」。它的價值在於三方共同操作同一條狀態鏈：誰可訂、誰供應、誰取餐、誰負責異常、誰做對帳。
    </Lead>
    <div style={{ marginTop: 58, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 22 }}>
      <Metric value="1" label="共同身份來源：Authentik SSO 對應不同角色與 claims。" color={palette.green} />
      <Metric value="3" label="三個入口各自面向 employee、merchant、admin，不混用權責。" color={palette.cyan} />
      <Metric value="6+" label="可驗收工作流：登入、菜單、下訂、商家處理、取餐、對帳與稽核。" color={palette.amber} />
    </div>
    <div style={{ marginTop: 44 }}>
      <Checklist>
        <b>核心敘事：</b> 當一個企業有大量員工、固定取餐時間、外部餐飲供應商與內部扣款流程時，訂餐系統必須同時處理便利性、供應穩定性、權限與資料可追溯性。
      </Checklist>
    </div>
  </Slide>
);

const EmployeeStory: Page = () => (
  <Slide page="05" label="employee story">
    <Kicker color={palette.cyan}>User story · employee</Kicker>
    <Title width={1280}>作為員工，我想用公司 SSO 快速訂餐，並清楚知道我的訂單與取餐狀態</Title>
    <div style={{ marginTop: 42, display: 'grid', gridTemplateColumns: '0.96fr 1.04fr', gap: 34, alignItems: 'start' }}>
      <div style={{ display: 'grid', gap: 16 }}>
        <FlowStep no="01" title="登入" color={palette.cyan} body="點擊「使用 Authentik 登入」，使用 seeded employee 或公司帳號完成 SSO。" />
        <FlowStep no="02" title="選餐" color={palette.cyan} body="看到可訂日期、商家、餐點、價格、供應量與截止時間。" />
        <FlowStep no="03" title="下訂" color={palette.cyan} body="加入購物車、確認數量與金額，送出後建立可查詢訂單。" />
        <FlowStep no="04" title="取餐" color={palette.cyan} body="從訂單 detail 取得 pickup 資訊，保留取餐或異常紀錄。" />
      </div>
      <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 18 }}>
        <ImageFrame src={employeeHome} title="employee home · menu and order entry" height={322} />
        <ImageFrame src={employeeOrder} title="employee order detail · pickup path" height={300} />
      </div>
    </div>
  </Slide>
);

const EmployeeAcceptance: Page = () => (
  <Slide page="06" label="employee acceptance">
    <Kicker color={palette.cyan}>Acceptance criteria · employee</Kicker>
    <Title width={1350}>員工端驗收：不用理解後台，也能完成一筆午餐訂單</Title>
    <div style={{ marginTop: 44 }}>
      <Row
        color={palette.cyan}
        left="Given"
        mid="我是一位已被 seed 或已由 Authentik 建立的員工"
        right="我的 token 需要包含 employee role 與必要 employee attributes"
      />
      <Row
        color={palette.cyan}
        left="When"
        mid="我進入 5173、完成 SSO、選擇日期與餐點"
        right="系統顯示可訂餐點、金額、供應狀態與 cart drawer"
      />
      <Row
        color={palette.cyan}
        left="Then"
        mid="我送出訂單後看到訂單 detail"
        right="訂單狀態、取餐資訊與後續 pickup route 可以被追蹤"
      />
    </div>
    <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
      <Card title="Pass evidence" body="Chrome 實際跑完 employee login、下訂、order detail、pickup redirect。" color={palette.green} />
      <Card title="Seeded login" body="local README 與 seed blueprint 記錄 employee demo identity；公開簡報不放可用密碼。" color={palette.cyan} />
      <Card title="Potential miss" body="若改用自建帳號，README 必須說明 role group 與 employee claims。" color={palette.amber} />
    </div>
  </Slide>
);

const MerchantStory: Page = () => (
  <Slide page="07" label="merchant story">
    <Kicker color={palette.blue}>User story · merchant</Kicker>
    <Title width={1320}>作為商家，我想在午餐尖峰前掌握菜單、訂單與合規狀態，避免超賣與漏接</Title>
    <div style={{ marginTop: 42, display: 'grid', gridTemplateColumns: '1.04fr 0.96fr', gap: 34, alignItems: 'start' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <ImageFrame src={merchantHome} title="merchant dashboard · fulfillment overview" height={310} />
        <ImageFrame src={merchantMenus} title="merchant menus · item and availability" height={310} />
        <ImageFrame src={merchantCompliance} title="merchant compliance · required evidence" height={310} />
        <Card title="Verified surfaces" color={palette.blue} minHeight={310}>
          <div style={{ marginTop: 12, color: palette.soft, fontSize: 23, lineHeight: 1.46 }}>
            Chrome 可載入 merchant home、orders、menus、new menu、compliance、complaints、reconciliation。
          </div>
        </Card>
      </div>
      <div style={{ display: 'grid', gap: 16 }}>
        <FlowStep no="01" title="維護菜單" color={palette.blue} body="設定餐點、價格、服務日期、供應上限與餐點可見狀態。" />
        <FlowStep no="02" title="查看訂單" color={palette.blue} body="依日期與狀態查看已成立訂單，作為備餐與配送依據。" />
        <FlowStep no="03" title="處理合規" color={palette.blue} body="上傳或維護平台要求的合規資料，降低營運風險。" />
        <FlowStep no="04" title="對帳" color={palette.blue} body="用訂單與履約資料支撐 reconciliation，而不是手動核對聊天紀錄。" />
      </div>
    </div>
  </Slide>
);

const MerchantAcceptance: Page = () => (
  <Slide page="08" label="merchant acceptance">
    <Kicker color={palette.blue}>Acceptance criteria · merchant</Kicker>
    <Title width={1360}>商家端驗收：菜單、履約與對帳資訊需要在同一個 portal 成形</Title>
    <div style={{ marginTop: 44 }}>
      <Row
        color={palette.blue}
        left="Given"
        mid="我是已被核准的商家使用者"
        right="我的 Authentik 帳號需要對應 merchant role 與 vendor identity"
      />
      <Row
        color={palette.blue}
        left="When"
        mid="我進入 5174 並查看菜單、訂單、合規、對帳頁面"
        right="每個頁面都能顯示與該商家有關的資料，不暴露其他商家資料"
      />
      <Row
        color={palette.blue}
        left="Then"
        mid="我能在 cutoff 前掌握備餐數量"
        right="平台保留足夠資料讓 admin 後續檢查履約、投訴與結算"
      />
    </div>
    <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
      <Card title="Current verification" body="UI surface 可載入；因 Chrome extension 阻擋 localhost:8080，OAuth callback 未在 Chrome profile 完整走完。" color={palette.green} />
      <Card title="Demo support" body="可用 dev DB / Redis session 先驗證 merchant 功能頁面與視覺狀態。" color={palette.blue} />
      <Card title="Next validation" body="補 merchant seeded order fixture，讓接單、出餐與對帳能用同一筆訂單串起。" color={palette.amber} />
    </div>
  </Slide>
);

const AdminStory: Page = () => (
  <Slide page="09" label="admin story">
    <Kicker color={palette.amber}>User story · admin</Kicker>
    <Title width={1360}>作為營運管理者，我想把廠商、扣款、異常與稽核收斂到可查證的後台</Title>
    <div style={{ marginTop: 42, display: 'grid', gridTemplateColumns: '0.96fr 1.04fr', gap: 34, alignItems: 'start' }}>
      <div style={{ display: 'grid', gap: 16 }}>
        <FlowStep no="01" title="管理供應商" color={palette.amber} body="查看 vendor 列表、狀態與服務能力，支援後續審核與上下架。" />
        <FlowStep no="02" title="處理扣款與結算" color={palette.amber} body="整合訂單、取餐與 payroll deduction，避免人工 spreadsheet 分歧。" />
        <FlowStep no="03" title="追蹤異常" color={palette.amber} body="投訴、anomaly、DLQ 與 audit log 對應具體事件與操作者。" />
        <FlowStep no="04" title="保留稽核證據" color={palette.amber} body="讓爭議處理從口頭描述回到系統紀錄。" />
      </div>
      <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 18 }}>
        <ImageFrame src={adminHome} title="admin dashboard · operations overview" height={310} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          <ImageFrame src={adminVendors} title="vendors" height={270} />
          <ImageFrame src={adminAudit} title="audit log" height={270} />
        </div>
      </div>
    </div>
  </Slide>
);

const AdminAcceptance: Page = () => (
  <Slide page="10" label="admin acceptance">
    <Kicker color={palette.amber}>Acceptance criteria · admin</Kicker>
    <Title width={1420}>Admin 驗收：不只看得到資料，還要能回答「誰在何時做了什麼」</Title>
    <div style={{ marginTop: 44 }}>
      <Row
        color={palette.amber}
        left="Given"
        mid="我是 admin role 使用者"
        right="我可以進入 5175 並查看供應商、payroll、settlement、complaints、anomalies、audit、DLQ"
      />
      <Row
        color={palette.amber}
        left="When"
        mid="我查看某個營運事件"
        right="事件要能追溯到訂單、商家、員工、時間、狀態與來源"
      />
      <Row
        color={palette.amber}
        left="Then"
        mid="我能做出營運判斷"
        right="例如是否需要處理投訴、補償、扣款修正、商家下架或資料管線重送"
      />
    </div>
    <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
      <Card title="Vendors" body="供應商狀態與管理入口。" color={palette.amber} />
      <Card title="Payroll" body="扣款資料與批次視角。" color={palette.green} />
      <Card title="Audit" body="操作與事件可追溯。" color={palette.violet} />
      <Card title="DLQ" body="非同步或資料處理錯誤需要可見。" color={palette.coral} />
    </div>
  </Slide>
);

const AuthStory: Page = () => (
  <Slide page="11" label="auth and onboarding">
    <Kicker color={palette.green}>Developer story · auth onboarding</Kicker>
    <Title width={1460}>作為新成員，我需要知道「能不能用 seeded 帳號」與「自建帳號要有哪些 claims」</Title>
    <Lead width={1380}>
      本次最大的產品摩擦不是某個按鈕壞掉，而是 Authentik、本機 mount path、seed blueprint 與 README 之間沒有形成一條清楚的新手路徑。
    </Lead>
    <div style={{ marginTop: 46, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
      <Card title="Seeded employee" body="employee demo identity 用於 e2e 與 demo path；帳密留在 local README / blueprint。" color={palette.cyan} />
      <Card title="Authentik admin" body="Authentik admin identity 可用來建立或檢查帳號；公開簡報只描述用途，不公開密碼。" color={palette.green} />
      <Card title="Required claims" body="若自建員工帳號，要補 role group、employee id、plant、department。" color={palette.amber} />
    </div>
    <div style={{ marginTop: 34, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
      <Checklist>
        <b>已修正的 auth blocker：</b> Seed blueprint 加入 `signing_key`，OIDC discovery 已顯示 `id_token_signing_alg_values_supported: ["RS256"]`，避免 callback 500。
      </Checklist>
      <Checklist>
        <b>仍需產品化的 onboarding：</b> 文件要明確說明「用 seeded 帳號」與「自建 Authentik 帳號」兩條路徑，並加入一鍵 health check。
      </Checklist>
    </div>
  </Slide>
);

const QAResult: Page = () => (
  <Slide page="12" label="qa evidence">
    <Kicker color={palette.green}>Observed QA result</Kicker>
    <Title width={1320}>目前 demo 主路徑可跑，但登入與瀏覽器環境要被文件化</Title>
    <div style={{ marginTop: 46, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
      <Metric value="6 / 2" label="完整 e2e 結果：6 passed, 2 skipped。" color={palette.green} />
      <Metric value="PASS" label="`make test-web` 在 `/private/tmp/corporate-catering-system` 通過。" color={palette.green} />
      <Metric value="RS256" label="Authentik discovery 現在支援 RS256 id token signing。" color={palette.cyan} />
      <Metric value="1" label="Chrome profile 仍有 `ERR_BLOCKED_BY_CLIENT` 影響 8080 OAuth callback。" color={palette.amber} />
    </div>
    <div style={{ marginTop: 42 }}>
      <Row color={palette.green} left="Employee" mid="Chrome 實際登入並完成 menu → cart → order detail → pickup route" right="可作為 demo 最穩主線" />
      <Row color={palette.blue} left="Merchant" mid="頁面 surface 可載入：home、orders、menus、new、compliance、complaints、reconciliation" right="仍需用正常 OAuth session 驗證完整登入閉環" />
      <Row color={palette.amber} left="Admin" mid="頁面 surface 可載入：home、vendors、payroll、settlements、complaints、anomalies、audit、DLQ" right="下一步補 admin 操作型 acceptance tests" />
    </div>
  </Slide>
);

const GapsBacklog: Page = () => (
  <Slide page="13" label="backlog">
    <Kicker color={palette.coral}>Gaps and requested features</Kicker>
    <Title width={1360}>根據實測，最值得補的不是新頁面，而是讓系統更容易被正確使用</Title>
    <div style={{ marginTop: 50, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
      <Card title="Must" color={palette.coral} minHeight={500}>
        <ul style={{ margin: '20px 0 0', paddingLeft: 26, color: palette.soft, fontSize: 23, lineHeight: 1.48 }}>
          <li>README 登入章節：三個入口、seeded 帳號、Authentik admin。</li>
          <li>Dev-only login hint：localhost 顯示可用測試帳號與自建帳號需求。</li>
          <li>`/auth/start` 連結避免 client-side navigation 造成 SvelteKit 404。</li>
          <li>Auth health check：確認 discovery RS256、blueprint、seed user。</li>
        </ul>
      </Card>
      <Card title="Should" color={palette.amber} minHeight={500}>
        <ul style={{ margin: '20px 0 0', paddingLeft: 26, color: palette.soft, fontSize: 23, lineHeight: 1.48 }}>
          <li>Merchant demo fixture：固定訂單讓備餐、履約、對帳能串起。</li>
          <li>Admin 操作型測試：投訴、異常、audit event、DLQ replay。</li>
          <li>Account creation guide：不同角色所需 group 與 attributes。</li>
          <li>Browser troubleshooting：Chrome blocker / extension / API allowlist。</li>
        </ul>
      </Card>
      <Card title="Could" color={palette.green} minHeight={500}>
        <ul style={{ margin: '20px 0 0', paddingLeft: 26, color: palette.soft, fontSize: 23, lineHeight: 1.48 }}>
          <li>Demo command `make demo-reset` 建立一致資料狀態。</li>
          <li>角色切換觀測頁：看目前 token claims 與 portal mapping。</li>
          <li>營運 KPI：訂單量、準時取餐率、異常率、對帳差異。</li>
          <li>自助 vendor onboarding 表單與審核 queue。</li>
        </ul>
      </Card>
    </div>
  </Slide>
);

const FullJourney: Page = () => (
  <Slide page="14" label="end-to-end story">
    <Kicker>End-to-end story</Kicker>
    <Title width={1450}>完整 user story：一筆午餐訂單如何穿過三個入口</Title>
    <div style={{ marginTop: 42, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
      <FlowStep no="01" title="員工看到菜單" color={palette.cyan} body="Employee portal 根據日期、商家、供應量與 cutoff 顯示可訂餐點。" />
      <FlowStep no="02" title="員工完成下訂" color={palette.cyan} body="Cart 送出後建立 order，後續可在 detail 頁查看狀態與取餐資訊。" />
      <FlowStep no="03" title="商家收到彙整" color={palette.blue} body="Merchant portal 以訂單與餐點彙整支援備餐，不需要手動收訊息。" />
      <FlowStep no="04" title="配送與取餐發生" color={palette.green} body="Pickup 記錄讓是否取餐、何時取餐、誰處理過變成可追蹤資料。" />
      <FlowStep no="05" title="Admin 檢查異常" color={palette.amber} body="投訴、未送達、anomaly 與 audit log 對應同一筆訂單事實。" />
      <FlowStep no="06" title="月結與扣款" color={palette.violet} body="Settlement 與 payroll deduction 使用相同訂單基礎，降低人工作業差異。" />
    </div>
  </Slide>
);

const Roadmap: Page = () => (
  <Slide page="15" label="roadmap">
    <Kicker color={palette.violet}>Implementation roadmap</Kicker>
    <Title width={1350}>下一步以「demo 可重現」與「新成員可登入」為優先</Title>
    <div style={{ marginTop: 52, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
      <Card title="Now · 1 sprint" color={palette.coral} minHeight={500}>
        <ul style={{ margin: '20px 0 0', paddingLeft: 26, color: palette.soft, fontSize: 24, lineHeight: 1.5 }}>
          <li>README 補齊登入與帳號建立。</li>
          <li>修 `/auth/start` client navigation 404。</li>
          <li>新增 auth status check script。</li>
          <li>建立 demo reset seed。</li>
        </ul>
      </Card>
      <Card title="Next · 2-3 sprints" color={palette.amber} minHeight={500}>
        <ul style={{ margin: '20px 0 0', paddingLeft: 26, color: palette.soft, fontSize: 24, lineHeight: 1.5 }}>
          <li>Merchant / Admin 操作型 e2e。</li>
          <li>完整 pickup verification flow。</li>
          <li>投訴與 anomaly 的閉環處理。</li>
          <li>Settlement report 匯出。</li>
        </ul>
      </Card>
      <Card title="Later · product polish" color={palette.green} minHeight={500}>
        <ul style={{ margin: '20px 0 0', paddingLeft: 26, color: palette.soft, fontSize: 24, lineHeight: 1.5 }}>
          <li>Vendor onboarding workflow。</li>
          <li>營運 KPI dashboard。</li>
          <li>Role claim inspector。</li>
          <li>環境診斷與 demo playbook。</li>
        </ul>
      </Card>
    </div>
  </Slide>
);

const OpenQuestions: Page = () => (
  <Slide page="16" label="open questions">
    <Kicker color={palette.amber}>Decisions to make</Kicker>
    <Title width={1320}>在補功能前，先定義帳號、資料與 demo 的責任邊界</Title>
    <div style={{ marginTop: 54, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
      <Card title="帳號建立是誰負責？" body="正式情境中，員工應由公司 IdP 同步；dev 情境則需要 seeded identities 與清楚文件。" color={palette.green} />
      <Card title="商家資料誰核准？" body="Vendor onboarding 若要做成產品功能，需要 admin approval、compliance files 與狀態流。" color={palette.blue} />
      <Card title="取餐證據到什麼程度？" body="QR code、員工 ID、時間戳、取餐點與人工 override 要如何平衡便利與稽核。" color={palette.cyan} />
      <Card title="demo 資料如何重置？" body="每次 demo 前都要能回到同一組訂單、菜單、商家與帳號，避免手動修 DB。" color={palette.coral} />
      <Card title="Chrome blocker 怎麼處理？" body="需要記錄 extension 阻擋 localhost:8080 的排查方式，或使用不受干擾的測試 profile。" color={palette.amber} />
      <Card title="系統成功指標是什麼？" body="不只測試通過，也要衡量下訂成功率、午餐前備餐準確率、異常處理時間與對帳差異。" color={palette.violet} />
    </div>
  </Slide>
);

const Closing: Page = () => (
  <section style={{ ...fill, padding: '112px 120px' }}>
    <div style={grid} />
    <div style={diagonal} />
    <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'grid', gridTemplateColumns: '1fr 0.88fr', gap: 60, alignItems: 'center' }}>
      <div>
        <Kicker color={palette.green}>Conclusion</Kicker>
        <h2
          style={{
            margin: 0,
            fontFamily: font.display,
            fontSize: 92,
            lineHeight: 1.04,
            fontWeight: 900,
            letterSpacing: 0,
            maxWidth: 1040,
          }}
        >
          T-Bite 已經不是「看得到登入頁」；它已經有可被驗收的多角色營運故事。
        </h2>
        <Lead width={980}>
          下一個最有價值的改進，是把 Authentik onboarding、demo seed、三入口驗收與操作型測試整理成任何新成員都能重現的路徑。
        </Lead>
      </div>
      <div style={{ display: 'grid', gap: 18 }}>
        <ImageFrame src={employeeHome} title="employee" height={210} />
        <ImageFrame src={merchantHome} title="merchant" height={210} />
        <ImageFrame src={adminHome} title="admin" height={210} />
      </div>
    </div>
  </section>
);

export const meta: SlideMeta = {
  title: 'T-Bite User Story',
};

export default [
  Cover,
  Trigger,
  SystemSnapshot,
  PersonaMap,
  NorthStar,
  EmployeeStory,
  EmployeeAcceptance,
  MerchantStory,
  MerchantAcceptance,
  AdminStory,
  AdminAcceptance,
  AuthStory,
  QAResult,
  GapsBacklog,
  FullJourney,
  Roadmap,
  OpenQuestions,
  Closing,
] satisfies Page[];
