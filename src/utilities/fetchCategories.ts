export async function fetchCategories() {
    const res = await fetch('https://opentdb.com/api_category.php');
    const data = await res.json();
    const formattedCategories: ({id: number, name: string}[]) = data.trivia_categories;
    return formattedCategories;
}