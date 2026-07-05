import { Component, OnInit } from "@angular/core";
import { appConstant, UserType } from "src/app/service/appConstant";
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
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.scss"],
})
export class CommentsComponent implements OnInit {
  momentFormat = new MomentDateFormatter();

  reaseon = "";
  orderDetails = {};
  searchObject = {
    dt_from: "",
    dt_to: "",
    type: 2
  };
  dt_from: "";
  dt_to: "";
  comments = [];
  stores = [];

  page = 0;
  limit = 15;
  collectionCount = 0;
  size = 0;
  notes = "";
  userType;
  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private translate: TranslateService,
  ) {
    this.userType = localStorage.getItem("type");
   
  }

  ngOnInit(): void {
    this.getOrder(this.page, this.limit, this.searchObject);
  }

  getOrder(page, limit, filter) {
    this.helper.getOrdersRate(page, limit, filter).subscribe((x) => {
      if (x[appConstant.STATUS]) {
        let arr = x[appConstant.ITEMS] as any[];
        this.collectionCount = x["pagination"]["totalElements"];
        this.size = x["pagination"]["size"];
        this.comments = arr;
        this.page = page + 1;
      } else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }

  deleteComment(id) {
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
        this.helper.deleteRate(id).subscribe((x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
          }
          if (this.size == 1 && this.page != 1) this.page = this.page - 2;
          else this.page = this.page - 1;
          this.getOrder(this.page, this.limit, this.searchObject);
        });
      }
    });
  }

  public onPageChange(pageNum: number): void {
    this.page = pageNum - 1;
    this.helper
      .getOrdersRate(this.page, this.limit, this.searchObject)
      .subscribe((x) => {
        let arr = x[appConstant.ITEMS] as any[];
        this.collectionCount = x["pagination"]["totalElements"];
        this.comments = arr;
        this.page = pageNum;
      });
  }

  openDetails(content, notes) {
    this.notes = notes;
    this.modalService.open(content, { size: "lg" });
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
    this.getOrder(this.page, this.limit, this.searchObject);
  }

  reset() {
    this.dt_from = "";
    this.dt_to = "";
    this.searchObject = {
      dt_from: "",
      dt_to: "",
      type: 2
    };
    this.page = 0;
    this.getOrder(this.page, this.limit, this.searchObject);
  }
}
