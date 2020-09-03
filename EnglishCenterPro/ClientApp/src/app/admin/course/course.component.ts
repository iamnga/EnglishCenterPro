import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as $ from "jquery";

@Component({
  selector: 'app-admin-course',
  templateUrl: './course.component.html'
})
export class CourseComponent implements OnInit {
  courses: Course[] = [];
  courseDelete: number;
  addCourserForm: any;
  formTitle: string;
  isEdit = false;
  quillContent = "";
  currentCourse: Course;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

  }

  ngOnInit() {
    this.createForm();
    this.getCourse();
  }

  getCourse() {
    this.http.get<Course[]>(this.baseUrl + 'api/courses').subscribe(result => {
      this.courses = result;
      console.log(this.courses);
    }, error => console.error(error));
  }

  createForm() {
    this.addCourserForm = new FormGroup({
      title: new FormControl("", [
        Validators.required,
        Validators.maxLength(200)
      ]),
      duration: new FormControl("", [
        Validators.required,
        Validators.maxLength(200)
      ]),
      subjects: new FormControl("", [
        Validators.required,
        Validators.maxLength(200)
      ]),
      method: new FormControl("", [
        Validators.required,
        Validators.maxLength(200)
      ]),
      image: new FormControl(""),
      content: new FormControl("", [])
    });
  }

  deleteCourse() {
    this.http.delete(this.baseUrl + 'api/courses/' + this.courseDelete).subscribe(result => {
      if (result != null) {
        this.courses = this.courses.filter(x => x.id != this.courseDelete);
      }
    }, error => console.error(error));
  }

  setCourseDelete(id: number) {
    this.courseDelete = id;
  }

  setUpAddCourse() {
    this.addCourserForm.reset();
    this.formTitle = "Thêm khóa học";
    this.isEdit = false;
    this.quillContent = "";
    $("#img-course").css("display", "none");
  }



  addCourse() {
    let newItem = new Course();
    newItem.title = this.addCourserForm.get("title").value;
    newItem.content = this.addCourserForm.get("content").value;
    newItem.image = $("#img-course").attr("src");
    newItem.duration = this.addCourserForm.get("duration").value;
    newItem.subjects = this.addCourserForm.get("subjects").value;
    newItem.method = this.addCourserForm.get("method").value;
    newItem.createdDate = new Date();
    newItem.updatedDate = new Date();
    this.http.post(this.baseUrl + 'api/courses', newItem).subscribe(result => {
      if (result) {
        $(".close").click();
        $("#showAlertAddSuccess").click();
        this.getCourse();
      }
    }, error => console.error(error));
  }

  editCourse(course: Course) {
    this.addCourserForm.reset();
    this.formTitle = "Chỉnh sửa thông tin khóa học";
    this.isEdit = true;

    this.currentCourse = course;
    this.addCourserForm.controls["title"].setValue(course.title);
    $("#img-course").css("display", "block");
    $("#img-course").attr("src", course.image);
    this.addCourserForm.controls["duration"].setValue(course.duration);
    this.addCourserForm.controls["subjects"].setValue(course.subjects);
    this.addCourserForm.controls["method"].setValue(course.method);
    this.addCourserForm.controls["content"].setValue(course.content);


  }


  confirmEdit() {
    let newItem = new Course();
    newItem.title = this.addCourserForm.get("title").value;
    newItem.content = this.addCourserForm.get("content").value;
    newItem.image = $("#img-course").attr("src");
    newItem.duration = this.addCourserForm.get("duration").value;
    newItem.subjects = this.addCourserForm.get("subjects").value;
    newItem.method = this.addCourserForm.get("method").value;
    newItem.createdDate = this.currentCourse.createdDate;
    newItem.updatedDate = new Date();
    newItem.id = this.currentCourse.id;

    this.http.put(this.baseUrl + 'api/courses/' + this.currentCourse.id, newItem).subscribe(result => {
      console.log(result);
      $(".close").click();
      $("#showAlertUpdateSuccess").click();
      this.getCourse();

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


class Course {
  id: number;
  title: string;
  content: string;
  image: string;
  duration: string;
  subjects: string;
  method: string;
  createdDate: Date | string;
  updatedDate: Date | string;
}
