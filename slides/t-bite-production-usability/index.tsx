import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

import adminAudit from './assets/admin-06-audit.png';
import adminDashboard from './assets/admin-02-dashboard.png';
import adminVendors from './assets/admin-03-vendors.png';
import employeeCart from './assets/employee-04-cart-empty.png';
import employeeCatalog from './assets/employee-03-catalog.png';
import employeeOrders from './assets/employee-05-orders.png';
import merchantDashboard from './assets/merchant-02-dashboard.png';
import merchantLabels from './assets/merchant-04-labels.png';
import merchantMenus from './assets/merchant-05-menus.png';
import merchantOrders from './assets/merchant-03-orders.png';

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
    hero: 112,
    body: 30,
  },
  radius: 18,
};

const c = {
  bg: '#f8fafc',
  card: '#ffffff',
  text: '#0f172a',
  soft: '#334155',
  muted: '#64748b',
  line: '#e2e8f0',
  accent: '#dc2626',
  rose: '#e11d48',
  sky: '#0ea5e9',
  green: '#10b981',
  amber: '#f59e0b',
  chip: '#f1f5f9',
};

const font = {
  body: design.fonts.body,
  display: design.fonts.display,
  mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
};

const TOTAL = 8;

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

const styles = `
  @keyframes tb-fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes tb-slideLeft {
    from { opacity: 0; transform: translateX(34px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes tb-slideRight {
    from { opacity: 0; transform: translateX(-34px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes tb-shotIn {
    0% { opacity: 0; transform: translateY(18px) scale(.975); filter: saturate(.7) blur(2px); }
    70% { opacity: 1; transform: translateY(0) scale(1.006); filter: saturate(1) blur(0); }
    100% { opacity: 1; transform: translateY(0) scale(1); filter: saturate(1) blur(0); }
  }
  @keyframes tb-softFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  @keyframes tb-gridDrift {
    from { background-position: 0 0, 0 0; }
    to { background-position: 96px 96px, 96px 96px; }
  }
  @keyframes tb-pulseDot {
    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgb(220 38 38 / .22); }
    50% { transform: scale(1.08); box-shadow: 0 0 0 8px rgb(220 38 38 / 0); }
  }
  @keyframes tb-numberPop {
    0% { opacity: 0; transform: translateY(14px) scale(.92); }
    72% { opacity: 1; transform: translateY(0) scale(1.05); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes tb-scan {
    0% { transform: translateY(-120%); opacity: 0; }
    18% { opacity: .55; }
    55% { opacity: .28; }
    100% { transform: translateY(1200%); opacity: 0; }
  }
  .tb-fadeUp { opacity: 0; animation: tb-fadeUp .78s cubic-bezier(.2,.7,.2,1) forwards; }
  .tb-slideLeft { opacity: 0; animation: tb-slideLeft .82s cubic-bezier(.2,.7,.2,1) forwards; }
  .tb-slideRight { opacity: 0; animation: tb-slideRight .82s cubic-bezier(.2,.7,.2,1) forwards; }
  .tb-shotIn { opacity: 0; animation: tb-shotIn .95s cubic-bezier(.2,.7,.2,1) forwards; }
  .tb-float { animation: tb-softFloat 5.6s ease-in-out infinite; }
  .tb-shotIn.tb-float {
    animation: tb-shotIn .95s cubic-bezier(.2,.7,.2,1) forwards, tb-softFloat 5.6s ease-in-out 1.1s infinite;
  }
  .tb-grid { animation: tb-gridDrift 18s linear infinite; }
  .tb-pulseDot { animation: tb-pulseDot 2.2s ease-in-out infinite; transform-origin: center; }
  .tb-number { opacity: 0; animation: tb-numberPop .72s cubic-bezier(.2,.8,.2,1) forwards; }
  .tb-card {
    transition: transform .24s ease, box-shadow .24s ease, border-color .24s ease;
  }
  .tb-card:hover {
    transform: translateY(-5px);
    border-color: rgb(220 38 38 / .25);
    box-shadow: 0 24px 50px -36px rgb(15 23 42 / .72), 0 12px 24px -18px rgb(220 38 38 / .28);
  }
  .tb-shot {
    transition: transform .28s ease, box-shadow .28s ease;
  }
  .tb-shot:hover { transform: translateY(-4px) scale(1.006); }
  .tb-shot::after {
    content: '';
    position: absolute;
    left: 14px;
    right: 14px;
    top: 48px;
    height: 56px;
    border-radius: 12px;
    background: linear-gradient(180deg, rgb(220 38 38 / 0), rgb(220 38 38 / .16), rgb(220 38 38 / 0));
    pointer-events: none;
    animation: tb-scan 4.8s ease-in-out infinite;
    animation-delay: 1.1s;
  }
  .tb-row { opacity: 0; animation: tb-fadeUp .58s cubic-bezier(.2,.7,.2,1) forwards; }
  @media (prefers-reduced-motion: reduce) {
    .tb-fadeUp, .tb-slideLeft, .tb-slideRight, .tb-shotIn, .tb-float, .tb-grid, .tb-pulseDot, .tb-number, .tb-row, .tb-shot::after {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
`;

