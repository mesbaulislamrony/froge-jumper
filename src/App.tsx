import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import {
  Heart,
  Lightbulb,
  RotateCcw,
  Volume2,
  VolumeX,
} from 'lucide-react';

type Level = {
  name: string;
  subtitle: string;
  emoji: string;
  theme: string;
  character: string;
  scenery: string[];
  success: string;
};

const LEVELS: Level[] = [
  {
    name: 'Jungle Jamboree',
    subtitle: 'A leafy little climb',
    emoji: '🌿',
    theme: 'jungle',
    character: '🐵',
    scenery: ['🌴', '🌺', '🍃', '🥥', '🦜', '🌼'],
    success: 'You made it through the jungle! Hooray!',
  },
  {
    name: 'Cloudtop Cove',
    subtitle: 'Up, up in the clouds',
    emoji: '☁️',
    theme: 'sky',
    character: '🐵',
    scenery: ['☁️', '🌈', '🐦', '🪁', '☀️', '☁️'],
    success: 'You climbed all the way to Cloudtop Cove!',
  },
  {
    name: 'Starlight Station',
    subtitle: 'A cosmic letter quest',
    emoji: '🚀',
    theme: 'space',
    character: '🐵',
    scenery: ['🪐', '⭐', '🌙', '✨', '☄️', '🛸'],
    success: 'Stellar work, space explorer!',
  },
];

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const STEPS_PER_LEVEL = 10;
const ENCOURAGEMENTS = [
  'Oopsie! Let’s try that letter again.',
  'A little wobble! You’ve got this.',
  'Not quite — check the big letter in the scene!',
  'Whoops! Our climber bounced. Try again!',
];

function pickLetter(previous?: string) {
  const choices = ALPHABET.filter((letter) => letter !== previous);
  return choices[Math.floor(Math.random() * choices.length)];
}

