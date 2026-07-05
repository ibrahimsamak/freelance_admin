import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "../../shared/services/firebase/auth.service";
import { ConstantServiceWrapper } from "../../service/ConstantServiceWrapper.service";
import { appConstant, UserType } from "../../service/appConstant";
import { ToastrService } from "ngx-toastr";
import { HttpClient, HttpHeaders } from "@angular/common/http";

type UserFields = "email" | "password";
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  @ViewChild("Login") Login: ElementRef;

  public newUser = false;
  public user: firebase.User;
  public loginForm: FormGroup;
  public formErrors: FormErrors = {
    email: "",
    password: "",
  };
  public errorMessage: any;
  showLoader = false;
  constructor(
    public authService: AuthService,
    private afauth: AngularFireAuth,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    public toster: ToastrService
  ) {
    this.loginForm = fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {}

  // Simple Login
  login(form) {
    // console.log(form);
    // this.authService.loginAdmin(form);
    // this.Login.nativeElement.click();

    // this.authService.SignIn(
    //   this.loginForm.value["email"],
    //   this.loginForm.value["password"]
    // );
    this.loginAdmin(form);
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
          this.authService.userData = res_data["items"];
          localStorage.setItem("admin_id", res_data["items"]["_id"]);
          localStorage.setItem("token", res_data["items"]["token"]);
          localStorage.setItem("expire", res_data["items"]["expire"]);
          localStorage.setItem("type", res_data["items"]["type"]);
          if (res_data["items"]["type"] != UserType.ADMIN) {
            localStorage.setItem("image", res_data["items"]["image"]);
          }
          localStorage.setItem(
            "admin_username",
            res_data["items"]["full_name"]
          );
          let roles = res_data["items"]["roles"] as any[];
          if (roles) {
            roles.forEach((element) => {
              arr.push(element);
            });

            localStorage.setItem("roles", JSON.stringify(arr));
          }

          setTimeout(() => {
            this.showLoader = false;
            this.Login.nativeElement.click();
            // this.router.navigateByUrl("/dashboard/default");
          }, 2000);
        } else {
          this.showLoader = false;
          this.toster.error(res_data[appConstant.MESSAGE]);
        }
      });
  }
}
