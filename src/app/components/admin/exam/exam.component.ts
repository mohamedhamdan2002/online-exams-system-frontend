import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ExamService } from '../../../services/exam.service';
import { Observable, Subscription } from 'rxjs';
import { Exam } from '../../../models/exam';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../../material-module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    MaterialModule
  ],
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription!: Subscription;
  categoryId!: string;
  examList!: Exam[];
  dataSource: any;
  columnsToDisplay: string[] = ['No', 'Title', 'Action'];
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
