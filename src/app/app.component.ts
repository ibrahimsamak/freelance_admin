import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CustomizerService } from "./shared/services/customizer.service";
import { environment } from "../environments/environment";
import { ToastrService } from "ngx-toastr";
import { OrderDetailsPoPComponent } from "./shared/components/order-details/order-details.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
declare var require;
const Swal = require("sweetalert2");

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'endless';


  constructor(
    private translate: TranslateService,
    public customize: CustomizerService,
    public toaster : ToastrService,
    private modalService: NgbModal,
  ) {

  }

  ngOnInit(): void {
    if (localStorage.getItem("lang")) {
      let lang = localStorage.getItem("lang");
      let dir = lang == "ar" ? "rtl" : "ltr";
      this.translate.use(lang);
      this.customize.setLayoutType(dir);
      this.customize.setLayout(dir);
    } else {
      localStorage.setItem("lang", "en");
      this.translate.use("en");
      this.customize.setLayoutType("ltr");
      this.customize.setLayout("ltr");
    }
  }
}

