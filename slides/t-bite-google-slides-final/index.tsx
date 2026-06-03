import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { Children, cloneElement, isValidElement, useEffect, useMemo, useRef, useState } from 'react';

import image1 from './assets/image1.png';
import image2 from './assets/image2.png';
import image3 from './assets/image3.png';
import image4 from './assets/image4.jpg';
import image5 from './assets/image5.png';
import image6 from './assets/image6.png';
import image7 from './assets/image7.png';
import image8 from './assets/image8.png';
import image9 from './assets/image9.png';
import image10 from './assets/image10.jpg';
import image11 from './assets/image11.png';
import image12 from './assets/image12.png';
import image13 from './assets/image13.png';
import image14 from './assets/image14.png';
import image15 from './assets/image15.png';
import image16 from './assets/image16.png';
import image17 from './assets/image17.png';
import image18 from './assets/image18.png';
import image19 from './assets/image19.png';
import image20 from './assets/image20.png';
import image21 from './assets/image21.png';
import image22 from './assets/image22.jpg';
import image23 from './assets/image23.png';
import image24 from './assets/image24.png';
import image25 from './assets/image25.png';
import image26 from './assets/image26.png';
import image27 from './assets/image27.png';
import image28 from './assets/image28.png';
import image29 from './assets/image29.png';
import image30 from './assets/image30.png';
import image31 from './assets/image31.png';
import image32 from './assets/image32.png';
import image33 from './assets/image33.png';
import image34 from './assets/image34.png';
import image35 from './assets/image35.png';
import image36 from './assets/image36.gif';
import image37 from './assets/image37.png';
import image38 from './assets/image38.gif';
import image39 from './assets/image39.png';
import image40 from './assets/image40.png';
import image41 from './assets/image41.gif';

export const design: DesignSystem = {
  palette: { bg: '#FFFFFF', text: '#1A1A1A', accent: '#DC2626' },
  fonts: {
    display: 'Lato, Raleway, Arial, sans-serif',
    body: 'Lato, Arial, sans-serif',
  },
  typeScale: { hero: 96, body: 38 },
  radius: 8,
};

type LineStyle = {
  color: string;
  width: number;
  dash?: string;
  head?: string;
  tail?: string;
};

type BoxProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  rot?: number;
  flipH?: boolean;
  flipV?: boolean;
  delayMs?: number;
  activePageLabel?: string;
};

const pageBase = {
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  fontFamily: 'var(--osd-font-body)',
} as const;

const animationCss = `
@keyframes tBiteElementReveal {
  0% {
    opacity: 0;
    clip-path: inset(0 100% 0 0);
    filter: blur(2px);
  }
  100% {
    opacity: 1;
    clip-path: inset(0 0 0 0);
    filter: blur(0);
  }
}

.t-bite-animated-page > :not(style) {
  opacity: 0;
  clip-path: inset(0 100% 0 0);
  animation: tBiteElementReveal 520ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: calc(var(--element-index, 0) * 90ms);
  will-change: opacity, clip-path, filter;
}

.t-bite-animated-page > :nth-child(2) { --element-index: 0; }
.t-bite-animated-page > :nth-child(3) { --element-index: 1; }
.t-bite-animated-page > :nth-child(4) { --element-index: 2; }
.t-bite-animated-page > :nth-child(5) { --element-index: 3; }
.t-bite-animated-page > :nth-child(6) { --element-index: 4; }
.t-bite-animated-page > :nth-child(7) { --element-index: 5; }
.t-bite-animated-page > :nth-child(8) { --element-index: 6; }
.t-bite-animated-page > :nth-child(9) { --element-index: 7; }
.t-bite-animated-page > :nth-child(10) { --element-index: 8; }
.t-bite-animated-page > :nth-child(11) { --element-index: 9; }
.t-bite-animated-page > :nth-child(12) { --element-index: 10; }
.t-bite-animated-page > :nth-child(13) { --element-index: 11; }
.t-bite-animated-page > :nth-child(14) { --element-index: 12; }
.t-bite-animated-page > :nth-child(15) { --element-index: 13; }
.t-bite-animated-page > :nth-child(16) { --element-index: 14; }
.t-bite-animated-page > :nth-child(17) { --element-index: 15; }
.t-bite-animated-page > :nth-child(18) { --element-index: 16; }
.t-bite-animated-page > :nth-child(19) { --element-index: 17; }
.t-bite-animated-page > :nth-child(20) { --element-index: 18; }

@media (prefers-reduced-motion: reduce) {
  .t-bite-animated-page > :not(style) {
    opacity: 1;
    clip-path: none;
    filter: none;
    animation: none;
  }
}
`;

const AnimatedPage = ({ background, children }: { background: string; children: React.ReactNode }) => (
  <div className="t-bite-animated-page" style={{ ...pageBase, background }}>
    <style>{animationCss}</style>
    {children}
  </div>
);

const transformFor = ({ rot = 0, flipH = false, flipV = false }: Pick<BoxProps, 'rot' | 'flipH' | 'flipV'>) => {
  const transforms: string[] = [];
  if (rot) transforms.push(`rotate(${rot}deg)`);
  if (flipH) transforms.push('scaleX(-1)');
  if (flipV) transforms.push('scaleY(-1)');
  return transforms.length ? transforms.join(' ') : undefined;
};

const boxStyle = ({ x, y, w, h, rot, flipH, flipV, delayMs }: BoxProps) => ({
  position: 'absolute',
  left: x,
  top: y,
  width: w,
  height: h,
  transform: transformFor({ rot, flipH, flipV }),
  transformOrigin: 'center center',
  animationDelay: delayMs === undefined ? undefined : `${delayMs}ms`,
} as const);

const useStagedReveal = (delayMs?: number, activePageLabel?: string) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(delayMs === undefined);

  useEffect(() => {
    if (delayMs === undefined) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    let frame = 0;
    let timeout = 0;
    let wasMainCanvas = false;
    setVisible(false);

    const watchCanvas = () => {
      const rect = ref.current?.getBoundingClientRect();
      const isRendered = !!rect && rect.width > 0 && rect.height > 0;
      const isThumbnail = !!ref.current?.closest('aside');
      let isActuallyVisible = isRendered;
      let ancestor = ref.current?.parentElement ?? null;
      const bodyText = document.body.textContent ?? '';
      const hasPageState = /page \d+\/44/.test(bodyText);
      const isActivePage = !activePageLabel || !hasPageState || bodyText.includes(activePageLabel);

      while (ancestor && ancestor !== document.body) {
        const style = window.getComputedStyle(ancestor);
        if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) {
          isActuallyVisible = false;
          break;
        }
        ancestor = ancestor.parentElement;
      }

      const isMainCanvasSize = isActivePage && isActuallyVisible && !isThumbnail && (rect.width > 220 || rect.height > 30);

      if (isMainCanvasSize) {
        if (!wasMainCanvas) {
          wasMainCanvas = true;
          window.clearTimeout(timeout);
          setVisible(false);
          timeout = window.setTimeout(() => setVisible(true), delayMs);
        }
      } else {
        wasMainCanvas = false;
        window.clearTimeout(timeout);
        setVisible(isRendered && isThumbnail);
      }

      frame = window.requestAnimationFrame(watchCanvas);
    };

    watchCanvas();

    return () => {
      window.clearTimeout(timeout);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [activePageLabel, delayMs]);

  if (delayMs === undefined) return { ref, style: undefined };

  return {
    ref,
    style: {
      opacity: visible ? 1 : 0,
      clipPath: visible ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
      filter: visible ? 'blur(0)' : 'blur(2px)',
      animation: 'none',
      transition: 'opacity 520ms cubic-bezier(0.22, 1, 0.36, 1), clip-path 520ms cubic-bezier(0.22, 1, 0.36, 1), filter 520ms cubic-bezier(0.22, 1, 0.36, 1)',
      willChange: 'opacity, clip-path, filter',
    } satisfies React.CSSProperties,
  };
};

