import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uqkibetxkyuvatwtliiw.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2liZXR4a3l1dmF0d3RsaWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjI0MTUsImV4cCI6MjA1MjMzODQxNX0.yDbwxZeM40joOCmpSpT00SJzv0kMbhZhKRUqYakS4W0";
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ error: "No se proporcionó un ID en la solicitud." }), { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from("eventos")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ error: "No se proporcionó un ID en la solicitud." }), { status: 400 });
  }

  try {
    const { data: eventData, error: eventError } = await supabase
      .from("eventos")
      .select("asistentes")
      .eq("id", id)
      .single();

    if (eventError) {
      return new Response(JSON.stringify({ error: eventError.message }), { status: 400 });
    }

    const newAsistentes = eventData.asistentes + 1; 

    const { error: updateError } = await supabase
      .from("eventos")
      .update({ asistentes: newAsistentes })
      .eq("id", id);

    if (updateError) {
      return new Response(JSON.stringify({ error: updateError.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ message: "Asistente registrado correctamente" }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
