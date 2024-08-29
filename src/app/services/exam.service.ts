import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exam } from '../models/exam';
import { environment } from '../../environments/environment.development';
import { ExamForCreate } from '../models/exam-for-create';
import { Observable } from 'rxjs';
import { ExamForUpdate } from '../models/exam-for-update';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  constructor(private httpClient: HttpClient) { }
  getExams(): Observable<Exam[]> {
    return this.httpClient.get<Exam[]>(`${environment.apiUrl}${environment.methods.EXAMS}`)
  }
  getExamsFroCategory(categoryId: string) : Observable<Exam[]> {
    return this.httpClient.get<Exam[]>(`${environment.apiUrl}${environment.methods.CATEGORIES}/${categoryId}/${environment.methods.EXAMS}`);
  }
  getExamById(categoryId: string, id: string) : Observable<Exam>{
    return this.httpClient.get<Exam>(`${environment.apiUrl}${environment.methods.CATEGORIES}/${categoryId}/${environment.methods.EXAMS}/${id}`);
  }
  getExamByIdWithQuestions(id: string) : Observable<Exam> {
    return this.httpClient.get<Exam>(`${environment.apiUrl}exam/${id}/questions/`);
  }

  addExam(categoryId: string, newExamObj: ExamForCreate) : Observable<Exam> {
    return this.httpClient.post<Exam>(`${environment.apiUrl}${environment.methods.CATEGORIES}/${categoryId}/${environment.methods.EXAMS}`, newExamObj);
  }
  updateExam(categoryId: string, id: string, examObj: ExamForUpdate) {
    return this.httpClient.put(`${environment.apiUrl}${environment.methods.CATEGORIES}/${categoryId}/${environment.methods.EXAMS}/${id}`, examObj);
  }
  deleteExam(categoryId: string, id: string) {
    return this.httpClient.delete(`${environment.apiUrl}${environment.methods.CATEGORIES}/${categoryId}/${environment.methods.EXAMS}/${id}`);
  }
}


