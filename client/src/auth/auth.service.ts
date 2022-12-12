import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AuthData,RegData } from "./auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
  private token: string="";
  private tokenTimer: any;

  private authStatusListener = new Subject<boolean>();



  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(name: string,email: string, password: string , role:string) {
    const authData: RegData = { name:name, email: email, password: password , role: role };

    this.http
      .post("http://localhost:5000/api/users/", authData)
      .subscribe(response => {


        this.router.navigate(["/"]);
      });
  }

  login(email: string, password: string  ) {
    const authData: AuthData = { email: email, password: password  };

    this.http
      .post<{ token: string; expiresIn: number; user: object }>(
        "http://localhost:5000/api/auth",
        authData
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        const user = Object.create(response.user)
        
        
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          console.log("Response is " ,response);
          console.log(user.role)


          this.saveAuthData(token)

          if(user.role == "user")
          this.router.navigate(["/authjoblist"])
          else 
          this.router.navigate(["/homecompany"])
        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    
    this.token = "";
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();

    // this.router.navigate(["/authjoblist"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string) {
    localStorage.setItem("token", token);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return null;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }
}
