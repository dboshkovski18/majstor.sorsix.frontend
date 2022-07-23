import {Master} from "./Master";
import {Client} from "./Client";

export interface Booking {
  id: number,
  date: Date,
  master: Master,
  client: Client
}
