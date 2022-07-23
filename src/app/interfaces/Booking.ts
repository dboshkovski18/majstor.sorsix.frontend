import {Master} from "./Master";
import {Client} from "./Client";

export interface Booking {
  id: number,
  date: Date,
  master: {
    name: string,
    surname: string
},
  client: {
    name: string,
    surname: string
  }
}
