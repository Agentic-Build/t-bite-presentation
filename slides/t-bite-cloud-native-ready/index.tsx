import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

import adminAudit from './assets/admin-audit.png';
import employeeOrder from './assets/employee-order.png';
import merchantMenus from './assets/merchant-menus.png';

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

const color = {
  bg: design.palette.bg,
  text: design.palette.text,
  accent: design.palette.accent,
  panel: '#ffffff',
  panel2: '#f1f5f9',
  panel3: '#fee2e2',
  line: '#e2e8f0',
  lineStrong: '#cbd5e1',
  muted: '#64748b',
  soft: '#334155',
  green: '#10b981',
  blue: '#0ea5e9',
  gold: '#f2bc4b',
  coral: '#e11d48',
  violet: '#8b5cf6',
  white: '#ffffff',
};

const font = {
  mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
};

const fill: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  boxSizing: 'border-box',
  overflow: 'hidden',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  letterSpacing: 0,
};

const backgroundGrid: CSSProperties = {
  position: 'absolute',
  inset: 0,
  backgroundImage:
    'linear-gradient(rgba(226,232,240,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(226,232,240,0.7) 1px, transparent 1px)',
  backgroundSize: '96px 96px',
  opacity: 0.28,
};

const leftRail: CSSProperties = {
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  width: 18,
  background: `linear-gradient(180deg, ${color.accent}, #be123c 62%, ${color.gold})`,
};

const diagonalBand: CSSProperties = {
  position: 'absolute',
  right: -300,
  top: -40,
  width: 900,
  height: 1220,
  transform: 'skewX(-14deg)',
  background: '#ffffff',
  borderLeft: `1px solid ${color.line}`,
  opacity: 0.7,
};

const Header = ({ index, label }: { index: string; label: string }) => (
  <div
    style={{
      position: 'absolute',
      left: 112,
      right: 112,
      top: 44,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: color.muted,
      fontFamily: font.mono,
      fontSize: 18,
      textTransform: 'uppercase',
    }}
  >
    <span>T-Bite · Cloud Native Readiness</span>
    <span>
      {index} / {label}
    </span>
  </div>
);

const Shell = ({ index, label, children }: { index: string; label: string; children: ReactNode }) => (
  <section style={{ ...fill, padding: '112px 112px 96px' }}>
    <div style={backgroundGrid} />
    <div style={leftRail} />
    <Header index={index} label={label} />
    <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>{children}</div>
  </section>
);

const Kicker = ({ children, tone = color.green }: { children: ReactNode; tone?: string }) => (
  <div
    style={{
      color: tone,
      fontSize: 22,
      fontWeight: 780,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      marginBottom: 18,
    }}
  >
    {children}
  </div>
);

const Title = ({ children, width = 1320, size = 76 }: { children: ReactNode; width?: number; size?: number }) => (
  <h1
    style={{
      margin: 0,
      maxWidth: width,
      fontFamily: 'var(--osd-font-display)',
      fontSize: size,
      lineHeight: 1.05,
      fontWeight: 900,
      letterSpacing: 0,
    }}
  >
    {children}
  </h1>
);

const Lead = ({ children, width = 1240 }: { children: ReactNode; width?: number }) => (
  <p style={{ margin: '24px 0 0', maxWidth: width, color: color.soft, fontSize: 'var(--osd-size-body)', lineHeight: 1.45 }}>
    {children}
  </p>
);

const Card = ({
  title,
  body,
  tone = color.green,
  minHeight = 176,
}: {
  title: ReactNode;
  body: ReactNode;
  tone?: string;
  minHeight?: number;
}) => (
  <div
    style={{
      minHeight,
      borderRadius: 'var(--osd-radius)',
      background: color.panel,
      border: `1px solid ${color.line}`,
      padding: 28,
      boxSizing: 'border-box',
      boxShadow: '0 1px 2px 0 rgb(15 23 42 / 0.06)',
    }}
  >
    <div style={{ width: 58, height: 6, borderRadius: 8, background: tone, marginBottom: 20 }} />
    <div style={{ fontSize: 31, lineHeight: 1.2, fontWeight: 840 }}>{title}</div>
    <div style={{ marginTop: 12, color: color.soft, fontSize: 24, lineHeight: 1.38 }}>{body}</div>
  </div>
);

