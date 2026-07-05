import { environment } from "../../environments/environment";

export class appConstant {
  public static SUM = "sum";
  public static ITEMS = "items";
  public static STATUS = "status";
  public static MESSAGE = "message";
  public static PAGINATION = "pagenation";
  public static STATUS_CODE = "status_code";
  public static BASE_URL = environment.base_url;
  public static admin_id = localStorage.getItem("admin_id");
  public static admin_token = localStorage.getItem("admin_token");

  public static ADMIN_URL_STRINGS = {
    DASHBOARD: "الرئيسية",
    MYPROFILE: "الملف الشخصي",
    MYNOTIFICATIONS: "التنبيهات",
    // MYMESSAGES: "الرسائل الواردة",

    //Settings
    SETTINGS: "الاعدادات العامة",
    CONTACT: "التواصل الاجتماعي",
    STATIC: "الصحفات الثابتة",
    COMPLAINS: "التواصل والشكاوي",
    WELCOME: "الواجهات الترحيبية",
    // ADVS: "سلايدر الاعلانات",
    CATEGORY: "التصنيفات",
    SUBCATEGORY: "التصنيفات الفرعية",
    COUNTRY: "قائمة الدول",
    CITY: "قائمة المدن",

    //Advs
    // COUPON: "الكوبونات",

    //users
    USER: "المستخدمين",
    STORES: "مزودين الخدمات",
    // SUPER: "المشرفين",
    // EMPLOYEE: "الفنيين",
    ADMINS: "مستخدمين النظام",

    //items
    // PRODUCTS: "المنتجات",
    // PLACES: "مناطق ومربعات التغطية",
    // PRODUCTS_PLACES: "منتجات المربعات",
    // STORE_PLACES: "مزودين المربعات",

    //Orders
    ORDERS: "الطلبات",
    // ORDEREARNING: "العائدات المالية",
    USERRATE: "التعليقات",

    //map
    // ORDERSMAP: "خريطة الطلبات",
    // UNCOVERAGEMAP: "المناطق الغير مغطاة",

    //Payments
    // TRANSACTION: "المستحقات والمدفوعات",

    //Notifications
    NOTIFICATIONS: "التنبيهات",
    NOTIFICATIONS_ADD: "اضافة تنبيه",
  };

  public static ADMIN_URL_ID = {
    DASHBOARD: "Dashboard",
    MYPROFILE: "My_Profile",
    MYNOTIFICATIONS: "My_Notification",
    // MYMESSAGES: "My_Messages",

    //Settings
    SETTINGS: "Settings",
    CONTACT: "Contact",
    STATIC: "Static",
    COMPLAINS: "Complains",
    WELCOME: "Welcome",
    ADVS: "Advs",
    CATEGORY: "Category",
    SUBCATEGORY:"SubCategory",
    COUNTRY: "Country",
    CITY: "City",

    //Advs
    COUPON: "Coupon",

    //users
    USER: "User",
    STORES: "Store",
    // SUPER: "Super",
    // EMPLOYEE: "Employee",
    ADMINS: "Admin",

    //items
    PRODUCTS: "Products",
    // PLACES: "Places",
    // PRODUCTS_PLACES: "Products_Places",
    // STORE_PLACES: "Store_Places",

    //Orders
    ORDERS: "Order",
    // ORDEREARNING: "Order_Earning",
    USERRATE: "Comments",

    // ORDERSMAP: "Order_map",
    // UNCOVERAGEMAP: "Uncovarate_map",

    //Payments
    // TRANSACTION: "Transaction",

    //Notifications
    NOTIFICATIONS: "Notification",
    NOTIFICATIONS_ADD: "Notification_Add",
  };

