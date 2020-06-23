const RESOLUTION = 'LDPI';

export const sceneDefinition = (() => {
  const config = {
    LDPI: {
      SIZE: { width: 482, height: 150 }
    }
  }
  return config[RESOLUTION];
})();

export const spriteDefinition = (() => {
  const config = {
    LDPI: {
        SIZE: { width: 1233, height: 68 },
        CACTUS_LARGE: { x: 332, y: 2, width: 150, height: 50 },
        CACTUS_SMALL: { x: 228, y: 2, width: 102, height: 35 },
        CLOUD: { x: 86, y: 2, width: 46, height: 13 },
        HORIZON: { x: 2, y: 54, width: 1198, height: 14 },
        MOON: { x: 484, y: 2, width: 20, height: 40, widthFullMoon: 40 },
        PTERODACTYL: { x: 134, y: 8, width: 46, height: 34, yWingsOpen: 2, heightWingsOpen: 30 },
        RESTART: { x: 2, y: 2, width: 36, height: 32 },
        NUMBER: { x: 655, y: 2, width: 10, height: 11 },
        GAME_OVER: { x: 655, y: 13, width: 191, height: 13 },
        TREX: { x: 848, y: 2, width: 44, height: 47, widthDiff: 15, heightDiff: 17 },
        STAR: { x: 645, y: 2, width: 9, height: 9 }
    }/*,
    HDPI: {
        SIZE: {width: 2441, height: 130},
        CACTUS_LARGE: { x: 652, y: 2 },
        CACTUS_SMALL: { x: 446, y: 2 },
        CLOUD: { x: 166, y: 2 },
        HORIZON: { x: 2, y: 104 },
        MOON: { x: 954, y: 2 },
        PTERODACTYL: { x: 260, y: 2 },
        RESTART: { x: 2, y: 2 },
        NUMBER: { x: 1294, y: 2 },
        GAME_OVER: { x: 1294, y: 2 },
        TREX: { x: 1678, y: 2 },
        STAR: { x: 1276, y: 2 }
    }*/
  }
  return config[RESOLUTION];
})();