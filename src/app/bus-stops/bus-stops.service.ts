import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class BusStopsService {
  constructor(private http: HttpClient) {}

  fetchBusStops(coords: { latitude: number; longitude: number }) {
    return this.http.get(
      `/api/bus-stops?lat=${coords.latitude}&long=${coords.longitude}`
    );
  }
}
