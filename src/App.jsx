import React, { useState, useEffect, useRef } from 'react';
// Remove framer-motion import temporarily
// import { AnimatePresence, motion } from 'framer-motion';
import QuoteHologram from './components/QuoteHologram';
import NeonButton from './components/NeonButton';

// Collection of 30 quotes (no more API)
const QUOTES_COLLECTION = [
  { 
    content: "The universe is not only stranger than we imagine, it is stranger than we can imagine.", 
    author: "Arthur Eddington",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Arthur_Stanley_Eddington.jpg/440px-Arthur_Stanley_Eddington.jpg"
  },
  { 
    content: "In the beginning there was nothing, which exploded.", 
    author: "Terry Pratchett",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/10.12.12TerryPratchettByLuigiNovi1.jpg/440px-10.12.12TerryPratchettByLuigiNovi1.jpg"
  },
  { 
    content: "We are just an advanced breed of monkeys on a minor planet of a very average star.", 
    author: "Stephen Hawking",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Stephen_Hawking.StarChild.jpg/440px-Stephen_Hawking.StarChild.jpg"
  },
  { 
    content: "The cosmos is within us. We are made of star-stuff.", 
    author: "Carl Sagan",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Carl_Sagan_Planetary_Society.JPG/440px-Carl_Sagan_Planetary_Society.JPG"
  },
  { 
    content: "The most incomprehensible thing about the world is that it is comprehensible.", 
    author: "Albert Einstein",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/440px-Albert_Einstein_Head.jpg"
  },
  {
    content: "Nothing in life is to be feared, it is only to be understood.",
    author: "Marie Curie",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Marie_Curie_c1920.jpg/440px-Marie_Curie_c1920.jpg"
  },
  {
    content: "I am among those who think that science has great beauty.",
    author: "Marie Curie",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Marie_Curie_c1920.jpg/440px-Marie_Curie_c1920.jpg"
  },
  {
    content: "The good thing about science is that it's true whether or not you believe in it.",
    author: "Neil deGrasse Tyson",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Neil_deGrasse_Tyson_-_February_2020.jpg/440px-Neil_deGrasse_Tyson_-_February_2020.jpg"
  },
  {
    content: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Eleanor_Roosevelt_portrait_1933.jpg/440px-Eleanor_Roosevelt_portrait_1933.jpg"
  },
  {
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Steve_Jobs_2005.jpg/440px-Steve_Jobs_2005.jpg"
  },
  {
    content: "The important thing is not to stop questioning. Curiosity has its own reason for existing.",
    author: "Albert Einstein",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/440px-Albert_Einstein_Head.jpg"
  },
  {
    content: "Science is organized knowledge. Wisdom is organized life.",
    author: "Immanuel Kant",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Immanuel_Kant_%28painted_portrait%29.jpg/440px-Immanuel_Kant_%28painted_portrait%29.jpg"
  },
  {
    content: "The greatest enemy of knowledge is not ignorance, it is the illusion of knowledge.",
    author: "Stephen Hawking",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Stephen_Hawking.StarChild.jpg/440px-Stephen_Hawking.StarChild.jpg"
  },
  {
    content: "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.",
    author: "Nikola Tesla",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Tesla_circa_1890.jpeg/440px-Tesla_circa_1890.jpeg"
  },
  {
    content: "We must not forget that when radium was discovered no one knew that it would prove useful in hospitals.",
    author: "Marie Curie",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Marie_Curie_c1920.jpg/440px-Marie_Curie_c1920.jpg"
  },
  {
    content: "Somewhere, something incredible is waiting to be known.",
    author: "Carl Sagan",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Carl_Sagan_Planetary_Society.JPG/440px-Carl_Sagan_Planetary_Society.JPG"
  },
  {
    content: "The saddest aspect of life right now is that science gathers knowledge faster than society gathers wisdom.",
    author: "Isaac Asimov",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Isaac_Asimov_on_Throne.png/440px-Isaac_Asimov_on_Throne.png"
  },
  {
    content: "The beauty of a living thing is not the atoms that go into it, but the way those atoms are put together.",
    author: "Carl Sagan",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Carl_Sagan_Planetary_Society.JPG/440px-Carl_Sagan_Planetary_Society.JPG"
  },
  {
    content: "Physics is like sex: sure, it may give some practical results, but that's not why we do it.",
    author: "Richard Feynman",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/RichardFeynman-PaineMansionWoods1984_copyrightTamikoThiel_bw.jpg/440px-RichardFeynman-PaineMansionWoods1984_copyrightTamikoThiel_bw.jpg"
  },
  {
    content: "Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.",
    author: "Albert Einstein",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/440px-Albert_Einstein_Head.jpg"
  },
  {
    content: "I have no special talent. I am only passionately curious.",
    author: "Albert Einstein",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/440px-Albert_Einstein_Head.jpg"
  },
  {
    content: "We are all connected; To each other, biologically. To the earth, chemically. To the rest of the universe, atomically.",
    author: "Neil deGrasse Tyson",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Neil_deGrasse_Tyson_-_February_2020.jpg/440px-Neil_deGrasse_Tyson_-_February_2020.jpg"
  },
  {
    content: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    author: "Albert Einstein",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/440px-Albert_Einstein_Head.jpg"
  },
  {
    content: "The scientist is not a person who gives the right answers, he's one who asks the right questions.",
    author: "Claude Lévi-Strauss",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Claude_L%C3%A9vi-Strauss_2005-03-22.jpg/440px-Claude_L%C3%A9vi-Strauss_2005-03-22.jpg"
  },
  {
    content: "Science is a way of thinking much more than it is a body of knowledge.",
    author: "Carl Sagan",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Carl_Sagan_Planetary_Society.JPG/440px-Carl_Sagan_Planetary_Society.JPG"
  },
  {
    content: "There is nothing new to be discovered in physics now. All that remains is more and more precise measurement.",
    author: "Lord Kelvin",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Lord_Kelvin_photograph.jpg/440px-Lord_Kelvin_photograph.jpg"
  },
  {
    content: "Science without religion is lame, religion without science is blind.",
    author: "Albert Einstein",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/440px-Albert_Einstein_Head.jpg"
  },
  {
    content: "The whole of science is nothing more than a refinement of everyday thinking.",
    author: "Albert Einstein",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/440px-Albert_Einstein_Head.jpg"
  },
  {
    content: "If I have seen further it is by standing on the shoulders of giants.",
    author: "Isaac Newton",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/GodfreyKneller-IsaacNewton-1689.jpg/440px-GodfreyKneller-IsaacNewton-1689.jpg"
  },
  {
    content: "An expert is a person who has made all the mistakes that can be made in a very narrow field.",
    author: "Niels Bohr",
    portrait: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Niels_Bohr.jpg/440px-Niels_Bohr.jpg"
  }
];

