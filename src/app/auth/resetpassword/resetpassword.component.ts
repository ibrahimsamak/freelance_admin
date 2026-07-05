import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "../../shared/services/firebase/auth.service";
import { ConstantServiceWrapper } from "../../service/ConstantServiceWrapper.service";
import { appConstant, UserType } from "../../service/appConstant";
import { ToastrService } from "ngx-toastr";
import { HttpClient, HttpHeaders } from "@angular/common/http";

type UserFields = "email";
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent  implements OnInit {
  @ViewChild("Login") Login: ElementRef;

  public newUser = false;
  public user: firebase.User;
  public loginForm: FormGroup;
  public formErrors: FormErrors = {
    email: "",
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
      email: ["", [Validators.required]]
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
    this.ResetAdmin(form);
  }

  ResetAdmin(conent) {
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
        appConstant.BASE_URL + "/admin/resetAdmin",
        JSON.stringify(conent),
        httpOptions
      )
      .subscribe((res_data) => {
        if (res_data[appConstant.STATUS]) {
          this.toster.success(res_data[appConstant.MESSAGE]);
          setTimeout(() => {
            this.showLoader = false;
             this.router.navigateByUrl("/auth/login");
          }, 2000);
        } else {
          this.showLoader = false;
          this.toster.error(res_data[appConstant.MESSAGE]);
        }
      });
  }
}
