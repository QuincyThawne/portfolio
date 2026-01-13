import React from 'react';
import { MAP_WIDTH, MAP_HEIGHT, TILE_SIZE } from '@/data/gameConfig';
import { npcData } from '@/data/portfolio';

// Updated town map matching SandboxMode (20 columns × 15 rows)
// 0 = grass, 1 = path, 4 = building, 5 = tree, 6 = flowers
const detailedTownMap: number[][] = [
  // Row 0-1: Top dense tree border
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  // Row 2: Trees with inner grass clearing - NPC at (10,2)
  [5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5],
  // Row 3: Upper houses (left & right)
  [5,5,5,5,0,4,4,4,0,0,0,0,4,4,4,4,0,5,5,5],
  // Row 4: Upper house bodies
  [5,5,5,5,0,4,4,4,0,0,0,0,4,4,4,4,0,5,5,5],
  // Row 5: Upper house entrances
  [5,5,5,5,0,4,4,4,4,0,0,4,4,4,4,4,0,5,5,5],
  // Row 6: Central clearing with flowers - NPCs at (4,6) & (13,6)
  [5,5,5,5,0,0,0,0,0,0,0,0,6,0,0,0,0,5,5,5],
  // Row 7: Open center (player spawn zone)
  [5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5],
  // Row 8: Lower house (roof)
  [5,5,5,5,0,4,4,4,4,4,0,0,0,4,0,0,0,5,5,5],
  // Row 9: Lower house body - NPC at (15,9)
  [5,5,5,5,0,4,4,4,4,4,0,0,0,0,0,0,0,5,5,5],
  // Row 10: Lower house entrance with flower patch
  [5,5,5,5,1,0,0,6,6,6,0,0,0,0,0,5,5,5,5,5],
  // Row 11: Bottom open grass area - NPC at (8,11)
  [5,5,5,5,5,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5],
  // Row 12-14: Bottom tree borders
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
];

// Tile colors for minimap - Pokemon style
const tileColors: Record<number, string> = {
  0: '#7ec850', // grass - vibrant green
  1: '#d4a76a', // path - sandy brown
  4: '#a0522d', // building - sienna brown
  5: '#2d5a27', // tree - dark forest green
  6: '#ff9ecd', // flowers - pink
};

// NPC colors by section
const npcColors: Record<string, string> = {
  about: '#f59e0b',      // amber - Prof. Oak
  projects: '#3b82f6',   // blue - Captain
  skills: '#ef4444',     // red - Champion
  achievements: '#a855f7', // purple - Old Man
  contact: '#22c55e',    // green - Professor
};

interface GameMinimapProps {
  playerPosition: { x: number; y: number };
}