// Collection of funny scientist photos for background
const FUNNY_SCIENTISTS = [
  {
    name: "Albert Einstein",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/14/Albert_Einstein_1951_cropped.jpg" 
  },
  {
    name: "Nikola Tesla",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/79/Tesla_circa_1890.jpeg"
  },
  {
    name: "Marie Curie",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Marie_Curie_1920.jpg/440px-Marie_Curie_1920.jpg"
  },
  {
    name: "Richard Feynman",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1a/RichardFeynman-PaineMansionWoods1984_copyrightTamikoThiel_bw.jpg"
  },
  {
    name: "Neil deGrasse Tyson",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Neil_deGrasse_Tyson_-_February_2020.jpg/440px-Neil_deGrasse_Tyson_-_February_2020.jpg"
  }
];

// Fetch a random portrait
const fetchPortrait = async (name) => {
  try {
    // For more reliable portraits, fetch from an API that returns actual author images
    const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`;
    const response = await fetch(apiUrl);
    
    if (response.ok) {
      const data = await response.json();
      if (data.thumbnail && data.thumbnail.source) {
        return data.thumbnail.source;
      }
    }
    
    // If Wikipedia fails, try another source (Unsplash)
    const unsplashUrl = `https://source.unsplash.com/200x200/?portrait,person,${encodeURIComponent(name.split(' ')[0])}`;
    return unsplashUrl;
  } catch (error) {
    console.error('Error fetching portrait:', error);
    // Return a fallback portrait based on the name
    return `https://avatars.dicebear.com/api/initials/${encodeURIComponent(name)}.svg`;
  }
};

