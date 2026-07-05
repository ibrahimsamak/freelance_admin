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
import { MomentDateFormatter } from "src/app/service/utils_function";

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.scss']
})
export class SupervisorComponent implements OnInit {
  momentFormat = new MomentDateFormatter();
  showLoader = false;
  search_field = "name";
  search_value = "";
  dt_to="";
  dt_from="";
  users = [];
  totalElements = 0;
  page = 0;
  limit = 12;
  images = [5, 6, 7];
  SMS_TXT = "";
  NOT_TITLe_TXT = "";
  NOT_MSG_TXT = "";
  userId = "";
  type = "1";

  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.getSupervisor(this.page, this.limit);
  }

  getSupervisor(page, limit) {
    var _dt_from;
    var _dt_to;
    if (this.dt_from != "") {
      let dt_from = this.momentFormat.format(this.dt_from as any);
      _dt_from= dt_from;
    }
    if (this.dt_to != "") {
      let dt_to = this.momentFormat.format(this.dt_to as any);
      _dt_to = dt_to;
    }
    this.helper
      .getSupervisor(page, limit, {
        search_field: this.search_field,
        search_value: this.search_value,
        dt_from: _dt_from,
        dt_to: _dt_to,
        type: this.type,
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
    this.getSupervisor(this.page, this.limit);
  }
  search() {
    this.page = 0;
    var _dt_from;
    var _dt_to;
    if (this.dt_from != "") {
      let dt_from = this.momentFormat.format(this.dt_from as any);
      _dt_from= dt_from;
    }
    if (this.dt_to != "") {
      let dt_to = this.momentFormat.format(this.dt_to as any);
      _dt_to = dt_to;
    }
    this.helper
      .getSupervisor(this.page, this.limit, {
        search_field: this.search_field,
        search_value: this.search_value,
        dt_from: _dt_from,
        dt_to: _dt_to,
        type: this.type,
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
      .getSupervisorExcel({
        search_field: this.search_field,
        search_value: this.search_value,
        type: this.type,
      })
      .subscribe((res_data) => {
        let data = res_data["items"] as any[];
        data.forEach((user, index) => {
          var country = "";
          var city = "";
          if (user["country_id"]) country = user["country_id"]["arName"];
          if (user["city_id"]) city = user["city_id"]["arName"];

          fields.push({
            Name: "\ufeff" + user["name"],
            Phone: user["phone_number"],
            Email: user["email"],
            Place: "\ufeff" + user["place_id"]["arName"],
            City: "\ufeff" +  user["city_id"]["arName"],
            Supplier: "\ufeff" +  user["supplier_id"]["name"],
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
          element.setAttribute("download", "المشرفين" + ".csv");
          element.style.display = "none";
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        });
      });
  }

  sendSMS() {
    this.helper
      .sendSupervisorSMS(this.userId, { msg: this.SMS_TXT })
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
          this.NOT_TITLe_TXT = "";
          this.NOT_MSG_TXT = "";
          this.toastr.success(x[appConstant.MESSAGE]);
          this.modalService.dismissAll();
        } else {
          this.toastr.error(x[appConstant.MESSAGE]);
        }
      });
  }

  

  blockUnBlock(id: number, isBlock: Boolean) {
    this.helper
      .blockUnblockSupervisor({
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

  addNew() {
    this.router.navigate(["/users/supervisor/details"]);
  }


  delete(id) {
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
        this.helper.deleteSupervisor({_id: id})
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
}
