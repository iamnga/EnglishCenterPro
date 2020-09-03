import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './common/header.component';
import { FooterComponent } from './common/footer.component';
import { ClientComponent } from './client.component';
import { CourseComponent } from './course/course.component';
import { NewsComponent } from './news/news.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from "@angular/common";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';


@NgModule({
  declarations: [
    HomeComponent,
    CourseComponent,
    NewsComponent,
    ClientComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    SlickCarouselModule,
    RouterModule.forChild([
      {
        path: '', component: ClientComponent, children: [
          { path: '', component: HomeComponent },
          { path: 'course/:courseID', component: CourseComponent },
          { path: 'news/:newsID', component: NewsComponent }
        ]
      }
    ]),
    NgbModule,

  ],
})
export class ClientModule { }
