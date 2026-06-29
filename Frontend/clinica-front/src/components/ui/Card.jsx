function Card({ children, className = '', hover = false }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm p-6 ${hover ? 'transition-shadow duration-200 hover:shadow-md' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
