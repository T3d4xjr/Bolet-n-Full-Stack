import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uqkibetxkyuvatwtliiw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2liZXR4a3l1dmF0d3RsaWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjI0MTUsImV4cCI6MjA1MjMzODQxNX0.yDbwxZeM40joOCmpSpT00SJzv0kMbhZhKRUqYakS4W0";
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req) {
    const { titulo, descripcion, fecha, ubicacion } = await req.json();
  
    if (!titulo || !descripcion || !fecha || !ubicacion) {
      return new Response(JSON.stringify({ error: "Todos los campos son obligatorios" }), { status: 400 });
    }
  
    try {
      const { data, error } = await supabase.from("eventos").insert([
        { titulo, descripcion, fecha, ubicacion },
      ]);
  
      if (error) {
        throw new Error(error.message);
      }
  
      return new Response(JSON.stringify({ message: "Evento añadido correctamente", data }), { status: 201 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
  