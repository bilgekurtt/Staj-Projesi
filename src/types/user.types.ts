//not finished

import { Tag } from './tag.types';
export interface LocationCoordinates {
    latitude: number;
    longitude: number;
}
export interface User {
    _id: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    description: string;
    avatarURL: string;
    location: string;
    locationCoordinates: LocationCoordinates;
    tags: Tag[];
}