const Pill = ({ children, tone = color.green }: { children: ReactNode; tone?: string }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      minHeight: 44,
      padding: '0 16px',
      borderRadius: 8,
      color: tone,
      background: `${tone}18`,
      border: `1px solid ${tone}88`,
      fontSize: 18,
      fontWeight: 800,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </span>
);

const Word = ({ children, tone, size, x, y }: { children: ReactNode; tone: string; size: number; x: number; y: number }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      color: tone,
      fontSize: size,
      lineHeight: 1,
      fontWeight: 880,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </div>
);

const MappingCard = ({
  problem,
  capability,
  engineering,
  tone,
}: {
  problem: string;
  capability: string;
  engineering: string;
  tone: string;
}) => (
  <div
    style={{
      borderRadius: 8,
      background: color.panel,
      border: `1px solid ${color.line}`,
      padding: 28,
      minHeight: 250,
      display: 'grid',
      gridTemplateRows: 'auto auto auto',
      gap: 14,
    }}
  >
    <div style={{ color: tone, fontSize: 30, fontWeight: 860 }}>{problem}</div>
    <div style={{ color: color.soft, fontSize: 27, lineHeight: 1.2 }}>→ {capability}</div>
    <div style={{ color: color.muted, fontFamily: font.mono, fontSize: 22, lineHeight: 1.32 }}>→ {engineering}</div>
  </div>
);

const ArchBox = ({
  title,
  note,
  tone,
  x,
  y,
  w,
  h = 112,
}: {
  title: string;
  note: string;
  tone: string;
  x: number;
  y: number;
  w: number;
  h?: number;
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      minHeight: h,
      borderRadius: 8,
      background: color.panel,
      border: `1px solid ${tone}88`,
      padding: 22,
      boxSizing: 'border-box',
    }}
  >
    <div style={{ color: tone, fontSize: 26, fontWeight: 840, lineHeight: 1.15 }}>{title}</div>
    <div style={{ marginTop: 8, color: color.soft, fontSize: 20, lineHeight: 1.3 }}>{note}</div>
  </div>
);

const Arrow = ({ x, y, w, label }: { x: number; y: number; w: number; label?: string }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: w, height: 34 }}>
    <div style={{ position: 'absolute', left: 0, right: 22, top: 16, borderTop: `2px solid ${color.lineStrong}` }} />
    <div
      style={{
        position: 'absolute',
        right: 0,
        top: 7,
        width: 0,
        height: 0,
        borderTop: '10px solid transparent',
        borderBottom: '10px solid transparent',
        borderLeft: `18px solid ${color.lineStrong}`,
      }}
    />
    {label ? (
      <div style={{ position: 'absolute', left: 14, top: -22, color: color.muted, fontFamily: font.mono, fontSize: 16 }}>{label}</div>
    ) : null}
  </div>
);

const Evidence = ({ title, detail, tone }: { title: string; detail: string; tone: string }) => (
  <div style={{ borderRadius: 8, background: color.panel, border: `1px solid ${color.line}`, padding: 24, minHeight: 156 }}>
    <div style={{ color: tone, fontSize: 29, lineHeight: 1.16, fontWeight: 840 }}>{title}</div>
    <div style={{ marginTop: 10, color: color.soft, fontSize: 22, lineHeight: 1.36 }}>{detail}</div>
  </div>
);

