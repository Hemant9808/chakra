// utils/formatResponse.js
export const formatResponse = (text) => {
    // Split by double asterisks for headers
    const parts = text.split(/\*\*(.*?)\*\*/g);
    
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // This is a header (between **)
        return <strong key={index}>{part}</strong>;
      }
      
      // Regular text - split by bullet points
      const lines = part.split('\n* ').filter(line => line.trim());
      
      return lines.map((line, i) => (
        <div key={`${index}-${i}`} className="mb-1">
          {i > 0 ? '• ' : ''}{line}
        </div>
      ));
    });
  };