import { ArchivedTodosPage } from "./../archived-todos/archived-todos";
import { Component } from "@angular/core";
import {
  NavController,
  AlertController,
  reorderArray,
  ToastController
} from "ionic-angular";
import { TodoProvider } from "../../providers/todo/todo";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  public todos = [];
  public reorderIsEnabled = false;
  public archivedTodosPage = ArchivedTodosPage;

  constructor(
    public navCtrl: NavController,
    private _alertController: AlertController,
    private _todoProvider: TodoProvider,
    private _toastController: ToastController
  ) {
    this.todos = this._todoProvider.getTodos();
  }

  archiveTodo(todoIndex) {
    this._todoProvider.archiveTodo(todoIndex);
  }

  toggleReorder() {
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  itemReordered($event) {
    reorderArray(this.todos, $event);
  }

  removeTodo($event) {
    this.todos.splice($event, 0);
  }


  goToArchivePage(index) {
    this.navCtrl.push(this.archivedTodosPage);
  }

  editTodo(todoIndex){
    let editTodoAlert = this._alertController.create({
      title: "Edit A Todo",
      message: "Edit Your Todo",
      inputs: [
        {
          type: "text",
          name: "editTodoInput",
          value: this.todos[todoIndex]
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Edit Todo",
          handler: (inputData)=> {
            let todoText;
            todoText = inputData.editTodoInput;
            this._todoProvider.editTodo(todoText, todoIndex);

            editTodoAlert.onDidDismiss(()=> {
                  let editTodoToast = this._toastController.create({
                  message: "Todo Edited",
                  duration: 2000
                });
                editTodoToast.present();
            });

          }
        }
      ]
    });
    editTodoAlert.present();
  }
  openTodoAlert() {
    let addTodoAlert = this._alertController.create({
      title: "Add a todo",
      message: "Enter your todo",
      inputs: [
        {
          type: "text",
          name: "addTodoInput"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Add Todo",
          handler: inputDate => {
            let todoText;
            todoText = inputDate.addTodoInput;
            this._todoProvider.addTodos(todoText);

            addTodoAlert.onDidDismiss(() => {
              let addTodoToast = this._toastController.create({
                message: "Todo Added",
                duration: 3000
              });
              addTodoToast.present();
            });
          }
        }
      ]
    });

    addTodoAlert.present();
  }
}
