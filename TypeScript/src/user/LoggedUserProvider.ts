import User from "./User";

export interface LoggedUserProvider {
    getLoggedUser(): User | null;
}