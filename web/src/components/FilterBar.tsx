import React from 'react';
import './FilterBar.css';
import { Search } from 'lucide-react';

interface FilterBarProps {
    searchTerm: string;
    onSearchChange: (val: string) => void;
    categories: string[];
    selectedCategory: string | null;
    onCategorySelect: (cat: string | null) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
    searchTerm,
    onSearchChange,
    categories,
    selectedCategory,
    onCategorySelect
}) => {
    return (
        <div className="filter-bar">
            <div className="search-container">
                <Search className="search-icon" size={20} />
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search interactions..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className="tags-container">
                <button
                    className={`tag-chip ${selectedCategory === null ? 'active' : ''}`}
                    onClick={() => onCategorySelect(null)}
                >
                    All
                </button>
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`tag-chip ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => onCategorySelect(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
};
