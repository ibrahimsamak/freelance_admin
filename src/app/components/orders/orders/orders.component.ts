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
import { ActivatedRoute, Params } from "@angular/router";
import * as jsonexport from "jsonexport/dist";
import { OrderDetailsPoPComponent } from "src/app/shared/components/order-details/order-details.component";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent implements OnInit {
  momentFormat = new MomentDateFormatter();

  reaseon = "";
  orderDetails = {};
  searchObject = {
    dt_from: "",
    dt_to: "",
    status: "new",
    order_no: "",
    supplier_id: "",
    place_id: ""
  };
  dt_from: "";
  dt_to: "";
  orders = [];
  providers = [];
  employees = [];
  places = [];

  page = 0;
  limit = 10;
  collectionCount = 0;
  userType;
  size = 0;
  employee_id;
  public get UserType(): typeof UserType {
    return UserType;
  }

  lang = ""
  constructor(
    private translate: TranslateService,
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) {
    this.userType = localStorage.getItem("type");
    this.lang = this.translate.currentLang
    if(this.userType == UserType.STORE){
      this.searchObject.supplier_id =  localStorage.getItem("admin_id");
      this.changeSupplier(this.searchObject.supplier_id)
      this.getOrder(this.page, this.limit, this.searchObject);
    }
    if(this.userType == UserType.SUPERVISOR){
      this.helper.getSingleSupervisor(localStorage.getItem("admin_id")).subscribe(x=>{
        let object = x[appConstant.ITEMS] as any;
        this.searchObject.supplier_id =  object.supplier_id
        this.searchObject.place_id =  object.place_id
        this.changeSupplier(this.searchObject.supplier_id)
        this.getOrder(this.page, this.limit, this.searchObject);
      })
    }

    this.route.params.subscribe((params: Params) => {
      let id = params["id"] == undefined ? null : params["id"];
      if (id) {
        if(id == "الطلبات الجديدة"){
          this.searchObject.status = "new"
        }
        if(id == "قيد التنفيذ"){
          this.searchObject.status = "started"
        }
        if(id == "الطلبات الملغية"){
          this.searchObject.status = "canceled"
        }
        if(id == "الطلبات المكتملة"){
          this.searchObject.status = "finished"
        }
        if(id == "تم القبول"){
          this.searchObject.status = "accepted"
        }
        if(id == "تم التعديل"){
          this.searchObject.status = "updated"
        }
        if(id == "كل الطلبات"){
          this.searchObject.status= ""
        }
        console.log(this.searchObject.status);
        this.changeStatus(this.searchObject.status)
        // this.getOrder(this.page, this.limit, this.searchObject);
      }else{
        this.getOrder(this.page, this.limit, this.searchObject);
      }
    });
  }

  ngOnInit(): void {
    this.getAllProviders()
  }

  getAllProviders() {
    this.helper.getAllProviders().subscribe((x) => {
      this.providers = x[appConstant.ITEMS] as any[];
    });
  }


  getOrder(page, limit, filter) {
    this.helper.getOrders(page, limit, filter).subscribe((x) => {
      if (x[appConstant.STATUS]) {
        let arr = x[appConstant.ITEMS] as any[];
        this.collectionCount = x["pagination"]["totalElements"];
        this.size = x["pagination"]["size"];
        this.orders = arr;
        this.page = page + 1;
      } else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }

  updateOrder(id, status) {
    var data = {};
    if (status == 'accepted') data = { employee: this.employee_id, status: 'accepted' };
    else data = { status: status, notes: this.reaseon };
    this.helper.updateOrderStatus(id, data).subscribe(
      (x) => {
        if (x[appConstant.STATUS] != true) {
          this.toastr.error(x[appConstant.MESSAGE]);
        } else {
          this.toastr.success(x[appConstant.MESSAGE]);
        }
        this.modalService.dismissAll();
        if (this.size == 1 && this.page != 1) this.page = this.page - 2;
        else this.page = this.page - 1;
        this.getOrder(this.page, this.limit, this.searchObject);
      },
      (error) => {
        this.helper.serverSideErrorHandler(error);
      }
    );
  }

  public onPageChange(pageNum: number): void {
    this.page = pageNum - 1;
    this.helper
      .getOrders(this.page, this.limit, this.searchObject)
      .subscribe((x) => {
        let arr = x[appConstant.ITEMS] as any[];
        this.collectionCount = x["pagination"]["totalElements"];
        this.orders = arr;
        this.page = pageNum;
      });
  }

  openOrder(content, obj) {
      this.orderDetails = obj;
      const modalRef = this.modalService.open(OrderDetailsPoPComponent,{ size: "lg" })
      modalRef.componentInstance.orderDetails = this.orderDetails;
  }
  

  openOrderDriver(content, obj) {
    this.helper.getEmployeesByStore(obj.provider._id).subscribe((x) => {
      this.employees = x[appConstant.ITEMS] as any[];
      this.orderDetails = obj;
      this.modalService.open(content, { size: "lg" });
    });
  }

  openCancel(content, obj){
    this.orderDetails = obj
    this.modalService.open(content, { size: "lg" })
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

  changeStatus(statusId) {
    this.searchObject.status = statusId;
    this.page = 0;
    this.getOrder(this.page, this.limit, this.searchObject);
  }

  reset() {
    this.dt_from = "";
    this.dt_to = "";
    this.searchObject = {
      dt_from: "",
      dt_to: "",
      status: "new",
      order_no: "",
      supplier_id: "",
      place_id: ""
    };
    this.page = 0;
    this.getOrder(this.page, this.limit, this.searchObject);
  }

  getOfferUser(item:any){
    let offers = item.offers.find(x=>String(x.status) == "accept_offer")
    console.log(offers)
    return offers && offers.user ? offers.user.full_name : ""
  }

  changeSupplier(event) {
    this.helper.getAllPlacesDelivery(event).subscribe((x) => {
      this.places = x[appConstant.ITEMS] as any[];
    });
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
      .getOrdersExcel(this.searchObject)
      .subscribe((res_data) => {
        let data = res_data["items"] as any[];
        data.forEach((user, index) => {
          fields.push({
             "Order No": "\ufeff" + (user["order_no"]),
              Name: "\ufeff" + ((user["user"] != undefined && user["user"] != null) ? user["user"]["full_name"] : ""),
              Provider: "\ufeff" + ((user["provider"] != undefined && user["provider"] != null) ? user["provider"]["full_name"] : ""),
              City: "\ufeff" + ((user["city"] != undefined && user["city"] != null) ? user["city"]["arName"] : ""),
              Date: "\ufeff" + user["dt_date"],
              Category: "\ufeff" + user["category"]["arName"],
              Type: "\ufeff" + (user["order_type"] == 'service' ? "خدمة" : "وظيفة"),
              Target: "\ufeff" + (user["offer_type"] == 'online' ? "عن بعد" : "في الموقع"),
              Personality: "\ufeff" + (user["target"] == 'personal' ? "فريلانسر" : "عميل"),
              "Price time": "\ufeff" + (user["price_type"] == 'hourly' ? "ساعة" : "مبلغ"),
              "Execution Type": "\ufeff" + (user["execution_type"] == 'limited' ? "محدود" : "غير محدود"),
              Title: "\ufeff" + (user["title"]),
              Desciption: "\ufeff" + (user["bio"]),
              "Employee No": "\ufeff" + (user["employee_no"]),
              "Days": "\ufeff" + (user["days"]),
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
          element.setAttribute("download", "الطلبات" + ".csv");
          element.style.display = "none";
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        });
      });
  }
}
