import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

import adminDashboard from './assets/admin-dashboard.png';
import employeeCatalog from './assets/employee-catalog.png';
import employeeOrder from './assets/employee-order.png';
import merchantDashboard from './assets/merchant-dashboard.png';

export const design: DesignSystem = {
  palette: {
    bg: '#f8fafc',
    text: '#111827',
    accent: '#dc2626',
  },
  fonts: {
    display: '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", system-ui, sans-serif',
    body: '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", system-ui, sans-serif',
  },
  typeScale: {
    hero: 128,
    body: 34,
  },
  radius: 16,
};

const TOTAL = 13;

const c = {
  bg: '#f8fafc',
  paper: '#ffffff',
  text: '#111827',
  muted: '#64748b',
  soft: '#334155',
  line: '#e5e7eb',
  red: '#dc2626',
  blue: '#0284c7',
  green: '#059669',
  amber: '#d97706',
  violet: '#7c3aed',
  dark: '#0f172a',
};

const font = {
  display: design.fonts.display,
  body: design.fonts.body,
  mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
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

const motion = `
@keyframes fadeUp { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
@keyframes popIn { 0% { opacity: 0; transform: scale(.96); } 100% { opacity: 1; transform: scale(1); } }
@keyframes draw { from { stroke-dashoffset: 960; } to { stroke-dashoffset: 0; } }
@keyframes slowGrid { from { background-position: 0 0, 0 0; } to { background-position: 108px 108px, 108px 108px; } }
.fade { opacity: 0; animation: fadeUp .72s cubic-bezier(.2,.7,.2,1) forwards; }
.pop { opacity: 0; animation: popIn .52s cubic-bezier(.2,.8,.2,1) forwards; }
.draw { stroke-dasharray: 960; stroke-dashoffset: 960; animation: draw 1.45s cubic-bezier(.2,.7,.2,1) forwards; }
.grid { animation: slowGrid 22s linear infinite; }
@media (prefers-reduced-motion: reduce) {
  .fade, .pop, .draw, .grid { animation: none !important; opacity: 1 !important; transform: none !important; stroke-dashoffset: 0 !important; }
}`;

const Styles = () => <style>{motion}</style>;

const Slide = ({ page, children, dark = false }: { page: number; children: ReactNode; dark?: boolean }) => (
  <section
    style={{
      ...fill,
      padding: '104px 132px 86px',
      background: dark ? c.dark : 'var(--osd-bg)',
      color: dark ? '#f8fafc' : 'var(--osd-text)',
    }}
  >
    <Styles />
    <div
      className="grid"
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: dark
          ? 'linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px)'
          : 'linear-gradient(rgba(148,163,184,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.18) 1px, transparent 1px)',
        backgroundSize: '108px 108px',
        opacity: dark ? 0.46 : 0.34,
      }}
    />
    <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>{children}</div>
    <Footer page={page} dark={dark} />
  </section>
);

