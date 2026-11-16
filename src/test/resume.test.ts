import { describe, expect, it } from "vitest";
import { analyzeResume, formatResume } from "@/lib/resume";
describe("Resume integrity", () => {
 it("never invents experiences", () => { expect(formatResume("Ana\nAnalista na Acme")).toBe("Ana\nAnalista na Acme"); });
 it("never invents certifications", () => { expect(analyzeResume("Ana\nCertificação ITIL", "AWS ITIL").optimized).toBe("Ana\nCertificação ITIL"); });
 it("never changes dates", () => { expect(formatResume("Acme: 02/2020 - 11/2026")).toBe("Acme: 02/2020 - 11/2026"); });
 it("never creates absent skills", () => { const r=analyzeResume("Ana\nExcel", "Excel Python"); expect(r.optimized).toBe("Ana\nExcel"); expect(r.missing).toContain("python"); });
 it("scores from zero to 100", () => { expect(analyzeResume("Excel", "Excel Python").score).toBe(50); expect(analyzeResume("Excel Python", "Excel Python").score).toBe(100); expect(analyzeResume("Java", "Excel Python").score).toBe(0); });
});