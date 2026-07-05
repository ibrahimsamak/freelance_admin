import { Component, OnInit } from "@angular/core";
import { appConstant } from "../../../../app/service/appConstant";
import { ConstantServiceWrapper } from "../../../service/ConstantServiceWrapper.service";
import {
  NgbActiveModal,
  NgbModal,
  NgbModalConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ar } from "date-fns/locale";
declare var require;
const Swal = require("sweetalert2");

@Component({
  selector: "app-city",
  templateUrl: "./city.component.html",
  styleUrls: ["./city.component.scss"],
})
export class CityComponent implements OnInit {
  cities = [];
  countries = [];
  country_id = "";

  cityObject = {
    _id: "",
    arName: "",
    enName: "",
    country_id: "",
  };
  type = "";
  page = 0;
  size = 0;
  limit = 20;
  collectionCount = 0;
  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllCountries();
    this.getCity("" , this.page, this.limit)
  }

  getAllCountries() {
    this.helper.getCountry().subscribe((x) => {
      this.countries = x[appConstant.ITEMS] as any[];
    });
  }

  getCity(country_id, page, limit) {
    this.helper.getCity(country_id, page, limit).subscribe((x) => {
      let arr = x[appConstant.ITEMS] as any[];
      this.collectionCount = x["pagination"]["totalElements"];
      this.size = x["pagination"]["size"];
      this.page = page + 1;
      this.cities = arr;
    });
  }

  saveAction() {
    if (this.type == "edit") {
      this.helper.updateCity(this.cityObject._id, this.cityObject).subscribe(
        (x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
            this.getCity(this.country_id, this.page - 1, this.limit);
          }
          this.modalService.dismissAll();
        },
        (error) => {
          this.helper.serverSideErrorHandler(error);
        }
      );
    } else {
      this.helper.addCity(this.cityObject).subscribe(
        (x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
            this.getCity(this.country_id, 0, this.limit);
          }
          this.modalService.dismissAll();
        },
        (error) => {
          this.helper.serverSideErrorHandler(error);
        }
      );
    }
  }

  deleteCity(id) {
    Swal.fire({
      title: "تحذير",
      text: "هل انت متأكد من حذف العنصر؟",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "الغاء",
    }).then((result) => {
      if (result.value) {
        this.helper.deleteCity(id).subscribe((x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
          }
          if (this.size == 1 && this.page != 1) this.page = this.page - 2;
          else this.page = this.page - 1;

          this.getCity(this.country_id, this.page, this.limit);
        });
      }
    });
  }

  public onPageChange(pageNum: number): void {
    this.page = pageNum - 1;
    this.helper
      .getCity(this.country_id, this.page, this.limit)
      .subscribe((x) => {
        let arr = x[appConstant.ITEMS] as any[];
        this.collectionCount = x["pagination"]["totalElements"];
        this.cities = arr;
        this.page = pageNum;
      });
  }

  openCity(content, obj) {
    if (obj) {
      this.type = "edit";
      this.helper.getSingleCity(obj._id).subscribe((x) => {
        this.cityObject = x[appConstant.ITEMS] as any;
        this.modalService.open(content, { size: "lg" });
      });
    } else {
      this.type = "add";
      this.cityObject = {
        _id: "",
        arName: "",
        enName: "",
        country_id: "",
      };
      this.modalService.open(content, { size: "lg" });
    }
  }

  search() {
    this.page = 0;
    this.getCity(this.country_id, this.page, this.limit);
  }
}
