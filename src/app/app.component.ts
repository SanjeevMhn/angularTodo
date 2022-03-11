import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent,Observable } from 'rxjs';
import { Task } from './Task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularTodo';
  inputText!: string;
  tasks:Task[] = [
    {id:1,desc: "Buy Coffee",done: false},
    {id:2,desc: "Go Outside",done: true},
    {id:3,desc: "Paint Kitchen",done: false},
    {id:4,desc: "Buy Groceries",done: true},
    {id:5,desc: "Walk the dog",done: false}
  ];
  completedTasks:Task[]=[];
  editItem:boolean = false;
  editItemId!:number;
  markedItems:Task[]=[];
  markedItem!:Task;
  enterKey!:Observable<any>;

  ngOnInit(){
    this.tasks.map((task:Task)=>{
      if(task.done){
        this.addToCompletedList(task);
      }
    })
  }

  ngDoCheck(){
    
  }



  addToTask(inp:string):void{
    //check if the item is not being updated
    if(!this.editItem){
      let dup = this.tasks.filter((task:Task)=>{
        return task.desc.toLowerCase() === inp.toLowerCase();
      });
      if(dup.length == 0){
        let newTask:Task = {
          id: Date.now(),
          desc: this.inputText,
          done: false
        };
        this.tasks.unshift(newTask);
        this.inputText = '';
      }else{
        alert('Task already exists');
      }
    }else{//if the item is being updated
      if(this.inputText !== ''){
        this.tasks.map((task:Task)=>{
          if(task.id === this.editItemId){
            task.desc = this.inputText;
          }
        })
        this.editItem = !this.editItem;
        this.inputText = '';
      }else{
        alert('Please enter text');
      }
    }

  }

  addToCompletedList(inp:Task){
    let dup = this.completedTasks.filter((ct:Task)=>{
      return ct.id === inp.id;
    })
    if(dup.length === 0){
      this.completedTasks.unshift(inp);
    }else{
      this.completedTasks.filter((ct:Task)=>{
        return ct.id !== inp.id;
      })
    }
  }

  markTask(inp:Task):void{
    this.tasks.map((task:Task,index:number)=>{
      if(task.id === inp.id){
        task.done = !task.done;
        this.addToCompletedList(task);
      }
    });
  }

  deleteTask(inp:Task):void{
    let index = this.tasks.indexOf(inp);
    this.tasks.splice(index,1);
  }

  editTask(inp:Task):void{
    this.editItem = !this.editItem;
    this.inputText = inp.desc;
    this.editItemId = inp.id;
  }
}
