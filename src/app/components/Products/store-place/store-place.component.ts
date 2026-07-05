import { Component, OnInit, ViewChild } from "@angular/core";
import { appConstant, UserType } from "src/app/service/appConstant";
import { ConstantServiceWrapper } from "../../../service/ConstantServiceWrapper.service";
import {
  NgbActiveModal,
  NgbDateStruct,
  NgbModal,
  NgbModalConfig,
  NgbTabChangeEvent,
} from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ar } from "date-fns/locale";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { MomentDateFormatter } from "src/app/service/utils_function";
import { DatePipe } from "@angular/common";
import { AgmMap } from "@agm/core";
import { TranslateService } from "@ngx-translate/core";
declare var require;
const Swal = require("sweetalert2");
declare const google: any;

@Component({
  selector: "app-store-place",
  templateUrl: "./store-place.component.html",
  styleUrls: ["./store-place.component.scss"],
})
export class StorePlaceComponent implements OnInit {
  @ViewChild(AgmMap) map: any;
  searchObject = {
    place_id: "",
    city_id: "",
  };
  polygon: any;
  arName = "";
  places = [];
  cities = [];
  supplier_places = [];
  city_id;

  type = "";
  page = 0;
  size = 0;
  limit = 20;
  collectionCount = 0;

  lat = 24.774265;
  lng = 46.738586;
  lang = ""
  constructor(
    private translate: TranslateService,
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.lang = this.translate.currentLang
  }

  ngOnInit(): void {
    this.getAllCit();
    this.getSupplierPlaces(this.searchObject,0,this.limit)
  }

  getAllCit() {
    this.helper.getAllCityAdmin().subscribe((x) => {
      this.cities = x[appConstant.ITEMS] as any[];
    });
  }

  getSupplierPlaces(searchhObj, page, limit) {
    this.helper.getSupplierPlaceList(searchhObj, page, limit).subscribe((x) => {
      let arr = x[appConstant.ITEMS] as any[];
      this.collectionCount = x["pagination"]["totalElements"];
      this.size = x["pagination"]["size"];
      this.page = page + 1;
      this.supplier_places = arr;
    });
  }

  deletePlace(id) {
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
        this.helper.deleteSupplierPlace(id).subscribe((x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
          }
          if (this.size == 1 && this.page != 1) this.page = this.page - 2;
          else this.page = this.page - 1;

          this.getSupplierPlaces(this.searchObject, this.page, this.limit);
        });
      }
    });
  }

  public onPageChange(pageNum: number): void {
    this.page = pageNum - 1;
    this.helper
      .getSupplierPlaceList(this.searchObject, this.page, this.limit)
      .subscribe((x) => {
        let arr = x[appConstant.ITEMS] as any[];
        this.collectionCount = x["pagination"]["totalElements"];
        this.supplier_places = arr;
        this.page = pageNum;
      });
  }
  onMapReady(map) {
    this.map = map;
  }

  openMap(content, obj) {
    this.modalService.open(content, { size: "lg" });

    setTimeout(() => {
      this.map._mapsWrapper
        .createPolygon({
          paths: obj.cord,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.3,
          editable: false,
        })
        .then((polygon: any) => {
          this.polygon = polygon;
          this.polygon.getPath();
          this.arName = obj.arName;
          this.lat = obj.cord[0].lat;
          this.lng = obj.cord[0].lng;
        });
    }, 5000);
  }

  search() {
    this.page = 0;
    this.getSupplierPlaces(this.searchObject, this.page, this.limit);
  }

  changeCity(event) {
    let city = this.cities.find((x) => x._id == event);
    if (city) {
      this.helper.getAllPlaces(city._id).subscribe((x) => {
        this.places = x[appConstant.ITEMS] as any[];
      });
    }
  }

  changePlace(event) {
    // let place = this.places.find((x) => x._id == event);
  }

  addEdit(item) {
    if (item) {
      this.router.navigate(["/items/places/store/add/" + item._id]);
    } else {
      this.router.navigate(["/items/places/store/add"]);
    }
  }
}
