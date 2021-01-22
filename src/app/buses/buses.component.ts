import { Component, Input, OnInit } from "@angular/core";
import { timer } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { BusesService } from "./buses.service";

interface busService {
  NextBus: {
    OriginCode: string;
    DestinationCode: string;
    EstimatedArrival: string;
  };
  NextBus2: {
    OriginCode: string;
    DestinationCode: string;
    EstimatedArrival: string;
  };
  NextBus3: {
    OriginCode: string;
    DestinationCode: string;
    EstimatedArrival: string;
  };
  Operator: string;
  ServiceNo: string;
}

@Component({
  selector: "app-buses",
  templateUrl: "./buses.component.html",
  styleUrls: ["./buses.component.css"],
})
export class BusesComponent implements OnInit {
  busServices: busService[];
  @Input() parentCode;
  @Input() busStopCode;
  constructor(private busesService: BusesService) {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.parentCode === this.busStopCode) {
      timer(0, 1000 * 60)
        .pipe(mergeMap(() => this.busesService.fetchTimings(this.busStopCode)))
        .subscribe((res: busService[]) => {
          res.sort((a, b) => {
            return parseInt(a.ServiceNo) - parseInt(b.ServiceNo);
          });
          this.busServices = res;
        });
    }
  }

  calculateArrival(est) {
    let diff = (new Date(est).getTime() - new Date().getTime()) / 1000;
    diff /= 60;
    let abs = Math.abs(Math.round(diff));

    let arrivalTime;

    switch (true) {
      case abs > 0:
        {
          arrivalTime = abs + " min";
        }
        break;
      case abs === 0:
        {
          arrivalTime = "Arr....";
        }
        break;
      case isNaN(abs): {
        arrivalTime = "No bus";
      }
    }

    return arrivalTime;
  }
}
