import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FontAwesomeModule]
})
export class ContactsComponent implements OnInit {
  ngOnInit(): void {
    this.tryInitMap();
  }

  private tryInitMap(): void {
    const w = window as any;
    // If Google Maps is already loaded and the marker library is available — initialize immediately
    if (w.google && w.google.maps && w.google.maps.marker) {
      this.initMap();
      return;
    }

    // Otherwise wait for the script callback that will fire the custom event 'gmaps:loaded'
    const onLoaded = () => {
      window.removeEventListener('gmaps:loaded', onLoaded);
      this.initMap();
    };

    window.addEventListener('gmaps:loaded', onLoaded);
  }

  initMap(): void {
    const g = (window as any).google;
    const location = new g.maps.LatLng(40.852438, -73.972401);

    const mapElem = document.getElementById('map');

    if (mapElem != null)
    {
      const map = new g.maps.Map(mapElem, {
        mapId: '9fbc30135a77cfb8b6cbd057',
        center: location,
        scrollwheel: false,
        zoom: 13
      });

      new g.maps.marker.AdvancedMarkerElement({
        map: map,
        position: location,
        title: 'Fort Lee'
      });
    }
  }
}
