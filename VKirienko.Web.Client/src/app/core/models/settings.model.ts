import { Feed } from '../models/feed.model';

export class Settings {
  adsbExchange: Feed = new Feed();
  adsbFi: Feed = new Feed();
  airplanesLive: Feed = new Feed();
  flightAware: Feed = new Feed();
  flightRadar24: Feed = new Feed();
  openSky: Feed = new Feed();
  radarBox: Feed = new Feed();
}
