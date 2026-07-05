import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { appConstant } from "src/app/service/appConstant";
import { ConstantServiceWrapper } from "../../../service/ConstantServiceWrapper.service";
import {
  NgbActiveModal,
  NgbModal,
  ModalDismissReasons,
  NgbModalConfig,
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
import { TranslateService } from "@ngx-translate/core";
declare var require;
const Swal = require("sweetalert2");
@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class WelcomeComponent implements OnInit {
  public formData = new FormData();
  Welcomes = [];
  welcomeObject = {
    _id: "",
    arTitle: "",
    enTitle: "",
    enDescription: "",
    arDescription: "",
    icon: "",
    isDriver: false,
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
    private translate: TranslateService,
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getWelcomes();
  }

  getWelcomes() {
    this.helper.getWelcome().subscribe((x) => {
      var arr = x[appConstant.ITEMS] as any[];
      this.imagesRect = new Array<Image>();
      this.Welcomes = [];
      arr.forEach((element, index) => {
        let _object = {
          newImage: new Image(index, {
            img: element.icon,
            extUrl: element.icon,
            description: element.arTitle,
          }),
          _id: element._id,
          arTitle: element.arTitle,
          enTitle: element.enTitle,
          enDescription: element.enDescription,
          arDescription: element.arDescription,
          icon: element.icon,
        };
        this.imagesRect.push(
          new Image(index, {
            img: element.icon,
            extUrl: element.icon,
            description: element.arTitle,
          })
        );
        this.Welcomes.push(_object);
      });
    });
  }

  openWelcomes(content, obj) {
    this.formData = new FormData();
    if (obj) {
      this.type = "edit";
      this.helper.getSingleWelcome(obj._id).subscribe((x) => {
        this.welcomeObject = x[appConstant.ITEMS] as any;
        this.modalService.open(content, { size: "lg" });
      });
    } else {
      this.type = "add";
      this.welcomeObject = {
        _id: "",
        arTitle: "",
        enTitle: "",
        enDescription: "",
        arDescription: "",
        icon: "",
        isDriver: false,
      };
      this.modalService.open(content, { size: "lg" });
    }
  }

  saveAction() {
    this.formData.append("arDescription", this.welcomeObject.arDescription);
    this.formData.append("enDescription", this.welcomeObject.enDescription);
    this.formData.append("arTitle", this.welcomeObject.arTitle);
    this.formData.append("enTitle", this.welcomeObject.enTitle);
    this.formData.append("isDriver", String(this.welcomeObject.isDriver));

    // if (this.welcomeObject.icon == "") {
    //   this.formData = new FormData();
    //        this.toastr.error(this.translate.instant('ImageRequired'))
    //   return;
    // }

    if (this.type == "edit") {
      this.helper
        .updateWelcome(this.welcomeObject._id, this.formData)
        .subscribe(
          (x) => {
            if (x[appConstant.STATUS] != true) {
              this.toastr.error(x[appConstant.MESSAGE]);
            } else {
              this.toastr.success(x[appConstant.MESSAGE]);
              this.getWelcomes();
            }
            this.modalService.dismissAll();
          },
          (error) => {
            this.helper.serverSideErrorHandler(error);
          }
        );
    } else {
      this.helper.addWelcome(this.formData).subscribe(
        (x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
            this.getWelcomes();
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
        this.helper.deleteWelcome(id).subscribe((x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
          }
          this.getWelcomes();
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
        this.welcomeObject.icon = reader.result as any;
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
}
