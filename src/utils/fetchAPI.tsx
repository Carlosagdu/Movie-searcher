const fetchEntityDetails = async (movieURL: string, options: object) => {
  try {
    const res = await fetch(movieURL, options);

    const json: any = await res.json();
    return json;
  } catch (err) {
    console.error("Error fetching movie details:", err);
    throw err;
  }
};

export { fetchEntityDetails };