const Styles = () => <style>{styles}</style>;

const Brand = ({ size = 54 }: { size?: number }) => (
  <div className="tb-fadeUp" style={{ display: 'inline-flex', alignItems: 'center', gap: 14, animationDelay: '.04s' }}>
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: 18,
        background: 'linear-gradient(135deg, #ef4444, #be123c)',
        color: '#ffffff',
        display: 'grid',
        placeItems: 'center',
        fontSize: Math.round(size * 0.5),
        fontWeight: 900,
      }}
    >
      T
      <span
        style={{
          position: 'absolute',
          right: -3,
          bottom: -3,
          width: 14,
          height: 14,
          borderRadius: 999,
          background: '#fbbf24',
          border: '3px solid #ffffff',
        }}
      />
    </div>
    <div style={{ lineHeight: 1 }}>
      <div style={{ color: c.text, fontSize: 28, fontWeight: 900 }}>
        T-Bite<span style={{ color: c.accent }}>.</span>
      </div>
      <div style={{ marginTop: 5, color: c.muted, fontSize: 12, fontWeight: 800, letterSpacing: '0.18em' }}>
        CORPORATE CATERING
      </div>
    </div>
  </div>
);

const Footer = ({ page }: { page: number }) => (
  <div
    className="tb-fadeUp"
    style={{
      position: 'absolute',
      left: 96,
      right: 96,
      bottom: 34,
      display: 'flex',
      justifyContent: 'space-between',
      color: c.muted,
      fontFamily: font.mono,
      fontSize: 17,
      zIndex: 3,
      animationDelay: '.72s',
    }}
  >
    <span>T-Bite production usability study · Chrome e2e observation</span>
    <span>
      {String(page).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
    </span>
  </div>
);

const Slide = ({ page, children }: { page: number; children: ReactNode }) => (
  <section style={{ ...fill, padding: '86px 96px 82px' }}>
    <Styles />
    <div
      className="tb-grid"
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage:
          'linear-gradient(rgba(226,232,240,.65) 1px, transparent 1px), linear-gradient(90deg, rgba(226,232,240,.65) 1px, transparent 1px)',
        backgroundSize: '96px 96px',
        opacity: 0.24,
      }}
    />
    <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>{children}</div>
    <Footer page={page} />
  </section>
);

const Eyebrow = ({ children, delay = 0.06 }: { children: ReactNode; delay?: number }) => (
  <div
    className="tb-fadeUp"
    style={{ color: c.accent, fontSize: 20, fontWeight: 900, letterSpacing: '0.18em', marginBottom: 14, animationDelay: `${delay}s` }}
  >
    {children}
  </div>
);

