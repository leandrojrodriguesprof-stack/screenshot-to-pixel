export const integrityMessage = "Esta ferramenta melhora a apresentação do currículo para ATS, mas nunca cria experiências ou habilidades que não foram informadas pelo usuário.";

const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const stopWords = new Set("a o as os um uma de da do das dos em no na nos nas e ou com para por que se ao aos sua seu suas seus vaga vagas requisitos desejavel obrigatorio experiencia conhecimento conhecimentos habilidade habilidades profissional profissionais buscamos trabalhar trabalho empresa equipe nivel ter ser mais como sobre entre esta este voce nosso nossa necessario responsabilidades atividades".split(" "));
export function analyzeResume(resume: string, job: string) {
  const tokens = normalize(job).match(/[a-z0-9][a-z0-9+#.\/-]*/g) ?? [];
  const keywords = [...new Set(tokens.filter(word => word.length > 2 && !stopWords.has(word) && !/^\d/.test(word)))];
  const resumeTokens = new Set(normalize(resume).match(/[a-z0-9][a-z0-9+#.\/-]*/g) ?? []);
  const found = keywords.filter(word => resumeTokens.has(word));
  const missing = keywords.filter(word => !resumeTokens.has(word));
  const score = keywords.length ? Math.round(found.length / keywords.length * 100) : 0;
  return { score, found, missing, optimized: formatResume(resume) };
}

// Only whitespace and existing list markers change: no inferred content is added.
export function formatResume(resume: string) {
  return resume.split(/\r?\n/).map(line => line.trim().replace(/[\t ]+/g, " ").replace(/^[•●▪]\s*/, "- ")).join("\n").replace(/\n{3,}/g, "\n\n").trim();
}
export type ResumeResult = ReturnType<typeof analyzeResume>;