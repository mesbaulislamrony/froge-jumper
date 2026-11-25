const tracks = new Map<string, HTMLAudioElement>();

let activeUrl: string | null = null;
let activeAudio: HTMLAudioElement | null = null;
let baseVolume = 0.35;
let musicEnabled = true;
let rampTimer: number | undefined;
let holdTimer: number | undefined;

function getTrack(url: string) {
  let audio = tracks.get(url);
  if (!audio) {
    audio = new Audio(url);
    audio.loop = true;
    audio.preload = 'auto';
    tracks.set(url, audio);
  }
  return audio;
}

function playElement(audio: HTMLAudioElement) {
  try {
    const playback = audio.play();
    playback.catch(() => {});
  } catch {
    // Playback can fail when media is unavailable or autoplay is blocked.
  }
}

function clearDuckTimers() {
  if (rampTimer !== undefined) {
    window.clearInterval(rampTimer);
    rampTimer = undefined;
  }
  if (holdTimer !== undefined) {
    window.clearTimeout(holdTimer);
    holdTimer = undefined;
  }
}

function rampTo(target: number, duration: number, onComplete?: () => void) {
  if (rampTimer !== undefined) window.clearInterval(rampTimer);
  if (!activeAudio) return;

  const audio = activeAudio;
  const start = audio.volume;
  const startedAt = Date.now();
  rampTimer = window.setInterval(() => {
    if (activeAudio !== audio) {
      if (rampTimer !== undefined) window.clearInterval(rampTimer);
      rampTimer = undefined;
      return;
    }

    const progress = Math.min((Date.now() - startedAt) / duration, 1);
    audio.volume = start + (target - start) * progress;
    if (progress === 1) {
      if (rampTimer !== undefined) window.clearInterval(rampTimer);
      rampTimer = undefined;
      onComplete?.();
    }
  }, 16);
}

export function playMusic(url: string, vol: number) {
  const nextAudio = getTrack(url);
  const nextVolume = Math.max(0, Math.min(1, vol));

  if (activeUrl !== url) {
    clearDuckTimers();
    activeAudio?.pause();
    activeUrl = url;
    activeAudio = nextAudio;
  }

  baseVolume = nextVolume;
  nextAudio.volume = baseVolume;
  if (musicEnabled) playElement(nextAudio);
}

export function stopMusic() {
  clearDuckTimers();
  activeAudio?.pause();
  activeAudio = null;
  activeUrl = null;
}

export function duck() {
  if (!activeAudio || !musicEnabled) return;

  if (holdTimer !== undefined) {
    window.clearTimeout(holdTimer);
    holdTimer = undefined;
  }
  rampTo(baseVolume * 0.4, 100, () => {
    holdTimer = window.setTimeout(() => {
      holdTimer = undefined;
      rampTo(baseVolume, 100);
    }, 1000);
  });
}

export function setMusicEnabled(on: boolean) {
  musicEnabled = on;
  if (!on) {
    activeAudio?.pause();
  } else {
    resumeMusic();
  }
}

export function pauseMusic() {
  activeAudio?.pause();
}

export function resumeMusic() {
  if (musicEnabled && activeAudio) playElement(activeAudio);
}
