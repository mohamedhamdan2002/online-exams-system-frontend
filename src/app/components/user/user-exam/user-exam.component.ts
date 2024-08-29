import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Exam } from '../../../models/exam';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExamService } from '../../../services/exam.service';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../material-module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [
    MaterialModule,
    RouterLink
  ],
  templateUrl: './user-exam.component.html',
  styleUrl: './user-exam.component.css'
})
export class UserExamComponent {
  subscription!: Subscription;
  categoryId!: string;
  examList!: Exam[];
  dataSource: any;
  columnsToDisplay: string[] = ['No', 'Title', 'Date', 'Duration', 'Action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private examService: ExamService) {

  }
  ngOnInit(): void {
    this.loadExams();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadExams() {
    this.subscription = this.examService.getExams().subscribe(res => {
      this.examList = res;
      this.dataSource = new MatTableDataSource<Exam>(this.examList);
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