const borderStyle = (line?: LineStyle) => {
  if (!line) return undefined;
  const style = line.dash && line.dash !== 'solid' ? 'dashed' : 'solid';
  return `${line.width}px ${style} ${line.color}`;
};

const shapeRadius = (kind?: string) => {
  if (kind === 'roundRect') return 20;
  if (kind === 'can') return '50% / 14%';
  return 0;
};

const Shape = ({ fill, line, kind = 'rect', ...box }: BoxProps & { fill?: string; line?: LineStyle; kind?: string }) => {
  if (kind === 'can') {
    const stroke = line?.color ?? '#1A1A1A';
    const sw = line?.width ?? 3;
    return (
      <svg style={{ ...boxStyle(box), overflow: 'visible' }} viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M 8 15 C 8 4, 92 4, 92 15 L 92 85 C 92 96, 8 96, 8 85 Z" fill={fill ?? 'transparent'} stroke={stroke} strokeWidth={sw} vectorEffect="non-scaling-stroke" />
        <ellipse cx="50" cy="15" rx="42" ry="11" fill={fill ?? 'transparent'} stroke={stroke} strokeWidth={sw} vectorEffect="non-scaling-stroke" />
      </svg>
    );
  }
  return <div style={{ ...boxStyle(box), background: fill ?? 'transparent', border: borderStyle(line), borderRadius: shapeRadius(kind) }} />;
};

const decorativeLineBox = { x: 111.33, w: 281.99, h: 3.71 } as const;
const brandLineFill = 'linear-gradient(90deg, #1A9988 0%, #1A9988 72%, #EB5600 72%, #EB5600 100%)';

const DecorativeLine = ({ y = 253.09, fill }: { y?: number; fill: string }) => (
  <Shape {...decorativeLineBox} y={y} fill={fill} />
);

const cropStyle = (crop?: [number, number, number, number]) => {
  if (!crop) {
    return { left: 0, top: 0, width: '100%', height: '100%' } as const;
  }
  const [l, t, r, b] = crop;
  const cw = Math.max(1, 100000 - l - r);
  const ch = Math.max(1, 100000 - t - b);
  return {
    left: `${-(l / cw) * 100}%`,
    top: `${-(t / ch) * 100}%`,
    width: `${(100000 / cw) * 100}%`,
    height: `${(100000 / ch) * 100}%`,
  } as const;
};

const Picture = ({ src, crop, line, ...box }: BoxProps & { src: string; crop?: [number, number, number, number]; line?: LineStyle }) => {
  const reveal = useStagedReveal(box.delayMs, box.activePageLabel);
  return (
    <div ref={reveal.ref} style={{ ...boxStyle(box), overflow: 'hidden', border: borderStyle(line), background: 'transparent', ...reveal.style }}>
      <img src={src} style={{ position: 'absolute', display: 'block', maxWidth: 'none', maxHeight: 'none', ...cropStyle(crop), objectFit: 'fill' }} />
    </div>
  );
};

const TextBox = ({ fill, line, kind = 'rect', pad = [0, 0, 0, 0], anchor = 'flex-start', children, ...box }: BoxProps & { fill?: string; line?: LineStyle; kind?: string; pad?: [number, number, number, number]; anchor?: string; children?: React.ReactNode }) => {
  const reveal = useStagedReveal(box.delayMs, box.activePageLabel);
  return (
    <div
      ref={reveal.ref}
      style={{
        ...boxStyle(box),
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: anchor,
        background: fill ?? 'transparent',
        border: borderStyle(line),
        borderRadius: shapeRadius(kind),
        padding: `${pad[0]}px ${pad[1]}px ${pad[2]}px ${pad[3]}px`,
        whiteSpace: 'pre-wrap',
        overflow: 'visible',
        ...reveal.style,
      }}
    >
      {children}
    </div>
  );
};

type ParsedNumberText = {
  prefix: string;
  target: number;
  suffix: string;
  decimals: number;
  useGrouping: boolean;
};

const parseNumberText = (text: string): ParsedNumberText | null => {
  const match = text.match(/^(\s*[~≈]?\s*)(-?\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const rawNumber = match[2];
  const target = Number(rawNumber.replace(/,/g, ''));
  if (!Number.isFinite(target)) return null;
  return {
    prefix: match[1],
    target,
    suffix: match[3],
    decimals: rawNumber.includes('.') ? rawNumber.split('.')[1].length : 0,
    useGrouping: rawNumber.includes(','),
  };
};

const formatAnimatedNumber = (value: number, decimals: number, useGrouping: boolean) => {
  const rounded = Number(value.toFixed(decimals));
  return rounded.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping,
  });
};

type NumberDirection = 'auto' | 'up' | 'down';

const AnimatedNumberText = ({ text, direction = 'auto', activePageLabel }: { text: string; direction?: NumberDirection; activePageLabel?: string }) => {
  const parsed = useMemo(() => parseNumberText(text), [text]);
  const start = parsed
    ? direction === 'down'
      ? parsed.target <= 10
        ? 9.9
        : Math.max(parsed.target + 20, parsed.target * 1.5)
      : direction === 'up'
        ? 0
        : parsed.target <= 0
          ? Math.max(999999, Math.abs(parsed.target) * 2)
          : 0
    : 0;
  const isHugePositive = parsed ? parsed.target >= 1_000_000_000 : false;
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (!parsed) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(parsed.target);
      return;
    }

    let frame = 0;
    let waitFrame = 0;
    let timeout = 0;
    const duration = isHugePositive ? 5200 : 1500;
    const delay = isHugePositive ? 120 : 450;

    const animate = () => {
      setValue(start);
      timeout = window.setTimeout(() => {
        const startedAt = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - startedAt) / duration);
          const eased = isHugePositive
            ? progress < 0.72
              ? 0.82 * Math.pow(progress / 0.72, 1.25)
              : 0.82 + 0.18 * (1 - Math.pow(1 - (progress - 0.72) / 0.28, 3))
            : 1 - Math.pow(1 - progress, 3);
          setValue(progress >= 1 ? parsed.target : start + (parsed.target - start) * eased);
          if (progress < 1) frame = window.requestAnimationFrame(tick);
        };
        frame = window.requestAnimationFrame(tick);
      }, delay);
    };

    if (!isHugePositive && !activePageLabel) {
      animate();
      return () => {
        window.clearTimeout(timeout);
        if (frame) window.cancelAnimationFrame(frame);
      };
    }

    if (!isHugePositive && activePageLabel) {
      const waitForActivePage = () => {
        const isThumbnail = !!rootRef.current?.closest('aside');
        const bodyText = document.body.textContent ?? '';
        const hasPageState = /page \d+\/44/.test(bodyText);
        const isActivePage = !hasPageState || bodyText.includes(activePageLabel);

        if (isThumbnail) {
          setValue(parsed.target);
          return;
        }

        if (isActivePage) {
          animate();
          return;
        }

        setValue(start);
        waitFrame = window.requestAnimationFrame(waitForActivePage);
      };

      waitForActivePage();

      return () => {
        window.clearTimeout(timeout);
        if (waitFrame) window.cancelAnimationFrame(waitFrame);
        if (frame) window.cancelAnimationFrame(frame);
      };
    }

    const waitForMainCanvas = () => {
      const rect = rootRef.current?.getBoundingClientRect();
      const isRendered = !!rect && rect.width > 0 && rect.height > 0;
      const isMainCanvasSize = isRendered && (rect.width > 220 || rect.height > 30);

      if (isMainCanvasSize) {
        animate();
        return;
      }

      if (isRendered) {
        setValue(parsed.target);
        return;
      }

      waitFrame = window.requestAnimationFrame(waitForMainCanvas);
    };

    waitForMainCanvas();

    return () => {
      window.clearTimeout(timeout);
      if (waitFrame) window.cancelAnimationFrame(waitFrame);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [activePageLabel, isHugePositive, parsed, start]);

  if (!parsed) return <>{text}</>;
  return (
    <span ref={rootRef}>
      {parsed.prefix}{formatAnimatedNumber(value, parsed.decimals, parsed.useGrouping)}{parsed.suffix}
    </span>
  );
};

