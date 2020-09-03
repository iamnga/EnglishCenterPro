import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as $ from "jquery";

@Component({
  selector: 'app-admin-news',
  templateUrl: './news.component.html'
})
export class NewsComponent implements OnInit {
  listNews: News[] = [];
  newsDelete: number;
  addNewsForm: any;
  formTitle: string;
  isEdit = false;
  quillContent = "";
  currentNews: News;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

  }

  ngOnInit() {
    this.createForm();
    this.getNews();
  }

  getNews() {
    this.http.get<News[]>(this.baseUrl + 'api/news').subscribe(result => {
      this.listNews = result;
      console.log(this.listNews);
    }, error => console.error(error));
  }

  createForm() {
    this.addNewsForm = new FormGroup({
      title: new FormControl("", [
        Validators.required,
        Validators.maxLength(200)
      ]),
      image: new FormControl(""),
      content: new FormControl("", [])
    });
  }

  deleteNews() {
    this.http.delete(this.baseUrl + 'api/news/' + this.newsDelete).subscribe(result => {
      if (result != null) {
        this.listNews = this.listNews.filter(x => x.id != this.newsDelete);
      }
    }, error => console.error(error));
  }

  setNewsDelete(id: number) {
    this.newsDelete = id;
  }

  setUpAddNews() {
    this.addNewsForm.reset();
    this.formTitle = "Thêm tin tức";
    this.isEdit = false;
    this.quillContent = "";
    $("#img-course").css("display", "none");
  }



  addNews() {
    let newItem = new News();
    newItem.title = this.addNewsForm.get("title").value;
    newItem.content = this.addNewsForm.get("content").value;
    newItem.image = $("#img-course").attr("src");
    newItem.createdDate = new Date();
    newItem.updatedDate = new Date();
    this.http.post(this.baseUrl + 'api/news', newItem).subscribe(result => {
      if (result) {
        $(".close").click();
        $("#showAlertAddSuccess").click();
        this.getNews();
      }
    }, error => console.error(error));
  }

  editNews(news: News) {
    this.addNewsForm.reset();
    this.formTitle = "Chỉnh sửa tin tức";
    this.isEdit = true;

    this.currentNews = news;
    this.addNewsForm.controls["title"].setValue(news.title);
    $("#img-course").css("display", "block");
    $("#img-course").attr("src", news.image);
    this.addNewsForm.controls["content"].setValue(news.content);


  }


  confirmEdit() {
    let newItem = new News();
    newItem.title = this.addNewsForm.get("title").value;
    newItem.content = this.addNewsForm.get("content").value;
    newItem.image = $("#img-course").attr("src");
    newItem.createdDate = this.currentNews.createdDate;
    newItem.updatedDate = new Date();
    newItem.id = this.currentNews.id;

    this.http.put(this.baseUrl + 'api/news/' + this.currentNews.id, newItem).subscribe(result => {
      console.log(result);
      $(".close").click();
      $("#showAlertUpdateSuccess").click();
      this.getNews();

    }, error => console.error(error));

  }


  onFileSelect(event) {
    if (event.target.files.length > 0) {

      const file = event.target.files[0];


      var reader = new FileReader();

      reader.onloadend = function () {
        $("#img-course").attr("src", reader.result);
        $("#img-course").css("display", "block");
      }
      reader.readAsDataURL(file);
    }

  }
}


class News {
  id: number;
  title: string;
  content: string;
  image: string;
  createdDate: Date | string;
  updatedDate: Date | string;
}
