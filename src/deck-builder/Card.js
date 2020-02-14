export default class Card {
  constructor(apiCard) {
    const jpInfo = apiCard.foreignNames.find(l => l.language === 'Japanese');

    this.name = apiCard.name;
    this.jpName = jpInfo ? jpInfo.name.replace(/（[^（）]*）/g, '') : null;
    this.cmc = apiCard.cmc;
    this.colors = apiCard.colors;
    this.superType = apiCard.superType ? apiCard.superType : null;
    this.types = apiCard.types;
    this.subTypes = apiCard.subTypes ? apiCard.subTypes : null;
    this.rarity = apiCard.rarity;
    this.set = apiCard.set;
    this.number = apiCard.number;
    this.power = apiCard.power ? apiCard.power : null;
    this.toughness = apiCard.toughness ? apiCard.toughness : null;
    this.legalities = apiCard.legalities;
  }
}