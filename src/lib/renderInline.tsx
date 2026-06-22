import React from 'react';

/**
 * Parses inline **bold** markdown markers in a string and returns React nodes
 * with <strong> wrapping the bold segments.
 */
export function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  if (parts.length === 1) return text;
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return part || null;
      })}
    </>
  );
}
