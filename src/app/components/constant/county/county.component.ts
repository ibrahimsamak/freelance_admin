import { Component, OnInit } from "@angular/core";
import { appConstant } from "src/app/service/appConstant";
import { ConstantServiceWrapper } from "../../../service/ConstantServiceWrapper.service";
import {
  NgbActiveModal,
  NgbModal,
  ModalDismissReasons,
  NgbModalConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
declare var require;
const Swal = require("sweetalert2");

@Component({
  selector: "app-county",
  templateUrl: "./county.component.html",
  styleUrls: ["./county.component.scss"],
})
export class CountyComponent implements OnInit {
  countryObject = {
    _id: "",
    arName: "",
    enName: "",
  };
  Country = [];
  currentPage = 1;
  itemsPerPage = 50;
  pageSize: number;

  type = "";
  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries() {
    this.helper.getCountry().subscribe((x) => {
      this.Country = x[appConstant.ITEMS] as any[];
    });
  }

  deleteCountry(id) {
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
        this.helper.deleteCountry(id).subscribe((x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
          }
          this.getCountries();
        });
      }
    });
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  saveAction() {
    if (this.type == "edit") {
      this.helper
        .updateCountry(this.countryObject._id, this.countryObject)
        .subscribe(
          (x) => {
            if (x[appConstant.STATUS] != true) {
              this.toastr.error(x[appConstant.MESSAGE]);
            } else {
              this.toastr.success(x[appConstant.MESSAGE]);
              this.getCountries();
            }
            this.modalService.dismissAll();
          },
          (error) => {
            this.helper.serverSideErrorHandler(error);
          }
        );
    } else {
      this.helper.addCountry(this.countryObject).subscribe(
        (x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
            this.getCountries();
          }
          this.modalService.dismissAll();
        },
        (error) => {
          this.helper.serverSideErrorHandler(error);
        }
      );
    }
  }

  openCountry(content, obj) {
    if (obj) {
      this.type = "edit";
      this.helper.getSingleCountrty(obj._id).subscribe((x) => {
        this.countryObject = x[appConstant.ITEMS] as any;
        this.modalService.open(content, { size: "lg" });
      });
    } else {
      this.type = "add";
      this.countryObject = {
        _id: "",
        arName: "",
        enName: "",
      };
      this.modalService.open(content, { size: "lg" });
    }
  }
}
