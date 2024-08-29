export interface ExamForCreate {
  title: string | undefined,
  duration: string | undefined,
  date: string | undefined,
  totalMarks: number | undefined,
  term: number | undefined,
  level: number | undefined,
  questions: string[]
}
