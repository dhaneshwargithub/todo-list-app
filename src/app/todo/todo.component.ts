import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompletionDialogComponent } from '../completion-dialog/completion-dialog.component';

interface Task {
  name: string;
  dueDate: string;
  isCompleted: boolean;
  isEditing?: boolean;
  editName?: string;
  editDueDate?: string;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  newTask: string = '';
  newTaskDueDate: string = '';
  tasks: Task[] = [];
  completedTasks: Task[] = [];
  isDarkMode: boolean = false;

  constructor(public dialog: MatDialog) {}

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({ name: this.newTask.trim(), dueDate: this.newTaskDueDate, isCompleted: false });
      this.newTask = '';
      this.newTaskDueDate = '';
    }
  }

  completeTask(task: Task) {
    task.isCompleted = true;
    this.completedTasks.push(task);
    this.tasks = this.tasks.filter(t => t !== task);
    this.openCompletionDialog();
  }

  deleteTask(task: Task) {
    if (task.isCompleted) {
      this.completedTasks = this.completedTasks.filter(t => t !== task);
    } else {
      this.tasks = this.tasks.filter(t => t !== task);
    }
  }

  editTask(task: Task) {
    task.isEditing = true;
    task.editName = task.name;
    task.editDueDate = task.dueDate;
  }

  saveTask(task: Task) {
    task.name = task.editName!;
    task.dueDate = task.editDueDate!;
    task.isEditing = false;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }

  openCompletionDialog() {
    this.dialog.open(CompletionDialogComponent);
  }
}
