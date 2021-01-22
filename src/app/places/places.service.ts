import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PlacesService {
  constructor(private http: HttpClient) {}

  getSuggestions(searchTerm: string) {
    return this.http.get(`/places?input=${searchTerm}`);
  }

  getDirections(origin: string, destination: string) {
    return this.http.get(
      `/directions?origin=${origin}&destination=${destination}`
    );
  }
}
