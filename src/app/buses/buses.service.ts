import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class BusesService {
  constructor(private http: HttpClient) {}

  fetchTimings(busStopCode) {
    return this.http.get(`/api/buses?busStopCode=${busStopCode}`);
  }
}
