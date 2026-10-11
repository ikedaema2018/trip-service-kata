import User from "../user/User";
import Trip from "./Trip";

export interface TripRepository {
    findTripsByUser(user: User): Trip[];
}