import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PlacesService } from "../shared/places.service";

@Component({
  selector: "app-directions",
  templateUrl: "./directions.component.html",
  styleUrls: ["./directions.component.css"],
})
export class DirectionsComponent implements OnInit {
  data: { chosenStart: string; chosenDestination: string; mode: string };
  routes: {
    legs: [
      {
        arrival_time: {
          text: string;
        };
        departure_time: {
          text: string;
        };
        distance: {
          text: string;
        };
        duration: {
          text: string;
        };
        steps: {
          html_instructions: string;
          transit_details: {
            departure_stop: {
              name: string;
            };
            arrival_stop: {
              name: string;
            };
          };
          steps: {
            html_instructions: string;
          }[];
        }[];
      }
    ];
  }[] = [];
  constructor(private router: Router, private placesService: PlacesService) {
    if (!this.router.getCurrentNavigation().extras.state) {
      router.navigate(["/"]);
      return;
    }
    this.data = this.router.getCurrentNavigation().extras.state.data;
  }

  ngOnInit() {
    if (Object.keys(this.data).length > 0) {
      this.placesService
        .getDirections(
          this.data.chosenStart,
          this.data.chosenDestination,
          this.data.mode
        )
        .subscribe(({ routes }: { routes: [] }) => {
          this.routes = routes;
        });
    }
  }
}
