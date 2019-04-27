import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoItemList: any[];

  constructor(private _todoService: TodoService) { }

  ngOnInit() {
    this._todoService.getTaskList().snapshotChanges()
      .subscribe(item => {
        this.todoItemList = [];
        item.forEach(element => {
          var x = element.payload.toJSON();
          x["$key"] = element.key;
          this.todoItemList.push(x);
        })

        // sort array isChecked false
        this.todoItemList.sort((a,b)=>{
          return a.isChecked - b.isChecked
        })
      });
  }

  onAdd(itemTitle){
    this._todoService.addTask(itemTitle.value);
    itemTitle.value = null;
    console.log(itemTitle.value);
  }

  onStatusChange($key: string, isChecked){
    this._todoService.changeTaskStatus($key, !isChecked)
  }

  onDelete($key){
    this._todoService.removeTask($key);
  }

}
