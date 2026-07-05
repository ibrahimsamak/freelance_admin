import { Component, OnInit } from "@angular/core";
import { appConstant, UserType } from "src/app/service/appConstant";
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
  selector: "app-designers-details",
  templateUrl: "./providers-details.component.html",
  styleUrls: ["./providers-details.component.scss"],
})
export class ProvidersDetailsComponent implements OnInit {
  public formData = new FormData();

  userDetails = {
    _id: "",
    full_name: "",
    image: "",
    email: "",
    address: "",
    phone_number: "",
    os: "",
    city_id: "",
    country_id: "",
    streetName:"",
    buildingNo:"",
    floorNo:"",
    flatNo:"",
    createAt:"",
    app_type:"",
    register_type:"",
    categories:[],
    city:"",
    id_image:""

  };
  status = ""
  cover = null;
  image = null;
  countries = [];
  citiesArray = [];

  orders = [];
  times = [];
  followings = [];

  timePage = 0;
  timeLimit = 10;
  timeCollectionCount;
  timeSize = 0;

  orderPage = 0;
  orderLimit = 10;
  orderCollectionCount = 0;

  followPage = 0;
  followLimit = 10;
  followCollectionCount;

  user_id;
  note = "";
  showLoader = false;
  orderDetails;
  userType;
  styles = []
  time = {
    _id: "",
    from: "",
    to: "",
    supplier_id: "",
  };
  type = "";
  works = []
  categoriesArr = []
  public get UserType(): typeof UserType {
    return UserType;
  }

  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private translate: TranslateService,
  ) {
    this.userType = localStorage.getItem("type");
  }

  ngOnInit(): void {
    this.getCategories()
    this.getAllCity();
    this.getUserById();
  }

  getCategories() {
    this.helper.getCategoy().subscribe((x) => {
      this.categoriesArr = x[appConstant.ITEMS] as any[];
    });
  }

  getTimes(id) {
    this.helper.getTimeProviderList(id).subscribe((x) => {
      if (x[appConstant.STATUS]) {
        this.times = x[appConstant.ITEMS] as any[];
      } else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }

  getOrders(id, status ,page, limit) {
    if (id)
      this.helper.getProviderOrders(id, status, page, limit).subscribe((x) => {
        if (x[appConstant.STATUS]) this.orders = x[appConstant.ITEMS] as any[];
        else this.toastr.error(x[appConstant.MESSAGE]);
      });
  }

  getUserById() {
    this.route.params.subscribe((params: Params) => {
      let user_id = params["id"] == undefined ? null : params["id"];
      if (user_id) {
        this.user_id = user_id;
        this.helper.getSingleProvider(user_id).subscribe((x) => {
          if (x[appConstant.STATUS]) {
            let object = x[appConstant.ITEMS] as any;
            this.userDetails = object;
            this.userDetails.app_type  = this.userDetails.app_type == 'customer' ? "عميل" : "مزود خدمة"
            this.userDetails.register_type  = this.userDetails.register_type == 'personal' ? "فريلانسر" : "عميل"
            this.orders = [];
            this.followings = [];
            // this.times = [];
            this.getTimes(this.user_id);
            this.getOrders(this.user_id, this.status, this.orderPage, this.orderLimit);
          } else this.toastr.error(x[appConstant.MESSAGE]);
        });
      }
    });
  }

  getAllCity() {
    this.helper.getAllCityAdmin().subscribe((x) => {
      this.citiesArray = x[appConstant.ITEMS] as any[];
    });
  }

  saveUser() {
    this.formData = new FormData();

    this.formData.append("_id", this.userDetails._id);
    this.formData.append("full_name", this.userDetails.full_name);
    this.formData.append("phone_number", this.userDetails.phone_number);
    this.formData.append("email", this.userDetails.email);
    this.formData.append("image", this.image);
    this.formData.append("address", this.userDetails.address);
    this.formData.append("city", this.userDetails.city);
    var _categ= [];
    this.userDetails.categories.forEach((element) => {
      _categ.push(element._id);
    });
    this.formData.append("categories", JSON.stringify(_categ));

    if (this.user_id) {
      this.showLoader = true;
      this.helper.updateProviders(this.formData).subscribe(
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
      this.helper.addProviders(this.formData).subscribe(
        (x) => {
          this.showLoader = false;
          if (x[appConstant.STATUS]) {
            this.user_id = x[appConstant.ITEMS]["_id"];
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
      this.orderPage = 0;
      this.orderLimit = 10;
      this.orderCollectionCount = 0;
      this.getOrders(this.user_id, this.status, this.orderPage, this.orderLimit);
    }
    if ($event.nextId === "tab-comments") {
      this.getTimes(this.user_id);
    }
  }

  public onOrderPageChange(pageNum: number): void {
    this.orderPage = pageNum - 1;
    this.helper
      .getProviderOrders(this.user_id, this.status, this.orderPage, this.orderLimit)
      .subscribe((x) => {
        let arr = x[appConstant.ITEMS] as any[];
        this.orderCollectionCount = x["pagination"]["totalElements"];
        this.orders = arr;
        this.orderPage = pageNum;
      });
  }

  deleteTime(id) {
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
        this.helper.deleteTime(id).subscribe((x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
          }
          this.getTimes(this.user_id);
        });
      }
    });
  }

  openDetails(content, obj) {
    if (obj) {
      this.type = "edit";
      this.time = obj;
    } else {
      this.time = {
        _id: "",
        from: "",
        to: "",
        supplier_id: this.user_id,
      };
    }
    this.modalService.open(content, { size: "lg" });
  }

  
  openOrder(content, obj) {
    this.orderDetails = obj;
    const modalRef = this.modalService.open(OrderDetailsPoPComponent,{ size: "lg" })
    modalRef.componentInstance.orderDetails = this.orderDetails;
}

  saveTime() {
    if (this.type == "edit") {
      this.helper.updateTime(this.time._id, this.time).subscribe(
        (x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
          }
          this.modalService.dismissAll();
          this.getTimes(this.user_id);
        },
        (error) => {
          this.showLoader = false;
          this.helper.serverSideErrorHandler(error);
        }
      );
    } else {
      this.helper.addTime(this.time).subscribe(
        (x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
          }
          this.modalService.dismissAll();
          this.getTimes(this.user_id);
        },
        (error) => {
          this.showLoader = false;
          this.helper.serverSideErrorHandler(error);
        }
      );
    }
  }

  changeStatus(statusId) {
    this.status = statusId;
    this.orderPage = 0;
    this.getOrders(this.user_id, this.status, this.orderPage, this.orderLimit);
  }

  excel() {
    var fields = [];
    this.helper
      .getProviderOrdersExcel(this.user_id, this.status)
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
          element.setAttribute("download", "طلبات المزودين" + ".csv");
          element.style.display = "none";
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        });
      });
  }
}
