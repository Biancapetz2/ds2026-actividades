interface Usuario {
  id: number;
  name: string;
  email: string;
  celular: string;
}


export async function obtenerUsuarios(): Promise<Usuario[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  const data = await response.json();
  return data as Usuario[];
}