import { Component, Inject, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit {
  title = 'client';
  isMobile = false;
  courses: Course[] = [];
  listNews: News[] = [];
  constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }

  ngOnInit() {
    this.http.get<Course[]>(this.baseUrl + "api/courses").subscribe(result => {
      this.courses = result;
      console.log(this.courses)
    }, error => console.error(error));

    this.http.get<News[]>(this.baseUrl + "api/news").subscribe(result => {
      this.listNews = result;
      console.log(this.listNews)
    }, error => console.error(error));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = event.target.innerWidth < 992 ? true : false;
  }

}



interface Course {
  ID: number;
  Title: string;
  Content: string;
  Image: string;
  Duration: string;
  Subjects: string;
  Method: string;
  CreatedDate: Date | string;
  UpdatedDate: Date | string;
}

interface News {
  ID: number;
  Title: string;
  Content: string;
  Image: string;
  CreatedDate: Date | string;
  UpdatedDate: Date | string;
}


