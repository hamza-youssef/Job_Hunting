import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddOffreComponent } from './add-offre/add-offre.component';
import { AuthJobListComponent } from './auth-job-list/auth-job-list.component';
import { CategoryComponent } from './category/category.component';
import { ContactComponent } from './contact/contact.component';
import { EditOffreComponent } from './edit-offre/edit-offre.component';
import { HomeCompanyComponent } from './home-company/home-company.component';
import { HomeComponent } from './home/home.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobListComponent } from './job-list/job-list.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './signup/signup.component';
import { TestimonialComponent } from './testimonial/testimonial.component';


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"about",component:AboutComponent},
  {path:"joblist",component:JobListComponent},
  {path:"jobdetails",component:JobDetailsComponent},
  {path:"authjoblist",component:AuthJobListComponent},
  {path:"testimonial",component:TestimonialComponent},
  {path:"category",component:CategoryComponent},
  {path:"contact",component:ContactComponent},
  {path:"contact",component:ContactComponent},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"homecompany",component:HomeCompanyComponent},
  {path:"addroute",component:AddOffreComponent},
  {path:"editoffre/:postId",component:EditOffreComponent},







  {path:"**",component:PageNotFoundComponent},

  {path:"", redirectTo:"", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
