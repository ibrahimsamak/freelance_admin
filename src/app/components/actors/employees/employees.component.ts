import { Component, OnInit } from "@angular/core";
import { appConstant } from "src/app/service/appConstant";
import { ConstantServiceWrapper } from "../../../service/ConstantServiceWrapper.service";
import {
  NgbActiveModal,
  NgbModal,
  NgbModalConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ar } from "date-fns/locale";
declare var require;
const Swal = require("sweetalert2");
import * as jsonexport from "jsonexport/dist";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.scss"],
})
export class EmployeesComponent implements OnInit {
  showLoader = false;
  search_field = "full_name";
  search_value = "";
  users = [];
  totalElements = 0;
  page = 0;
  limit = 12;
  images = [5, 6, 7];
  SMS_TXT = "";
  NOT_TITLe_TXT = "";
  NOT_MSG_TXT = "";
  userId = "";
  user_type = "active";

  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.getEmployees(this.page, this.limit);
  }

  getEmployees(page, limit) {
    this.helper
      .getEmployees(page, limit, {
        search_field: this.search_field,
        search_value: this.search_value,
        user_type:this.user_type
      })
      .subscribe((x) => {
        if (x[appConstant.STATUS]) {
          let arr = x[appConstant.ITEMS] as any[];
          this.totalElements = x[appConstant.PAGINATION]["totalElements"];
          this.users = [...this.users, ...arr];
          this.showLoader = false;
        } else {
          this.toastr.error(x[appConstant.MESSAGE]);
        }
      });
  }

  loadMore() {
    this.showLoader = true;
    this.page = this.page + 1;
    this.getEmployees(this.page, this.limit);
  }
  search() {
    this.page = 0;
    this.helper
      .getEmployees(this.page, this.limit, {
        search_field: this.search_field,
        search_value: this.search_value,
        user_type:this.user_type
      })
      .subscribe((x) => {
        if (x[appConstant.STATUS]) {
          let arr = x[appConstant.ITEMS] as any[];
          this.totalElements = x[appConstant.PAGINATION]["totalElements"];
          this.users = arr;
          this.showLoader = false;
        } else {
          this.toastr.error(x[appConstant.MESSAGE]);
        }
      });
  }

  excel() {
    var fields = [];
    this.helper
      .getEmployeeExcel({
        search_field: this.search_field,
        search_value: this.search_value,
        user_type:this.user_type
      })
      .subscribe((res_data) => {
        let data = res_data["items"] as any[];
        data.forEach((user, index) => {
          fields.push({
            Name: "\ufeff" + user["full_name"],
            Phone: user["phone_number"],
            Email: user["email"],
            Address: "\ufeff" + user["address"],
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
          element.setAttribute("download", "الموظفين" + ".csv");
          element.style.display = "none";
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        });
      });
  }

  blockUnBlock(id: number, isBlock: Boolean) {
    Swal.fire({
      title: "تحذير",
      text: this.translate.instant("Confirm"),
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: this.translate.instant("Yes"),
      cancelButtonText: this.translate.instant("Cancel"),
    }).then((result) => {
      if (result.value) {
      this.helper
        .blockUnblockEmployee({
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
    });
  }

  sendSMS() {
    this.helper
      .sendEmplyeeSMS(this.userId, { msg: this.SMS_TXT })
      .subscribe((x) => {
        if (x[appConstant.STATUS]) {
          this.toastr.success(x[appConstant.MESSAGE]);
          this.modalService.dismissAll();
        } else {
          this.toastr.error(x[appConstant.MESSAGE]);
        }
      });
  }

  openSMS(content, id) {
    this.userId = id;
    this.SMS_TXT = "";
    this.modalService.open(content, { size: "lg" });
  }

  openNotification(content, id) {
    this.userId = id;
    this.NOT_MSG_TXT = "";
    this.NOT_TITLe_TXT = "";
    this.modalService.open(content, { size: "lg" });
  }

  sendNotification() {
    this.helper
      .addSingleNotifications(this.userId, {
        title: this.NOT_TITLe_TXT,
        msg: this.NOT_MSG_TXT,
        type: 3,
      })
      .subscribe((x) => {
        if (x[appConstant.STATUS]) {
          this.toastr.success(x[appConstant.MESSAGE]);
          this.modalService.dismissAll();
        } else {
          this.toastr.error(x[appConstant.MESSAGE]);
        }
      });
  }

  addNew() {
    this.router.navigate(["/users/employee/details"]);
  }
}
