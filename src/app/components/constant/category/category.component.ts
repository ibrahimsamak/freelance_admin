import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { appConstant } from "src/app/service/appConstant";
import { ConstantServiceWrapper } from "../../../service/ConstantServiceWrapper.service";
import {
  NgbActiveModal,
  NgbModal,
  NgbModalConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
declare var require;
const Swal = require("sweetalert2");

@Component({
  selector: "app-styles",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
  styles = [];
  reasonObject = {
    _id: "",
    arName: "",
    enName: "",
    arDescription: "",
    enDescription: "",
    sort: 0,
    image: "",
  };

  type = "";
  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.helper.getCategoy().subscribe((x) => {
      this.styles = x[appConstant.ITEMS] as any[];
    });
  }

  openStyles(content, obj) {
    if (obj) {
      this.type = "edit";
      this.helper.getSingleCategoy(obj._id).subscribe((x) => {
        this.reasonObject = x[appConstant.ITEMS] as any;
        this.modalService.open(content, { size: "lg" });
      });
    } else {
      this.type = "add";
      this.reasonObject = {
        _id: "",
        arName: "",
        enName: "",
        arDescription: "",
        enDescription: "",
        sort: 0,
        image:"",
      };
      this.modalService.open(content, { size: "lg" });
    }
  }

  saveAction() {
    var formData = new FormData();
    if (this.reasonObject.image == "") {
      formData = new FormData();
           this.toastr.error(this.translate.instant('ImageRequired'))
      return;
    }

    formData.append("arName", this.reasonObject.arName);
    formData.append("enName", this.reasonObject.enName);
    formData.append("arDescription", this.reasonObject.arDescription);
    formData.append("enDescription", this.reasonObject.enDescription);
    formData.append("sort", String(this.reasonObject.sort));

    if (this.reasonObject.image != "") {
      formData.append("image", this.reasonObject.image);
    }

    if (this.type == "edit") {
      this.helper
        .updateCategoy(this.reasonObject._id, formData)
        .subscribe((x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.getCategories();
          }
          this.modalService.dismissAll();
        });
    } else {
      this.helper.addCategoy(formData).subscribe(
        (x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
            this.getCategories();
          }
          this.modalService.dismissAll();
        },
        (error) => {
          this.helper.serverSideErrorHandler(error);
        }
      );
    }
  }

  deleteStyle(id) {
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
        this.helper.deleteCategoy(id).subscribe((x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
          }
          this.getCategories();
        });
      }
    });
  }

  processImage(event) {
    console.log(event.target.files);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.reasonObject.image = event.target.files[0]
      };
    }
  }
}
