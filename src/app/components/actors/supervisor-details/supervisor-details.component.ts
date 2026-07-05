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
  selector: 'app-supervisor-details',
  templateUrl: './supervisor-details.component.html',
  styleUrls: ['./supervisor-details.component.scss']
})
export class SupervisorDetailsComponent implements OnInit {
  public formData = new FormData();
  status = ""
  providers = []
  cities = [];
  places = [];
  employees = [];

  userDetails = {
    _id: "",
    name: "",
    image: "",
    email: "",
    password: "",
    phone_number: "",
    supplier_id: "",
    city_id:"",
    place_id:"",
    createAt:""
  };
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

  time = {
    _id: "",
    from: "",
    to: "",
    supplier_id: "",
  };
  type = "";
  lang = "";
  public get UserType(): typeof UserType {
    return UserType;
  }

  constructor(
    private translate: TranslateService,
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) {
    this.userType = localStorage.getItem("type");
    this.lang = this.translate.currentLang
  }

  ngOnInit(): void {
    this.getAllProviders();
    this.getUserById();
  }

  getOrders(id, status, page, limit) {
    if (id)
      this.helper.getSupervisorOrders(id, status, page, limit).subscribe((x) => {
        if (x[appConstant.STATUS]) this.orders = x[appConstant.ITEMS] as any[];
        else this.toastr.error(x[appConstant.MESSAGE]);
      });
  }

  getEmployees(id) {
    if (id)
      this.helper.getProviderEmployees(id).subscribe((x) => {
        if (x[appConstant.STATUS]) this.employees = x[appConstant.ITEMS] as any[];
        else this.toastr.error(x[appConstant.MESSAGE]);
      });
  }

  getUserById() {
    this.route.params.subscribe((params: Params) => {
      let user_id = params["id"] == undefined ? null : params["id"];
      if (user_id) {
        this.user_id = user_id;
        this.helper.getSingleSupervisor(user_id).subscribe((x) => {
          if (x[appConstant.STATUS]) {
            let object = x[appConstant.ITEMS] as any;
            this.userDetails = object;
            this.orders = [];
            this.followings = [];
            // this.times = [];
            this.changeSupplier(this.userDetails.supplier_id);
            this.getOrders(this.user_id, this.status, this.orderPage, this.orderLimit);
            this.getEmployees(this.user_id);
          } else this.toastr.error(x[appConstant.MESSAGE]);
        });
      }
    });
  }

  getAllProviders() {
    this.helper.getAllProviders().subscribe((x) => {
      this.providers = x[appConstant.ITEMS] as any[];
    });
  }

  saveUser() {
    this.formData = new FormData();
    this.formData.append("_id", this.userDetails._id);
    this.formData.append("name", this.userDetails.name);
    this.formData.append("phone_number", this.userDetails.phone_number);
    this.formData.append("email", this.userDetails.email);
    this.formData.append("password", this.userDetails.password);
    this.formData.append("supplier_id", String(this.userDetails.supplier_id));
    this.formData.append("city_id", String(this.userDetails.city_id));
    this.formData.append("place_id", String(this.userDetails.place_id));
    this.formData.append("image", this.image);

    if (this.user_id) {
      this.showLoader = true;
      this.helper.updateSupervisor(this.formData).subscribe(
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
      this.helper.addSupervisor(this.formData).subscribe(
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
    if ($event.nextId === "tab-employee") {
      this.getEmployees(this.user_id);
    }
  }

  public onOrderPageChange(pageNum: number): void {
    this.orderPage = pageNum - 1;
    this.helper
      .getSupervisorOrders(this.user_id,  this.status, this.orderPage, this.orderLimit)
      .subscribe((x) => {
        let arr = x[appConstant.ITEMS] as any[];
        this.orderCollectionCount = x["pagination"]["totalElements"];
        this.orders = arr;
        this.orderPage = pageNum;
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

  changeSupplier(event) {
    console.log(event);
    let supplier = this.providers.find((x) => x._id == event);
    // let suplier_id = event;
    if (supplier) {
      this.userDetails.supplier_id = supplier._id;
      this.cities = supplier.cities;
    }
    if(this.user_id){
      this.changeCity(this.userDetails.city_id);
    }
    // console.log(this.cities);
  }

  changeCity(event) {
    let city = this.cities.find((x) => x._id == event);
    // let suplier_id = event;
    if (city) {
      this.userDetails.city_id = city._id;
      this.helper.getAllPlaces(city._id).subscribe((x) => {
        this.places = x[appConstant.ITEMS] as any[];
      });
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
      .getSupervisorOrdersExcel(this.user_id, this.status)
      .subscribe((res_data) => {
        let data = res_data["items"] as any[];
        data.forEach((user, index) => {
          fields.push({
              Name: "\ufeff" + ((user["user"] != undefined && user["user"] != null) ? user["user"]["full_name"] : ""),
              Provider: "\ufeff" + ((user["provider"] != undefined && user["provider"] != null) ? user["provider"]["name"] : ""),
              Supervisor: "\ufeff" + ((user["supervisor"] != undefined && user["supervisor"] != null) ? user["supervisor"]["name"] : ""),
              Employee: "\ufeff" + ((user["employee"] != undefined && user["employee"] != null) ? user["employee"]["full_name"] : ""),
              Place: "\ufeff" + ((user["place"] != undefined && user["place"] != null) ? user["place"]["arName"]:""),
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
          element.setAttribute("download", "طلبات المشرفين" + ".csv");
          element.style.display = "none";
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        });
      });
  }
}