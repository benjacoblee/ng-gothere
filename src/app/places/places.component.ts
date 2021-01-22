import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PlacesService } from "../shared/places.service";

@Component({
  selector: "app-places",
  templateUrl: "./places.component.html",
  styleUrls: ["./places.component.css"],
})
export class PlacesComponent implements OnInit {
  starting = [];
  destination = [];
  chosenStart;
  chosenDestination;
  mode = "";
  errors = "";
  constructor(private placesService: PlacesService, private router: Router) {}

  ngOnInit() {}

  onStartInput(searchTerm) {
    this.placesService.getSuggestions(searchTerm).subscribe((res: []) => {
      this.starting = res;
    });
  }

  onDestinationInput(searchTerm) {
    this.placesService.getSuggestions(searchTerm).subscribe((res: []) => {
      this.destination = res;
    });
  }

  onStartChange(chosenStart) {
    this.chosenStart = chosenStart;
  }

  onDestinationChange(chosenDestination) {
    this.chosenDestination = chosenDestination;
  }

  onSubmit() {
    if (!this.chosenStart || !this.chosenDestination) {
      this.errors = "Please pick a location from the dropdown";
      return;
    }

    const data = {
      chosenStart: this.chosenStart,
      chosenDestination: this.chosenDestination,
      mode: this.mode,
    };

    this.router.navigate(["/directions"], { state: { data } });
  }

  onSelectMode(mode) {
    this.mode = mode;
  }
}
