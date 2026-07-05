import { Component, OnInit, ViewEncapsulation } from "@angular/core";
// import * as chartData from "./../../../shared/data/dashboard/default";
declare var require: any;
var Knob = require("knob"); // browserify require
var primary = localStorage.getItem("primary_color") || "#4466f2";
var secondary = localStorage.getItem("secondary_color") || "#1ea6ec";

import * as chartData from "../../../shared/data/chart/google-chart";
import * as chartData2 from "../../../shared/data/chart/chartjs";
import * as graphoptions from "../../../shared/data/chart/config";

import { ConstantServiceWrapper } from "src/app/service/ConstantServiceWrapper.service";
import { appConstant, UserType } from "src/app/service/appConstant";
import { Router } from "@angular/router";
import * as shape from "d3-shape";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { OrderDetailsPoPComponent } from "src/app/shared/components/order-details/order-details.component";

@Component({
  selector: "app-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DefaultComponent implements OnInit {
  orderDetails = {};
  employees = [];
  curves = {
    Basis: shape.curveBasis,
    "Basis Closed": shape.curveBasisClosed,
    Bundle: shape.curveBundle.beta(1),
    Cardinal: shape.curveCardinal,
    "Cardinal Closed": shape.curveCardinalClosed,
    "Catmull Rom": shape.curveCatmullRom,
    "Catmull Rom Closed": shape.curveCatmullRomClosed,
    Linear: shape.curveLinear,
    "Linear Closed": shape.curveLinearClosed,
    "Monotone X": shape.curveMonotoneX,
    "Monotone Y": shape.curveMonotoneY,
    Natural: shape.curveNatural,
    Step: shape.curveStep,
    "Step After": shape.curveStepAfter,
    "Step Before": shape.curveStepBefore,
    default: shape.curveLinear,
  };

  public customOptions: any = {
    margin: 10,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    loop: true,
    dots: false,
    nav: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      420: {
        items: 2,
        nav: false,
      },
      600: {
        items: 3,
        nav: false,
      },
      932: {
        items: 4,
        nav: false,
      },
    },
  };
  public slidesStore = [];

  singleEarnPaid = [];
  users = [];
  orders = [];
  Supplier = 0;
  Employee = 0;
  Admins = 0;
  Users = 0;
  Orders = 0;
  New = 0;
  colorScheme1 = {
    domain: ["#007bff", "#ff9f40", "#ff5370"],
  };

  colorScheme2 = {
    domain: ["#143fef", "#1ea6ec", "#1a8436", "#0062cc", "#ff850d", "#ff2046"],
  };

  colorScheme3 = {
    domain: ["#143fef", "#1ea6ec", "#1a8436", "#0062cc", "#ff850d", "#ff2046"],
  };

  colorScheme4 = {
    domain: ["#A10A28", "#5AA454", "#C7B42C", "#AAAAAA", "#24d67f"],
  };
  charts3: any[] = [];

  single1;
  single2;
  userType = "";
  targets;
  employee_id = "";
  notifications=[]

  //area
  public areaChartshowXAxis = graphoptions.areaChartshowXAxis;
  public areaChartshowYAxis = graphoptions.areaChartshowYAxis;
  public areaChartgradient = graphoptions.areaChartgradient;
  public areaChartshowXAxisLabel = graphoptions.areaChartshowXAxisLabel;
  public areaChartxAxisLabel = graphoptions.areaChartxAxisLabel;
  public areaChartshowYAxisLabel = graphoptions.areaChartshowYAxisLabel;
  public areaChartcolorScheme = graphoptions.areaChartcolorScheme;
  public lineChartcurve = graphoptions.lineChartcurve;
  public lineChartcurve1 = graphoptions.lineChartcurve1;

  public get UserType(): typeof UserType {
    return UserType;
  }

  constructor(
    private helper: ConstantServiceWrapper,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
  ) {
    this.userType = localStorage.getItem("type");
  }

  ngOnInit() {
    this.getTop10NewUsers();
    this.getTop10Orders();
    this.getCounterOrdersWithStatus();
    this.getCounterUsers();
    this.UsersproviderPerYear();
    this.getProviderTarget();
    //this.getTopProductsPlace();
    //this.getOrdersOfProviders();
    this.getTop10Notification()
  }

  getTop10Notification() {
    this.helper.getTop10Notification().subscribe((x) => {
      if (x[appConstant.STATUS]) this.notifications = x[appConstant.ITEMS] as any[];
      else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }
  

  getTop10NewUsers() {
    this.helper.getTop10NewUsers().subscribe((x) => {
      if (x[appConstant.STATUS]) this.users = x[appConstant.ITEMS] as any[];
      else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }

  getTop10Orders() {
    this.helper.getTop10Orders().subscribe((x) => {
      if (x[appConstant.STATUS]) this.orders = x[appConstant.ITEMS] as any[];
      else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }

  getCounterOrdersWithStatus() {
    this.helper.getCounterOrdersWithStatus().subscribe((x) => {
      if (x[appConstant.STATUS]) {
        let NewOrder = x["NewOrder"] as any;
        let ProccessingOrder = x["ProccessingOrder"] as any;
        let DoneOrder = x["DoneOrder"] as any;
        let CancelOrder = x["CancelOrder"] as any;
        let AllOrder = x["AllOrder"] as any;
        let Accepted = x["Accepted"] as any;
        let Updated = x["Updated"] as any;
        this.slidesStore = [
          {
            id: 1,
            icon: "dollar-sign",
            title: "الطلبات الجديدة",
            number: NewOrder > 0 ? NewOrder: "-",
          },
          {
            id: 2,
            icon: "map-pin",
            title: "قيد التنفيذ",
            number: ProccessingOrder > 0 ? ProccessingOrder: "-",
          },
          {
            id: 3,
            icon: "shopping-cart",
            title: "الطلبات المكتملة",
            number: DoneOrder > 0 ? DoneOrder: "-",
          },
          {
            id: 4,
            icon: "trending-down",
            title: "الطلبات الملغية",
            number: CancelOrder > 0 ? CancelOrder: "-",
          },
          {
            id: 7,
            icon: "list",
            title: "كل الطلبات",
            number: AllOrder > 0 ? AllOrder: "-",
          },
        ];
      } else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }

  getCounterUsers() {
    this.helper.getCounterUsers().subscribe((x) => {
      if (x[appConstant.STATUS]) {
        this.Admins = x["Admins"] as any;
        this.Supplier = x["Supplier"] as any;
        this.Users = x["Users"] as any;
        this.Orders = x["Orders"] as any;
        // this.Employee = x["Employee"] as any;
        // this.Replacment = x["Replacment"] as any;
        // this.New = x["New"] as any;
      } else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }

  UsersproviderPerYear() {
    this.helper.UsersproviderPerYear().subscribe((x) => {
      let arr = x[appConstant.ITEMS] as any[];
      this.singleEarnPaid = [...arr];
    });
  }

  getProviderTarget() {
    this.helper.getProviderTarget().subscribe((x) => {
      if (x[appConstant.STATUS]) {
        let arr = x[appConstant.ITEMS] as any[];
        this.targets = arr;
      } else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }

  getTopProductsPlace() {
    this.helper.getTopProductsPlace().subscribe((x) => {
      if (x[appConstant.STATUS]) {
        let arr = x[appConstant.ITEMS] as any[];
        var new_arr = []
        arr.forEach(element => {
          if(element){
            new_arr.push(element)
          }
        });
        this.single2 = new_arr;
      } else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }

  getOrdersOfProviders() {
    this.helper.getProviderOrdersPerYear().subscribe((x) => {
      if (x[appConstant.STATUS]) {
        let arr = x[appConstant.ITEMS] as any[];
        this.single1 = arr;
      } else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }


  visitUserProfile(id) {
    this.router.navigate(["/users/details/" + id]);
  }
  visitUserProfile2(id) {
    this.router.navigate(["/users/provider/details/" + id]);
  }

  // openOrder(content, obj) {
  //   this.orderDetails = obj;
  //   this.modalService.open(content, { size: "lg" });
  // }
  
  openOrder(content, obj, type) {
    if(type == 'notification'){
      this.helper.getSingleOrders(obj.body_parms).subscribe(x=>{
        this.orderDetails = x[appConstant.ITEMS] as any
        const modalRef = this.modalService.open(OrderDetailsPoPComponent,{ size: "lg" })
        modalRef.componentInstance.orderDetails = this.orderDetails;
        modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {})
      })
    }else{
      this.orderDetails = obj;
      const modalRef = this.modalService.open(OrderDetailsPoPComponent,{ size: "lg" })
      modalRef.componentInstance.orderDetails = this.orderDetails;
    }

  }

  openOrderDriver(content, obj) {
    this.helper.getEmployeesByStore(obj.provider._id).subscribe((x) => {
      this.employees = x[appConstant.ITEMS] as any[];
      this.orderDetails = obj;
      this.modalService.open(content, { size: "lg" });
    });
  }

  updateOrder(id, status) {
    var data = {};
    if (status == 'accepted') data = { employee: this.employee_id, status: 'accepted' };
    else data = { status: status, notes: '' };
    this.helper.updateOrderStatus(id, data).subscribe(
      (x) => {
        if (x[appConstant.STATUS] != true) {
          this.toastr.error(x[appConstant.MESSAGE]);
        } else {
          this.toastr.success(x[appConstant.MESSAGE]);
        }
        this.modalService.dismissAll();
        this.getTop10Orders();
      },
      (error) => {
        this.helper.serverSideErrorHandler(error);
      }
    );
  }
}
