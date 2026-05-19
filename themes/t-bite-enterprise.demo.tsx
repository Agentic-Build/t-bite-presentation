import type { DesignSystem, Page } from '@open-slide/core';
import { useEffect, useState } from 'react';
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

const color = {
  bg: '#f8fafc',
  text: '#0f172a',
  body: '#334155',
  muted: '#64748b',
  faint: '#94a3b8',
  card: '#ffffff',
  chip: '#f1f5f9',
  border: '#e2e8f0',
  red: '#dc2626',
  redHi: '#b91c1c',
  rose: '#e11d48',
  amber: '#fbbf24',
  green: '#10b981',
  sky: '#0ea5e9',
};

const font = {
  sans: '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
};

const fill: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  boxSizing: 'border-box',
  overflow: 'hidden',
  background: color.bg,
  color: color.text,
  fontFamily: font.sans,
  letterSpacing: 0,
};

const motionStyles = `
@keyframes tbiteFadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes tbiteSlideIn {
  from { opacity: 0; transform: translateX(var(--tbite-slide-x, 24px)); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes tbitePopIn {
  0% { opacity: 0; transform: translateY(6px) scale(.92); }
  72% { opacity: 1; transform: translateY(0) scale(1.04); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes tbitePulseDot {
  0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgb(220 38 38 / 0.28); }
  50% { transform: scale(1.08); box-shadow: 0 0 0 9px rgb(220 38 38 / 0); }
}

@keyframes tbiteImageReveal {
  from { opacity: 0; transform: translateY(10px) scale(1.04); filter: saturate(.72); }
  to { opacity: 1; transform: translateY(0) scale(1); filter: saturate(1); }
}

@keyframes tbiteProgressFill {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

@keyframes tbiteRowCascade {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes tbitePressHint {
  0%, 100% { transform: scale(1); }
  46% { transform: scale(.96); }
}

.tbite-fade-up {
  opacity: 0;
  animation: tbiteFadeUp 0.72s cubic-bezier(.2, .7, .2, 1) forwards;
  will-change: opacity, transform;
}

.tbite-slide-in {
  opacity: 0;
  animation: tbiteSlideIn 0.68s cubic-bezier(.2, .7, .2, 1) forwards;
  will-change: opacity, transform;
}

.tbite-pop-in {
  opacity: 0;
  animation: tbitePopIn 0.52s cubic-bezier(.2, .8, .2, 1) forwards;
  transform-origin: center;
  will-change: opacity, transform;
}

.tbite-card-lift {
  transition: transform .24s ease, box-shadow .24s ease, border-color .24s ease;
}

.tbite-card-lift:hover {
  transform: translateY(-6px);
  border-color: rgb(220 38 38 / .22);
  box-shadow: 0 18px 32px -22px rgb(15 23 42 / .34), 0 8px 18px -12px rgb(220 38 38 / .2);
}

.tbite-image-reveal {
  opacity: 0;
  animation: tbiteImageReveal .78s cubic-bezier(.2, .7, .2, 1) forwards;
  overflow: hidden;
}

.tbite-progress-fill {
  transform: scaleX(0);
  transform-origin: left center;
  animation: tbiteProgressFill .9s cubic-bezier(.2, .7, .2, 1) forwards;
}

.tbite-pulse-dot {
  animation: tbitePulseDot 1.6s ease-in-out infinite;
}

.tbite-row {
  opacity: 0;
  animation: tbiteRowCascade .56s cubic-bezier(.2, .7, .2, 1) forwards;
}

.tbite-press {
  transition: transform .16s ease, box-shadow .16s ease;
}

.tbite-press:hover {
  transform: translateY(-1px);
}

.tbite-press:active {
  transform: scale(.96);
}

.tbite-press-demo {
  animation: tbitePressHint 1.6s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .tbite-fade-up,
  .tbite-slide-in,
  .tbite-pop-in {
    opacity: 1;
    animation: none;
    transform: none;
  }

  .tbite-image-reveal,
  .tbite-progress-fill,
  .tbite-row {
    opacity: 1;
    animation: none;
    transform: none;
  }

  .tbite-pulse-dot,
  .tbite-press-demo {
    animation: none;
  }
}
`;

