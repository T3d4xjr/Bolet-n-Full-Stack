import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uqkibetxkyuvatwtliiw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2liZXR4a3l1dmF0d3RsaWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjI0MTUsImV4cCI6MjA1MjMzODQxNX0.yDbwxZeM40joOCmpSpT00SJzv0kMbhZhKRUqYakS4W0";
export const supabase = createClient(supabaseUrl, supabaseKey);



export async function POST(req) {
  const { nombre, descripcion, fecha } = await req.json();

  // Validación
  if (!nombre || !fecha || new Date(fecha) < new Date().setHours(0, 0, 0, 0)) {
    return new Response(
      JSON.stringify({ error: "El nombre es obligatorio y la fecha debe ser válida y no estar en el pasado." }),
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("habitos")
    .insert({ nombre, descripcion, fecha, completado: false });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(
    JSON.stringify({ message: "Hábito añadido correctamente", data }),
    { status: 201 }
  );
}

