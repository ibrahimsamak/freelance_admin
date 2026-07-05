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

@Component({
  selector: "app-general-setting",
  templateUrl: "./general-setting.component.html",
  styleUrls: ["./general-setting.component.scss"],
})
export class GeneralSettingComponent implements OnInit {
  settings = [];
  settingObje = {
    _id: "",
    name: "",
    min: "",
    max: "",
    code: "",
    value: "",
  };
  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getSettings();
  }

  getSettings() {
    this.helper.getSittings().subscribe((x) => {
      this.settings = x[appConstant.ITEMS]['settings'] as any[];
    });
  }

  openSettings(content, obj) {
    this.helper.getSingleSittings(obj._id).subscribe((x) => {
      this.settingObje = x[appConstant.ITEMS] as any;
      this.modalService.open(content, { size: "lg" });
    });
  }

  saveAction() {
    this.helper
      .updateSettings(this.settingObje._id, this.settingObje)
      .subscribe((x) => {
        if (x[appConstant.STATUS] != true) {
          this.toastr.error(x[appConstant.MESSAGE]);
        } else {
          this.toastr.success(x[appConstant.MESSAGE]);
          this.getSettings();
        }
        this.modalService.dismissAll();
      });
  }
}
