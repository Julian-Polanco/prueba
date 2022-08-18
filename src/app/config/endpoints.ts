import { environment } from "src/environments/environment";

const URL_BASE = environment.urlBase;

export class Endpoint {
    constructor(public baseUrl: string, public path: string){}
}

export const ENDPOINTS = {
    login: new Endpoint(URL_BASE, "auth/login"),
    register: new Endpoint(URL_BASE, "auth/register"),

    getAllRooms: new Endpoint(URL_BASE, "room/get-all-rooms"),
    getAllRoomsBetween: new Endpoint(URL_BASE, "room/get-all-rooms-between"),
    getRoomDetail: new Endpoint(URL_BASE, "room/get-room-detail/{roomCode}"),
    addRoom: new Endpoint(URL_BASE, "room/add-room"),
    deleteRoom: new Endpoint(URL_BASE, "room/delete-room"),
    updateRoom: new Endpoint(URL_BASE, "room/update-room/{roomCode}"),
    reserveRoom: new Endpoint(URL_BASE, "room/reserve"),

    uploadImages: new Endpoint(URL_BASE, "room/add-images-room"),

    updateUser: new Endpoint(URL_BASE, "user/update-user"),
    getUser: new Endpoint(URL_BASE, "user/get-user/{userId}"),
    deleteUser: new Endpoint(URL_BASE, "user/delete-user"),
    getAllUsersFromAdmin:new Endpoint(URL_BASE,"user/get-all-users-from-admin"),
    getAllUsersFromSuperadmin:new Endpoint(URL_BASE,"user/get-all-users-from-superadmin"),

    loadImagesFromRoom: new Endpoint(URL_BASE, "room/get-all-images/files/{roomCode}"),

    canAddComment: new Endpoint(URL_BASE, "room/can-add-comment/{userId}/{roomCode}"),
    addComment: new Endpoint(URL_BASE, "room/add-room-comment"),
    getAllCommentsRoom: new Endpoint(URL_BASE, "room/get-room-comments/{roomCode}"),
    deleteRoomComment: new Endpoint(URL_BASE, "room/delete-room-comment")

}