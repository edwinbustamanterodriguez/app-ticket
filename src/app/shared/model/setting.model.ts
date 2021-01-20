export class Setting {
  speed: number;
  maxTicketShow: number;
  backgroundColor: string;
  backgroundColor2: string;
  lineSeparatorColor: string;
  activeListColor: string;
  activeTextColor: string;
  sliderBarColor: string;
  sliderSelectionColor: string;
  urlColor: string;
  paragraphColor: string;
  readColor: string;
  paragraphSize: number;

  constructor(speed: number,
              maxTicketsShow: number,
              backgroundColor: string,
              backgroundColor2: string,
              lineSeparatorColor: string,
              activeListColor: string,
              activeTextColor: string,
              sliderBarColor: string,
              sliderSelectionColor: string,
              urlColor: string,
              paragraphColor: string,
              readColor: string,
              paragraphSize: number) {
    this.speed = speed;
    this.maxTicketShow = maxTicketsShow;
    this.backgroundColor = backgroundColor;
    this.backgroundColor2 = backgroundColor2;
    this.lineSeparatorColor = lineSeparatorColor;
    this.activeListColor = activeListColor;
    this.activeTextColor = activeTextColor;
    this.sliderBarColor = sliderBarColor;
    this.sliderSelectionColor = sliderSelectionColor;
    this.urlColor = urlColor;
    this.paragraphColor = paragraphColor;
    this.readColor = readColor;
    this.paragraphSize = paragraphSize;
  }
}

