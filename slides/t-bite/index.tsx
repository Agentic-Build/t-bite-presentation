import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

export const design: DesignSystem = {
  palette: {
    bg: '#f8fafc',
    text: '#0f172a',
    accent: '#dc2626',
  },
  fonts: {
    display: '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", system-ui, sans-serif',
    body: '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", system-ui, sans-serif',
  },
  typeScale: {
    hero: 116,
    body: 34,
  },
  radius: 18,
};

const palette = {
  bg: design.palette.bg,
  text: design.palette.text,
  accent: design.palette.accent,
  navy: '#0f172a',
  surface: '#ffffff',
  surface2: '#f1f5f9',
  surface3: '#fee2e2',
  line: '#e2e8f0',
  lineStrong: '#cbd5e1',
  muted: '#64748b',
  soft: '#334155',
  cyan: '#dc2626',
  blue: '#0ea5e9',
  amber: '#fbbf24',
  rose: '#e11d48',
  green: '#10b981',
  purple: '#8b5cf6',
  admin: '#f59e0b',
  employee: '#dc2626',
  vendor: '#0ea5e9',
};

const font = {
  body: design.fonts.body,
  display: design.fonts.display,
  mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
};

const fill: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  boxSizing: 'border-box',
  overflow: 'hidden',
};

const gridBg: CSSProperties = {
  position: 'absolute',
  inset: 0,
  backgroundImage:
    'linear-gradient(rgba(226,232,240,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(226,232,240,0.7) 1px, transparent 1px)',
  backgroundSize: '96px 96px',
  opacity: 0.28,
};

const glow: CSSProperties = {
  position: 'absolute',
  width: 680,
  height: 680,
  borderRadius: 999,
  background: 'transparent',
  right: -210,
  top: -180,
};

const PageShell = ({ children, label }: { children: ReactNode; label?: string }) => (
  <section style={{ ...fill, padding: 112 }}>
    <div style={gridBg} />
    <div style={glow} />
    <div
      style={{
        position: 'absolute',
        left: 112,
        right: 112,
        top: 54,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: palette.muted,
        fontSize: 20,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        fontFamily: font.mono,
      }}
    >
      <span>T-Bite · Corporate Catering</span>
      <span>{label ?? 'Corporate Catering System'}</span>
    </div>
    <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
  </section>
);

const Eyebrow = ({ children, color = palette.cyan }: { children: ReactNode; color?: string }) => (
  <div
    style={{
      color,
      fontSize: 24,
      fontWeight: 800,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      marginBottom: 24,
    }}
  >
    {children}
  </div>
);

const Title = ({ children, width = 1320 }: { children: ReactNode; width?: number }) => (
  <h1
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: 76,
      lineHeight: 1.06,
      fontWeight: 860,
      letterSpacing: 0,
      margin: 0,
      maxWidth: width,
    }}
  >
    {children}
  </h1>
);

const Lead = ({ children, width = 1180 }: { children: ReactNode; width?: number }) => (
  <p
    style={{
      margin: '28px 0 0',
      maxWidth: width,
      color: palette.soft,
      fontSize: 34,
      lineHeight: 1.48,
      letterSpacing: 0,
    }}
  >
    {children}
  </p>
);

const Card = ({
  title,
  body,
  color = palette.cyan,
  children,
}: {
  title: ReactNode;
  body?: ReactNode;
  color?: string;
  children?: ReactNode;
}) => (
  <div
    style={{
      background: '#ffffff',
      border: `1px solid ${palette.line}`,
      borderRadius: 'var(--osd-radius)',
      padding: 34,
      boxShadow: '0 1px 2px 0 rgb(15 23 42 / 0.06)',
      minHeight: 158,
    }}
  >
    <div style={{ width: 58, height: 6, borderRadius: 999, background: color, marginBottom: 22 }} />
    <div style={{ fontSize: 34, fontWeight: 780, lineHeight: 1.22 }}>{title}</div>
    {body ? <div style={{ marginTop: 14, color: palette.muted, fontSize: 27, lineHeight: 1.42 }}>{body}</div> : null}
    {children}
  </div>
);

const Pill = ({ children, color = palette.cyan }: { children: ReactNode; color?: string }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      border: `1px solid ${color}88`,
      background: `${color}16`,
      color,
      borderRadius: 999,
      padding: '12px 20px',
      fontSize: 23,
      fontWeight: 800,
      letterSpacing: 0,
    }}
  >
    {children}
  </span>
);

