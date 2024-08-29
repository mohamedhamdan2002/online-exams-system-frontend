export interface Exam {
  id: string,
  title: string,
  duration: string,
  date: Date,
  totalMarks: number,
  term: number,
  level: number,
  categoryId: string,
  questions: any[]
}