  // CONSTANT ARRAY
  public static ADMIN_URL = [
    {
      ID: appConstant.ADMIN_URL_ID.DASHBOARD,
      Name: appConstant.ADMIN_URL_STRINGS.DASHBOARD,
      Sort: 1,
    },
    {
      ID: appConstant.ADMIN_URL_ID.MYPROFILE,
      Name: appConstant.ADMIN_URL_STRINGS.MYPROFILE,
      Sort: 2,
    },

    {
      ID: appConstant.ADMIN_URL_ID.MYNOTIFICATIONS,
      Name: appConstant.ADMIN_URL_STRINGS.MYNOTIFICATIONS,
      Sort: 3,
    },

    {
      ID: appConstant.ADMIN_URL_ID.SETTINGS,
      Name: appConstant.ADMIN_URL_STRINGS.SETTINGS,
      Sort: 6,
    },
    {
      ID: appConstant.ADMIN_URL_ID.CONTACT,
      Name: appConstant.ADMIN_URL_STRINGS.CONTACT,
      Sort: 8,
    },
    {
      ID: appConstant.ADMIN_URL_ID.STATIC,
      Name: appConstant.ADMIN_URL_STRINGS.STATIC,
      Sort: 9,
    },
    {
      ID: appConstant.ADMIN_URL_ID.COMPLAINS,
      Name: appConstant.ADMIN_URL_STRINGS.COMPLAINS,
      Sort: 10,
    },
    {
      ID: appConstant.ADMIN_URL_ID.WELCOME,
      Name: appConstant.ADMIN_URL_STRINGS.WELCOME,
      Sort: 10,
    },
    // {
    //   ID: appConstant.ADMIN_URL_ID.ADVS,
    //   Name: appConstant.ADMIN_URL_STRINGS.ADVS,
    //   Sort: 11,
    // },
    {
      ID: appConstant.ADMIN_URL_ID.CATEGORY,
      Name: appConstant.ADMIN_URL_STRINGS.CATEGORY,
      Sort: 12,
    },
    {
      ID: appConstant.ADMIN_URL_ID.SUBCATEGORY,
      Name: appConstant.ADMIN_URL_STRINGS.SUBCATEGORY,
      Sort: 13,
    },
    // {
    //   ID: appConstant.ADMIN_URL_ID.COUNTRY,
    //   Name: appConstant.ADMIN_URL_STRINGS.COUNTRY,
    //   Sort: 13,
    // },
    // {
    //   ID: appConstant.ADMIN_URL_ID.CITY,
    //   Name: appConstant.ADMIN_URL_STRINGS.CITY,
    //   Sort: 14,
    // },

    {
      ID: appConstant.ADMIN_URL_ID.USER,
      Name: appConstant.ADMIN_URL_STRINGS.USER,
      Sort: 16,
    },
    {
      ID: appConstant.ADMIN_URL_ID.STORES,
      Name: appConstant.ADMIN_URL_STRINGS.STORES,
      Sort: 17,
    },
    {
      ID: appConstant.ADMIN_URL_ID.ADMINS,
      Name: appConstant.ADMIN_URL_STRINGS.ADMINS,
      Sort: 18,
    },
    // {
    //   ID: appConstant.ADMIN_URL_ID.PRODUCTS,
    //   Name: appConstant.ADMIN_URL_STRINGS.PRODUCTS,
    //   Sort: 19,
    // },
    // {
    //   ID: appConstant.ADMIN_URL_ID.STORE_PLACES,
    //   Name: appConstant.ADMIN_URL_STRINGS.STORE_PLACES,
    //   Sort: 19,
    // },
    // {
    //   ID: appConstant.ADMIN_URL_ID.PRODUCTS_PLACES,
    //   Name: appConstant.ADMIN_URL_STRINGS.PRODUCTS_PLACES,
    //   Sort: 19,
    // },
    // {
    //   ID: appConstant.ADMIN_URL_ID.PLACES,
    //   Name: appConstant.ADMIN_URL_STRINGS.PLACES,
    //   Sort: 20,
    // },
    {
      ID: appConstant.ADMIN_URL_ID.ORDERS,
      Name: appConstant.ADMIN_URL_STRINGS.ORDERS,
      Sort: 21,
    },
    {
      ID: appConstant.ADMIN_URL_ID.USERRATE,
      Name: appConstant.ADMIN_URL_STRINGS.USERRATE,
      Sort: 23,
    },
    // {
    //   ID: appConstant.ADMIN_URL_ID.UNCOVERAGEMAP,
    //   Name: appConstant.ADMIN_URL_STRINGS.UNCOVERAGEMAP,
    //   Sort: 25,
    // },

    //payments
    {
      ID: appConstant.ADMIN_URL_ID.NOTIFICATIONS_ADD,
      Name: appConstant.ADMIN_URL_STRINGS.NOTIFICATIONS_ADD,
      Sort: 27,
    },
    {
      ID: appConstant.ADMIN_URL_ID.NOTIFICATIONS,
      Name: appConstant.ADMIN_URL_STRINGS.NOTIFICATIONS,
      Sort: 28,
    },
    // {
    //   ID: appConstant.ADMIN_URL_ID.MYMESSAGES,
    //   Name: appConstant.ADMIN_URL_STRINGS.MYMESSAGES,
    //   Sort: 29,
    // },
  ];

