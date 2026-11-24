import type { CSSProperties } from 'react';
import type { LevelConfig } from '../config';

type BackgroundProps = Pick<LevelConfig, 'theme' | 'colors'>;

function Flower({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} className="svg-flower">
      <path d="M0 0c-17-19-3-31 6-14C16-31 30-17 10-3c22-1 19 17-2 12C18 27 1 32-2 9c-7 20-23 10-10-6-21 6-25-10-3-13-14-14-1-26 10-7Z" fill="#ff75cb" stroke="#8f3d9b" strokeWidth="2" />
      <circle r="5" fill="#ffe784" stroke="#fff4bc" strokeWidth="2" />
    </g>
  );
}

function JungleBackground({ colors }: { colors: LevelConfig['colors'] }) {
  return (
    <>
      <defs>
        <linearGradient id="night-sky" x2="0" y2="1"><stop stopColor={colors.sceneTop} /><stop offset="1" stopColor={colors.sceneBottom} /></linearGradient>
        <linearGradient id="lavender-vine" x2="1"><stop stopColor="#b7a0ed" /><stop offset=".5" stopColor="#f0c4fb" /><stop offset="1" stopColor="#806ac6" /></linearGradient>
        <linearGradient id="branch-bark" x2="0" y2="1"><stop stopColor="#966047" /><stop offset=".45" stopColor="#704337" /><stop offset="1" stopColor="#4b2d42" /></linearGradient>
      </defs>
      <rect width="1000" height="800" fill="url(#night-sky)" />
      <circle cx="784" cy="126" r="60" fill="#fff2bd" opacity=".1" />
      <circle cx="784" cy="126" r="38" fill="#fff5cf" opacity=".8" />
      <circle cx="800" cy="114" r="36" fill="#7966ba" opacity=".72" />
      <g className="parallax-far" opacity=".2" fill={colors.far}>
        <path d="M0 0h210L95 210l88 12L55 385l95 4L0 540Z" />
        <path d="M1000 0H830l102 166-110 8 146 180-101 18 133 145Z" />
        <path d="M110 0q28 120 152 142-123 10-157-75M910 0q-34 119-150 150 120-6 164-79" />
      </g>
      <g className="parallax-mid" opacity=".22" fill={colors.mid}>
        <path d="M0 0h80q24 158 95 222L64 182 0 304Zm1000 0h-71q-18 134-110 221l112-42 69 151Z" />
        <path d="M0 520q175-83 326 11 104 66 242 1 209-98 432 35v233H0Z" />
        <path d="M0 616q158-100 328 0 189 111 335 13t337 26v145H0Z" />
      </g>
      <g className="parallax-near" opacity=".22" fill={colors.near}>
        <path d="M0 800V276q35 55 18 122 42-38 70-35-27 53-69 74 67-10 97 23-72 8-124-7v347Zm1000 0V230q-33 71-15 127-47-51-81-39 29 61 78 78-64-4-111 40 77 5 129-9Z" />
        <path d="M0 722q148-103 295-40 125 55 243 3 202-89 462 35v80H0Z" />
      </g>
      <g className="leaf-linework" fill="none" stroke="#d7c8ff" strokeWidth="1.3" opacity=".18">
        <path d="M62 485q78-94 141-42m-97 27 10-39m18 24 18-42m-118 80 37-1m691-388q77 43 112 106m-81-73 8-40m18 57 30-25m-126-8 32-35M140 692q58-99 140-74m-98 35 6-44m21 30 24-37M803 538q64-72 142-41m-90 19 4-35m28 22 21-31" />
        <path d="M43 280q42 33 67 83m-50-55-1 27m23-4 18 15m755 277q-36 45-54 93m42-63-1 24m-23-8-15 17" />
      </g>
      <g className="left-lavender-vine" fill="none" strokeLinecap="round">
        <path d="M70-20c-43 92 33 140-7 218s29 128-6 216 27 129-4 216 22 111-8 195" stroke="#241b54" strokeWidth="15" opacity=".7" />
        <path d="M70-20c-43 92 33 140-7 218s29 128-6 216 27 129-4 216 22 111-8 195" stroke="url(#lavender-vine)" strokeWidth="10" />
        <path d="M70 76q-43-32-66-9m59 82q47-40 83-16m-91 166q-48-31-76-5m72 149q52-42 87-18m-96 158q-46-36-80-9m70 146q42-31 80-9" stroke="#bd9ce9" strokeWidth="5" />
      </g>
      <g className="vine-flowers"><Flower x={60} y={113} scale={.65} /><Flower x={86} y={290} scale={.7} /><Flower x={31} y={443} scale={.58} /><Flower x={68} y={607} scale={.68} /></g>
      <g className="branch-sweep">
        <path d="M1060 208c-160-45-251-1-322 85s-143 113-253 90" fill="none" stroke="#3a2147" strokeWidth="54" strokeLinecap="round" opacity=".45" />
        <path d="M1060 195c-160-45-251-1-322 85s-143 113-253 90" fill="none" stroke="url(#branch-bark)" strokeWidth="43" strokeLinecap="round" />
        <path d="M987 176q-151-38-224 28m146-4q-89-7-139 50m-83 101q-62 45-126 43" fill="none" stroke="#bd8666" strokeWidth="4" strokeLinecap="round" opacity=".5" />
        <path d="M907 207q30 82 20 165m-73-112q-34 73-25 127m-73-43q-32 58-72 87" fill="none" stroke="#407446" strokeWidth="7" strokeLinecap="round" />
        <path d="M926 292q-41 0-58 34 44 6 58-34m-82 64q-38-4-58 28 40 8 58-28m121 33q-37-4-60 25 43 12 60-25" fill="#79bd55" stroke="#294f48" strokeWidth="2" />
        <Flower x={842} y={250} scale={.54} /><Flower x={785} y={322} scale={.48} /><Flower x={930} y={364} scale={.52} />
      </g>
      <g className="fireflies">
        <circle cx="241" cy="191" r="3" /><circle cx="337" cy="359" r="2.5" /><circle cx="607" cy="184" r="3" /><circle cx="728" cy="416" r="2" /><circle cx="469" cy="590" r="3" /><circle cx="873" cy="538" r="2.5" />
      </g>
    </>
  );
}

