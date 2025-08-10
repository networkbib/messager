import { serve } from "https://deno.land/std@0.201.0/http/server.ts";

interface UserRecord {
  userId: string;
  identityPublicKey: string;
  createdAt: string;
}

const users = new Map<string, UserRecord>();

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);

  if (req.method === "POST" && url.pathname === "/register") {
    try {
      const data = await req.json();

      const { userId, identityPublicKey } = data;

      if (
        typeof userId !== "string" ||
        typeof identityPublicKey !== "string" ||
        !userId ||
        !identityPublicKey
      ) {
        return new Response(JSON.stringify({ error: "Invalid input" }), {
          status: 400,
          headers: { "content-type": "application/json" },
        });
      }

      if (users.has(userId)) {
        return new Response(JSON.stringify({ error: "User already registered" }), {
          status: 409,
          headers: { "content-type": "application/json" },
        });
      }

      const userRecord: UserRecord = {
        userId,
        identityPublicKey,
        createdAt: new Date().toISOString(),
      };

      users.set(userId, userRecord);

      return new Response(JSON.stringify({ status: "ok", user: userRecord }), {
        status: 201,
        headers: { "content-type": "application/json" },
      });
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }
  }

  return new Response("Not Found", { status: 404 });
}

serve(handler);
