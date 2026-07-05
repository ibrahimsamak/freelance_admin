import { Component, OnInit, Output, ViewChild } from "@angular/core";
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
import { ConstantServiceWrapper } from "../../../service/ConstantServiceWrapper.service";
import { ToastrService } from "ngx-toastr";
import { appConstant, UserType } from "src/app/service/appConstant";
import { Image } from "@ks89/angular-modal-gallery";
import { ActivatedRoute, Params, Router } from "@angular/router";
declare var require: any;
const Swal = require("sweetalert2");
import * as jsonexport from "jsonexport/dist";
import { AgmMap } from "@agm/core";
import { TranslateService } from "@ngx-translate/core";
declare const google: any;

@Component({
  selector: "app-projects",
  templateUrl: "./places-add.component.html",
  styleUrls: ["./places-add.component.scss"],
})
export class PlacesAddComponent implements OnInit {
  @ViewChild(AgmMap) map: any;
  polygon: any;
  showLoader = false;
  lat = 24.774265;
  lng = 46.738586;
  pointList: { lng: number; lat: number }[] = [];
  drawingManager: any;
  selectedShape: any;
  selectedArea = 0;
  cities = [];
  placeDetails = {
    _id: "",
    arName: "",
    enName: "",
    city_id: "",
    loc: [],
    cord: [],
  };
  place_id;
  lang;
  constructor(
    private translate: TranslateService,
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.lang = this.translate.currentLang
  }

  ngOnInit() {
    this.setCurrentPosition();
    this.getCity();
    this.getSinglePlace();
  }

  getCity() {
    this.helper.getAllCityAdmin().subscribe((x) => {
      if (x[appConstant.STATUS]) {
        this.cities = x[appConstant.ITEMS] as any[];
      } else {
        this.toastr.error(x[appConstant.MESSAGE]);
      }
    });
  }

  getSinglePlace() {
    this.route.params.subscribe((params: Params) => {
      let place_id = params["id"] == undefined ? null : params["id"];
      if (place_id) {
        this.place_id = place_id;
        this.helper.getSinglePlace(this.place_id).subscribe((x) => {
          if (x[appConstant.STATUS]) {
            this.pointList = [];
            this.placeDetails = x[appConstant.ITEMS] as any;
            this.placeDetails.city_id = x[appConstant.ITEMS]["city_id"]["_id"];
            this.map._mapsWrapper
              .createPolygon({
                paths: this.placeDetails.cord,
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
                this.lat = this.placeDetails.cord[0].lat;
                this.lng = this.placeDetails.cord[0].lng;
              });
          } else {
            this.toastr.error(x[appConstant.MESSAGE]);
          }
        });
      }
    });
  }
  onMapReady(map) {
    this.initDrawingManager(map);
  }

  initDrawingManager = (map: any) => {
    const self = this;
    const options = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ["polygon"],
      },
      polygonOptions: {
        draggable: true,
        editable: true,
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
    };
    this.drawingManager = new google.maps.drawing.DrawingManager(options);
    this.drawingManager.setMap(map);
    google.maps.event.addListener(
      this.drawingManager,
      "overlaycomplete",
      (event) => {
        if (event.type === google.maps.drawing.OverlayType.POLYGON) {
          const paths = event.overlay.getPaths();
          for (let p = 0; p < paths.getLength(); p++) {
            google.maps.event.addListener(paths.getAt(p), "set_at", () => {
              if (!event.overlay.drag) {
                self.updatePointList(event.overlay.getPath());
              }
            });
            google.maps.event.addListener(paths.getAt(p), "insert_at", () => {
              self.updatePointList(event.overlay.getPath());
            });
            google.maps.event.addListener(paths.getAt(p), "remove_at", () => {
              self.updatePointList(event.overlay.getPath());
            });
          }
          self.updatePointList(event.overlay.getPath());
          this.selectedShape = event.overlay;
          this.selectedShape.type = event.type;
        }
        if (event.type !== google.maps.drawing.OverlayType.MARKER) {
          // Switch back to non-drawing mode after drawing a shape.
          self.drawingManager.setDrawingMode(null);
          // To hide:
          self.drawingManager.setOptions({
            drawingControl: false,
          });
        }
      }
    );
  };

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

  deleteSelectedShape() {
    if (this.selectedShape) {
      this.selectedShape.setMap(null);
      this.selectedArea = 0;
      this.pointList = [];
      // To show:
      this.drawingManager.setOptions({
        drawingControl: true,
      });
    }
  }

  updatePointList(path) {
    this.pointList = [];
    const len = path.getLength();
    for (let i = 0; i < len; i++) {
      this.pointList.push(path.getAt(i).toJSON());
    }
    this.selectedArea = google.maps.geometry.spherical.computeArea(path);

    console.log(this.pointList);
    console.log(this.selectedArea);
  }

  savePlace() {
    this.placeDetails.loc = [];
    this.pointList.forEach((element, index) => {
      var obj = { lng: element.lng, lat: element.lat };
      this.placeDetails.loc.push(obj);
      if (index == this.pointList.length - 1) {
        obj = { lng: this.pointList[0].lng, lat: this.pointList[0].lat };
        this.placeDetails.loc.push(obj);
      }
    });

    if (this.place_id) {
      this.showLoader = true;
      this.helper
        .updatePlace(this.place_id, this.placeDetails)
        .subscribe((x) => {
          this.showLoader = false;

          if (x[appConstant.STATUS]) {
            this.toastr.success(x[appConstant.MESSAGE]);
            this.placeDetails = {
              _id: "",
              arName: "",
              enName: "",
              city_id: "",
              loc: [],
              cord: [],
            };
            this.deleteSelectedShape();
          } else {
            this.toastr.error(x[appConstant.MESSAGE]);
          }
        });
    } else {
      this.showLoader = true;

      this.helper.addPlace(this.placeDetails).subscribe((x) => {
        this.showLoader = false;

        if (x[appConstant.STATUS]) {
          this.toastr.success(x[appConstant.MESSAGE]);
          this.placeDetails = {
            _id: "",
            arName: "",
            enName: "",
            city_id: "",
            loc: [],
            cord: [],
          };
          this.deleteSelectedShape();
        } else {
          this.toastr.error(x[appConstant.MESSAGE]);
        }
      });
    }
  }
}
