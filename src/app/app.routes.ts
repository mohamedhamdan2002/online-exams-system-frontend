import { Routes } from '@angular/router';
import { CategoryComponent } from './components/admin/category/category.component';
import { ExamComponent } from './components/admin/exam/exam.component';
import { QuestionComponent } from './components/admin/question/question.component';
import { LoginComponent } from './shard/components/login/login.component';
import { LayoutComponent } from './components/admin/layout/layout.component';
import { authGuard } from './routeGuards/auth.guard';
import { SignUpComponent } from './shard/components/sign-up/sign-up.component';
import { ExamFormComponent } from './components/admin/exam/exam-form/exam-form.component';
import { UserLayoutComponent } from './components/user/user-layout/user-layout.component';
import { UserExamComponent } from './components/user/user-exam/user-exam.component';
import { UserExamFormComponent } from './components/user/user-exam-form/user-exam-form.component';
import { HomeComponent } from './shard/components/home/home.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { AboutComponent } from './shard/components/about/about.component';
import { ContactUsComponent } from './shard/components/contact-us/contact-us.component';
import { MainLayoutComponent } from './shard/components/main-layout/main-layout.component';
import { ExamineeComponent } from './components/admin/examinee/examinee.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'categories',
        component: CategoryComponent,
      },
      {
        path: 'exams',
        component: ExamComponent,

      },
      {
        path: 'exams/add',
        component: ExamFormComponent,
      },
      {
        path: 'questions',
        component: QuestionComponent,
      },
      {
        path: 'users',
        component: ExamineeComponent,
      },
    ],
  },
  {
    path: 'user',
    component: UserLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: UserDashboardComponent,
      },
      {
        path: 'exams',
        component: UserExamComponent,
      },
      {
        path: 'exam-form/:id',
        component: UserExamFormComponent,
      }
    ],
  }
];
