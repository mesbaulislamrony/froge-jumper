import { useId } from 'react';
import type { CSSProperties } from 'react';
import type { PlatformStyle } from '../config';

type PlatformProps = {
  style: PlatformStyle;
  className: string;
  position: CSSProperties;
  active?: boolean;
};

function GrassIsland({ active, id }: { active: boolean; id: string }) {
  return (
    <svg viewBox="0 0 300 110" className={`platform-art platform-grass ${active ? 'platform-active' : ''}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-grass-top`} x2="0" y2="1"><stop stopColor="#b4f36d" /><stop offset=".45" stopColor="#91df52" /><stop offset="1" stopColor="#6fc13a" /></linearGradient>
        <linearGradient id={`${id}-grass-under`} x2="0" y2="1"><stop stopColor="#548c3f" /><stop offset="1" stopColor="#2c653c" /></linearGradient>
      </defs>
      <ellipse cx="150" cy="95" rx="115" ry="10" fill="#161341" opacity=".28" />
      <path d="M52 56q-8 12-4 23l24 17q76 20 154 0l24-17q4-11-4-23Z" fill={`url(#${id}-grass-under)`} stroke="#294d42" strokeWidth="4" />
      <path d="M54 68q18 17 42 13t49 3q31-12 57-3t45-13l9-13q5-23-18-28-13-19-35-9-18-20-41-6-22-17-41-2-26-12-43 7-25-3-31 18-21 6-13 33Z" fill={`url(#${id}-grass-top)`} stroke="#315a43" strokeWidth="5" strokeLinejoin="round" />
      <path d="M62 50q12-19 31-10 12-22 33-7 14-18 29-3 23-19 38 3 22-13 34 8 15-1 20 16" fill="none" stroke="#d5ff9b" strokeWidth="6" strokeLinecap="round" opacity=".9" />
      <ellipse cx="150" cy="67" rx="53" ry="9" fill="#3e803c" opacity=".33" />
      <g fill="none" stroke="#e1ff9f" strokeWidth="2.3" strokeLinecap="round" opacity=".8"><path d="M91 59q14-19 31-18m-17 8-2 9m11-14 3 8m93 11q-15-21-35-20m17 8 3 9m-12-14-4 8" /></g>
      <path d="M132 91q-12 15-7 19m32-18q11 14 6 19m-58-20q-6 10-2 15" fill="none" stroke="#81523e" strokeWidth="8" strokeLinecap="round" />
      <g className="platform-flowers"><path d="M77 50q-7-8-12-2-2 7 8 7-9 5-3 10 7 2 9-7 4 9 10 5 4-6-5-10 10-1 7-8-4-6-12 1-1-10-8-8-6 3-1 12Z" fill="#ff78ce" stroke="#783e82" strokeWidth="1.5"/><circle cx="80" cy="54" r="3" fill="#fff39e"/><path d="M220 49q-7-8-12-2-2 7 8 7-9 5-3 10 7 2 9-7 4 9 10 5 4-6-5-10 10-1 7-8-4-6-12 1-1-10-8-8-6 3-1 12Z" fill="#fff7f2" stroke="#d77bb9" strokeWidth="1.5"/><circle cx="223" cy="53" r="3" fill="#f9d265"/></g>
    </svg>
  );
}

function CloudIsland({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 300 110" className={`platform-art platform-cloud ${active ? 'platform-active' : ''}`} aria-hidden="true">
      <ellipse cx="150" cy="97" rx="117" ry="9" fill="#3c5a95" opacity=".28" />
      <path d="M55 59q-24-9-17 15 13 19 51 18h121q40-5 50-20 6-21-20-17-5-29-34-22-14-28-42-9-24-30-46-5-30-14-40 12-28-1-23 28Z" fill="#fffdf9" stroke="#5d9fce" strokeWidth="5" strokeLinejoin="round" />
      <path d="M57 64q32 9 61 2 40 14 77 0 26 6 53-4" fill="none" stroke="#d4f1ff" strokeWidth="7" strokeLinecap="round" />
      <path d="M127 86q-12 17-5 23m39-23q10 16 6 22m-60-22q-5 11-2 15" fill="none" stroke="#b87559" strokeWidth="7" strokeLinecap="round" />
      <path d="M91 55q11-10 21-4m90 5q12-12 22-5" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <g fill="#f7a8be"><path d="M81 57q-6-8-11-3-2 6 6 6-7 4-2 8 6 1 7-6 4 7 8 4 3-5-4-8 8-1 5-7-3-5-9 1-1-8-6-6-4 2 0 10Z"/><circle cx="83" cy="59" r="2.5" fill="#fff2a1"/></g>
    </svg>
  );
}

function MoonIsland({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 300 110" className={`platform-art platform-moon ${active ? 'platform-active' : ''}`} aria-hidden="true">
      <ellipse cx="150" cy="98" rx="115" ry="9" fill="#090e29" opacity=".42" />
      <path d="M42 70q-9-17 8-23l15-19 35 4q16-14 31 0l32-9 24 13 32-1 23 22q20 13 7 29-17 15-54 9l-127 1q-36-5-26-26Z" fill="#8792c9" stroke="#343866" strokeWidth="5" strokeLinejoin="round" />
      <path d="M54 68q27 12 53 5 29 10 52 0 35 9 83-1" fill="none" stroke="#b8c5ed" strokeWidth="7" strokeLinecap="round" />
      <ellipse cx="104" cy="58" rx="12" ry="7" fill="#616da8"/><ellipse cx="194" cy="63" rx="8" ry="5" fill="#616da8"/><circle cx="151" cy="48" r="5" fill="#6974b1"/>
      <path d="M125 89q-12 15-5 22m35-21q10 16 6 22" fill="none" stroke="#8a604f" strokeWidth="7" strokeLinecap="round" />
      <path d="M74 47l8-10 7 11m122 3 8-9 9 11" fill="none" stroke="#91f5dd" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function Platform({ style, className, position, active = false }: PlatformProps) {
  const id = useId().replaceAll(':', '');
  return (
    <div className={`scene-platform ${className}`} style={position} aria-hidden="true">
      {style === 'grass' && <GrassIsland active={active} id={id} />}
      {style === 'cloud' && <CloudIsland active={active} />}
      {style === 'moon-rock' && <MoonIsland active={active} />}
    </div>
  );
}
