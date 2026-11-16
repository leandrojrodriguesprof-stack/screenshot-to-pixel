import { createContext, useContext, useState, type ReactNode } from "react";
import type { ResumeResult } from "@/lib/resume";
type State = { resume: string; job: string; result: ResumeResult | null; setResume: (value: string) => void; setJob: (value: string) => void; setResult: (value: ResumeResult | null) => void };
const ResumeContext = createContext<State | null>(null);
export function ResumeProvider({children}: {children: ReactNode}) {
 const [resume,setResume]=useState(""); const [job,setJob]=useState(""); const [result,setResult]=useState<ResumeResult|null>(null);
 return <ResumeContext.Provider value={{resume,job,result,setResume,setJob,setResult}}>{children}</ResumeContext.Provider>;
}
export function useResume() { const value=useContext(ResumeContext); if(!value) throw new Error("ResumeProvider is required"); return value; }