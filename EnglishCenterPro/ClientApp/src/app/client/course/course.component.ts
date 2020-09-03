import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html'
})
export class CourseComponent implements OnInit {
  course: Course;
  courseID: string;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });

    this.route.params.forEach(params => {
      this.courseID = params["courseID"];
      console.log(this.courseID);
      if (this.courseID) {
        this.http.get<Course>(this.baseUrl + "api/courses/" + this.courseID).subscribe(result => {
          this.course = result;
          console.log(this.course)
        }, error => location.href = "/");
      }
    })
  }
  title = 'course';
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
