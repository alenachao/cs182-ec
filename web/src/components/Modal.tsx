import React, { useEffect } from 'react';
import type { Interaction } from '../types/edapi';
import './Modal.css';
import { X, Calendar, Flag, Star } from 'lucide-react';

interface ModalProps {
    interaction: Interaction;
    onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ interaction, onClose }) => {
    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="modal-header">
                    <div className="modal-meta">
                        <span className="modal-category">{interaction.category}</span>
                        {interaction.subcategory && <span className="modal-subcategory">/ {interaction.subcategory}</span>}
                    </div>

                    <h2 className="modal-title">{interaction.title}</h2>

                    <div className="modal-stats-row">
                        <span className="stat-badge"><Calendar size={14} /> #{interaction.number}</span>
                        <span className="stat-badge"><Flag size={14} /> {interaction.flag_count} Flags</span>
                        <span className="stat-badge"><Star size={14} /> {interaction.star_count} Stars</span>
                    </div>
                </div>

                <div className="modal-body">
                    {/* Using dangerouslySetInnerHTML if content is HTML, otherwise just text.
                The JSON shows `content` as XML/HTML-like string. 
                For safety/simplicity in this demo, strict rendering validation is skipped, 
                but we'll assume it's relatively safe or sanitize if this was prod. 
                Actually, looking at the JSON `content` field, it's XML-like <document>.
                The `document` field is plain text. Let's use `document` for simple display 
                OR `content` if we parsed it. 
                Using `document` (plain text) is safer and easier for now as the XML parsing might be complex.
                However, for a "web app" user might expect rich text. 
                Let's stick to `document` (plain text) with whitespace preservation for now. 
            */}
                    <div className="modal-text">
                        {interaction.document}
                    </div>

                </div>
            </div>
        </div>
    );
};