const FlowStep = ({ no, title, note, color }: { no: string; title: string; note: string; color: string }) => (
  <div style={{ display: 'flex', alignItems: 'stretch', gap: 20 }}>
    <div
      style={{
        width: 82,
        height: 82,
        borderRadius: 22,
        background: `${color}22`,
        border: `1px solid ${color}aa`,
        color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: font.mono,
        fontSize: 30,
        fontWeight: 820,
        flex: '0 0 auto',
      }}
    >
      {no}
    </div>
    <div
      style={{
        flex: 1,
        borderRadius: 26,
        background: '#ffffff',
        border: `1px solid ${palette.line}`,
        padding: '22px 26px',
      }}
    >
      <div style={{ fontSize: 31, fontWeight: 800 }}>{title}</div>
      <div style={{ marginTop: 8, color: palette.muted, fontSize: 24, lineHeight: 1.36 }}>{note}</div>
    </div>
  </div>
);

const MiniCell = ({ children, tone = palette.surface2, color = palette.text }: { children: ReactNode; tone?: string; color?: string }) => (
  <div
    style={{
      background: tone,
      color,
      border: `1px solid ${palette.line}`,
      borderRadius: 18,
      padding: '22px 24px',
      fontSize: 25,
      lineHeight: 1.35,
      minHeight: 88,
      display: 'flex',
      alignItems: 'center',
    }}
  >
    {children}
  </div>
);

const ArchBox = ({ title, note, x, y, w, color }: { title: string; note: string; x: number; y: number; w: number; color: string }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      minHeight: 128,
      borderRadius: 28,
      background: '#ffffff',
      border: `1px solid ${color}88`,
      padding: 26,
      boxSizing: 'border-box',
    }}
  >
    <div style={{ color, fontSize: 28, fontWeight: 820 }}>{title}</div>
    <div style={{ color: palette.muted, fontSize: 22, lineHeight: 1.35, marginTop: 10 }}>{note}</div>
  </div>
);

const Arrow = ({ x, y, w, label }: { x: number; y: number; w: number; label?: string }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: w, height: 34 }}>
    <div style={{ position: 'absolute', left: 0, right: 22, top: 16, borderTop: `2px solid ${palette.lineStrong}` }} />
    <div
      style={{
        position: 'absolute',
        right: 0,
        top: 7,
        width: 0,
        height: 0,
        borderTop: '10px solid transparent',
        borderBottom: '10px solid transparent',
        borderLeft: `18px solid ${palette.lineStrong}`,
      }}
    />
    {label ? (
      <div style={{ position: 'absolute', left: 16, top: -24, color: palette.muted, fontSize: 18, fontFamily: font.mono }}>{label}</div>
    ) : null}
  </div>
);

