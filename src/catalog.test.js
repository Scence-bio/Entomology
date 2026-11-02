import { describe, expect, it } from "vitest";
import { CHAPTERS, LEARNING_PATH, neighbors, searchChapters, chapterById, VERSION } from "./catalog";
import { QUIZ } from "./quiz/questions";

describe("catalog", () => {
  it("ships fourteen teaching chapters at v0.2.0", () => {
    expect(VERSION).toBe("0.2.0");
    expect(CHAPTERS).toHaveLength(14);
    expect(chapterById("ch13")?.latin).toBe("Neuroptera");
    expect(chapterById("ch14")?.title.en).toMatch(/key/i);
  });

  it("learning path covers every chapter once", () => {
    const ids = LEARNING_PATH.flatMap((step) => step.chapters);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.sort()).toEqual(CHAPTERS.map((c) => c.id).sort());
  });

  it("neighbors wrap the atlas ends", () => {
    expect(neighbors("ch1").prev).toBeNull();
    expect(neighbors("ch1").next.id).toBe("ch2");
    expect(neighbors("ch14").next).toBeNull();
    expect(neighbors("ch14").prev.id).toBe("ch13");
  });

  it("search finds latin and Kurdish titles", () => {
    expect(searchChapters("Neuroptera")[0].id).toBe("ch13");
    expect(searchChapters("تۆڕباڵ").some((c) => c.id === "ch13")).toBe(true);
    expect(searchChapters("zzzz-missing")).toHaveLength(0);
  });
});

describe("quiz bank", () => {
  it("includes Neuroptera and key questions", () => {
    expect(QUIZ.some((q) => q.chapter === "ch13")).toBe(true);
    expect(QUIZ.some((q) => q.chapter === "ch14")).toBe(true);
    for (const q of QUIZ) {
      expect(q.opts.ku.length).toBeGreaterThanOrEqual(2);
      expect(q.correct).toBeGreaterThanOrEqual(0);
      expect(q.correct).toBeLessThan(q.opts.ku.length);
    }
  });
});
