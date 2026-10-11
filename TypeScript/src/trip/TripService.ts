import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import { LoggedUserProvider } from "../user/LoggedUserProvider";
import User from "../user/User";
import Trip from "./Trip";
import { TripRepository } from "./TripRepository";

export default class TripService {
    private tripRepository: TripRepository;
    private loggedUserProvider: LoggedUserProvider;

    constructor(tripRepository: TripRepository, loggedUserProvider: LoggedUserProvider) {
        this.tripRepository = tripRepository;
        this.loggedUserProvider = loggedUserProvider;
    }

    public getTripsByUser(user: User): Trip[] {
        const loggedUser = this.loggedUserProvider.getLoggedUser();
        if (!loggedUser) {
            throw new UserNotLoggedInException();
        }

        if (!user.isFriendsWith(loggedUser)) {
            return [];
        }

        return this.tripRepository.findTripsByUser(user);
    }
}
