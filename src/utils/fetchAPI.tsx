const fetchEntityDetails = async (movieURL: string, options: object) => {
  try {
    const res = await fetch(movieURL, options);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const json = await res.json();
    return json;
  } catch (err) {
    console.error("Error fetching movie details:", err);
    throw err;
  }
};

const fetchEntityCredits = async (movieURL: string, options: object) => {
  try {
    const res = await fetch(movieURL, options);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const json = await res.json();
    return json;
  } catch (err) {
    console.error("Error fetching movie details:", err);
    throw err;
  }
};

export { fetchEntityDetails };
