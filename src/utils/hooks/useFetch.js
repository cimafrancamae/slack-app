import { useState, useEffect } from 'react';

const useFetch = () => {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [load, setLoading] = useState(true);

  const fetchData = async (url, options = {}) => {
    
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

  useEffect(() => {
    fetchData();
  },[])

  return { data, error, load, fetchData };
};

export default useFetch;