const Title = ({ children, size = 70, width = 1260, delay = 0.16 }: { children: ReactNode; size?: number; width?: number; delay?: number }) => (
  <h1
    className="tb-fadeUp"
    style={{ margin: 0, maxWidth: width, fontFamily: font.display, fontSize: size, lineHeight: 1.08, fontWeight: 900, animationDelay: `${delay}s` }}
  >
    {children}
  </h1>
);

const Lead = ({ children, width = 1200, delay = 0.28 }: { children: ReactNode; width?: number; delay?: number }) => (
  <p className="tb-fadeUp" style={{ margin: '20px 0 0', maxWidth: width, color: c.soft, fontSize: 30, lineHeight: 1.45, animationDelay: `${delay}s` }}>
    {children}
  </p>
);

const Card = ({ children, style, className = 'tb-fadeUp', delay = 0.34 }: { children: ReactNode; style?: CSSProperties; className?: string; delay?: number }) => (
  <div
    className={`tb-card ${className}`}
    style={{
      background: c.card,
      border: `1px solid ${c.line}`,
      borderRadius: 'var(--osd-radius)',
      boxShadow: '0 20px 44px -36px rgb(15 23 42 / .55)',
      boxSizing: 'border-box',
      animationDelay: `${delay}s`,
      ...style,
    }}
  >
    {children}
  </div>
);

const Pill = ({ children, color = c.accent, delay = 0.42 }: { children: ReactNode; color?: string; delay?: number }) => (
  <span
    className="tb-fadeUp"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      minHeight: 34,
      padding: '0 12px',
      borderRadius: 8,
      background: `${color}18`,
      border: `1px solid ${color}55`,
      color,
      fontSize: 17,
      fontWeight: 850,
      whiteSpace: 'nowrap',
      animationDelay: `${delay}s`,
    }}
  >
    {children}
  </span>
);

const Shot = ({ src, label, style, delay = 0.34, float = false }: { src: string; label: string; style?: CSSProperties; delay?: number; float?: boolean }) => (
  <Card className={`tb-shot tb-shotIn${float ? ' tb-float' : ''}`} delay={delay} style={{ position: 'relative', padding: 14, ...style }}>
    <div
      style={{
        height: 34,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        color: c.muted,
        fontSize: 15,
        fontFamily: font.mono,
      }}
    >
      <span className="tb-pulseDot" style={{ width: 10, height: 10, borderRadius: 99, background: c.rose }} />
      <span style={{ width: 10, height: 10, borderRadius: 99, background: c.amber }} />
      <span style={{ width: 10, height: 10, borderRadius: 99, background: c.green }} />
      <span style={{ marginLeft: 10 }}>{label}</span>
    </div>
    <img
      src={src}
      style={{
        width: '100%',
        height: 'calc(100% - 34px)',
        objectFit: 'cover',
        objectPosition: 'top left',
        borderRadius: 12,
        border: `1px solid ${c.line}`,
        display: 'block',
      }}
    />
  </Card>
);

const TinyList = ({ items }: { items: ReactNode[] }) => (
  <ul style={{ margin: 0, paddingLeft: 28, color: c.soft, fontSize: 23, lineHeight: 1.42 }}>
    {items.map((item, index) => (
      <li key={index} className="tb-row" style={{ marginBottom: 10, animationDelay: `${0.42 + index * 0.08}s` }}>
        {item}
      </li>
    ))}
  </ul>
);

const Metric = ({ value, label, color = c.accent, delay = 0.34 }: { value: string; label: string; color?: string; delay?: number }) => (
  <Card delay={delay} style={{ padding: 24, minHeight: 130 }}>
    <div className="tb-number" style={{ color, fontFamily: font.mono, fontSize: 48, fontWeight: 900, lineHeight: 1, animationDelay: `${delay + 0.18}s` }}>
      {value}
    </div>
    <div style={{ marginTop: 12, color: c.soft, fontSize: 23, fontWeight: 750 }}>{label}</div>
  </Card>
);

