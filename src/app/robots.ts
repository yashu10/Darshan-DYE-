import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

export const dynamic = "force-static";

/**
 * Search and AI-assistant crawlers that are explicitly welcome. They are already allowed by the
 * wildcard rule; naming them documents the intent and keeps them allowed if the wildcard ever changes.
 */
const WELCOME_CRAWLERS = [
  "Googlebot",
  "Google-Extended",
  "Bingbot",
  "Applebot",
  "Applebot-Extended",
  "DuckAssistBot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Amazonbot",
  "Meta-ExternalAgent",
  "CCBot",
  "cohere-ai"
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: WELCOME_CRAWLERS, allow: "/" }
    ],
    sitemap: `${SITE.url}/sitemap.xml`
  };
}
