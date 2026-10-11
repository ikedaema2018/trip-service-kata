import CollaboratorCallException from "../exception/CollaboratorCallException";
import User from "../user/User";
import { ITripRepository } from "./ITripRepository";
import Trip from "./Trip";
export class TripDAO implements ITripRepository {
    public findTripsByUser(user: User): Trip[] {
        throw new CollaboratorCallException(
            "TripDAO should not be invoked on an unit test.");
    }
}
