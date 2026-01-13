import React, { useEffect, useState, useRef } from 'react';

interface PentagonStatsProps {
  skills: { name: string; level: number }[];
  title: string;
  color?: string;
  size?: number;
}

const PentagonStats: React.FC<PentagonStatsProps> = ({
  skills,
  title,
  color = 'hsl(168 70% 35%)',
  size = 220,
}) => {
  const [animated, setAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pulsePhase, setPulsePhase] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Ensure we have exactly 5 skills
  const normalizedSkills = skills.slice(0, 5);
  while (normalizedSkills.length < 5) {
    normalizedSkills.push({ name: '', level: 0 });
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setIsVisible(true);
          setTimeout(() => setAnimated(true), 100);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [animated]);

  // Pulse animation for the skill polygon
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setPulsePhase(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [isVisible]);

  const center = size / 2;
  const maxRadius = size * 0.32;

  // Calculate pentagon points
  const getPoint = (index: number, radius: number) => {
    const angle = (index * 72 - 90) * (Math.PI / 180); // Start from top
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  // Generate background grid lines
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];
  const gridPaths = gridLevels.map((level) => {
    const points = Array.from({ length: 5 }, (_, i) => getPoint(i, maxRadius * level));
    return points.map((p) => `${p.x},${p.y}`).join(' ');
  });

  // Generate skill polygon with animation
  const skillPoints = normalizedSkills.map((skill, i) => {
    const baseLevel = isVisible ? skill.level / 100 : 0;
    // Add subtle pulse effect
    const pulseAmount = hoveredIndex === i ? 0.05 : 0.02;
    const pulse = Math.sin((pulsePhase + i * 72) * Math.PI / 180) * pulseAmount;
    const animatedLevel = Math.min(1, Math.max(0, baseLevel + (isVisible ? pulse : 0)));
    return getPoint(i, maxRadius * animatedLevel);
  });
  const skillPath = skillPoints.map((p) => `${p.x},${p.y}`).join(' ');

  // Label positions (slightly outside the pentagon)
  const labelPositions = normalizedSkills.map((_, i) => {
    const point = getPoint(i, maxRadius * 1.3);
    return point;
  });

  return (
    <div ref={containerRef} className="flex flex-col items-center w-full max-w-[280px]">
      <h3 className="text-lg md:text-xl font-bold text-foreground mb-3">{title}</h3>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible"
        >
          {/* Glow effect */}
          <defs>
            <filter id={`glow-${title}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id={`gradient-${title}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.6"/>
              <stop offset="100%" stopColor={color} stopOpacity="0.2"/>
            </linearGradient>
          </defs>

          {/* Background grid with animation */}
          {gridPaths.map((path, i) => (
            <polygon
              key={i}
              points={path}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-border transition-all duration-300"
              opacity={isVisible ? 0.3 + i * 0.1 : 0.2}
              style={{
                transform: `scale(${isVisible ? 1 : 0.8})`,
                transformOrigin: 'center',
                transitionDelay: `${i * 100}ms`,
              }}
            />
          ))}

          {/* Axis lines with pulse */}
          {Array.from({ length: 5 }, (_, i) => {
            const point = getPoint(i, maxRadius);
            const isHovered = hoveredIndex === i;
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={point.x}
                y2={point.y}
                stroke={isHovered ? color : 'currentColor'}
                strokeWidth={isHovered ? 2 : 1}
                className="text-border transition-all duration-300"
                opacity={isHovered ? 0.8 : 0.3}
              />
            );
          })}

          {/* Skill polygon with gradient and glow */}
          <polygon
            points={skillPath}
            fill={`url(#gradient-${title})`}
            stroke={color}
            strokeWidth="2.5"
            filter={`url(#glow-${title})`}
            className="transition-all duration-700 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
            }}
          />

          {/* Animated center pulse */}
          <circle
            cx={center}
            cy={center}
            r={isVisible ? 4 + Math.sin(pulsePhase * Math.PI / 180) * 2 : 0}
            fill={color}
            opacity={0.6}
            className="transition-all duration-500"
          />

          {/* Skill points with hover effects */}
          {skillPoints.map((point, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <g key={i}>
                {/* Outer glow ring */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={isHovered ? 12 : 8}
                  fill={color}
                  opacity={isHovered ? 0.3 : 0.15}
                  className="transition-all duration-300"
                />
                {/* Main point */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={isHovered ? 7 : 5}
                  fill={color}
                  stroke="#fff"
                  strokeWidth={isHovered ? 2 : 1}
                  className="transition-all duration-300 ease-out cursor-pointer"
                  style={{ transitionDelay: `${i * 100}ms` }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              </g>
            );
          })}
        </svg>

        {/* Labels */}
        {labelPositions.map((pos, i) => {
          const skill = normalizedSkills[i];
          if (!skill.name) return null;

          const isHovered = hoveredIndex === i;
          // Adjust text anchor based on position
          let textAnchor = 'middle';
          let xOffset = 0;
          if (pos.x < center - 20) {
            textAnchor = 'end';
            xOffset = -5;
          } else if (pos.x > center + 20) {
            textAnchor = 'start';
            xOffset = 5;
          }

          return (
            <div
              key={i}
              className={`absolute text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-300 cursor-pointer
                ${isHovered ? 'text-primary scale-110' : 'text-foreground'}`}
              style={{
                left: pos.x + xOffset,
                top: pos.y,
                transform: `translate(${textAnchor === 'end' ? '-100%' : textAnchor === 'start' ? '0' : '-50%'}, -50%)`,
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span className="block text-center">{skill.name}</span>
              <span 
                className={`block text-xs text-center transition-all duration-500
                  ${isHovered ? 'text-primary font-bold' : 'text-muted-foreground'}`}
                style={{ opacity: isVisible ? 1 : 0 }}
              >
                {skill.level}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PentagonStats;
