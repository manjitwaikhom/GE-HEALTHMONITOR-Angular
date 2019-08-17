import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { PartnerlistComponent } from "./partnerlist/partnerlist.component";
import { StudentListComponent } from "./student-list/student-list.component";
import { AddStudentComponent } from "./add-student/add-student.component";

const routes: Routes = [
  { path: "", redirectTo: "add-patient", pathMatch: "full" },
  { path: "view-patient", component: StudentListComponent },
  { path: "add-patient", component: AddStudentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
