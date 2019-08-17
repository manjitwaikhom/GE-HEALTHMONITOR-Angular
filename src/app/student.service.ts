import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class StudentService {
  private baseUrl = "http://localhost:8080/api/";

  constructor(private http: HttpClient) {}

  getStudentList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + "patients-list");
  }

  createStudent(patient: object): Observable<object> {
    return this.http.post(`${this.baseUrl}` + "save-patient", patient);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-patient/${id}`, {
      responseType: "text"
    });
  }

  getStudent(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/patient/${id}`);
  }

  updateStudent(id: number, value: any): Observable<Object> {
    return this.http.post(`${this.baseUrl}/update-patient/${id}`, value);
  }
}