const CloudWord = ({ children, color, size, x, y, rotate = 0 }: { children: ReactNode; color: string; size: number; x: number; y: number; rotate?: number }) => (
  <span
    style={{
      position: 'absolute',
      left: x,
      top: y,
      color,
      fontSize: size,
      fontWeight: 820,
      lineHeight: 1,
      transform: `rotate(${rotate}deg)`,
      textShadow: `0 0 34px ${color}33`,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </span>
);

const Cover: Page = () => (
  <section style={{ ...fill, padding: '120px 132px' }}>
    <div style={gridBg} />
    <div style={{ ...glow, width: 850, height: 850, right: -240, top: -240 }} />
    <div style={{ position: 'absolute', left: 132, bottom: 120, width: 1160, height: 2, background: `linear-gradient(90deg, ${palette.cyan}, rgba(49,214,200,0))` }} />
    <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Eyebrow>Cloud-native Software Engineering · Final Project</Eyebrow>
      <h1
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 'var(--osd-size-hero)',
          lineHeight: 0.92,
          letterSpacing: 0,
          margin: 0,
          fontWeight: 900,
        }}
      >
        T-Bite
      </h1>
      <div style={{ marginTop: 38, fontSize: 48, color: palette.soft, fontWeight: 620 }}>Enterprise Corporate Catering System</div>
      <div style={{ marginTop: 54, display: 'flex', gap: 18 }}>
        <Pill>TSMC 情境</Pill>
        <Pill color={palette.blue}>多角色訂餐流程</Pill>
        <Pill color={palette.amber}>10–12 分鐘專題簡報</Pill>
      </div>
    </div>
    <div
      style={{
        position: 'absolute',
        right: 260,
        bottom: 132,
        width: 380,
        borderRadius: 'var(--osd-radius)',
        border: `1px solid ${palette.line}`,
        background: '#ffffff',
        padding: 30,
        boxShadow: '0 12px 28px -8px rgb(15 23 42 / 0.18), 0 4px 10px -4px rgb(15 23 42 / 0.1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            position: 'relative',
            width: 58,
            height: 58,
            borderRadius: 22,
            background: 'linear-gradient(135deg, #ef4444, #be123c)',
            color: '#ffffff',
            display: 'grid',
            placeItems: 'center',
            fontSize: 32,
            fontWeight: 900,
          }}
        >
          T
          <span style={{ position: 'absolute', right: -4, bottom: -4, width: 16, height: 16, borderRadius: 999, background: '#fbbf24', border: '3px solid #ffffff' }} />
        </div>
        <div>
          <div style={{ color: palette.text, fontSize: 34, fontWeight: 900 }}>T-Bite<span style={{ color: palette.accent }}>.</span></div>
          <div style={{ marginTop: 5, color: palette.muted, fontSize: 13, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Corporate Catering</div>
        </div>
      </div>
        <div style={{ marginTop: 24, color: palette.soft, fontSize: 24, lineHeight: 1.36 }}>
        多角色訂餐、取餐驗證、稽核與對帳，使用同一套企業午餐流程。
      </div>
    </div>
  </section>
);

const ProblemContext: Page = () => (
  <PageShell label="01 Problem">
    <Eyebrow>Problem Context</Eyebrow>
    <Title>企業訂餐不是「今天吃什麼」而已</Title>
    <Lead>當規模進入大型廠區，訂餐會變成跨員工、廠商與企業管理端的協作問題。</Lead>
    <div style={{ marginTop: 72, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 26 }}>
      <Card title="固定餐點" body="選擇少、彈性低，難以照顧不同飲食偏好。" color={palette.cyan} />
      <Card title="人工協調" body="訂單彙整、修改與確認高度依賴人工訊息。" color={palette.blue} />
      <Card title="紀錄分散" body="取餐、未送達與對帳資訊散落在不同表格。" color={palette.amber} />
      <Card title="責任不清" body="發生爭議時缺乏可追溯的共同事實。" color={palette.rose} />
    </div>
  </PageShell>
);

const StakeholderWordCloud: Page = () => (
  <PageShell label="02 Stakeholders">
    <Eyebrow>Stakeholder Word Cloud</Eyebrow>
    <Title width={1260}>三種顏色，代表三種不同但相互牽動的需求</Title>
    <div style={{ position: 'relative', height: 660, marginTop: 38, borderRadius: 40, border: `1px solid ${palette.line}`, background: '#ffffff' }}>
      <CloudWord color={palette.employee} size={56} x={125} y={95}>訂餐不便</CloudWord>
      <CloudWord color={palette.employee} size={42} x={375} y={198} rotate={-5}>截止時間不清楚</CloudWord>
      <CloudWord color={palette.employee} size={34} x={120} y={282} rotate={4}>修改訂單困難</CloudWord>
      <CloudWord color={palette.employee} size={40} x={525} y={86}>取餐驗證</CloudWord>
      <CloudWord color={palette.employee} size={32} x={715} y={224}>配送狀態不透明</CloudWord>
      <CloudWord color={palette.employee} size={30} x={258} y={420}>跨廠區訂餐</CloudWord>
      <CloudWord color={palette.employee} size={30} x={715} y={430} rotate={3}>推薦不足</CloudWord>
      <CloudWord color={palette.vendor} size={52} x={1040} y={102}>菜單管理</CloudWord>
      <CloudWord color={palette.vendor} size={42} x={1188} y={218} rotate={4}>每日供應上限</CloudWord>
      <CloudWord color={palette.vendor} size={34} x={990} y={320} rotate={-4}>備餐估算</CloudWord>
      <CloudWord color={palette.vendor} size={38} x={1322} y={364}>訂單彙整</CloudWord>
      <CloudWord color={palette.vendor} size={30} x={1035} y={480}>配送協調</CloudWord>
      <CloudWord color={palette.vendor} size={28} x={1372} y={510} rotate={-3}>服務廠區設定</CloudWord>
      <CloudWord color={palette.admin} size={54} x={650} y={320}>月結對帳</CloudWord>
      <CloudWord color={palette.admin} size={44} x={870} y={28} rotate={-4}>作業可追溯</CloudWord>
      <CloudWord color={palette.admin} size={36} x={498} y={510}>薪資扣款紀錄</CloudWord>
      <CloudWord color={palette.admin} size={34} x={1055} y={580}>未送達稽核</CloudWord>
      <CloudWord color={palette.admin} size={32} x={245} y={560} rotate={-2}>商家審核</CloudWord>
      <CloudWord color={palette.admin} size={30} x={868} y={522} rotate={5}>權責分明</CloudWord>
      <CloudWord color={palette.admin} size={28} x={80} y={185} rotate={-5}>營運可視化</CloudWord>
    </div>
    <div style={{ marginTop: 24, display: 'flex', gap: 18 }}>
      <Pill color={palette.employee}>員工</Pill>
      <Pill color={palette.vendor}>廠商</Pill>
      <Pill color={palette.admin}>TSMC / 福委會 / Admin</Pill>
    </div>
  </PageShell>
);

const UserStories: Page = () => (
  <PageShell label="03 Requirements">
    <Eyebrow>User Stories & Requirements</Eyebrow>
    <Title>把利害關係人痛點轉成可實作需求</Title>
    <div style={{ marginTop: 68, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30 }}>
      <Card title="員工 Employee" color={palette.employee}>
        <ul style={{ margin: '22px 0 0', paddingLeft: 28, color: palette.soft, fontSize: 28, lineHeight: 1.52 }}>
          <li>想快速查看可訂餐點與截止時間</li>
          <li>想知道訂單狀態與取餐方式</li>
          <li>希望發生未送達時可留下紀錄</li>
        </ul>
      </Card>
      <Card title="廠商 Vendor" color={palette.vendor}>
        <ul style={{ margin: '22px 0 0', paddingLeft: 28, color: palette.soft, fontSize: 28, lineHeight: 1.52 }}>
          <li>需要管理菜單、價格與每日供應量</li>
          <li>需要清楚取得彙整後訂單</li>
          <li>需要依廠區安排備餐與配送</li>
        </ul>
      </Card>
      <Card title="Admin / 福委會" color={palette.admin}>
        <ul style={{ margin: '22px 0 0', paddingLeft: 28, color: palette.soft, fontSize: 28, lineHeight: 1.52 }}>
          <li>需要審核商家與維護廠區規則</li>
          <li>需要稽核爭議與未送達紀錄</li>
          <li>需要月結與薪資扣款資料</li>
        </ul>
      </Card>
    </div>
  </PageShell>
);

const WhatIsTbite: Page = () => (
  <PageShell label="04 Solution">
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 70, alignItems: 'center', minHeight: 820 }}>
      <div>
        <Eyebrow>What is T-Bite?</Eyebrow>
        <Title width={960}>T-Bite 是企業訂餐的多方協作平台</Title>
        <Lead width={900}>它連接員工、外部餐廳與企業福委會，不只是訂便當，而是管理訂餐、供應、取餐驗證與對帳的完整 workflow。</Lead>
      </div>
      <div style={{ borderRadius: 44, border: `1px solid ${palette.line}`, background: '#ffffff', padding: 44 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <Card title="員工入口" body="訂餐、查詢、取餐" color={palette.employee} />
          <Card title="廠商入口" body="菜單、產能、履約" color={palette.vendor} />
          <Card title="Admin 入口" body="審核、稽核、對帳" color={palette.admin} />
          <Card title="共同紀錄" body="訂單狀態與可追溯資料" color={palette.purple} />
        </div>
      </div>
    </div>
  </PageShell>
);

const ServiceFlow: Page = () => (
  <PageShell label="05 Flow">
    <Eyebrow>End-to-End Service Flow</Eyebrow>
    <Title>從下訂到月結，讓流程有共同事實</Title>
    <div style={{ marginTop: 58, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26 }}>
      <FlowStep no="01" title="員工訂餐" note="瀏覽多商家菜單，於 cutoff 前送出或調整訂單。" color={palette.employee} />
      <FlowStep no="02" title="廠商接單與備餐" note="依廠區、餐點與供應上限彙整備餐需求。" color={palette.vendor} />
      <FlowStep no="03" title="餐點送達" note="配送至指定廠區與取餐點，留下履約狀態。" color={palette.blue} />
      <FlowStep no="04" title="QR code / 員工 ID 驗證" note="建立取餐證據，降低代領、漏領與爭議成本。" color={palette.green} />
      <FlowStep no="05" title="Admin 檢視紀錄" note="查看訂單、異常、取餐與未送達紀錄。" color={palette.admin} />
      <FlowStep no="06" title="月結與對帳" note="保留可追溯資料，支援薪資扣款與廠商結算。" color={palette.purple} />
    </div>
  </PageShell>
);

const RequirementMapping: Page = () => (
  <PageShell label="06 Mapping">
    <Eyebrow>Requirement-to-Feature Mapping</Eyebrow>
    <Title>每個 feature 都回應一個具體營運問題</Title>
    <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: '0.85fr 1fr 1.15fr', gap: 14 }}>
      <MiniCell tone="#f1f5f9" color={palette.cyan}>Problem</MiniCell>
      <MiniCell tone="#f1f5f9" color={palette.cyan}>Feature</MiniCell>
      <MiniCell tone="#f1f5f9" color={palette.cyan}>Implementation</MiniCell>
      <MiniCell>選擇有限</MiniCell><MiniCell>多商家菜單</MiniCell><MiniCell>Employee Portal 顯示餐廳、餐點與可訂狀態</MiniCell>
      <MiniCell>供應量不穩</MiniCell><MiniCell>每日供應上限</MiniCell><MiniCell>Vendor menu item capacity / cutoff 控制</MiniCell>
      <MiniCell>取餐爭議</MiniCell><MiniCell>取餐驗證</MiniCell><MiniCell>QR code 或員工 ID 建立 pickup record</MiniCell>
      <MiniCell>未送達爭議</MiniCell><MiniCell>異常回報與紀錄</MiniCell><MiniCell>保留 exception log 給 Admin 稽核</MiniCell>
      <MiniCell>對帳麻煩</MiniCell><MiniCell>月結紀錄</MiniCell><MiniCell>依訂單、取餐與扣款資料彙整 settlement</MiniCell>
    </div>
  </PageShell>
);

