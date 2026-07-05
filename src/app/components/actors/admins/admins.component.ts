import { Component, OnInit } from "@angular/core";
import { appConstant } from "src/app/service/appConstant";
import { ConstantServiceWrapper } from "../../../service/ConstantServiceWrapper.service";
import {
  NgbActiveModal,
  NgbModal,
  ModalDismissReasons,
  NgbModalConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
declare var require;
const Swal = require("sweetalert2");
import * as jsonexport from "jsonexport/dist";

@Component({
  selector: "app-admins",
  templateUrl: "./admins.component.html",
  styleUrls: ["./admins.component.scss"],
})
export class AdminsComponent implements OnInit {
  admins = [];
  type = "";
  page = 0;
  limit = 20;
  size = 0;
  collectionCount;
  searchObject = {
    name:"",
    email:"",
    phone_number:""
  }
  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.getAdmins(this.page, this.limit);
  }

  getAdmins(page, limit) {
    this.helper.getAdmins(page, limit, this.searchObject).subscribe((x) => {
      if (x[appConstant.STATUS]) {
        let arr = x[appConstant.ITEMS] as any[];
        this.collectionCount = x["pagenation"]["totalElements"];
        this.size = x["pagenation"]["size"];
        this.admins = arr;
        this.page = page + 1;
      } else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }

  public onPageChange(pageNum: number): void {
    this.page = pageNum - 1;
    this.helper.getAdmins(this.page, this.limit, this.searchObject).subscribe((x) => {
      if (x[appConstant.STATUS]) {
        let arr = x[appConstant.ITEMS] as any[];
        this.collectionCount = x["pagenation"]["totalElements"];
        this.admins = arr;
        this.page = pageNum;
      } else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }

  deleteAdmin(id) {
    Swal.fire({
      title: "تحذير",
      text: this.translate.instant("Confirm"),
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: this.translate.instant("Yes"),
      cancelButtonText: this.translate.instant("Cancel"),
      // animation: false,
      // customClass: "animated tada",
    }).then((result) => {
      if (result.value) {
        this.helper.deleteAdmin(id).subscribe(
          (x) => {
            if (x[appConstant.STATUS] != true) {
              this.toastr.error(x[appConstant.MESSAGE]);
            } else {
              this.toastr.success(x[appConstant.MESSAGE]);
            }
            if (this.size == 1 && this.page != 1) this.page = this.page - 2;
            else this.page = this.page - 1;

            this.getAdmins(this.page, this.limit);
          },
          (error) => {
            this.helper.serverSideErrorHandler(error);
          }
        );
      }
    });
  }

  addNewAdmin() {
    this.router.navigate(["/users/admins/details"]);
  }
  editAdmin(id) {
    this.router.navigate(["/users/admins/details/" + id]);
  }
  search(){
    this.page = 0
    this.getAdmins(this.page, this.limit)
  }

  
  excel() {
    var fields = [];
    this.helper
      .getExcelAdmins(this.searchObject)
      .subscribe((res_data) => {
        let data = res_data["items"] as any[];
        data.forEach((user, index) => {
          fields.push({
            Name: "\ufeff" + user["full_name"],
            Phone: user["phone_number"],
            Email: user["email"]
          });
        });

        jsonexport(fields, function (err, csv) {
          if (err) return console.log(err);
          var blob = new Blob(["\uFEFF" + csv], {
            type: "text/csv;charset=utf-8",
          });
          var url = window.URL.createObjectURL(blob);
          var element = document.createElement("a");
          element.setAttribute("href", encodeURI(url));
          element.setAttribute("download", "الادارة" + ".csv");
          element.style.display = "none";
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        });
      });
  }

  reset(){
    this.searchObject = {
      name:"",
      email:"",
      phone_number: ""
    }
    this.search()
  }

  blockUnBlock(id: number, isBlock: Boolean) {
    this.helper
      .blockUnblockAdmin({
        isBlock: !isBlock,
        _id: id,
      })
      .subscribe((x) => {
        if (x[appConstant.STATUS]) {
          this.toastr.success(x[appConstant.MESSAGE]);
          this.search();
        } else {
          this.toastr.error(x[appConstant.MESSAGE]);
        }
      });
  }

}
