export async function getData() {
  try {
    const newsResults = await fetch(
      "https://saurav.tech/NewsAPI/top-headlines/category/business/in.json"
    ).then((res) => res.json());

    const randomUserResults = await fetch(
      "https://randomuser.me/api/?results=30&inc=name,login,picture"
    ).then((res) => res.json());

    return {
      newsResults,
      randomUserResults,
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    throw error;
  }
}
