import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CourseComponent } from './course/course.component';
import { NewsComponent } from './news/news.component';
import { CommonModule } from "@angular/common";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { QuillModule } from 'ngx-quill';
import { OktaAuthGuard } from '@okta/okta-angular';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    CourseComponent,
    NewsComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    QuillModule.forRoot(),
    RouterModule.forChild([
      {
        path: '', component: AdminComponent, children: [
          { path: '', component: CourseComponent, canActivate: [OktaAuthGuard] },
          { path: 'news', component: NewsComponent, canActivate: [OktaAuthGuard] }
        ]
      }
    ])
  ],
})
export class AdminModule { }
