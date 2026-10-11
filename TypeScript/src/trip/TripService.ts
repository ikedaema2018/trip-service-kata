import User from "../user/User";
import { ITripRepository } from "./ITripRepository";
import Trip from "./Trip";

export default class TripService {
    private tripRepository: ITripRepository;

    constructor(tripRepository: ITripRepository) {
        this.tripRepository = tripRepository;
    }

    public getTripsByUser(user: User, loggedUser: User): Trip[] {
        if (!user.isFriendsWith(loggedUser)) {
            return [];
        }

        return this.tripRepository.findTripsByUser(user);
    }
}
