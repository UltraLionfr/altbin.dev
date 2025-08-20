export async function fetchPastes() {
  const res = await fetch('/api/paste');
  return await res.json();
}
