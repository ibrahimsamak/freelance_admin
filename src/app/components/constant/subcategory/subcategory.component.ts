import { Component, OnInit } from "@angular/core";
import { appConstant } from "src/app/service/appConstant";
import { ConstantServiceWrapper } from "../../../service/ConstantServiceWrapper.service";
import {
  NgbActiveModal,
  NgbModal,
  NgbModalConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ar } from "date-fns/locale";
import { TranslateService } from "@ngx-translate/core";
declare var require;
const Swal = require("sweetalert2");

@Component({
  selector: "app-city",
  templateUrl: "./subcategory.component.html",
  styleUrls: ["./subcategory.component.scss"],
})
export class SubCategoryComponent implements OnInit {
  cities = [];
  categories = [];
  category_id = "";

  subCatObject = {
    _id: "",
    arName: "",
    enName: "",
    category_id: "",
    price:0,
    arDescription: "",
    enDescription: "",
    image: "",
  };
  type = "";
  page = 0;
  size = 0;
  limit = 20;
  collectionCount = 0;
  lang = ""
  constructor(
    private translate: TranslateService,
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.lang = this.translate.currentLang
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.getSubCategory("")
  }

  getAllCategories() {
    this.helper.getCategoy().subscribe((x) => {
      this.categories = x[appConstant.ITEMS] as any[];
    });
  }

  getSubCategory(country_id) {
    this.helper.getSubCategoy(country_id).subscribe((x) => {
      let arr = x[appConstant.ITEMS] as any[];
      this.cities = arr;
    });
  }

  saveAction() {
    var formData = new FormData();
    if (this.subCatObject.image == "") {
      formData = new FormData();
           this.toastr.error(this.translate.instant('ImageRequired'))
      return;
    }

    formData.append("arName", this.subCatObject.arName);
    formData.append("enName", this.subCatObject.enName);
    formData.append("arDescription", this.subCatObject.arDescription);
    formData.append("enDescription", this.subCatObject.enDescription);
    formData.append("category_id", this.subCatObject.category_id);
    formData.append("price", String(this.subCatObject.price));
    
    if (this.subCatObject.image != "") {
      formData.append("image", this.subCatObject.image);
    }

    if (this.type == "edit") {
      this.helper.updateSubCategoy(this.subCatObject._id, formData).subscribe(
        (x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
            this.getSubCategory(this.category_id);
          }
          this.modalService.dismissAll();
        },
        (error) => {
          this.helper.serverSideErrorHandler(error);
        }
      );
    } else {
      this.helper.addSubCategoy(formData).subscribe(
        (x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
            this.getSubCategory(this.category_id);
          }
          this.modalService.dismissAll();
        },
        (error) => {
          this.helper.serverSideErrorHandler(error);
        }
      );
    }
  }

  deleteSubCategory(id) {
    Swal.fire({
      title: "تحذير",
      text: this.translate.instant("Confirm"),
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#ff7c92",
      confirmButtonText: this.translate.instant("Yes"),
      cancelButtonText: this.translate.instant("Cancel"),
    }).then((result) => {
      if (result.value) {
        this.helper.deleteSubCategoy(id).subscribe((x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
          }
          if (this.size == 1 && this.page != 1) this.page = this.page - 2;
          else this.page = this.page - 1;

          this.getSubCategory(this.category_id);
        });
      }
    });
  }


  openSubCategory(content, obj) {
    if (obj) {
      this.type = "edit";
      this.helper.getSingleSubCategoy(obj._id).subscribe((x) => {
        this.subCatObject = x[appConstant.ITEMS] as any;
        this.modalService.open(content, { size: "lg" });
      });
    } else {
      this.type = "add";
      this.subCatObject = {
        _id: "",
        arName: "",
        enName: "",
        category_id: "",
        price:0,
        arDescription: "",
        enDescription: "",
        image: "",
      };
      this.modalService.open(content, { size: "lg" });
    }
  }

  search() {
    this.page = 0;
    this.getSubCategory(this.category_id);
  }

  processImage(event) {
    console.log(event.target.files);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.subCatObject.image = event.target.files[0]
      };
    }
  }
}
