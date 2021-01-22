import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PlacesService {
  constructor(private http: HttpClient) {}

  getSuggestions(searchTerm: string) {
    return this.http.get(`/api/places?input=${searchTerm}`);
  }

  getDirections(origin: string, destination: string, mode: string) {
    return this.http.get(
      `/api/directions?origin=${origin}&destination=${destination}&mode=${mode}`
    );
  }
}