const SystemArchitecture: Page = () => (
  <PageShell label="07 Architecture">
    <Eyebrow>System Architecture</Eyebrow>
    <Title>Cloud-native 的核心：入口分離、API 集中、資料可追溯</Title>
    <div style={{ position: 'relative', height: 650, marginTop: 34 }}>
      <ArchBox title="Employee Portal" note="訂餐、狀態、取餐 QR" x={10} y={55} w={360} color={palette.employee} />
      <ArchBox title="Vendor Portal" note="菜單、供應量、訂單彙整" x={10} y={245} w={360} color={palette.vendor} />
      <ArchBox title="Admin Portal" note="商家審核、稽核、對帳" x={10} y={435} w={360} color={palette.admin} />
      <Arrow x={392} y={110} w={260} label="HTTPS / JSON" />
      <Arrow x={392} y={300} w={260} />
      <Arrow x={392} y={490} w={260} />
      <ArchBox title="Backend API" note="Order, Menu, Pickup, Settlement boundaries" x={690} y={230} w={430} color={palette.cyan} />
      <ArchBox title="Authentication / RBAC" note="employee · vendor · admin role-based access" x={690} y={40} w={430} color={palette.purple} />
      <ArchBox title="Database" note="orders, users, menu items, pickup records, exceptions" x={1350} y={160} w={360} color={palette.green} />
      <ArchBox title="Deployment / Cloud Runtime" note="stateless web/API process, environment config, build artifact" x={1350} y={400} w={360} color={palette.blue} />
      <Arrow x={1135} y={285} w={195} label="queries / writes" />
      <Arrow x={1135} y={472} w={195} label="deployable unit" />
      <div style={{ position: 'absolute', left: 760, top: 405, color: palette.muted, fontSize: 24, lineHeight: 1.45, maxWidth: 460 }}>
        假設第一版以 modular monolith / single backend API 呈現；service boundary 先在程式與資料模型中切清楚。
      </div>
    </div>
  </PageShell>
);