const Cover: Page = () => (
  <Slide page={1}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Brand />
      <Pill>Production · 2026-05-26</Pill>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 650px', gap: 62, alignItems: 'center', height: 790 }}>
      <div>
        <Eyebrow>TSMC enterprise lunch ordering scenario</Eyebrow>
        <Title size={92} width={1060}>
          T-Bite production 端到端易用性分析
        </Title>
        <Lead>
          以台積電企業內部午餐訂餐、商家備餐、福委會治理為情境，使用 Chrome 實際走查三個角色入口並產出可簡報的素材包。
        </Lead>
        <div style={{ display: 'flex', gap: 12, marginTop: 34 }}>
          <Pill color={c.sky} delay={0.44}>員工訂餐</Pill>
          <Pill color={c.green} delay={0.52}>商家備餐</Pill>
          <Pill color={c.amber} delay={0.6}>福委會治理</Pill>
        </div>
      </div>
      <div style={{ position: 'relative', height: 610 }}>
        <Shot src={employeeCatalog} label="Employee menu catalog" delay={0.4} float style={{ position: 'absolute', inset: '0 90px 160px 0' }} />
        <Shot src={merchantDashboard} label="Merchant prep dashboard" delay={0.62} float style={{ position: 'absolute', inset: '160px 0 0 120px' }} />
      </div>
    </div>
  </Slide>
);

const ExecutiveSummary: Page = () => (
  <Slide page={2}>
    <Eyebrow>Executive summary</Eyebrow>
    <Title>三端主流程已成形，企業可信度取決於治理證據與空狀態說明</Title>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22, marginTop: 38 }}>
      <Metric value="3" label="角色入口均可進入核心工作台" delay={0.32} />
      <Metric value="150" label="員工端今日可瀏覽餐點數" color={c.sky} delay={0.42} />
      <Metric value="1200" label="商家端每日備餐上限呈現清楚" color={c.green} delay={0.52} />
      <Metric value="10" label="福委會端已核准商家可治理" color={c.amber} delay={0.62} />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 28, marginTop: 32 }}>
      <Card delay={0.72} style={{ padding: 30 }}>
        <h2 style={{ margin: 0, fontSize: 34 }}>優點</h2>
        <TinyList
          items={[
            '資訊架構按角色分工清楚：訂餐、備餐、治理各自有獨立入口與專屬語彙。',
            '員工端能快速理解日期、廠區、餐點、薪資代扣與截單後修改規則。',
            '商家端把未來 7 天排菜、上限、已訂購、標籤與對帳放在同一營運脈絡。',
            '福委會端具備商家審核、薪資代扣、告警與 append-only 稽核的企業治理語言。',
          ]}
        />
      </Card>
      <Card delay={0.82} style={{ padding: 30 }}>
        <h2 style={{ margin: 0, fontSize: 34 }}>主要風險</h2>
        <TinyList
          items={[
            'production 測試資料多為 0 筆或空狀態，簡報時需補足成功樣例或示意資料。',
            '高風險操作按鈕與唯讀檢視混在同一畫面，易造成誤觸。',
            '部分數字缺少定義，例如今日份數 1200 但廠區為 0，企業客戶會追問口徑。',
            '稽核、HR CSV、結算等企業關鍵證據目前畫面偏空，需要展示可驗證樣本。',
          ]}
        />
      </Card>
    </div>
  </Slide>
);

