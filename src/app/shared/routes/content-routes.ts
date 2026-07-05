import { Routes } from "@angular/router";

export const content: Routes = [
  {
    path: "constant",
    loadChildren: () =>
      import("../../components/constant/constant.module").then(
        (m) => m.ConstantModule
      ),
    data: {
      breadcrumb: "",
    },
  },
  {
    path: "users",
    loadChildren: () =>
      import("../../components/actors/actors.module").then(
        (m) => m.ActorsModule
      ),
    data: {
      breadcrumb: "",
    },
  },
  {
    path: "maps",
    loadChildren: () =>
      import("../../components/maps/maps.module").then((m) => m.MapsModule),
    data: {
      breadcrumb: "",
    },
  },

  {
    path: "items",
    loadChildren: () =>
      import("../../components/Products/product_project.module").then(
        (m) => m.product_projectModule
      ),
    data: {
      breadcrumb: "",
    },
  },
  {
    path: "orders",
    loadChildren: () =>
      import("../../components/orders/orders.module").then(
        (m) => m.OrdersModule
      ),
    data: {
      breadcrumb: "",
    },
  },
  {
    path: "offers",
    loadChildren: () =>
      import("../../components/offers/offers.module").then(
        (m) => m.OffersModule
      ),
    data: {
      breadcrumb: "",
    },
  },
  {
    path: "mass",
    loadChildren: () =>
      import("../../components/notifications/notifications.module").then(
        (m) => m.NotificationsModule
      ),
    data: {
      breadcrumb: "",
    },
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("../../components/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
    data: {
      breadcrumb: "",
    },
  },
  {
    path: "base",
    loadChildren: () =>
      import("../../components/base/base.module").then((m) => m.BaseModule),
    data: {
      breadcrumb: "",
    },
  },
  {
    path: "advance",
    loadChildren: () =>
      import("../../components/advance/advance.module").then(
        (m) => m.AdvanceModule
      ),
    data: {
      breadcrumb: "",
    },
  },
  {
    path: "icons",
    loadChildren: () =>
      import("../../components/icons/icons.module").then((m) => m.IconsModule),
    data: {
      breadcrumb: "",
    },
  },
  {
    path: "buttons",
    loadChildren: () =>
      import("../../components/buttons/buttons.module").then(
        (m) => m.ButtonsModule
      ),
    data: {
      breadcrumb: "",
    },
  },
  {
    path: "chart",
    loadChildren: () =>
      import("../../components/charts/charts.module").then(
        (m) => m.ChartModule
      ),
    data: {
      breadcrumb: "",
    },
  },
  {
    path: "cards",
    loadChildren: () =>
      import("../../components/cards/cards.module").then((m) => m.CardsModule),
    data: {
      breadcrumb: "",
    },
  },
  {
    path: "timeline",
    loadChildren: () =>
      import("../../components/timeline/timeline.module").then(
        (m) => m.TimelineModule
      ),
    data: {
      breadcrumb: "",
    },
  },
  {
    path: "form",
    loadChildren: () =>
      import("../../components/forms/forms.module").then((m) => m.FormModule),
    data: {
      breadcrumb: "",
    },
  },
  {
    path: "gallery",
    loadChildren: () =>
      import("../../components/gallery/gallery.module").then(
        (m) => m.GalleryDemoModule
      ),
    data: {
      breadcrumb: "",
    },
  },
  {
    path: "table",
    loadChildren: () =>
      import("../../components/tables/tables.module").then(
        (m) => m.TablesModule
      ),
    data: {
      breadcrumb: "",
    },
  },
  {
    path: "editor",
    loadChildren: () =>
      import("../../components/editor/editor.module").then(
        (m) => m.EditorModule
      ),
    data: {
      breadcrumb: "",
    },
  },
  {
    path: "users",
    loadChildren: () =>
      import("../../components/users/users.module").then((m) => m.UsersModule),
    data: {
      breadcrumb: "",
    },
  },
  {
    path: "to-do",
    loadChildren: () =>
      import("../../components/to-do/to-do.module").then((m) => m.ToDoModule),
    data: {
      breadcrumb: "",
    },
  },
  {
    path: "email",
    loadChildren: () =>
      import("../../components/email/email.module").then((m) => m.EmailModule),
    data: {
      breadcrumb: "",
    },
  },
  {
    path: "calender",
    loadChildren: () =>
      import("../../components/calender/calender.module").then(
        (m) => m.CalenderModule
      ),
    data: {
      breadcrumb: "",
    },
  },
  {
    path: "blog",
    loadChildren: () =>
      import("../../components/blog/blog.module").then((m) => m.BlogModule),
    data: {
      breadcrumb: "",
    },
  },
  {
    path: "social-app",
    loadChildren: () =>
      import("../../components/social-app/social-app.module").then(
        (m) => m.SocialAppModule
      ),
    data: {
      breadcrumb: "",
    },
  },
  {
    path: "job-search",
    loadChildren: () =>
      import("../../components/job-search/job-search.module").then(
        (m) => m.JobSearchModule
      ),
    data: {
      breadcrumb: "Job-Search",
    },
  },
  {
    path: "learning",
    loadChildren: () =>
      import("../../components/learning/learning.module").then(
        (m) => m.LearningModule
      ),
    data: {
      breadcrumb: "Learning",
    },
  },
  {
    path: "faq",
    loadChildren: () =>
      import("../../components/faq/faq.module").then((m) => m.FaqModule),
    data: {
      breadcrumb: "Faq",
    },
  },
  {
    path: "support-ticket",
    loadChildren: () =>
      import("../../components/support-ticket/support-ticket.module").then(
        (m) => m.SupportTicketModule
      ),
    data: {
      breadcrumb: "Support-Ticket",
    },
  },
  {
    path: "pricing",
    loadChildren: () =>
      import("../../components/pricing/pricing.module").then(
        (m) => m.PricingModule
      ),
    data: {
      breadcrumb: "Pricing",
    },
  },
  {
    path: "knowledgebase",
    loadChildren: () =>
      import("../../components/knowledge-base/knowledge-base.module").then(
        (m) => m.KnowledgeBaseModule
      ),
    data: {
      breadcrumb: "Knowledge-Base",
    },
  },
  {
    path: "search-result",
    loadChildren: () =>
      import("../../components/search-result/search-result.module").then(
        (m) => m.SearchResultModule
      ),
    data: {
      breadcrumb: "Search-Result",
    },
  },
  {
    path: "sample-page",
    loadChildren: () =>
      import("../../components/sample-page/sample-page.module").then(
        (m) => m.SamplePageModule
      ),
    data: {
      breadcrumb: "Sample-Page",
    },
  },
  {
    path: "map",
    loadChildren: () =>
      import("../../components/map/map.module").then((m) => m.MapModule),
    data: {
      breadcrumb: "Map",
    },
  },
  {
    path: "ui-elements",
    loadChildren: () =>
      import("../../components/ui-elements/ui-elements.module").then(
        (m) => m.UiElementsModule
      ),
    data: {
      breadcrumb: "UI-Elements",
    },
  },
  {
    path: "widgets",
    loadChildren: () =>
      import("../../components/widgets/widgets.module").then(
        (m) => m.WidgetsModule
      ),
    data: {
      breadcrumb: "Widgets",
    },
  },
  {
    path: "ecommerce",
    loadChildren: () =>
      import("../../components/e-commerce/e-commerce.module").then(
        (m) => m.ECommerceModule
      ),
    data: {
      breadcrumb: "Ecommerce",
    },
  },
  {
    path: "chat",
    loadChildren: () =>
      import("../../components/chat/chat.module").then((m) => m.ChatModule),
    data: {
      breadcrumb: "التنبيهات والاشعارات",
    },
  },
  {
    path: "contact",
    loadChildren: () =>
      import("../../components/contact/contact.module").then(
        (m) => m.ContactModule
      ),
    data: {
      breadcrumb: "Contact",
    },
  },
  {
    path: "to-do-firebase",
    loadChildren: () =>
      import("../../components/to-do-firebase/to-do-firebase.module").then(
        (m) => m.ToDoFirebaseModule
      ),
    data: {
      breadcrumb: "To-do",
    },
  },
];
