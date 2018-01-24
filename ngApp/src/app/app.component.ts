// import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  // title = 'app';
  title = 'RESTful Tasks API';
  tasks : any;
  task : any;
  newTask : any;
  editTask : boolean = false;
  cancelTask : boolean = false;
  ID : any;
  errors : any;

  constructor(private _httpService: HttpService){}

  // ngOnInit will run when the component is initialized, after the constructor method.
  ngOnInit(){
    this.newTask = { title: "", description: "" }
    this.getTasksFromService();    
  }

  // component receives the data
  getTasksFromService(){
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {  
      console.log(data);
      this.tasks = data;
    });
  }
  
  onCreateUpdate() {
    // if edit task is false, execute code for create new task
    if (this.editTask === false) {
      let observable = this._httpService.addTask(this.newTask);
      observable.subscribe(data => { 
        if (data['message']){
          if (data['message'] == 'error'){
            this.errors = "Error in Create Task : All fields required";
            this.cancelTask = true;
          }
          else {
            this.getTasksFromService();
            this.newTask = { title: "", description: "" };
            this.editTask = true;
          }
        }
      });
    }
    // or execute code to update the new information
    else {
      let observable = this._httpService.updateTask(this.ID,this.newTask);
      observable.subscribe(data => {
        if (data['message']){
          if (data['message'] == 'error'){
            this.errors = "Error in Update Task : All fields required";
          }
          else {  
            this.getTasksFromService();	
            this.onDisplay(this.ID);
            this.newTask = { title: "", description: "" };
            this.editTask = false;
          }
        }
      });
    }
  }

  onDisplay(id){
    let observable = this._httpService.getTaskByID(id);
    observable.subscribe(data => {  
      this.task = data;
    });
  }

  onUpdate(task) {
    this.cancelTask = true;
    this.editTask = true;
    this.ID = task._id;
    this.newTask = { title : task.title, description : task.description}
  }

  onCancel(task) {
    this.cancelTask = false;
    this.editTask = false;
    this.ID = '';
    this.newTask = { title : '', description : ''}
    this.errors = "";
  }

  onDelete(ID) {
    let observable = this._httpService.destroyTask(ID);
    observable.subscribe(successCode => {
      this.getTasksFromService();	
    });
  }
}