const ValidationRow = ({ risk, validation, tone }: { risk: string; validation: string; tone: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '0.82fr 84px 1.18fr', gap: 16, alignItems: 'center' }}>
    <div style={{ borderRadius: 8, background: `${tone}17`, border: `1px solid ${tone}88`, color: tone, padding: '20px 24px', fontSize: 28, fontWeight: 820 }}>
      {risk}
    </div>
    <div style={{ color: color.muted, fontSize: 36, textAlign: 'center' }}>→</div>
    <div style={{ borderRadius: 8, background: color.panel, border: `1px solid ${color.line}`, color: color.soft, padding: '20px 24px', fontSize: 28 }}>
      {validation}
    </div>
  </div>
);

const ImageFrame = ({ src, title }: { src: string; title: string }) => (
  <figure
    style={{
      margin: 0,
      overflow: 'hidden',
      borderRadius: 8,
      background: '#f7fafc',
      border: `1px solid ${color.lineStrong}`,
      boxShadow: '0 1px 2px 0 rgb(15 23 42 / 0.06)',
    }}
  >
    <figcaption
      style={{
        height: 38,
        background: '#f1f5f9',
        color: color.soft,
        display: 'flex',
        alignItems: 'center',
        padding: '0 14px',
        fontFamily: font.mono,
        fontSize: 15,
      }}
    >
      {title}
    </figcaption>
    <img src={src} alt={title} style={{ display: 'block', width: '100%', height: 196, objectFit: 'cover' }} />
  </figure>
);

const Decision = ({ title, body, tone }: { title: string; body: string; tone: string }) => (
  <div style={{ borderRadius: 8, background: color.panel, border: `1px solid ${color.line}`, padding: 24, minHeight: 170 }}>
    <div style={{ color: tone, fontSize: 28, fontWeight: 860, lineHeight: 1.16 }}>{title}</div>
    <div style={{ marginTop: 10, color: color.soft, fontSize: 22, lineHeight: 1.34 }}>{body}</div>
  </div>
);

const Cover: Page = () => (
  <section style={{ ...fill, padding: '120px 124px' }}>
    <div style={backgroundGrid} />
    <div style={leftRail} />
    <div style={diagonalBand} />
    <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'grid', gridTemplateColumns: '1.02fr 0.98fr', gap: 72, alignItems: 'center' }}>
      <div>
        <Kicker>T-Bite</Kicker>
        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 'var(--osd-size-hero)',
            lineHeight: 0.95,
            fontWeight: 900,
            letterSpacing: 0,
            maxWidth: 940,
          }}
        >
          Cloud-Native-Ready Enterprise Catering Workflow
        </h1>
        <Lead width={960}>從三方需求到可驗證、可維運的企業訂餐流程</Lead>
        <div style={{ marginTop: 42, display: 'flex', gap: 14 }}>
          <Pill tone={color.green}>user stories</Pill>
          <Pill tone={color.blue}>architecture</Pill>
          <Pill tone={color.gold}>validation</Pill>
        </div>
      </div>
      <div style={{ position: 'relative', height: 650 }}>
        <div style={{ position: 'absolute', left: 70, top: 60, width: 480, height: 160, borderRadius: 8, background: color.panel, border: `1px solid ${color.green}88`, padding: 28 }}>
          <div style={{ color: color.green, fontFamily: font.mono, fontSize: 20 }}>Employee</div>
          <div style={{ marginTop: 14, fontSize: 36, fontWeight: 860 }}>預購與領餐</div>
        </div>
        <div style={{ position: 'absolute', right: 34, top: 246, width: 480, height: 160, borderRadius: 8, background: color.panel, border: `1px solid ${color.blue}88`, padding: 28 }}>
          <div style={{ color: color.blue, fontFamily: font.mono, fontSize: 20 }}>Merchant</div>
          <div style={{ marginTop: 14, fontSize: 36, fontWeight: 860 }}>供應與備餐</div>
        </div>
        <div style={{ position: 'absolute', left: 0, bottom: 58, width: 520, height: 170, borderRadius: 8, background: color.panel, border: `1px solid ${color.gold}88`, padding: 28 }}>
          <div style={{ color: color.gold, fontFamily: font.mono, fontSize: 20 }}>Admin</div>
          <div style={{ marginTop: 14, fontSize: 36, fontWeight: 860 }}>稽核與對帳</div>
        </div>
        <Arrow x={318} y={220} w={250} label="workflow" />
        <Arrow x={210} y={414} w={280} label="shared state" />
      </div>
    </div>
  </section>
);

