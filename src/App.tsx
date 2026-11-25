import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import {
  Lightbulb,
  RotateCcw,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { LEVELS } from './config';
import { duck, pauseMusic, playMusic, resumeMusic, setMusicEnabled } from './music';
import Background from './components/Background';
import Character from './components/Character';
import LetterBubble from './components/LetterBubble';
import Platform from './components/Platform';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const STEPS_PER_LEVEL = 10;
const PLATFORM_COUNT = STEPS_PER_LEVEL + 3;
const KEY_ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
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
  const musicUnlocked = useRef(false);
  const soundEnabledRef = useRef(soundEnabled);
  const levelRef = useRef(level);
  soundEnabledRef.current = soundEnabled;
  levelRef.current = level;

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
    const unlockMusic = () => {
      if (musicUnlocked.current) return;
      musicUnlocked.current = true;
      window.removeEventListener('keydown', unlockMusic);
      window.removeEventListener('pointerdown', unlockMusic);

      if (soundEnabledRef.current) {
        const currentLevel = levelRef.current;
        playMusic(currentLevel.music, currentLevel.musicVolume);
        setMusicEnabled(true);
      }
    };

    window.addEventListener('keydown', unlockMusic);
    window.addEventListener('pointerdown', unlockMusic);
    return () => {
      window.removeEventListener('keydown', unlockMusic);
      window.removeEventListener('pointerdown', unlockMusic);
    };
  }, []);

  useEffect(() => {
    if (musicUnlocked.current && soundEnabled) {
      playMusic(level.music, level.musicVolume);
    }
  }, [levelIndex, level.music, level.musicVolume, soundEnabled]);

  useEffect(() => {
    if (!soundEnabled) {
      setMusicEnabled(false);
      pauseMusic();
      return;
    }

    if (musicUnlocked.current) {
      playMusic(level.music, level.musicVolume);
      setMusicEnabled(true);
    } else {
      setMusicEnabled(true);
    }
  }, [soundEnabled, level.music, level.musicVolume]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        pauseMusic();
      } else if (musicUnlocked.current && soundEnabledRef.current) {
        resumeMusic();
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
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
      if (soundEnabled) {
        duck();
        playTone(nextStep === STEPS_PER_LEVEL ? 'complete' : 'correct');
      }
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
      if (soundEnabled) {
        duck();
        playTone('wrong');
      }
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
    left: `${step % 2 === 0 ? 20 : 80}%`,
    bottom: '17%',
  } as CSSProperties;

  return (
    <main className={`app-shell theme-${level.theme}`}>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="froge Jumper home" onClick={(event) => event.preventDefault()}>
          <span className="brand-mark" aria-hidden="true">⛰️</span>
          <span className="brand-copy"><strong>froge Jumper</strong><small>little letters, big adventures</small></span>
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

      <section className="full-game" aria-label="froge Jumper endless typing adventure">
          <div className={`scene full-scene ${level.theme}`} aria-label={`${level.name} climbing scene`}>
            <Background theme={level.theme} colors={level.colors} />
            <div className="scene-level-heading">
              <div className="eyebrow"><span>{level.emoji}</span> ADVENTURE {levelIndex + 1} OF 3</div>
              <h1>{level.name}</h1>
              <p>{level.subtitle} <span aria-hidden="true">✦</span></p>
            </div>
            <div className="scene-hud">
              <div className="height-pill" aria-label={`${step} metres climbed`}><span aria-hidden="true">↟</span> {step}m</div>
              <div className="banana-progress" aria-label={`Banana progress ${step} of ${STEPS_PER_LEVEL}`}>
                {Array.from({ length: STEPS_PER_LEVEL }, (_, index) => (
                  <svg key={index} className={`progress-banana ${index < step ? 'collected' : ''}`} viewBox="0 0 32 28" aria-hidden="true">
                    <path d="M5 5c2 13 11 21 21 17 3-1 4-4 2-7-8 4-17-2-18-13Z" fill={index < step ? '#ffd84e' : '#bcb1df'} fillOpacity={index < step ? 1 : .55} stroke={index < step ? '#70482d' : '#7b6eaa'} strokeWidth="2.3" strokeLinejoin="round" />
                    <path d="M5 5 3 2m4 2 2-3m18 14 3 1" fill="none" stroke={index < step ? '#75472a' : '#7b6eaa'} strokeWidth="2.5" strokeLinecap="round" />
                    {index < step && <path d="M9 8q3 8 9 10" fill="none" stroke="#fff19b" strokeWidth="2" strokeLinecap="round" />}
                  </svg>
                ))}
              </div>
              <div className="coconut-counter" aria-label={`${mistakes} coconut ${mistakes === 1 ? 'bonk' : 'bonks'}`}>
                <span className="coconut-icons" aria-hidden="true">
                  {Array.from({ length: Math.min(mistakes, 5) }, (_, index) => <span key={index}>🥥</span>)}
                  {mistakes === 0 && <span className="empty-coconut">🥥</span>}
                </span>
                <strong>{mistakes}</strong>
              </div>
            </div>
            <div className="platform-camera">
              {Array.from({ length: PLATFORM_COUNT }, (_, index) => {
                const side = index % 2 === 0 ? 'left' : 'right';
                return (
                  <Platform
                    key={index}
                    style={level.platformStyle}
                    className={`platform-slot platform-slot-${index}`}
                    position={{ [side]: '6%', bottom: `${13 + (index - step) * 18}%`, width: '31%' }}
                    active={index === step}
                  />
                );
              })}
            </div>
            {!isComplete && (
              <div className="target-perch">
                <LetterBubble letter={target} hinted={hintVisible} wobble={reaction === 'oops'} pop={reaction === 'jump'} onPress={() => handleLetter(target)} />
              </div>
            )}
            <div className={`climber ${reaction}`} style={climberStyle}>
              <Character skin={level.skin} reaction={reaction === 'jump' ? 'jump' : reaction === 'oops' ? 'hit' : isComplete ? 'celebrate' : 'idle'} />
              {coconutVisible && <span className="head-coconut" aria-label="Coconut on character’s head">🥥</span>}
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
          </div>
          <div className="keyboard-tray" aria-label="On-screen keyboard">
            <div className="keyboard-heading"><span>Tap a letter or use your keyboard</span><button type="button" className="hint-button scene-hint" onClick={handleHint}><Lightbulb size={17} /> Hint</button></div>
            <div className="virtual-keyboard">
              {KEY_ROWS.map((row, rowIndex) => (
                <div className={`key-row row-${rowIndex + 1}`} key={row}>
                  {row.split('').map((letter) => (
                    <button
                      type="button"
                      className={`keycap ${target === letter ? 'target-key' : ''} ${hintVisible && target === letter ? 'hint-pulse' : ''}`}
                      key={letter}
                      aria-label={`Letter ${letter}${target === letter ? ', target letter' : ''}`}
                      aria-pressed={target === letter}
                      onClick={() => handleLetter(letter)}
                    >{letter}</button>
                  ))}
                </div>
              ))}
            </div>
          </div>
      </section>

      <footer className="footer-note"><span className="footer-mascot" aria-hidden="true">🐒</span><span>Little steps make big climbs.</span><span className="footer-leaf" aria-hidden="true">✿</span><span>Take all the time you need.</span></footer>
    </main>
  );
}

export default App;
