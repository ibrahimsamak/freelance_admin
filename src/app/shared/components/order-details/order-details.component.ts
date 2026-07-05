import { Component, Input, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.scss"],
})
export class OrderDetailsPoPComponent implements OnInit {
  @Input() orderDetails: any;
  zoom_m1 = 18;
  origin;
  destination;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.origin = {
      f_lat: this.orderDetails?.f_lat,
      f_lng: this.orderDetails?.f_lng,
    };
    this.destination = {
      t_lat: this.orderDetails?.t_lat,
      t_lng: this.orderDetails?.t_lng,
    };
  }

  close(){
    this.modalService.dismissAll();
  }
}
