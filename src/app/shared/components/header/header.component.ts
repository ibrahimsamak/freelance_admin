import { Component, OnInit, Output, EventEmitter, Inject } from "@angular/core";
import { NavService, Menu } from "../../services/nav.service";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "../../services/firebase/auth.service";
import { DOCUMENT } from "@angular/common";
import { ConstantServiceWrapper } from "../../../service/ConstantServiceWrapper.service";
import { appConstant, UserType } from "src/app/service/appConstant";

var body = document.getElementsByTagName("body")[0];

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  notificationCount = 0;
  notifications = [];
  admin_id = "";
  public lang: string = "AR";
  public layoutType: string = "ltr";

  public menuItems: Menu[];
  public items: Menu[];
  public searchResult: boolean = false;
  public searchResultEmpty: boolean = false;
  public openNav: boolean = false;
  public right_sidebar: boolean = false;
  public text: string;
  public elem;
  public isOpenMobile: boolean = false;
  @Output() rightSidebarEvent = new EventEmitter<boolean>();
  user_id;
  type;
  userImage;
  public get UserType(): typeof UserType {
    return UserType;
  }

  constructor(
    private helper: ConstantServiceWrapper,
    public navServices: NavService,
    @Inject(DOCUMENT) private document: any,
    private translate: TranslateService,
    public authService: AuthService
  ) {
    translate.setDefaultLang("en");
    this.user_id = localStorage.getItem("admin_id");
    this.type = localStorage.getItem("type");
    this.userImage = localStorage.getItem("image");

    this.helper.getTop10Notification().subscribe((x) => {
      this.notifications = x[appConstant.ITEMS] as any[];
      this.notificationCount = this.notifications.length;
    });

    if (localStorage.getItem("lang")) {
      let currentLang = localStorage.getItem("lang");
      this.lang = currentLang == "ar" ? "AR" : "EN";
    }
  }

  ngOnDestroy() {
    this.removeFix();
  }

  right_side_bar() {
    this.right_sidebar = !this.right_sidebar;
    this.rightSidebarEvent.emit(this.right_sidebar);
  }

  collapseSidebar() {
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
  }

  openMobileNav() {
    this.openNav = !this.openNav;
  }

  public changeLanguage(lang, val) {
    // this.translate.use(lang);
    // this.customize.setLayoutType(val);
    // this.layoutType = val;
    // this.lang = lang === "ar" ? "AR" : "EN";
    localStorage.setItem("lang", lang);

    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
  searchTerm(term: any) {
    term ? this.addFix() : this.removeFix();
    if (!term) return (this.menuItems = []);
    let items = [];
    term = term.toLowerCase();
    this.items.filter((menuItems) => {
      if (
        menuItems.title.toLowerCase().includes(term) &&
        menuItems.type === "link"
      ) {
        items.push(menuItems);
      }
      if (!menuItems.children) return false;
      menuItems.children.filter((subItems) => {
        if (
          subItems.title.toLowerCase().includes(term) &&
          subItems.type === "link"
        ) {
          subItems.icon = menuItems.icon;
          items.push(subItems);
        }
        if (!subItems.children) return false;
        subItems.children.filter((suSubItems) => {
          if (suSubItems.title.toLowerCase().includes(term)) {
            suSubItems.icon = menuItems.icon;
            items.push(suSubItems);
          }
        });
      });
      this.checkSearchResultEmpty(items);
      this.menuItems = items;
    });
  }

  checkSearchResultEmpty(items) {
    if (!items.length) this.searchResultEmpty = true;
    else this.searchResultEmpty = false;
  }

  addFix() {
    this.searchResult = true;
    body.classList.add("offcanvas");
  }

  removeFix() {
    this.searchResult = false;
    body.classList.remove("offcanvas");
    this.text = "";
  }
  ngOnInit() {
    this.elem = document.documentElement;
    this.navServices.items.subscribe((menuItems) => {
      this.items = menuItems;
    });
  }

  toggleFullScreen() {
    this.navServices.fullScreen = !this.navServices.fullScreen;
    if (this.navServices.fullScreen) {
      if (this.elem.requestFullscreen) {
        this.elem.requestFullscreen();
      } else if (this.elem.mozRequestFullScreen) {
        /* Firefox */
        this.elem.mozRequestFullScreen();
      } else if (this.elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.elem.webkitRequestFullscreen();
      } else if (this.elem.msRequestFullscreen) {
        /* IE/Edge */
        this.elem.msRequestFullscreen();
      }
    } else {
      if (!this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }
}
