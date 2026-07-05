import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { appConstant } from "src/app/service/appConstant";
import { ConstantServiceWrapper } from "../../../service/ConstantServiceWrapper.service";
import {
  NgbActiveModal,
  NgbDateStruct,
  NgbModal,
  NgbModalConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { MomentDateFormatter } from "src/app/service/utils_function";
import { DatePipe } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
declare var require;
const Swal = require("sweetalert2");

@Component({
  selector: "app-coupons",
  templateUrl: "./coupons.component.html",
  styleUrls: ["./coupons.component.scss"],
})
export class CouponsComponent implements OnInit {
  momentFormat = new MomentDateFormatter();

  coupons = [];
  couponObject = {
    _id: "",
    coupon: "",
    dt_from: "",
    dt_to: "",
    discount_rate: 0,
    supplier_id: "",
    place_id: "",
    city_id: "",
    description:""
  };
  type = "";
  page = 0;
  limit = 20;
  size = 0;
  collectionCount;
  providers = [];
  cities = [];
  places = [];
  showLoader = false;
  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    // this.getAllProviders();

    this.getCoupons(this.page, this.limit);
  }

  getAllProviders() {
    this.helper.getAllProviders().subscribe((x) => {
      this.providers = x[appConstant.ITEMS] as any[];
    });
  }

  getCoupons(page, limit) {
    this.helper.getCoupon(page, limit).subscribe((x) => {
      this.coupons = x[appConstant.ITEMS] as any[];
      this.collectionCount = x["pagenation"]["totalElements"];
      this.size = x["pagenation"]["size"];
      this.page = page + 1;
    });
  }

  public onPageChange(pageNum: number): void {
    this.page = pageNum - 1;
    this.helper.getCoupon(this.page, this.limit).subscribe((x) => {
      let arr = x[appConstant.ITEMS] as any[];
      this.collectionCount = x["pagenation"]["totalElements"];
      this.coupons = arr;
      this.page = pageNum;
    });
  }

  openCoupon(content, obj) {
    if (obj) {
      this.type = "edit";
      this.helper.getSingleCoupon(obj._id).subscribe((x) => {
        this.couponObject = x[appConstant.ITEMS] as any;
        this.couponObject.dt_from = this.parse(
          this.couponObject.dt_from
        ) as any;
        this.couponObject.dt_to = this.parse(this.couponObject.dt_to) as any;
        this.modalService.open(content, { size: "lg" });
      });
    } else {
      this.type = "add";
      this.couponObject = {
        _id: "",
        coupon: "",
        dt_from: "",
        dt_to: "",
        discount_rate: 0,
        supplier_id: "",
        place_id: "",
        city_id: "",
        description:""
      };
      this.modalService.open(content, { size: "lg" });
    }
  }
  parse(value: string): NgbDateStruct {
    let datePipe = new DatePipe("en-US");

    let returnVal: NgbDateStruct;
    if (!value) {
      returnVal = null;
    } else {
      try {
        let dateParts = datePipe.transform(value, "M-d-y").split("-");
        returnVal = {
          year: parseInt(dateParts[2]),
          month: parseInt(dateParts[0]),
          day: parseInt(dateParts[1]),
        };
      } catch (e) {
        returnVal = null;
      }
    }
    return returnVal;
  }

  saveAction() {
    if (this.couponObject.dt_from != "") {
      let dt_from = this.momentFormat.format(this.couponObject.dt_from as any);
      this.couponObject.dt_from = dt_from;
    }
    if (this.couponObject.dt_to != "") {
      let dt_to = this.momentFormat.format(this.couponObject.dt_to as any);
      this.couponObject.dt_to = dt_to;
    }

    if (this.type == "edit") {
      this.showLoader = true;
      this.helper
        .updateCoupon(this.couponObject._id, this.couponObject)
        .subscribe(
          (x) => {
            this.showLoader = false;
            if (x[appConstant.STATUS] != true) {
              this.toastr.error(x[appConstant.MESSAGE]);
            } else {
              this.getCoupons(0, this.limit);
            }
            this.modalService.dismissAll();
          },
          (error) => {
            this.showLoader = false;
            this.helper.serverSideErrorHandler(error);
          }
        );
    } else {
      this.showLoader = true;
      this.helper.addCoupon(this.couponObject).subscribe(
        (x) => {
          this.showLoader = false;
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
            this.getCoupons(0, this.limit);
          }
          this.modalService.dismissAll();
        },
        (error) => {
          this.showLoader = false;
          this.helper.serverSideErrorHandler(error);
        }
      );
    }
  }

  deleteCoupon(id) {
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
        this.helper.deleteCoupon(id).subscribe((x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
          }
          if (this.size == 1 && this.page != 1) this.page = this.page - 2;
          else this.page = this.page - 1;
          this.getCoupons(this.page, this.limit);
        });
      }
    });
  }

  changeSupplier(event) {
    console.log(event);
    let supplier = this.providers.find((x) => x._id == event);
    // let suplier_id = event;
    if (supplier) {
      this.couponObject.supplier_id = supplier._id;
      this.cities = supplier.cities;
    }
    // console.log(this.cities);
  }

  changeCity(event) {
    console.log(event);
    let city = this.cities.find((x) => x._id == event);
    // let suplier_id = event;
    if (city) {
      this.couponObject.city_id = city._id;
      this.helper.getAllPlaces(city._id).subscribe((x) => {
        this.places = x[appConstant.ITEMS] as any[];
      });
    }
    // console.log(this.cities);
  }
}
