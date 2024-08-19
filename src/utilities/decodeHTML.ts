export function decodeHTML(text: string): string {
    const entities: Record<string, string> = {
      '&quot;': '"',
      '&#039;': "'",
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>'
    };
  
    return text.replace(/&quot;|&#039;|&amp;|&lt;|&gt;/g, (match) => {
      return entities[match];
    });
};