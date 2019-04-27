import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todoItems: AngularFireList<any>;

  constructor(private _firebaseDB: AngularFireDatabase) { }

  getTaskList(){
    this.todoItems = this._firebaseDB.list('tasks');
    console.log(this.todoItems);
    return this.todoItems;
  }

  addTask(title: string){
    this.todoItems.push({
      title: title,
      isChecked: false
    });
  }

  changeTaskStatus($key: string, flag: boolean){
    this.todoItems.update($key, {isChecked: flag});
  }

  removeTask($key: string){
    this.todoItems.remove($key);
  }


}
