import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uqkibetxkyuvatwtliiw.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2liZXR4a3l1dmF0d3RsaWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjI0MTUsImV4cCI6MjA1MjMzODQxNX0.yDbwxZeM40joOCmpSpT00SJzv0kMbhZhKRUqYakS4W0"
export const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request){

    const {searchParams}=new URL(request.url)

    const id =searchParams.get("id")
    
     const { data, error } = await supabase.from("articulos").select("*").eq("id",id).single()

     return new Response(JSON.stringify(data),{status:200})
}