import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uqkibetxkyuvatwtliiw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2liZXR4a3l1dmF0d3RsaWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjI0MTUsImV4cCI6MjA1MjMzODQxNX0.yDbwxZeM40joOCmpSpT00SJzv0kMbhZhKRUqYakS4W0";
export const supabase = createClient(supabaseUrl, supabaseKey);
export async function POST(req) {
    const { titulo, contenido, autor } = await req.json();
  
    // Validar campos
    if (!titulo || !contenido || !autor || titulo.length > 150) {
      return new Response(
        JSON.stringify({ error: "Todos los campos son obligatorios y el título no puede superar los 150 caracteres." }),
        { status: 400 }
      );
    }
  
    const { data, error } = await supabase
      .from("articulos")
      .insert([
        {
          titulo,
          contenido,
          autor,
          fecha_publicacion: new Date(),
        },
      ]);
  
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  
    return new Response(
      JSON.stringify({ message: "Artículo añadido correctamente", data }),
      { status: 200 }
    );
  }