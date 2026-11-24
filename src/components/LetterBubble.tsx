type LetterBubbleProps = {
  letter: string;
  hinted: boolean;
  wobble: boolean;
  pop: boolean;
  onPress: () => void;
};

export default function LetterBubble({ letter, hinted, wobble, pop, onPress }: LetterBubbleProps) {
  return (
    <button
      type="button"
      className={`letter-bubble ${hinted ? 'is-hinted' : ''} ${wobble ? 'is-wobbling' : ''} ${pop ? 'is-popping' : ''}`}
      aria-label={`Tap or type ${letter} to climb`}
      aria-live="polite"
      onClick={onPress}
    >
      <svg viewBox="0 0 150 150" className="bubble-art" aria-hidden="true">
        <defs>
          <radialGradient id="bubble-fill" cx="33%" cy="26%" r="78%"><stop stopColor="#fff" stopOpacity=".56" /><stop offset=".48" stopColor="#d9f9ff" stopOpacity=".22" /><stop offset="1" stopColor="#d5b9ff" stopOpacity=".27" /></radialGradient>
          <linearGradient id="banana-gold" x2="0" y2="1"><stop stopColor="#fff390" /><stop offset="1" stopColor="#f3bb35" /></linearGradient>
          <filter id="bubble-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <circle cx="75" cy="75" r="65" fill="url(#bubble-fill)" stroke="#fff" strokeWidth="3" strokeOpacity=".92" filter="url(#bubble-glow)" />
        <path d="M39 42A48 48 0 0 1 77 27" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity=".8" />
        <circle cx="105" cy="38" r="4" fill="#fff" opacity=".8" /><circle cx="35" cy="78" r="2" fill="#fff" opacity=".85" />
        <g fill="none" stroke="#ac702b" strokeWidth="5" strokeLinecap="round">
          <path d="M53 98q21 19 39-2m-30 10q20 16 37-3m-27 10q18 14 33-4" />
        </g>
        <g fill="none" stroke="url(#banana-gold)" strokeWidth="12" strokeLinecap="round">
          <path d="M54 91q12 18 34 8m-23 4q13 17 34 7m-24 2q13 15 33 5" />
        </g>
        <g fill="#a96b2c"><circle cx="51" cy="88" r="3"/><circle cx="64" cy="101" r="3"/><circle cx="74" cy="106" r="3"/></g>
      </svg>
      <span className="bubble-letter" aria-hidden="true">
        <span className="letter-extrusion">{letter}</span>
        <span className="letter-outline">{letter}</span>
        <span className="letter-face">{letter}</span>
      </span>
      {pop && <span className="bubble-pop-sparkles" aria-hidden="true">✦　✧　✦</span>}
    </button>
  );
}
