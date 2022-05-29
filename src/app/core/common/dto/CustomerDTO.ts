export class CustomerDTO {
    id:number;
    shopName:string;
    shopOwnerName:string;
    nic:string;
    contactNo:string;
    status:number;

  constructor(id: number, shopName: string, shopOwnerName: string, nic: string, contactNo: string, status: number) {
    this.id = id;
    this.shopName = shopName;
    this.shopOwnerName = shopOwnerName;
    this.nic = nic;
    this.contactNo = contactNo;
    this.status = status;
  }
}
