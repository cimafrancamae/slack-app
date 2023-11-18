import { useState, useEffect } from 'react';

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [load, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
      try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); //figure out why infinite loop [url, options]

  return { data, error, load };
};

export default useFetch;
