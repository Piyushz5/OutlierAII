import { motion } from 'framer-motion';

export default function QuoteHologram({ quote, author, error }) {
  // Show fallback content if no quote is available yet
  const displayQuote = quote || "Loading your quantum quote...";
  const displayAuthor = author || "Quantum System";

  if (error) {
    return (
      <div className="bg-black bg-opacity-70 border-2 border-red-500 rounded-2xl p-8 text-center text-red-500 font-bold text-xl" style={{ borderColor: '#ff00ea', color: '#ff00ea' }}>
        <div style={{ color: 'white' }}>Error State:</div>
        {error}
      </div>
    );
  }
  
  return (
    <motion.div
      className="relative bg-black bg-opacity-60 border-2 rounded-2xl p-8 max-w-xl mx-auto"
      style={{
        borderColor: '#00f0ff',
        boxShadow: '0 0 32px #00f0ff, 0 0 8px #ff00ea inset',
        backdropFilter: 'blur(8px)',
      }}
    >
      <blockquote className="text-2xl md:text-3xl mb-4 tracking-wide" style={{ color: '#00f0ff', fontFamily: 'Orbitron, sans-serif' }}>
        "{displayQuote}"
      </blockquote>
      <div className="text-lg text-right" style={{ color: '#39ff14', fontFamily: 'Inter, sans-serif' }}>— {displayAuthor}</div>
    </motion.div>
  );
} 