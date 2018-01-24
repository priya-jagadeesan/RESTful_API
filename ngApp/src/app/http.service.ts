import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { 
  }

  getTasks(){
     return this._http.get('/tasks');
  }

  getTaskByID(id){
    return this._http.get('/tasks/'+id);
  }

  addTask(newtask){
    return this._http.post('/tasks', newtask);
  }

  updateTask(id,newtask){
    return this._http.put('/tasks/'+id,newtask);
  }

  destroyTask(id){
    return this._http.delete('/tasks/'+id);
   }
}
