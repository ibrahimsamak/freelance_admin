import { Component, OnInit } from "@angular/core";
import { appConstant } from "src/app/service/appConstant";
import { ConstantServiceWrapper } from "../../../service/ConstantServiceWrapper.service";
import {
  NgbActiveModal,
  NgbModal,
  NgbModalConfig,
  NgbTabChangeEvent,
} from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ar } from "date-fns/locale";
import { ActivatedRoute, Params } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
declare var require;
const Swal = require("sweetalert2");
import * as jsonexport from "jsonexport/dist";
import { OrderDetailsPoPComponent } from "src/app/shared/components/order-details/order-details.component";

@Component({
  selector: "app-employees-details",
  templateUrl: "./employees-details.component.html",
  styleUrls: ["./employees-details.component.scss"],
})
export class EmployeesDetailsComponent implements OnInit {
  public formData = new FormData();
  public zoom_m1: number = 13;
  status = ""
  user_address = {};
  discount = "0";
  cities = [];
  places = [];
  userDetails = {
    _id: "",
    full_name: "",
    image: "",
    email: "",
    address: "",
    phone_number: "",
    os: "",
    supervisor_id: "",
    password: "",
    createAt:""
  };
  countries = [];
  providers = [];

  orders = [];
  addresses = [];
  followings = [];

  ratePage = 0;
  rateLimit = 10;
  rateCollectionCount;
  rateSize = 0;

  orderPage = 0;
  orderLimit = 10;
  orderCollectionCount = 0;

  followPage = 0;
  followLimit = 10;
  followCollectionCount;

  user_id;
  note = "";
  orderDetails = {};
  showLoader = false;
  image = "";
  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.getAllSupervisor();
    this.getUserById();
  }

  getOrders(id, status, page, limit) {
    this.helper.getEmployeesOrders(id, status,page, limit).subscribe((x) => {
      if (x[appConstant.STATUS]) this.orders = x[appConstant.ITEMS] as any[];
      else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }

  getUserById() {
    this.route.params.subscribe((params: Params) => {
      let user_id = params["id"] == undefined ? null : params["id"];
      if (user_id) {
        this.user_id = user_id;
        this.helper.getSingleEmployee(user_id).subscribe((x) => {
          if (x[appConstant.STATUS]) {
            let object = x[appConstant.ITEMS] as any;
            this.userDetails = object;
            this.orders = [];
          } else this.toastr.error(x[appConstant.MESSAGE]);
        });
        this.getOrders(this.user_id, this.status, this.orderPage, this.orderLimit);
      }
    });
  }

  getAllSupervisor() {
    this.helper.getAllSupervisor().subscribe((x) => {
      this.providers = x[appConstant.ITEMS] as any[];
    });
  }

  saveUser() {
    this.formData = new FormData();
    this.formData.append("_id", this.userDetails._id);
    this.formData.append("full_name", this.userDetails.full_name);
    this.formData.append("os", this.userDetails.os);
    this.formData.append("phone_number", this.userDetails.phone_number);
    this.formData.append("address", this.userDetails.address);
    this.formData.append("email", this.userDetails.email);
    this.formData.append("password", this.userDetails.password);
    this.formData.append("image", this.image);

    this.formData.append("supervisor_id", this.userDetails.supervisor_id);

    if (this.user_id) {
      this.showLoader = true;
      this.helper.updateEmployee(this.formData).subscribe(
        (x) => {
          this.showLoader = false;
          if (x[appConstant.STATUS]) {
            this.toastr.success(x[appConstant.MESSAGE]);
            this.formData = new FormData();
          } else {
            this.toastr.error(x[appConstant.MESSAGE]);
            this.formData = new FormData();
          }
        },
        (error) => {
          this.showLoader = false;
          this.helper.serverSideErrorHandler(error);
        }
      );
    } else {
      if (this.userDetails.image == "") {
        this.toastr.error(this.translate.instant('ImageRequired'))
        return;
      }
      this.showLoader = true;
      this.helper.addEmployee(this.formData).subscribe(
        (x) => {
          this.showLoader = false;
          if (x[appConstant.STATUS]) {
            this.toastr.success(x[appConstant.MESSAGE]);
            this.formData = new FormData();
          } else {
            this.toastr.error(x[appConstant.MESSAGE]);
            this.formData = new FormData();
          }
        },
        (error) => {
          this.showLoader = false;
          this.helper.serverSideErrorHandler(error);
        }
      );
    }
  }

  processImage(event) {
    console.log(event.target.files);
    if (event.target.files && event.target.files[0]) {
      this.image = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.userDetails.image = reader.result as any;
      };
    }
  }

  public beforeChange($event: NgbTabChangeEvent) {
    console.log($event);
    if ($event.nextId === "tab-orders") {
      // $event.preventDefault();
      this.orderPage = 0;
      this.orderLimit = 10;
      this.orderCollectionCount = 0;
      this.getOrders(this.user_id, this.status, this.orderPage, this.orderLimit);
    }
  }

  public onOrderPageChange(pageNum: number): void {
    this.orderPage = pageNum - 1;
    this.helper
      .getEmployeesOrders(this.user_id, this.status, this.orderPage, this.orderLimit)
      .subscribe((x) => {
        let arr = x[appConstant.ITEMS] as any[];
        this.orderCollectionCount = x["pagination"]["totalElements"];
        this.orders = arr;
        this.orderPage = pageNum;
      });
  }

  openDetails(content, obj) {
    this.user_address = obj;
    this.modalService.open(content, { size: "lg" });
  }

  openOrder(content, obj) {
    this.orderDetails = obj;
    const modalRef = this.modalService.open(OrderDetailsPoPComponent,{ size: "lg" })
    modalRef.componentInstance.orderDetails = this.orderDetails;
}

  changeStatus(statusId) {
    this.status = statusId;
    this.orderPage = 0;
    this.getOrders(this.user_id, this.status, this.orderPage, this.orderLimit);
  }

  excel() {
    var fields = [];
    this.helper
      .getEmployeesOrdersExcel(this.user_id, this.status)
      .subscribe((res_data) => {
        let data = res_data["items"] as any[];
        data.forEach((user, index) => {
          console.log( user["supervisor"])
          fields.push({
            Name: "\ufeff" + (user["user"] != undefined && user["user"] != null ? user["user"]["full_name"] : ""),
            Provider: "\ufeff" + ((user["provider"] != undefined && user["provider"] != null ) ? user["provider"]["name"] : ""),
            Supervisor: "\ufeff" + ((user["supervisor"] != undefined && user["supervisor"] != null ) ? user["supervisor"]["name"] : ""),
            Employee: "\ufeff" + ((user["employee"] != undefined && user["employee"] != null) ? user["employee"]["full_name"] : ""),
            Place: "\ufeff" + ((user["place"] != undefined && user["place"] != null ) ? user["place"]["arName"]:""),
            Date: "\ufeff" + user["dt_date"],
            Time: "\ufeff" + user["dt_time"],
            Type: "\ufeff" + user["category_id"]["arName"],
            Service:"\ufeff" + user["sub_category_id"]["arName"],
            Total: "\ufeff" + user["total"],
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
          element.setAttribute("download", "طلبات الموظفين" + ".csv");
          element.style.display = "none";
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        });
      });
  }
}
