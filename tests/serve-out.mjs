// Zero-dependency static server for the exported `out/` directory.
// Mirrors GitHub Pages behaviour closely enough for e2e (trailingSlash -> index.html).
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const port = Number(process.argv[2] ?? 4321);
const root = fileURLToPath(new URL("../out", import.meta.url));

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".woff2": "font/woff2",
};

async function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]);
  let p = normalize(join(root, clean));
  if (!p.startsWith(root)) return null; // path traversal guard
  try {
    const s = await stat(p);
    if (s.isDirectory()) p = join(p, "index.html");
  } catch {
    if (!extname(p)) {
      const withHtml = `${p}.html`;
      try {
        await stat(withHtml);
        return withHtml;
      } catch {
        /* fall through */
      }
    }
    return null;
  }
  return p;
}

const server = createServer(async (req, res) => {
  const file = await resolveFile(req.url ?? "/");
  if (!file) {
    try {
      const body = await readFile(join(root, "404.html"));
      res.writeHead(404, { "content-type": TYPES[".html"] });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
    return;
  }
  try {
    const body = await readFile(file);
    res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(500);
    res.end("Server error");
  }
});

server.listen(port, () => {
  console.log(`Static server: http://localhost:${port} -> ${root}`);
});
