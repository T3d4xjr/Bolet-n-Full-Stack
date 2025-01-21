import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uqkibetxkyuvatwtliiw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2liZXR4a3l1dmF0d3RsaWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjI0MTUsImV4cCI6MjA1MjMzODQxNX0.yDbwxZeM40joOCmpSpT00SJzv0kMbhZhKRUqYakS4W0";
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  const { data, error } = await supabase.from("productos").select("*");

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(req) {
  const { nombre,descripcion, precio, stock } = await req.json();

  if (!nombre || !precio || precio <= 0 || stock < 0) {
    return new Response(JSON.stringify({
      error:
        "Nombre y precio son obligatorios. Stock y precio deben ser válidos.",
    }));
  }

  const { data, error } = await supabase
    .from("productos")
    .insert([{ nombre,descripcion, precio, stock }]);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
export async function PUT(req) {
    const body =await req.json();
    const { id, stock } = body
  
    if (!id || stock < 0) {
      return new Response(JSON.stringify({
        error: "ID del producto y stock válido son obligatorios.",
      }),{ status: 400 }
    );
    }
  
    const { data, error } = await supabase
      .from("productos")
      .update({ stock })
      .eq("id", id);
  
      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
        });
      }
    
      return new Response(JSON.stringify(data), { status: 200 });
  }
  