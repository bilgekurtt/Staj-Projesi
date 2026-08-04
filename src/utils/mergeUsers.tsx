//merges two lists without duplicates

import { User } from "../types/user.types";

export function mergeUsers(
    previousUsers: User[],
    newUsers: User[]
): User[] {

    const map = new Map();

    //append the new elements to the already existing ones
    [...previousUsers, ...newUsers].forEach(user => {
        map.set(user._id, user);
    });

    return Array.from(map.values());
}