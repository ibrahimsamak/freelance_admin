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
import { TranslateService } from "@ngx-translate/core";
declare var require;
const Swal = require("sweetalert2");

@Component({
  selector: "app-complaints",
  templateUrl: "./complaints.component.html",
  styleUrls: ["./complaints.component.scss"],
})
export class ComplaintsComponent implements OnInit {
  complaints = [];
  complaintObject = {
    _id: "",
    email: "",
    title: "",
    message: "",
    details: "",
  };
  type = "";
  page = 0;
  limit = 20;
  collectionCount = 0;
  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.page = 0;
    this.limit = 20;
    this.getComplaints(this.page, this.limit);
  }

  getComplaints(page, limit) {
    this.helper.getComplaints(page, limit).subscribe((x) => {
      let arr = x[appConstant.ITEMS] as any[];
      this.collectionCount = x[appConstant.PAGINATION]["totalElements"];
      this.complaints = arr;
      this.page = page + 1;
    });
  }

  openComplaints(content, obj) {
    this.complaintObject.message = "";
    this.complaintObject.email = obj.email;
    this.complaintObject._id = obj._id;
    this.complaintObject.details = obj.details;
    this.modalService.open(content, { size: "lg" });
  }

  saveAction() {
    this.helper.replyComplaints(this.complaintObject).subscribe((x) => {
      if (x[appConstant.STATUS] != true) {
        this.toastr.error(x[appConstant.MESSAGE]);
      } else {
        this.toastr.success(x[appConstant.MESSAGE]);
      }
      this.modalService.dismissAll();
    });
  }

  deleteComplaints(id) {
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
        this.helper.deleteComplaints(id).subscribe((x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
          }
          this.getComplaints(this.page - 1, this.limit);
        });
      }
    });
  }

  public onPageChange(pageNum: number): void {
    this.page = pageNum - 1;
    this.helper.getComplaints(this.page, this.limit).subscribe((x) => {
      let arr = x[appConstant.ITEMS] as any[];
      this.collectionCount = x[appConstant.PAGINATION]["totalElements"];
      this.complaints = arr;
      this.page = pageNum;
    });
  }
}
