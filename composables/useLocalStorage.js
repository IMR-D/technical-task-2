export function useLocalStorage() {
  function getData(key) {
    try {
      const storedData = localStorage.getItem(key);
      return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
      console.error("Error getting data from localStorage:", error);
      return null;
    }
  }

  function setData(value, key) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting data to localStorage:", error);
    }
  }

  function clearData(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error clearing data from localStorage:", error);
    }
  }

  return {
    getData,
    setData,
    clearData,
  };
}
