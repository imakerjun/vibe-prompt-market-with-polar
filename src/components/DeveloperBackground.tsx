import { useEffect, useRef } from 'react';

const DeveloperBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Code rain effect
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");

    const fontSize = 10;
    const columns = canvas.width / fontSize;

    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0ea5e9';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 opacity-20"
        style={{ background: 'transparent' }}
      />
      
      {/* Gradient overlay - More sophisticated dark gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full filter blur-3xl" />
      </div>

      {/* Code blocks decoration */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-10 opacity-5 transform rotate-12 pointer-events-none">
          <pre className="text-xs text-cyan-400 font-mono">
            {`function createAwesome() {
  const magic = true;
  return magic ? "🚀" : null;
}`}
          </pre>
        </div>
        
        <div className="absolute top-40 right-20 opacity-5 transform -rotate-12 pointer-events-none">
          <pre className="text-xs text-purple-400 font-mono">
            {`const prompt = {
  type: "developer",
  level: "expert",
  vibe: 100
};`}
          </pre>
        </div>

        <div className="absolute bottom-40 left-20 opacity-5 transform rotate-6 pointer-events-none">
          <pre className="text-xs text-green-400 font-mono">
            {`<Component
  awesome={true}
  performance="optimized"
/>`}
          </pre>
        </div>

        <div className="absolute bottom-20 right-10 opacity-5 transform -rotate-6 pointer-events-none">
          <pre className="text-xs text-yellow-400 font-mono">
            {`npm install creativity
npm run build:awesome
npm start`}
          </pre>
        </div>
      </div>

      {/* Animated dots grid */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(148, 163, 184, 0.05)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E")`
          }}
        />
      </div>
    </>
  );
};

export default DeveloperBackground;