import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  serverUrl:string ='http://localhost:4001'



// all employees api
  getAllEmployeesApi(){
    return this.http.get(`${this.serverUrl}/view-users`)
  }

  AddEmployeeApi(reqbody:any){
    console.log(reqbody)
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })}
    return this.http.post(`${this.serverUrl}/add-user`,reqbody,options)
  }

  EditEmployeeApi(reqbody:any){
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })}
    return this.http.put(`${this.serverUrl}/edit-user`,reqbody,options)
  }
  DeleteEmployeeApi(reqbody:any){
    console.log(reqbody)//{firstName: 'Michael', email: 'michael.williams@x.dummyjson.com'}
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: reqbody}
    return this.http.delete(`${this.serverUrl}/delete-user`,options)
  }

}
