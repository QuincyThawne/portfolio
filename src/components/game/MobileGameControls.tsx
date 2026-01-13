import React from 'react';

interface MobileGameControlsProps {
  onMove: (direction: 'up' | 'down' | 'left' | 'right' | null) => void;
  onAction: (action: 'J' | 'K' | 'ESC') => void;
}

const MobileGameControls: React.FC<MobileGameControlsProps> = ({ onMove, onAction }) => {
  // Handle touch start for movement
  const handleTouchStart = (direction: 'up' | 'down' | 'left' | 'right') => {
    onMove(direction);
  };

  // Handle touch end
  const handleTouchEnd = () => {
    onMove(null);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[40vh] md:hidden z-40 pointer-events-none">
      {/* Semi-transparent background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      
      {/* Controls Container */}
      <div className="relative h-full flex items-end justify-between px-4 pb-6">
        
        {/* Left Side - D-Pad */}
        <div className="pointer-events-auto relative w-36 h-36">
          {/* D-Pad Background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-gray-900/80 border-4 border-gray-700 shadow-lg" />
          </div>
          
          {/* Up Button */}
          <button
            onTouchStart={() => handleTouchStart('up')}
            onTouchEnd={handleTouchEnd}
            onMouseDown={() => handleTouchStart('up')}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 
                       bg-gray-800 hover:bg-gray-700 active:bg-gray-600
                       border-2 border-gray-600 rounded-lg
                       flex items-center justify-center
                       shadow-md active:shadow-sm transition-all"
          >
            <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4l-8 8h16z" />
            </svg>
          </button>
          
          {/* Down Button */}
          <button
            onTouchStart={() => handleTouchStart('down')}
            onTouchEnd={handleTouchEnd}
            onMouseDown={() => handleTouchStart('down')}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 
                       bg-gray-800 hover:bg-gray-700 active:bg-gray-600
                       border-2 border-gray-600 rounded-lg
                       flex items-center justify-center
                       shadow-md active:shadow-sm transition-all"
          >
            <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 20l8-8H4z" />
            </svg>
          </button>
          
          {/* Left Button */}
          <button
            onTouchStart={() => handleTouchStart('left')}
            onTouchEnd={handleTouchEnd}
            onMouseDown={() => handleTouchStart('left')}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 
                       bg-gray-800 hover:bg-gray-700 active:bg-gray-600
                       border-2 border-gray-600 rounded-lg
                       flex items-center justify-center
                       shadow-md active:shadow-sm transition-all"
          >
            <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 12l8 8V4z" />
            </svg>
          </button>
          
          {/* Right Button */}
          <button
            onTouchStart={() => handleTouchStart('right')}
            onTouchEnd={handleTouchEnd}
            onMouseDown={() => handleTouchStart('right')}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 
                       bg-gray-800 hover:bg-gray-700 active:bg-gray-600
                       border-2 border-gray-600 rounded-lg
                       flex items-center justify-center
                       shadow-md active:shadow-sm transition-all"
          >
            <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 12l-8 8V4z" />
            </svg>
          </button>
          
          {/* Center decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                          w-6 h-6 rounded-full bg-gray-700 border-2 border-gray-600" />
        </div>

        {/* Right Side - Action Buttons (Gameboy style) */}
        <div className="pointer-events-auto relative right-5 w-36 h-36 flex items-center justify-center">
          {/* J Button (Talk/Interact) - Bottom */}
          <button
            onTouchStart={() => onAction('J')}
            onMouseDown={() => onAction('J')}
            className="absolute bottom-4 right-12 w-14 h-14 
                       bg-green-600 hover:bg-green-500 active:bg-green-400
                       border-4 border-green-800 rounded-full
                       flex items-center justify-center
                       shadow-lg active:shadow-md transition-all
                       font-bold text-white text-lg"
          >
            J
          </button>
          
          {/* K Button (Details) - Top Right */}
          <button
            onTouchStart={() => onAction('K')}
            onMouseDown={() => onAction('K')}
            className="absolute top-4 right-4 w-14 h-14 
                       bg-blue-600 hover:bg-blue-500 active:bg-blue-400
                       border-4 border-blue-800 rounded-full
                       flex items-center justify-center
                       shadow-lg active:shadow-md transition-all
                       font-bold text-white text-lg"
          >
            K
          </button>

          {/* Labels */}
          {/* <span className="absolute bottom-0 right-8 text-[10px] text-gray-400 font-medium">TALK</span>
          <span className="absolute top-0 right-2 text-[10px] text-gray-400 font-medium">DETAILS</span> */}
        </div>
      </div>

      {/* Top Bar with ESC/Menu */}
      <div className="absolute top-24 left-0 right-0 flex justify-center pointer-events-auto">
        <button
          onTouchStart={() => onAction('ESC')}
          onMouseDown={() => onAction('ESC')}
          className="px-4 py-2 bg-gray-800/90 hover:bg-gray-700 active:bg-gray-600
                     border-2 border-gray-600 rounded-full
                     flex items-center gap-2
                     shadow-md transition-all"
        >
          <span className="text-xs text-gray-400 font-medium">ESC</span>
          <span className="text-xs text-gray-300">Close</span>
        </button>
      </div>

      {/* Control hints */}
      <div className="absolute top-20 left-4 right-4 flex justify-between text-[10px] text-gray-500 pointer-events-none">
        <span>Move</span>
        <span>Actions</span>
      </div>
    </div>
  );
};

export default MobileGameControls;
