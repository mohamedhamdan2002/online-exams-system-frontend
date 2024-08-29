import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Category, Result } from '../models/category';
import { environment } from '../../environments/environment.development';
import { CategoryCreateOrUpdate } from '../models/CategoryCreateOrUpdate';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private httpClient: HttpClient) { }

  getCategories() : Observable<Result> {
    return this.httpClient.get<Result>(`${environment.apiUrl}${environment.methods.CATEGORIES}`);
  }
  getCategoryById(id: string) : Observable<Result>{
    return this.httpClient.get<Result>(`${environment.apiUrl}${environment.methods.CATEGORIES}/${id}`);
  }

  addCategory(newCategoryObj: CategoryCreateOrUpdate) : Observable<Category> {
    return this.httpClient.post<Category>(`${environment.apiUrl}${environment.methods.CATEGORIES}`, newCategoryObj);
  }
  updateCategory(id: string, categoryObj: CategoryCreateOrUpdate) {
    return this.httpClient.put(`${environment.apiUrl}${environment.methods.CATEGORIES}/${id}`, categoryObj);
  }
  deleteCategory(id: string) {
    return this.httpClient.delete(`${environment.apiUrl}${environment.methods.CATEGORIES}/${id}`);
  }
}

