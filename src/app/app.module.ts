import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatIconModule, MatToolbarModule } from "@angular/material";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTableModule } from "@angular/material/table";

import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BusStopsComponent } from "./bus-stops/bus-stops.component";
import { BusesComponent } from "./buses/buses.component";

@NgModule({
  declarations: [AppComponent, BusStopsComponent, BusesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