export default function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [portrait, setPortrait] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [rotateX, setRotateX] = useState(5);
  const [rotateY, setRotateY] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(1);
  const [perspective, setPerspective] = useState(1000);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const noiseCanvasRef = useRef(null);
  const portraitRef = useRef(null);
  const quoteRef = useRef(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [revealProgress, setRevealProgress] = useState(0);
  const [audioReactive, setAudioReactive] = useState(0);
  const [isPortraitVisible, setIsPortraitVisible] = useState(false);
  const [currentScientistIndex, setCurrentScientistIndex] = useState(0);
  const [jumpOffset, setJumpOffset] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState({});

  // Preload all portrait images
  useEffect(() => {
    const preloadImages = async () => {
      console.log("Preloading portrait images...");
      const imageMap = {};
      
      // Create an array of promises for all image loading
      const preloadPromises = QUOTES_COLLECTION.map(quote => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            imageMap[quote.portrait] = true;
            resolve();
          };
          img.onerror = () => {
            // If loading fails, we'll still resolve but track the failure
            imageMap[quote.portrait] = false;
            resolve();
          };
          img.src = quote.portrait;
        });
      });
      
      // Wait for all images to attempt loading
      await Promise.all(preloadPromises);
      console.log("Portrait preloading complete");
      setPreloadedImages(imageMap);
    };
    
    preloadImages();
  }, []);

  // Initialize fluid noise canvas
  useEffect(() => {
    const initNoiseCanvas = () => {
      const canvas = noiseCanvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      let particles = [];
      let particleCount = 100;
      
      // Create particles
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          color: i % 3 === 0 ? '#00f0ff' : i % 3 === 1 ? '#ff00ea' : '#39ff14',
          speed: Math.random() * 1 + 0.2,
          angle: Math.random() * 360,
          noise: Math.random() * 20
        });
      }
      
      // Add larger glow elements
      for (let i = 0; i < 5; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 80 + 40,
          color: i % 2 === 0 ? 'rgba(0, 240, 255, 0.05)' : 'rgba(255, 0, 234, 0.05)',
          speed: Math.random() * 0.2 + 0.1,
          angle: Math.random() * 360,
          noise: Math.random() * 20,
          isGlow: true
        });
      }
      
      let frame = 0;
      let audioMultiplier = 1;
      
      const animate = () => {
        frame++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw noise field lines
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
        ctx.lineWidth = 1;
        
        // Horizontal lines
        for (let y = 0; y < canvas.height; y += 40) {
          ctx.beginPath();
          
          for (let x = 0; x < canvas.width; x += 10) {
            const distortion = Math.sin((x + frame) * 0.01) * 5 * audioMultiplier;
            
            if (x === 0) {
              ctx.moveTo(x, y + distortion);
            } else {
              ctx.lineTo(x, y + distortion);
            }
          }
          
          ctx.stroke();
        }
        
        // Update particles
        particles.forEach(p => {
          if (p.isGlow) {
            // Draw glow
            const gradient = ctx.createRadialGradient(p.x, p.y, 1, p.x, p.y, p.radius);
            gradient.addColorStop(0, p.color);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.beginPath();
            ctx.fillStyle = gradient;
            ctx.arc(p.x, p.y, p.radius * audioMultiplier, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Draw particle
            ctx.beginPath();
            ctx.fillStyle = p.color;
            ctx.arc(p.x, p.y, p.radius * (audioMultiplier * 0.5 + 0.5), 0, Math.PI * 2);
            ctx.fill();
            
            // Add glow
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 4 * (audioMultiplier * 0.3 + 0.7), 0, Math.PI * 2);
            const gradient = ctx.createRadialGradient(p.x, p.y, p.radius, p.x, p.y, p.radius * 4);
            gradient.addColorStop(0, p.color);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.fill();
          }
          
          // Move particle
          const noise = Math.sin(frame * 0.01 + p.noise) * 1;
          const radians = (p.angle * Math.PI) / 180;
          p.x += Math.cos(radians) * p.speed * audioMultiplier + noise;
          p.y += Math.sin(radians) * p.speed * audioMultiplier + noise;
          
          // Wrap around edges
          if (p.x < -p.radius * 4) p.x = canvas.width + p.radius * 4;
          if (p.x > canvas.width + p.radius * 4) p.x = -p.radius * 4;
          if (p.y < -p.radius * 4) p.y = canvas.height + p.radius * 4;
          if (p.y > canvas.height + p.radius * 4) p.y = -p.radius * 4;
          
          // Slowly change angle for wander effect
          p.angle += (Math.random() - 0.5) * 2;
        });
        
        requestAnimationFrame(animate);
      };
      
      animate();
      
      // Resize handling
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    };
    
    initNoiseCanvas();
  }, [audioReactive]);

  // Handle mouse movement for 3D perspective effect
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Limit rotation to a small range
    const rotX = 5 - ((mouseY - centerY) / centerY) * 5;
    const rotY = ((mouseX - centerX) / centerX) * 5;
    
    setRotateX(rotX);
    setRotateY(rotY);
    
    // Increase glow intensity on hover
    const distanceFromCenter = Math.sqrt(
      Math.pow(mouseX - centerX, 2) + 
      Math.pow(mouseY - centerY, 2)
    );
    
    const normalizedDistance = 1 - Math.min(distanceFromCenter / (Math.max(centerX, centerY)), 1);
    setGlowIntensity(1 + normalizedDistance * 0.5);
  };

  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    setRotateX(5);
    setRotateY(0);
    setGlowIntensity(1);
  };

  // Handle touch for mobile
  const handleTouch = (e) => {
    if (!containerRef.current || !e.touches[0]) return;
    
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;
    
    // Calculate rotation based on touch position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Limit rotation to a small range
    const rotX = 5 - ((touchY - centerY) / centerY) * 5;
    const rotY = ((touchX - centerX) / centerX) * 5;
    
    setRotateX(rotX);
    setRotateY(rotY);
  };

  // Portrait component with holographic effect - enhanced with loading state
  const HolographicPortrait = ({ src, isVisible, onLoad }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    
    // Direct and immediate image loading
    useEffect(() => {
      if (!src) return;
      
      // Create a new image and force load it
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Try to avoid CORS issues
      
      img.onload = () => {
        console.log("Portrait loaded successfully:", src);
        setImageLoaded(true);
        if (onLoad) onLoad();
      };
      
      img.onerror = (e) => {
        console.error("Failed to load portrait:", src, e);
        // Set loaded anyway to show something
        setImageLoaded(true);
      };
      
      // Bypass cache with a unique URL
      img.src = `${src}?t=${new Date().getTime()}`;
      
      return () => {
        img.onload = null;
        img.onerror = null;
      };
    }, [src]);
    
    if (!src) return null;
    
    return (
      <div 
        ref={portraitRef}
        className={`portrait-container ${isVisible ? 'visible' : ''}`}
        style={{
          position: 'absolute',
          width: '150px',
          height: '150px',
          left: 'calc(50% - 75px)',
          top: '-75px',
          borderRadius: '50%',
          opacity: isVisible ? 1 : 0,
          transform: isVisible 
            ? `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1)` 
            : 'perspective(1000px) rotateX(5deg) rotateY(0deg) scale(0.5)',
          border: '2px solid #00f0ff',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.5)',
          boxShadow: isVisible 
            ? `0 0 30px rgba(0, 240, 255, 0.8), 0 0 60px rgba(0, 240, 255, 0.4)` 
            : '0 0 0 rgba(0, 240, 255, 0)',
          overflow: 'hidden',
          zIndex: 2
        }}
      >
        {/* Default image to ensure something always displays */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#000',
            backgroundImage: 'radial-gradient(#00f0ff 1px, transparent 1px)',
            backgroundSize: '8px 8px',
            opacity: imageLoaded ? 0 : 1
          }}
        />
        
        {/* Actual portrait image */}
        <img 
          src={src} 
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%',
            filter: 'brightness(1.2) contrast(1.1)',
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in'
          }}
        />
        
        {/* Holographic overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, rgba(0, 240, 255, 0.3), transparent 40%, rgba(255, 0, 234, 0.3) 60%, transparent)',
          mixBlendMode: 'overlay',
          pointerEvents: 'none'
        }}></div>
        
        {/* Scanlines */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 240, 255, 0.2) 2px, transparent 3px)',
          backgroundSize: '100% 4px',
          pointerEvents: 'none',
          opacity: 0.7
        }}></div>
        
        {/* Circular glow */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.4) 0%, transparent 70%)',
          pointerEvents: 'none',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.8s ease'
        }}></div>
      </div>
    );
  };

  // Enhance the QuantumQuoteCard component to better show error states
  const QuantumQuoteCard = ({ quote, author, error }) => {
    if (error) {
      return (
        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          border: '2px solid #ff00ea',
          borderRadius: '1rem',
          padding: '2rem',
          textAlign: 'center',
          color: '#ff00ea',
          fontWeight: 'bold',
          fontSize: '1.25rem',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 32px #ff00ea',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ color: 'white', marginBottom: '1rem' }}>Error State:</div>
          {error}
          
          {/* Glitch effect */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(255, 0, 234, 0.1), transparent, rgba(0, 240, 255, 0.1))',
            backgroundSize: '200% 200%',
            animation: 'glitch-bg 2s linear infinite',
            pointerEvents: 'none'
          }}></div>
          
          <style jsx="true">{`
            @keyframes glitch-bg {
              0% { background-position: 0% 0%; }
              25% { background-position: 100% 0%; }
              50% { background-position: 100% 100%; }
              75% { background-position: 0% 100%; }
              100% { background-position: 0% 0%; }
            }
          `}</style>
        </div>
      );
    }
    
    return (
      <div 
        ref={quoteRef}
        style={{
          position: 'relative',
          backgroundColor: 'rgba(18, 18, 18, 0.6)',
          border: '2px solid #00f0ff',
          borderRadius: '1rem',
          padding: '2rem',
          paddingTop: isPortraitVisible ? '4rem' : '2rem',
          maxWidth: '36rem',
          margin: '0 auto',
          marginTop: isPortraitVisible ? '80px' : '0',
          backdropFilter: 'blur(20px)',
          boxShadow: `0 0 ${32 * glowIntensity}px #00f0ff, 0 0 ${8 * glowIntensity}px #ff00ea inset`,
          transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.1s ease-out, box-shadow 0.3s ease, padding-top 0.3s ease, margin-top 0.3s ease',
          cursor: 'grab',
          overflow: 'hidden'
        }}
      >
        {/* Holographic lines overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 240, 255, 0.1) 0px, transparent 1px, transparent 3px)',
          backgroundSize: '100% 4px',
          borderRadius: '1rem',
          pointerEvents: 'none',
          opacity: 0.5
        }}></div>
        
        {/* Quote text with reveal animation */}
        <blockquote
          className="reveal-text"
          style={{
            color: '#00f0ff',
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '1.5rem',
            marginBottom: '1rem',
            letterSpacing: '0.05em',
            textShadow: `0 0 ${8 * glowIntensity}px #00f0ff`,
            position: 'relative',
            zIndex: 2,
            opacity: quote ? 1 : 0,
            transform: quote ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease'
          }}
        >
          <span className="text-revealer">{quote || 'Loading your quantum quote...'}</span>
        </blockquote>
        
        {/* Author with reveal animation */}
        <div
          className="reveal-text"
          style={{
            color: '#39ff14',
            fontFamily: 'Inter, sans-serif',
            fontSize: '1.125rem',
            textAlign: 'right',
            textShadow: `0 0 ${6 * glowIntensity}px #39ff14`,
            position: 'relative',
            zIndex: 2,
            opacity: author ? 1 : 0,
            transform: author ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s'
          }}
        >
          <span className="text-revealer">— {author || 'Quantum System'}</span>
        </div>
        
        {/* Particle burst effect on reveal */}
        {isRevealing && (
          <div className="particle-burst">
            {Array.from({ length: 20 }).map((_, i) => {
              const angle = (i / 20) * Math.PI * 2;
              const distance = 150 * revealProgress;
              const delay = i * 0.02;
              
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: `${Math.random() * 6 + 2}px`,
                    height: `${Math.random() * 6 + 2}px`,
                    borderRadius: '50%',
                    backgroundColor: i % 3 === 0 ? '#00f0ff' : i % 3 === 1 ? '#ff00ea' : '#39ff14',
                    boxShadow: i % 3 === 0 ? '0 0 10px #00f0ff' : i % 3 === 1 ? '0 0 10px #ff00ea' : '0 0 10px #39ff14',
                    transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`,
                    opacity: 1 - revealProgress,
                    transition: `transform ${0.8}s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}s, opacity ${0.8}s ease ${delay}s`
                  }}
                />
              );
            })}
          </div>
        )}
        
        {/* Edge highlight */}
        <div style={{
          position: 'absolute',
          top: -1,
          left: -1,
          right: -1,
          bottom: -1,
          borderRadius: '1rem',
          background: 'linear-gradient(45deg, #00f0ff, transparent, #ff00ea, transparent, #00f0ff)',
          opacity: 0.5,
          filter: 'blur(4px)',
          pointerEvents: 'none',
          zIndex: 1
        }}></div>
        
        {/* Glitch effect on reveal */}
        {isRevealing && (
          <div className="glitch-overlay" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 240, 255, 0.2)',
            mixBlendMode: 'overlay',
            opacity: 1 - revealProgress,
            zIndex: 10,
            clipPath: `polygon(
              ${Math.random() * 100}% ${Math.random() * 100}%, 
              ${Math.random() * 100}% ${Math.random() * 100}%, 
              ${Math.random() * 100}% ${Math.random() * 100}%, 
              ${Math.random() * 100}% ${Math.random() * 100}%
            )`,
            transition: 'clip-path 0.1s ease, opacity 0.3s ease'
          }}></div>
        )}
      </div>
    );
  };

  // Enhanced button component
  const QuantumButton = ({ onClick, disabled, children }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressing, setIsPressing] = useState(false);

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressing(false);
        }}
        onMouseDown={() => setIsPressing(true)}
        onMouseUp={() => setIsPressing(false)}
        onTouchStart={() => setIsPressing(true)}
        onTouchEnd={() => setIsPressing(false)}
        style={{
          position: 'relative',
          marginTop: '2rem',
          padding: '0.75rem 2rem',
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '1.125rem',
          borderRadius: '9999px',
          backgroundColor: isHovered ? 'rgba(255, 0, 234, 0.8)' : 'rgba(0, 0, 0, 0.7)',
          color: isHovered ? '#ffffff' : '#ff00ea',
          border: '2px solid #ff00ea',
          boxShadow: isPressing 
            ? '0 0 5px #ff00ea, 0 0 10px #ff00ea inset' 
            : isHovered 
              ? '0 0 25px #ff00ea, 0 0 5px #00f0ff inset' 
              : '0 0 16px #ff00ea, 0 0 4px #00f0ff inset',
          textShadow: isHovered ? '0 0 5px #ffffff' : '0 0 8px #ff00ea',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          backdropFilter: 'blur(10px)',
          transform: isPressing 
            ? 'scale(0.98) translateY(2px)' 
            : isHovered 
              ? 'scale(1.05) translateY(-2px)' 
              : 'scale(1) translateY(0)',
          overflow: 'hidden'
        }}
      >
        {/* Button glow effect */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: isHovered 
            ? 'radial-gradient(circle at center, rgba(255, 0, 234, 0.5) 0%, transparent 70%)' 
            : 'none',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none'
        }}></div>
        
        {children}
        
        {/* Ripple effect for clicks */}
        {isPressing && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '150%',
            height: '150%',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%) scale(0)',
            animation: 'ripple 0.6s linear',
            pointerEvents: 'none'
          }}></div>
        )}
        <style jsx="true">{`
          @keyframes ripple {
            to {
              transform: translate(-50%, -50%) scale(1);
              opacity: 0;
            }
          }
        `}</style>
      </button>
    );
  };

  // Initialize ENHANCED psychedelic background canvas
  useEffect(() => {
    const initPsychedelicCanvas = () => {
      const canvas = noiseCanvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Psychedelic eyes parameters - INCREASE to 10
      const eyes = [];
      const eyeCount = 10; // More hallucinating eyes
      
      for (let i = 0; i < eyeCount; i++) {
        eyes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 80 + 40, // Larger eyes
          pulseSpeed: Math.random() * 0.03 + 0.01, // Faster pulsing
          hueRotate: Math.random() * 360,
          hueSpeed: Math.random() * 3 + 1.5, // Faster color cycling
          xSpeed: (Math.random() * 1 - 0.5) * (Math.random() < 0.5 ? -1 : 1), // More varied speeds
          ySpeed: (Math.random() * 1 - 0.5) * (Math.random() < 0.5 ? -1 : 1),
          dilated: Math.random() > 0.5,
          blinkRate: Math.random() * 0.01 + 0.002,
          blinkState: 0
        });
      }
      
      // Psychedelic wave parameters - INCREASED for more intensity
      const waves = [];
      const waveCount = 15; // More waves
      
      for (let i = 0; i < waveCount; i++) {
        waves.push({
          frequency: Math.random() * 0.03 + 0.01, // More varied frequencies
          amplitude: Math.random() * 50 + 20, // Higher amplitudes
          speed: Math.random() * 0.03 + 0.008, // Faster motion
          hue: Math.random() * 360,
          hueChange: Math.random() * 1 + 0.3, // Faster color morphing
          thickness: Math.random() * 6 + 1,
          offset: Math.random() * Math.PI * 2,
          wobble: Math.random() * 0.02 + 0.01 // Add wobble effect
        });
      }
      
      // NEW: Fractal elements - floating fractals
      const fractals = [];
      const fractalCount = 8;
      
      for (let i = 0; i < fractalCount; i++) {
        fractals.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 100 + 50,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() * 0.001 + 0.0005) * (Math.random() < 0.5 ? -1 : 1),
          hue: Math.random() * 360,
          hueSpeed: Math.random() * 0.5 + 0.1,
          complexity: Math.floor(Math.random() * 3) + 3,
          opacity: Math.random() * 0.2 + 0.1
        });
      }
      
      // NEW: Tracers effect parameters
      const tracers = [];
      const maxTracers = 100;
      
      // Animation time tracking
      let lastTime = 0;
      let globalTime = 0;
      
      // NEW: Kaleidoscope effect parameters
      const kaleidoscopeSegments = 8;
      const kaleidoscopeScale = Math.random() * 0.2 + 0.1;
      let kaleidoscopeRotation = 0;
      
      // Track mouse position for extra interactivity
      let mouseX = canvas.width / 2;
      let mouseY = canvas.height / 2;
      
      canvas.parentElement.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        
        // Add a new tracer on mouse move occasionally
        if (Math.random() > 0.7 && tracers.length < maxTracers) {
          tracers.push({
            x: mouseX,
            y: mouseY,
            size: Math.random() * 4 + 2,
            hue: Math.random() * 360,
            life: 1,
            decay: Math.random() * 0.01 + 0.005
          });
        }
      });
      
      // NEW: Visual distortion parameters
      const distortion = {
        amplitude: 0.1,
        frequency: 0.02,
        speed: 0.001,
        time: 0
      };
      
      const animate = (timestamp) => {
        // Calculate delta time for smooth animation regardless of frame rate
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        globalTime += deltaTime * 0.001;
        
        // Update distortion over time
        distortion.time += distortion.speed * deltaTime;
        distortion.amplitude = 0.05 + Math.sin(globalTime * 0.2) * 0.05;
        
        // Clear canvas with a trippy fade effect
        ctx.fillStyle = 'rgba(18, 18, 18, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update kaleidoscope rotation
        kaleidoscopeRotation += 0.0001 * deltaTime;
        
        // 1. ENHANCED: Draw psychedelic waves with more effects
        waves.forEach(wave => {
          // Update wave properties
          wave.offset += wave.speed * deltaTime;
          wave.hue = (wave.hue + wave.hueChange * deltaTime * 0.05) % 360;
          
          // Add a secondary wobble for more unpredictable movement
          const wobbleEffect = Math.sin(globalTime * wave.wobble) * 20;
          
          // Draw wave with glow effect
          ctx.beginPath();
          ctx.lineWidth = wave.thickness + Math.sin(globalTime * 2) * 2;
          ctx.strokeStyle = `hsl(${wave.hue}, 100%, 50%)`;
          ctx.shadowColor = `hsl(${wave.hue}, 100%, 60%)`;
          ctx.shadowBlur = 10;
          
          for (let x = 0; x < canvas.width; x += 5) {
            // More complex wave equation with distortion
            const distortionY = Math.sin((x * distortion.frequency) + distortion.time) * 
                               (distortion.amplitude * canvas.height);
            
            const y = Math.sin((x * wave.frequency) + wave.offset) * (wave.amplitude + wobbleEffect) + 
                     (canvas.height / 2) + distortionY;
            
            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          
          ctx.stroke();
          ctx.shadowBlur = 0; // Reset shadow for performance
        });
        
        // 2. NEW: Draw fractal patterns
        fractals.forEach(fractal => {
          // Update fractal properties
          fractal.rotation += fractal.rotationSpeed * deltaTime;
          fractal.hue = (fractal.hue + fractal.hueSpeed * deltaTime * 0.05) % 360;
          
          // Draw Sierpinski-inspired pattern
          const drawFractal = (x, y, size, depth) => {
            if (depth <= 0) return;
            
            const halfSize = size / 2;
            
            // Draw a glowing triangle
            ctx.fillStyle = `hsla(${fractal.hue + depth * 30}, 100%, 60%, ${fractal.opacity})`;
            ctx.shadowColor = `hsla(${fractal.hue + depth * 30}, 100%, 70%, 0.5)`;
            ctx.shadowBlur = 10;
            
            ctx.beginPath();
            ctx.moveTo(x, y - halfSize);
            ctx.lineTo(x - halfSize, y + halfSize);
            ctx.lineTo(x + halfSize, y + halfSize);
            ctx.closePath();
            ctx.fill();
            
            ctx.shadowBlur = 0;
            
            // Recursively draw smaller patterns
            if (depth > 1) {
              drawFractal(x, y - halfSize/2, halfSize/2, depth-1);
              drawFractal(x - halfSize/2, y + halfSize/2, halfSize/2, depth-1);
              drawFractal(x + halfSize/2, y + halfSize/2, halfSize/2, depth-1);
            }
          };
          
          // Apply kaleidoscope effect to fractal
          const cx = canvas.width / 2;
          const cy = canvas.height / 2;
          
          // Initial position distorted by noise
          const noiseOffsetX = Math.sin(globalTime * 0.3 + fractal.x) * 100;
          const noiseOffsetY = Math.cos(globalTime * 0.2 + fractal.y) * 100;
          
          const fx = fractal.x + noiseOffsetX;
          const fy = fractal.y + noiseOffsetY;
          
          // Calculate angle to the fractal
          ctx.save();
          ctx.translate(fx, fy);
          ctx.rotate(fractal.rotation);
          drawFractal(0, 0, fractal.size, fractal.complexity);
          ctx.restore();
        });
        
        // 3. ENHANCED: Draw hallucinating eyes with more effects
        eyes.forEach(eye => {
          // Update eye position and properties
          eye.x += eye.xSpeed * deltaTime * 0.05;
          eye.y += eye.ySpeed * deltaTime * 0.05;
          eye.hueRotate = (eye.hueRotate + eye.hueSpeed * deltaTime * 0.05) % 360;
          eye.blinkState = Math.max(0, eye.blinkState - deltaTime * 0.001);
          
          // Random blink
          if (Math.random() < eye.blinkRate && eye.blinkState <= 0) {
            eye.blinkState = 1; // Start blink
          }
          
          // Bounce off edges with distortion
          if (eye.x < eye.size || eye.x > canvas.width - eye.size) {
            eye.xSpeed = -eye.xSpeed * (0.8 + Math.random() * 0.4);
            eye.hueRotate += 30; // Change color on bounce
          }
          if (eye.y < eye.size || eye.y > canvas.height - eye.size) {
            eye.ySpeed = -eye.ySpeed * (0.8 + Math.random() * 0.4);
            eye.hueRotate += 30; // Change color on bounce
          }
          
          // NEW: Determine blink scale (1 = open, 0 = closed)
          const blinkScale = eye.blinkState > 0 
            ? 1 - Math.sin(eye.blinkState * Math.PI) 
            : 1;
          
          // Calculate pupil size with more complex pulsing effect
          const drugEffect = eye.dilated ? 0.8 : 0.4; // Dilated pupils effect
          const basePulseFactor = Math.sin(timestamp * eye.pulseSpeed) * 0.3 + drugEffect;
          const breathingEffect = Math.sin(globalTime * 0.2) * 0.05;
          const totalPulseFactor = basePulseFactor + breathingEffect;
          
          const irisSize = eye.size * blinkScale;
          const pupilSize = irisSize * (0.3 + totalPulseFactor);
          
          // Only draw if eye is at least partially open
          if (blinkScale > 0.1) {
            // Draw eyelid/sclera
            ctx.beginPath();
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.ellipse(eye.x, eye.y, eye.size * 1.2, eye.size * blinkScale, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw iris with shifting colors
            const gradient = ctx.createRadialGradient(
              eye.x, eye.y, pupilSize * 0.8,
              eye.x, eye.y, irisSize
            );
            
            // More vibrant, trippy iris colors
            gradient.addColorStop(0, `hsl(${eye.hueRotate}, 100%, 60%)`);
            gradient.addColorStop(0.5, `hsl(${(eye.hueRotate + 60) % 360}, 100%, 40%)`);
            gradient.addColorStop(0.8, `hsl(${(eye.hueRotate + 180) % 360}, 90%, 20%)`);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
            
            ctx.beginPath();
            ctx.fillStyle = gradient;
            ctx.ellipse(eye.x, eye.y, irisSize, irisSize * blinkScale, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw pupil with more "alive" effects
            const pupilX = eye.x + Math.sin(globalTime * 0.5) * (irisSize * 0.1);
            const pupilY = eye.y + Math.cos(globalTime * 0.4) * (irisSize * 0.1);
            
            ctx.beginPath();
            ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
            ctx.ellipse(pupilX, pupilY, pupilSize, pupilSize * blinkScale, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // NEW: Add redness around eye for bloodshot effect
            ctx.beginPath();
            const bloodshotGradient = ctx.createRadialGradient(
              eye.x, eye.y, irisSize,
              eye.x, eye.y, eye.size * 1.2
            );
            bloodshotGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
            bloodshotGradient.addColorStop(0.7, 'rgba(255, 50, 50, 0.15)');
            bloodshotGradient.addColorStop(1, 'rgba(255, 50, 50, 0.3)');
            ctx.fillStyle = bloodshotGradient;
            ctx.ellipse(eye.x, eye.y, eye.size * 1.2, eye.size * blinkScale, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw glare highlight with movement
            const glareX = pupilX - pupilSize * 0.4 + Math.sin(globalTime) * pupilSize * 0.1;
            const glareY = pupilY - pupilSize * 0.3 + Math.cos(globalTime) * pupilSize * 0.1;
            
            ctx.beginPath();
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.ellipse(glareX, glareY, pupilSize * 0.35, pupilSize * 0.25 * blinkScale, 
                       Math.PI/4 + Math.sin(globalTime * 0.3) * 0.5, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw radial lines in iris with pulsing
            const lineCount = 16;
            ctx.strokeStyle = `hsla(${(eye.hueRotate + 40) % 360}, 100%, 20%, 0.5)`;
            ctx.lineWidth = 1 + Math.sin(globalTime * 0.5) * 0.5;
            
            for (let i = 0; i < lineCount; i++) {
              const lineAngle = (i / lineCount) * Math.PI * 2 + globalTime * 0.1;
              const innerX = eye.x + Math.cos(lineAngle) * pupilSize;
              const innerY = eye.y + Math.sin(lineAngle) * pupilSize * blinkScale;
              
              // Wavy lines with distortion
              const waveIntensity = Math.sin(globalTime * 0.5) * 3;
              const waveFrequency = 5 + Math.sin(globalTime * 0.2) * 2;
              
              ctx.beginPath();
              ctx.moveTo(innerX, innerY);
              
              // Draw wavy lines
              const steps = 10;
              for (let s = 0; s <= steps; s++) {
                const t = s / steps;
                const r = pupilSize + (irisSize - pupilSize) * t;
                const angle = lineAngle + Math.sin(t * waveFrequency + globalTime) * 0.1 * waveIntensity;
                
                const x = eye.x + Math.cos(angle) * r;
                const y = eye.y + Math.sin(angle) * r * blinkScale;
                
                if (s === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
              }
              
              ctx.stroke();
            }
            
            // Draw hypnotic spiral in the pupil with more psychedelic effect
            ctx.lineWidth = 1.5;
            
            const spiralStartRadius = pupilSize * 0.1;
            const spiralEndRadius = pupilSize * 0.9;
            const spiralSteps = 30;
            
            for (let r = spiralStartRadius; r <= spiralEndRadius; r += (spiralEndRadius - spiralStartRadius) / spiralSteps) {
              // Wavy, distorted spiral
              const wobbleAmount = 0.3 + Math.sin(globalTime * 0.5) * 0.2;
              const spiralAngle = globalTime + (r / spiralEndRadius) * Math.PI * 12 + 
                                Math.sin(r * 0.5 + globalTime) * wobbleAmount;
              
              const x = pupilX + Math.cos(spiralAngle) * r;
              const y = pupilY + Math.sin(spiralAngle) * r * blinkScale;
              
              // Psychedelic color shifting
              const hue = (eye.hueRotate + r * 15 + globalTime * 20) % 360;
              
              ctx.beginPath();
              ctx.fillStyle = `hsla(${hue}, 100%, 70%, 0.8)`;
              ctx.arc(x, y, 1.5 + Math.sin(globalTime + r) * 1, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        });
        
        // 4. NEW: Update and draw tracers
        tracers.forEach((tracer, index) => {
          tracer.life -= tracer.decay * deltaTime * 0.05;
          
          if (tracer.life <= 0) {
            tracers.splice(index, 1);
          } else {
            ctx.beginPath();
            ctx.fillStyle = `hsla(${tracer.hue}, 100%, 60%, ${tracer.life * 0.5})`;
            ctx.shadowColor = `hsla(${tracer.hue}, 100%, 70%, ${tracer.life * 0.7})`;
            ctx.shadowBlur = 10;
            ctx.arc(tracer.x, tracer.y, tracer.size * tracer.life, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });
        
        // Occasionally add random tracers for ambient effect
        if (Math.random() > 0.95 && tracers.length < maxTracers) {
          tracers.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 3,
            hue: Math.random() * 360,
            life: 1,
            decay: Math.random() * 0.01 + 0.002
          });
        }
        
        // 5. Apply global color shift effect
        const globalHueShift = (globalTime * 15) % 360;
        ctx.fillStyle = `hsla(${globalHueShift}, 100%, 50%, 0.03)`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        requestAnimationFrame(animate);
      };
      
      animate(0);
      
      // Resize handling
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    };
    
    initPsychedelicCanvas();
  }, [audioReactive]);

  // Simplified fetchQuote function - just cycles through the quotes collection
  const fetchQuote = () => {
    console.log("=== GENERATE QUOTE BUTTON CLICKED ===");
    setIsRevealing(true);
    setRevealProgress(0);
    
    // Reset any errors
    setError('');
    
    // Hide portrait during transition
    setIsPortraitVisible(false);
    
    // Simple animation for reveal effect
    let progress = 0;
    const animateReveal = () => {
      if (progress < 1) {
        progress += 0.05;
        setRevealProgress(progress);
        requestAnimationFrame(animateReveal);
      } else {
        setIsRevealing(false);
      }
    };
    requestAnimationFrame(animateReveal);
    
    // Calculate next quote index
    const nextIndex = (currentQuoteIndex + 1) % QUOTES_COLLECTION.length;
    setCurrentQuoteIndex(nextIndex);
    
    // Get the next quote
    const nextQuote = QUOTES_COLLECTION[nextIndex];
    console.log("Setting quote:", nextQuote.content);
    console.log("Setting author:", nextQuote.author);
    
    // Update state with new quote
    setQuote(nextQuote.content);
    setAuthor(nextQuote.author);
    setPortrait(nextQuote.portrait);
    
    // Show portrait after a delay
    setTimeout(() => {
      console.log("Making portrait visible");
      setIsPortraitVisible(true);
    }, 300);
    
    // Perspective shift effect
    setPerspective(800);
    setTimeout(() => setPerspective(1000), 300);
  };

  // Initial quote display
  useEffect(() => {
    // Set the first quote from our collection
    const initialQuote = QUOTES_COLLECTION[0];
    setQuote(initialQuote.content);
    setAuthor(initialQuote.author);
    setPortrait(initialQuote.portrait);
    
    // Show portrait after a delay to ensure images had time to preload
    setTimeout(() => {
      setIsPortraitVisible(true);
    }, 500);
    
    // Add CSS for text reveal animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes textReveal {
        0% { transform: translateY(100%); }
        100% { transform: translateY(0); }
      }
      
      .text-revealer {
        display: inline-block;
        overflow: hidden;
        position: relative;
      }
      
      .text-revealer::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, #00f0ff, #ff00ea);
        transform: translateY(0);
        animation: textReveal 0.6s cubic-bezier(0.77, 0, 0.175, 1) forwards;
      }
    `;
    document.head.appendChild(style);
    
    return () => document.head.removeChild(style);
  }, []);

  // Animated scientist background
  const ScientistBackground = () => {
    const scientist = FUNNY_SCIENTISTS[currentScientistIndex];
    
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${scientist.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2,
          transform: `translateY(${jumpOffset}px)`,
          filter: 'blur(5px) grayscale(30%)'
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, transparent 20%, #121212 80%)'
        }} />
      </div>
    );
  };

  // Handle jumping animation of scientist background
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    let frameId;
    let startTime = Date.now();
    
    const animateJump = () => {
      const elapsed = Date.now() - startTime;
      const jump = Math.sin(elapsed / 2000) * 10; // 10px jump amplitude
      setJumpOffset(jump);
      frameId = requestAnimationFrame(animateJump);
    };
    
    animateJump();
    
    // Change scientist every 5 seconds
    const intervalId = setInterval(() => {
      setCurrentScientistIndex(prevIndex => 
        (prevIndex + 1) % FUNNY_SCIENTISTS.length
      );
    }, 5000);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouch}
      style={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #121212, #1A1A1A)',
        padding: '0 1rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated scientist background */}
      <ScientistBackground />
      
      {/* Fluid noise canvas background */}
      <canvas 
        ref={noiseCanvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}
      />
      
      <main style={{ 
        width: '100%', 
        maxWidth: '36rem', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        zIndex: 10,
        position: 'relative'
      }}>
        {/* Title with higher z-index */}
        <header style={{
          width: '100%',
          textAlign: 'center',
          marginBottom: '3rem', // Increased margin to make room for portrait
          zIndex: 20,
          position: 'relative'
        }}>
          <h1 style={{
            fontFamily: 'Orbitron, sans-serif',
            color: '#00f0ff',
            fontSize: '2rem',
            textShadow: '0 0 15px #00f0ff',
            letterSpacing: '0.1em',
            opacity: 0.9,
            transform: `perspective(1000px) rotateX(${rotateX/2}deg) rotateY(${rotateY/2}deg)`,
            transition: 'transform 0.3s ease-out'
          }}>
            Quote Generator @OutlierAI
          </h1>
        </header>
        
        {/* The quote container (relative position to allow portrait overlay) */}
        <div 
          style={{ 
            position: 'relative', 
            width: '100%',
            marginTop: '2rem' // Added margin to create space after title
          }}
          aria-live="polite" // Accessibility: announce new quotes to screen readers
        >
          {/* Holographic portrait */}
          <HolographicPortrait 
            src={portrait} 
            isVisible={isPortraitVisible}
          />
          
          {/* Enhanced 3D Quote */}
          <QuantumQuoteCard quote={quote} author={author} error={error} />
        </div>
        
        {/* Control buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          <button 
            onClick={fetchQuote}
            style={{
              position: 'relative',
              marginTop: '2rem',
              padding: '1rem 2rem',
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              borderRadius: '9999px',
              backgroundColor: '#ff00ea',
              color: '#ffffff',
              border: '3px solid #00f0ff',
              boxShadow: '0 0 25px #ff00ea, 0 0 10px #00f0ff inset',
              textShadow: '0 0 5px #ffffff',
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              transform: 'scale(1)',
              overflow: 'hidden',
              zIndex: 100
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 35px #ff00ea, 0 0 15px #00f0ff inset';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 0 25px #ff00ea, 0 0 10px #00f0ff inset';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.98)';
              e.currentTarget.style.boxShadow = '0 0 15px #ff00ea, 0 0 5px #00f0ff inset';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 35px #ff00ea, 0 0 15px #00f0ff inset';
            }}
          >
            NEXT QUOTE
          </button>
        </div>
      </main>
      
      <footer style={{ 
        marginTop: '2rem', 
        color: '#00f0ff', 
        fontSize: '0.875rem', 
        opacity: 0.6, 
        zIndex: 10,
        fontFamily: 'Inter, sans-serif',
        textShadow: '0 0 5px #00f0ff',
        letterSpacing: '0.1em',
        textAlign: 'center',
        padding: '1rem',
        backdropFilter: 'blur(10px)',
        background: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '1rem',
        border: '1px solid rgba(0, 240, 255, 0.1)',
        width: '100%',
        maxWidth: '20rem',
        margin: '2rem auto 1rem'
      }}>
        Quote Generator @OutlierAI &copy; {new Date().getFullYear()}
      </footer>
      
      {/* Preload the scientist images for better performance */}
      <div style={{ display: 'none' }}>
        {FUNNY_SCIENTISTS.map((scientist, index) => (
          <link key={index} rel="preload" href={scientist.image} as="image" />
        ))}
      </div>
    </div>
  );
} 