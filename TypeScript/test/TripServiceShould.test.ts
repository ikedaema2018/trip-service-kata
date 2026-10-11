import "jest";
import User from "../src/user/User";
import TripService from "../src/trip/TripService";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import Trip from "../src/trip/Trip";

describe("TripServiceShould", () => {
    it("getTripsByUser not logged in", () => {
        class TripServiceTest extends TripService {
            protected getLoggedUser() {
                return null as unknown as User;
            }
            protected override findTripsByUser(user: User) {
                return user.getTrips();
            }
        }

        const tripService: TripService = new TripServiceTest();
        const user: User = new User();
        
        expect(() => tripService.getTripsByUser(user)).toThrow(UserNotLoggedInException);
    });

    it ("getTripsByUser logged in and not friend", () => {
        const trip = new Trip();
        const user1 = new User();
        const anotherUser = new User();
        const user2 = new User();
        user2.addFriend(anotherUser);   
        user2.addTrip(trip);
        class TripServiceTest extends TripService {
            protected override getLoggedUser() {
                return user1;
            }
            protected override findTripsByUser(user: User) {
                return user.getTrips();
            }
        }
        
        const tripService: TripService = new TripServiceTest();

        expect(tripService.getTripsByUser(user2)).toEqual([]);
    });

    it ("getTripsByUser logged in and is friend", () => {
        const trip = new Trip();
        const user1 = new User();
        const user2 = new User();
        user2.addFriend(user1);
        user2.addTrip(trip);
        class TripServiceTest extends TripService {
            protected override getLoggedUser() {
                console.log("getLoggedUser called");
                return user1;
            }
            
            protected override findTripsByUser(user: User) {
                return user.getTrips();
            }
        }
        
        const tripService: TripService = new TripServiceTest();
        expect(tripService.getTripsByUser(user2)).toEqual([trip]);
    });
});