const EmployeeStoryboard: Page = () => (
  <Slide page={3}>
    <div style={{ display: 'grid', gridTemplateColumns: '585px 1fr', gap: 34, height: 870 }}>
      <div>
        <Eyebrow>Storyboard 01 · 員工訂餐</Eyebrow>
        <Title size={58}>台積電員工在中午前預訂午餐</Title>
        <Lead width={550}>目標是在熟悉廠區與取餐日後，快速選餐並確認薪資代扣，不改動 production 訂單資料。</Lead>
        <Card delay={0.42} style={{ padding: 26, marginTop: 28 }}>
          <TinyList
            items={[
              '情境：員工在 hc-12a-1f 查找今天或未來 7 天午餐。',
              '步驟：進入首頁 → 選日期與健康標籤 → 檢查餐點與購物車 → 查看我的訂單。',
              '感受：餐點數、價格、取餐時段與薪資代扣明確，能建立日常使用信心。',
              '摩擦：標籤數量很多；空購物車直接佔據側欄，可能壓縮餐點瀏覽。',
              '企業價值：降低訂餐溝通成本，將午餐支出與薪資代扣串成可追蹤流程。',
            ]}
          />
        </Card>
        <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
          <Pill color={c.sky} delay={0.86}>assets/employee-03-catalog.png</Pill>
          <Pill color={c.sky} delay={0.94}>assets/employee-04-cart-empty.png</Pill>
          <Pill color={c.sky} delay={1.02}>assets/employee-05-orders.png</Pill>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateRows: '1fr 230px', gap: 18 }}>
        <Shot src={employeeCatalog} label="150 items, 7-day preorder, tags and pickup site" delay={0.36} float />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          <Shot src={employeeCart} label="Payroll-deduction cart, submit disabled at 0 items" delay={0.56} />
          <Shot src={employeeOrders} label="Order center, no active orders" delay={0.68} />
        </div>
      </div>
    </div>
  </Slide>
);

const MerchantStoryboard: Page = () => (
  <Slide page={4}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 610px', gap: 34, height: 870 }}>
      <div style={{ display: 'grid', gridTemplateRows: '1fr 246px', gap: 18 }}>
        <Shot src={merchantDashboard} label="7-day meal schedule and prep capacity" delay={0.34} float />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18 }}>
          <Shot src={merchantOrders} label="Prep board" delay={0.52} />
          <Shot src={merchantLabels} label="Meal labels" delay={0.64} />
          <Shot src={merchantMenus} label="Menu library" delay={0.76} />
        </div>
      </div>
      <div>
        <Eyebrow>Storyboard 02 · 商家備餐</Eyebrow>
        <Title size={56}>商家確認明日菜單與備餐輸出</Title>
        <Lead width={590}>目標是看懂今日營運、未來排菜、餐點貼紙與菜單庫，支援大量企業訂單備餐。</Lead>
        <Card delay={0.48} style={{ padding: 26, marginTop: 28 }}>
          <TinyList
            items={[
              '情境：便當商家在前一日 17:00 前確認隔日供應菜色與上限。',
              '步驟：看儀表板 → 檢查 7 天排菜 → 進備餐看板 → 檢查貼紙 → 看菜單庫。',
              '感受：上限與已訂購並列，能掌握產能；貼紙與配送輸出符合實務作業。',
              '摩擦：調整上限、標記缺貨、移除與唯讀資訊同頁，缺少明顯風險分層。',
              '企業價值：讓商家以固定節奏接單、備餐、標籤化出餐，降低園區午餐尖峰混亂。',
            ]}
          />
        </Card>
      </div>
    </div>
  </Slide>
);

