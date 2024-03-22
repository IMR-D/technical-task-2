export function useLocalStorage() {
  function getData(key) {
    try {
      if (typeof localStorage !== "undefined") {
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : null;
      }
    } catch (error) {
      console.error("Error getting data from localStorage:", error, key);
      return null;
    }
  }

  function setData(value, key) {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error("Error setting data to localStorage:", error, key);
    }
  }

  function clearData(key) {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem(key);
      }
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
