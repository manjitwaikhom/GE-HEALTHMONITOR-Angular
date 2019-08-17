import { Component, OnInit } from "@angular/core";
import { StudentService } from "../student.service";
import { Student } from "../student";
import { Observable, Subject } from "rxjs";

import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.css"]
})
export class StudentListComponent implements OnInit {
  constructor(private studentservice: StudentService) {}

  studentsArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  students: Observable<Student[]>;
  student: Student = new Student();
  deleteMessage = false;
  studentlist: any;
  isupdated = false;

  ngOnInit() {
    this.isupdated = false;
    this.dtOptions = {
      pageLength: 6,
      stateSave: true,
      lengthMenu: [[6, 16, 20, -1], [6, 16, 20, "All"]],
      processing: true
    };
    this.studentservice.getStudentList().subscribe(data => {
      this.students = data;
      this.dtTrigger.next();
    });
  }

  deleteStudent(id: number) {
    this.studentservice.deleteStudent(id).subscribe(
      data => {
        console.log(data);
        this.deleteMessage = true;
        this.studentservice.getStudentList().subscribe(data => {
          this.students = data;
        });
      },
      error => console.log(error)
    );
  }

  updateStudent(id: number) {
    this.studentservice.getStudent(id).subscribe(
      data => {
        this.studentlist = data;
      },
      error => console.log(error)
    );
  }

  studentupdateform = new FormGroup({
    student_id: new FormControl(),
    student_name: new FormControl(),
    student_email: new FormControl(),
    student_branch: new FormControl(),
    student_dob: new FormControl()
  });

  updateStu(updstu) {
    this.student = new Student();
    this.student.patient_id = this.StudentId.value;
    this.student.patient_name = this.StudentName.value;
    this.student.patient_email = this.StudentEmail.value;
    this.student.patient_gender = this.StudentBranch.value;
    this.student.patient_dob = this.StudentDob.value;
    console.log(this.StudentBranch.value);

    this.studentservice
      .updateStudent(this.student.patient_id, this.student)
      .subscribe(
        data => {
          this.isupdated = true;
          this.studentservice.getStudentList().subscribe(data => {
            this.students = data;
          });
        },
        error => console.log(error)
      );
  }

  get StudentName() {
    return this.studentupdateform.get("student_name");
  }

  get StudentEmail() {
    return this.studentupdateform.get("student_email");
  }

  get StudentBranch() {
    return this.studentupdateform.get("student_branch");
  }

  get StudentId() {
    return this.studentupdateform.get("student_id");
  }

  get StudentDob() {
    return this.studentupdateform.get("student_dob");
  }

  changeisUpdate() {
    this.isupdated = false;
  }
}