  // CONSTANT ARRAY
  public static DESIGNER_URL = [
    {
      id: appConstant.ADMIN_URL_ID.MYNOTIFICATIONS,
      name: appConstant.ADMIN_URL_STRINGS.MYNOTIFICATIONS,
      sort: 3,
    },
    // {
    //   ID: appConstant.ADMIN_URL_ID.PRODUCTS,
    //   Name: appConstant.ADMIN_URL_STRINGS.PRODUCTS,
    //   Sort: 19,
    // },
    {
      id: appConstant.ADMIN_URL_ID.STORES,
      name: appConstant.ADMIN_URL_STRINGS.STORES,
      sort: 17,
    },
    {
      id: appConstant.ADMIN_URL_ID.ORDERS,
      name: appConstant.ADMIN_URL_STRINGS.ORDERS,
      sort: 21,
    },
    {
      id: appConstant.ADMIN_URL_ID.USERRATE,
      name: appConstant.ADMIN_URL_STRINGS.USERRATE,
      sort: 23,
    },
    // {
    //   ID: appConstant.ADMIN_URL_ID.NOTIFICATIONS_ADD,
    //   Name: appConstant.ADMIN_URL_STRINGS.NOTIFICATIONS_ADD,
    //   Sort: 27,
    // },
    {
      id: appConstant.ADMIN_URL_ID.NOTIFICATIONS,
      name: appConstant.ADMIN_URL_STRINGS.NOTIFICATIONS,
      sort: 28,
    },
    // {
    //   id: appConstant.ADMIN_URL_ID.MYMESSAGES,
    //   name: appConstant.ADMIN_URL_STRINGS.MYMESSAGES,
    //   sort: 29,
    // },
  ];

  // CONSTANT ARRAY
  public static STORE_URL = [
    {
      id: appConstant.ADMIN_URL_ID.MYNOTIFICATIONS,
      name: appConstant.ADMIN_URL_STRINGS.MYNOTIFICATIONS,
      sort: 3,
    },
    {
      id: appConstant.ADMIN_URL_ID.STORES,
      name: appConstant.ADMIN_URL_STRINGS.STORES,
      sort: 17,
    },
    // {
    //   ID: appConstant.ADMIN_URL_ID.PROJECTS,
    //   Name: appConstant.ADMIN_URL_STRINGS.PROJECTS,
    //   Sort: 20,
    // },
    {
      id: appConstant.ADMIN_URL_ID.ORDERS,
      name: appConstant.ADMIN_URL_STRINGS.ORDERS,
      sort: 21,
    },
    {
      id: appConstant.ADMIN_URL_ID.USERRATE,
      name: appConstant.ADMIN_URL_STRINGS.USERRATE,
      sort: 23,
    },
    // {
    //   ID: appConstant.ADMIN_URL_ID.NOTIFICATIONS_ADD,
    //   Name: appConstant.ADMIN_URL_STRINGS.NOTIFICATIONS_ADD,
    //   Sort: 27,
    // },
    {
      id: appConstant.ADMIN_URL_ID.NOTIFICATIONS,
      name: appConstant.ADMIN_URL_STRINGS.NOTIFICATIONS,
      sort: 28,
    },
    // {
    //   id: appConstant.ADMIN_URL_ID.MYMESSAGES,
    //   name: appConstant.ADMIN_URL_STRINGS.MYMESSAGES,
    //   sort: 29,
    // },
  ];
}

export enum UserType {
  ADMIN = "ADMIN",
  STORE = "STORE",
  SUPERVISOR = "SUPERVISOR",
}
