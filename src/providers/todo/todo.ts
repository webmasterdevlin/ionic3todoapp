import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TodoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoProvider {

  private _todos = [];
  private _archivedTodos = [];

  constructor(public http: HttpClient) {
    console.log('Hello TodoProvider Provider');
  }

  archiveTodo(todoIndex) {
    let todoToBeArchived = this._todos[todoIndex];
    this._todos.splice(todoIndex, 1);
    console.log("Splice");

    this._archivedTodos.push(todoToBeArchived);
    console.log("Push");
  }

  getTodos() {
    return this._todos;
  }

  getArchivedTodos() {
    return this._archivedTodos;
  }

  addTodos(todo) {
    this._todos.push(todo);
  }

  editTodo(todo, todoIndex) {
    this._todos[todoIndex] = todo;
  }

}
