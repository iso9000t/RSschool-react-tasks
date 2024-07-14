import { useState } from 'react';

function useLocalStorageSearchTerm(key: string, initialValue: string) {
  const [value, setValue] = useState<string>(() => {
    const savedValue = localStorage.getItem(key);
    return savedValue !== null ? savedValue : initialValue;
  });

  const handleSearchTermChange = (newValue: string) => {
    setValue(newValue);
  };

  const handleSearch = () => {
    if (value.trim() === '') {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }
  };

  return [value, handleSearchTermChange, handleSearch] as const;
}

export default useLocalStorageSearchTerm;
