import User from "../user/User";
import Trip from "./Trip";

export interface ITripRepository {
    findTripsByUser(user: User): Trip[];
}
