import { Injectable } from "@angular/core";
// import {Location} from "../core/location.class";
import { Map } from "leaflet";
import {Http} from "@angular/http";
import { ApiService } from "./api";
import { StoreHelper } from "./store-helper";
import { Store } from "../store";

@Injectable()
export class MapService {
    public map: Map;
    public baseMaps: any;
    private vtLayer: any;

    constructor(
        private store: Store,
        private api: ApiService,
        private storeHelper: StoreHelper
    ) {
        this.baseMaps = {
            OpenStreetMap: L.tileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
            }),
            Esri: L.tileLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
                attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
            }),
            CartoDB: L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            })
        };

        this.store.changes
        .map(data => data.persons)
        .subscribe(persons => {
            this.vtLayer = persons
        })
    }

    disableMouseEvent(elementId: string) {
        let element = <HTMLElement>document.getElementById(elementId);

        L.DomEvent.disableClickPropagation(element);
        L.DomEvent.disableScrollPropagation(element);
    };

    getPerosonsBySurname(req) {
        return this.api.get('/persons', req)
        .do((resp:any) => this.storeHelper.update('persons', resp))

        // this.vtLayer = [];
        // this.http.get("https://rawgit.com/haoliangyu/angular2-leaflet-starter/master/public/data/airports.geojson")
        //     .map(res => res.json())
        //     .subscribe(result => {
        //         L.geoJSON(result).addTo(this.map);
        //     });
    }
}
