/**
 * Server-only Gemini client. Pulls the API key + model names from SiteSettings
 * (admin-managed) so we don't have to redeploy to rotate keys or swap models.
 *
 * Usage:
 *   import { generateText, generateImage } from "@/lib/gemini";
 *   const text = await generateText("Write a 3-line bio for...");
 *
 * NEVER import this from a client component. The api key must stay server-side.
 */
// Note: this file uses Mongo + secrets, so it must only be imported from
// server contexts (route handlers, server actions, server components, CLI
// scripts). We can't use `import "server-only"` here because the same code
// is used by tsx-driven CLI seed scripts which Node treats as a client bundle.
import { GoogleGenAI, Type, type Schema } from "@google/genai";
import { getAllSettings } from "./settings";

export { Type };
export type { Schema };

let cachedClient: { key: string; client: GoogleGenAI } | null = null;

async function getClient() {
  const settings = await getAllSettings();
  const apiKey = settings["integrations.gemini_api_key"];
  if (!apiKey) {
    throw new Error(
      "Gemini API key is not configured. Set it in /sb-console/settings → Integrations.",
    );
  }
  if (cachedClient && cachedClient.key === apiKey) return cachedClient.client;
  const client = new GoogleGenAI({ apiKey });
  cachedClient = { key: apiKey, client };
  return client;
}

async function getModels() {
  const settings = await getAllSettings();
  return {
    text:
      settings["integrations.gemini_text_model"] ||
      "gemini-2.5-flash",
    image:
      settings["integrations.gemini_image_model"] ||
      "gemini-2.5-flash-image",
  };
}

/**
 * Quick "is the key set?" check for the admin UI without making a real API call.
 */
export async function geminiConfigured(): Promise<boolean> {
  const settings = await getAllSettings();
  return !!settings["integrations.gemini_api_key"];
}

export type GenerateTextOptions = {
  /** Override the saved text model for this call. */
  model?: string;
  /** Optional system instruction (Gemini calls this "systemInstruction"). */
  system?: string;
  /** 0..2, default 1. Lower = more deterministic. */
  temperature?: number;
  /** Hard token cap on the response. */
  maxOutputTokens?: number;
  /**
   * When true, ask Gemini for `application/json` output. Use this whenever the
   * caller needs strict JSON — Gemini will then emit a valid JSON document
   * instead of a markdown-wrapped response with embedded raw newlines.
   */
  json?: boolean;
  /**
   * Optional JSON Schema (the SDK's `Schema` type). If provided, Gemini's
   * structured output mode is enabled and string content is properly escaped
   * — far more reliable than free-form JSON output for multi-line values.
   */
  schema?: Schema;
};

/**
 * One-shot text generation. Returns the full response as a string.
 */
export async function generateText(
  prompt: string,
  options: GenerateTextOptions = {},
): Promise<string> {
  const client = await getClient();
  const { text } = await getModels();
  const wantsJson = options.json || !!options.schema;
  const result = await client.models.generateContent({
    model: options.model ?? text,
    contents: prompt,
    config: {
      systemInstruction: options.system,
      temperature: options.temperature,
      maxOutputTokens: options.maxOutputTokens,
      ...(wantsJson ? { responseMimeType: "application/json" } : {}),
      ...(options.schema ? { responseSchema: options.schema } : {}),
    },
  });
  // The SDK exposes .text as a getter that concatenates text parts.
  return (result.text ?? "").trim();
}

export type GeneratedImage = {
  /** Raw base64 (no data: prefix). */
  base64: string;
  /** MIME type, e.g. "image/png". */
  mimeType: string;
  /** Convenience: ready-to-use data URL. */
  dataUrl: string;
};

/**
 * Generate an image. Returns the first image in the response, base64-encoded
 * so callers can stream it to the browser, save to disk, or upload to a CDN.
 */
export async function generateImage(
  prompt: string,
  options: { model?: string } = {},
): Promise<GeneratedImage> {
  const client = await getClient();
  const { image } = await getModels();
  const result = await client.models.generateContent({
    model: options.model ?? image,
    contents: prompt,
  });

  // Walk the response parts to find the first inlineData (image) part.
  const candidate = result.candidates?.[0];
  const parts = candidate?.content?.parts ?? [];
  for (const part of parts) {
    const data = (part as { inlineData?: { data?: string; mimeType?: string } })
      .inlineData;
    if (data?.data && data.mimeType) {
      return {
        base64: data.data,
        mimeType: data.mimeType,
        dataUrl: `data:${data.mimeType};base64,${data.data}`,
      };
    }
  }
  throw new Error(
    "Gemini did not return an image. The prompt may have been refused.",
  );
}
