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
  selector: "app-client-details",
  templateUrl: "./client-details.component.html",
  styleUrls: ["./client-details.component.scss"],
})
export class ClientDetailsComponent implements OnInit {
  public formData = new FormData();
  public zoom_m1: number = 13;
  status = ""
  user_address = {};
  discount = 0;
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
    subcategory:"",
    category:"",
    city:"",
    id_image:"",
    bio:""
  };
  countries = [];
  cities = [];

  orders = [];
  addresses = [];
  followings = [];
  user_works = [];

  ratePage = 0;
  rateLimit = 10;
  rateCollectionCount;
  rateSize = 0;

  orderPage = 0;
  orderLimit = 10;
  orderCollectionCount = 0;

  user_worksPage = 0;
  user_worksLimit = 10;
  user_worksCollectionCount = 0;

  followPage = 0;
  followLimit = 10;
  followCollectionCount;

  user_id;
  note = "";
  orderDetails = {};
  showLoader = false;
  categoriesArr = []
  works = []
  subworks = []
  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.getCityByCountryId('');
    this.getCategories()
    this.getUserById();
  }

  getCategories() {
    this.helper.getCategoy().subscribe((x) => {
      this.works = x[appConstant.ITEMS] as any[];
    });
  }

  
  getSubCategories(id) {
    this.helper.getSubCategoy(id).subscribe((x) => {
      this.subworks = x[appConstant.ITEMS] as any[];
    });
  }

  getUserAddress(id, page, limit) {
    this.helper.getUserAddress(id, page, limit).subscribe((x) => {
      if (x[appConstant.STATUS]) {
        this.addresses = x[appConstant.ITEMS] as any[];
        this.rateCollectionCount = x["pagenation"]["totalElements"];
        this.rateSize = x["pagenation"]["size"];
        this.ratePage = page + 1;
      } else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }

  getOrders(id, status, page, limit) {
    this.helper.getUserOrders(id, status, page, limit).subscribe((x) => {
      if (x[appConstant.STATUS]) this.orders = x[appConstant.ITEMS] as any[];
      else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }

  getUserWorks(id, page, limit) {
    this.helper.getUserWorks(id, page, limit).subscribe((x) => {
      if (x[appConstant.STATUS]) this.user_works = x[appConstant.ITEMS] as any[];
      else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }

  getUserById() {
    this.route.params.subscribe((params: Params) => {
      let user_id = params["id"] == undefined ? null : params["id"];
      if (user_id) {
        this.user_id = user_id;
        this.helper.getSingleUser(user_id).subscribe((x) => {
          if (x[appConstant.STATUS]) {
            let object = x[appConstant.ITEMS] as any;
            this.userDetails = object;
            this.userDetails.app_type  = this.userDetails.app_type == 'customer' ? "عميل" : "مزود خدمة"
            this.userDetails.register_type  = this.userDetails.register_type == 'personal' ? "فريلانسر" : "عميل"
            this.orders = [];
            this.followings = [];
            this.addresses = [];
            if (object.country_id) this.getCityByCountryId(object.country_id);
            if (object.category) this.changeCategory(object.category);
          } else this.toastr.error(x[appConstant.MESSAGE]);
        });
        this.getUserAddress(this.user_id, this.ratePage, this.rateLimit);
        //this.getOrders(this.user_id, this.status, this.orderPage, this.orderLimit);
        this.getUserWorks(this.user_id, this.user_worksPage, this.user_worksLimit);
      }
    });
  }

  getAllCountries() {
    this.helper.getCountry().subscribe((x) => {
      this.countries = x[appConstant.ITEMS] as any[];
    });
  }

  getCityByCountryId(country_id) {
    this.helper.getAllCity(country_id).subscribe((x) => {
      this.cities = x[appConstant.ITEMS] as any[];
    });
  }

  onOptionsSelected(val) {
    let counrty_id = val.target.value;
    this.getCityByCountryId(counrty_id);
  }

  saveUser() {
    this.formData.append("_id", this.userDetails._id);
    this.formData.append("full_name", this.userDetails.full_name);
    this.formData.append("country_id", this.userDetails.country_id);
    this.formData.append("city_id", this.userDetails.city_id);
    this.formData.append("os", this.userDetails.os);
    this.formData.append("phone_number", this.userDetails.phone_number);
    this.formData.append("email", this.userDetails.email);
   
    this.formData.append("streetName", this.userDetails.streetName);
    this.formData.append("flatNo", this.userDetails.flatNo);
    this.formData.append("floorNo", this.userDetails.floorNo);
    this.formData.append("buildingNo", this.userDetails.buildingNo);
    this.formData.append("city", this.userDetails.city);
    this.formData.append("address", this.userDetails.address);
    this.formData.append("category", this.userDetails.category);
    this.formData.append("subcategory", this.userDetails.subcategory);
    this.formData.append("bio", this.userDetails.bio);

    this.showLoader = true;
    this.helper.updateUser(this.formData).subscribe(
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

  processImage(event) {
    console.log(event.target.files);
    if (event.target.files && event.target.files[0]) {
      this.formData.append("image", event.target.files[0]);
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
      this.user_worksPage = 0;
      this.user_worksLimit = 10;
      this.user_worksCollectionCount = 0;
      this.getUserWorks(this.user_id, this.user_worksPage, this.user_worksLimit);
    }
    // if ($event.nextId === "tab-addresses") {
    //   // $event.preventDefault();
    //   this.ratePage = 0;
    //   this.rateLimit = 10;
    //   this.rateCollectionCount = 0;
    //   this.rateSize = 0;
    //   this.getUserAddress(this.user_id, this.ratePage, this.rateLimit);
    // }
  }

  public onUser_worksPageChange(pageNum: number): void {
    this.user_worksPage = pageNum - 1;
    this.helper
      .getUserWorks(this.user_id, this.user_worksPage, this.user_worksLimit)
      .subscribe((x) => {
        let arr = x[appConstant.ITEMS] as any[];
        this.user_worksCollectionCount = x["pagination"]["totalElements"];
        this.user_works = arr;
        this.user_worksPage = pageNum;
      });
  }

  // public onRatePageChange(pageNum: number): void {
  //   this.ratePage = pageNum - 1;
  //   this.helper
  //     .getUserAddress(this.user_id, this.ratePage, this.rateLimit)
  //     .subscribe((x) => {
  //       let arr = x[appConstant.ITEMS] as any[];
  //       this.rateCollectionCount = x["pagenation"]["totalElements"];
  //       this.addresses = arr;
  //       this.ratePage = pageNum;
  //     });
  // }

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
      .getProviderOrdersExcel(this.user_id, this.status)
      .subscribe((res_data) => {
        let data = res_data["items"] as any[];
        data.forEach((user, index) => {
          console.log( user["supervisor"])
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
          element.setAttribute("download", "طلبات المستخدمين" + ".csv");
          element.style.display = "none";
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        });
      });
  }
  // saveDiscount() {
  //   this.helper
  //     .addAddressDiscount(this.user_address["_id"], {
  //       discount: this.user_address["discount"],
  //     })
  //     .subscribe((x) => {
  //       if (x[appConstant.STATUS] != true) {
  //         this.toastr.error(x[appConstant.MESSAGE]);
  //       } else {
  //         this.toastr.success(x[appConstant.MESSAGE]);
  //       }
  //       if (this.rateSize == 1 && this.ratePage != 1)
  //         this.ratePage = this.ratePage - 2;
  //       else this.ratePage = this.ratePage - 1;
  //       this.getUserAddress(this.user_id, this.ratePage, this.rateLimit);
  //     });
  // }

  changeCategory(event){
    this.getSubCategories(event) 
  }
}
