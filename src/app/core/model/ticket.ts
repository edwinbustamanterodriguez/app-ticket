export class Ticket {

  id: string;
  source: string;
  postedDateTime: string;
  createdDateTime: string;
  servility: string;
  timeToLive: string;
  url: string;
  logo: string;
  order: string;
  chime: string;
  header: string;
  body1: string;
  body2: string;
  body3: string;
  extra1: string;
  extra2: string;

  constructor(id: string,
              source: string,
              postedDateTime: string,
              createdDateTime: string,
              servility: string,
              timeToLive: string,
              url: string,
              logo: string,
              order: string,
              chime: string,
              header: string,
              body1: string,
              body2: string,
              body3: string,
              extra1: string,
              extra2: string) {
    this.id = id;
    this.source = source;
    this.postedDateTime = postedDateTime;
    this.createdDateTime = createdDateTime;
    this.servility = servility;
    this.timeToLive = timeToLive;
    this.url = url;
    this.logo = logo;
    this.order = order;
    this.chime = chime;
    this.header = header;
    this.body1 = body1;
    this.body2 = body2;
    this.body3 = body3;
    this.extra1 = extra1;
    this.extra2 = extra2;
  }
}
