import React, { useEffect, useRef, useState, useCallback } from 'react';
import Phaser from 'phaser';
import { TILE_SIZE, MAP_WIDTH, MAP_HEIGHT, PLAYER_SPEED, INTERACTION_DISTANCE, SPAWN_POINT, COLLISION_TILES } from '@/data/gameConfig';
import { npcData, portfolioData, NPCData } from '@/data/portfolio';
import GameDialogue from './GameDialogue';
import GameDetailPanel from './GameDetailPanel';
import GameHUD from './GameHUD';
import GameMinimap from './GameMinimap';
import PixelSnow from './PixelSnow';
import MobileGameControls from './MobileGameControls';
import GameLoadingScreen from './GameLoadingScreen';
// Import sprite assets - Pokemon style
// Individual player sprites for walking animation
import playerFrontIdle from '@/assets/sprites/player/front-idle.png';
import playerFrontLeft from '@/assets/sprites/player/front-left.png';
import playerFrontRight from '@/assets/sprites/player/front-right.png';
import playerBackIdle from '@/assets/sprites/player/back-idle.png';
import playerBackLeft from '@/assets/sprites/player/backd-left.png';
import playerBackRight from '@/assets/sprites/player/back-right.png';
import playerSideIdle from '@/assets/sprites/player/side-idle.png';
import playerSideLeft from '@/assets/sprites/player/side-left.png';
import playerSideRight from '@/assets/sprites/player/side-right.png';
// NPC sprites
import captainSprite from '@/assets/sprites/captain.png';
import championSprite from '@/assets/sprites/champion.png';
import oldmanSprite from '@/assets/sprites/oldman.png';
import professorOakSprite from '@/assets/sprites/professorOak.png';
import professorSprite from '@/assets/sprites/professor.png';
import littletownTileset from '@/assets/tiles/littletown.png';

// 4-direction type for movement (simplified from 8)
type Direction = 'down' | 'left' | 'right' | 'up';

interface GameState {
  activeNPC: NPCData | null;
  dialogueOpen: boolean;
  detailPanelOpen: boolean;
  currentDialogueIndex: number;
}

// Detailed town map (20 columns × 14 rows)
// 0 = grass (walkable)
// 1 = path (walkable)
// 4 = building (collision)
// 5 = tree (collision)
// 6 = flowers (walkable)
//
// NPC positions accounted for (all on walkable tiles):
// (13,6), (4,6), (10,3), (15,9), (8,10)

const detailedTownMap: number[][] = [
  // Row 0: Top dense tree border
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],

  // Row 1: Tree border continues
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],

  // Row 2: Trees with inner grass clearing
  [5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5],

  // Row 3: Upper houses (left & right) – NPC at (10,3)
  [5,5,5,5,0,4,4,4,0,0,0,0,4,4,4,4,0,5,5,5],

  // Row 4: Upper house bodies
  [5,5,5,5,0,4,4,4,0,0,0,0,4,4,4,4,0,5,5,5],

  // Row 5: Upper house entrances
  [5,5,5,5,0,4,4,4,4,0,0,4,4,4,4,4,0,5,5,5],

  // Row 6: Central clearing with flowers – NPCs at (4,6) & (13,6)
  [5,5,5,5,0,0,0,0,0,0,0,0,6,0,0,0,0,5,5,5],

  // Row 7: Open center (player spawn zone)
  [5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5],

  // Row 8: Lower house (roof)
  [5,5,5,5,0,4,4,4,4,4,0,0,0,4,0,0,0,5,5,5],

  // Row 9: Lower house body – NPC at (15,9)
  [5,5,5,5,0,4,4,4,4,4,0,0,0,0,0,0,0,5,5,5],

  // Row 10: Lower house entrance with flower patch – NPC at (8,10)
  [5,5,5,5,1,0,0,6,6,6,0,0,0,0,0,5,5,5,5,5],

  // Row 11: Bottom open grass area
  [5,5,5,5,5,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5],

  // Row 12: Bottom tree border
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],

  // Row 13: Bottom-most dense tree border
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],

  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
];


// Additional collision tiles
const DETAILED_COLLISION_TILES = [...COLLISION_TILES, 7]; // Add fence as collision