const GameMinimap: React.FC<GameMinimapProps> = ({ playerPosition }) => {
  const tileSize = 8; // Size of each tile in the minimap
  const minimapWidth = MAP_WIDTH * tileSize;
  const minimapHeight = MAP_HEIGHT * tileSize;

  // Convert player world position to tile position
  const playerTileX = Math.floor(playerPosition.x / TILE_SIZE);
  const playerTileY = Math.floor(playerPosition.y / TILE_SIZE);

  return (
    <>
      {/* Town Map - hidden on mobile, top right on desktop */}
      <div className="absolute hidden md:block md:top-4 md:right-4 z-30 pointer-events-none">
        {/* Minimap container with retro game styling */}
        <div 
          className="relative rounded-sm overflow-hidden"
          style={{ 
            width: minimapWidth + 8, 
            background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
            border: '3px solid #4a5568',
            boxShadow: '0 0 10px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.3)'
          }}
        >
          {/* Header bar */}
          <div 
            className="flex items-center justify-center px-2 py-1"
            style={{ 
              background: 'linear-gradient(180deg, #4a5568 0%, #2d3748 100%)',
              borderBottom: '2px solid #2d3748'
            }}
          >
            <span className="text-[10px] font-bold text-white tracking-wider uppercase">
              Town Map
            </span>
          </div>
          
          {/* Map area */}
          <div className="p-1">
            <svg 
              width={minimapWidth} 
              height={minimapHeight} 
              style={{ 
                borderRadius: '2px',
                border: '1px solid #2d3748'
            }}
          >
            {/* Tile grid */}
            {detailedTownMap.map((row, y) =>
              row.map((tileType, x) => (
                <rect
                  key={`${x}-${y}`}
                  x={x * tileSize}
                  y={y * tileSize}
                  width={tileSize}
                  height={tileSize}
                  fill={tileColors[tileType] || '#7ec850'}
                />
              ))
            )}
            
            {/* NPC markers */}
            {npcData.map((npc) => (
              <g key={npc.id}>
                {/* NPC marker background */}
                <rect
                  x={npc.position.x * tileSize - 1}
                  y={npc.position.y * tileSize - 1}
                  width={tileSize + 2}
                  height={tileSize + 2}
                  fill={npcColors[npc.section] || '#ffffff'}
                  rx={2}
                  opacity={0.9}
                >
                  <animate
                    attributeName="opacity"
                    values="0.9;0.5;0.9"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </rect>
                {/* NPC marker dot */}
                <circle
                  cx={npc.position.x * tileSize + tileSize / 2}
                  cy={npc.position.y * tileSize + tileSize / 2}
                  r={tileSize / 3}
                  fill="#ffffff"
                />
              </g>
            ))}
            
            {/* Player position indicator - outer glow */}
            <circle
              cx={playerTileX * tileSize + tileSize / 2}
              cy={playerTileY * tileSize + tileSize / 2}
              r={tileSize / 1.2}
              fill="none"
              stroke="#4ade80"
              strokeWidth={2}
              opacity={0.6}
            >
              <animate
                attributeName="r"
                values={`${tileSize / 1.5};${tileSize};${tileSize / 1.5}`}
                dur="1s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.6;0.2;0.6"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>
            
            {/* Player position indicator - main dot */}
            <circle
              cx={playerTileX * tileSize + tileSize / 2}
              cy={playerTileY * tileSize + tileSize / 2}
              r={tileSize / 2.5}
              fill="#22c55e"
              stroke="#166534"
              strokeWidth={1.5}
            />
          </svg>
        </div>
        
        {/* You indicator */}
        <div 
          className="flex justify-center gap-3 px-1 py-0.5"
          style={{ 
            background: 'rgba(0,0,0,0.5)',
            fontSize: '7px'
          }}
        >
          <span className="flex items-center gap-0.5">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
            <span className="text-white/80">You</span>
          </span>
        </div>
      </div>
    </div>
      
    {/* NPC Names List - hidden on mobile, below town map on desktop */}
    <div className="absolute hidden md:block md:top-[200px] md:right-4 z-30 pointer-events-none">
      <div 
        className="rounded-sm overflow-hidden"
        style={{ 
          background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
          border: '3px solid #4a5568',
          boxShadow: '0 0 10px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.3)'
        }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-center px-2 py-1"
          style={{ 
            background: 'linear-gradient(180deg, #4a5568 0%, #2d3748 100%)',
            borderBottom: '2px solid #2d3748'
          }}
        >
          <span className="text-[10px] font-bold text-white tracking-wider uppercase">
            NPCs
          </span>
        </div>
        
        {/* NPC List */}
        <div className="p-2 space-y-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: npcColors.about }} />
            <span className="text-[10px] text-white/80">Prof. Oak</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: npcColors.projects }} />
            <span className="text-[10px] text-white/80">Captain</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: npcColors.skills }} />
            <span className="text-[10px] text-white/80">Champion</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: npcColors.achievements }} />
            <span className="text-[10px] text-white/80">Old Man</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: npcColors.contact }} />
            <span className="text-[10px] text-white/80">Professor</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default GameMinimap;