export class CoolingRoomTypeDTO {
  id:number;
  typeName:string;
  typePrice:number;
  status:number;


  constructor(id: number, typeName: string, typePrice: number, status: number) {
    this.id = id;
    this.typeName = typeName;
    this.typePrice = typePrice;
    this.status = status;
  }
}