const Problem: Page = () => (
  <Shell index="02" label="problem">
    <Kicker tone={color.coral}>Problem</Kicker>
    <Title width={1360}>企業訂餐的核心問題不是下單，而是規模、責任、狀態與例外處理</Title>
    <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
      <Card title="午餐尖峰" body="大量員工在短時間預購、修改與領餐，現場需要分流。" tone={color.green} minHeight={320} />
      <Card title="供應風險" body="熱門餐點很容易超賣，商家需要可預測的備餐數字。" tone={color.blue} minHeight={320} />
      <Card title="月結對帳" body="薪資代扣與商家結算需要一致的訂單與履約資料。" tone={color.gold} minHeight={320} />
      <Card title="例外歸屬" body="申訴、未領、未送達與人工 override 都需要稽核軌跡。" tone={color.coral} minHeight={320} />
    </div>
  </Shell>
);

const WordCloud: Page = () => (
  <Shell index="03" label="word cloud">
    <Kicker>Three-sided user stories</Kicker>
    <Title width={1180}>三方需求不同，但最後都指向同一條企業流程</Title>
    <div style={{ position: 'relative', marginTop: 44, height: 560, borderRadius: 8, background: color.panel, border: `1px solid ${color.line}` }}>
      <div style={{ position: 'absolute', left: 36, top: 34, color: color.green, fontFamily: font.mono, fontSize: 20 }}>員工 Employee</div>
      <Word tone={color.green} size={54} x={78} y={112}>多日預購</Word>
      <Word tone={color.green} size={39} x={244} y={220}>領餐排隊</Word>
      <Word tone={color.green} size={34} x={82} y={318}>熱門餐點售完</Word>
      <Word tone={color.green} size={32} x={308} y={408}>TOTP QR</Word>
      <Word tone={color.green} size={29} x={116} y={458}>扣款透明</Word>
      <Word tone={color.green} size={28} x={384} y={314}>申訴追蹤</Word>

      <div style={{ position: 'absolute', left: 714, top: 34, color: color.blue, fontFamily: font.mono, fontSize: 20 }}>商家 Merchant</div>
      <Word tone={color.blue} size={48} x={708} y={120}>每日供應量</Word>
      <Word tone={color.blue} size={38} x={978} y={212}>截單時間</Word>
      <Word tone={color.blue} size={36} x={690} y={310}>備餐總表</Word>
      <Word tone={color.blue} size={32} x={1010} y={392}>避免超賣</Word>
      <Word tone={color.blue} size={30} x={790} y={438}>合規文件</Word>
      <Word tone={color.blue} size={28} x={1078} y={306}>對帳摘要</Word>

      <div style={{ position: 'absolute', right: 290, top: 34, color: color.gold, fontFamily: font.mono, fontSize: 20 }}>台積電 / Admin</div>
      <Word tone={color.gold} size={50} x={1290} y={116}>商家審核</Word>
      <Word tone={color.gold} size={38} x={1410} y={224}>廠區權限</Word>
      <Word tone={color.gold} size={35} x={1276} y={326}>薪資代扣</Word>
      <Word tone={color.gold} size={32} x={1510} y={410}>異常預警</Word>
      <Word tone={color.gold} size={30} x={1320} y={462}>稽核軌跡</Word>
      <Word tone={color.gold} size={29} x={1536} y={306}>可觀測性</Word>
    </div>
    <div style={{ marginTop: 34, color: color.soft, fontSize: 34, lineHeight: 1.4 }}>
      我們把三方問題轉成 user stories，再轉成系統能力。
    </div>
  </Shell>
);

