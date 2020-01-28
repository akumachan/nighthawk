import React from 'react';
import ReactDOM from 'react-dom';
import './common/css/reboot.css';
import './common/css/common.css';
import Header from './common/Header'
import AddCardButton from './deck-builder/AddCardButton'
import AdditionWindow from './deck-builder/AdditionWindow'
import UpdationWindow from './deck-builder/UpdationWindow'
import SubcategoryCards from './deck-builder/SubcategoryCards'
class DeckListContainer extends React.Component {
  constructor(props) {
    super(props);
    const deckInfo = getDeckInfo();
    this.state = {
      name: deckInfo.name,
      creatureCards: deckInfo.cardList.filter(
        (card) => card.subcategory === 'creature' && card.mainQuantity > 0),
      spellCards: deckInfo.cardList.filter(
        (card) => card.subcategory === 'spell' && card.mainQuantity > 0),
      landCards: deckInfo.cardList.filter(
        (card) => card.subcategory === 'land' && card.mainQuantity > 0),
      sideboardCards: deckInfo.cardList.filter(
        (card) => card.sideboardQuantity > 0),
      reservedCards: deckInfo.cardList.filter(
        (card) => card.reservedQuantity > 0),
      additionWindowOpen: false,
      updationWindowOpen: false,
      updationCard: {}
    }
    this.toggleAdditionWindow = this.toggleAdditionWindow.bind(this);
    this.closeUpdationWindow = this.closeUpdationWindow.bind(this);
    this.openUpdationWindow = this.openUpdationWindow.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
    this.decrementQuantity = this.decrementQuantity.bind(this);
  }

  toggleAdditionWindow() {
    this.setState({additionWindowOpen: !this.state.additionWindowOpen});
  }

  renderAdditionWindow(show) {
    return (
      <AdditionWindow show={show} />
    );
  }

  closeUpdationWindow() {
    this.setState({updationWindowOpen: false});
  }

  openUpdationWindow(card) {
    this.setState({updationWindowOpen: true, updationCard: card});
    this.setState({additionWindowOpen: false});
  }

  renderUpdationWindow(show, card) {
    return (
      <UpdationWindow
        show={show}
        card={card}
        closeModal={this.closeUpdationWindow}
        increment={this.incrementQuantity}
        decrement={this.decrementQuantity}
      />
    );
  }

  incrementQuantity(card,
                    category,
                    incrementalNumber = 1,
                    restrict = (target, category) => {
                    }) {
    const listName = card.subcategory + 'Cards';

    const targetList = this.state[listName].slice();
    for (let target of targetList) {
      const totalQuantity = target.mainQuantity + target.sideboardQuantity;
      const afterIncremented = target[category + 'Quantity'] + incrementalNumber;
      if (target.name === card.name
        && afterIncremented >= 0
        && (category === 'reserved'
            || target.isUnlimitedUse
            || totalQuantity + incrementalNumber <= 4)) {
        target[category + 'Quantity'] = afterIncremented;
        break;
      } else {
        // error message or red coloring class css
      }
    }
    this.setState({listName: targetList});
  }

  decrementQuantity(card, category) {
    this.incrementQuantity(card, category, -1);
  }

  render() {
    return (
      <div id="deck-list-container">
        <section>
          <h1>
            <span className="main">
              <i className="material-icons main">photo_library</i>10 Main
            </span>
            <span className="deck-name">UW Control for GP Nagoya2020</span>
            <span className="sideboard">
              <i className="material-icons sideboard">360</i>10 Sideboard
            </span>
          </h1>
          <div className="row upper">
            <div className="card-box">
              <h2>
                <span>
                  <i className="material-icons card-subcategory">sports_kabaddi</i>
                  10 Creatures
                </span>
              </h2>
              <SubcategoryCards
                category="main"
                cardList={this.state.creatureCards}
                onClick={this.openUpdationWindow} />
              <h2>
                <i className="material-icons card-subcategory">flash_on</i>
                10 Spells
              </h2>
              <SubcategoryCards
                category="main"
                cardList={this.state.spellCards}
                onClick={this.openUpdationWindow} />
            </div>
            <div className="card-box">
              <h2>
                <i className="material-icons card-subcategory">terrain</i>
                {this.state.landCards.reduce((sum, card) => sum + card.mainQuantity, 0)} Lands
              </h2>
              <SubcategoryCards
                category="main"
                cardList={this.state.landCards}
                onClick={this.openUpdationWindow} />
              <h2>
                <i className="material-icons card-subcategory">360</i>
                {this.state.sideboardCards.reduce((sum, card) => sum + card.sideboardQuantity, 0)} Sideboard
              </h2>
              <SubcategoryCards
                category="sideboard"
                cardList={this.state.sideboardCards}
                onClick={this.openUpdationWindow} />
            </div>
          </div>
          <h2 className="reserved">
            <i className="material-icons card-subcategory">all_inclusive</i>
            10 Reserved Cards
          </h2>
          <div className="row lower">
            <div className="card-box left">
              <SubcategoryCards
                category="reserved"
                cardList={this.state.reservedCards.filter((card, i) => i % 2 === 0)}
                onClick={this.openUpdationWindow} />
            </div>
            <div className="card-box right">
              <SubcategoryCards
                category="reserved"
                cardList={this.state.reservedCards.filter((card, i) => i % 2 === 1)}
                onClick={this.openUpdationWindow} />
            </div>
          </div>
          <AddCardButton toggleAdditionWindow={this.toggleAdditionWindow}/>
          {this.renderAdditionWindow(this.state.additionWindowOpen)}
          {this.renderUpdationWindow(this.state.updationWindowOpen, this.state.updationCard)}
        </section>
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <Header />
    <DeckListContainer />
  </div>,
  document.getElementById('root')
);

function getDeckInfo() {
  return {
    name: "Mono Red Aggro 2018",
    cardList: [{
      id: 'aaaa',
      name: "ボーマットの急使",
      subcategory: 'creature',
      mainQuantity: 4,
      sideboardQuantity: 0,
      reservedQuantity: 2
    },
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
    }]
  };
}