import type { Interaction } from '../types/edapi';

export function getTagsFromInteraction(interaction: Interaction): string[] {
    const text = (interaction.title + " " + interaction.document).toLowerCase();
    const tags = new Set<string>();

    // 1. Detect Homeworks
    // Pattern: "HW 6", "Homework 12", "hw12"
    const hwRegex = /(?:hw|homework)\s?(\d+)/gi;
    let match;
    while ((match = hwRegex.exec(text)) !== null) {
        tags.add(`HW ${match[1]}`);
    }

    // 2. Detect Models & Optimizers
    const keywords = [
        { key: 'gemini', label: 'Gemini' },
        { key: 'gpt', label: 'GPT' },
        { key: 'claude', label: 'Claude' },
        { key: 'llama', label: 'Llama' },
        { key: 'lion', label: 'Lion' },
        { key: 'muon', label: 'Muon' },
        { key: 'adamw', label: 'AdamW' },
        { key: 'soap', label: 'SOAP' },
        { key: 'adafactor', label: 'Adafactor' },
        { key: 'shampoo', label: 'Shampoo' },
        { key: 'transformer', label: 'Transformer' },
        { key: 'rnn', label: 'RNN' },
        { key: 'cnn', label: 'CNN' },
        { key: 'gnn', label: 'GNN' }
    ];

    keywords.forEach(({ key, label }) => {
        if (text.includes(key)) {
            tags.add(label);
        }
    });

    return Array.from(tags).sort();
}
