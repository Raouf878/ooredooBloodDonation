import { useState, useEffect } from 'react';

export default function useSplitId(id) {
  const [firstPart, setFirstPart] = useState('');
  const [secondPart, setSecondPart] = useState('');

  useEffect(() => {
    const parts = id.split('/'); // Split the ID string by '/'
    if (parts.length === 2) { // Ensure there are two parts
      setFirstPart(parts[0]); // Set the first part
      setSecondPart(parts[1]); // Set the second part
    } else {
      // Handle error or unexpected format
      console.error('Invalid ID format:', id);
    }
  }, [id]); // Trigger the effect when the ID changes

  return [firstPart, secondPart];
}

// Example usage:
// const [firstPart, secondPart] = useSplitId("L4RelTlyCpOY9TuUgjap/3");