const AdminStoryboard: Page = () => (
  <Slide page={5}>
    <div style={{ display: 'grid', gridTemplateColumns: '580px 1fr', gap: 34, height: 870 }}>
      <div>
        <Eyebrow>Storyboard 03 · 福委會治理</Eyebrow>
        <Title size={56}>福委會監控商家、扣款與稽核</Title>
        <Lead width={560}>目標是從治理總覽進入商家管理、薪資代扣、告警與稽核紀錄，判斷是否能支撐企業導入。</Lead>
        <Card delay={0.42} style={{ padding: 26, marginTop: 28 }}>
          <TinyList
            items={[
              '情境：企業內部治理單位檢查午餐服務商家與結算風險。',
              '步驟：看治理總覽 → 檢查商家清單 → 看薪資代扣 → 看告警 → 看稽核。',
              '感受：治理框架完整，能回答誰可服務哪些廠區、是否有告警與操作紀錄。',
              '摩擦：多個企業關鍵頁目前為空狀態；商家服務廠區欄過長，掃描效率低。',
              '企業價值：把供應商、HR 扣款、異常與稽核集中，符合大型企業採購與內控需求。',
            ]}
          />
        </Card>
        <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
          <Pill color={c.amber} delay={0.86}>vendors</Pill>
          <Pill color={c.amber} delay={0.94}>payroll</Pill>
          <Pill color={c.amber} delay={1.02}>anomalies</Pill>
          <Pill color={c.amber} delay={1.1}>audit</Pill>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateRows: '1fr 248px', gap: 18 }}>
        <Shot src={adminDashboard} label="Governance overview" delay={0.36} float />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          <Shot src={adminVendors} label="Vendor governance list" delay={0.56} />
          <Shot src={adminAudit} label="Append-only audit log filters" delay={0.68} />
        </div>
      </div>
    </div>
  </Slide>
);

const AnalysisMatrix: Page = () => {
  const rows = [
    ['資訊架構', '角色分離清楚；主詞符合工作場景', '跨角色資料口徑需更一致'],
    ['導覽', '左側導覽穩定，入口可預期', '行動優先任務與低頻治理任務權重接近'],
    ['表單', '搜尋、篩選、日期、狀態控制完整', '建立與提交類操作缺少前置風險提示'],
    ['錯誤處理', '空狀態多有文字說明', '缺少下一步、範例資料與異常原因指引'],
    ['角色權限', '三端權限邊界清楚', '高權限按鈕可見但缺少確認層次展示'],
    ['資料理解', '價格、上限、訂購數、截單時間具體', '0 筆與 1200 份等口徑需補註解'],
    ['行動效率', '常用入口短，商家輸出鏈完整', '長清單與大量標籤需要更強排序與摘要'],
    ['導入可信度', '稽核、對帳、告警、薪扣均有框架', '需要展示實際批次、匯出與審核證據'],
  ];
  return (
    <Slide page={6}>
      <Eyebrow>Usability analysis</Eyebrow>
      <Title>易用性分析矩陣</Title>
      <Card style={{ marginTop: 34, padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '210px 1fr 1fr', background: c.chip, color: c.text, fontWeight: 900, fontSize: 24 }}>
          <div style={{ padding: '20px 24px' }}>面向</div>
          <div style={{ padding: '20px 24px' }}>觀察到的優勢</div>
          <div style={{ padding: '20px 24px' }}>企業導入前需補強</div>
        </div>
        {rows.map(([area, strength, risk], index) => (
          <div
            key={area}
            className="tb-row"
            style={{
              display: 'grid',
              gridTemplateColumns: '210px 1fr 1fr',
              borderTop: `1px solid ${c.line}`,
              background: index % 2 ? '#ffffff' : '#fbfdff',
              fontSize: 21,
              lineHeight: 1.32,
              animationDelay: `${0.38 + index * 0.07}s`,
            }}
          >
            <div style={{ padding: '18px 24px', color: c.accent, fontWeight: 900 }}>{area}</div>
            <div style={{ padding: '18px 24px', color: c.soft }}>{strength}</div>
            <div style={{ padding: '18px 24px', color: c.soft }}>{risk}</div>
          </div>
        ))}
      </Card>
    </Slide>
  );
};

