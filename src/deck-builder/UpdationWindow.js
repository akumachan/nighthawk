import React from 'react';
export default class UpdationWindow extends React.Component {
  render() {
    return (
      <div className={['modal', this.props.show ? 'open' : 'close'].join(' ')}>
        <div className="modal-bg" onClick={this.props.closeModal}></div>
        <div id="updation-window" className={['footer-window', this.props.show ? 'open' : 'close'].join(' ')}>
          <div id="target-card-name">
            <p>{this.props.card.name}</p>
          </div>
          <div id="main-card-quantity">
            <i className="material-icons subcategory">photo_library</i>
            <i className="material-icons add" onClick={() => this.changeQuantity(this.props.card.id, 'incrementMain')}>add</i>
            <input id="main-card-quantity-input" defaultValue={this.props.card.mainQuantity} />
            <i className="material-icons remove" onClick={() => this.changeQuantity(this.props.card.id, 'decrementMain')}>remove</i>
          </div>
          <div id="sideboard-card-quantity">
            <i className="material-icons subcategory">360</i>
            <i className="material-icons add" onClick={() => this.changeQuantity(this.props.card.id, "incrementSideboard")}>add</i>
            <input id="sideboard-card-quantity-input" defaultValue={this.props.card.sideboardQuantity}/>
            <i className="material-icons remove" onClick={() => this.changeQuantity(this.props.card.id, "decrementSideboard")}>remove</i>
          </div>
          <div id="reserved-card-quantity">
            <i className="material-icons subcategory">all_inclusive</i>
            <i className="material-icons add" onClick={() => this.changeQuantity(this.props.card.id, "incrementReserved")}>add</i>
            <input id="reserved-card-quantity-input" defaultValue={this.props.card.reservedQuantity} />
            <i className="material-icons remove" onClick={() => this.changeQuantity(this.props.card.id, "decrementReserved")}>remove</i>
          </div>
        </div>
      </div>
    );
  }

  changeQuantity = (id, method) => {
    const info = {...this.props.getDeckInfo()};
    const target = info.cardList.find((card) => id === card.id);
    if (target) {
      target[method]();
      this.props.setDeckInfo(info);
    }
  }
}