const SandboxMode: React.FC = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [gameState, setGameState] = useState<GameState>({
    activeNPC: null,
    dialogueOpen: false,
    detailPanelOpen: false,
    currentDialogueIndex: 0,
  });
  const [nearbyNPC, setNearbyNPC] = useState<NPCData | null>(null);
  const [playerPosition, setPlayerPosition] = useState({ x: SPAWN_POINT.x * TILE_SIZE, y: SPAWN_POINT.y * TILE_SIZE });
  const [isMobile, setIsMobile] = useState(false);
  
  // Mobile control state
  const mobileInputRef = useRef<{ direction: 'up' | 'down' | 'left' | 'right' | null }>({ direction: null });
  
  // Use ref to track UI state for Phaser scene (avoids stale closure)
  const isUIOpenRef = useRef(false);
  
  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Keep ref in sync with state
  useEffect(() => {
    isUIOpenRef.current = gameState.dialogueOpen || gameState.detailPanelOpen;
  }, [gameState.dialogueOpen, gameState.detailPanelOpen]);

  // Mobile control handlers
  const handleMobileMove = useCallback((direction: 'up' | 'down' | 'left' | 'right' | null) => {
    mobileInputRef.current.direction = direction;
  }, []);

  const handleMobileAction = useCallback((action: 'J' | 'K' | 'ESC') => {
    if (action === 'ESC') {
      if (gameState.dialogueOpen || gameState.detailPanelOpen) {
        setGameState(prev => ({
          ...prev,
          dialogueOpen: false,
          detailPanelOpen: false,
          activeNPC: null,
        }));
      }
    } else if (action === 'J' && nearbyNPC) {
      setGameState(prev => ({
        ...prev,
        activeNPC: nearbyNPC,
        dialogueOpen: true,
        currentDialogueIndex: 0,
      }));
    } else if (action === 'K' && nearbyNPC) {
      setGameState(prev => ({
        ...prev,
        activeNPC: nearbyNPC,
        detailPanelOpen: true,
      }));
    }
  }, [gameState.dialogueOpen, gameState.detailPanelOpen, nearbyNPC]);

  // Handle loading complete
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!gameContainerRef.current || gameRef.current || isLoading) return;

    // Game scene
    class MainScene extends Phaser.Scene {
      private player!: Phaser.GameObjects.Sprite;
      private cursors!: { up: Phaser.Input.Keyboard.Key; down: Phaser.Input.Keyboard.Key; left: Phaser.Input.Keyboard.Key; right: Phaser.Input.Keyboard.Key };
      private interactKey!: Phaser.Input.Keyboard.Key;
      private detailKey!: Phaser.Input.Keyboard.Key;
      private npcs: { sprite: Phaser.GameObjects.Sprite; data: NPCData }[] = [];
      private playerFacing: Direction = 'down';
      private isMoving: boolean = false;
      private walkAnimTimer: number = 0;
      private walkAnimFrame: number = 1; // 0=left, 1=idle, 2=right

      constructor() {
        super({ key: 'MainScene' });
      }

      preload() {
        // Load individual player sprites for each direction and pose
        // Front (facing down/camera)
        this.load.image('player-front-idle', playerFrontIdle);
        this.load.image('player-front-left', playerFrontLeft);
        this.load.image('player-front-right', playerFrontRight);
        // Back (facing up/away)
        this.load.image('player-back-idle', playerBackIdle);
        this.load.image('player-back-left', playerBackLeft);
        this.load.image('player-back-right', playerBackRight);
        // Side (facing left - will mirror for right)
        this.load.image('player-side-idle', playerSideIdle);
        this.load.image('player-side-left', playerSideLeft);
        this.load.image('player-side-right', playerSideRight);
        
        // Load NPC sprites - Pokemon characters
        this.load.image('npc-about', professorOakSprite);
        this.load.image('npc-projects', captainSprite);
        this.load.image('npc-skills', championSprite);
        this.load.image('npc-achievements', oldmanSprite);
        this.load.image('npc-contact', professorSprite);
        
        // Load littletown tileset
        this.load.image('littletown', littletownTileset);
      }

      create() {
        // Create tilemap first
        this.createTilemap();

        // Create player sprite - start with front idle
        this.player = this.add.sprite(
          SPAWN_POINT.x * TILE_SIZE + TILE_SIZE / 2,
          SPAWN_POINT.y * TILE_SIZE + TILE_SIZE / 2,
          'player-front-idle'
        );
        // Scale player appropriately
        this.player.setDisplaySize(TILE_SIZE * 1.2, TILE_SIZE * 1.2);
        this.player.setDepth(10);
        
        // Setup walk animation timer
        this.walkAnimTimer = 0;
        this.walkAnimFrame = 0;

        // Create NPCs
        this.createNPCs();

        // Setup camera - show entire map (no scrolling needed for small map)
        this.cameras.main.setBounds(0, 0, MAP_WIDTH * TILE_SIZE, MAP_HEIGHT * TILE_SIZE);
        // Center camera on map
        this.cameras.main.centerOn(MAP_WIDTH * TILE_SIZE / 2, MAP_HEIGHT * TILE_SIZE / 2);

        // Setup controls
        if (this.input.keyboard) {
          this.cursors = {
            up: this.input.keyboard.addKey('W'),
            down: this.input.keyboard.addKey('S'),
            left: this.input.keyboard.addKey('A'),
            right: this.input.keyboard.addKey('D'),
          };
          this.interactKey = this.input.keyboard.addKey('J');
          this.detailKey = this.input.keyboard.addKey('K');

          this.interactKey.on('down', () => this.handleInteract());
          this.detailKey.on('down', () => this.handleDetail());
        }
      }

      // Get the correct sprite texture for current direction and animation frame
      getPlayerTexture(direction: Direction, frame: number): string {
        // frame cycles: 0 = left, 1 = idle, 2 = right (for walk animation)
        const poses = ['left', 'idle', 'right'];
        const pose = poses[frame % 3];
        
        switch (direction) {
          case 'down':
            return `player-front-${pose}`;
          case 'up':
            return `player-back-${pose}`;
          case 'left':
          case 'right':
            // Side sprites - same texture, flip for right
            return `player-side-${pose}`;
          default:
            return 'player-front-idle';
        }
      }
      
      // Get idle texture for a direction
      getIdleTexture(direction: Direction): string {
        switch (direction) {
          case 'down':
            return 'player-front-idle';
          case 'up':
            return 'player-back-idle';
          case 'left':
          case 'right':
            return 'player-side-idle';
          default:
            return 'player-front-idle';
        }
      }

      createTilemap() {
        // Use littletown.png as the map background
        const mapWidth = MAP_WIDTH * TILE_SIZE;
        const mapHeight = MAP_HEIGHT * TILE_SIZE;
        
        // Add the littletown image as the background
        const background = this.add.image(mapWidth / 2, mapHeight / 2, 'littletown');
        
        // Scale the background to fit the map size
        background.setDisplaySize(mapWidth, mapHeight);
        background.setDepth(0);
        
        // Create invisible collision zones based on the map data
        // This allows collision detection while using the image background
        for (let y = 0; y < MAP_HEIGHT; y++) {
          for (let x = 0; x < MAP_WIDTH; x++) {
            const tileType = detailedTownMap[y][x];
            
            // Add visual indicator for collision tiles in debug mode (optional)
            if (DETAILED_COLLISION_TILES.includes(tileType)) {
              // Invisible collision markers (can be made visible for debugging)
              // const collisionMarker = this.add.rectangle(
              //   x * TILE_SIZE + TILE_SIZE / 2,
              //   y * TILE_SIZE + TILE_SIZE / 2,
              //   TILE_SIZE,
              //   TILE_SIZE,
              //   0xff0000,
              //   0.3
              // );
              // collisionMarker.setDepth(1);
            }
          }
        }
      }

      // Keep addTileDecorations for potential future use but don't call it
      addTileDecorations(x: number, y: number, tileType: number) {
        // Not used when littletown.png is the background
      }

      createNPCs() {
        npcData.forEach((npc) => {
          const spriteKey = `npc-${npc.section}`;
          const sprite = this.add.sprite(
            npc.position.x * TILE_SIZE + TILE_SIZE / 2,
            npc.position.y * TILE_SIZE + TILE_SIZE / 2,
            spriteKey
          );
          // Pokemon NPC sprite size - slightly larger for visibility
          sprite.setDisplaySize(TILE_SIZE * 1.7, TILE_SIZE * 1.6);
          sprite.setDepth(5);
          
          // Add subtle idle animation
          this.tweens.add({
            targets: sprite,
            y: sprite.y - 2,
            duration: 1500 + Math.random() * 500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
          });
          
          // Add label background - positioned higher above sprite
          const labelY = npc.position.y * TILE_SIZE - TILE_SIZE * 0.6;
          const labelBg = this.add.rectangle(
            npc.position.x * TILE_SIZE + TILE_SIZE / 2,
            labelY,
            npc.name.length * 7 + 16,
            18,
            0x000000,
            0.8
          ).setDepth(14);
          
          // Add rounded border effect
          labelBg.setStrokeStyle(1, 0xffffff, 0.3);
          
          this.add.text(
            npc.position.x * TILE_SIZE + TILE_SIZE / 2,
            labelY,
            npc.name,
            { 
              fontSize: '10px', 
              color: '#ffffff',
              fontFamily: 'Arial, sans-serif',
              fontStyle: 'bold'
            }
          ).setOrigin(0.5).setDepth(15);

          this.npcs.push({ sprite, data: npc });
        });
      }

      handleInteract() {
        const nearby = this.findNearbyNPC();
        if (nearby) {
          setGameState(prev => ({
            ...prev,
            activeNPC: nearby,
            dialogueOpen: true,
            currentDialogueIndex: 0,
          }));
        }
      }

      handleDetail() {
        const nearby = this.findNearbyNPC();
        if (nearby) {
          setGameState(prev => ({
            ...prev,
            activeNPC: nearby,
            detailPanelOpen: true,
          }));
        }
      }

      findNearbyNPC(): NPCData | null {
        for (const npc of this.npcs) {
          const distance = Phaser.Math.Distance.Between(
            this.player.x,
            this.player.y,
            npc.sprite.x,
            npc.sprite.y
          );
          if (distance < INTERACTION_DISTANCE) {
            return npc.data;
          }
        }
        return null;
      }

      update() {
        // Skip movement if UI is open (using ref to avoid stale closure)
        const isUIOpen = isUIOpenRef.current;
        
        if (!isUIOpen) {
          let velocityX = 0;
          let velocityY = 0;
          
          // Check keyboard input
          const keyboardLeft = this.cursors.left.isDown;
          const keyboardRight = this.cursors.right.isDown;
          const keyboardUp = this.cursors.up.isDown;
          const keyboardDown = this.cursors.down.isDown;
          
          // Check mobile input
          const mobileDir = mobileInputRef.current.direction;
          const mobileLeft = mobileDir === 'left';
          const mobileRight = mobileDir === 'right';
          const mobileUp = mobileDir === 'up';
          const mobileDown = mobileDir === 'down';
          
          // Combine inputs (keyboard OR mobile)
          const movingLeft = keyboardLeft || mobileLeft;
          const movingRight = keyboardRight || mobileRight;
          const movingUp = keyboardUp || mobileUp;
          const movingDown = keyboardDown || mobileDown;

          if (movingLeft) {
            velocityX = -PLAYER_SPEED;
          } else if (movingRight) {
            velocityX = PLAYER_SPEED;
          }

          if (movingUp) {
            velocityY = -PLAYER_SPEED;
          } else if (movingDown) {
            velocityY = PLAYER_SPEED;
          }

          // Determine 4-directional facing based on input (prioritize vertical for diagonals)
          if (movingDown) {
            this.playerFacing = 'down';
          } else if (movingUp) {
            this.playerFacing = 'up';
          } else if (movingLeft) {
            this.playerFacing = 'left';
          } else if (movingRight) {
            this.playerFacing = 'right';
          }

          // Normalize diagonal movement for consistent speed
          if (velocityX !== 0 && velocityY !== 0) {
            velocityX *= 0.707;
            velocityY *= 0.707;
          }

          // Handle sprite textures based on movement
          const wasMoving = this.isMoving;
          this.isMoving = velocityX !== 0 || velocityY !== 0;
          
          // Animation timing - cycle through left-idle-right frames
          const WALK_ANIM_SPEED = 150; // ms per frame
          
          if (this.isMoving) {
            // Update walk animation timer
            this.walkAnimTimer += this.game.loop.delta;
            if (this.walkAnimTimer >= WALK_ANIM_SPEED) {
              this.walkAnimTimer = 0;
              this.walkAnimFrame = (this.walkAnimFrame + 1) % 3;
            }
            
            // Get the correct texture for current direction and frame
            const texture = this.getPlayerTexture(this.playerFacing, this.walkAnimFrame);
            this.player.setTexture(texture);
            
            // Handle horizontal flip for right direction (side sprites face left by default)
            if (this.playerFacing === 'right') {
              this.player.setFlipX(true);
            } else {
              this.player.setFlipX(false);
            }
          } else if (wasMoving) {
            // Reset to idle texture when stopped
            this.walkAnimTimer = 0;
            this.walkAnimFrame = 1; // idle frame
            const idleTexture = this.getIdleTexture(this.playerFacing);
            this.player.setTexture(idleTexture);
            
            // Keep flip state for side direction
            if (this.playerFacing === 'right') {
              this.player.setFlipX(true);
            } else {
              this.player.setFlipX(false);
            }
          }

          // Calculate new position
          const delta = this.game.loop.delta / 1000;
          const newX = this.player.x + velocityX * delta;
          const newY = this.player.y + velocityY * delta;

          // Check collision
          if (this.canMoveTo(newX, this.player.y)) {
            this.player.x = newX;
          }
          if (this.canMoveTo(this.player.x, newY)) {
            this.player.y = newY;
          }
        }

        // Update player position for minimap
        setPlayerPosition({ x: this.player.x, y: this.player.y });

        // Check for nearby NPCs
        const nearby = this.findNearbyNPC();
        setNearbyNPC(nearby);
      }

      canMoveTo(x: number, y: number): boolean {
        const tileX = Math.floor(x / TILE_SIZE);
        const tileY = Math.floor(y / TILE_SIZE);

        // Bounds check
        if (tileX < 0 || tileX >= MAP_WIDTH || tileY < 0 || tileY >= MAP_HEIGHT) {
          return false;
        }

        // Collision check
        const tileType = detailedTownMap[tileY]?.[tileX];
        if (tileType !== undefined && DETAILED_COLLISION_TILES.includes(tileType)) {
          return false;
        }

        // NPC collision
        for (const npc of this.npcs) {
          const distance = Phaser.Math.Distance.Between(x, y, npc.sprite.x, npc.sprite.y);
          if (distance < TILE_SIZE * 0.8) {
            return false;
          }
        }

        return true;
      }
    }

    // Create game with fixed map size, centered on screen
    const gameWidth = MAP_WIDTH * TILE_SIZE;
    const gameHeight = MAP_HEIGHT * TILE_SIZE;
    
    
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: gameContainerRef.current,
      width: gameWidth,
      height: gameHeight,
      backgroundColor: '#1a1a2e',
      scene: MainScene,
      pixelArt: true, // Enable pixel-perfect rendering for tiles
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    gameRef.current = new Phaser.Game(config);

    // Cleanup
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [isLoading]);

  const handleCloseDialogue = () => {
    setGameState(prev => ({
      ...prev,
      dialogueOpen: false,
      activeNPC: null,
      currentDialogueIndex: 0,
    }));
  };

  const handleNextDialogue = () => {
    if (!gameState.activeNPC) return;
    
    if (gameState.currentDialogueIndex < gameState.activeNPC.dialogues.length - 1) {
      setGameState(prev => ({
        ...prev,
        currentDialogueIndex: prev.currentDialogueIndex + 1,
      }));
    } else {
      handleCloseDialogue();
    }
  };

  const handleCloseDetail = () => {
    setGameState(prev => ({
      ...prev,
      detailPanelOpen: false,
      activeNPC: null,
    }));
  };

  // Handle ESC key for closing panels
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'k') {
        if (gameState.dialogueOpen || gameState.detailPanelOpen) {
          setGameState(prev => ({
            ...prev,
            dialogueOpen: false,
            detailPanelOpen: false,
            activeNPC: null,
          }));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.dialogueOpen, gameState.detailPanelOpen]);

  // Show loading screen
  if (isLoading) {
    return <GameLoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="relative w-full h-screen bg-[#1a1a2e] overflow-hidden flex flex-col">
      {/* Game area - takes remaining space above controls on mobile */}
      <div className="relative flex-1 flex items-start md:items-center justify-center overflow-hidden pt-6 md:pt-0">
        <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
          <PixelSnow 
            color="#ffffff"
            flakeSize={0.01}
            minFlakeSize={1.25}
            pixelResolution={200}
            speed={1.25}
            density={0.3}
            direction={125}
            brightness={4}
          />
        </div>

        <div ref={gameContainerRef} className="relative -top-24 z-10 h-full w-[150%] md:mt-0 sm:-top-0" />
        
        <GameMinimap playerPosition={playerPosition} />
        <GameHUD nearbyNPC={nearbyNPC} />

        {gameState.dialogueOpen && gameState.activeNPC && (
          <GameDialogue
            npc={gameState.activeNPC}
            onClose={handleCloseDialogue}
            onOpenDetail={() => {
              setGameState(prev => ({
                ...prev,
                dialogueOpen: false,
                detailPanelOpen: true,
              }));
            }}
          />
        )}

        {gameState.detailPanelOpen && gameState.activeNPC && (
          <GameDetailPanel
            npc={gameState.activeNPC}
            portfolioData={portfolioData}
            onClose={handleCloseDetail}
          />
        )}
      </div>
      
      
      {/* Mobile controls - only shown on mobile/touch devices */}
      {isMobile && (
        <MobileGameControls 
          onMove={handleMobileMove}
          onAction={handleMobileAction}
        />
      )}
    </div>
  );
};

export default SandboxMode;