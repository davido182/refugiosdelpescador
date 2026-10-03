import { describe, it, expect } from "vitest";
import { translations, BOOKING_URL } from "@/i18n/translations";

describe("translations", () => {
  it("has both es and en languages", () => {
    expect(translations).toHaveProperty("es");
    expect(translations).toHaveProperty("en");
  });

  const langs = ["es", "en"] as const;

  langs.forEach((lang) => {
    describe(`[${lang}]`, () => {
      const t = translations[lang];

      it("has meta title and description", () => {
        expect(t.meta.title).toBeTruthy();
        expect(t.meta.description).toBeTruthy();
      });

      it("has all nav keys", () => {
        expect(t.nav.story).toBeTruthy();
        expect(t.nav.space).toBeTruthy();
        expect(t.nav.experience).toBeTruthy();
        expect(t.nav.location).toBeTruthy();
        expect(t.nav.book).toBeTruthy();
      });

      it("has hero section content", () => {
        expect(t.hero.title).toBeTruthy();
        expect(t.hero.subtitle).toBeTruthy();
        expect(t.hero.location).toBeTruthy();
        expect(t.hero.cta).toBeTruthy();
        expect(t.hero.badges).toHaveLength(3);
      });

      it("has story section with 3-part first paragraph", () => {
        expect(t.story.p1parts).toHaveLength(3);
        expect(t.story.p2).toBeTruthy();
        expect(t.story.p3).toBeTruthy();
      });

      it("has space section with 3 room cards and 8 amenities", () => {
        expect(t.space.cards).toHaveLength(3);
        expect(t.space.amenities).toHaveLength(8);
      });

      it("has 4 guest type items", () => {
        expect(t.guests.items).toHaveLength(4);
        t.guests.items.forEach((item) => {
          expect(item.title).toBeTruthy();
          expect(item.description).toBeTruthy();
        });
      });

      it("has 4 experience items and a quote", () => {
        expect(t.experience.items).toHaveLength(4);
        expect(t.experience.quote).toBeTruthy();
      });

      it("has location with 4 features", () => {
        expect(t.location.features).toHaveLength(4);
        expect(t.location.city).toBeTruthy();
      });

      it("has reservation section with 4 rules", () => {
        expect(t.reservation.rules).toHaveLength(4);
        expect(t.reservation.cta).toBeTruthy();
      });

      it("has footer content", () => {
        expect(t.footer.city).toBeTruthy();
        expect(t.footer.tagline).toBeTruthy();
        expect(t.footer.rights).toBeTruthy();
      });
    });
  });

  it("BOOKING_URL points to booking.com", () => {
    expect(BOOKING_URL).toMatch(/^https:\/\/www\.booking\.com/);
    expect(BOOKING_URL).toContain("refugios-del-pescador");
  });

  it("es and en have the same top-level keys", () => {
    const esKeys = Object.keys(translations.es).sort();
    const enKeys = Object.keys(translations.en).sort();
    expect(esKeys).toEqual(enKeys);
  });
});