const Risks: Page = () => (
  <Slide page={7}>
    <Eyebrow>Risks and recommendations</Eyebrow>
    <Title>風險與改善建議，依嚴重度排序</Title>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 34 }}>
      {[
        ['P0', 'production 操作防護', '建立／下單／調整上限／移除等動作需要二階確認、明確環境標記與取消路徑。'],
        ['P1', '企業證據樣本不足', '準備可展示的非 production 樣本：成功訂單、貼紙、HR CSV、結算批次、稽核事件。'],
        ['P1', '資料口徑不夠自明', '為今日份數、廠區數、準時率、0 筆狀態補上定義、時間範圍與資料來源。'],
        ['P2', '長清單掃描效率', '商家服務廠區與餐點標籤需要摘要、群組、搜尋結果數與已選條件提示。'],
        ['P2', '空狀態說服力', '空狀態除了說明，也應給「下一步」與示例，避免企業客戶誤判為未完成。'],
        ['P3', '角色間敘事銜接', '建立跨角色 demo day：員工預訂如何變成商家備餐與福委會薪扣／稽核證據。'],
      ].map(([sev, title, body], index) => (
        <Card key={title} delay={0.34 + index * 0.09} style={{ padding: 28, minHeight: 184 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Pill color={sev === 'P0' ? c.rose : sev === 'P1' ? c.accent : c.sky} delay={0.42 + index * 0.09}>{sev}</Pill>
            <h2 style={{ margin: 0, fontSize: 32, lineHeight: 1.1 }}>{title}</h2>
          </div>
          <p style={{ margin: '18px 0 0', color: c.soft, fontSize: 25, lineHeight: 1.42 }}>{body}</p>
        </Card>
      ))}
    </div>
  </Slide>
);

const SlideOutline: Page = () => (
  <Slide page={8}>
    <Eyebrow>Enterprise deck material</Eyebrow>
    <Title>可放進台積電企業簡報的 7 張 slide 大綱</Title>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 520px', gap: 32, marginTop: 34, height: 700 }}>
      <Card delay={0.36} style={{ padding: 30 }}>
        <ol style={{ margin: 0, paddingLeft: 34, color: c.soft, fontSize: 25, lineHeight: 1.44 }}>
          {[
            '企業午餐服務總覽：三角色如何形成閉環。',
            '員工訂餐旅程：7 日預訂、健康標籤、薪資代扣。',
            '商家備餐旅程：排菜、上限、貼紙、備餐看板。',
            '福委會治理旅程：商家審核、薪扣、告警、稽核。',
            '易用性亮點：角色清楚、企業語彙完整、營運資料具體。',
            '導入風險與改善路線：防誤觸、樣本資料、資料口徑。',
            '下一步 demo plan：用 staging 串起真實下單到治理證據。',
          ].map((item, index) => (
            <li key={item} className="tb-row" style={{ animationDelay: `${0.5 + index * 0.08}s` }}>
              {item}
            </li>
          ))}
        </ol>
      </Card>
      <Card delay={0.52} style={{ padding: 28 }}>
        <h2 style={{ margin: 0, fontSize: 32 }}>截圖清單與用途</h2>
        <div style={{ marginTop: 18, display: 'grid', gap: 10, fontSize: 20, color: c.soft, lineHeight: 1.28 }}>
          {[
            ['employee-03-catalog', '員工首頁、150 項餐點、日期與標籤。'],
            ['employee-04-cart-empty', '薪資代扣購物車與送出禁用狀態。'],
            ['employee-05-orders', '我的訂單與修改取消規則。'],
            ['merchant-02-dashboard', '今日營運與未來 7 天排菜。'],
            ['merchant-03-orders', '備餐看板與分區輸出。'],
            ['merchant-04-labels', '餐點貼紙匯出場景。'],
            ['merchant-05-menus', '菜單庫與上架狀態。'],
            ['admin-02/03/06', '治理總覽、商家管理、稽核紀錄。'],
          ].map(([name, body], index) => (
            <div key={name} className="tb-row" style={{ animationDelay: `${0.62 + index * 0.06}s` }}>
              <b>{name}</b>：{body}
            </div>
          ))}
        </div>
      </Card>
    </div>
  </Slide>
);

export const meta: SlideMeta = {
  title: 'T-Bite production usability study',
  theme: 't-bite-enterprise',
};

export default [
  Cover,
  ExecutiveSummary,
  EmployeeStoryboard,
  MerchantStoryboard,
  AdminStoryboard,
  AnalysisMatrix,
  Risks,
  SlideOutline,
] satisfies Page[];
