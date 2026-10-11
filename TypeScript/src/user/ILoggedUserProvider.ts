import User from "./User";

export interface ILoggedUserProvider {
    getLoggedUser(): User | null;
}
