import { serve } from "https://deno.land/std@0.201.0/http/server.ts";

serve((_req) => new Response("Hello from Deno Deploy!"));
