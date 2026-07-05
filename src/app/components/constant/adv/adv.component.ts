import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { appConstant } from "src/app/service/appConstant";
import { ConstantServiceWrapper } from "../../../service/ConstantServiceWrapper.service";
import {
  NgbActiveModal,
  NgbModal,
  ModalDismissReasons,
  NgbModalConfig,
  NgbDateStruct,
} from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import {
  ButtonsConfig,
  ButtonsStrategy,
  AdvancedLayout,
  GalleryService,
  Image,
  KS_DEFAULT_BTN_CLOSE,
  KS_DEFAULT_BTN_DELETE,
  KS_DEFAULT_BTN_DOWNLOAD,
  KS_DEFAULT_BTN_EXTURL,
  KS_DEFAULT_BTN_FULL_SCREEN,
  ButtonEvent,
  ButtonType,
  PlainGalleryConfig,
  PlainGalleryStrategy,
} from "@ks89/angular-modal-gallery";
import { MomentDateFormatter } from "src/app/service/utils_function";
import { DatePipe } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
declare var require;
const Swal = require("sweetalert2");

@Component({
  selector: "app-places",
  templateUrl: "./adv.component.html",
  styleUrls: ["./adv.component.scss"],
})
export class AdvsComponent implements OnInit {
  public formData = new FormData();
  momentFormat = new MomentDateFormatter();

  Advs = [];
  advObject = {
    _id: "",
    arTitle: "",
    enTitle: "",
    arDescription: "",
    enDescription: "",
    product_id: "",
    store_id: "",
    url: "",
    expiry_date: "",
    ads_for: 1,
    image: "",
  };
  type = "";

  customPlainGalleryRowDescConfig: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.CUSTOM,
    layout: new AdvancedLayout(-1, true),
  };

  buttonsConfigDefault: ButtonsConfig = {
    visible: true,
    strategy: ButtonsStrategy.DEFAULT,
  };

  public imagesRect: Image[] = new Array<Image>();
  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.getAdvs();
  }

  getAdvs() {
    this.helper.getAdvs().subscribe((x) => {
      var arr = x[appConstant.ITEMS] as any[];
      this.Advs = arr;
    });
  }

  openAdvs(content, obj) {
    this.formData = new FormData();
    if (obj) {
      this.type = "edit";
      this.helper.getSingleAdvs(obj._id).subscribe((x) => {
        this.advObject = x[appConstant.ITEMS] as any;
        let dt_from = this.parse(this.advObject.expiry_date);
        this.advObject.expiry_date = dt_from as any;

        this.modalService.open(content, { size: "lg" });
      });
    } else {
      this.type = "add";
      this.advObject = {
        _id: "",
        arTitle: "",
        enTitle: "",
        arDescription: "",
        enDescription: "",
        product_id: "",
        store_id: "",
        url: "",
        expiry_date: "",
        ads_for: 1,
        image: "",
      };
      this.modalService.open(content, { size: "lg" });
    }
  }

  saveAction() {
    this.formData.append("arTitle", this.advObject.arTitle);
    this.formData.append("enTitle", this.advObject.enTitle);
    this.formData.append("arDescription", this.advObject.arDescription);
    this.formData.append("enDescription", this.advObject.enDescription);
    this.formData.append("ads_for", String(this.advObject.ads_for));
    this.formData.append("product_id", this.advObject.product_id);
    this.formData.append("store_id", this.advObject.store_id);
    this.formData.append("url", this.advObject.url);

    if (this.advObject.image == "") {
      this.formData = new FormData();
      this.toastr.error(this.translate.instant('ImageRequired'))
      return;
    }

    if (this.advObject.expiry_date != "") {
      let dt_from = this.momentFormat.format(this.advObject.expiry_date as any);
      this.advObject.expiry_date = dt_from;
    }

    this.formData.append("expiry_date", this.advObject.expiry_date);

    if (this.type == "edit") {
      this.helper.updateAdvs(this.advObject._id, this.formData).subscribe(
        (x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
            this.getAdvs();
          }
          this.modalService.dismissAll();
        },
        (error) => {
          this.helper.serverSideErrorHandler(error);
        }
      );
    } else {
      this.helper.addAdvs(this.formData).subscribe(
        (x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
            this.getAdvs();
          }
          this.modalService.dismissAll();
        },
        (error) => {
          this.helper.serverSideErrorHandler(error);
        }
      );
    }
  }

  deleteReason(id) {
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
        this.helper.deleteAdvs(id).subscribe((x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
          }
          this.getAdvs();
        });
      }
    });
  }

  processImage(event) {
    console.log(event.target.files);
    if (event.target.files && event.target.files[0]) {
      this.formData.append("image", event.target.files[0]);
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.advObject.image = reader.result as any;
      };
    }
  }

  openImageModalRowDescription(image: Image) {
    const index: number = 0;
    this.customPlainGalleryRowDescConfig = Object.assign(
      {},
      this.customPlainGalleryRowDescConfig,
      { layout: new AdvancedLayout(index, true) }
    );
  }

  private getCurrentIndexCustomLayout(image: Image, images: Image[]): number {
    return image ? images.indexOf(image) : -1;
  }

  onButtonBeforeHook(event: ButtonEvent) {
    if (!event || !event.button) {
      return;
    }

    if (event.button.type === ButtonType.DELETE) {
      this.imagesRect = this.imagesRect.filter(
        (val: Image) => event.image && val.id !== event.image.id
      );
    }
  }

  onButtonAfterHook(event: ButtonEvent) {
    if (!event || !event.button) {
      return;
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
}