const CapabilityMapping: Page = () => (
  <Shell index="04" label="capability mapping">
    <Kicker tone={color.violet}>User Story → System Capability</Kicker>
    <Title width={1260}>需求轉工程：每個故事都落到一致性、安全性或治理能力</Title>
    <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
      <MappingCard problem="熱門餐點超賣" capability="quota conditional decrement" engineering="transaction consistency" tone={color.green} />
      <MappingCard problem="領餐現場混亂" capability="TOTP QR pickup" engineering="replay / expiry control" tone={color.blue} />
      <MappingCard problem="月結扣款爭議" capability="payroll ledger + dispute" engineering="auditability" tone={color.gold} />
      <MappingCard problem="文件與服務品質" capability="compliance scanner + alerts" engineering="governance workflow" tone={color.coral} />
    </div>
  </Shell>
);

const Architecture: Page = () => (
  <Shell index="05" label="architecture">
    <Kicker>System Architecture</Kicker>
    <Title width={1380}>Go modular monolith 承接 domain boundary，不過早拆 microservices</Title>
    <div style={{ position: 'relative', marginTop: 36, height: 620 }}>
      <ArchBox title="Employee Portal" note="SvelteKit · preorder · pickup" tone={color.green} x={0} y={36} w={410} />
      <ArchBox title="Merchant Portal" note="SvelteKit · menu · orders" tone={color.blue} x={0} y={222} w={410} />
      <ArchBox title="Admin Portal" note="SvelteKit · governance · audit" tone={color.gold} x={0} y={408} w={410} />
      <Arrow x={438} y={95} w={250} label="HTTP / OpenAPI" />
      <Arrow x={438} y={281} w={250} />
      <Arrow x={438} y={467} w={250} />
      <ArchBox title="Go API" note="modular monolith · order · quota · pickup · ledger" tone={color.green} x={730} y={210} w={390} h={164} />
      <Arrow x={1148} y={282} w={206} label="state + events" />
      <ArchBox title="Postgres" note="state of record" tone={color.gold} x={1390} y={54} w={270} />
      <ArchBox title="Redis" note="session / cache" tone={color.green} x={1390} y={190} w={270} />
      <ArchBox title="NATS" note="async events" tone={color.blue} x={1390} y={326} w={270} />
      <ArchBox title="MinIO / S3" note="files and evidence" tone={color.violet} x={1390} y={462} w={270} />
      <ArchBox title="Authentik" note="SSO / RBAC claims" tone={color.coral} x={1138} y={54} w={220} />
      <ArchBox title="Worker / Scheduler / MCP stdio" note="outbox · cutoff · scanner · agent integration" tone={color.violet} x={714} y={460} w={646} h={126} />
    </div>
  </Shell>
);

