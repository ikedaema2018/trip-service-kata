import CollaboratorCallException from "../exception/CollaboratorCallException";
import { LoggedUserProvider } from "./LoggedUserProvider";
import User from "./User";

export class UserSession implements LoggedUserProvider {
    public getLoggedUser(): User | null {
        throw new CollaboratorCallException(
            "UserSession.getLoggedUser() should not be called in an unit test",
        );
    }
}
