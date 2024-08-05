import type { ProvinceResponse } from "~/types/ApiResponse";

export class Province {
  constructor(
    public id: number,
    public name: string,
  ) {}

  static fromJson(json: ProvinceResponse) {
    return new Province(
      json.id,
      json.name
    )
  }
}
