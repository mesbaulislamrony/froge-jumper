import type { CharacterSkin } from '../config';

type CharacterProps = {
  skin: CharacterSkin;
  reaction: 'idle' | 'jump' | 'hit' | 'celebrate';
};

function Monkey() {
  return (
    <svg viewBox="0 0 180 190" className="character-svg monkey-svg" role="img" aria-label="A friendly cartoon monkey">
      <g fill="none" stroke="#48263c" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        <path className="monkey-tail" d="M51 127c-45 8-53 40-30 47 20 7 28-14 14-17-10-2-12 9-4 10" />
        <path d="M51 119 35 146m92-25 16 25" />
      </g>
      <path d="M57 99q-37 16-31 45 4 15 24 11l19-16m37-41q37 15 31 43-3 15-24 13l-17-16" fill="#9a5638" stroke="#48263c" strokeWidth="8" strokeLinejoin="round" />
      <ellipse cx="90" cy="117" rx="41" ry="48" fill="#a96542" stroke="#48263c" strokeWidth="8" />
      <ellipse cx="91" cy="126" rx="25" ry="31" fill="#edc18b" />
      <path className="monkey-arms" d="M61 69q-15-17-23-1-8 22 17 26m67-25q18-17 25 1 7 22-18 25" fill="#a96542" stroke="#48263c" strokeWidth="8" />
      <ellipse cx="56" cy="81" rx="12" ry="16" fill="#edaa84" stroke="#6e3a37" strokeWidth="4" />
      <ellipse cx="124" cy="81" rx="12" ry="16" fill="#edaa84" stroke="#6e3a37" strokeWidth="4" />
      <path d="M46 63q0-43 44-48 45 4 45 49l-8 38q-8 28-37 28-30 0-38-28Z" fill="#b76a43" stroke="#48263c" strokeWidth="8" />
      <ellipse cx="90" cy="88" rx="36" ry="29" fill="#f2cf9a" stroke="#6e3a37" strokeWidth="4" />
      <ellipse cx="77" cy="79" rx="7" ry="9" fill="#fff"/><ellipse cx="103" cy="79" rx="7" ry="9" fill="#fff"/>
      <ellipse cx="78" cy="81" rx="3.5" ry="5" fill="#31223d"/><ellipse cx="104" cy="81" rx="3.5" ry="5" fill="#31223d"/>
      <circle cx="79" cy="79" r="1.7" fill="#fff"/><circle cx="105" cy="79" r="1.7" fill="#fff"/>
      <path d="M69 68q9-7 17-1m9 0q8-7 17 1" fill="none" stroke="#603443" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="90" cy="91" rx="8" ry="6" fill="#7f453f" />
      <path d="M72 99q18 20 37 0" fill="#8d394b" stroke="#48263c" strokeWidth="4" strokeLinecap="round" />
      <path d="M77 100q12 7 25 0v7q-12 7-25 0Z" fill="#fffaf0" />
      <path d="M80 118q10 6 19 0" fill="none" stroke="#d7a674" strokeWidth="3" strokeLinecap="round" />
      <path d="M59 154q-10 5-18 2-13-3-15 9-2 12 13 14h25q11-5 5-18m63-7q10 5 18 2 13-3 15 9 2 12-13 14h-25q-11-5-5-18" fill="#a96542" stroke="#48263c" strokeWidth="7" strokeLinejoin="round" />
      <path d="M40 166h23m56 0h22" stroke="#edc18b" strokeWidth="5" strokeLinecap="round" />
      <path d="M57 55q12-19 31-10m16-2q18-5 30 12" fill="none" stroke="#d6915e" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function Chick() {
  return (
    <svg viewBox="0 0 180 190" className="character-svg chick-svg" role="img" aria-label="A cheerful little chick">
      <path className="chick-wings" d="M54 77q-35-20-35-3 7 28 40 30m68-27q34-20 35-2-7 26-40 30" fill="#ffd95e" stroke="#75434a" strokeWidth="8" strokeLinejoin="round" />
      <path d="M72 38q-19-28-25-10 1 18 19 23m22-17q9-28 17-10l-6 21m24-10q23-19 22-2-7 16-23 20" fill="#ffdf62" stroke="#75434a" strokeWidth="7" strokeLinejoin="round" />
      <ellipse cx="91" cy="110" rx="49" ry="56" fill="#ffe36c" stroke="#75434a" strokeWidth="8" />
      <ellipse cx="91" cy="127" rx="26" ry="31" fill="#fff0ad" />
      <ellipse cx="75" cy="92" rx="7" ry="9" fill="#fff"/><ellipse cx="106" cy="92" rx="7" ry="9" fill="#fff"/>
      <ellipse cx="76" cy="94" rx="3.5" ry="5" fill="#2f3154"/><ellipse cx="107" cy="94" rx="3.5" ry="5" fill="#2f3154"/>
      <circle cx="77" cy="92" r="1.7" fill="#fff"/><circle cx="108" cy="92" r="1.7" fill="#fff"/>
      <path d="m84 105 13 0-7 11Z" fill="#ff9658" stroke="#75434a" strokeWidth="3" strokeLinejoin="round" />
      <path d="M80 120q12 13 24 0" fill="none" stroke="#75434a" strokeWidth="4" strokeLinecap="round" />
      <path d="M69 160q-4 10-13 15m55-15q5 10 14 15" fill="none" stroke="#75434a" strokeWidth="7" strokeLinecap="round" />
      <path d="M49 103q-13-3-20 8m101-9q13-3 20 8" fill="none" stroke="#75434a" strokeWidth="7" strokeLinecap="round" />
      <ellipse cx="60" cy="108" rx="9" ry="5" fill="#f59d9b" opacity=".8"/><ellipse cx="123" cy="108" rx="9" ry="5" fill="#f59d9b" opacity=".8" />
    </svg>
  );
}

function AstronautCat() {
  return (
    <svg viewBox="0 0 180 190" className="character-svg cat-svg" role="img" aria-label="A cat astronaut explorer">
      <path d="M49 91q-31 32-6 47 18 7 25-16m64-28q30 29 7 46-18 9-25-15" fill="none" stroke="#352d5a" strokeWidth="12" strokeLinecap="round" />
      <path d="M57 103q-35 1-27 35l20 24h82l20-25q8-31-28-34" fill="#f3f5ff" stroke="#292a53" strokeWidth="8" strokeLinejoin="round" />
      <path d="M72 118h37l13 39H59Z" fill="#b9c9ed" stroke="#626da6" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="91" cy="135" r="11" fill="#77e8db" stroke="#fff" strokeWidth="4" />
      <path d="m43 52 3-37 31 20m28-1 29-20-2 43" fill="#e6e9fb" stroke="#302850" strokeWidth="8" strokeLinejoin="round" />
      <path d="M49 64q0-35 42-38 43 2 43 39v30q-5 34-43 37-38-2-42-37Z" fill="#c9cbe4" stroke="#302850" strokeWidth="8" />
      <path d="M56 77q7-31 35-31 29 0 36 31v18q-8 23-36 24-28-1-35-24Z" fill="#f5d6c3" stroke="#69527a" strokeWidth="4" />
      <path d="M63 53q27-30 58 0" fill="none" stroke="#a8f3eb" strokeWidth="7" opacity=".9" />
      <ellipse cx="77" cy="83" rx="6" ry="8" fill="#fff"/><ellipse cx="104" cy="83" rx="6" ry="8" fill="#fff"/>
      <ellipse cx="78" cy="84" rx="3" ry="4" fill="#383052"/><ellipse cx="105" cy="84" rx="3" ry="4" fill="#383052"/>
      <path d="m87 95 8 0-4 5Z" fill="#e58b98"/><path d="M82 106q10 11 22 0" fill="none" stroke="#5d3957" strokeWidth="4" strokeLinecap="round" />
      <path d="M31 131h21m76 0h21" stroke="#91f5dd" strokeWidth="7" strokeLinecap="round" />
      <circle cx="47" cy="124" r="6" fill="#ff7ec6"/><circle cx="135" cy="124" r="6" fill="#ff7ec6"/>
    </svg>
  );
}

export default function Character({ skin, reaction }: CharacterProps) {
  return (
    <div className={`character-actor skin-${skin} motion-${reaction}`} aria-label={skin === 'monkey' ? 'Your monkey climber' : skin === 'chick' ? 'Your chick climber' : 'Your astronaut cat climber'}>
      {skin === 'monkey' && <Monkey />}
      {skin === 'chick' && <Chick />}
      {skin === 'astronaut-cat' && <AstronautCat />}
      <span className="actor-sparkles" aria-hidden="true">✦</span>
    </div>
  );
}
