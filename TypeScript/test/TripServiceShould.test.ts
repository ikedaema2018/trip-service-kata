import "jest";
import User from "../src/user/User";
import TripService from "../src/trip/TripService";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import Trip from "../src/trip/Trip";

describe("TripServiceShould", () => {
    it("if not logged in, UserNotLoggedInException is thrown", () => {
        class TripDAOTest {
            public findTripsByUser(user: User) {
                return [];
            }
        }
        class UserSession {
            public getLoggedUser() {
                return null;
            }
        }
        const tripService: TripService = new TripService(
            new TripDAOTest(),
            new UserSession(),
        );
        const user: User = new User();
        
        expect(() => tripService.getTripsByUser(user)).toThrow(UserNotLoggedInException);
    });

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
        class UserSession {
            public getLoggedUser() {
                return loggedInUser;
            }
        }
        
        const tripService: TripService = new TripService(
            new TripDAOTest(),
            new UserSession(),
        );
        expect(tripService.getTripsByUser(notFriend)).toEqual([]);
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
        class UserSession {
            public getLoggedUser() {
                return loggedInUser;
            }
        }
        
        const tripService: TripService = new TripService(
            new TripDAOTest(),
            new UserSession(),
        );
        const trips = tripService.getTripsByUser(friend);
        expect(trips[0]).toBe(trip);
        expect(trips.length).toBe(1);
    });
});
