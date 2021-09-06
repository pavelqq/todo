import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {

  currentTodo: any = null;
  message: string = '';

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getTodo(this.route.snapshot.paramMap.get('id'));
  }

  getTodo(id: string | null): void {
    this.todoService.get(id)
      .subscribe(
        data => {
          this.currentTodo = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateStatus(status: Boolean): void {
    this.todoService.update(this.currentTodo._id, status)
      .subscribe(
        response => {
          this.currentTodo.status = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateTodo(): void {
    this.todoService.update(this.currentTodo._id, this.currentTodo)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'ТуДу успешно обновлено!';
        },
        error => {
          console.log(error);
        });
  }

  deleteTodo(): void {
    this.todoService.delete(this.currentTodo.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/todos']);
        },
        error => {
          console.log(error);
        });
  }

}
