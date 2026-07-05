import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { appConstant } from "./appConstant";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class ConstantServiceWrapper {
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  getMyToken() {
    if (localStorage.getItem("token")) return localStorage.getItem("token");
  }

  getMyLang() {
    if (localStorage.getItem("lang")) return localStorage.getItem("lang");
  }

  serverSideErrorHandler(error) {
    if (error) {
      this.toastr.error(error.message);
    }
  }

  async checkAdmin() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };

    return this.http.post(
      appConstant.BASE_URL + `/check`,
      JSON.stringify({ token: this.getMyToken() }),
      httpOptions
    );
  }

  loginAdmin(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/admin/loginAdmin",
      JSON.stringify(conent),
      httpOptions
    );
  }

  //constant
  getAllStores(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/stores/all/" + id,
      httpOptions
    );
  }

  getAllCity(country_id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/constant/city/" + country_id,
      httpOptions
    );
  }

  getAllCityAdmin() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(appConstant.BASE_URL + "/constant/city", httpOptions);
  }

  updateSettings(id, conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/settings/" + id,
      JSON.stringify(conent),
      httpOptions
    );
  }

  getSittings() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/constant/settings",
      httpOptions
    );
  }

  getSingleSittings(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/constant/settings/" + id,
      httpOptions
    );
  }

  updateStatic(id, conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/static/" + id,
      JSON.stringify(conent),
      httpOptions
    );
  }

  getStatic() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/constant/static-pages",
      httpOptions
    );
  }

  getSingleStatic(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/constant/static/" + id,
      httpOptions
    );
  }

  updateContact(id, conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/contact/" + id,
      JSON.stringify(conent),
      httpOptions
    );
  }

  getContact() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/constant/contact",
      httpOptions
    );
  }

  getSingleContact(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/constant/contact/" + id,
      httpOptions
    );
  }

  getReason() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/constant/reason",
      httpOptions
    );
  }

  getSingleReason(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/constant/reason/" + id,
      httpOptions
    );
  }

  addReason(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/reason",
      JSON.stringify(content),
      httpOptions
    );
  }

  updateReason(id, conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/reason/" + id,
      JSON.stringify(conent),
      httpOptions
    );
  }

  deleteReason(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/delete-reason/" + id,
      {},
      httpOptions
    );
  }

  getWelcome() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/constant/welcome",
      httpOptions
    );
  }

  getSingleWelcome(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/constant/welcome/" + id,
      httpOptions
    );
  }

  addWelcome(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "multipart/form-data", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/welcome",
      content,
      httpOptions
    );
  }

  updateWelcome(id, conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "multipart/form-data", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/welcome/" + id,
      conent,
      httpOptions
    );
  }

  deleteWelcome(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/delete-welcome/" + id,
      {},
      httpOptions
    );
  }

  getAdvs() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(appConstant.BASE_URL + "/constant/advs", httpOptions);
  }

  getSingleAdvs(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/constant/single-advs/" + id,
      httpOptions
    );
  }

  addAdvs(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "multipart/form-data", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/advs",
      content,
      httpOptions
    );
  }

  updateAdvs(id, conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "multipart/form-data", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/advs/" + id,
      conent,
      httpOptions
    );
  }

  deleteAdvs(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/delete-advs/" + id,
      {},
      httpOptions
    );
  }

  getCategoy() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/constant/category",
      httpOptions
    );
  }

  getSingleCategoy(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/constant/category/" + id,
      httpOptions
    );
  }

  addCategoy(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "multipart/form-data", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/category",
      content,
      httpOptions
    );
  }

  updateCategoy(id, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "multipart/form-data", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/category/" + id,
      content,
      httpOptions
    );
  }

  deleteCategoy(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/delete-category/" + id,
      {},
      httpOptions
    );
  }


  getType() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/constant/type",
      httpOptions
    );
  }

  getSingleType(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/constant/type/" + id,
      httpOptions
    );
  }

  addType(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "multipart/form-data", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/type",
      content,
      httpOptions
    );
  }

  updateType(id, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "multipart/form-data", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/type/" + id,
      content,
      httpOptions
    );
  }

  deleteType(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/delete-type/" + id,
      {},
      httpOptions
    );
  }

  getSubCategoy(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/constant/allsubcategory/"+id,
      httpOptions
    );
  }

  getSingleSubCategoy(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/constant/subcategory/" + id,
      httpOptions
    );
  }

  addSubCategoy(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "multipart/form-data", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/subcategory",
      content,
      httpOptions
    );
  }

  updateSubCategoy(id, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "multipart/form-data", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/subcategory/" + id,
      content,
      httpOptions
    );
  }

  deleteSubCategoy(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/delete-subcategory/" + id,
      {},
      httpOptions
    );
  }


  getCountry() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/constant/country",
      httpOptions
    );
  }

  getSingleCountrty(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/constant/country/" + id,
      httpOptions
    );
  }

  addCountry(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/country",
      content,
      httpOptions
    );
  }

  updateCountry(id, conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/country/" + id,
      conent,
      httpOptions
    );
  }

  deleteCountry(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/delete-country/" + id,
      {},
      httpOptions
    );
  }

  getComplaints(page, limit) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(
      appConstant.BASE_URL +
        "/constant/complaints?page=" +
        page +
        "&limit=" +
        limit,
      httpOptions
    );
  }

  replyComplaints(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/reply-complaints",
      JSON.stringify(content),
      httpOptions
    );
  }

  deleteComplaints(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/complaints/" + id,
      {},
      httpOptions
    );
  }

  getCity(country_id, page, limit) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(
      appConstant.BASE_URL +
        "/constant/city/" +
        country_id +
        "?page=" +
        page +
        "&limit=" +
        limit,
      httpOptions
    );
  }

  getSingleCity(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/constant/single-city/" + id,
      httpOptions
    );
  }

  addCity(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/city",
      content,
      httpOptions
    );
  }

  updateCity(id, conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/city/" + id,
      conent,
      httpOptions
    );
  }

  deleteCity(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/delete-city/" + id,
      {},
      httpOptions
    );
  }

  getPlaces(city_id, page, limit) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(
      appConstant.BASE_URL +
        "/constant/place/" +
        city_id +
        "?page=" +
        page +
        "&limit=" +
        limit,
      httpOptions
    );
  }

  getAllPlacesDelivery(supplier_id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/constant/all-place-delivery/" + supplier_id,
      httpOptions
    );
  }

  getAllPlaces(city_id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/constant/all-place/" + city_id,
      httpOptions
    );
  }

  getSinglePlace(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/constant/single-place/" + id,
      httpOptions
    );
  }

  addPlace(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/place",
      content,
      httpOptions
    );
  }

  updatePlace(id, conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/place/" + id,
      conent,
      httpOptions
    );
  }

  deletePlace(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/constant/delete-place/" + id,
      {},
      httpOptions
    );
  }
  // users
  getUsers(page, limit, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + `/users/clients?page=${page}&limit=${limit}`,
      JSON.stringify(content),
      httpOptions
    );
  }

  getSingleUser(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + `/users/details/` + id,
      httpOptions
    );
  }

  getUsersExcel(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + `/users/clients-excel`,
      JSON.stringify(content),
      httpOptions
    );
  }

  blockUnblockUser(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/users/block",
      JSON.stringify(content),
      httpOptions
    );
  }

  sendUserSMS(id, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/users/sms/" + id,
      JSON.stringify(content),
      httpOptions
    );
  }

  sendUserNotification(id, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/users/notification/" + id,
      JSON.stringify(content),
      httpOptions
    );
  }

  updateUser(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "multipart/form-data", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/users/update",
      conent,
      httpOptions
    );
  }

  getUserAddress(id, page, limit) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + `/users/address/${id}?page=${page}&limit=${limit}`,
      httpOptions
    );
  }

  addAddressDiscount(id, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/users/address/discount/" + id,
      JSON.stringify(content),
      httpOptions
    );
  }

  getUserOrders(id, status, page, limit) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + `/users/orders/${id}?page=${page}&limit=${limit}&status=${status}`,
      httpOptions
    );
  }

  getUserWorks(id, page, limit) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + `/users/works/${id}?page=${page}&limit=${limit}`,
      httpOptions
    );
  }

  getUserOrdersExcel(id, status) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + `/users/orders-excel/${id}?status=${status}`,
      httpOptions
    );
  }

  getProviderOrders(id, status, page, limit) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL +
        `/providers/orders/${id}?page=${page}&limit=${limit}&status=${status}`,
      httpOptions
    );
  }

  getProviderOrdersExcel(id, status) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL +
        `/providers/orders-excel/${id}?status=${status}`,
      httpOptions
    );
  }

  getSupervisorOrders(id, status, page, limit) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL +
        `/supervisor/orders/${id}?page=${page}&limit=${limit}&status=${status}`,
      httpOptions
    );
  }

  getSupervisorOrdersExcel(id, status) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL +
        `/supervisor/orders-excel/${id}?status=${status}`,
      httpOptions
    );
  }


  getProviderEmployees(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL +
        `/supervisor/employees/${id}`,
      httpOptions
    );
  }

  getUserFollowing(id, page, limit) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL +
        `/users/following/${id}?page=${page}&limit=${limit}`,
      httpOptions
    );
  }

  getTimeProviderList(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + `/providers/times/${id}`,
      httpOptions
    );
  }

  deleteTime(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/provider/delete-time/" + id,
      {},
      httpOptions
    );
  }

  addTime(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/provider/add-time",
      JSON.stringify(content),
      httpOptions
    );
  }

  updateTime(id, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/provider/update-time/" + id,
      JSON.stringify(content),
      httpOptions
    );
  }

  //emoloyee
  getEmployees(page, limit, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + `/users/employee?page=${page}&limit=${limit}`,
      JSON.stringify(content),
      httpOptions
    );
  }

  getSingleEmployee(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + `/employee/details/` + id,
      httpOptions
    );
  }

  getEmployeeExcel(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + `/users/employee-excel`,
      JSON.stringify(content),
      httpOptions
    );
  }

  blockUnblockEmployee(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/employee/block",
      JSON.stringify(content),
      httpOptions
    );
  }

  updateEmployee(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "multipart/form-data", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/employee/update",
      conent,
      httpOptions
    );
  }

  addEmployee(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "multipart/form-data", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/employee/add",
      conent,
      httpOptions
    );
  }

  sendEmplyeeSMS(id, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/employee/sms/" + id,
      JSON.stringify(content),
      httpOptions
    );
  }

  getEmployeesOrders(id, status, page, limit) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL +
        `/employee/orders/${id}?page=${page}&limit=${limit}&status=${status}`,
      httpOptions
    );
  }

  getEmployeesOrdersExcel(id, status) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL +
        `/employee/orders-excel/${id}?status=${status}`,
      httpOptions
    );
  }

  getEmployeesByStore(store_id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + `/stores/employee/${store_id}`,
      httpOptions
    );
  }

  // providers
  getAllProviders() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + `/users/providers/list`,
      httpOptions
    );
  }

  getProviders(page, limit, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + `/users/providers?page=${page}&limit=${limit}`,
      JSON.stringify(content),
      httpOptions
    );
  }

  getSingleProvider(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + `/providers/details/` + id,
      httpOptions
    );
  }

  getProviderExcel(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + `/users/providers-excel`,
      JSON.stringify(content),
      httpOptions
    );
  }

  sendProviderSMS(id, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/providers/sms/" + id,
      JSON.stringify(content),
      httpOptions
    );
  }

  sendProviderNotification(id, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/providers/notification/" + id,
      JSON.stringify(content),
      httpOptions
    );
  }

  updateProviders(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "multipart/form-data", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/providers/update",
      conent,
      httpOptions
    );
  }

  addProviders(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "multipart/form-data", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/providers/add",
      conent,
      httpOptions
    );
  }

  blockUnblockProviders(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/providers/block",
      JSON.stringify(content),
      httpOptions
    );
  }

  deleteProvider(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/providers/delete",
      JSON.stringify(content),
      httpOptions
    );
  }

  // Supervisor
  getAllSupervisor() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + `/users/supervisor/list`,
      httpOptions
    );
  }

  getSupervisor(page, limit, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + `/users/supervisor?page=${page}&limit=${limit}`,
      JSON.stringify(content),
      httpOptions
    );
  }

  getSingleSupervisor(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + `/supervisor/details/` + id,
      httpOptions
    );
  }

  getSupervisorExcel(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + `/users/supervisor-excel`,
      JSON.stringify(content),
      httpOptions
    );
  }

  sendSupervisorSMS(id, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/supervisor/sms/" + id,
      JSON.stringify(content),
      httpOptions
    );
  }

  sendSupervisorNotification(id, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/supervisor/notification/" + id,
      JSON.stringify(content),
      httpOptions
    );
  }

  updateSupervisor(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "multipart/form-data", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/supervisor/update",
      conent,
      httpOptions
    );
  }

  addSupervisor(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "multipart/form-data", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/supervisor/add",
      conent,
      httpOptions
    );
  }

  blockUnblockSupervisor(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/supervisor/block",
      JSON.stringify(content),
      httpOptions
    );
  }


  blockUnblockAdmin(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/admin/block",
      JSON.stringify(content),
      httpOptions
    );
  }

  deleteSupervisor(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/supervisor/delete",
      JSON.stringify(content),
      httpOptions
    );
  }

  //products
  getAllProductsList() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + `/products/list/all`,
      httpOptions
    );
  }

  getProductsList(page, limit, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + `/products/list?page=${page}&limit=${limit}`,
      content,
      httpOptions
    );
  }

  getProductsListExcel(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + `/products/list_excel`,
      content,
      httpOptions
    );
  }

  deleteProduct(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/products/delete/" + id,
      {},
      httpOptions
    );
  }

  updateProduct(id, conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "multipart/form-data", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/products/update/" + id,
      conent,
      httpOptions
    );
  }
  addProduct(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "multipart/form-data", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/products/add",
      conent,
      httpOptions
    );
  }

  getSingleProduct(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + `/products/details/` + id,
      httpOptions
    );
  }

  getRateList(destination_id, type, page, limit) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL +
        `/rates/list?destination_id=${destination_id}&type=${type}&page=${page}&limit=${limit}`,
      httpOptions
    );
  }
  getRateProviderList(destination_id, page, limit) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL +
        `/rates/provider?destination_id=${destination_id}&page=${page}&limit=${limit}`,
      httpOptions
    );
  }
  deleteImage(id, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/products/delete_image/" + id,
      JSON.stringify(content),
      httpOptions
    );
  }

  //products
  getProductPlaceList(page, limit, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL +
        `/products/places/list?page=${page}&limit=${limit}`,
      content,
      httpOptions
    );
  }

  getProductPlaceListExcel(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + `/products/places/list_excel`,
      content,
      httpOptions
    );
  }

  deleteProductPlace(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/products/places/delete/" + id,
      {},
      httpOptions
    );
  }

  updateProductPlace(id, conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/products/places/update/" + id,
      JSON.stringify(conent),
      httpOptions
    );
  }

  addProductPlace(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/products/places/add",
      JSON.stringify(conent),
      httpOptions
    );
  }

  getSingleProductPlace(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + `/products/places/details/` + id,
      httpOptions
    );
  }

  //supplier_product
  getSupplierPlaceList(body, page, limit) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + `/supplier/place/list?page=${page}&limit=${limit}`,
      JSON.stringify(body),
      httpOptions
    );
  }

  getSingleSupplierPlace(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + `/supplier/place/` + id,
      httpOptions
    );
  }

  deleteSupplierPlace(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/supplier/delete-place/" + id,
      {},
      httpOptions
    );
  }

  updateSupplierPlace(id, conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/supplier/place/" + id,
      JSON.stringify(conent),
      httpOptions
    );
  }

  addSupplierPlace(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/supplier/place",
      JSON.stringify(conent),
      httpOptions
    );
  }

  //orders
  getOrders(page, limit, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + `/admin/orders?page=${page}&limit=${limit}`,
      JSON.stringify(content),
      httpOptions
    );
  }

  getOrdersExcel(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + `/admin/orders-excel`,
      JSON.stringify(content),
      httpOptions
    );
  }

  getOrderExcel(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + `/admin/orders-excel`,
      JSON.stringify(content),
      httpOptions
    );
  }
  
  orders_earning(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + `/admin/orders-earning`,
      JSON.stringify(content),
      httpOptions
    );
  }

  updateOrderStatus(id, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + `/admin/update_order/${id}`,
      JSON.stringify(content),
      httpOptions
    );
  }
  deleteRate(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/users/rates/" + id,
      {},
      httpOptions
    );
  }
  getOrdersRate(page, limit, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + `/admin/rates?page=${page}&limit=${limit}`,
      JSON.stringify(content),
      httpOptions
    );
  }

  //nottifications
  getTop10Notification() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/admin/top_notification",
      httpOptions
    );
  }

  getNotifications(page, limit, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + `/admin/notification?page=${page}&limit=${limit}`,
      JSON.stringify(content),
      httpOptions
    );
  }
  getNotifications2(page, limit, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + `/admin/notification2?page=${page}&limit=${limit}`,
      JSON.stringify(content),
      httpOptions
    );
  }

  getExcelNotifications(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + `/admin/excel-notification`,
      JSON.stringify(content),
      httpOptions
    );
  }

  getExcelNotifications2(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + `/admin/excel-notification2`,
      JSON.stringify(content),
      httpOptions
    );
  }

  addNotifications(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/admin/add_notification",
      content,
      httpOptions
    );
  }

  addSingleNotifications(id, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/admin/add_notification/" + id,
      content,
      httpOptions
    );
  }

  //admins
  getAdmins(page, limit, obj) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/admin/list?page=" + page + "&limit=" + limit + "&name="+ obj.name + "&email=" + obj.email + "&phone_number=" + obj.phone_number,
      httpOptions
    );
  }

  getExcelAdmins(obj) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/admin/excel?name="+ obj.name + "&email=" + obj.email + "&phone_number=" + obj.phone_number,
      httpOptions
    );
  }

  getSingleAdmins(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/admin/details/" + id,
      httpOptions
    );
  }

  addAdmin(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/admin/add",
      content,
      httpOptions
    );
  }

  updateAdmin(id, conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/admin/update/" + id,
      conent,
      httpOptions
    );
  }

  deleteAdmin(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/admin/delete/" + id,
      {},
      httpOptions
    );
  }

  updateMyProfile(id, conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/admin/my/" + id,
      conent,
      httpOptions
    );
  }

  //charts
  getTop10NewUsers() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/home/getTop10NewUsers",
      httpOptions
    );
  }

  getTop10Orders() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/home/getTop10Orders",
      httpOptions
    );
  }

  getCounterOrdersWithStatus() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/home/getCounterOrdersWithStatus",
      httpOptions
    );
  }

  getCounterUsers() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/home/getCounterUsers",
      httpOptions
    );
  }

  UsersproviderPerYear() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/home/UsersproviderPerYear",
      httpOptions
    );
  }

  getProviderTarget() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/home/getProviderTarget",
      httpOptions
    );
  }

  getTopProductsPlace() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/home/getTopProductsPlace",
      httpOptions
    );
  }

  getSingleOrders(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + `/admin/single-orders?id=${id}`,
      httpOptions
    );
  }
  
  getProviderOrdersPerYear() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };

    return this.http.get(
      appConstant.BASE_URL + "/home/getProviderOrdersPerYear",
      httpOptions
    );
  }

  //coupon
  getCoupon(page, limit) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/coupon/list?page=" + page + "&limit=" + limit,
      httpOptions
    );
  }

  getSingleCoupon(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/coupon/details/" + id,
      httpOptions
    );
  }

  addCoupon(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/coupon/add",
      content,
      httpOptions
    );
  }

  updateCoupon(id, conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/coupon/update/" + id,
      conent,
      httpOptions
    );
  }

  deleteCoupon(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/coupon/delete/" + id,
      {},
      httpOptions
    );
  }

  //messages
  getMyMessages(page, limit) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + "/message/list?page=" + page + "&limit=" + limit,
      httpOptions
    );
  }

  replyMessage(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/message/add",
      JSON.stringify(content),
      httpOptions
    );
  }

  deleteMessage(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/message/delete/" + id,
      {},
      httpOptions
    );
  }

  hideShow(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "/items/activate",
      JSON.stringify(content),
      httpOptions
    );
  }

  //maps
  getOrdersMap(status_id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + `/admin/order/map?status_id=${status_id}`,
      httpOptions
    );
  }

  getUnCoveredMap() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + `/admin/user/uncovarage`,
      httpOptions
    );
  }

  driversOnFirebase() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json", "accept-language": this.getMyLang(),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getMyToken(),
      }),
    };
    return this.http.get(
      appConstant.BASE_URL + `/admin/user/driversOnFirebase`,
      httpOptions
    );
  }
}