const animatedTextChildren = (children: React.ReactNode) => Children.map(children, (child) => {
  if (!isValidElement<{ children?: React.ReactNode; style?: React.CSSProperties }>(child)) return child;
  if (child.type !== 'span') return child;
  if (typeof child.props.children !== 'string') return child;
  const fontSize = Number(child.props.style?.fontSize ?? 0);
  if (fontSize < 60 || !parseNumberText(child.props.children)) return child;
  return cloneElement(child, child.props, <AnimatedNumberText text={child.props.children} />);
});

const TextPara = ({ align, mt = 0, mb = 0, children }: { align: string; mt?: number; mb?: number; children?: React.ReactNode }) => (
  <div style={{ textAlign: align as React.CSSProperties['textAlign'], marginTop: mt, marginBottom: mb, lineHeight: 1.15 }}>
    {animatedTextChildren(children)}
  </div>
);

const SvgLine = ({ line, ...box }: BoxProps & { line?: LineStyle }) => {
  const stroke = line?.color ?? '#1A1A1A';
  const sw = line?.width ?? 3;
  const markerEnd = line?.tail && line.tail !== 'none' ? 'url(#arrow-end)' : undefined;
  const markerStart = line?.head && line.head !== 'none' ? 'url(#arrow-start)' : undefined;
  const w = Math.max(1, box.w);
  const h = Math.max(1, box.h);
  return (
    <svg style={{ ...boxStyle({ ...box, w, h }), overflow: 'visible' }} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <marker id="arrow-end" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={stroke} />
        </marker>
        <marker id="arrow-start" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M 10 0 L 0 5 L 10 10 z" fill={stroke} />
        </marker>
      </defs>
      <line x1="0" y1="0" x2={w} y2={h === 1 ? 0 : h} stroke={stroke} strokeWidth={sw} markerEnd={markerEnd} markerStart={markerStart} vectorEffect="non-scaling-stroke" />
    </svg>
  );
};

