import { Search } from "lucide-react";

function SearchBar({ value, onChange }) {
  return (
    <div className="search-container">
      <Search size={18} />

      <input
        type="text"
        placeholder="Search employees..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;