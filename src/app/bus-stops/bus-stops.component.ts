import { Component, OnInit } from "@angular/core";
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

  constructor(private busStopsService: BusStopsService) {}

  ngOnInit() {
    window.navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.coords.latitude = latitude;
        this.coords.longitude = longitude;

        this.busStopsService
          .fetchBusStops(this.coords)
          .subscribe((res: BusStop[]) => {
            this.busStops = res;
          });
      },
      (err) => {}
    );
  }

  onClick(busStopCode) {
    this.busStopCode = busStopCode;
    console.log(busStopCode);
  }
}
