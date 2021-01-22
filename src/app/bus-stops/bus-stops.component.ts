import { Component, OnInit } from "@angular/core";
import { Subscription, timer } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { BusStopsService } from "./bus-stops.service";

interface BusStop {
  BusStopCode: string;
  Description: string;
  Latitude: number;
  Longitude: number;
  RoadName: string;
  Distance: number;
}

@Component({
  selector: "app-bus-stops",
  templateUrl: "./bus-stops.component.html",
  styleUrls: ["./bus-stops.component.css"],
})
export class BusStopsComponent implements OnInit {
  coords: {
    latitude: number;
    longitude: number;
  } = {
    latitude: undefined,
    longitude: undefined,
  };
  busStops: BusStop[] = [];
  busStopCode: number;
  error;
  subscription: Subscription;

  fetchBuses() {
    window.navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        if (this.subscription) {
          this.subscription.unsubscribe();
        }

        this.coords.latitude = latitude;
        this.coords.longitude = longitude;

        this.subscription = timer(0, 1000 * 30)
          .pipe(mergeMap(() => this.busStopsService.fetchBusStops(this.coords)))
          .subscribe((res: BusStop[]) => {
            this.busStops = res;
          });
      },
      (err) => {
        this.error = "Geolocation needs to be enabled to fetch buses";
      }
    );
  }

  constructor(private busStopsService: BusStopsService) {}

  ngOnInit() {
    this.fetchBuses();
  }

  onClick(busStopCode) {
    this.busStopCode = busStopCode;
  }

  onRefreshClick() {
    this.busStops = [];
    setTimeout(() => {
      this.fetchBuses();
    }, 500);
  }
}
