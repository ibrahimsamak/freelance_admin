import { Component, OnInit, Output } from "@angular/core";
import { ProductsService } from "../../../shared/services/e-commerce/products.service";
import {
  Products,
  ColorFilter,
  ProductColor,
  ProductTags,
  TagFilter,
} from "../../../shared/model/e-commerce/product.model";
import { CartService } from "../../../shared/services/e-commerce/cart.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { WishListService } from "../../../shared/services/e-commerce/wish-list.service";
import { ConstantServiceWrapper } from "../../../../app/service/ConstantServiceWrapper.service";
import { ToastrService } from "ngx-toastr";
import { appConstant, UserType } from "src/app/service/appConstant";
import { Image } from "@ks89/angular-modal-gallery";
declare var require: any;
const Swal = require("sweetalert2");
import * as jsonexport from "jsonexport/dist";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-store-products",
  templateUrl: "./store-products.component.html",
  styleUrls: ["./store-products.component.scss"],
})
export class StoreProductsComponent implements OnInit {
  @Output() productDetail: any;
  showLoader = false;
  totalElements = 0;
  show: boolean = false;

  products = [];
  page = 0;
  limit = 12;
  userType;
  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private modalService: NgbModal,
    private wishService: WishListService,
    private helper: ConstantServiceWrapper,
    private toastr: ToastrService,
    private router: Router,
    private ProductsService: ProductsService,
    private translate: TranslateService,
  ) {
    //console.log(ProductsService.currency);
    // this.userType = localStorage.getItem("type");
    // if (this.userType == UserType.STORE) {
    //   this.searchObject.user_id = localStorage.getItem("admin_id");
    // }
  }

  sidebaron: boolean = false;
  open: boolean = false;
  public listView: boolean = false;
  public col_xl_12: boolean = false;
  public col_xl_2: boolean = false;

  public col_sm_3: boolean = false;
  public col_xl_3: boolean = true;
  public xl_4: boolean = true;
  public col_sm_4: boolean = false;
  public col_xl_4: boolean = false;
  public col_sm_6: boolean = true;
  public col_xl_6: boolean = false;
  public gridOptions: boolean = true;
  public active: boolean = false;
  providers = [];
  categories = [];
  searchObject = {
    name: "",
    category_id: "",
  };
  openFilter() {
    if (this.show == true && this.sidebaron == true) {
      this.show = false;
      this.sidebaron = false;
    } else {
      this.show = true;
      this.sidebaron = true;
    }
  }

  gridOpen() {
    this.gridOptions = true;
    this.listView = false;
    this.col_xl_3 = true;

    this.xl_4 = true;
    this.col_xl_4 = false;
    this.col_sm_4 = false;

    this.col_xl_6 = false;
    this.col_sm_6 = true;

    this.col_xl_2 = false;
    this.col_xl_12 = false;
  }

  listOpen() {
    this.gridOptions = false;
    this.listView = true;
    this.col_xl_3 = true;
    this.xl_4 = true;
    this.col_xl_12 = true;
    this.col_xl_2 = false;

    this.col_xl_4 = false;
    this.col_sm_4 = false;
    this.col_xl_6 = false;
    this.col_sm_6 = true;
  }

  grid2() {
    this.listView = false;
    this.col_xl_3 = false;
    this.col_sm_3 = false;

    this.col_xl_2 = false;

    this.col_xl_4 = false;
    this.col_sm_4 = false;

    this.col_xl_6 = true;
    this.col_sm_6 = true;

    this.col_xl_12 = false;
  }

  grid3() {
    this.listView = false;
    this.col_xl_3 = false;
    this.col_sm_3 = false;

    this.col_xl_2 = false;
    this.col_xl_4 = true;
    this.col_sm_4 = true;

    this.col_xl_6 = false;
    this.col_sm_6 = false;

    this.col_xl_12 = false;
  }

  grid6() {
    this.listView = false;
    this.col_xl_3 = false;
    this.col_sm_3 = false;

    this.col_xl_2 = true;
    this.col_xl_4 = false;
    this.col_sm_4 = false;

    this.col_xl_6 = false;
    this.col_sm_6 = false;

    this.col_xl_12 = false;
  }
  // open single product detail
  openProductDetail(content, product) {
    var imagesRect: Image[] = [];
    // product.images.forEach((element, index) => {
    imagesRect.push(
      new Image(0, { img: product.image }, { img: product.image })
    );
    // });
    product.imagesRect = imagesRect;
    this.modalService.open(content, { centered: true, size: "lg" });
    this.productDetail = product;
  }

  ngOnInit() {
    this.page = 0;
    this.getAllCategory();
    this.getAllProviders();
    this.getProducts(this.page, this.limit);
  }

  getAllCategory() {
    this.helper.getCategoy().subscribe((x) => {
      this.categories = x[appConstant.ITEMS] as any[];
    });
  }

  getAllProviders() {
    this.helper.getAllProviders().subscribe((x) => {
      this.providers = x[appConstant.ITEMS] as any[];
    });
  }

  getProducts(page, limit) {
    this.searchObject = {
      name: "",
      category_id: "",
    };

    this.helper
      .getProductsList(page, limit, this.searchObject)
      .subscribe((x) => {
        let arr = x[appConstant.ITEMS] as any[];
        this.totalElements = x["pagination"]["totalElements"];
        this.products = arr;
        this.showLoader = false;
      });
  }

  search() {
    this.helper
      .getProductsList(0, this.limit, this.searchObject)
      .subscribe((x) => {
        let arr = x[appConstant.ITEMS] as any[];
        this.totalElements = x["pagination"]["totalElements"];
        this.products = arr;
        this.showLoader = false;
      });
  }

  reset() {
    this.searchObject = {
      name: "",
      category_id: "",
    };
    // if (this.userType == UserType.STORE) {
    //   this.searchObject.user_id = localStorage.getItem("admin_id");
    // }
    this.getProducts(0, this.limit);
  }

  loadMore() {
    this.showLoader = true;
    this.page = this.page + 1;
    this.helper
      .getProductsList(this.page, this.limit, this.searchObject)
      .subscribe((x) => {
        let arr = x[appConstant.ITEMS] as any[];
        this.totalElements = x["pagination"]["totalElements"];
        this.products = [...this.products, ...arr];
        this.showLoader = false;
      });
  }

  deleteProduct(obj, index) {
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
        this.helper.deleteProduct(obj._id).subscribe((x) => {
          if (x[appConstant.STATUS]) {
            this.toastr.success(x[appConstant.MESSAGE]);
            this.page = 0;
            this.getProducts(this.page, this.limit);
          } else {
            this.toastr.error(x[appConstant.MESSAGE]);
          }
        });
      }
    });
  }

  addNew() {
    this.router.navigate(["/items/add"]);
  }

  excel() {
    var fields = [];
    this.helper
      .getProductsListExcel(this.searchObject)
      .subscribe((res_data) => {
        let data = res_data["items"] as any[];
        data.forEach((user, index) => {
          fields.push({
            Name: "\ufeff" + user["arName"],
            Description: "\ufeff" + user["arDescription"],
            Rate: user["rate"],
            Category: "\ufeff" + user["category_id"]["arName"],
            New: user["isNewProduct"] ? "true" : "false",
            Replacment: user["isReplacement"] ? "true" : "false",
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
          element.setAttribute("download", "المنتجات" + ".csv");
          element.style.display = "none";
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        });
      });
  }

  showHide(product) {
    var isActive = !product.isActive;
    var data = {
      id: product._id,
      isActive: isActive,
      type: 1,
    };
    this.helper.hideShow(data).subscribe((res_data) => {
      if (res_data[appConstant.STATUS]) {
        this.toastr.success(res_data[appConstant.MESSAGE]);
        this.page = 0;
        this.getProducts(this.page, this.limit);
      } else {
        this.toastr.error(res_data[appConstant.MESSAGE]);
      }
    });
  }
}
