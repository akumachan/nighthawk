import React from 'react';
import ReactDOM from 'react-dom';
import './common/css/reboot.css';
import './common/css/common.css';
import Header from './common/Header'
import AddCardButton from './deck-builder/AddCardButton'
import AdditionWindow from './deck-builder/AdditionWindow'
import UpdationWindow from './deck-builder/UpdationWindow'
import SubcategoryCards from './deck-builder/SubcategoryCards'
import DeckInfo from './deck-builder/DeckInfo'

class DeckListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deckInfo: new DeckInfo(),
      additionWindowOpen: false,
      updationWindowOpen: false,
      updationCard: {}
    }
  }

  toggleAdditionWindow = () => {
    this.setState({additionWindowOpen: !this.state.additionWindowOpen});
  }

  renderAdditionWindow = (show) => {
    return (
      <AdditionWindow show={show} />
    );
  }

  closeUpdationWindow = () => {
    this.setState({updationWindowOpen: false});
  }

  openUpdationWindow = (card) => {
    this.setState({updationWindowOpen: true, updationCard: card});
    this.setState({additionWindowOpen: false});
  }

  renderUpdationWindow = (show, card) => {
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
              <i className="material-icons main">photo_library</i>{this.state.deckInfo.getMainListCount()} Main
            </span>
            <span className="deck-name">{this.state.deckInfo.name}</span>
            <span className="sideboard">
              <i className="material-icons sideboard">360</i>{this.state.deckInfo.getSideboardListCount()} Sideboard
            </span>
          </h1>
          <div className="row upper">
            <div className="card-box">
              <h2>
                <span>
                  <i className="material-icons card-subcategory">sports_kabaddi</i>
                  {this.state.deckInfo.getCreatureListCount()} Creatures
                </span>
              </h2>
              <SubcategoryCards
                category="main"
                cardList={this.state.deckInfo.getCreatureList()}
                onClick={this.openUpdationWindow} />
              <h2>
                <i className="material-icons card-subcategory">flash_on</i>
                {this.state.deckInfo.getSpellListCount()} Spells
              </h2>
              <SubcategoryCards
                category="main"
                cardList={this.state.deckInfo.getSpellList()}
                onClick={this.openUpdationWindow} />
            </div>
            <div className="card-box">
              <h2>
                <i className="material-icons card-subcategory">terrain</i>
                {this.state.deckInfo.getLandListCount()} Lands
              </h2>
              <SubcategoryCards
                category="main"
                cardList={this.state.deckInfo.getLandList()}
                onClick={this.openUpdationWindow} />
              <h2>
                <i className="material-icons card-subcategory">360</i>
                {this.state.deckInfo.getSideboardListCount()} Sideboard
              </h2>
              <SubcategoryCards
                category="sideboard"
                cardList={this.state.deckInfo.getSideboardList()}
                onClick={this.openUpdationWindow} />
            </div>
          </div>
          <h2 className="reserved">
            <i className="material-icons card-subcategory">all_inclusive</i>
            {this.state.deckInfo.getReservedListCount()} Reserved Cards
          </h2>
          <div className="row lower">
            <div className="card-box left">
              <SubcategoryCards
                category="reserved"
                cardList={this.state.deckInfo.getReservedList().filter((card, i) => i % 2 === 0)}
                onClick={this.openUpdationWindow} />
            </div>
            <div className="card-box right">
              <SubcategoryCards
                category="reserved"
                cardList={this.state.deckInfo.getReservedList().filter((card, i) => i % 2 === 1)}
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