import CollaboratorCallException from "../exception/CollaboratorCallException";
import User from "../user/User";
import Trip from "./Trip";
import { TripRepository } from "./TripRepository";

export class TripDAO implements TripRepository {
    public findTripsByUser(user: User): Trip[] {
        throw new CollaboratorCallException(
            "TripDAO should not be invoked on an unit test.");
    }
}
