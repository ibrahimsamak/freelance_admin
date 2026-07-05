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
  selector: "app-store-messages",
  templateUrl: "./store-messages.component.html",
  styleUrls: ["./store-messages.component.scss"],
})
export class StoreMessagesComponent implements OnInit {
  messages = [];
  messageObject = {
    _id: "",
    title: "",
    message: "",
    to_id: "",
    to_name: "",
    from_id: "",
    from_name: "",
    msg: "",
  };
  type = "";
  page = 0;
  limit = 20;
  collectionCount = 0;
  size = 0;
  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.page = 0;
    this.limit = 20;
    this.getMyMessages(this.page, this.limit);
  }

  getMyMessages(page, limit) {
    this.helper.getMyMessages(page, limit).subscribe((x) => {
      let arr = x[appConstant.ITEMS] as any[];
      this.collectionCount = x[appConstant.PAGINATION]["totalElements"];
      this.size = x[appConstant.PAGINATION]["size"];

      this.messages = arr;
      this.page = page + 1;
    });
  }

  openComplaints(content, obj) {
    if (obj) {
      this.messageObject.msg = obj.message;
      this.messageObject._id = obj._id;
      this.messageObject.to_name = obj.from_name;
      this.messageObject.to_id = obj.from_id;
    }
    this.modalService.open(content, { size: "lg" });
  }

  saveAction() {
    this.messageObject.from_id = localStorage.getItem("admin_id");
    this.messageObject.from_name = localStorage.getItem("admin_username");

    this.helper.replyMessage(this.messageObject).subscribe((x) => {
      if (x[appConstant.STATUS] != true) {
        this.toastr.error(x[appConstant.MESSAGE]);
        this.messageObject = {
          _id: "",
          title: "",
          message: "",
          to_id: "",
          to_name: "",
          from_id: "",
          from_name: "",
          msg: "",
        };
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
        this.helper.deleteMessage(id).subscribe((x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
          }
          if (this.size == 1 && this.page != 1) this.page = this.page - 2;
          else this.page = this.page - 1;
          this.getMyMessages(this.page, this.limit);
        });
      }
    });
  }

  public onPageChange(pageNum: number): void {
    this.page = pageNum - 1;
    this.helper.getMyMessages(this.page, this.limit).subscribe((x) => {
      let arr = x[appConstant.ITEMS] as any[];
      this.collectionCount = x[appConstant.PAGINATION]["totalElements"];
      this.messages = arr;
      this.page = pageNum;
    });
  }
}
