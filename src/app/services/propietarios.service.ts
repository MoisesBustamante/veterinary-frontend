import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: "root",
})
export class PropietariosService {
  private Url: string = 'http://localhost:1020/';
  private token: string = "Bearer " + localStorage.getItem("token"); //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiIyQDIuY29tIiwidWlkIjoic00yMV8yMl9JNTUiLCJyb2wiOjEsImlhdCI6MTY1MjcyNzExNSwiZXhwIjoxNjg0Mjg0NzE1fQ.mjpOc7b_BnB6ITkzqO9KigWQM7i6ln5OBXDLkcC5Tys';
  private headers: HttpHeaders = new HttpHeaders({ Authorization: this.token });

  constructor(private http: HttpClient) { }

  getPropietarios(): Observable<any> {
    return this.http.get<any>(`${this.Url}propietarios/All`).pipe(res=>res);
  }
  AddPropietarios(id_dueno: any): Observable<any>{
    return this.http.post<any>(`${this.Url}propietarios/saveOrUpdate`,id_dueno).pipe(res=>res);

  }
  DeletePropietario(formdata: any): Observable<any> {
    return this.http.post<any>(`${this.Url}propietarios/Delete`,formdata).pipe(resp => resp)
  }

  getPropietarioById(formdata: any): Observable<any> {
    return this.http.post<any>(`${this.Url}propietarios/findById`,formdata);
  }

  getCiudades(): Observable<any> {
    return this.http.get<any>(`${this.Url}ciudad/All`).pipe(res=>res);
  }

}
