import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Observable } from "rxjs";
// import { multipleChoiceQuestion } from "../models/multipleChoiceQuestion";
// import { trueAndFalseQuestion } from "../models/trueAndFalseQuestion";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private httpClient: HttpClient) {
  }
  // getMultipleChoiceQuestions(): Observable<multipleChoiceQuestion[]> {
  //   return this.httpClient.get<multipleChoiceQuestion[]>(`${environment.apiUrl}${environment.methods.MULTIPLE_CHOICE_QUESTIONS}`);
  // }
  // getTrueAndFalseQuestions(): Observable<trueAndFalseQuestion[]> {
  //   return this.httpClient.get<trueAndFalseQuestion[]>(`${environment.apiUrl}${environment.methods.TRUE_AND_FALSE_QUESTIONS}`);
  // }

  getQuestions<T>(endPointUrl: string) : Observable<T[]> {
    return this.httpClient.get<T[]>(`${environment.apiUrl}${endPointUrl}`);
  }
  getQuestionById<T>(id: string, endPointUrl: string): Observable<T> {
    return this.httpClient.get<T>(`${environment.apiUrl}${endPointUrl}/${id}`);
  }
  createQuestion<T, TResult>(newQuestion: T, endPointUrl: string) : Observable<TResult> {
    return this.httpClient.post<TResult>(`${environment.apiUrl}${endPointUrl}`, newQuestion);
  }
  updateQuestion<T>(id: string, questionForUpdate: T, endPointUrl: string) {
    return this.httpClient.put(`${environment.apiUrl}${endPointUrl}/${id}`, questionForUpdate);
  }
  deleteQuestion(id: string, endPointUrl: string) {
    return this.httpClient.delete(`${environment.apiUrl}${endPointUrl}/${id}`);
  }

  getQuestionsTypes() {
    return ['multipleChoiceQuestion', 'trueAndFalseQuestion'];
  }
}
