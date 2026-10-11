import CollaboratorCallException from "../exception/CollaboratorCallException";
import { ILoggedUserProvider } from "./ILoggedUserProvider";
import User from "./User";

export class UserSession implements ILoggedUserProvider {
    public getLoggedUser(): User | null {
        throw new CollaboratorCallException(
            "UserSession.getLoggedUser() should not be called in an unit test",
        );
    }
}
