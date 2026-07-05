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
import { MomentDateFormatter } from "../../../service/utils_function";
import * as jsonexport from "jsonexport/dist";

@Component({
  selector: "app-notifcations-list",
  templateUrl: "./notifcations-list.component.html",
  styleUrls: ["./notifcations-list.component.scss"],
})
export class NotifcationsListComponent implements OnInit {
  momentFormat = new MomentDateFormatter();

  reaseon = "";
  orderDetails = {};
  searchObject = {
    dt_from: "",
    dt_to: "",
    provider_id: "",
  };

  dt_from: "";
  dt_to: "";
  notifications = [];

  page = 0;
  limit = 10;
  collectionCount = 0;
  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getNotifications(this.page, this.limit, this.searchObject);
  }

  getNotifications(page, limit, filter) {
    this.helper.getNotifications(page, limit, filter).subscribe((x) => {
      if (x[appConstant.STATUS]) {
        let arr = x[appConstant.ITEMS] as any[];
        // this.collectionCount = x["pagination"]["totalElements"];
        this.notifications = arr;
        // this.page = page + 1;
      } else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }
  

  public onPageChange(pageNum: number): void {
    this.page = pageNum - 1;
    this.helper
      .getNotifications(this.page, this.limit, this.searchObject)
      .subscribe((x) => {
        let arr = x[appConstant.ITEMS] as any[];
        // this.collectionCount = x["pagination"]["totalElements"];
        this.notifications = arr;
        // this.page = pageNum;
      });
  }

  search() {
    this.page = 0;
    if (this.dt_from != "") {
      let dt_from = this.momentFormat.format(this.dt_from as any);
      this.searchObject.dt_from = dt_from;
    }
    if (this.dt_to != "") {
      let dt_to = this.momentFormat.format(this.dt_to as any);
      this.searchObject.dt_to = dt_to;
    }
    this.getNotifications(this.page, this.limit, this.searchObject);
  }

  reset() {
    this.dt_from = "";
    this.dt_to = "";
    this.searchObject = {
      dt_from: "",
      dt_to: "",
      provider_id: "",
    };
    this.page = 0;
    this.getNotifications(this.page, this.limit, this.searchObject);
  }

  excel() {
    var fields = [];
    if (this.dt_from != "") {
      let dt_from = this.momentFormat.format(this.dt_from as any);
      this.searchObject.dt_from = dt_from;
    }
    if (this.dt_to != "") {
      let dt_to = this.momentFormat.format(this.dt_to as any);
      this.searchObject.dt_to = dt_to;
    }
    this.helper
      .getExcelNotifications(this.searchObject)
      .subscribe((res_data) => {
        let data = res_data["items"] as any[];
        data.forEach((user, index) => {
          fields.push({
            Title: "\ufeff" + user["title"],
            Message: "\ufeff" + user["msg"],
            Date: user["dt_date"],
            Sender: "\ufeff" + "Dashboard"
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
          element.setAttribute("download", "التنبيهات" + ".csv");
          element.style.display = "none";
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        });
      });
  }
}
