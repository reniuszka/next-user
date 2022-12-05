export async function getPeople() {
  const response = await fetch("https://swapi.py4e.com/api/people/");
  if (!response.ok) {
    throw { message: "Failed to fetch peple count number", status: 500 };
  }
  return response.json();
}
