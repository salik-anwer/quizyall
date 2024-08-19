export async function fetchCategories() {
    const res = await fetch('https://opentdb.com/api_category.php');
    const data = await res.json();
    const formattedCategories = data.trivia_categories.map((cat: {id: number, name: string}) => ({
      id: cat.id,
      name: cat.name
    }));
    return formattedCategories;
}