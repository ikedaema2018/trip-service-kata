import "jest";
import User from "../src/user/User";

describe("User", () => {
    it("if he is a friend, isFriendsWith is true", () => {
        const friend = new User()
        const user = new User()
        user.addFriend(friend)

        expect(user.isFriendsWith(friend)).toBe(true)
    });

    it("if he is not a friend, isFriendsWith is false", () => {
        const notFriend = new User()
        const friend = new User()
        const user = new User()
        user.addFriend(friend)

        expect(user.isFriendsWith(notFriend)).toBe(false)
    })
});
