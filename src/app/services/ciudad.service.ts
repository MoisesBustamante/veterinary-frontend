import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  private Url: string = 'http://localhost:1020/';
  private token: string = "Bearer " + localStorage.getItem("token"); //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiIyQDIuY29tIiwidWlkIjoic00yMV8yMl9JNTUiLCJyb2wiOjEsImlhdCI6MTY1MjcyNzExNSwiZXhwIjoxNjg0Mjg0NzE1fQ.mjpOc7b_BnB6ITkzqO9KigWQM7i6ln5OBXDLkcC5Tys';
  private headers: HttpHeaders = new HttpHeaders({ Authorization: this.token });

  constructor(private http: HttpClient) { }


  AddPaciente(id_ciudad: any): Observable<any>{
    return this.http.post<any>(`${this.Url}pacientes/saveOrUpdate`,id_ciudad).pipe(res=>res);

  }
  DeletePaciente(formdata: any): Observable<any> {
    return this.http.post<any>(`${this.Url}pacientes/Delete`,formdata).pipe(resp => resp)
  }

  getpacientesById(formdata: any): Observable<any> {
    return this.http.post<any>(`${this.Url}pacientes/findById`,formdata);
  }

  getCiudades(): Observable<any> {
    return this.http.get<any>(`${this.Url}ciudad/All`).pipe(res=>res);
  }
  getCPacientes(): Observable<any> {
    return this.http.get<any>(`${this.Url}pacientes/All`).pipe(res=>res);
  }
  getPacientesExcel(): Observable<any> {
    return this.http.get<any>(`${this.Url}pacientes/All`);
  }
  getPropietarios(): Observable<any> {
    return this.http.get<any>(`${this.Url}propietarios/All`).pipe(res=>res);
  }

}


