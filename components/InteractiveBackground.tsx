import React, { useEffect, useRef } from 'react';

export const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Configuration
    const config = {
        // Darker emerald for better visibility on white/light backgrounds
        particleColor: 'rgba(4, 120, 87, 0.6)', // darker emerald, higher opacity
        lineColor: 'rgba(4, 120, 87, 0.3)', // darker lines
        particleCount: 0, 
        connectionDistance: 150,
        mouseDistance: 200,
        mouseRepelForce: 2
    };

    let mouse = { x: -1000, y: -1000 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      
      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 2; // Slightly larger dots
      }

      update(w: number, h: number) {
        // Normal movement
        this.x += this.vx;
        this.y += this.vy;

        // Bounce from edges
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;

        // Mouse Interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.mouseDistance) {
            const angle = Math.atan2(dy, dx);
            const force = (config.mouseDistance - distance) / config.mouseDistance;
            const repelX = Math.cos(angle) * force * config.mouseRepelForce;
            const repelY = Math.sin(angle) * force * config.mouseRepelForce;
            
            this.vx -= repelX;
            this.vy -= repelY;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = config.particleColor;
        ctx.fill();
      }
    }

    const init = () => {
        if (!canvas.parentElement) return;
        
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        
        const area = canvas.width * canvas.height;
        config.particleCount = Math.floor(area / 9000); // Slightly denser
        
        particles = [];
        for (let i = 0; i < config.particleCount; i++) {
            particles.push(new Particle(canvas.width, canvas.height));
        }
    };

    const animate = () => {
        if (!canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update(canvas.width, canvas.height);
            particle.draw();
        });

        connectParticles();
        
        animationFrameId = requestAnimationFrame(animate);
    };

    const connectParticles = () => {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.connectionDistance) {
                    const opacity = 1 - (distance / config.connectionDistance);
                    // Dynamic opacity for lines
                    ctx.strokeStyle = config.lineColor.replace('0.3', (opacity * 0.4).toString());
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    };

    const handleResize = () => {
        init();
    };

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
        mouse.x = -1000;
        mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    // Using window listener ensures we track mouse even if it's over text on top of canvas
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    
    init();
    animate();

    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseout', handleMouseLeave);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
        ref={canvasRef} 
        className="block w-full h-full"
        style={{ touchAction: 'none' }}
    />
  );
};