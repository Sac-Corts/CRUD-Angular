import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private _http: HttpClient) { }

  agregarEmpleado(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/empleados', data);
  }

  editarEmpleado(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/empleados/${id}`, data);
  }

  obtenerListaEmpleado(): Observable<any> {
    return this._http.get('http://localhost:3000/empleados');
  }

  eliminarEmpleado(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/empleados/${id}`);
  }
}

