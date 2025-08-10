export async function fetch(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url);

  if (pathname.startsWith("/html")) {
    const html = `<html>
      <p><b>Message:</b> Hello from Deno Deploy.</p>
      </html>`;

    return new Response(html, {
      headers: { "content-type": "text/html; charset=UTF-8" },
    });
  }

  if (pathname.startsWith("/json")) {
    const json = JSON.stringify({ message: "Hello from Deno Deploy" });

    return new Response(json, {
      headers: { "content-type": "application/json; charset=UTF-8" },
    });
  }

  return new Response(
    `<body
      align="center"
      style="font-family: Avenir, Helvetica, Arial, sans-serif; font-size: 1.5rem;"
    >
      <h1>Return JSON and/or HTML Examples</h1>
      <p><a href="/html">/html</a> - responds with HTML to the request.</p>
      <p><a href="/json">/json</a> - responds with JSON to the request.</p>
    </body>`,
    {
      headers: { "content-type": "text/html; charset=UTF-8" },
    },
  );
}
