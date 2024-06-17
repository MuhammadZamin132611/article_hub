import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {
  url = environment.apiUrl

  constructor(private http: HttpClient) { }

  login = (data: any) => {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.url + "/appuser/login", data, { headers });
  }

  addNewUser = (data: any) => {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.url + "/appuser/addNewAppuser", data, { headers });
  }

  getAllAppuser() {
    return this.http.get(this.url + "/appuser/getAllAppuser");
  }

  updateUser = (data: any) => {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.url + "/appuser/updateUser", data, { headers });
  }

  updateUserStatus = (data: any) => {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.url + "/appuser/updateUserStatus", data, { headers });
  }


}