const CloudNativeThinking: Page = () => (
  <PageShell label="08 Cloud Native">
    <Eyebrow>Cloud Native Design Thinking</Eyebrow>
    <Title>不是把系統放上雲端，而是讓系統適合演進</Title>
    <div style={{ marginTop: 60, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
      <Card title="Frontend / Backend Separation" body="三個 portal 透過 API 交換資料，UI 與 domain logic 分離。" color={palette.cyan} />
      <Card title="Stateless Service" body="API 不依賴單一機器狀態，水平擴充與部署更簡單。" color={palette.blue} />
      <Card title="Service Boundary" body="Menu、Order、Pickup、Settlement 清楚切分責任。" color={palette.purple} />
      <Card title="Scalability" body="cutoff 前尖峰、午餐配送窗口與查詢壓力可分別推估。" color={palette.green} />
      <Card title="Maintainability" body="多角色需求仍可在一致模型中維護與擴充。" color={palette.amber} />
      <Card title="Observability" body="用紀錄與狀態追蹤訂單、未送達與爭議處理。" color={palette.rose} />
    </div>
  </PageShell>
);

const DemandCapacity: Page = () => (
  <PageShell label="09 Engineering Reasoning">
    <Eyebrow>Demand & Capacity Reasoning</Eyebrow>
    <Title>用簡單公式把營運假設轉成系統設計</Title>
    <div style={{ marginTop: 54, display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 36 }}>
      <div style={{ display: 'grid', gap: 18 }}>
        <Card title="Expected Daily Orders = Eligible Employees × Adoption Rate" color={palette.cyan} />
        <Card title="Vendor Load = Confirmed Orders / Vendor Capacity" color={palette.vendor} />
        <Card title="Peak Request Pressure ≈ Users near Cutoff × Action Frequency" color={palette.amber} />
        <Card title="Delivery Window Load = Meals per Site / Available Delivery Time" color={palette.blue} />
      </div>
      <div style={{ borderRadius: 38, background: '#ffffff', border: `1px solid ${palette.line}`, padding: 42 }}>
        <div style={{ fontSize: 38, fontWeight: 850 }}>設計影響</div>
        <ul style={{ margin: '30px 0 0', paddingLeft: 32, color: palette.soft, fontSize: 30, lineHeight: 1.55 }}>
          <li>供應上限避免超賣與備餐失準</li>
          <li>截止時間降低尖峰後的狀態變更</li>
          <li>常用查詢需要快取與清楚索引</li>
          <li>取餐與異常紀錄保護資料一致性</li>
        </ul>
      </div>
    </div>
  </PageShell>
);

const ImplementationHighlights: Page = () => (
  <PageShell label="10 Implementation">
    <Eyebrow>Implementation Highlights</Eyebrow>
    <Title>第一版聚焦在可 demo 的核心流程</Title>
    <div style={{ marginTop: 58, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 22 }}>
      <Card title="多角色入口" body="Employee / Vendor / Admin 使用情境分離" color={palette.cyan} />
      <Card title="菜單管理" body="餐點、價格、供應量與服務廠區" color={palette.vendor} />
      <Card title="訂單流程" body="建立、確認、彙整與狀態更新" color={palette.blue} />
      <Card title="取餐驗證" body="QR code / 員工 ID 作為取餐證據" color={palette.green} />
      <Card title="Admin 紀錄" body="異常、稽核、月結與對帳視角" color={palette.admin} />
    </div>
    <div style={{ marginTop: 56, borderRadius: 36, border: `1px dashed ${palette.lineStrong}`, padding: 32, color: palette.muted, fontSize: 28, lineHeight: 1.45 }}>
      目前簡報 repo 未包含主系統截圖；第一版以 mock product cards 表示，正式報告前可替換為主系統 repo 的實際畫面。
    </div>
  </PageShell>
);

const TestingValidation: Page = () => (
  <PageShell label="11 Testing">
    <Eyebrow>Testing & Validation</Eyebrow>
    <Title>測試重點放在跨角色情境是否能走完</Title>
    <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: '0.85fr 1fr 1.15fr 0.65fr', gap: 14 }}>
      <MiniCell tone="#f1f5f9" color={palette.cyan}>Test Type</MiniCell>
      <MiniCell tone="#f1f5f9" color={palette.cyan}>Scenario</MiniCell>
      <MiniCell tone="#f1f5f9" color={palette.cyan}>Validation</MiniCell>
      <MiniCell tone="#f1f5f9" color={palette.cyan}>Role</MiniCell>
      <MiniCell>Functional</MiniCell><MiniCell>新增餐點與供應上限</MiniCell><MiniCell>資料可被員工入口查詢</MiniCell><MiniCell>Vendor</MiniCell>
      <MiniCell>Scenario-based</MiniCell><MiniCell>截止前下訂與修改</MiniCell><MiniCell>訂單狀態符合流程</MiniCell><MiniCell>Employee</MiniCell>
      <MiniCell>Role-based</MiniCell><MiniCell>不同帳號進入不同功能</MiniCell><MiniCell>權限不越界</MiniCell><MiniCell>All</MiniCell>
      <MiniCell>Demo path</MiniCell><MiniCell>下訂 → 接單 → 取餐 → 對帳</MiniCell><MiniCell>10 分鐘內可穩定展示</MiniCell><MiniCell>All</MiniCell>
    </div>
  </PageShell>
);

