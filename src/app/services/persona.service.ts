import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: "root",
})
export class PersonaService {


  private Url: string = 'http://localhost:1020/';
  private token: string = "Bearer " + localStorage.getItem("token"); //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiIyQDIuY29tIiwidWlkIjoic00yMV8yMl9JNTUiLCJyb2wiOjEsImlhdCI6MTY1MjcyNzExNSwiZXhwIjoxNjg0Mjg0NzE1fQ.mjpOc7b_BnB6ITkzqO9KigWQM7i6ln5OBXDLkcC5Tys';
  private headers: HttpHeaders = new HttpHeaders({ Authorization: this.token });

  constructor(private http: HttpClient) { }

  getPersonas(): Observable<any> {
    return this.http.get<any>(`${this.Url}personas/All`).pipe(res=>res);
  }
  AddPersona(persona: any): Observable<any>{
    return this.http.post<any>(`${this.Url}personas/saveOrUpdate`,persona).pipe(res=>res);

  }
  DeletePersona(formdata: any): Observable<any> {
    return this.http.post<any>(`${this.Url}personas/Delete`,formdata).pipe(resp => resp)
  }
  
  getPersonaById(formdata: any): Observable<any> {
    return this.http.post<any>(`${this.Url}personas/findById`,formdata);
  }




  // Agrega más métodos según sea necesario (PUT, DELETE, etc.)
}
