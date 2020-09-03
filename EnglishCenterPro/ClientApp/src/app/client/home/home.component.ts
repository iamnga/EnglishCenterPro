import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  title = 'home';
  courses: Course[] = [];
  listNews: News[] = [];
  images = ["assets/images/slider-1.jpg", "assets/images/slider-2.jpg"];
  slideConfig = {
    slidesToShow: 1, slidesToScroll: 1, prevArrow: '<span class="prev"><i class="fal fa- chevron - left"></i>Trước</span>', nextArrow: '<span class="next">Sau <i class="fal fa-chevron-right"></i></span>',
    speed: 800, dots: false,
    infinite: false,
    arrows: true,
  };


  slideConfig2 = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    fade: true,
    asNavFor: '.testimonials-content',
    speed: 800,
    arrows: true,
    prevArrow: false,
    nextArrow: '<span class="next">Xem tiếp <i class="far fa-long-arrow-right"></i></span>',
  };

  slideConfig3 = {
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.testimonials-image',
    dots: false,
    arrows: false,
    focusOnSelect: true,
    speed: 800,
  };

  slideConfig4 = {
    dots: false,
    infinite: false,
    arrows: false,
    prevArrow: '<span class="prev"><i class="fal fa-chevron-left"></i></span>',
    nextArrow: '<span class="next"><i class="fal fa-chevron-right"></i></span>',
    autoplay: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }

  ngOnInit() {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });


    this.http.get<Course[]>(this.baseUrl + "api/courses").subscribe(result => {
      this.courses = result;
      console.log(this.courses)
    }, error => console.error(error));

    this.http.get<News[]>(this.baseUrl + "api/news").subscribe(result => {
      this.listNews = result;
      console.log(this.listNews)
    }, error => console.error(error));
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