const ReliabilityOperations: Page = () => (
  <PageShell label="12 Operations">
    <Eyebrow>Reliability & Operations</Eyebrow>
    <Title>可靠性來自「狀態清楚」與「紀錄不散落」</Title>
    <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 26 }}>
      <Card title="未送達記錄" body="將 exception 綁定訂單、廠商、廠區與時間。" color={palette.rose} />
      <Card title="取餐爭議追蹤" body="pickup record 讓 Admin 能還原領餐狀態。" color={palette.green} />
      <Card title="月結資料保留" body="訂單與扣款資料可被彙整為 settlement view。" color={palette.admin} />
      <Card title="稽核與權責" body="角色與操作紀錄讓責任邊界更清楚。" color={palette.purple} />
    </div>
    <Lead width={1420}>相較於聊天訊息與試算表，T-Bite 的價值是把營運資料留在同一條可追溯流程中。</Lead>
  </PageShell>
);

const DemoClosing: Page = () => (
  <PageShell label="13 Demo & Closing">
    <div style={{ display: 'grid', gridTemplateColumns: '0.98fr 1.02fr', gap: 70, alignItems: 'center', minHeight: 820 }}>
      <div>
        <Eyebrow>Demo Flow</Eyebrow>
        <Title width={860}>現場 demo 只走一條主線，讓故事完整</Title>
        <Lead width={820}>員工下訂 → 廠商管理訂單 → 取餐驗證 → Admin 查看紀錄。</Lead>
      </div>
      <div style={{ display: 'grid', gap: 22 }}>
        <FlowStep no="01" title="Employee places order" note="選擇餐點、確認廠區與 cutoff 狀態。" color={palette.employee} />
        <FlowStep no="02" title="Vendor manages orders" note="查看彙整訂單與備餐需求。" color={palette.vendor} />
        <FlowStep no="03" title="Pickup verification" note="使用 QR code 或員工 ID 建立取餐紀錄。" color={palette.green} />
        <FlowStep no="04" title="Admin reviews records" note="查看異常、取餐與月結資料。" color={palette.admin} />
      </div>
    </div>
  </PageShell>
);

