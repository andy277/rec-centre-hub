
import { useState, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchFilterProps {
  onSearch: (query: string) => void;
}

const SearchFilter = ({ onSearch }: SearchFilterProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSearch = () => {
    onSearch(query);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={`relative rounded-lg border ${
      isFocused ? 'border-primary shadow-sm ring-1 ring-primary/20' : 'border-border'
    } transition-all duration-200`}>
      <div className="flex items-center px-3 py-2">
        <Search 
          className={`h-5 w-5 ${isFocused ? 'text-primary' : 'text-muted-foreground'} transition-colors duration-200`}
          onClick={handleSearch}
        />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search by activity (e.g., Swimming, Basketball) or center name..."
          className="flex-1 bg-transparent border-0 outline-none focus:ring-0 text-foreground placeholder:text-muted-foreground px-3 py-1"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {query && (
          <button
            onClick={handleClear}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