const Footer = ({ page, dark = false }: { page: number; dark?: boolean }) => (
  <div
    className="fade"
    style={{
      position: 'absolute',
      left: 132,
      right: 132,
      bottom: 38,
      display: 'flex',
      justifyContent: 'space-between',
      color: dark ? '#94a3b8' : c.muted,
      fontFamily: font.mono,
      fontSize: 17,
      zIndex: 2,
      animationDelay: '.42s',
    }}
  >
    <span>T-Bite final report</span>
    <span>
      {String(page).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
    </span>
  </div>
);

const Eyebrow = ({ children, color = c.red, delay = 0.06 }: { children: ReactNode; color?: string; delay?: number }) => (
  <div
    className="fade"
    style={{
      color,
      fontSize: 22,
      fontWeight: 900,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      marginBottom: 22,
      animationDelay: `${delay}s`,
    }}
  >
    {children}
  </div>
);

const Title = ({ children, size = 82, width = 1240, delay = 0.14 }: { children: ReactNode; size?: number; width?: number; delay?: number }) => (
  <h1
    className="fade"
    style={{
      margin: 0,
      maxWidth: width,
      fontFamily: 'var(--osd-font-display)',
      fontSize: size,
      lineHeight: 1.06,
      fontWeight: 900,
      animationDelay: `${delay}s`,
    }}
  >
    {children}
  </h1>
);

const Lead = ({ children, width = 1120, delay = 0.26, dark = false }: { children: ReactNode; width?: number; delay?: number; dark?: boolean }) => (
  <p
    className="fade"
    style={{
      margin: '28px 0 0',
      maxWidth: width,
      color: dark ? '#cbd5e1' : c.soft,
      fontSize: 34,
      lineHeight: 1.5,
      animationDelay: `${delay}s`,
    }}
  >
    {children}
  </p>
);

const Small = ({ children, color = c.muted }: { children: ReactNode; color?: string }) => (
  <div style={{ color, fontFamily: font.mono, fontSize: 18, lineHeight: 1.45 }}>{children}</div>
);

const Card = ({ children, delay = 0.2, style }: { children: ReactNode; delay?: number; style?: CSSProperties }) => (
  <div
    className="pop"
    style={{
      background: c.paper,
      border: `1px solid ${c.line}`,
      borderRadius: 'var(--osd-radius)',
      boxShadow: '0 24px 56px -44px rgb(15 23 42 / .55)',
      boxSizing: 'border-box',
      animationDelay: `${delay}s`,
      ...style,
    }}
  >
    {children}
  </div>
);

const Number = ({ value, label, color, delay }: { value: string; label: string; color: string; delay: number }) => (
  <div className="fade" style={{ animationDelay: `${delay}s` }}>
    <div style={{ color, fontFamily: font.mono, fontSize: 76, fontWeight: 900, lineHeight: 1 }}>{value}</div>
    <div style={{ marginTop: 16, color: c.soft, fontSize: 26, fontWeight: 800 }}>{label}</div>
  </div>
);

const Shot = ({ src, label, delay = 0.2 }: { src: string; label: string; delay?: number }) => (
  <Card delay={delay} style={{ padding: 14, height: 300 }}>
    <Small>{label}</Small>
    <img src={src} style={{ marginTop: 10, width: '100%', height: 234, objectFit: 'cover', objectPosition: 'top left', borderRadius: 10, border: `1px solid ${c.line}`, display: 'block' }} />
  </Card>
);

const Step = ({ n, title, body, color, delay }: { n: string; title: string; body: string; color: string; delay: number }) => (
  <div className="fade" style={{ display: 'grid', gridTemplateColumns: '82px 1fr', gap: 26, alignItems: 'start', animationDelay: `${delay}s` }}>
    <div style={{ color, fontFamily: font.mono, fontSize: 44, fontWeight: 900 }}>{n}</div>
    <div>
      <div style={{ fontSize: 36, fontWeight: 900 }}>{title}</div>
      <div style={{ marginTop: 12, color: c.soft, fontSize: 27, lineHeight: 1.48 }}>{body}</div>
    </div>
  </div>
);

const Cover: Page = () => (
  <Slide page={1}>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Eyebrow>T-Bite · final presentation</Eyebrow>
      <Title size={132} width={1420}>
        把混亂需求，變成可驗收的企業訂餐系統
      </Title>
      <Lead width={1040}>我們要講的不是「三個 app 長什麼樣」，而是團隊如何把需求、架構、測試與可靠性串成一條可交付流程。</Lead>
    </div>
  </Slide>
);

const RealBrief: Page = () => (
  <Slide page={2}>
    <Eyebrow>What Jacob kept pulling us back to</Eyebrow>
    <Title size={92}>簡報不是產品導覽，而是評分項目的故事</Title>
    <div style={{ marginTop: 78, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
      <Card style={{ padding: 42, minHeight: 260 }}>
        <div style={{ color: c.muted, fontSize: 24, fontWeight: 800 }}>不該當主線</div>
        <div style={{ marginTop: 20, fontSize: 48, fontWeight: 900 }}>逐頁操作三方流程</div>
      </Card>
      <Card delay={0.32} style={{ padding: 42, minHeight: 260, borderColor: '#fecaca' }}>
        <div style={{ color: c.red, fontSize: 24, fontWeight: 900 }}>真正主線</div>
        <div style={{ marginTop: 20, fontSize: 48, fontWeight: 900 }}>需求轉換與實作是重點</div>
      </Card>
    </div>
  </Slide>
);

const TimeBudget: Page = () => (
  <Slide page={3}>
    <Eyebrow>10 minute report</Eyebrow>
    <Title size={88}>時間分配要跟評分項目對齊</Title>
    <div style={{ marginTop: 76, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, alignItems: 'center' }}>
      <div style={{ display: 'grid', gap: 30 }}>
        {[
          ['4:00', '需求轉換與實作', c.red, 0.22],
          ['2:00', '架構與可擴展性', c.blue, 0.31],
          ['2:00', '測試與驗證', c.green, 0.4],
          ['1:30', '定位與可靠性', c.violet, 0.49],
          ['0:30', 'code / demo evidence', c.amber, 0.58],
        ].map(([time, label, color, delay]) => (
          <Step key={label} n={time as string} title={label as string} body="" color={color as string} delay={delay as number} />
        ))}
      </div>
      <Card delay={0.4} style={{ padding: 44 }}>
        <div style={{ fontSize: 34, lineHeight: 1.5, fontWeight: 800 }}>
          Demo 是證據，
          <br />
          不是簡報本身。
        </div>
        <div style={{ marginTop: 26, color: c.muted, fontSize: 25, lineHeight: 1.5 }}>三方流程實測要拿來支撐「我們有驗證」，而不是佔滿敘事。</div>
      </Card>
    </div>
  </Slide>
);

const RawInputs: Page = () => (
  <Slide page={4}>
    <Eyebrow>Unstructured inputs</Eyebrow>
    <Title size={88}>原始需求一開始不是規格，是一坨混亂訊號</Title>
    <div style={{ marginTop: 82, position: 'relative', height: 520 }}>
      {[
        ['員工', '訂餐', c.blue, 130, 64, 68],
        ['QR 領餐', '追蹤餐點', c.blue, 340, 250, 40],
        ['商家', '菜單 / 數量', c.green, 720, 86, 62],
        ['備餐', '標籤', c.green, 980, 310, 42],
        ['福委會', '治理', c.amber, 1240, 52, 64],
        ['商家進駐', '申訴 / 客訴', c.amber, 1180, 270, 39],
        ['訪談', '會議逐字稿', c.red, 510, 390, 38],
        ['課程評分', '五項指標', c.violet, 850, 430, 34],
      ].map(([a, b, color, x, y, size], index) => (
        <div key={`${a}-${b}`} className="pop" style={{ position: 'absolute', left: x as number, top: y as number, color: color as string, animationDelay: `${0.18 + index * 0.07}s` }}>
          <div style={{ fontSize: size as number, fontWeight: 950, lineHeight: 1 }}>{a}</div>
          <div style={{ marginTop: 12, color: c.soft, fontSize: 24, fontWeight: 800 }}>{b}</div>
        </div>
      ))}
    </div>
  </Slide>
);

const Pipeline: Page = () => (
  <Slide page={5}>
    <Eyebrow>Requirement conversion</Eyebrow>
    <Title size={82}>Jacob 想要的是這條 pipeline</Title>
    <div style={{ marginTop: 82, display: 'grid', gap: 42 }}>
      {[
        ['01', 'Unstructured', '題目頁面、訪談、逐字稿、會議討論', c.muted],
        ['02', 'Structured', '角色、功能性需求、三方任務拆解', c.blue],
        ['03', 'Enriched', '非功能需求、限制條件、架構決策', c.red],
        ['04', 'Implemented', 'AI 生成 initial working codebase，再由團隊收斂', c.green],
      ].map(([n, title, body, color], index) => (
        <Step key={n} n={n as string} title={title as string} body={body as string} color={color as string} delay={0.18 + index * 0.11} />
      ))}
    </div>
  </Slide>
);

const TeamDecision: Page = () => (
  <Slide page={6}>
    <Eyebrow>Not AI magic</Eyebrow>
    <Title size={92}>架構設計，是團隊 enrich 規格的一部分</Title>
    <Lead width={1120}>逐字稿裡最重要的釐清：不是「全部交給 AI 決定」。團隊先把規格補到足以實作，AI 才是加速器。</Lead>
    <div style={{ marginTop: 76, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 28 }}>
      {[
        ['我們決定', '角色邊界、資料語意、企業流程', c.red],
        ['我們限制', '峰值情境、權限、領餐現場物理瓶頸', c.blue],
        ['AI 協作', '生成 codebase、補測試、協助前端修整', c.green],
      ].map(([title, body, color], index) => (
        <Card key={title} delay={0.34 + index * 0.1} style={{ padding: 34, minHeight: 210 }}>
          <div style={{ color: color as string, fontSize: 30, fontWeight: 900 }}>{title}</div>
          <div style={{ marginTop: 20, color: c.soft, fontSize: 28, lineHeight: 1.45 }}>{body}</div>
        </Card>
      ))}
    </div>
  </Slide>
);

const Architecture: Page = () => (
  <Slide page={7}>
    <Eyebrow>Architecture</Eyebrow>
    <Title size={86}>三個入口，共用一個企業訂餐營運核心</Title>
    <div style={{ marginTop: 82, position: 'relative', height: 520 }}>
      <svg width="100%" height="520" viewBox="0 0 1580 520" style={{ position: 'absolute', inset: 0 }}>
        <path className="draw" d="M300 170 H650 M300 260 H650 M300 350 H650 M930 260 H1280" stroke="#94a3b8" strokeWidth="5" fill="none" strokeLinecap="round" style={{ animationDelay: '.28s' }} />
      </svg>
      {[
        ['員工入口', '訂餐 / QR 領餐', 70, 116, c.blue],
        ['商家入口', '菜單 / 備餐', 70, 296, c.green],
        ['福委會入口', '治理 / 稽核', 1210, 206, c.amber],
      ].map(([title, body, x, y, color], index) => (
        <Card key={title} delay={0.18 + index * 0.12} style={{ position: 'absolute', left: x as number, top: y as number, width: 270, padding: 30 }}>
          <div style={{ color: color as string, fontSize: 30, fontWeight: 900 }}>{title}</div>
          <Small>{body}</Small>
        </Card>
      ))}
      <Card delay={0.48} style={{ position: 'absolute', left: 650, top: 138, width: 300, height: 250, padding: 34, borderColor: '#fecaca' }}>
        <div style={{ color: c.red, fontSize: 32, fontWeight: 900 }}>Order Core</div>
        <div style={{ marginTop: 26, color: c.soft, fontSize: 25, lineHeight: 1.5 }}>帳號、訂單、菜單、配額、客訴與稽核共用同一組 domain rules。</div>
      </Card>
    </div>
  </Slide>
);

const Capacity: Page = () => (
  <Slide page={8}>
    <Eyebrow>Scalability argument</Eyebrow>
    <Title size={86}>容量估算從「領餐現場」開始，不是從機器開始</Title>
    <div style={{ marginTop: 88, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 56 }}>
      <Number value="1/s" label="每個領餐點極限服務速度" color={c.red} delay={0.2} />
      <Number value="500" label="每點排隊人數，約 10 分鐘清完" color={c.blue} delay={0.32} />
      <Number value="2-3" label="一次領餐動作需要的 requests" color={c.green} delay={0.44} />
    </div>
    <Card delay={0.56} style={{ marginTop: 78, padding: '32px 42px', display: 'inline-block' }}>
      <div style={{ fontFamily: font.mono, fontSize: 32, color: c.soft }}>peak requests ≈ pickup points × actions/s × requests/action</div>
    </Card>
  </Slide>
);

const Evidence: Page = () => (
  <Slide page={9}>
    <Eyebrow>Implementation evidence</Eyebrow>
    <Title size={84}>畫面只放證據，不讓 screenshot 取代故事</Title>
    <div style={{ marginTop: 70, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 28 }}>
      <Shot src={employeeCatalog} label="employee catalog" delay={0.2} />
      <Shot src={merchantDashboard} label="merchant operations" delay={0.32} />
      <Shot src={adminDashboard} label="admin governance" delay={0.44} />
    </div>
    <Lead width={1180} delay={0.56}>這頁的功能是讓老師相信系統存在，而且三個角色真的被實作；細節留給 demo 或 Q&A。</Lead>
  </Slide>
);

const Verification: Page = () => (
  <Slide page={10}>
    <Eyebrow>Manual validation</Eyebrow>
    <Title size={86}>5/26 三方實測的價值：把假設變成缺陷清單</Title>
    <div style={{ marginTop: 78, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 54 }}>
      <Shot src={employeeOrder} label="employee order evidence" delay={0.18} />
      <div style={{ display: 'grid', gap: 28 }}>
        {[
          ['帳號 / 商家進駐', 'email 欄位語意與 Authentic 啟用流程不清'],
          ['菜單 / 標籤', '商家自由輸入標籤會造成資料混亂'],
          ['QR / 出餐', '訂單識別與現場領餐流程仍需收斂'],
          ['客訴 / 申訴', '升級、結案、角色權限需要更清楚'],
        ].map(([title, body], index) => (
          <Step key={title} n={`0${index + 1}`} title={title} body={body} color={[c.red, c.green, c.blue, c.amber][index]} delay={0.3 + index * 0.1} />
        ))}
      </div>
    </div>
  </Slide>
);

const Testing: Page = () => (
  <Slide page={11}>
    <Eyebrow>Testing and validation</Eyebrow>
    <Title size={88}>測試要說「驗證層次」，不是列工具名</Title>
    <div style={{ marginTop: 88, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
      {[
        ['Unit', 'domain rules'],
        ['Integration', 'API + data flow'],
        ['E2E', '三方旅程'],
        ['Manual', '真實操作驗收'],
      ].map(([title, body], index) => (
        <Card key={title} delay={0.18 + index * 0.1} style={{ padding: 34, minHeight: 230 }}>
          <div style={{ fontFamily: font.mono, color: [c.red, c.blue, c.green, c.amber][index], fontSize: 38, fontWeight: 900 }}>{title}</div>
          <div style={{ marginTop: 30, color: c.soft, fontSize: 28, lineHeight: 1.42 }}>{body}</div>
        </Card>
      ))}
    </div>
    <Lead width={1040} delay={0.64}>5/26 的操作不是即興試玩，而是 end-to-end validation 的人工層。</Lead>
  </Slide>
);

const Observability: Page = () => (
  <Slide page={12} dark>
    <Eyebrow color="#f87171">Observability improvement loop</Eyebrow>
    <Title size={82} width={1320}>讓問題先在 Grafana 上「可見」，再決定要修 dashboard 或修 app</Title>
    <div style={{ marginTop: 74, position: 'relative', height: 456 }}>
      <svg width="100%" height="456" viewBox="0 0 1580 456" style={{ position: 'absolute', inset: 0 }}>
        <path className="draw" d="M270 120 H610 H940 H1240 V300 H940 H610 H270 V120" stroke="#64748b" strokeWidth="5" fill="none" strokeLinecap="round" style={{ animationDelay: '.2s' }} />
      </svg>
      {[
        ['Scenario', '想一個會出問題的情境', 78, 72, '#f87171'],
        ['Workload', '寫 test script 並執行', 440, 72, '#38bdf8'],
        ['Grafana', '看 dashboard 是否看得出問題', 800, 72, '#a78bfa'],
        ['Improve', '看不到就先修 dashboard', 1120, 72, '#fbbf24'],
        ['Fix app', '看得到且嚴重才修 codebase', 800, 280, '#34d399'],
        ['Re-run', '重新跑同一個情境', 440, 280, '#cbd5e1'],
      ].map(([title, body, x, y, color], index) => (
        <div key={title} className="pop" style={{ position: 'absolute', left: x as number, top: y as number, width: 250, minHeight: 118, borderRadius: 18, border: `1px solid ${color}88`, background: '#111827', padding: 24, animationDelay: `${0.22 + index * 0.08}s` }}>
          <div style={{ color: color as string, fontFamily: font.mono, fontSize: 26, fontWeight: 900 }}>{title}</div>
          <div style={{ marginTop: 14, color: '#cbd5e1', fontSize: 22, lineHeight: 1.35 }}>{body}</div>
        </div>
      ))}
    </div>
  </Slide>
);

const Close: Page = () => (
  <Slide page={13}>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Eyebrow>Takeaway</Eyebrow>
      <Title size={118} width={1420}>系統可以還有缺陷，但方法要可驗收</Title>
      <Lead width={1180}>這份報告要讓老師看到：我們不是只做出畫面，而是把需求轉換、架構決策、AI 協作、測試與可觀測性串成一個可反覆改善的工程流程。</Lead>
      <div style={{ marginTop: 58, display: 'flex', gap: 16 }}>
        {['需求可追溯', '架構有理由', '驗證有證據', '可靠性可迭代'].map((item, index) => (
          <Card key={item} delay={0.48 + index * 0.08} style={{ padding: '18px 24px' }}>
            <div style={{ color: [c.red, c.blue, c.green, c.violet][index], fontSize: 24, fontWeight: 900 }}>{item}</div>
          </Card>
        ))}
      </div>
    </div>
  </Slide>
);

export const meta: SlideMeta = {
  title: 'T-Bite Final Report',
};

export default [
  Cover,
  RealBrief,
  TimeBudget,
  RawInputs,
  Pipeline,
  TeamDecision,
  Architecture,
  Capacity,
  Evidence,
  Verification,
  Testing,
  Observability,
  Close,
] satisfies Page[];