const Page01: Page = () => (
  <AnimatedPage background={"#E9EDEE"}>
    <Shape x={0} y={0} w={1920} h={102.43} fill={"#FFFFFF"} />
    <DecorativeLine fill={brandLineFill} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"1"}</span>
      </TextPara>
    </TextBox>
    <Picture x={153.2} y={221.72} w={243.62} h={50.4} src={image14} />
    <TextBox x={59.57} y={171.56} w={1014.68} h={201.07} pad={[20.58, 20.58, 20.58, 20.58]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 68.61, fontWeight: 700, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"AI-Agent-Driven "}</span>
        <br />
        <span style={{ fontSize: 68.61, fontWeight: 700, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Enterprise Catering Platform:"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={44.23} y={465.2} w={313.89} h={337.64} pad={[20.58, 20.58, 20.58, 20.58]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 45.73, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Team 10"}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 45.73, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"林振可 Jacob "}</span>
        <br />
        <span style={{ fontSize: 45.73, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"王重鈞 "}</span>
        <span style={{ fontSize: 45.73, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Takala "}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 45.73, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"邱可菡 "}</span>
        <span style={{ fontSize: 45.73, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"DW "}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 45.73, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"洪軾凱 "}</span>
        <span style={{ fontSize: 45.73, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Sky "}</span>
      </TextPara>
    </TextBox>
    <Picture x={1074.24} y={171.56} w={765.37} h={201.1} src={image13} crop={[4605, 18908, 4930, 16733]} />
    <Picture x={358.12} y={489.82} w={729.86} h={507.53} src={image4} crop={[8852, 0, 6767, 0]} />
    <Picture x={1102.16} y={489.82} w={773.59} h={507.53} src={image10} crop={[8973, 0, 8170, 7347]} />
    <TextBox x={59.57} y={361.27} w={1779.21} h={103.94} pad={[20.58, 20.58, 20.58, 20.58]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 51.47, color: "#1A1A1A", fontFamily: "Raleway, Arial, sans-serif", fontWeight: 700 }}>{"From Greenfield Generation to Self-Hostable Kubernetes Validation"}</span>
      </TextPara>
    </TextBox>
    <Picture x={112.36} y={802.84} w={201.1} h={201.1} src={image5} />
    <TextBox x={6.87} y={988.96} w={816.94} h={84.03} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1C3678", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700, textDecoration: "underline" }}>{"Agentic-Build/corporate-catering-system"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page02: Page = () => (
  <AnimatedPage background={"#FFFFFF"}>
    <Shape x={0} y={0} w={1920} h={102.43} fill={"#E9EDEE"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"2"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={164.43} w={1614.43} h={206.3} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"We delivered: "}</span>
        <br />
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Product, Platform, and an harness workflow."}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"2"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={136.89} y={417.64} w={434.71} h={90.61} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"1. "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Method"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={571.61} y={417.64} w={1211.5} h={90.61} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"How we build the whole system and workflow"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={136.89} y={508.26} w={434.71} h={80} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"2. "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Architecture"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={571.61} y={508.26} w={1211.5} h={80} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"How main system and supply system work together"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={136.89} y={588.26} w={434.71} h={80} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"3. Design"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={571.61} y={588.26} w={1211.5} h={80} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"How it solves enterprise catering"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={136.89} y={668.26} w={434.71} h={80} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"4. Testing"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={571.61} y={668.26} w={1211.5} h={80} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"How we verified reliability and scale"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={136.89} y={748.26} w={434.71} h={80} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"5. Operations"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={571.61} y={748.26} w={1211.5} h={80} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"CI/CD + DevOps + Observability"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={136.89} y={828.26} w={434.71} h={80} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"6."}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{" Conclusion"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={571.61} y={828.26} w={1211.5} h={80} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"What we delivered"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page03: Page = () => (
  <AnimatedPage background={"#1A9988"}>
    <DecorativeLine fill={"#FFFFFF"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"3"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={153.17} y={277.68} w={1614.36} h={318.87} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Method"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif" }}>{"3"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page04: Page = () => (
  <AnimatedPage background={"#FFFFFF"}>
    <Shape x={0} y={0} w={1920} h={102.43} fill={"#E9EDEE"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"4"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={164.43} w={1614.43} h={112.38} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 60, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Method: Requirements Transformation"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"4"}</span>
      </TextPara>
    </TextBox>
    <Picture x={1407.34} y={197.17} w={443.79} h={797.97} src={image20} />
    <Picture x={42.98} y={366.78} w={1364.37} h={458.76} src={image17} crop={[0, 20352, 11308, 26662]} />
    <TextBox x={106.93} y={999.9} w={1706.14} h={77.54} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 32, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Unstructured inputs > Structured requirements"}</span>
        <span style={{ fontSize: 32, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{" >  Implementation specs"}</span>
        <span style={{ fontSize: 32, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" > Greenfield Codebase > BOIL"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={0} y={0} w={1407.37} h={84.03} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Method"}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" / Architecture / Design / Testing / Operations / Conclusion"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page05: Page = () => (
  <AnimatedPage background={"#FFFFFF"}>
    <Shape x={0} y={0} w={1920} h={102.43} fill={"#E9EDEE"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"5"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={164.43} w={1614.43} h={112.38} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Greenfield: agentic-build as the harness"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"5"}</span>
      </TextPara>
    </TextBox>
    <SvgLine x={1309} y={492.99} w={277.86} h={0} line={{ color: "#1A1A1A", width: 8, dash: "solid", head: "none", tail: "triangle" }} />
    <TextBox x={1321.93} y={359.18} w={221.67} h={129.26} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"center"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Greenfield Harness"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1293.84} y={497.53} w={277.86} h={129.26} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"center"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Codex"}</span>
      </TextPara>
      <TextPara align={"center"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"30 Hrs"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1607.37} y={384.7} w={250.65} h={216.57} fill={"#FFFFFF"} line={{ color: "#1A1A1A", width: 2, dash: "solid", head: "none", tail: "none" }} kind={"can"} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"center"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Codebase"}</span>
        <br />
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"(alpha)"}</span>
      </TextPara>
    </TextBox>
    <Picture x={614.63} y={286.29} w={673.87} h={733.75} src={image18} crop={[24000, 10959, 31955, 3826]} />
    <Picture x={116.31} y={283.57} w={411.1} h={739.19} src={image20} />
    <SvgLine x={527.42} y={653.17} w={76.91} h={0} line={{ color: "#1A1A1A", width: 8, dash: "solid", head: "none", tail: "triangle" }} />
    <TextBox x={106.93} y={999.9} w={1706.14} h={77.54} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 32, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Unstructured inputs > Structured requirements > "}</span>
        <span style={{ fontSize: 32, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" "}</span>
        <span style={{ fontSize: 32, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Implementation specs > Greenfield Codebase"}</span>
        <span style={{ fontSize: 32, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" > BOIL"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={0} y={0} w={1663.87} h={84.03} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Method"}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" / Architecture / Design / Testing / Operations / Conclusion"}</span>
      </TextPara>
    </TextBox>
    <Picture x={1463.13} y={656.54} w={266.29} h={266.29} src={image16} />
    <TextBox x={1310.36} y={915.86} w={571.84} h={84.03} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"center"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1C3678", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700, textDecoration: "underline" }}>{"Agentic-Build/agentic-build-0"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page06: Page = () => (
  <AnimatedPage background={"#1A9988"}>
    <DecorativeLine fill={"#FFFFFF"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"6"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={153.17} y={277.68} w={579.15} h={390.74} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"We follow:"}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1C3678", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700, textDecoration: "underline" }}>{"Harness "}</span>
        <br />
        <span style={{ fontSize: 69.33, color: "#1C3678", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700, textDecoration: "underline" }}>{"Engineering"}</span>
      </TextPara>
    </TextBox>
    <Picture x={759.98} y={118.39} w={1109.85} h={843.22} src={image3} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"6"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page07: Page = () => (
  <AnimatedPage background={"#1A9988"}>
    <DecorativeLine fill={"#FFFFFF"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"7"}</span>
      </TextPara>
    </TextBox>
    <Picture x={73.14} y={0} w={1773.73} h={1080} src={image19} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"7"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page08: Page = () => (
  <AnimatedPage background={"#FFFFFF"}>
    <Shape x={0} y={0} w={1920} h={102.43} fill={"#E9EDEE"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"8"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={164.43} w={1614.43} h={181.29} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"BOIL: Behavior & Observability Improvement Loop"}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"SOFT: Scenario → Observe → Fix → Test"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"8"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={106.93} y={999.9} w={1706.14} h={77.54} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 32, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Unstructured inputs > Structured requirements >  Implementation specs > "}</span>
        <span style={{ fontSize: 32, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Greenfield Codebase > BOIL"}</span>
      </TextPara>
    </TextBox>
    <Picture x={512.41} y={332.89} w={1144.67} h={678.62} src={image7} crop={[17898, 10981, 0, 16005]} />
    <Picture x={750.48} y={513.98} w={389.05} h={353.17} src={image9} crop={[0, 2837, 39792, 0]} />
    <TextBox x={248.25} y={564.52} w={250.65} h={216.57} fill={"#FFFFFF"} line={{ color: "#1A1A1A", width: 2, dash: "solid", head: "none", tail: "none" }} kind={"can"} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"center"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Codebase"}</span>
      </TextPara>
      <TextPara align={"center"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"(alpha)"}</span>
      </TextPara>
    </TextBox>
    <Picture x={1377.08} y={389.32} w={269.61} h={268.44} src={image12} />
    <Picture x={1377.08} y={705.31} w={279.99} h={256.35} src={image30} />
    <TextBox x={0} y={0} w={1407.37} h={84.03} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Method"}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" / Architecture / Design / Testing / Operations / Conclusion"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page09: Page = () => (
  <AnimatedPage background={"#1A9988"}>
    <DecorativeLine fill={"#FFFFFF"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"9"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={153.17} y={277.68} w={1614.36} h={318.87} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Architecture"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif" }}>{"9"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page10: Page = () => (
  <AnimatedPage background={"#FFFFFF"}>
    <Shape x={0} y={0} w={1920} h={102.43} fill={"#E9EDEE"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"10"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={164.43} w={742.05} h={258.52} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Architecture: "}</span>
        <br />
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"3 apps + Go modular monolith"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"10"}</span>
      </TextPara>
    </TextBox>
    <Picture x={886.81} y={119.56} w={863.03} h={949.78} src={image8} crop={[0, 7630, 0, 0]} />
    <Picture x={1554.67} y={891.12} w={64.71} h={64.46} src={image15} crop={[0, 0, 18726, 0]} />
    <Picture x={1554.67} y={913.63} w={64.71} h={49.38} src={image2} crop={[0, 0, 79396, 0]} />
    <Picture x={1428.25} y={897.72} w={74.38} h={74.38} src={image1} />
    <TextBox x={1713.16} y={457.89} w={215.81} h={103.43} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#1A1A1A", fontFamily: "Roboto Mono, Arial, sans-serif" }}>{"c"}</span>
        <span style={{ fontSize: 26.67, color: "#1A1A1A", fontFamily: "Roboto Mono, Arial, sans-serif" }}>{"loudflared"}</span>
        <span style={{ fontSize: 26.67, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" "}</span>
        <br />
        <span style={{ fontSize: 26.67, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"in production"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={0} y={0} w={1407.37} h={84.03} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Method"}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" / "}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Architecture"}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" / Design / Testing / Operations / Conclusion"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page11: Page = () => (
  <AnimatedPage background={"#FFFFFF"}>
    <Shape x={0} y={0} w={1920} h={102.43} fill={"#E9EDEE"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"11"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={164.43} w={540.66} h={232.94} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"architecture mapping"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"11"}</span>
      </TextPara>
    </TextBox>
    <Picture x={585.56} y={142.04} w={1242.36} h={884.82} src={image11} crop={[0, 5042, 0, 0]} delayMs={600} activePageLabel={"page 11/44"} />
    <Picture x={633.98} y={142.04} w={1166.31} h={874.74} src={image29} delayMs={3600} activePageLabel={"page 11/44"} />
    <Picture x={1478.3} y={880.72} w={53.33} h={44.73} src={image6} delayMs={3800} activePageLabel={"page 11/44"} />
    <TextBox x={0} y={0} w={1407.37} h={84.03} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Method / "}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Architecture"}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" / Design / Testing / Operations / Conclusion"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page12: Page = () => (
  <AnimatedPage background={"#1A9988"}>
    <DecorativeLine fill={"#FFFFFF"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"12"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={153.17} y={277.68} w={1614.36} h={318.87} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Design"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif" }}>{"12"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page13: Page = () => (
  <AnimatedPage background={"#FFFFFF"}>
    <Shape x={0} y={0} w={1920} h={102.43} fill={"#E9EDEE"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"13"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={164.43} w={1614.43} h={112.38} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Why not just Uber Eats?"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"13"}</span>
      </TextPara>
    </TextBox>
    <Picture x={355.05} y={313.43} w={1209.91} h={625.01} src={image21} crop={[11902, 0, 10914, 29118]} line={{ color: "#1A1A1A", width: 2, dash: "solid", head: "none", tail: "none" }} />
    <TextBox x={0} y={0} w={1407.37} h={84.03} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Method / "}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Architecture"}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" / "}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Design"}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" / Testing / Operations / Conclusion"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page14: Page = () => (
  <AnimatedPage background={"#FFFFFF"}>
    <Shape x={0} y={0} w={1920} h={102.43} fill={"#E9EDEE"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"14"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={164.43} w={1614.43} h={112.38} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Why not just Uber Eats?"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"14"}</span>
      </TextPara>
    </TextBox>
    <Picture x={355.05} y={313.43} w={1209.91} h={625.01} src={image21} crop={[11902, 0, 10914, 29118]} line={{ color: "#1A1A1A", width: 2, dash: "solid", head: "none", tail: "none" }} />
    <Shape x={2.61} y={0} w={1920} h={1080} fill={"rgba(248, 250, 252, 0.620)"} line={{ color: "#1A1A1A", width: 2, dash: "solid", head: "none", tail: "none" }} />
    <TextBox x={380.92} y={332.04} w={397.25} h={91.98} fill={"#10B981"} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"center"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Uber Eats-like"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={778.17} y={332.04} w={766.13} h={91.98} fill={"rgba(220, 38, 38, 0.969)"} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"center"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"T-Bite enterprise catering"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={380.92} y={424.02} w={397.25} h={96.68} fill={"#10B981"} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"center"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"個人即時點餐"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={778.17} y={424.02} w={766.13} h={96.68} fill={"rgba(220, 38, 38, 0.969)"} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"center"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"企業預先訂餐"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={380.92} y={520.7} w={397.25} h={96.68} fill={"#10B981"} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"center"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"通常單店訂單"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={778.17} y={520.7} w={766.13} h={96.68} fill={"rgba(220, 38, 38, 0.969)"} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"center"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"一餐可跨多店合併"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={380.92} y={617.38} w={397.25} h={96.68} fill={"#10B981"} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"center"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"送到個人"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={778.17} y={617.38} w={766.13} h={96.68} fill={"rgba(220, 38, 38, 0.969)"} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"center"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"集中送到"}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"各廠"}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"取餐點"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={380.92} y={714.05} w={397.25} h={96.68} fill={"#10B981"} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"center"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"個人付款"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={778.17} y={714.05} w={766.13} h={96.68} fill={"rgba(220, 38, 38, 0.969)"} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"center"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"福委會"}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"企業治理、對帳"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={380.92} y={810.73} w={397.25} h={96.68} fill={"#10B981"} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"center"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"訂單追蹤"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={778.17} y={810.73} w={766.13} h={96.68} fill={"rgba(220, 38, 38, 0.969)"} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"center"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"利用掃描 "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"QR Code "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"追蹤"}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"領餐"}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"狀態"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={0} y={0} w={1407.37} h={84.03} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Method / Architecture / "}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Design"}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" / Testing / Operations / Conclusion"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page15: Page = () => (
  <AnimatedPage background={"#FFFFFF"}>
    <Shape x={0} y={0} w={1920} h={102.43} fill={"#E9EDEE"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"15"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"15"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={164.43} w={1614.43} h={112.38} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Baseline: all checked ✅"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={0} y={0} w={1407.37} h={84.03} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Method / Architecture / "}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Design"}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" / Testing / Operations / Conclusion"}</span>
      </TextPara>
    </TextBox>
    <Picture x={32} y={308.81} w={1856} h={542.84} src={image27} />
  </AnimatedPage>
);

const Page16: Page = () => (
  <AnimatedPage background={"#FFFFFF"}>
    <Shape x={0} y={0} w={1920} h={102.43} fill={"#E9EDEE"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"16"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={930.06} y={164.43} w={240} h={112.38} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"} delayMs={1800} activePageLabel={"page 16/44"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"員工"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"16"}</span>
      </TextPara>
    </TextBox>
    <Picture x={73.22} y={276.81} w={1030.95} h={699.9} src={image4} crop={[7502, 0, 6067, 0]} line={{ color: "#1A1A1A", width: 4, dash: "solid", head: "none", tail: "none" }} />
    <Picture x={413.15} y={382.6} w={942.99} h={665.74} src={image10} crop={[8361, 0, 8527, 0]} line={{ color: "#1A1A1A", width: 4, dash: "solid", head: "none", tail: "none" }} />
    <Picture x={654.87} y={493.76} w={1106.15} h={542.81} src={image24} line={{ color: "#1A1A1A", width: 4, dash: "solid", head: "none", tail: "none" }} />
    <TextBox x={1182.04} y={270.22} w={240} h={112.38} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"} delayMs={2400} activePageLabel={"page 16/44"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"商家"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1530.66} y={375.49} w={300} h={112.38} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"} delayMs={3000} activePageLabel={"page 16/44"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"福委會"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={164.43} w={857.89} h={112.38} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"} delayMs={1200} activePageLabel={"page 16/44"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Baseline: 3 apps"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={0} y={0} w={1407.37} h={84.03} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Method / Architecture / "}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Design"}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" / Testing / Operations / Conclusion"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page17: Page = () => (
  <AnimatedPage background={"#FFFFFF"}>
    <Shape x={0} y={0} w={1920} h={102.43} fill={"#E9EDEE"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"17"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={164.43} w={857.89} h={112.38} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Feature 1: "}</span>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"QR code Pipeline"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"17"}</span>
      </TextPara>
    </TextBox>
    <Picture x={0.51} y={373.64} w={1918.98} h={474.77} src={image23} crop={[0, 18041, 0, 37999]} />
    <Picture x={1167.21} y={162.43} w={426.95} h={884.36} src={image41} crop={[0, 4398, 0, 0]} />
    <Picture x={-1.62} y={354.1} w={1166.7} h={513.85} src={image22} crop={[0, 16001, 39412, 36561]} />
    <TextBox x={0} y={0} w={1407.37} h={84.03} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Method / Architecture / "}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Design"}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" / Testing / Operations / Conclusion"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page18: Page = () => (
  <AnimatedPage background={"#FFFFFF"}>
    <Shape x={0} y={0} w={1920} h={102.43} fill={"#E9EDEE"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"18"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={164.43} w={1614.43} h={112.38} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Feature 2: Enterprise governance"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"18"}</span>
      </TextPara>
    </TextBox>
    <Picture x={152.79} y={352} w={1614.43} h={606.96} src={image32} crop={[0, 18521, 3400, 16946]} />
    <TextBox x={0} y={0} w={1407.37} h={84.03} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Method / Architecture / "}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Design"}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" / Testing / Operations / Conclusion"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page19: Page = () => (
  <AnimatedPage background={"#FFFFFF"}>
    <Shape x={0} y={0} w={1920} h={102.43} fill={"#E9EDEE"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"19"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={164.43} w={583.87} h={168.25} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Feature 3: MCP"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"19"}</span>
      </TextPara>
    </TextBox>
    <Picture x={-11.36} y={343.07} w={777.07} h={634.33} src={image28} crop={[0, 10147, 0, 8220]} />
    <TextBox x={0} y={0} w={1407.37} h={84.03} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Method / Architecture / "}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Design"}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" / Testing / Operations / Conclusion"}</span>
      </TextPara>
    </TextBox>
    <Picture x={754.46} y={164.43} w={1445.26} h={812.96} src={image38} />
  </AnimatedPage>
);

const Page20: Page = () => (
  <AnimatedPage background={"#1A9988"}>
    <DecorativeLine fill={"#FFFFFF"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"20"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={153.17} y={277.68} w={1614.36} h={318.87} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Testing"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif" }}>{"20"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page21: Page = () => (
  <AnimatedPage background={"#FFFFFF"}>
    <Shape x={0} y={0} w={1920} h={102.43} fill={"#E9EDEE"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"21"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={164.43} w={1614.43} h={112.38} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Validation layers and quality gates"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"21"}</span>
      </TextPara>
    </TextBox>
    <Picture x={100.71} y={357.69} w={616.4} h={600.03} src={image33} crop={[8356, 18825, 8256, 0]} />
    <Picture x={750.1} y={615.44} w={1104.34} h={258.24} src={image37} />
    <TextBox x={750.1} y={873.68} w={629.92} h={84.03} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"SonarQube"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={738.68} y={357.69} w={1127.18} h={258.27} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"● "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Using go test, vitest, playwright, testify etc…"}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"● "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Include unit, integration, e2e test on codebase."}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"● "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Coverage "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>
          <AnimatedNumberText text={"98.4%"} direction={"up"} activePageLabel={"page 21/44"} />
        </span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" and Duplications only "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>
          <AnimatedNumberText text={"0.7%"} direction={"down"} activePageLabel={"page 21/44"} />
        </span>
      </TextPara>
    </TextBox>
    <TextBox x={0} y={0} w={1407.37} h={84.03} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Method / Architecture / "}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Design"}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" / "}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Testing"}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" / Operations / Conclusion"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page22: Page = () => (
  <AnimatedPage background={"#FFFFFF"}>
    <Shape x={0} y={0} w={960} h={1080} fill={"#E9EDEE"} />
    <DecorativeLine fill={brandLineFill} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"22"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.22} y={98.54} w={1554.33} h={122.83} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Scale validation "}</span>
      </TextPara>
    </TextBox>
    <TextBox x={249.5} y={485.13} w={693.1} h={528.44} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"TSMC-style demo data: "}</span>
      </TextPara>
      <TextPara align={"left"} mt={32} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"● "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"50,000 employees"}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"● "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"10 "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"merchants"}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"● "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"150 menu items"}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"● "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"19 pickup "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"points"}</span>
      </TextPara>
      <TextPara align={"left"} mt={32} mb={32}>
        <span style={{ fontSize: 48, color: "#1C3678", fontFamily: "Lato, Arial, sans-serif", textDecoration: "underline" }}>{"https://tbite-admin.nycu.ai/"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"22"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={234.37} y={362.29} w={629.92} h={122.83} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Raleway, Arial, sans-serif", fontWeight: 700 }}>{"applied demo"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1009.62} y={362.29} w={766.68} h={122.83} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Raleway, Arial, sans-serif", fontWeight: 700 }}>{"stress benchmark"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1009.62} y={485.13} w={847.43} h={576.76} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"● "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"100,000 employees"}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"● "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"200 merchants"}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"● "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"200 pickup points"}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"● "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"1,000,000 backend API requests"}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"● "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"0 failed"}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"● "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"571.7 people/s"}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"● "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"5717.3 backend Request Per Sec."}</span>
      </TextPara>
    </TextBox>
    <Shape x={1433.63} y={37.57} w={435.78} h={277.42} fill={"rgba(255, 255, 255, 0.969)"} line={{ color: "rgba(220, 38, 38, 0.969)", width: 3.14, dash: "solid", head: "none", tail: "none" }} kind={"roundRect"} />
    <TextBox x={1433.63} y={57.35} w={435.78} h={295.43} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 32, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Test Environment:"}</span>
      </TextPara>
      <TextPara align={"left"} mt={32} mb={0}>
        <span style={{ fontSize: 32, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"OrbStack on M5 Pro."}</span>
      </TextPara>
      <TextPara align={"left"} mt={32} mb={32}>
        <span style={{ fontSize: 32, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"400% CPU & 9G RAM used."}</span>
      </TextPara>
    </TextBox>
    <TextBox x={0} y={0} w={1407.37} h={84.03} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Method / Architecture / Design / "}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Testing"}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" / Operations / Conclusion"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page23: Page = () => (
  <AnimatedPage background={"#FFFFFF"}>
    <Shape x={0} y={0} w={1920} h={102.43} fill={"#E9EDEE"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"23"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={164.43} w={1614.43} h={112.38} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Chaos pass criteria"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={324.06} w={1614.43} h={474.77} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"● "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Delete a pod"}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"● "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Controller returns Ready < 3 min"}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"● "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Menu browsing remains available"}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"● "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Order succeeds or expected 409"}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"● "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"No sustained 5xx"}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"● "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Grafana shows fault + recovery"}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"● "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"No manual DB repair"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"23"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={0} y={0} w={1407.37} h={84.03} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Method / Architecture / Design / "}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Testing"}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" / Operations / Conclusion"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page24: Page = () => (
  <AnimatedPage background={"#FFFFFF"}>
    <Shape x={0} y={0} w={1920} h={102.43} fill={"#E9EDEE"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"24"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={164.43} w={1614.43} h={112.38} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Human-AI "}</span>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Heuristic"}</span>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{" Evaluation on Frontend"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={276.81} w={1081.76} h={790.05} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"AI Functional Chec"}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"k"}</span>
      </TextPara>
      <TextPara align={"left"} mt={32} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Claude Design checks whether buttons, pages, and flows are executable."}</span>
      </TextPara>
      <TextPara align={"left"} mt={32} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Human UX Review"}</span>
      </TextPara>
      <TextPara align={"left"} mt={32} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"We manually inspected whether the UI matches real users’ expectations."}</span>
      </TextPara>
      <TextPara align={"left"} mt={32} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Frontend Refinement"}</span>
      </TextPara>
      <TextPara align={"left"} mt={32} mb={32}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Because agent-generated frontend was weaker, we used human review to find layout, wording, and flow issues."}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"24"}</span>
      </TextPara>
    </TextBox>
    <Picture x={1327.33} y={287.97} w={420.42} h={739.19} src={image36} />
    <TextBox x={0} y={0} w={1407.37} h={84.03} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Method / Architecture / Design / "}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Testing"}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" / Operations / Conclusion"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page25: Page = () => (
  <AnimatedPage background={"#FFFFFF"}>
    <Shape x={0} y={0} w={1920} h={102.43} fill={"#E9EDEE"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"25"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={164.43} w={1614.43} h={112.38} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Cybersecurity Matters Too"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={324.06} w={1286.74} h={215.94} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"● "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Enterprise SSO + OAuth/OIDC"}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"● "}</span>
        <span style={{ fontSize: 48, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"CI/CD scan: CodeQL (CVE) + SonarQube (code smell)"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"25"}</span>
      </TextPara>
    </TextBox>
    <Picture x={152.79} y={509.92} w={1230.69} h={434.77} src={image25} crop={[17289, 708, 1923, 48728]} />
    <TextBox x={0} y={0} w={1407.37} h={84.03} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Method / Architecture / Design / "}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Testing"}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" / Operations / Conclusion"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page26: Page = () => (
  <AnimatedPage background={"#1A9988"}>
    <DecorativeLine fill={"#FFFFFF"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"26"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={153.17} y={277.68} w={1614.36} h={318.87} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Operations"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"26"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page27: Page = () => (
  <AnimatedPage background={"#FFFFFF"}>
    <Shape x={0} y={0} w={1920} h={102.43} fill={"#E9EDEE"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"27"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={164.43} w={1614.43} h={112.38} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"CI/CD"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={324.06} w={1614.43} h={474.77} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={32}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"、"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"27"}</span>
      </TextPara>
    </TextBox>
    <Picture x={54.86} y={294.58} w={1852.76} h={556.17} src={image39} crop={[0, 11015, 0, 35646]} />
    <Picture x={162.82} y={889.41} w={1567.51} h={123.28} src={image39} crop={[0, 88177, 15398, 0]} />
    <TextBox x={0} y={0} w={1407.37} h={84.03} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Method / Architecture / Design / "}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Testing"}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" / "}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Operations"}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" / Conclusion"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page28: Page = () => (
  <AnimatedPage background={"#FFFFFF"}>
    <Shape x={0} y={0} w={1920} h={102.43} fill={"#E9EDEE"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"28"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={164.43} w={1614.43} h={112.38} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"DevOps - argoCD"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"28"}</span>
      </TextPara>
    </TextBox>
    <Picture x={142.13} y={335.49} w={1203.92} h={745.93} src={image26} crop={[0, 0, 51426, 46498]} />
    <TextBox x={-2.78} y={2.78} w={1407.37} h={84.03} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Method / Architecture / Design / Testing / "}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Operations"}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" / Conclusion"}</span>
      </TextPara>
    </TextBox>
    <Picture x={1529.54} y={335.49} w={302.28} h={556.17} src={image39} crop={[66469, 11015, 17216, 35646]} />
  </AnimatedPage>
);

const Page29: Page = () => (
  <AnimatedPage background={"#FFFFFF"}>
    <Shape x={0} y={0} w={1920} h={102.43} fill={"#E9EDEE"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"29"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={164.43} w={1614.43} h={112.38} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Observability - "}</span>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Grafana"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"29"}</span>
      </TextPara>
    </TextBox>
    <Picture x={0} y={265.77} w={1489.72} h={814.22} src={image9} crop={[0, 2837, 0, 0]} />
    <TextBox x={0} y={0} w={1407.37} h={84.03} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Method / Architecture / Design / Testing / "}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Operations"}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{" / Conclusion"}</span>
      </TextPara>
    </TextBox>
    <Picture x={1556.59} y={573.91} w={315.91} h={284.74} src={image39} crop={[81929, 11013, 1020, 61679]} />
    <Picture x={1138.2} y={0} w={781.8} h={483.17} src={image40} />
  </AnimatedPage>
);

const Page30: Page = () => (
  <AnimatedPage background={"#1A9988"}>
    <DecorativeLine fill={"#FFFFFF"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"30"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={153.17} y={277.68} w={1614.36} h={318.87} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Conclusion"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif" }}>{"30"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page31: Page = () => (
  <AnimatedPage background={"#FFFFFF"}>
    <Shape x={0} y={0} w={1920} h={102.43} fill={"#E9EDEE"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"31"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={0} w={1614.43} h={112.38} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"center"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"System Architecture"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"31"}</span>
      </TextPara>
    </TextBox>
    <Picture x={150} y={112.38} w={1620} h={953.36} src={image35} crop={[0, 7080, 0, 4643]} />
    <Picture x={1467} y={182.58} w={82.98} h={82.65} src={image15} crop={[0, 0, 18726, 0]} />
    <Picture x={1467} y={211.43} w={82.98} h={63.32} src={image2} crop={[0, 0, 79396, 0]} />
    <Picture x={1474.12} y={683.93} w={273.13} h={165.91} src={image34} crop={[53957, 0, 0, 58932]} />
    <Picture x={1545.35} y={693.34} w={106.41} h={105.49} src={image31} crop={[0, 0, 4853, 36419]} />
    <TextBox x={1484.2} y={798.83} w={234.14} h={38.8} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"center"} mt={0} mb={0}>
        <span style={{ fontSize: 16, color: "#595959", fontFamily: "Lato, Arial, sans-serif" }}>{"Metrics + logs + traces"}</span>
      </TextPara>
    </TextBox>
    <Picture x={495.52} y={418.28} w={320.46} h={206.43} src={image34} crop={[53957, 0, 0, 56450]} />
    <Picture x={1628.48} y={683.93} w={73.65} h={89.66} src={image34} crop={[53959, 0, 23067, 58932]} />
  </AnimatedPage>
);

const Page32: Page = () => (
  <AnimatedPage background={"#1A9988"}>
    <DecorativeLine y={878.36} fill={"#FFFFFF"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"32"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={138.19} y={278.65} w={1614.36} h={261.35} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 128, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"158,914 LoC"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"32"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={153.17} y={540} w={1614.36} h={269.1} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"right"} mt={0} mb={32}>
        <span style={{ fontSize: 37.33, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif" }}>{"Total in Codebase @d567337"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page33: Page = () => (
  <AnimatedPage background={"#1A9988"}>
    <DecorativeLine y={878.36} fill={"#FFFFFF"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"33"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={138.19} y={278.65} w={1614.36} h={261.35} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 128, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"0 LoC"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"33"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={153.17} y={540} w={1614.36} h={269.1} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"right"} mt={0} mb={32}>
        <span style={{ fontSize: 37.33, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif" }}>{"Written by Hand"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page34: Page = () => (
  <AnimatedPage background={"#EB5600"}>
    <DecorativeLine y={878.36} fill={"#FFFFFF"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"34"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"34"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={153.17} y={540} w={1614.36} h={269.1} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={32}>
        <span style={{ fontSize: 37.33, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif" }}>{"To ignite a working codebase from scratch by GPT 5.3 Codex."}</span>
      </TextPara>
    </TextBox>
    <TextBox x={153.17} y={181.48} w={1721.89} h={358.55} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-end"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 192, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"3,600,000,000 "}</span>
        <span style={{ fontSize: 70.67, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"tokens"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page35: Page = () => (
  <AnimatedPage background={"#EB5600"}>
    <DecorativeLine y={878.36} fill={"#FFFFFF"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"35"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={153.17} y={181.48} w={1721.89} h={358.55} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-end"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 192, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"10,000,000,000 "}</span>
        <span style={{ fontSize: 70.67, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"tokens"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"35"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={153.17} y={540} w={1614.36} h={269.1} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif" }}>{"To complete the all project, with "}</span>
        <span style={{ fontSize: 37.33, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif" }}>{"days"}</span>
        <span style={{ fontSize: 37.33, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif" }}>{" of auto improvement and adversarial testing"}</span>
      </TextPara>
      <TextPara align={"left"} mt={32} mb={32}>
        <span style={{ fontSize: 37.33, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif" }}>{"with Claude Opus 4.7/4.8 and GPT-5."}</span>
        <span style={{ fontSize: 37.33, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif" }}>{"4/5"}</span>
        <span style={{ fontSize: 37.33, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif" }}>{".5."}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page36: Page = () => (
  <AnimatedPage background={"#EB5600"}>
    <DecorativeLine y={878.36} fill={"#FFFFFF"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"36"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={153.17} y={181.48} w={1474.27} h={358.55} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-end"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 192, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"$30 per hour"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"36"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={153.17} y={540} w={1614.36} h={269.1} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={32}>
        <span style={{ fontSize: 37.33, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif" }}>{"That’s $260k per year for an engineer without sleep!"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page37: Page = () => (
  <AnimatedPage background={"#EB5600"}>
    <DecorativeLine y={878.36} fill={"#FFFFFF"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"37"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={153.17} y={181.48} w={1474.27} h={626.77} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 192, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Thanks."}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif" }}>{"37"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page38: Page = () => (
  <AnimatedPage background={"#E9EDEE"}>
    <Shape x={0} y={0} w={1920} h={102.43} fill={"#FFFFFF"} />
    <DecorativeLine fill={brandLineFill} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"38"}</span>
      </TextPara>
    </TextBox>
    <Picture x={153.2} y={221.72} w={243.62} h={50.4} src={image14} />
    <TextBox x={59.57} y={171.56} w={1014.68} h={201.07} pad={[20.58, 20.58, 20.58, 20.58]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 68.61, fontWeight: 700, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"AI-Agent-Driven "}</span>
        <br />
        <span style={{ fontSize: 68.61, fontWeight: 700, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Enterprise Catering Platform:"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={44.23} y={465.2} w={313.89} h={337.64} pad={[20.58, 20.58, 20.58, 20.58]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 45.73, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Team 10"}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 45.73, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"林振可 Jacob "}</span>
        <br />
        <span style={{ fontSize: 45.73, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"王重鈞 Takala "}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 45.73, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"邱可菡 DW "}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 45.73, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"洪軾凱 Sky "}</span>
      </TextPara>
    </TextBox>
    <Picture x={1074.24} y={171.56} w={765.37} h={201.1} src={image13} crop={[4605, 18908, 4930, 16733]} />
    <Picture x={358.12} y={489.82} w={729.86} h={507.53} src={image4} crop={[8852, 0, 6767, 0]} />
    <Picture x={1102.16} y={489.82} w={773.59} h={507.53} src={image10} crop={[8973, 0, 8170, 7347]} />
    <TextBox x={59.57} y={361.27} w={1779.21} h={103.94} pad={[20.58, 20.58, 20.58, 20.58]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 51.47, color: "#1A1A1A", fontFamily: "Raleway, Arial, sans-serif", fontWeight: 700 }}>{"From Greenfield Generation to Self-Hostable Kubernetes Validation"}</span>
      </TextPara>
    </TextBox>
    <Picture x={112.36} y={802.84} w={201.1} h={201.1} src={image5} />
    <TextBox x={6.87} y={988.96} w={712.19} h={84.03} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1C3678", fontFamily: "Lato, Arial, sans-serif", textDecoration: "underline" }}>{"Agentic-Build/corporate-catering-system"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page39: Page = () => (
  <AnimatedPage background={"#1A9988"}>
    <DecorativeLine fill={"#FFFFFF"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"39"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={153.17} y={277.68} w={1614.36} h={193.39} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Appendix: "}</span>
        <span style={{ fontSize: 69.33, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"後續評審提問"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif" }}>{"39"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={456.71} w={1614.43} h={467.46} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={26.67} mb={32}>
        <span style={{ fontSize: 37.33, color: "#FFFFFF", fontFamily: "Lato, Arial, sans-serif" }}>{"報告 / QA 錄音："}</span>
        <br />
        <span style={{ fontSize: 37.33, color: "#1C3678", fontFamily: "Lato, Arial, sans-serif", textDecoration: "underline" }}>{"https://web.plaud.ai/s/pub_ffc69912-cb15-412f-9255-ef00a5ef2d11::sTq-v76964vl2luWX5VnTkvPe2m3Tf5_UJgFcGHxhIqIaIEo94HPNSTAIlUyg8L9-vmut8I01vinNMIC"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page40: Page = () => (
  <AnimatedPage background={"#FFFFFF"}>
    <Shape x={0} y={0} w={1920} h={102.43} fill={"#E9EDEE"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"40"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={164.43} w={1614.43} h={180} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 58.67, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Q1: 如果系統遇到狀況，是交給 IT 嗎？你們有監控嗎？"}</span>
        <br />
        <span style={{ fontSize: 58.67, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"監控發現問題後，誰會去處理？"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#595959", fontFamily: "Lato, Arial, sans-serif" }}>{"40"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={363.58} w={1614.43} h={560.57} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={26.67} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"我們有透過 Grafana 和 observability stack 監控系統狀態。"}</span>
      </TextPara>
      <TextPara align={"left"} mt={32} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"出問題時，第一線會先交給 agent SREs 做分類與初步判斷。"}</span>
      </TextPara>
      <TextPara align={"left"} mt={32} mb={32}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"如果是比較麻煩、需要人類判斷的問題，才會回到我們團隊處理。"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page41: Page = () => (
  <AnimatedPage background={"#FFFFFF"}>
    <Shape x={0} y={0} w={1920} h={102.43} fill={"#E9EDEE"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"41"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={164.43} w={1614.43} h={199.18} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Q2: 你們有真的進去看系統發生什麼嗎？如果發現行為和預期不同，會怎麼處理？"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#595959", fontFamily: "Lato, Arial, sans-serif" }}>{"41"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={363.58} w={1614.43} h={560.57} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={26.67} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"在開發過程中，如果我們發現前端行為不是預期的樣子，我們通常不是直接去看資料庫。"}</span>
      </TextPara>
      <TextPara align={"left"} mt={32} mb={32}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"我們會重新描述「我們需要的做法是什麼」，再讓 agent 根據這個行為需求去修改。"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page42: Page = () => (
  <AnimatedPage background={"#FFFFFF"}>
    <Shape x={0} y={0} w={1920} h={102.43} fill={"#E9EDEE"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"42"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={164.43} w={1614.43} h={199.18} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Q3: 有沒有比較印象深刻的差異？Agent 哪些地方比較容易卡住？"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#595959", fontFamily: "Lato, Arial, sans-serif" }}>{"42"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={363.58} w={1614.43} h={662.68} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={26.67} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Agent 過不去的地方大多是在前端。後端其實幾乎沒有遇到太多問題，但前端問題很多。"}</span>
      </TextPara>
      <TextPara align={"left"} mt={32} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"我們花了很多時間處理："}</span>
      </TextPara>
      <TextPara align={"left"} mt={32} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"● "}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"使用者預期的操作方式"}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"● "}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"accessibility 問題"}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"● "}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"明顯的前端互動錯誤"}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"● "}</span>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"功能語意不清楚造成的錯誤產物"}</span>
      </TextPara>
      <TextPara align={"left"} mt={32} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"如果是整體上，有一個例子是去除多出來的功能："}</span>
      </TextPara>
      <TextPara align={"left"} mt={32} mb={32}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"系統原本做出了員工端不需要看的報表，但實際上這類資訊不應該給員工端使用。"}</span>
        <br />
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"所以我們後來不是加功能，而是把這個不必要的功能砍掉。"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page43: Page = () => (
  <AnimatedPage background={"#FFFFFF"}>
    <Shape x={0} y={0} w={1920} h={102.43} fill={"#E9EDEE"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"43"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={164.43} w={1614.43} h={199.18} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Q4: 前端和後端的 AI 效果差在哪？"}</span>
      </TextPara>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"這些問題是功能做不到，還是描述不清楚？"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#595959", fontFamily: "Lato, Arial, sans-serif" }}>{"43"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={363.58} w={1614.43} h={662.68} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={26.67} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"很多問題來自功能層面的描述不夠清楚。"}</span>
      </TextPara>
      <TextPara align={"left"} mt={32} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"前端的部分，即使有 AI 協助，效果仍然有限，需要人工驗證。"}</span>
      </TextPara>
      <TextPara align={"left"} mt={32} mb={32}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"但在後端以及相關系統設計上，AI 產出的結果相對穩定，也能在壓力測試中達到穩定執行狀態。"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

const Page44: Page = () => (
  <AnimatedPage background={"#FFFFFF"}>
    <Shape x={0} y={0} w={1920} h={102.43} fill={"#E9EDEE"} />
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#777777", fontFamily: "Lato, Arial, sans-serif" }}>{"44"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={164.43} w={1614.43} h={199.18} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={0} mb={0}>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"Q5: Database schema 在 optimization loop 裡會怎麼處理？"}</span>
        <span style={{ fontSize: 69.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif", fontWeight: 700 }}>{"會不會一直變？"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={1792.4} y={997.34} w={115.21} h={82.65} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"center"}>
      <TextPara align={"right"} mt={0} mb={0}>
        <span style={{ fontSize: 26.67, color: "#595959", fontFamily: "Lato, Arial, sans-serif" }}>{"44"}</span>
      </TextPara>
    </TextBox>
    <TextBox x={152.79} y={363.58} w={1614.43} h={662.68} pad={[19.2, 19.2, 19.2, 19.2]} anchor={"flex-start"}>
      <TextPara align={"left"} mt={26.67} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"Database schema 會在 optimization loop 裡一直變動。"}</span>
      </TextPara>
      <TextPara align={"left"} mt={32} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"例如 scenario 可能要求 Service Level Agreement 或 performance，"}</span>
        <br />
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"agent 會為了效能或需求去調整 schema。"}</span>
      </TextPara>
      <TextPara align={"left"} mt={32} mb={0}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"我們認為這些 schema 變動在當下可以幫助系統達到最終目標，"}</span>
        <br />
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"但缺點是 schema 可能變動過於頻繁。"}</span>
      </TextPara>
      <TextPara align={"left"} mt={32} mb={32}>
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"實際部署後，如果要避免這種快速變動，"}</span>
        <br />
        <span style={{ fontSize: 37.33, color: "#1A1A1A", fontFamily: "Lato, Arial, sans-serif" }}>{"可能會變成另一個 requirement，也就是需要限制 schema 變動不要太劇烈。"}</span>
      </TextPara>
    </TextBox>
  </AnimatedPage>
);

export const meta: SlideMeta = { title: 'T-Bite Final Google Slides Rebuild' };
export default [Page01, Page02, Page03, Page04, Page05, Page06, Page07, Page08, Page09, Page10, Page11, Page12, Page13, Page14, Page15, Page16, Page17, Page18, Page19, Page20, Page21, Page22, Page23, Page24, Page25, Page26, Page27, Page28, Page29, Page30, Page31, Page32, Page33, Page34, Page35, Page36, Page37, Page38, Page39, Page40, Page41, Page42, Page43, Page44] satisfies Page[];
