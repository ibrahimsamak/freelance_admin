import { Component, OnInit, ViewChild } from "@angular/core";
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
import { AgmMap } from "@agm/core";
import { TranslateService } from "@ngx-translate/core";
declare var require;
const Swal = require("sweetalert2");

@Component({
  selector: "app-places-product-add",
  templateUrl: "./places-product-add.component.html",
  styleUrls: ["./places-product-add.component.scss"],
})
export class PlacesProductAddComponent implements OnInit {
  @ViewChild(AgmMap) map: any;
  polygon: any;

  lat = 24.774265;
  lng = 46.738586;
  pointList: { lat: number; lng: number }[] = [];
  drawingManager: any;
  selectedShape: any;
  selectedArea = 0;

  showMap = false;
  image;
  productDetails = {
    _id: "",
    price_for_new: 0,
    price_for_replacment: 0,
    discountPrice: 0,
    discountPriceReplacment: 0,
    deliveryCost: 0,
    expressCost:0,
    supplier_id: "",
    category_id: "",
    city_id: "",
    place_id: "",
    isNewProduct: true,
    isReplacement: true,
    product: {},
    place: {},
  };
  categories = [];
  providers = [];
  cities = [];
  places = [];

  product_id;
  note = "";
  imgs = [];
  showLoader = false;
  userType;

  public get UserType(): typeof UserType {
    return UserType;
  }

  lang = ""
  constructor(
    private translate: TranslateService,
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.lang = this.translate.currentLang
    // this.userType = localStorage.getItem("type");
    // if (this.userType != UserType.ADMIN) {
    //   this.productDetails.provider_id = localStorage.getItem("admin_id");
    // }
  }

  ngOnInit(): void {
    this.getAllProviders();
    this.getAllCategoy();
    this.getProductById();
  }

  getProductById() {
    this.route.params.subscribe((params: Params) => {
      let product_id = params["id"] == undefined ? null : params["id"];
      if (product_id) {
        this.product_id = product_id;
        this.helper.getSingleProductPlace(product_id).subscribe((x) => {
          if (x[appConstant.STATUS]) {
            let object = x[appConstant.ITEMS] as any;
            this.productDetails = object;
            this.changeProduct(this.productDetails.category_id,object["supplier_id"]["_id"]);
          } else this.toastr.error(x[appConstant.MESSAGE]);
        });
      }
    });
  }

  getAllCategoy() {
    this.helper.getCategoy().subscribe((x) => {
      this.categories = x[appConstant.ITEMS] as any[];
    });
  }

  getAllProviders() {
    this.helper.getAllProviders().subscribe((x) => {
      this.providers = x[appConstant.ITEMS] as any[];
    });
  }

  saveProduct() {
    if (
      Number(this.productDetails.price_for_new) != 0 &&
      Number(this.productDetails.discountPrice) != 0 &&
      Number(this.productDetails.discountPrice) >=
      Number(this.productDetails.price_for_new)
    ) {
      this.toastr.error("سعر المنتج الجديد يجب ان يكون اكبر من سعر التخفيض");
      return;
    }

    if (
      Number(this.productDetails.price_for_replacment) != 0 &&
      Number(this.productDetails.discountPriceReplacment) != 0 &&
      Number(this.productDetails.discountPriceReplacment) >=
      Number(this.productDetails.price_for_replacment)
    ) {
      this.toastr.error("سعر استبدال المنتج يجب ان يكون اكبر من سعر التخفيض");
      return;
    }

    if (
      String(this.productDetails.discountPriceReplacment) == null ||
      String(this.productDetails.discountPriceReplacment) == ""
    ) {
      this.productDetails.discountPriceReplacment = 0;
    }

    if (
      String(this.productDetails.discountPrice) == null ||
      String(this.productDetails.discountPrice) == ""
    ) {
      this.productDetails.discountPrice = 0;
    }

    if (this.product_id) {
      this.showLoader = true;
      this.helper
        .updateProductPlace(this.productDetails._id, this.productDetails)
        .subscribe((x) => {
          this.showLoader = false;
          if (x[appConstant.STATUS]) {
            this.toastr.success(x[appConstant.MESSAGE]);
          } else {
            this.toastr.error(x[appConstant.MESSAGE]);
          }
        });
    } else {
      this.showLoader = true;
      this.helper.addProductPlace(this.productDetails).subscribe((x) => {
        this.showLoader = false;
        if (x[appConstant.STATUS]) {
          this.toastr.success(x[appConstant.MESSAGE]);
        } else {
          this.toastr.error(x[appConstant.MESSAGE]);
        }
      });
    }
  }

  changeProduct(event,supplier_id) {
    let product = this.categories.find((x) => x._id == event);
    if (product) {
      this.productDetails.category_id = product._id;
      this.productDetails.product = product;
    }

    if(this.product_id && supplier_id){
      this.changeSupplier(supplier_id) 
    }
  }
  changeSupplier(event) {
    let supplier = this.providers.find((x) => x._id == event);
    if (supplier) {
      this.productDetails.supplier_id = supplier._id;
      this.cities = supplier.cities;
    }
    if(this.product_id){
      this.changeCity(this.productDetails.city_id);
    }
  }

  changeCity(event) {
    let city = this.cities.find((x) => x._id == event);
    if (city) {
      this.productDetails.city_id = city._id;
      this.helper.getAllPlaces(city._id).subscribe((x) => {
        this.places = x[appConstant.ITEMS] as any[];
        if (this.product_id) {
          this.changePlace(this.productDetails.place_id);
        }
      });
    }
  }
  changePlace(event) {
    let place = this.places.find((x) => x._id == event);
    if (place) {
      this.productDetails.place = place;
      this.showMapAction();
    }
  }

  showMapAction() {
    if (this.productDetails.place) {
      if (this.polygon) this.polygon.setMap(null);
      this.map._mapsWrapper
        .createPolygon({
          paths: this.productDetails.place["cord"],
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.3,
          editable: false,
        })
        .then((polygon: any) => {
          if (this.productDetails.place["cord"].length > 0) {
            this.polygon = polygon;
            this.polygon.getPath();
            this.lat = this.productDetails.place["cord"][0].lat;
            this.lng = this.productDetails.place["cord"][0].lng;
          } else {
            this.polygon.setMap(null);
            //  this.polygon.getPath();
            //  this.lat = this.productDetails.place["cord"][0].lat;
            //  this.lng = this.productDetails.place["cord"][0].lng;
          }
        });
    }
  }
}
