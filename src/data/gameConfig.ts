// ============================================
// GAME CONFIGURATION
// Map, tiles, and game settings
// ============================================

export const TILE_SIZE = 32;
export const MAP_WIDTH = 20;
export const MAP_HEIGHT = 15;

export const PLAYER_SPEED = 160;
export const INTERACTION_DISTANCE = 48;

// Key bindings
export const KEYS = {
  UP: 'W',
  DOWN: 'S',
  LEFT: 'A',
  RIGHT: 'D',
  INTERACT: 'J',
  DETAILS: 'K',
  CLOSE: 'ESC',
} as const;

// Small town tilemap layout
// 0 = grass, 1 = path, 2 = water, 3 = wall, 4 = building, 5 = tree, 6 = decoration
export const TILE_TYPES = {
  GRASS: 0,
  PATH: 1,
  WATER: 2,
  WALL: 3,
  BUILDING: 4,
  TREE: 5,
  DECORATION: 6,
} as const;

// Collision map (true = blocked)
export const COLLISION_TILES = [
  TILE_TYPES.WATER,
  TILE_TYPES.WALL,
  TILE_TYPES.BUILDING,
  TILE_TYPES.TREE,
];

// Small town map layout
export const townMap: number[][] = [
  [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  [5, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 5],
  [5, 0, 4, 4, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 4, 4, 4, 0, 0, 5],
  [5, 0, 4, 4, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 4, 4, 4, 0, 0, 5],
  [5, 0, 0, 0, 0, 0, 1, 0, 0, 6, 0, 0, 1, 0, 0, 0, 0, 0, 0, 5],
  [5, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 5],
  [5, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 5],
  [5, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
  [5, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
  [5, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 4, 4, 0, 0, 5],
  [5, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 4, 4, 0, 0, 5],
  [5, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 5],
  [5, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 5],
  [5, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 5],
  [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
];

// Spawn point
export const SPAWN_POINT = { x: 10, y: 6 };

// Zone definitions for different areas
export const zones = [
  { id: 'plaza', name: 'Central Plaza', bounds: { x: 7, y: 6, width: 6, height: 3 } },
  { id: 'library', name: 'The Library', bounds: { x: 2, y: 2, width: 3, height: 3 } },
  { id: 'workshop', name: 'The Workshop', bounds: { x: 14, y: 2, width: 4, height: 3 } },
  { id: 'archive', name: 'The Archive', bounds: { x: 2, y: 9, width: 3, height: 3 } },
  { id: 'tower', name: 'Herald Tower', bounds: { x: 15, y: 9, width: 3, height: 3 } },
];

export default {
  TILE_SIZE,
  MAP_WIDTH,
  MAP_HEIGHT,
  PLAYER_SPEED,
  INTERACTION_DISTANCE,
  KEYS,
  townMap,
  SPAWN_POINT,
  zones,
};
