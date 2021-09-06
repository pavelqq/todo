import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: any;
  currentTodo: any = null;
  currentIndex: number = -1;
  title: string = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getAll()
      .subscribe(
        data => {
          this.todos = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.getTodos();
    this.currentTodo = null;
    this.currentIndex = -1;
  }

  setActiveTodo(Todo: any, index: number): void {
    this.currentTodo = Todo;
    this.currentIndex = index;
  }

  removeAllTodos(): void {
    this.todoService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.todoService.findByTitle(this.title)
      .subscribe(
        data => {
          this.todos = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