function SkyBackground({ colors }: { colors: LevelConfig['colors'] }) {
  return (
    <>
      <defs><linearGradient id="sunset-sky" x2="0" y2="1"><stop stopColor={colors.sceneTop} /><stop offset="1" stopColor={colors.sceneBottom} /></linearGradient></defs>
      <rect width="1000" height="800" fill="url(#sunset-sky)" />
      <circle cx="773" cy="173" r="65" fill="#fff5c3" opacity=".8" />
      <g className="parallax-far" fill={colors.far} opacity=".45"><path d="M-20 305q80-85 177-12 72-101 177-18 97-84 190-11 70-100 159-17 87-95 180-15 83-54 157-12v300H0Z" /></g>
      <g className="rainbow-trail" fill="none" strokeLinecap="round" opacity=".44"><path d="M620 460a170 170 0 0 1 340 0" stroke="#ff8cae" strokeWidth="18" /><path d="M641 460a149 149 0 0 1 298 0" stroke="#ffdf83" strokeWidth="14" /><path d="M660 460a130 130 0 0 1 260 0" stroke="#9be8ba" strokeWidth="12" /></g>
      <g className="sky-birds" fill="none" stroke="#fffdf5" strokeWidth="5" strokeLinecap="round" opacity=".82"><path d="M244 247q14-17 28 0 14-17 28 0m57-57q11-14 22 0 11-14 22 0m-170 172q9-12 18 0 9-12 18 0" /></g>
      <g className="parallax-mid" fill="#fff" opacity=".25"><path d="M-30 468q70-93 144-23 65-96 142-15 72-80 142-4 77-69 144 7v265H0Zm522 60q71-85 147-13 68-96 139-22 70-72 148-5v235H520Z" /></g>
      <g className="leaf-linework" fill="none" stroke="#fff" strokeWidth="2" opacity=".22"><path d="M40 172q69 18 108 81m-86-45-3 27m29-11 18 22m667 211q54-58 104-50m-61 15 3-27m17 18 18-19" /></g>
      <g className="fireflies"><circle cx="205" cy="306" r="4" /><circle cx="526" cy="230" r="3" /><circle cx="827" cy="341" r="3" /><circle cx="460" cy="591" r="3" /></g>
    </>
  );
}

function SpaceBackground({ colors }: { colors: LevelConfig['colors'] }) {
  return (
    <>
      <defs><radialGradient id="space-depth" cx="75%" cy="25%" r="85%"><stop stopColor="#3f3c83" /><stop offset="1" stopColor={colors.sceneTop} /></radialGradient></defs>
      <rect width="1000" height="800" fill="url(#space-depth)" />
      <g className="parallax-far" fill="#fff5c7"><circle cx="98" cy="115" r="2" /><circle cx="301" cy="81" r="3" /><circle cx="514" cy="186" r="2" /><circle cx="892" cy="108" r="3" /><circle cx="719" cy="280" r="2" /><circle cx="212" cy="391" r="2" /><circle cx="946" cy="492" r="2" /><circle cx="439" cy="598" r="3" /><circle cx="80" cy="683" r="2" /><circle cx="832" cy="704" r="3" /></g>
      <g className="planet-orbit"><circle cx="819" cy="203" r="76" fill="#ed8e9f" /><path d="M743 195q76-32 152 0" fill="none" stroke="#ffc5a4" strokeWidth="11" opacity=".6" /><circle cx="819" cy="203" r="58" fill="#bd688f" opacity=".34" /></g>
      <g className="parallax-mid" fill="none" stroke="#8edff1" strokeWidth="4" opacity=".25"><path d="M0 232q190-94 380 0t380 0q120-58 240-12M-80 686q200-84 400 0t400 0q160-65 320-12" /></g>
      <g className="star-chain" fill="none" stroke="#c5a5ff" strokeWidth="2" opacity=".55"><path d="M173 179q38 73 7 143t14 117" /><path d="M882 378q-44 66-12 130t-22 119" /></g>
      <g className="comet-trails" fill="none" strokeLinecap="round"><path d="M305 260q38-30 75-24" stroke="#91f5dd" strokeWidth="4" opacity=".7" /><path d="M296 270q40-27 61-23" stroke="#fff" strokeWidth="2" opacity=".6" /><path d="M669 590q54-28 92-17" stroke="#bd8cff" strokeWidth="4" opacity=".65" /></g>
      <g className="fireflies"><circle cx="188" cy="275" r="3" /><circle cx="375" cy="314" r="2" /><circle cx="664" cy="377" r="3" /><circle cx="928" cy="601" r="2" /></g>
    </>
  );
}

export default function Background({ theme, colors }: BackgroundProps) {
  const style = { '--scene-top': colors.sceneTop, '--scene-bottom': colors.sceneBottom } as CSSProperties;
  return (
    <svg className={`scene-art scene-art-${theme}`} style={style} viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {theme === 'jungle' && <JungleBackground colors={colors} />}
      {theme === 'sky' && <SkyBackground colors={colors} />}
      {theme === 'space' && <SpaceBackground colors={colors} />}
    </svg>
  );
}