function playTone(kind: 'correct' | 'wrong' | 'complete') {
  try {
    const audio = new AudioContext();
    const notes = kind === 'wrong' ? [190] : kind === 'complete' ? [523, 659, 784] : [660, 880];
    notes.forEach((frequency, index) => {
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      const start = audio.currentTime + index * 0.11;
      oscillator.type = kind === 'wrong' ? 'triangle' : 'sine';
      oscillator.frequency.setValueAtTime(frequency, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(kind === 'wrong' ? 0.12 : 0.1, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.18);
      oscillator.connect(gain);
      gain.connect(audio.destination);
      oscillator.start(start);
      oscillator.stop(start + 0.2);
    });
    window.setTimeout(() => void audio.close(), 700);
  } catch {
    // Audio is an enhancement; gameplay remains fully usable if it is unavailable.
  }
}

function App() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [target, setTarget] = useState(() => pickLetter());
  const [mistakes, setMistakes] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hintVisible, setHintVisible] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [reaction, setReaction] = useState<'jump' | 'oops' | ''>('');
  const [coconutVisible, setCoconutVisible] = useState(false);
  const reactionTimeout = useRef<number | undefined>(undefined);
  const coconutTimeout = useRef<number | undefined>(undefined);
  const level = LEVELS[levelIndex];
  const isComplete = step >= STEPS_PER_LEVEL;

  const animate = useCallback((next: 'jump' | 'oops') => {
    window.clearTimeout(reactionTimeout.current);
    setReaction('');
    requestAnimationFrame(() => setReaction(next));
    reactionTimeout.current = window.setTimeout(() => setReaction(''), 650);
  }, []);

  useEffect(() => () => {
    window.clearTimeout(reactionTimeout.current);
    window.clearTimeout(coconutTimeout.current);
  }, []);

  useEffect(() => {
    if (!isComplete) return undefined;
    const nextAdventure = window.setTimeout(() => {
      setLevelIndex((current) => (current + 1) % LEVELS.length);
      setStep(0);
      setMistakes(0);
      setTarget((previous) => pickLetter(previous));
      setHintVisible(false);
      setFeedback('A new adventure begins!');
      setReaction('');
      setCoconutVisible(false);
    }, 2200);
    return () => window.clearTimeout(nextAdventure);
  }, [isComplete]);

  const handleLetter = useCallback((letter: string) => {
    if (!/^[A-Z]$/.test(letter) || isComplete) return;

    if (letter === target) {
      const nextStep = step + 1;
      setStep(nextStep);
      setHintVisible(false);
      setFeedback(nextStep === STEPS_PER_LEVEL ? level.success : 'That’s it! Up we go!');
      animate('jump');
      if (soundEnabled) playTone(nextStep === STEPS_PER_LEVEL ? 'complete' : 'correct');
      if (nextStep < STEPS_PER_LEVEL) {
        setTarget((previous) => pickLetter(previous));
      }
    } else {
      setMistakes((previous) => previous + 1);
      setFeedback(ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]);
      window.clearTimeout(coconutTimeout.current);
      setCoconutVisible(true);
      coconutTimeout.current = window.setTimeout(() => setCoconutVisible(false), 1300);
      animate('oops');
      if (soundEnabled) playTone('wrong');
    }
  }, [animate, isComplete, level.success, levelIndex, soundEnabled, step, target]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.repeat) return;
      if (/^[a-z]$/i.test(event.key)) {
        event.preventDefault();
        handleLetter(event.key.toUpperCase());
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleLetter]);

  const resetLevel = useCallback((index = levelIndex) => {
    setLevelIndex(index);
    setStep(0);
    setMistakes(0);
    setTarget(pickLetter());
    setHintVisible(false);
    setFeedback('Ready when you are!');
    setReaction('');
    setCoconutVisible(false);
    window.clearTimeout(coconutTimeout.current);
  }, [levelIndex]);

  const handleHint = () => {
    setHintVisible(true);
    setFeedback(`Find the letter ${target}!`);
  };

  const climberStyle = {
    left: `${12 + (step % 5) * 15}%`,
    bottom: `${10 + Math.min(step, STEPS_PER_LEVEL) * 5}%`,
  } as CSSProperties;

  return (
    <main className={`app-shell theme-${level.theme}`}>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Little Climber home" onClick={(event) => event.preventDefault()}>
          <span className="brand-mark" aria-hidden="true">⛰️</span>
          <span className="brand-copy"><strong>little climber</strong><small>little letters, big adventures</small></span>
        </a>
        <div className="top-actions">
          <button
            type="button"
            className="icon-button sound-button"
            aria-label={soundEnabled ? 'Turn sound off' : 'Turn sound on'}
            title={soundEnabled ? 'Sound on' : 'Sound off'}
            onClick={() => setSoundEnabled((enabled) => !enabled)}
          >
            {soundEnabled ? <Volume2 size={19} /> : <VolumeX size={19} />}
          </button>
          <button type="button" className="icon-button restart-button" aria-label="Restart level" title="Start this level over" onClick={() => resetLevel()}>
            <RotateCcw size={18} />
          </button>
        </div>
      </header>

      <section className="full-game" aria-label="Little Climber endless typing adventure">
          <div className={`scene full-scene ${level.theme}`} aria-label={`${level.name} climbing scene`}>
            <div className="scene-level-heading">
              <div className="eyebrow"><span>{level.emoji}</span> ADVENTURE {levelIndex + 1} OF 3</div>
              <h1>{level.name}</h1>
              <p>{level.subtitle} <span aria-hidden="true">✦</span></p>
            </div>
            <div className="mistake-bubble scene-mistakes" aria-label={`${mistakes} ${mistakes === 1 ? 'wobble' : 'wobbles'}`}>
              <span className="heart-stack" aria-hidden="true"><Heart size={16} fill="currentColor" /><Heart size={16} fill="currentColor" /><Heart size={16} fill="currentColor" /></span>
              <strong>{mistakes}</strong><small>{mistakes === 1 ? 'wobble' : 'wobbles'}</small>
            </div>
            <div className="scene-sun" aria-hidden="true">{level.theme === 'space' ? '🌙' : '☀️'}</div>
            <div className="scene-decoration decor-one" aria-hidden="true">{level.scenery[0]}</div>
            <div className="scene-decoration decor-two" aria-hidden="true">{level.scenery[1]}</div>
            <div className="scene-decoration decor-three" aria-hidden="true">{level.scenery[2]}</div>
            <div className="scene-decoration decor-four" aria-hidden="true">{level.scenery[3]}</div>
            <div className="scene-decoration decor-five" aria-hidden="true">{level.scenery[4]}</div>
            <div className="scene-decoration decor-six" aria-hidden="true">{level.scenery[5]}</div>
            <div className="scene-cloud cloud-one" aria-hidden="true">☁️</div>
            <div className="scene-cloud cloud-two" aria-hidden="true">☁️</div>
            <div className="scene-platform platform-one"><span /></div>
            <div className="scene-platform platform-two"><span /></div>
            <div className="scene-platform platform-three"><span /></div>
            <div className="scene-platform platform-four"><span /></div>
            <div className="scene-platform platform-five"><span /></div>
            <div className={`climber ${reaction}`} style={climberStyle}>
              <span className="climber-body" role="img" aria-label="Your monkey climber">{level.character}</span>
              <span className="climber-sparkle" aria-hidden="true">✨</span>
              {coconutVisible && <span className="head-coconut" aria-label="Coconut on monkey’s head">🥥</span>}
              {!isComplete && (
                <div className={`scene-target ${hintVisible ? 'hinting' : ''} ${coconutVisible ? 'bonked' : ''}`} aria-label={`Target letter ${target}`}>
                  <button type="button" aria-label={`Tap or type ${target} to climb`} onClick={() => handleLetter(target)} aria-live="polite">{target}</button>
                </div>
              )}
            </div>
            {reaction === 'jump' && <div className="jump-stars" aria-hidden="true">✦ ✨ ✦</div>}
            {isComplete && (
              <div className="scene-celebration" role="status" aria-live="polite">
                <span aria-hidden="true">🎉</span>
                <strong>{level.success}</strong>
                <small>Next adventure coming up!</small>
              </div>
            )}
            <div className="scene-caption"><span className="caption-dot" />{feedback || 'Take your time — there’s no rush!'}</div>
            {!isComplete && <button type="button" className="hint-button scene-hint" onClick={handleHint}><Lightbulb size={17} /> Hint</button>}
          </div>
      </section>

      <footer className="footer-note"><span className="footer-mascot" aria-hidden="true">🐒</span><span>Little steps make big climbs.</span><span className="footer-leaf" aria-hidden="true">✿</span><span>Take all the time you need.</span></footer>
    </main>
  );
}

export default App;
