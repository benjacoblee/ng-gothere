import { Component, OnInit } from "@angular/core";
import { PlacesService } from "./places.service";

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
  constructor(private placesService: PlacesService) {}

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
    console.log(chosenStart);
    this.chosenStart = chosenStart;
  }

  onDestinationChange(chosenDestination) {
    console.log(chosenDestination);
    this.chosenDestination = chosenDestination;
  }

  onSubmit() {
    this.placesService
      .getDirections(this.chosenStart, this.chosenDestination)
      .subscribe((res) => console.log(res));
  }
}
