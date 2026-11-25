export type CharacterSkin = 'monkey' | 'chick' | 'astronaut-cat';
export type PlatformStyle = 'grass' | 'cloud' | 'moon-rock';

export type LevelConfig = {
  name: string;
  subtitle: string;
  emoji: string;
  theme: 'jungle' | 'sky' | 'space';
  music: string;
  musicVolume: number;
  skin: CharacterSkin;
  platformStyle: PlatformStyle;
  success: string;
  colors: {
    sceneTop: string;
    sceneBottom: string;
    far: string;
    mid: string;
    near: string;
    accent: string;
    accentDark: string;
    glow: string;
  };
};

export const LEVELS: LevelConfig[] = [
  {
    name: 'Jungle Jamboree',
    subtitle: 'A leafy little climb',
    emoji: '🌿',
    theme: 'jungle',
    music: '/music/sky.mp3',
    musicVolume: 0.35,
    skin: 'monkey',
    platformStyle: 'grass',
    success: 'You made it through the jungle! Hooray!',
    colors: {
      sceneTop: '#2b1f6b', sceneBottom: '#3a2a8c', far: '#5744a0', mid: '#211959', near: '#181448', accent: '#a6eb59', accentDark: '#397531', glow: '#ff77d7',
    },
  },
  {
    name: 'Cloudtop Cove',
    subtitle: 'Up, up in the clouds',
    emoji: '☁️',
    theme: 'sky',
    music: '/music/sky.mp3',
    musicVolume: 0.35,
    skin: 'chick',
    platformStyle: 'cloud',
    success: 'You climbed all the way to Cloudtop Cove!',
    colors: {
      sceneTop: '#77b9ee', sceneBottom: '#f5b2ce', far: '#b7e5ff', mid: '#82c6ed', near: '#4d8ec9', accent: '#fffaf0', accentDark: '#a3cfea', glow: '#fff39a',
    },
  },
  {
    name: 'Starlight Station',
    subtitle: 'A cosmic letter quest',
    emoji: '🚀',
    theme: 'space',
    music: '/music/sky.mp3',
    musicVolume: 0.35,
    skin: 'astronaut-cat',
    platformStyle: 'moon-rock',
    success: 'Stellar work, space explorer!',
    colors: {
      sceneTop: '#101735', sceneBottom: '#33265e', far: '#453a7a', mid: '#282151', near: '#171a3d', accent: '#91f5dd', accentDark: '#52619a', glow: '#bd8cff',
    },
  },
];
