import { Injectable, HostListener } from "@angular/core";
import { BehaviorSubject, Observable, Subscriber } from "rxjs";
import { appConstant, UserType } from "src/app/service/appConstant";

// Menu
export interface Menu {
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
}

@Injectable({
  providedIn: "root",
})
export class NavService {
  public screenWidth: any;
  public collapseSidebar: boolean = false;
  public fullScreen = false;

  constructor() {
    this.onResize();
    if (this.screenWidth < 991) {
      this.collapseSidebar = true;
    }
  }

  // Windows width
  @HostListener("window:resize", ["$event"])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  MENUITEMS: Menu[] = [
    // {
    //   path: "/dashboard/default",
    //   title: "الرئيسية",
    //   icon: "home",
    //   type: "link",
    //   //   badgeType: "primary",
    //   //   badgeValue: "new",
    //   active: true,
    // },
    // {
    //   title: "الثوابت",
    //   icon: "slack",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     { path: "/constant/settings", title: "الاعدادات العامة", type: "link" },
    //     { path: "/constant/social", title: "التواصل الاجتماعي", type: "link" },
    //     { path: "/constant/static", title: "الصحفات الثابتة", type: "link" },
    //     {
    //       path: "/constant/complaints",
    //       title: "التواصل والشكاوي",
    //       type: "link",
    //     },
    //     {
    //       path: "/constant/welcome",
    //       title: "الواجهات الترحيبية",
    //       type: "link",
    //     },
    //     {
    //       path: "/constant/advs",
    //       title: "سلايدر الاعلانات",
    //       type: "link",
    //     },
    //     {
    //       path: "/constant/category",
    //       title: "التصنيفات",
    //       type: "link",
    //     },
    //     {
    //       path: "/constant/country",
    //       title: "قائمة الدول",
    //       type: "link",
    //     },
    //     {
    //       path: "/constant/city",
    //       title: "قائمة المدن",
    //       type: "link",
    //     },
    //   ],
    // },
    // {
    //   title: "المستخدمين والعملاء",
    //   icon: "users",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     {
    //       path: "/users/admins",
    //       title: "الادارة",
    //       type: "link",
    //     },
    //     { path: "/users/clients", title: "العملاء", type: "link" },
    //     {
    //       path: "/users/designers",
    //       title: "المصممين والمتاجر",
    //       type: "link",
    //     },
    //   ],
    // },
    // {
    //   title: "المشاريع والمنتجات",
    //   icon: "list",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     { path: "/items/products", title: "المنتجات", type: "link" },
    //     { path: "/items/projects", title: "المشاريع", type: "link" },
    //   ],
    // },
    // {
    //   title: "الطلبات والعائدات",
    //   icon: "dollar-sign",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     { path: "/orders/orders", title: "الطلبات", type: "link" },
    //     { path: "/orders/earning", title: "العائدات المالية", type: "link" },
    //     { path: "/orders/comments", title: "التعليقات", type: "link" },
    //   ],
    // },
    // {
    //   title: "الرسائل والاشعارات",
    //   icon: "message-square",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     { path: "/mass/notifications", title: "التنبيهات", type: "link" },
    //     { path: "/mass/add", title: "اضافة تنبيه", type: "link" },
    //   ],
    // },
  ];
  // items = new BehaviorSubject<Menu[]>(this.MENUITEMS);