const FadeUp = ({ children, delay = 0, style }: { children: ReactNode; delay?: number; style?: CSSProperties }) => (
  <div className="tbite-fade-up" style={{ animationDelay: `${delay}s`, ...style }}>
    {children}
  </div>
);

const PopIn = ({ children, delay = 0, style }: { children: ReactNode; delay?: number; style?: CSSProperties }) => (
  <span className="tbite-pop-in" style={{ display: 'inline-flex', animationDelay: `${delay}s`, ...style }}>
    {children}
  </span>
);

const SlideIn = ({ children, delay = 0, from = 'right', style }: { children: ReactNode; delay?: number; from?: 'left' | 'right'; style?: CSSProperties }) => (
  <div
    className="tbite-slide-in"
    style={{
      '--tbite-slide-x': from === 'left' ? '-28px' : '28px',
      animationDelay: `${delay}s`,
      ...style,
    } as CSSProperties}
  >
    {children}
  </div>
);

const CountUp = ({ value, suffix = '', delay = 0 }: { value: number; suffix?: string; delay?: number }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      let frame = 0;
      const frames = 42;
      const tick = () => {
        frame += 1;
        const progress = 1 - Math.pow(1 - frame / frames, 3);
        setCurrent(Math.round(value * progress));
        if (frame < frames) window.requestAnimationFrame(tick);
      };
      window.requestAnimationFrame(tick);
    }, delay * 1000);

    return () => window.clearTimeout(timeout);
  }, [delay, value]);

  return <>{current}{suffix}</>;
};

const PulseDot = ({ tone = color.red, delay = 0 }: { tone?: string; delay?: number }) => (
  <span
    className="tbite-pulse-dot"
    style={{ width: 9, height: 9, borderRadius: 999, background: tone, animationDelay: `${delay}s` }}
  />
);

const Title = ({ children, width = 1260, size = 76 }: { children: ReactNode; width?: number; size?: number }) => (
  <h1
    style={{
      margin: 0,
      maxWidth: width,
      color: '#0f172a',
      fontFamily: '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", system-ui, sans-serif',
      fontSize: size,
      lineHeight: 1.08,
      fontWeight: 900,
      letterSpacing: 0,
    }}
  >
    {children}
  </h1>
);

const Footer = ({ pageNum, total }: { pageNum: number; total: number }) => (
  <div
    style={{
      position: 'absolute',
      left: 112,
      right: 112,
      bottom: 42,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#64748b',
      fontFamily: '"JetBrains Mono", ui-monospace, Menlo, Consolas, monospace',
      fontSize: 18,
    }}
  >
    <span>T-Bite · Corporate Catering</span>
    <span>{String(pageNum).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
  </div>
);

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      color: '#dc2626',
      fontSize: 22,
      fontWeight: 800,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      marginBottom: 14,
    }}
  >
    {children}
  </div>
);

