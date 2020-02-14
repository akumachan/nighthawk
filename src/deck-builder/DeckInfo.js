export default class DeckInfo {
  constructor() {

    this.id = 'test';
    this.user = 'testuser';
    this.name = "Mono Red Aggro 2018";
    this.format = "Standard";

    const bomat = new CardInDeck({
      id: 'aaaa',
      name: "ボーマットの急使",
      subcategory: 'creature',
      mainQuantity: 1,
      sideboardQuantity: 0,
      reservedQuantity: 2
    });

    this.cardList = [bomat,
    {
      id: 'aaab',
      name: "アン一門の壊し屋",
      subcategory: 'creature',
      mainQuantity: 3,
      sideboardQuantity: 1,
      reservedQuantity: 1
    },
    {
      id: 'aaac',
      name: "炎の職工、チャンドラ",
      subcategory: 'spell',
      mainQuantity: 4,
      sideboardQuantity: 0,
      reservedQuantity: 2
    },
    {
      id: 'aaad',
      name: "ショック",
      subcategory: 'spell',
      mainQuantity: 3,
      sideboardQuantity: 1,
      reservedQuantity: 1
    },
    {
      id: 'aaae',
      name: "山",
      subcategory: 'land',
      mainQuantity: 24,
      sideboardQuantity: 0,
      reservedQuantity: 0,
      isUnlimitedUse: true
    },
    {
      id: 'aaaf',
      name: "ラムナプの遺跡",
      subcategory: 'land',
      mainQuantity: 4,
      sideboardQuantity: 0,
      reservedQuantity: 1
    },
    {
      id: 'aaag',
      name: "削剥",
      subcategory: 'spell',
      mainQuantity: 2,
      sideboardQuantity: 1,
      reservedQuantity: 4
    },
    {
      id: 'aaah',
      name: "Black Lotus",
      subcategory: 'spell',
      mainQuantity: 2,
      sideboardQuantity: 1,
      reservedQuantity: 100
    },
    {
      id: 'aaai',
      name: "マスティコア",
      subcategory: 'creature',
      mainQuantity: 2,
      sideboardQuantity: 1,
      reservedQuantity: 4
    },
    {
      id: 'aaaj',
      name: "ネビニラルの円盤",
      subcategory: 'spell',
      mainQuantity: 1,
      sideboardQuantity: 1,
      reservedQuantity: 1
    },
    {
      id: 'aaak',
      name: "吸血鬼の夜鷲",
      subcategory: 'creature',
      mainQuantity: 2,
      sideboardQuantity: 1,
      reservedQuantity: 4
    },
    {
      id: 'aaal',
      name: "火 // 氷",
      subcategory: 'spell',
      mainQuantity: 2,
      sideboardQuantity: 1,
      reservedQuantity: 4
    }];
  }

  getMainList = () => {
    return this.cardList.filter(card => card.mainQuantity > 0);
  }

  getMainListCount = () => {
    return this.getMainList().reduce((sum, card) => sum + card.mainQuantity, 0);
  }
s
  getCreatureList = () => {
    return this.getMainList().filter(card => card.subcategory === 'creature');
  }

  getCreatureListCount = () => {
    return this.getCreatureList().reduce((sum, card) => sum + card.mainQuantity, 0);
  }

  getLandList = () => {
    return this.getMainList().filter(card => card.subcategory === 'land');
  }

  getLandListCount = () => {
    return this.getLandList().reduce((sum, card) => sum + card.mainQuantity, 0);
  }

  getSpellList = () => {
    return this.getMainList().filter(card => card.subcategory === 'spell');
  }

  getSpellListCount = () => {
    return this.getSpellList().reduce((sum, card) => sum + card.mainQuantity, 0);
  }

  getReservedList = () => {
    return this.getMainList().filter(card => card.reservedQuantity > 0);
  }

  getReservedListCount = () => {
    return this.getReservedList().reduce((sum, card) => sum + card.reservedQuantity, 0);
  }

  getSideboardList = () => {
    return this.getMainList().filter(card => card.sideboardQuantity > 0);
  }

  getSideboardListCount = () => {
    return this.getSideboardList().reduce((sum, card) => sum + card.sideboardQuantity, 0);
  }
}

export class CardInDeck {
  constructor(obj) {
    this.id = obj?.id || '';
    this.name = obj?.name || '';
    this.jpName = obj?.name || '';
    this.subcategory = obj?.subcategory || '';
    this.mainQuantity = obj?.mainQuantity || 0;
    this.sideboardQuantity = obj?.sideboardQuantity || 0;
    this.reservedQuantity = obj?.reservedQuantity || 0;
    this.isUnlimitedUse = obj?.isUnlimitedUse || false;
  }

  incrementMain = (maxCount = 4, incrementNumber = 1) => {
    this._increment((num = 0) => this.mainQuantity += num, maxCount, incrementNumber);
  }

  decrementMain = (decrementNumber = 1) => {
    this._decrement((num = 0) => this.mainQuantity -= num, decrementNumber);
  }

  incrementSideboard = (maxCount = 4, incrementNumber = 1) => {
    this._increment((num = 0) => this.sideboardQuantity += num, maxCount, incrementNumber);
  }

  decrementSideboard = (decrementNumber = 1) => {
    this._decrement((num = 0) => this.sideboardQuantity -= num, decrementNumber);
  }

  _increment = (quantityProp, maxCount, incrementNumber) => {
    if (!this.isUnlimitedUse && maxCount - quantityProp() >= incrementNumber) {
      quantityProp(incrementNumber);
    }
  }

  _decrement = (quantityProp, decrementNumber) => {
    if (quantityProp() - decrementNumber >= 0) {
     quantityProp(decrementNumber);
    }
  }

  static getCardInDeck(mtgObj) {
    console.log(mtgObj)
    const card = new CardInDeck();
    card.id = mtgObj.id;
    card.name = mtgObj.name;
    card.jpName = mtgObj.foreignNames.find(l => l.language === 'Japanese').name;
    card.subcategory = mtgObj.types.includes('Creature') ? 'creature' :
      mtgObj.types.includes('Land') ? 'land' : 'spell';
    card.isUnlimitedUse = mtgObj.supertypes.includes('Basic');
    return card;
  }
}