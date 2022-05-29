export class CoolingRoomDTO {
    id:number;
    roomNumber:string;
    roomTypeId:number;
    status:number;

  constructor(id: number, roomNumber: string, roomTypeId: number, status: number) {
    this.id = id;
    this.roomNumber = roomNumber;
    this.roomTypeId = roomTypeId;
    this.status = status;
  }
}
