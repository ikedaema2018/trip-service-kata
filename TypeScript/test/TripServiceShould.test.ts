import "jest";
import User from "../src/user/User";
import TripService from "../src/trip/TripService";
import Trip from "../src/trip/Trip";

describe("TripServiceShould", () => {
    it ("if passed user is not a friend of loggedIn, can not get trips", () => {
        const loggedInUser = new User();
        const anotherUser = new User();
        const notFriend = new User();
        const trip = new Trip();
        notFriend.addFriend(anotherUser);

        class TripDAOTest {
            public findTripsByUser(user: User) {
                return [trip];
            }
        }
        
        const tripService: TripService = new TripService(
            new TripDAOTest(),
        );
        expect(tripService.getTripsByUser(notFriend, loggedInUser)).toEqual([]);
    });

    it ("if loggedIn and passed user is a friend, can get trips", () => {
        const trip = new Trip();
        const loggedInUser = new User();
        const friend = new User();
        friend.addFriend(loggedInUser);
        
        class TripDAOTest {
            public findTripsByUser(user: User) {
                return [trip];
            }
        }
        
        const tripService: TripService = new TripService(
            new TripDAOTest(),
        );
        const trips = tripService.getTripsByUser(friend, loggedInUser);
        expect(trips[0]).toBe(trip);
        expect(trips.length).toBe(1);
    });
});