const Brand = ({ size = 54 }: { size?: number }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: 20,
        background: 'linear-gradient(135deg, #ef4444, #be123c)',
        color: '#ffffff',
        display: 'grid',
        placeItems: 'center',
        fontSize: Math.round(size * 0.5),
        fontWeight: 900,
        boxShadow: '0 1px 2px 0 rgb(15 23 42 / 0.06)',
      }}
    >
      T
      <span style={{ position: 'absolute', right: -3, bottom: -3, width: 14, height: 14, borderRadius: 999, background: '#fbbf24', border: '3px solid #ffffff' }} />
    </div>
    <div style={{ lineHeight: 1 }}>
      <div style={{ color: '#0f172a', fontSize: 28, fontWeight: 900, letterSpacing: 0 }}>
        T-Bite<span style={{ color: '#dc2626' }}>.</span>
      </div>
      <div style={{ marginTop: 5, color: '#64748b', fontSize: 12, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
        Corporate Catering
      </div>
    </div>
  </div>
);

const Shell = ({ pageNum, children }: { pageNum: number; children: ReactNode }) => (
  <section style={{ ...fill, padding: 96 }}>
    <style>{motionStyles}</style>
    {children}
    <Footer pageNum={pageNum} total={4} />
  </section>
);

const Header = () => (
  <div
    style={{
      height: 82,
      borderRadius: 22,
      background: 'rgba(255,255,255,0.96)',
      border: `1px solid ${color.border}`,
      boxShadow: '0 4px 12px -2px rgb(15 23 42 / 0.08), 0 2px 4px -2px rgb(15 23 42 / 0.06)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 26px',
      gap: 24,
    }}
  >
    <Brand size={42} />
    <div style={{ marginLeft: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
      <Pill>F12B · 3F</Pill>
      <Pill>今天</Pill>
    </div>
    <div
      style={{
        marginLeft: 'auto',
        width: 360,
        height: 42,
        borderRadius: 999,
        background: color.chip,
        color: color.faint,
        display: 'flex',
        alignItems: 'center',
        padding: '0 18px',
        fontSize: 18,
        gap: 10,
      }}
    >
      <PulseDot tone={color.green} />
      搜尋餐廳或餐點...
    </div>
  </div>
);

const Pill = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      borderRadius: 999,
      background: color.chip,
      color: color.body,
      padding: '10px 16px',
      fontSize: 18,
      fontWeight: 700,
      border: `1px solid ${color.border}`,
    }}
  >
    {children}
  </span>
);

const Card = ({ children, style, className }: { children: ReactNode; style?: CSSProperties; className?: string }) => (
  <div
    className={className}
    style={{
      borderRadius: 20,
      background: color.card,
      border: `1px solid ${color.border}`,
      boxShadow: '0 1px 2px 0 rgb(15 23 42 / 0.06)',
      padding: 28,
      boxSizing: 'border-box',
      ...style,
    }}
  >
    {children}
  </div>
);

const StateTag = ({ children, tone = color.red, delay = 0 }: { children: ReactNode; tone?: string; delay?: number }) => (
  <span
    className="tbite-pop-in"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      borderRadius: 999,
      border: `1px solid ${tone}33`,
      background: `${tone}12`,
      color: tone,
      padding: '6px 12px',
      fontSize: 17,
      fontWeight: 800,
      animationDelay: `${delay}s`,
    }}
  >
    <span style={{ width: 7, height: 7, borderRadius: 999, background: tone }} />
    {children}
  </span>
);

