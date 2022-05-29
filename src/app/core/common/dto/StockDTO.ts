export class StockDTO {
  tokenDTO:TokenDTO;
  descriptionDTOS:DescriptionDTO[];

  constructor(tokenDTO: TokenDTO, descriptionDTOS: DescriptionDTO[]) {
    this.tokenDTO = tokenDTO;
    this.descriptionDTOS = descriptionDTOS;
  }
}
export class TokenDTO {
    id:number;
    whoIssued:string;
    createDate:string;
    customerId:number;
    customerName:string;
    status:number;

  constructor(id: number, whoIssued: string, createDate: string, customerId: number, customerName: string, status: number) {
    this.id = id;
    this.whoIssued = whoIssued;
    this.createDate = createDate;
    this.customerId = customerId;
    this.customerName = customerName;
    this.status = status;
  }
}
export class DescriptionDTO {
    id:number;
    fishName:string;
    fishWeight:number;
    coolingRoomId:number;
    tokenId:number;
    status:number;


  constructor(id: number, fishName: string, fishWeight: number, coolingRoomId: number, tokenId: number, status: number) {
    this.id = id;
    this.fishName = fishName;
    this.fishWeight = fishWeight;
    this.coolingRoomId = coolingRoomId;
    this.tokenId = tokenId;
    this.status = status;
  }
}
