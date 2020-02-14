import React from 'react';
import ReactDOM from 'react-dom';
import './common/css/reboot.css';
import './common/css/common.css';
import Header from './common/Header'
import AddCardButton from './deck-builder/AddCardButton';
import AdditionWindow from './deck-builder/AdditionWindow';
import UpdationWindow from './deck-builder/UpdationWindow';
import SubcategoryCards from './deck-builder/SubcategoryCards';
import DeckInfo, { CardInDeck } from './deck-builder/DeckInfo';
import DeckBuilderDao from './deck-builder/DeckBuilderDao';

class DeckListContainer extends React.Component {
  constructor(props) {
    super(props);

    DeckBuilderDao.getDeck('jzoibED7E4V61ve5oJZl')

    this.state = {
      deckInfo: new DeckInfo(),
      additionWindowOpen: false,
      updationWindowOpen: false,
      updationCard: new CardInDeck()
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
        setDeckInfo={this.setDeckInfo}
        getDeckInfo={this.getDeckInfo}
        changeQuantity={this.changeQuantity}
      />
    );
  }

  getDeckInfo = () => {
    return this.state.deckInfo;
  }
  setDeckInfo = (info) => {
    this.setState({deckInfo: info});
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