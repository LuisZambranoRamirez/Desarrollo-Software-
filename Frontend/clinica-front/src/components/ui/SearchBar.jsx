import { Search } from 'lucide-react';

function SearchBar({ value, onChange, placeholder = 'Search...', className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <Search size={18} />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#E2E8F0] bg-white pl-10 pr-4 py-2 text-sm transition-colors duration-200 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
      />
    </div>
  );
}

export default SearchBar;