const Conclusion: Page = () => (
  <section style={{ ...fill, padding: '130px 140px', display: 'flex', alignItems: 'center' }}>
    <div style={gridBg} />
    <div style={{ ...glow, width: 900, height: 900, right: -240, top: 60 }} />
    <div style={{ position: 'relative', zIndex: 1, maxWidth: 1420 }}>
      <Eyebrow>Closing</Eyebrow>
      <h2 style={{ margin: 0, fontFamily: 'var(--osd-font-display)', fontSize: 92, lineHeight: 1.08, letterSpacing: 0, fontWeight: 900 }}>
        T-Bite is not just a lunch ordering app;
        <br />
        it is a cloud-native workflow system for enterprise meal coordination.
      </h2>
      <div style={{ marginTop: 58, display: 'flex', gap: 18 }}>
        <Pill>Problem-driven</Pill>
        <Pill color={palette.blue}>Multi-stakeholder</Pill>
        <Pill color={palette.amber}>Cloud-native thinking</Pill>
        <Pill color={palette.green}>Demo-ready workflow</Pill>
      </div>
    </div>
  </section>
);

export const meta: SlideMeta = {
  title: 'T-Bite',
  theme: 't-bite-enterprise',
};

export default [
  Cover,
  ProblemContext,
  StakeholderWordCloud,
  UserStories,
  WhatIsTbite,
  ServiceFlow,
  RequirementMapping,
  SystemArchitecture,
  CloudNativeThinking,
  DemandCapacity,
  ImplementationHighlights,
  TestingValidation,
  ReliabilityOperations,
  DemoClosing,
  Conclusion,
] satisfies Page[];
