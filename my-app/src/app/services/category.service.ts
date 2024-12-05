import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    
  private apiUrl = 'http://localhost:4000/api/categories';

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get(this.apiUrl);
  }

  getCategory(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createCategory(category: any) {
    return this.http.post(this.apiUrl, category);
  }

  updateCategory(id: string, category: any) {
    return this.http.put(`${this.apiUrl}/${id}`, category);
  }

  deleteCategory(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
