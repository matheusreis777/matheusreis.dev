import type { VercelRequest, VercelResponse } from "@vercel/node";

// Vercel KV — variáveis de ambiente injetadas automaticamente ao conectar KV no dashboard
// KV_REST_API_URL e KV_REST_API_TOKEN devem estar configuradas no projeto Vercel

const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

async function kvGet(key: string): Promise<string | null> {
  if (!KV_URL || !KV_TOKEN) return null;
  const res = await fetch(`${KV_URL}/get/${key}`, {
    headers: { Authorization: `Bearer ${KV_TOKEN}` },
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.result ?? null;
}

async function kvSet(key: string, value: string, exSeconds: number): Promise<void> {
  if (!KV_URL || !KV_TOKEN) return;
  await fetch(`${KV_URL}/set/${key}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value, ex: exSeconds }),
  });
}

function formatVerse(text: string): string {
  let result = text.trim();
  // Primeira letra maiúscula
  result = result.charAt(0).toUpperCase() + result.slice(1);
  // SENHOR em maiúsculas
  result = result.replace(/\bsenhor\b/gi, "SENHOR");
  // Pronomes divinos
  const pronouns = ["ele", "eu", "tu", "teu", "tua", "teus", "tuas", "dele", "nele", "lhe"];
  for (const word of pronouns) {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    result = result.replace(
      regex,
      (match) => match.charAt(0).toUpperCase() + match.slice(1).toLowerCase()
    );
  }
  return result;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const cacheKey = `daily-verse:${today}`;

  try {
    // 1. Tenta ler do KV (cache do dia)
    const cached = await kvGet(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      return res.status(200).json({ ...parsed, source: "cache" });
    }

    // 2. Busca nova da Bible API
    const apiRes = await fetch(
      "https://bible-api.com/?random=verse&translation=almeida"
    );
    if (!apiRes.ok) throw new Error("Bible API error");

    const data = await apiRes.json();
    const verse = {
      text: formatVerse(data.text),
      reference: data.reference,
      date: today,
    };

    // 3. Salva no KV por 48h (garante disponibilidade mesmo próximo da meia-noite)
    await kvSet(cacheKey, JSON.stringify(verse), 60 * 60 * 48);

    return res.status(200).json({ ...verse, source: "api" });
  } catch (err) {
    console.error("daily-verse error:", err);
    return res.status(500).json({ error: "Não foi possível buscar o versículo." });
  }
}
