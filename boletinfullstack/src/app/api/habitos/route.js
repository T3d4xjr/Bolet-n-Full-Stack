import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uqkibetxkyuvatwtliiw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2liZXR4a3l1dmF0d3RsaWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjI0MTUsImV4cCI6MjA1MjMzODQxNX0.yDbwxZeM40joOCmpSpT00SJzv0kMbhZhKRUqYakS4W0";
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  const { data, error } = await supabase.from("habitos").select("*");

  if (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }

  return new Response(JSON.stringify(data), { status: 200 });
}

export async function PUT(req) {
  const { id } = await req.json();

  const { data, error } = await supabase
    .from("habitos")
    .update({ completado: true })
    .eq("id", id);

  if (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({ message: "Hábito marcado como completado", data }),
    { status: 200 }
  );
}

export async function DELETE(req) {
  const { data, error } = await supabase
    .from("habitos")
    .delete()
    .eq("completado", true);

  if (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({ message: "Hábitos completados eliminados correctamente", data }),
    { status: 200 }
  );
}
