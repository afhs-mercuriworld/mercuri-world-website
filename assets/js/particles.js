// assets/js/particles.js - Particle background animation with mouse interaction
(function() {
  'use strict';

  // Check if device is mobile or prefers reduced motion
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Don't run on mobile or if user prefers reduced motion
  if (isMobile || prefersReducedMotion) {
    console.log('Particle animation disabled (mobile or reduced motion preference)');
    return;
  }

  // Check localStorage for user preference
  const STORAGE_KEY = 'mercuri_particles_enabled';
  let particlesEnabled = localStorage.getItem(STORAGE_KEY) !== 'false';

  // Configuration
  const CONFIG = {
    particleCount: 80,
    particleSize: 2,
    particleColor: 'rgba(78, 101, 203, 0.6)', // #4e65cb with opacity
    particleColorHover: 'rgba(180, 196, 248, 0.8)', // #b4c4f8 with opacity
    baseConnectionDistance: 150, // Base connection distance for larger screens
    mouseInfluenceRadius: 200,
    speed: 0.3,
    connectionOpacity: 0.35
  };

  // Dynamic connection distance based on screen size
  let connectionDistance = CONFIG.baseConnectionDistance;

  let canvas, ctx;
  let particles = [];
  let mouse = { x: null, y: null, radius: CONFIG.mouseInfluenceRadius };
  let animationId;

  // Particle class
  class Particle {
    constructor(isInitial = false) {
      this.opacity = isInitial ? 1 : 0; // Start invisible for new particles
      this.targetOpacity = 1;
      this.reset(isInitial);
      // Random initial position
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
    }

    reset(isInitial = false) {
      this.baseX = Math.random() * canvas.width;
      this.baseY = Math.random() * canvas.height;
      
      // Start at base position instead of random position on reset
      if (!isInitial) {
        this.x = this.baseX;
        this.y = this.baseY;
        this.opacity = 0;
        this.targetOpacity = 1;
      }
      
      this.vx = (Math.random() - 0.5) * CONFIG.speed;
      this.vy = (Math.random() - 0.5) * CONFIG.speed;
      this.size = Math.random() * CONFIG.particleSize + 1;
    }

    update() {
      // Fade in/out animation
      if (this.opacity < this.targetOpacity) {
        this.opacity += 0.02; // Gradual fade in
      } else if (this.opacity > this.targetOpacity) {
        this.opacity -= 0.02; // Gradual fade out
      }

      // Mouse interaction - repel particles
      if (mouse.x != null && mouse.y != null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 3;
          this.y -= Math.sin(angle) * force * 3;
        }
      }

      // Gentle float back to base position
      this.x += (this.baseX - this.x) * 0.01;
      this.y += (this.baseY - this.y) * 0.01;

      // Add random movement
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off edges
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      // Keep within bounds
      this.x = Math.max(0, Math.min(canvas.width, this.x));
      this.y = Math.max(0, Math.min(canvas.height, this.y));
    }

    draw() {
      // Determine color based on mouse proximity
      let color = CONFIG.particleColor;
      if (mouse.x != null && mouse.y != null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const ratio = 1 - (distance / mouse.radius);
          color = CONFIG.particleColorHover;
          this.size = CONFIG.particleSize * (1 + ratio * 0.5);
        } else {
          this.size = CONFIG.particleSize;
        }
      }

      // Apply opacity to color
      const colorWithOpacity = color.replace(/[\d.]+\)$/, `${this.opacity * parseFloat(color.match(/[\d.]+\)$/)[0])})`);
      ctx.fillStyle = colorWithOpacity;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Initialize canvas
  function initCanvas() {
    canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0';
    canvas.style.transition = 'opacity 0.5s ease';
    
    document.body.prepend(canvas);
    
    ctx = canvas.getContext('2d');
    resizeCanvas();
    
    // Fade in
    setTimeout(() => canvas.style.opacity = '1', 100);
  }

  // Resize canvas to window size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Calculate connection distance based on screen width
    // Scales from 80px (small screens) to 150px (large screens)
    const minDistance = 80;
    const maxDistance = CONFIG.baseConnectionDistance;
    const minWidth = 320;  // Small mobile
    const maxWidth = 1920; // Large desktop
    
    const screenWidth = window.innerWidth;
    const ratio = Math.min(Math.max((screenWidth - minWidth) / (maxWidth - minWidth), 0), 1);
    connectionDistance = minDistance + (maxDistance - minDistance) * ratio;
    
    console.log(`Connection distance adjusted to: ${Math.round(connectionDistance)}px for screen width: ${screenWidth}px`);
    
    // Fade out existing particles
    particles.forEach(particle => {
      particle.targetOpacity = 0;
    });
    
    // Wait for fade out, then reinitialize
    setTimeout(() => {
      particles = [];
      for (let i = 0; i < CONFIG.particleCount; i++) {
        particles.push(new Particle(false)); // false = fade in gradually
      }
    }, 500);
  }

  // Draw connections between nearby particles
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          // Apply particle opacity to connection lines
          const avgOpacity = (particles[i].opacity + particles[j].opacity) / 2;
          const opacity = CONFIG.connectionOpacity * (1 - distance / connectionDistance) * avgOpacity;
          ctx.strokeStyle = `rgba(78, 101, 203, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    // Draw connections
    drawConnections();

    animationId = requestAnimationFrame(animate);
  }

  // Mouse move handler
  function handleMouseMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  // Mouse leave handler
  function handleMouseLeave() {
    mouse.x = null;
    mouse.y = null;
  }

  // Create toggle control
  function createToggleControl() {
    const control = document.createElement('button');
    control.id = 'particle-toggle';
    control.innerHTML = `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
      </svg>
      <span class="ml-2">Effects</span>
    `;
    control.className = 'fixed bottom-4 right-4 z-50 px-4 py-2 bg-white/5 hover:bg-white/10 text-[#b4c4f8] rounded-lg backdrop-blur-sm border border-white/10 transition-all duration-200 flex items-center text-sm font-medium';
    control.style.opacity = '0';
    control.style.transition = 'opacity 0.3s ease';
    
    control.addEventListener('click', toggleParticles);
    document.body.appendChild(control);
    
    // Fade in control
    setTimeout(() => control.style.opacity = '0.7', 500);
    control.addEventListener('mouseenter', () => control.style.opacity = '1');
    control.addEventListener('mouseleave', () => control.style.opacity = '0.7');
    
    updateToggleButton(control);
  }

  // Update toggle button appearance
  function updateToggleButton(button) {
    if (particlesEnabled) {
      button.style.backgroundColor = 'rgba(78, 101, 203, 0.2)';
      button.style.borderColor = 'rgba(78, 101, 203, 0.3)';
      button.title = 'Disable particle effects';
    } else {
      button.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
      button.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      button.title = 'Enable particle effects';
    }
  }

  // Toggle particles
  function toggleParticles() {
    particlesEnabled = !particlesEnabled;
    localStorage.setItem(STORAGE_KEY, particlesEnabled);
    
    const button = document.getElementById('particle-toggle');
    if (button) updateToggleButton(button);
    
    if (particlesEnabled) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }

  // Start animation
  function startAnimation() {
    if (!canvas) {
      initCanvas();
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('resize', resizeCanvas);
      
      // Initialize particles with full opacity for first load
      for (let i = 0; i < CONFIG.particleCount; i++) {
        particles.push(new Particle(true)); // true = start visible
      }
    }
    canvas.style.display = 'block';
    canvas.style.opacity = '1';
    animate();
  }

  // Stop animation
  function stopAnimation() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    if (canvas) {
      canvas.style.opacity = '0';
      setTimeout(() => canvas.style.display = 'none', 500);
    }
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', function() {
    createToggleControl();
    
    if (particlesEnabled) {
      startAnimation();
    }
  });

  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    stopAnimation();
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseleave', handleMouseLeave);
    window.removeEventListener('resize', resizeCanvas);
  });

})();