const MealCard = ({ vendor, meal, price, tone = color.red }: { vendor: string; meal: string; price: string; tone?: string }) => (
  <div
    className="tbite-card-lift"
    style={{
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 20,
      background: '#ffffff',
      border: `1px solid ${color.border}`,
      boxShadow: '0 1px 2px 0 rgb(15 23 42 / 0.06)',
      minHeight: 310,
    }}
  >
    <div className="tbite-image-reveal" style={{ height: 140, background: `linear-gradient(135deg, ${tone}18, ${color.amber}22)`, display: 'grid', placeItems: 'center', color: color.faint, fontSize: 18, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', animationDelay: '0.18s' }}>
      No image
    </div>
    <div style={{ padding: 22 }}>
      <div style={{ color: color.muted, fontSize: 16, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase' }}>{vendor}</div>
      <div style={{ marginTop: 8, color: color.text, fontSize: 27, fontWeight: 900, lineHeight: 1.18 }}>{meal}</div>
      <div style={{ marginTop: 10, color: color.text, fontFamily: font.mono, fontSize: 28, fontWeight: 900 }}>{price}</div>
      <div style={{ marginTop: 10, color: color.muted, fontSize: 18 }}>領餐：11:50-12:10</div>
      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <StateTag tone={color.green} delay={0.9}>可薪資代扣</StateTag>
      </div>
    </div>
    <div style={{ position: 'absolute', right: 18, bottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
      <button className="tbite-press" style={{ width: 34, height: 34, borderRadius: 999, border: `1px solid ${color.border}`, background: '#ffffff', color: color.body, fontSize: 22, fontWeight: 900 }}>-</button>
      <span style={{ fontFamily: font.mono, fontSize: 20, fontWeight: 800 }}>0</span>
      <button className="tbite-press tbite-press-demo" style={{ width: 34, height: 34, borderRadius: 999, border: `1px solid ${color.red}`, background: color.red, color: '#ffffff', fontSize: 22, fontWeight: 900 }}>+</button>
    </div>
  </div>
);

const Cover: Page = () => (
  <Shell pageNum={1}>
    <FadeUp delay={0.05}>
      <Brand />
    </FadeUp>
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 520px', gap: 68, alignItems: 'center', height: 820 }}>
      <div style={{ minWidth: 0 }}>
        <FadeUp delay={0.18}>
          <Eyebrow>Employee · 員工訂餐</Eyebrow>
        </FadeUp>
        <FadeUp delay={0.3}>
          <Title size={116}>把每天午餐變成清楚、可追蹤的企業流程</Title>
        </FadeUp>
        <FadeUp delay={0.44}>
          <p style={{ margin: '28px 0 0', maxWidth: 980, color: color.muted, fontSize: 34, lineHeight: 1.5 }}>
            這個 theme 直接取自目前 T-Bite app 的紅色品牌、淺色表面、圓角卡片、狀態標籤與中文優先排版。
          </p>
        </FadeUp>
      </div>
      <FadeUp delay={0.58}>
        <Card className="tbite-card-lift" style={{ padding: 34 }}>
          <Eyebrow>登入卡片</Eyebrow>
          <Title size={46} width={420}>歡迎回來</Title>
          <p style={{ margin: '12px 0 28px', color: color.muted, fontSize: 24, lineHeight: 1.45 }}>使用公司 SSO 帳號登入即可開始預訂午餐。</p>
          <div className="tbite-press" style={{ height: 52, borderRadius: 10, background: color.red, color: '#ffffff', display: 'grid', placeItems: 'center', fontSize: 20, fontWeight: 800 }}>使用 Authentik 登入</div>
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <StateTag tone={color.green} delay={0.78}>SSO Ready</StateTag>
            <StateTag tone={color.sky} delay={0.9}>企業帳號</StateTag>
          </div>
        </Card>
      </FadeUp>
    </div>
  </Shell>
);

const ProductSurface: Page = () => (
  <Shell pageNum={2}>
    <FadeUp delay={0.05}>
      <Header />
    </FadeUp>
    <div style={{ display: 'grid', gridTemplateColumns: '260px minmax(0, 1fr)', gap: 30, marginTop: 34 }}>
      <SlideIn from="left" delay={0.16}>
        <Card style={{ padding: 22, height: 720 }}>
          {['今日首頁', '我的訂單', '我的常點', '我的客訴', '申訴'].map((item, index) => (
            <div
              key={item}
              style={{
                borderRadius: 14,
                background: index === 0 ? '#fee2e2' : 'transparent',
                color: index === 0 ? color.redHi : color.body,
                padding: '16px 18px',
                fontSize: 22,
                fontWeight: 800,
                marginBottom: 8,
              }}
            >
              {item}
            </div>
          ))}
          <div style={{ marginTop: 36, borderRadius: 16, background: '#fffbeb', color: '#92400e', padding: 18, fontSize: 18, lineHeight: 1.45 }}>
            Pro Tip<br />前一日 17:00 前還可改單。
          </div>
        </Card>
      </SlideIn>
      <main>
        <FadeUp delay={0.22}>
          <Eyebrow>2026 / 05 / 20 · 週三</Eyebrow>
        </FadeUp>
        <FadeUp delay={0.32}>
          <Title size={74}>哈囉，E2E Employee</Title>
        </FadeUp>
        <FadeUp delay={0.44}>
          <p style={{ margin: '12px 0 26px', color: color.muted, fontSize: 28 }}>距離今日截單還有 53 分 · 可預訂未來 7 天</p>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16, marginBottom: 22 }}>
          {[
            ['今日訂單', 128, '份', color.red],
            ['準時率', 96, '%', color.green],
            ['待處理', 7, '件', color.amber],
          ].map(([label, value, suffix, tone], index) => (
            <FadeUp key={String(label)} delay={0.5 + index * 0.08}>
              <Card className="tbite-card-lift" style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: color.muted, fontSize: 17, fontWeight: 800 }}>
                  <PulseDot tone={String(tone)} delay={index * 0.18} />
                  {label}
                </div>
                <div style={{ marginTop: 8, color: color.text, fontFamily: font.mono, fontSize: 38, fontWeight: 900 }}>
                  <CountUp value={Number(value)} suffix={String(suffix)} delay={0.56 + index * 0.08} />
                </div>
              </Card>
            </FadeUp>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 22 }}>
          <FadeUp delay={0.68}><MealCard vendor="禪緣素食" meal="味噌豆腐丼" price="$90" tone={color.green} /></FadeUp>
          <FadeUp delay={0.8}><MealCard vendor="稻禾家便當" meal="三杯雞便當" price="$120" /></FadeUp>
          <FadeUp delay={0.92}><MealCard vendor="綠源輕食" meal="溫野菜牛肉碗" price="$155" tone={color.sky} /></FadeUp>
        </div>
      </main>
    </div>
  </Shell>
);

const AdminSurface: Page = () => (
  <Shell pageNum={3}>
    <FadeUp delay={0.05}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Brand />
        <div style={{ display: 'flex', gap: 10 }}>
          <StateTag delay={0.18}>待審核</StateTag>
          <StateTag tone={color.green} delay={0.3}>已同步</StateTag>
          <StateTag tone={color.amber} delay={0.42}>需追蹤</StateTag>
        </div>
      </div>
    </FadeUp>
    <div style={{ marginTop: 92 }}>
      <FadeUp delay={0.2}>
        <Eyebrow>合規 · 治理 · 對帳</Eyebrow>
      </FadeUp>
      <FadeUp delay={0.32}>
        <Title size={82} width={1420}>簡報頁面也要像 T-Bite 後台：白底、清楚狀態、可掃描的工作卡片</Title>
      </FadeUp>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 24, marginTop: 58 }}>
      <FadeUp delay={0.46}>
        <Card>
          <StateTag delay={0.64}>Admin</StateTag>
          <div style={{ marginTop: 20, color: color.text, fontSize: 34, fontWeight: 900 }}>商家審核</div>
          <p style={{ color: color.muted, fontSize: 24, lineHeight: 1.45 }}>以明確的決策狀態與可追溯證據呈現。</p>
        </Card>
      </FadeUp>
      <FadeUp delay={0.58}>
        <Card>
          <StateTag tone={color.amber} delay={0.76}>Merchant</StateTag>
          <div style={{ marginTop: 20, color: color.text, fontSize: 34, fontWeight: 900 }}>菜單與配額</div>
          <p style={{ color: color.muted, fontSize: 24, lineHeight: 1.45 }}>使用表格、卡片與狀態標籤表達營運節奏。</p>
        </Card>
      </FadeUp>
      <FadeUp delay={0.7}>
        <Card>
          <StateTag tone={color.green} delay={0.88}>Employee</StateTag>
          <div style={{ marginTop: 20, color: color.text, fontSize: 34, fontWeight: 900 }}>下單與領餐</div>
          <p style={{ color: color.muted, fontSize: 24, lineHeight: 1.45 }}>保留餐點卡、價格、時間窗與加減數量控制。</p>
        </Card>
      </FadeUp>
    </div>
  </Shell>
);

const MotionSurface: Page = () => (
  <Shell pageNum={4}>
    <FadeUp delay={0.05}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Brand />
        <div style={{ display: 'flex', gap: 10 }}>
          <StateTag delay={0.18}>Motion Kit</StateTag>
          <StateTag tone={color.green} delay={0.3}>可複製</StateTag>
        </div>
      </div>
    </FadeUp>
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 520px', gap: 30, marginTop: 72 }}>
      <SlideIn from="left" delay={0.18}>
        <div>
          <Eyebrow>Template motion patterns</Eyebrow>
          <Title size={78} width={1180}>把產品互動語彙放進簡報：流程、數字、表格、操作回饋</Title>
          <Card className="tbite-card-lift" style={{ marginTop: 34, padding: 30 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: color.muted, fontSize: 20, fontWeight: 800 }}>
              <span>企業訂餐流程</span>
              <span style={{ fontFamily: font.mono }}>04 steps</span>
            </div>
            <div style={{ position: 'relative', marginTop: 34, height: 92 }}>
              <div style={{ position: 'absolute', left: 26, right: 26, top: 24, height: 6, borderRadius: 999, background: color.chip }} />
              <div className="tbite-progress-fill" style={{ position: 'absolute', left: 26, right: 26, top: 24, height: 6, borderRadius: 999, background: color.red, animationDelay: '0.46s' }} />
              <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
                {['下單', '彙整', '備餐', '對帳'].map((step, index) => (
                  <div key={step} style={{ textAlign: 'center' }}>
                    <PopIn delay={0.56 + index * 0.12}>
                      <div style={{ width: 54, height: 54, borderRadius: 999, margin: '0 auto', background: index === 3 ? color.green : color.red, color: '#ffffff', display: 'grid', placeItems: 'center', fontFamily: font.mono, fontSize: 20, fontWeight: 900 }}>
                        {index + 1}
                      </div>
                    </PopIn>
                    <div style={{ marginTop: 12, color: color.body, fontSize: 22, fontWeight: 900 }}>{step}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 18, marginTop: 22 }}>
            {[
              ['訂單', 342, '份', color.red],
              ['準時', 98, '%', color.green],
              ['異常', 5, '件', color.amber],
            ].map(([label, value, suffix, tone], index) => (
              <FadeUp key={String(label)} delay={0.7 + index * 0.1}>
                <Card className="tbite-card-lift" style={{ padding: 22 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: color.muted, fontSize: 18, fontWeight: 800 }}>
                    <PulseDot tone={String(tone)} delay={index * 0.2} />
                    {label}
                  </div>
                  <div style={{ marginTop: 10, color: color.text, fontFamily: font.mono, fontSize: 42, fontWeight: 900 }}>
                    <CountUp value={Number(value)} suffix={String(suffix)} delay={0.82 + index * 0.1} />
                  </div>
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>
      </SlideIn>
      <SlideIn from="right" delay={0.28}>
        <Card className="tbite-card-lift" style={{ padding: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Eyebrow>Table cascade</Eyebrow>
              <div style={{ color: color.text, fontSize: 38, fontWeight: 900 }}>今日異常追蹤</div>
            </div>
            <button className="tbite-press tbite-press-demo" style={{ border: 0, borderRadius: 12, background: color.red, color: '#ffffff', padding: '14px 18px', fontSize: 18, fontWeight: 900 }}>
              指派處理
            </button>
          </div>
          <div style={{ marginTop: 26, border: `1px solid ${color.border}`, borderRadius: 16, overflow: 'hidden' }}>
            {[
              ['F12B', '雞腿便當短缺', '待審核', color.red],
              ['3F', '配送延遲 8 分', '需追蹤', color.amber],
              ['5F', '素食餐標籤確認', '已同步', color.green],
              ['7F', '主管補簽核', '處理中', color.sky],
            ].map(([floor, issue, state, tone], index) => (
              <div
                key={String(issue)}
                className="tbite-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '70px minmax(0, 1fr) 108px',
                  gap: 14,
                  alignItems: 'center',
                  padding: '17px 18px',
                  borderTop: index === 0 ? 0 : `1px solid ${color.border}`,
                  background: index % 2 === 0 ? '#ffffff' : '#f8fafc',
                  animationDelay: `${0.48 + index * 0.12}s`,
                }}
              >
                <div style={{ color: color.muted, fontFamily: font.mono, fontSize: 18, fontWeight: 900 }}>{floor}</div>
                <div style={{ color: color.text, fontSize: 20, fontWeight: 800 }}>{issue}</div>
                <StateTag tone={String(tone)} delay={0.62 + index * 0.12}>{state}</StateTag>
              </div>
            ))}
          </div>
        </Card>
      </SlideIn>
    </div>
  </Shell>
);

export default [Cover, ProductSurface, AdminSurface, MotionSurface] satisfies Page[];
