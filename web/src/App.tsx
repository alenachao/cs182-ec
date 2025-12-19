import { useState, useEffect, useMemo } from 'react';
import type { Interaction } from './types/edapi';
import { Card } from './components/Card';
import { Modal } from './components/Modal';
import { FilterBar } from './components/FilterBar';
import { getTagsFromInteraction } from './utils/tagging';
import './App.css';

function App() {
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedInteraction, setSelectedInteraction] = useState<Interaction | null>(null);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setInteractions(data))
      .catch(err => console.error("Failed to load data:", err));
  }, []);

  // Compute tags for each interaction efficiently
  const interactionTags = useMemo(() => {
    const map = new Map<number, string[]>();
    interactions.forEach(i => {
      map.set(i.id, getTagsFromInteraction(i));
    });
    return map;
  }, [interactions]);

  // Compute unique tags for filter bar
  const categories = useMemo(() => {
    const allTags = new Set<string>();
    interactionTags.forEach(tags => tags.forEach(t => allTags.add(t)));
    return Array.from(allTags).sort();
  }, [interactionTags]);

  // Filter Logic
  const filtered = interactions.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.document.toLowerCase().includes(searchTerm.toLowerCase());

    // Check if interaction has the selected tag
    const itemTags = interactionTags.get(item.id) || [];
    const matchesCategory = selectedCategory ? itemTags.includes(selectedCategory) : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app-container">
      <header className="site-header">
        <h1>Special Participation D, <span className="text-gradient">Red Team</span></h1>
        <p className="subtitle">student extensions and improvements to CS182 homework assignments</p>
      </header>

      <main>
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        <div className="cards-grid">
          {filtered.map(interaction => (
            <Card
              key={interaction.id}
              interaction={interaction}
              tags={interactionTags.get(interaction.id) || []}
              onClick={setSelectedInteraction}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty-state">
            <p>No interactions found matching your criteria.</p>
          </div>
        )}
      </main>

      {selectedInteraction && (
        <Modal
          interaction={selectedInteraction}
          onClose={() => setSelectedInteraction(null)}
        />
      )}
    </div>
  );
}

export default App;
