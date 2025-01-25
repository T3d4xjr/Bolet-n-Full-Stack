import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uqkibetxkyuvatwtliiw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2liZXR4a3l1dmF0d3RsaWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjI0MTUsImV4cCI6MjA1MjMzODQxNX0.yDbwxZeM40joOCmpSpT00SJzv0kMbhZhKRUqYakS4W0";
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("eventos")
      .select("*")
      .order("fecha", { ascending: true })
      .gt("fecha", new Date().toISOString());

    if (error) {
      throw new Error(error.message);
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function DELETE() {
  try {
    const { error } = await supabase
      .from("eventos")
      .delete()
      .lt("fecha", new Date().toISOString()); 

    if (error) {
      throw new Error(error.message);
    }

    return new Response(
      JSON.stringify({ message: "Eventos pasados eliminados correctamente." }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
