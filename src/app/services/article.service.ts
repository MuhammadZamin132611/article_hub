import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addNewArticle(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.url + "/article/addNewArticle", data, { headers });
  }

  updateArticle(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.url + "/article/updateArticle", data, { headers });
  }

  getAllArticle() {
    return this.http.get(this.url + "/article/getAllArticle");
  }

  getAllPublishedArticle() {
    return this.http.get(this.url + "/article/getAllPublishedArticle");
  }

  deleteArticle(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const api = `${this.url}/article/deleteArticle/${id}`
    return this.http.get(api, { headers });
  }
}
