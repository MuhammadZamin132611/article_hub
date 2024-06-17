import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addNewCategory(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.url + "/category/addNewCategory", data, { headers });
  }

  updateCategory(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.url + "/category/updateCategory", data, { headers });
  }

  getAllCategory(){
    return this.http.get(this.url+"/category/getAllCategory");
  }

  deleteCategory(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const api = `${this.url}/category/deleteCategory/${data}`;
    return this.http.delete(api, { headers });
  }
}
