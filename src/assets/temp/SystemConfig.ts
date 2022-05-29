const TABLE_PAGE_SIZES = [ 10, 25, 50];
export class SystemConfig{
  static getPageSizes(): number[] {
    return TABLE_PAGE_SIZES;
  }
}
