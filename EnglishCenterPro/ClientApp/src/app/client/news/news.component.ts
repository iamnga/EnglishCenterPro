import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html'
})
export class NewsComponent implements OnInit {
  news: News;
  newsID: string;
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
      this.newsID = params["newsID"];
      if (this.newsID) {
        this.http.get<News>(this.baseUrl + "api/news/" + this.newsID).subscribe(result => {
          this.news = result;
          console.log(this.news)
        }, error => location.href = "/");
      }
    });

  }
  title = 'news';
}


interface News {
  ID: number;
  Title: string;
  Content: string;
  Image: string;
  CreatedDate: Date | string;
  UpdatedDate: Date | string;
}
