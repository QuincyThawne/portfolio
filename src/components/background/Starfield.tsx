import { useEffect, useRef, useCallback } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  dx: number;
  dy: number;
  twinkle: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  life: number;
}

interface StarfieldProps {
  darkMode?: boolean;
}

const Starfield: React.FC<StarfieldProps> = ({ darkMode = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollYRef = useRef(0);
  const animationFrameRef = useRef<number>();
  const dimensionsRef = useRef({ width: window.innerWidth, height: window.innerHeight });

  const STAR_COUNT = 210;

  // Initialize stars
  const initStars = useCallback(() => {
    const { width, height } = dimensionsRef.current;
    starsRef.current = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2 + 0.5,
      alpha: Math.random(),
      dx: (Math.random() - 0.5) * 0.15,
      dy: (Math.random() - 0.5) * 0.15,
      twinkle: Math.random() * 0.05 + 0.01,
    }));
  }, []);

  // Handle click sparkle
  const handleClick = useCallback((e: MouseEvent) => {
    const sparkles: Star[] = Array.from({ length: 8 }, () => ({
      x: e.clientX,
      y: e.clientY,
      radius: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 3,
      dy: (Math.random() - 0.5) * 3,
      alpha: 1,
      twinkle: -0.02, // Fade out
    }));
    starsRef.current = [...starsRef.current, ...sparkles];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set initial dimensions
    const updateDimensions = () => {
      dimensionsRef.current = { width: window.innerWidth, height: window.innerHeight };
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateDimensions();
    initStars();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / dimensionsRef.current.width - 0.5,
        y: e.clientY / dimensionsRef.current.height - 0.5,
      };
    };

    // Scroll tracking
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    // Shooting stars interval
    const shootingStarInterval = setInterval(() => {
      const { width } = dimensionsRef.current;
      const angle = Math.random() * Math.PI / 4;
      shootingStarsRef.current.push({
        x: Math.random() * width,
        y: 0,
        length: Math.random() * 80 + 100,
        speed: Math.random() * 4 + 6,
        angle,
        life: 0,
      });
    }, 5000);

    // Animation loop
    const draw = () => {
      const { width, height } = dimensionsRef.current;
      ctx.clearRect(0, 0, width, height);

      const color = darkMode ? '255, 255, 255' : '0, 0, 0';

      // Draw and update stars
      starsRef.current = starsRef.current.filter((star) => {
        const parallaxX = mouseRef.current.x * 20;
        const parallaxY = mouseRef.current.y * 20;

        star.x += star.dx + parallaxX * 0.01;
        star.y += star.dy + scrollYRef.current * 0.0001 + parallaxY * 0.01;

        star.alpha += star.twinkle * (Math.random() > 0.5 ? 1 : -1);
        star.alpha = Math.max(0, Math.min(1, star.alpha));

        // Remove faded sparkles
        if (star.alpha <= 0) return false;

        // Wrap around screen edges
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${star.alpha})`;
        ctx.fill();

        return true;
      });

      // Keep star count stable
      while (starsRef.current.length < STAR_COUNT) {
        starsRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.2 + 0.5,
          alpha: Math.random(),
          dx: (Math.random() - 0.5) * 0.15,
          dy: (Math.random() - 0.5) * 0.15,
          twinkle: Math.random() * 0.05 + 0.01,
        });
      }

      // Draw shooting stars
      shootingStarsRef.current = shootingStarsRef.current
        .map((star) => {
          const x = star.x + star.speed * Math.cos(star.angle);
          const y = star.y + star.speed * Math.sin(star.angle);

          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(x, y);

          const gradient = ctx.createLinearGradient(star.x, star.y, x, y);
          gradient.addColorStop(0, `rgba(${color}, 0)`);
          gradient.addColorStop(1, `rgba(${color}, 0.8)`);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.stroke();

          return { ...star, x, y, life: star.life + 1 };
        })
        .filter((s) => s.life < 60);

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('click', handleClick);

    // Start animation
    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('click', handleClick);
      clearInterval(shootingStarInterval);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [darkMode, initStars, handleClick]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-auto"
      style={{
        width: '100vw',
        height: '100vh',
      }}
    />
  );
};

export default Starfield;