const CloudNativeReadiness: Page = () => (
  <Shell index="06" label="readiness">
    <Kicker tone={color.green}>Cloud Native Readiness</Kicker>
    <Title width={1430}>我們沒有把 Cloud Native 簡化成「有 Kubernetes」</Title>
    <Lead width={1400}>重點是可容器化、可設定、可測試、可觀測、可部署的設計證據。</Lead>
    <div style={{ marginTop: 46, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
      <Evidence title="Dockerfiles" detail="API + 3 frontends can be built as containers." tone={color.green} />
      <Evidence title="Compose stack" detail="local Postgres, Redis, NATS, MinIO, Authentik." tone={color.blue} />
      <Evidence title="Env config" detail="runtime settings are injected by environment." tone={color.gold} />
      <Evidence title="OpenAPI contract" detail="generated TS client reduces API/frontend drift." tone={color.violet} />
      <Evidence title="Observability" detail="OpenTelemetry plus /healthz and /readyz." tone={color.coral} />
      <Evidence title="Kustomize" detail="manifests are render-validated deployment artifacts." tone={color.green} />
    </div>
    <div style={{ marginTop: 30, borderRadius: 8, background: `${color.gold}16`, border: `1px solid ${color.gold}88`, color: color.soft, padding: '18px 24px', fontSize: 26 }}>
      Kubernetes manifests are deployment artifacts, not claimed as live production deployment.
    </div>
  </Shell>
);

const ReliabilityValidation: Page = () => (
  <Shell index="07" label="validation">
    <Kicker tone={color.coral}>Reliability & Validation</Kicker>
    <Title width={1380}>我們驗證的是企業流程風險，不只是頁面能不能打開</Title>
    <div style={{ marginTop: 50, display: 'grid', gap: 16 }}>
      <ValidationRow risk="超賣風險" validation="concurrent quota tests" tone={color.green} />
      <ValidationRow risk="領餐重複使用" validation="TOTP verification tests" tone={color.blue} />
      <ValidationRow risk="API / frontend drift" validation="contract drift CI" tone={color.violet} />
      <ValidationRow risk="午餐尖峰" validation="k6 lunch-peak load test" tone={color.gold} />
      <ValidationRow risk="資料責任歸屬" validation="audit / outbox tests" tone={color.coral} />
    </div>
  </Shell>
);

const DemoStory: Page = () => (
  <Shell index="08" label="demo story">
    <Kicker tone={color.blue}>Demo Story</Kicker>
    <Title width={1350}>只 demo 一條 end-to-end：從預購到對帳與爭議追蹤</Title>
    <div style={{ marginTop: 42, display: 'grid', gridTemplateColumns: '0.92fr 1.08fr', gap: 34 }}>
      <div style={{ display: 'grid', gap: 14 }}>
        <ValidationRow risk="員工預購" validation="system decrements capacity" tone={color.green} />
        <ValidationRow risk="商家備餐" validation="order summary drives fulfillment" tone={color.blue} />
        <ValidationRow risk="TOTP QR 領餐" validation="expiry and replay are controlled" tone={color.violet} />
        <ValidationRow risk="Payroll / settlement" validation="ledger supports reconciliation" tone={color.gold} />
        <ValidationRow risk="Dispute / audit" validation="events remain traceable" tone={color.coral} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 18 }}>
        <ImageFrame src={employeeOrder} title="employee order / pickup" />
        <ImageFrame src={merchantMenus} title="merchant menu / capacity" />
        <div style={{ gridColumn: '1 / span 2' }}>
          <ImageFrame src={adminAudit} title="admin audit trail" />
        </div>
      </div>
    </div>
  </Shell>
);

const Decisions: Page = () => (
  <Shell index="09" label="takeaway">
    <Kicker tone={color.gold}>Decisions & Takeaway</Kicker>
    <Title width={1340}>T-Bite 的重點不是「能下單」，而是可追蹤、可驗證、可維運</Title>
    <div style={{ marginTop: 46, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 22 }}>
      <Decision title="Modular monolith over microservices" body="降低課程專案部署複雜度，但保留 domain boundary。" tone={color.green} />
      <Decision title="Postgres as source of truth" body="訂單、quota、扣款與稽核需要一致性。" tone={color.gold} />
      <Decision title="TOTP QR over static pickup code" body="支援尖峰快速核銷，也能防 replay。" tone={color.blue} />
      <Decision title="Deployment readiness, not overclaiming" body="有 manifests、Docker、CI，但不宣稱未完成的 cluster deployment。" tone={color.coral} />
    </div>
    <div style={{ marginTop: 40, borderRadius: 8, background: color.panel2, border: `1px solid ${color.lineStrong}`, padding: 30, color: color.white, fontSize: 34, lineHeight: 1.38, fontWeight: 780 }}>
      T-Bite turns enterprise catering into a cloud-native-ready workflow for capacity, identity, pickup, ledger, and audit.
    </div>
  </Shell>
);

export const meta: SlideMeta = {
  title: 'T-Bite Cloud Native Ready',
  theme: 't-bite-enterprise',
};

export default [
  Cover,
  Problem,
  WordCloud,
  CapabilityMapping,
  Architecture,
  CloudNativeReadiness,
  ReliabilityValidation,
  DemoStory,
  Decisions,
] satisfies Page[];
