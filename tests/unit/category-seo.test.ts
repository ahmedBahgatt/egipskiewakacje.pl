import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";
import { categories } from "@/content/local/categories";
import { faqJsonLd } from "@/lib/seo";

/**
 * Locks the category-hub FAQ depth + per-category OG image work. These pages are
 * code-owned (served from the local file in both content modes), so the data here
 * is the single source of truth for the visible FAQ accordion AND the FAQPage
 * JSON-LD (both built from `category.faqs`). The assertions below guard against
 * regressions: thin FAQ sections, duplicate questions, a category silently
 * reverting to the generic OG image, or an OG path with no backing file.
 */
describe("category hub SEO - FAQ depth + OG images", () => {
  for (const c of categories) {
    describe(c.slug, () => {
      it("has at least 4 category-specific FAQs", () => {
        expect(c.faqs.length).toBeGreaterThanOrEqual(4);
      });

      it("has unique, non-empty questions and answers", () => {
        const questions = c.faqs.map((f) => f.question.trim());
        expect(new Set(questions).size).toBe(questions.length);
        for (const f of c.faqs) {
          expect(f.question.trim().length).toBeGreaterThan(0);
          expect(f.answer.trim().length).toBeGreaterThan(0);
        }
      });

      it("FAQPage JSON-LD mirrors the visible FAQs exactly (schema parity)", () => {
        const ld = faqJsonLd(c.faqs) as {
          mainEntity: { name: string; acceptedAnswer: { text: string } }[];
        };
        expect(ld.mainEntity.length).toBe(c.faqs.length);
        ld.mainEntity.forEach((entry, i) => {
          expect(entry.name).toBe(c.faqs[i].question);
          expect(entry.acceptedAnswer.text).toBe(c.faqs[i].answer);
        });
      });

      it("uses its own category OG image, not the generic default", () => {
        expect(c.seo.ogImage).toBeDefined();
        expect(c.seo.ogImage).not.toContain("og/default");
        expect(c.seo.ogImage).toMatch(/^\/media\/categories\/.+\.jpg$/);
        expect(c.seo.ogImageAlt?.trim().length ?? 0).toBeGreaterThan(0);
        expect(c.seo.ogImageWidth).toBe(1200);
        expect(c.seo.ogImageHeight).toBe(800);
      });

      it("OG image path resolves to a real file under /public", () => {
        expect(existsSync(join(process.cwd(), "public", c.seo.ogImage!))).toBe(true);
      });
    });
  }
});
