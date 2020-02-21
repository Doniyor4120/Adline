export class Platform {
  adGroups: number;
  ads: number;
  campaigns: number;
  id: string;
  name: string;

  constructor(object) {
    this.adGroups = object.adGroups;
    this.ads = object.ads;
    this.campaigns = object.campaigns;
    this.id = object.id;
    this.name = object.name;
  }
}
