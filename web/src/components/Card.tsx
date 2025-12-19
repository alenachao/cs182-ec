import React from 'react';
import type { Interaction } from '../types/edapi';
import './Card.css';
import { MessageSquare, Eye } from 'lucide-react';

interface CardProps {
    interaction: Interaction;
    tags: string[];
    onClick: (interaction: Interaction) => void;
}

export const Card: React.FC<CardProps> = ({ interaction, tags, onClick }) => {
    const previewText = interaction.document.slice(0, 150) + (interaction.document.length > 150 ? '...' : '');

    return (
        <div className="card" onClick={() => onClick(interaction)}>
            <div className="card-bg-gradient" />

            <div className="card-header">
                <div className="card-tags-list">
                    {tags.slice(0, 3).map(tag => (
                        <span key={tag} className="card-tag">{tag}</span>
                    ))}
                    {tags.length === 0 && <span className="card-tag">Uncategorized</span>}
                </div>
                <div className="card-stats">
                    <span className="stat-item"><Eye size={12} className="icon" /> {interaction.view_count}</span>
                </div>
            </div>

            <h3 className="card-title">
                {interaction.title}
            </h3>

            <p className="card-preview">
                {previewText}
            </p>

            <div className="card-footer">
                <span className="read-more">
                    Read Discussion <MessageSquare size={14} className="icon-lift" />
                </span>
                <span className="card-number">#{interaction.number}</span>
            </div>
        </div>
    );
};
