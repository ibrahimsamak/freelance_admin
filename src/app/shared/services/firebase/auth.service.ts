import { Injectable, OnInit, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import * as firebase from "firebase/app";
import { ToastrService } from "ngx-toastr";
import { CookieService } from "ngx-cookie-service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { appConstant } from "../../../../app/service/appConstant";

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  token: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService implements OnInit {
  public userData: any;
  public user: firebase.User;
  private _sessionId: string;
  public showLoader: boolean = false;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public toster: ToastrService,
    private cookieService: CookieService,
    private http: HttpClient
  ) {
    if (localStorage.getItem("token") != null) {
      this.userData = localStorage.getItem("token");
    }
    // this.afAuth.authState.subscribe((user) => {
    //   if (user) {
    //     this.userData = user;
    //     this._sessionId = this.userData;
    //     cookieService.set("user", JSON.stringify(this.userData));
    // JSON.parse(cookieService.get("user"));
    //     localStorage.setItem("user", JSON.stringify(this.userData));
    //     JSON.parse(localStorage.getItem("user"));
    //   } else {
    //     localStorage.setItem("user", null);
    //     JSON.parse(localStorage.getItem("user"));
    //   }
    // });
  }

  ngOnInit(): void {}

  // //sign in function
  // SignIn(email, password) {
  //   return this.afAuth.auth
  //     .signInWithEmailAndPassword(email, password)
  //     .then((result) => {
  //       if (result.user.emailVerified !== true) {
  //         this.SetUserData(result.user);
  //         this.SendVerificationMail();
  //         this.showLoader = true;
  //       } else {
  //         this.showLoader = false;
  //         this.ngZone.run(() => {
  //           this.router.navigate(["/auth/login"]);
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       this.toster.error("You have enter Wrong Email or Password.");
  //     });
  // }
  //main verification function

  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
      this.router.navigateByUrl("/dashboard/default");
    });
  }

  //Sign in with Facebook
  signInFacebok() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  //Sign in with Twitter
  signInTwitter() {
    return this.AuthLogin(new auth.TwitterAuthProvider());
  }

  //Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert("Password reset email sent, check your inbox.");
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  //Authentication for Login
  AuthLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(["/dashboard/default"]);
        });
        // this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Sign out
  SignOut() {
    localStorage.removeItem("admin_id");
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_username");
    localStorage.removeItem("expire");
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    localStorage.removeItem("type");
    localStorage.removeItem("image");

    this.router.navigate(["/auth/login"]);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user != null && user.emailVerified != false ? true : false;
  }

  loginAdmin(conent) {
    this.showLoader = true;
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "accept-language": localStorage.getItem("lang"),
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http
      .post(
        appConstant.BASE_URL + "/admin/loginAdmin",
        JSON.stringify(conent),
        httpOptions
      )
      .subscribe((res_data) => {
        if (res_data[appConstant.STATUS]) {
          let arr = [];
          this.userData = res_data["items"];
          localStorage.setItem("admin_id", res_data["items"]["_id"]);
          localStorage.setItem("token", res_data["items"]["token"]);
          localStorage.setItem("expire", res_data["items"]["expire"]);
          let roles = res_data["items"]["roles"] as any[];
          roles.forEach((element) => {
            arr.push(element);
          });

          localStorage.setItem("roles", JSON.stringify(arr));
          localStorage.setItem(
            "admin_username",
            res_data["items"]["full_name"]
          );
          setTimeout(() => {
            this.showLoader = false;
            this.router.navigateByUrl("/dashboard/default");
          }, 2000);
        } else {
          this.showLoader = false;
          this.toster.error(res_data[appConstant.MESSAGE]);
        }
      });
  }
}
