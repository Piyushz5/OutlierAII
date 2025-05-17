export default function NeonButton({ onClick, children, disabled, className, ...props }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`mt-8 px-8 py-3 rounded-full bg-black ${className || ''}`}
      style={{
        fontFamily: 'Orbitron, sans-serif',
        fontSize: '1.125rem',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: '#ff00ea',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#ff00ea',
        boxShadow: '0 0 16px #ff00ea, 0 0 4px #00f0ff inset',
        textShadow: '0 0 8px #ff00ea',
        transition: 'all 0.3s ease',
        transform: disabled ? 'scale(1)' : 'scale(1)',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      onMouseOver={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = '#ff00ea';
          e.currentTarget.style.color = 'black';
          e.currentTarget.style.transform = 'scale(1.05)';
        }
      }}
      onMouseOut={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
          e.currentTarget.style.color = '#ff00ea';
          e.currentTarget.style.transform = 'scale(1)';
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
} 