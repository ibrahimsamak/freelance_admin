import { Component, OnInit } from "@angular/core";
import { appConstant, UserType } from "src/app/service/appConstant";
import { ConstantServiceWrapper } from "../../../service/ConstantServiceWrapper.service";
import {
  NgbActiveModal,
  NgbModal,
  NgbModalConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { MomentDateFormatter } from "../../../service/utils_function";
import { ar } from "date-fns/locale";
declare var require;
const Swal = require("sweetalert2");
import * as jsonexport from "jsonexport/dist";
import { TranslateService } from "@ngx-translate/core";
import { OrderDetailsPoPComponent } from "src/app/shared/components/order-details/order-details.component";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  momentFormat = new MomentDateFormatter();
  reaseon = "";
  orderDetails = {};
  searchObject = {
    dt_from: "",
    dt_to: "",
    status: 'finished',
    supplier_id: "",
    place_id:""
  };
  orders = [];
  stores = [];
  places = [];
  providers = [];

  page = 0;
  limit = 10;
  collectionCount = 0;
  dt_from = "";
  dt_to = "";
  Admin_Total: 0;
  provider_Total: 0;
  Total: 0;
  userType;

  public get UserType(): typeof UserType {
    return UserType;
  }
  lang = ""

  constructor(
    private translate: TranslateService,
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.userType = localStorage.getItem("type");
    this.lang = this.translate.currentLang
    if(this.userType == UserType.STORE){
      this.searchObject.supplier_id =  localStorage.getItem("admin_id");
      this.changeSupplier(this.searchObject.supplier_id)
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
   
  }

  ngOnInit(): void {
    this.getAllProviders()
    this.getOrder(this.page, this.limit, this.searchObject);
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
        this.Admin_Total = x["Admin_Total"];
        this.provider_Total = x["provider_Total"];
        this.Total = x["Total"];
        this.collectionCount = x["pagination"]["totalElements"];
        this.orders = arr;
        this.page = page + 1;
      } else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }

  updateOrder(id, status) {
    this.helper
      .updateOrderStatus(id, { statusId: status, notes: this.reaseon })
      .subscribe((x) => {
        if (x[appConstant.STATUS] != true) {
          this.toastr.error(x[appConstant.MESSAGE]);
        } else {
          this.toastr.success(x[appConstant.MESSAGE]);
        }
        this.modalService.dismissAll();
        this.getOrder(0, this.limit, this.searchObject);
      });
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
        this.Admin_Total = x["Admin_Total"];
        this.provider_Total = x["provider_Total"];
        this.Total = x["Total"];
      });
  }

  openOrder(content, obj) {
    this.orderDetails = obj;
    const modalRef = this.modalService.open(OrderDetailsPoPComponent,{ size: "lg" })
    modalRef.componentInstance.orderDetails = this.orderDetails;
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
      status: "finished",
      supplier_id: "",
      place_id:""
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
    this.helper
      .getOrderExcel(this.searchObject)
      .subscribe((res_data) => {
        let data = res_data["items"] as any[];
        data.forEach((user, index) => {
          fields.push({
            "Order No": "\ufeff" + user["order_no"],
            "Date": "\ufeff" + user["createAt"],
            "Provider": "\ufeff" + user["provider"]["name"],
            "Supervisor": "\ufeff" + user["supervisor"]["name"],
            "Employee":  "\ufeff" + user["employee"]["full_name"],
            "User": "\ufeff" + user["employee"]["full_name"],
            "Tax": "\ufeff" + user["tax"],
            "Total Discount": "\ufeff" + user["totalDiscount"],
            "Total": "\ufeff" + user["total"],
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
          element.setAttribute("download", "الحركات المالية" + ".csv");
          element.style.display = "none";
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        });
      });
  }
}
