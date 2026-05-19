---
name: T-Bite Product UI
description: Light T-Bite product theme using red brand accents, slate surfaces, rounded cards, and Traditional-Chinese-first app chrome.
mode: light
---

# T-Bite Product UI

## Palette

| Role   | Value     | Notes |
| ------ | --------- | ----- |
| bg     | `#f8fafc` | app background, login canvas |
| text   | `#0f172a` | primary headings and strong copy |
| accent | `#dc2626` | T-Bite primary red for buttons, eyebrows, focus, logo dot copy |
| muted  | `#64748b` | secondary copy and metadata |
| card   | `#ffffff` | cards, header, panels |
| chip   | `#f1f5f9` | inactive pills and icon buttons |
| border | `#e2e8f0` | hairline borders |
| amber  | `#fbbf24` | logo dot, favorite star, low-stock signal |
| rose   | `#e11d48` | danger / rose side of brand gradient |
| green  | `#10b981` | success tags |
| sky    | `#0ea5e9` | info tags |

## Typography

- Display font: `"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", system-ui, -apple-system, "Segoe UI", sans-serif` - weight 800-900 for page titles and product headlines.
- Body font: `"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", system-ui, -apple-system, "Segoe UI", sans-serif` - weight 400-600.
- Mono font: `"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace` - prices, counters, compact metadata.
- Type-scale overrides for 1920 x 1080 slides:
  - Hero title: 112-124 px
  - Page heading: 68-78 px
  - Body text: 30-36 px
  - Card title: 30-38 px
  - Caption / label: 20-24 px

## Layout

- Content padding: 96-112 px from canvas edges. Use an app-like max-width rhythm rather than full-bleed editorial pages.
- Alignment: product-dashboard composition: sticky white header, left navigation rail when useful, main content cards on a slate-50 surface.
- Cards: 16-20 px radius, white fill, `#e2e8f0` border, soft slate shadow, 24-32 px internal padding.
- Brand mark: rounded gradient tile from `#ef4444` to `#be123c`, white bold `T`, small amber dot with a white ring, then `T-Bite.` wordmark and uppercase `Corporate Catering`.
- Avoid dark grid backgrounds, neon cyan/green, technical terminal chrome, and black dashboard panels. Those read like the old presentation, not the current product.

## Fixed components

These are paste-ready. Copy them verbatim into a slide that uses this theme. Add `import { useEffect, useState } from 'react';` and `import type { CSSProperties, ReactNode } from 'react';` when using the snippets.

### Title

```tsx
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
```

### Footer

```tsx
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
```

### Eyebrow / accents

```tsx
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
```

### Brand mark

```tsx
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
```

### Motion helpers

```tsx
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
  <div className="tbite-slide-in" style={{ '--tbite-slide-x': from === 'left' ? '-28px' : '28px', animationDelay: `${delay}s`, ...style } as CSSProperties}>
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

const PulseDot = ({ tone = '#dc2626', delay = 0 }: { tone?: string; delay?: number }) => (
  <span className="tbite-pulse-dot" style={{ width: 9, height: 9, borderRadius: 999, background: tone, animationDelay: `${delay}s` }} />
);
```

### Status tag

```tsx
const StateTag = ({ children, tone = '#dc2626', delay = 0 }: { children: ReactNode; tone?: string; delay?: number }) => (
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
```

## Motion

- Philosophy: subtle product motion. Use small hover lifts, fade-up entrance, and cart/count micro-bumps only when presenting UI states.
- Default entrance: wrap important blocks in `FadeUp` and stagger them by `0.10-0.14s` so the page reads top-to-bottom or left-to-right.
- Status tags: use `StateTag` with staggered `delay` values for operational states like `待審核`, `已同步`, `需追蹤`, `可薪資代扣`. Keep the pop subtle and short.
- Card lift: add `className="tbite-card-lift"` to product cards, login panels, metric cards, and admin work cards. It is a hover affordance, not a page entrance.
- Number count-up: use `<CountUp value={128} suffix="份" delay={0.56} />` for KPIs, order counts, completion rates, and finance totals.
- Meal image reveal: add `className="tbite-image-reveal"` to the image or colored placeholder area inside a meal card.
- Progress fill: use `className="tbite-progress-fill"` on the active bar inside a process timeline.
- Pulse dot: use `<PulseDot tone="#10b981" />` for live status, cutoff warnings, or synced indicators. Use sparingly.
- Panel slide-in: use `<SlideIn from="left">...</SlideIn>` for side navigation and `<SlideIn from="right">...</SlideIn>` for detail panels.
- Button press: add `className="tbite-press"` to primary actions and icon buttons. Add `tbite-press-demo` only in demo pages where a visible looping hint is useful.
- Table row cascade: add `className="tbite-row"` to table/list rows and stagger each row with `animationDelay`.
- Recommended timing: logo/header `0.05s`, eyebrow `0.18s`, title `0.30s`, body copy `0.44s`, primary card `0.58s`, repeated cards `0.56s`, `0.68s`, `0.80s`.
- Always add `<style>{motionStyles}</style>` once inside the page root or shared shell.
- Reusable keyframes:

```css
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
```

### Common usage

```tsx
<SlideIn from="left" delay={0.16}>
  <Card className="tbite-card-lift">側邊欄或摘要卡</Card>
</SlideIn>

<div className="tbite-image-reveal" style={{ animationDelay: '0.18s' }}>No image</div>

<div className="tbite-progress-fill" style={{ animationDelay: '0.46s' }} />

<div className="tbite-row" style={{ animationDelay: '0.60s' }}>表格列</div>

<button className="tbite-press">確認訂餐</button>

<div style={{ fontFamily: '"JetBrains Mono", ui-monospace, Menlo, Consolas, monospace' }}>
  <CountUp value={128} suffix="份" delay={0.56} />
</div>
```

## Aesthetic

This theme should feel like the current T-Bite app: light, rounded, Taiwanese enterprise SaaS, food-ordering friendly, and operationally clear. Use white cards on slate-50, compact red eyebrows, pill controls, meal-card surfaces, and brand-red actions. Avoid the old dark cloud-native deck language, dark grid backgrounds, cyan-green accents, and terminal-like chrome.

## Example usage

```tsx
const Cover: Page = () => (
  <section style={{ width: '100%', height: '100%', position: 'relative', boxSizing: 'border-box', overflow: 'hidden', background: '#f8fafc', color: '#0f172a', padding: 112 }}>
    <style>{motionStyles}</style>
    <FadeUp delay={0.05}>
      <Brand />
    </FadeUp>
    <div style={{ marginTop: 170, maxWidth: 1260 }}>
      <FadeUp delay={0.18}>
        <Eyebrow>Employee · 員工訂餐</Eyebrow>
      </FadeUp>
      <FadeUp delay={0.30}>
        <Title size={116}>把每天午餐變成清楚、可追蹤的企業流程</Title>
      </FadeUp>
      <FadeUp delay={0.44}>
        <p style={{ margin: '28px 0 0', maxWidth: 1000, color: '#64748b', fontSize: 34, lineHeight: 1.5 }}>
          使用目前 T-Bite 產品 UI 的紅色品牌、淺色表面、圓角卡片與狀態標籤。
        </p>
      </FadeUp>
    </div>
    <Footer pageNum={1} total={3} />
  </section>
);
```
