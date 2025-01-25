import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uqkibetxkyuvatwtliiw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2liZXR4a3l1dmF0d3RsaWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjI0MTUsImV4cCI6MjA1MjMzODQxNX0.yDbwxZeM40joOCmpSpT00SJzv0kMbhZhKRUqYakS4W0";
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req) {
  const { titulo, autor, leido } = await req.json();

  // Validación simple
  if (!titulo || !autor) {
    return new Response(JSON.stringify({ error: "El título y el autor son obligatorios." }), {
      status: 400,
    });
  }

  const { data, error } = await supabase
    .from("libros")
    .insert({ titulo, autor, leido });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(
    JSON.stringify({ message: "Libro añadido correctamente", data }),
    { status: 201 }
  );
}