  getMenu() {
    var userRoles: any[] = JSON.parse(localStorage.getItem("roles"));
    var userType = localStorage.getItem("type");
    var admin_id = localStorage.getItem("admin_id");
    this.MENUITEMS = [];

    let constant = {
      title: "Constant",
      icon: "slack",
      type: "sub",
      active: false,
      children: [],
    };

    let users = {
      title: "LoggedUser",
      icon: "users",
      type: "sub",
      active: false,
      children: [],
    };

    let items = {
      title: "Services",
      icon: "list",
      type: "sub",
      active: false,
      children: [],
    };

    let orders = {
      title: "Orders",
      icon: "dollar-sign",
      type: "sub",
      active: false,
      children: [],
    };

    let maps = {
      title: "Maps",
      icon: "map",
      type: "sub",
      active: false,
      children: [],
    };

    let notification = {
      title: "Notifications_Messages",
      icon: "message-square",
      type: "sub",
      active: false,
      children: [],
    };

    let offers = {
      title: "Offers",
      icon: "percent",
      type: "sub",
      active: false,
      children: [],
    };

    if (userType == UserType.ADMIN) {
      userRoles.sort((val1, val2) => {
        return Number(val1.sort) - Number(val2.sort);
      });

      userRoles.forEach((element) => {
        if (element.name == appConstant.ADMIN_URL_ID.DASHBOARD) {
          let obj = {
            path: "/dashboard/default",
            title: "Dashboard",
            icon: "home",
            type: "link",
            //   badgeType: "primary",
            //   badgeValue: "new",
            active: true,
          };
          this.MENUITEMS.push(obj);
        }
        if (
          element.name == appConstant.ADMIN_URL_ID.SETTINGS ||
          element.name == appConstant.ADMIN_URL_ID.WELCOME ||
          element.name == appConstant.ADMIN_URL_ID.COMPLAINS ||
          element.name == appConstant.ADMIN_URL_ID.CONTACT ||
          element.name == appConstant.ADMIN_URL_ID.COUNTRY ||
          element.name == appConstant.ADMIN_URL_ID.CITY ||
          element.name == appConstant.ADMIN_URL_ID.STATIC ||
          element.name == appConstant.ADMIN_URL_ID.CATEGORY ||
          element.name == appConstant.ADMIN_URL_ID.SUBCATEGORY
        ) {
          if (element.name == appConstant.ADMIN_URL_ID.SETTINGS) {
            let obj = {
              path: "/constant/settings",
              title: "General-Settings",
              type: "link",
            };
            constant.children.push(obj);
          }
          // if (element.name == appConstant.ADMIN_URL_ID.CITY) {
          //   let obj = {
          //     path: "/constant/city",
          //     title: "Cities",
          //     type: "link",
          //   };
          //   constant.children.push(obj);
          // }
          if (element.name == appConstant.ADMIN_URL_ID.CONTACT) {
            let obj = {
              path: "/constant/social",
              title: "Social",
              type: "link",
            };

            constant.children.push(obj);
          }
          if (element.name == appConstant.ADMIN_URL_ID.STATIC) {
            let obj = {
              path: "/constant/static",
              title: "Static-Page",
              type: "link",
            };

            constant.children.push(obj);
          }
          if (element.name == appConstant.ADMIN_URL_ID.COMPLAINS) {
            let obj = {
              path: "/constant/complaints",
              title: "Contact-Us",
              type: "link",
            };
            constant.children.push(obj);
          }
          if (element.name == appConstant.ADMIN_URL_ID.WELCOME) {
            let obj = {
              path: "/constant/welcome",
              title: "Walkthrough",
              type: "link",
            };
            constant.children.push(obj);
          }

          // if (element.name == appConstant.ADMIN_URL_ID.COUNTRY) {
          //   let obj = {
          //     path: "/constant/country",
          //     title: "قائمة الدول",
          //     type: "link",
          //   };
          //   constant.children.push(obj);
          // }
          // if (element.name == appConstant.ADMIN_URL_ID.CITY) {
          //   let obj = {
          //     path: "/constant/city",
          //     title: "قائمة المدن",
          //     type: "link",
          //   };
          //   constant.children.push(obj);
          // }

          if (element.name == appConstant.ADMIN_URL_ID.CATEGORY) {
            let obj = {
              path: "/constant/category",
              title: "Type",
              type: "link",
            };

            constant.children.push(obj);
          }
          // if (element.name == appConstant.ADMIN_URL_ID.CATEGORY) {
          //   let obj = {
          //     path: "/constant/reason",
          //     title: "Co_Type",
          //     type: "link",
          //   };

          //   constant.children.push(obj);
          // }

          if (element.name == appConstant.ADMIN_URL_ID.SUBCATEGORY) {
            let obj = {
              path: "/constant/subcategory",
              title: "Advantage",
              type: "link",
            };

            constant.children.push(obj);
          }
        }

        if (
          element.name == appConstant.ADMIN_URL_ID.USER ||
          element.name == appConstant.ADMIN_URL_ID.STORES ||
          element.name == appConstant.ADMIN_URL_ID.ADMINS
        ) {
          if (element.name == appConstant.ADMIN_URL_ID.ADMINS) {
            let obj = {
              path: "/users/admins",
              title: "Admin",
              type: "link",
            };
            users.children.push(obj);
          }

          if (element.name == appConstant.ADMIN_URL_ID.STORES) {
            let obj = {
              path: "/users/provider",
              title: "Users",
              type: "link",
            };
            users.children.push(obj);
          }
         
          if (element.name == appConstant.ADMIN_URL_ID.USER) {
            let obj = {
              path: "/users/clients",
              title: "Provider",
              type: "link",
            };
            users.children.push(obj);
          }

          // if (element.name == appConstant.ADMIN_URL_ID.SUPER) {
          //   let obj = {
          //     path: "/users/supervisor",
          //     title: "Super",
          //     type: "link",
          //   };
          //   users.children.push(obj);
          // }

          // if (element.name == appConstant.ADMIN_URL_ID.EMPLOYEE) {
          //   let obj = {
          //     path: "/users/employee",
          //     title: "Employee",
          //     type: "link",
          //   };
          //   users.children.push(obj);
          // }
        }



        if (
          element.name == appConstant.ADMIN_URL_ID.ORDERS ||
          element.name == appConstant.ADMIN_URL_ID.USERRATE
        ) {
          if (element.name == appConstant.ADMIN_URL_ID.ORDERS) {
            // let obj = {
            //   path: "/orders/add",
            //   title: "اضافة طلب",
            //   type: "link",
            // };
            // orders.children.push(obj);

            let obj2 = {
              path: "/orders/orders",
              title: "Orders",
              type: "link",
            };
            orders.children.push(obj2);
          }

          // if (element.name == appConstant.ADMIN_URL_ID.ORDEREARNING) {
          //   let obj = {
          //     path: "/orders/earning",
          //     title: "CostData",
          //     type: "link",
          //   };
          //   orders.children.push(obj);
          // }

          // if (element.name == appConstant.ADMIN_URL_ID.TRANSACTION) {
          //   let obj = {
          //     path: "/orders/transaction",
          //     title: "TransactionData",
          //     type: "link",
          //   };
          //   orders.children.push(obj);
          // }

          if (element.name == appConstant.ADMIN_URL_ID.USERRATE) {
            let obj = {
              path: "/orders/comments",
              title: "OrderUserComment",
              type: "link",
            };
            orders.children.push(obj);
          }

          
          if (element.name == appConstant.ADMIN_URL_ID.USERRATE) {
            let obj = {
              path: "/orders/comments-employee",
              title: "OrderProviderComment",
              type: "link",
            };
            orders.children.push(obj);
          }
        }

        // if (
        //   element.name == appConstant.ADMIN_URL_ID.ORDERSMAP ||
        //   element.name == appConstant.ADMIN_URL_ID.UNCOVERAGEMAP ||
        //   element.name == appConstant.ADMIN_URL_ID.EMPLOYEE
        // ) {
        //   if (element.name == appConstant.ADMIN_URL_ID.ORDERSMAP) {
        //     let obj = {
        //       path: "/maps/order_maps",
        //       title: "Cover",
        //       type: "link",
        //     };
        //     maps.children.push(obj);
        //   }
        //   // if (element.name == appConstant.ADMIN_URL_ID.EMPLOYEE) {
        //   //   let obj = {
        //   //     path: "/maps/driver_map",
        //   //     title: "التغطية الجغرافي للمستخدمين",
        //   //     type: "link",
        //   //   };
        //   //   maps.children.push(obj);
        //   // }
    
        //   if (element.name == appConstant.ADMIN_URL_ID.UNCOVERAGEMAP) {
        //     let obj = {
        //       path: "/maps/unconvarage_map",
        //       title: "UnCover",
        //       type: "link",
        //     };
        //     maps.children.push(obj);
        //   }
        // }

        // if (
        //   element.name == appConstant.ADMIN_URL_ID.COUPON ||
        //   element.name == appConstant.ADMIN_URL_ID.ADVS
        // ) {
        //   if (element.name == appConstant.ADMIN_URL_ID.COUPON) {
        //     let obj = {
        //       path: "/offers/coupon",
        //       title: "Coupons",
        //       type: "link",
        //     };

        //     offers.children.push(obj);
        //   }

        //   if (element.name == appConstant.ADMIN_URL_ID.ADVS) {
        //     let obj2 = {
        //       path: "/constant/advs",
        //       title: "Slider",
        //       type: "link",
        //     };
        //     offers.children.push(obj2);
        //   }
        // }

        if (
          element.name == appConstant.ADMIN_URL_ID.NOTIFICATIONS_ADD ||
          element.name == appConstant.ADMIN_URL_ID.NOTIFICATIONS
        ) {
          if (element.name == appConstant.ADMIN_URL_ID.NOTIFICATIONS_ADD) {
            let obj = {
              path: "/mass/add",
              title: "SendNotification",
              type: "link",
            };

            notification.children.push(obj);
          }

          if (element.name == appConstant.ADMIN_URL_ID.NOTIFICATIONS) {
            let obj = {
              path: "/mass/notifications",
              title: "Notifications1",
              type: "link",
            };
            notification.children.push(obj);
          }

          if (element.name == appConstant.ADMIN_URL_ID.NOTIFICATIONS) {
            let obj = {
              path: "/mass/notifications2",
              title: "Notifications2",
              type: "link",
            };
            notification.children.push(obj);
          }
          // if (element.name == appConstant.ADMIN_URL_ID.MYMESSAGES) {
          //   let obj = {
          //     path: "/mass/messages",
          //     title: "الرسائل الواردة",
          //     type: "link",
          //   };
          //   notification.children.push(obj);
          // }
        }
      });

      if (constant.children.length > 0) this.MENUITEMS.push(constant);
      if (users.children.length > 0) this.MENUITEMS.push(users);
      if (items.children.length > 0) this.MENUITEMS.push(items);
      if (orders.children.length > 0) this.MENUITEMS.push(orders);
      if (maps.children.length > 0) this.MENUITEMS.push(maps);
      if (offers.children.length > 0) this.MENUITEMS.push(offers);
      if (notification.children.length > 0) this.MENUITEMS.push(notification);
      return this.MENUITEMS;
    }
    if (userType == UserType.STORE) {
      let obj = {
        path: "/dashboard/default",
        title: "Dashboard",
        icon: "home",
        type: "link",
        //   badgeType: "primary",
        //   badgeValue: "new",
        active: true,
      };
      this.MENUITEMS.push(obj);

      // let obj1 = {
      //   path: "/users/provider",
      //   title: "مزودين الخدمات",
      //   type: "link",
      // };
      // users.children.push(obj1);

      let obj2 = {
        path: "/users/supervisor",
        title: "Super",
        type: "link",
      };
      users.children.push(obj2);

      let obj3 = {
        path: "/users/employee",
        title: "Employee",
        type: "link",
      };
      users.children.push(obj3);

      let obj4 = {
        path: "/orders/orders",
        title: "Orders",
        type: "link",
      };
      orders.children.push(obj4);

      let obj5 = {
        path: "/orders/earning",
        title: "CostData",
        type: "link",
      };
      orders.children.push(obj5);

      let obj6 = {
        path: "/orders/transaction",
        title: "TransactionData",
        type: "link",
      };
      orders.children.push(obj6);
      
      
      let obj7 = {
        path: "/orders/earning",
        title: "ProfitData",
        type: "link",
      };
      orders.children.push(obj7);

      let obj8 = {
        path: "/orders/comments",
        title: "Type",
        type: "link",
      };
      orders.children.push(obj8);


    if (constant.children.length > 0) this.MENUITEMS.push(constant);
    if (users.children.length > 0) this.MENUITEMS.push(users);
    if (items.children.length > 0) this.MENUITEMS.push(items);
    if (orders.children.length > 0) this.MENUITEMS.push(orders);
    if (maps.children.length > 0) this.MENUITEMS.push(maps);
    if (offers.children.length > 0) this.MENUITEMS.push(offers);
    if (notification.children.length > 0) this.MENUITEMS.push(notification);
    return this.MENUITEMS;
    }
    if (userType == UserType.SUPERVISOR) {
      let obj = {
        path: "/dashboard/default",
        title: "Dashboard",
        icon: "home",
        type: "link",
        //   badgeType: "primary",
        //   badgeValue: "new",
        active: true,
      };
      this.MENUITEMS.push(obj);

      // let obj1 = {
      //   path: "/users/provider",
      //   title: "مزودين الخدمات",
      //   type: "link",
      // };
      // users.children.push(obj1);

      let obj3 = {
        path: "/users/employee",
        title: "Employee",
        type: "link",
      };
      users.children.push(obj3);

      let obj4 = {
        path: "/orders/orders",
        title: "Orders",
        type: "link",
      };
      orders.children.push(obj4);

      let obj5 = {
        path: "/orders/earning",
        title: "ProfitData",
        type: "link",
      };
      orders.children.push(obj5);

      let obj6 = {
        path: "/orders/comments",
        title: "Type",
        type: "link",
      };
      orders.children.push(obj6);

    if (constant.children.length > 0) this.MENUITEMS.push(constant);
    if (users.children.length > 0) this.MENUITEMS.push(users);
    if (items.children.length > 0) this.MENUITEMS.push(items);
    if (orders.children.length > 0) this.MENUITEMS.push(orders);
    if (maps.children.length > 0) this.MENUITEMS.push(maps);
    if (offers.children.length > 0) this.MENUITEMS.push(offers);
    if (notification.children.length > 0) this.MENUITEMS.push(notification);
    return this.MENUITEMS;
    }
    // if (
    //   userType == UserType.DESIGNER ||
    //   userType == UserType.IMPLEMENTER ||
    //   userType == UserType.STORE
    // ) {
    //   let obj = {
    //     path: "/dashboard/default",
    //     title: "الرئيسية",
    //     icon: "home",
    //     type: "link",
    //     active: true,
    //   };
    //   this.MENUITEMS.push(obj);

    //   let obj2 = {
    //     path: "/users/designers/details/" + admin_id,
    //     title: "الملف الشخصي",
    //     icon: "user",
    //     type: "link",
    //     active: true,
    //   };
    //   this.MENUITEMS.push(obj2);

    //   if (userType == UserType.DESIGNER || userType == UserType.IMPLEMENTER) {
    //     let obj3 = {
    //       path: "/items/projects",
    //       title: "المشاريع",
    //       icon: "slack",
    //       type: "link",
    //       active: true,
    //     };
    //     this.MENUITEMS.push(obj3);
    //   }

    //   if (userType == UserType.STORE) {
    //     let obj3 = {
    //       path: "/items/products",
    //       title: "المنتجات",
    //       icon: "slack",
    //       type: "link",
    //       active: true,
    //     };
    //     this.MENUITEMS.push(obj3);
    //   }
    //   let obj4 = {
    //     path: "/orders/orders",
    //     title: "الطلبات",
    //     type: "link",
    //   };
    //   orders.children.push(obj4);

    //   let obj5 = {
    //     path: "/orders/earning",
    //     title: "العائدات المالية",
    //     type: "link",
    //   };
    //   orders.children.push(obj5);

    //   let obj6 = {
    //     path: "/orders/comments",
    //     title: "التعليقات",
    //     type: "link",
    //   };
    //   orders.children.push(obj6);

    //   let obj7 = {
    //     path: "/mass/notifications",
    //     title: "التنبيهات",
    //     type: "link",
    //   };
    //   notification.children.push(obj7);

    //   let obj8 = {
    //     path: "/mass/messages",
    //     title: "الرسائل الواردة",
    //     type: "link",
    //   };
    //   notification.children.push(obj8);

    //   if (userType == UserType.IMPLEMENTER || userType == UserType.DESIGNER) {
    //     let obj9 = {
    //       path: "/chat",
    //       title: "المحادثات الفورية",
    //       type: "link",
    //     };
    //     notification.children.push(obj9);
    //   }

    //   if (orders.children.length > 0) this.MENUITEMS.push(orders);
    //   if (notification.children.length > 0) this.MENUITEMS.push(notification);

    //   return this.MENUITEMS;
    // }
 }
  Array;
  items = new BehaviorSubject<Menu[]>(this.getMenu());
}
