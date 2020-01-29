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
            <i className="material-icons add" onClick={() => this.props.increment(this.props.card.id, "main")}>add</i>
            <input id="" value={this.props.card.mainQuantity} />
            <i className="material-icons remove" onClick={() => this.props.decrement(this.props.card, "main")}>remove</i>
          </div>
          <div id="sideboard-card-quantity">
            <i className="material-icons subcategory">360</i>
            <i className="material-icons add" onClick={() => this.props.increment(this.props.card, "sideboard")}>add</i>
            <input id="" value={this.props.card.sideboardQuantity}/>
            <i className="material-icons remove" onClick={() => this.props.decrement(this.props.card, "sideboard")}>remove</i>
          </div>
          <div id="reserved-card-quantity">
            <i className="material-icons subcategory">all_inclusive</i>
            <i className="material-icons add" onClick={() => this.props.increment(this.props.card, "reserved")}>add</i>
            <input id="" value={this.props.card.reservedQuantity} />
            <i className="material-icons remove" onClick={() => this.props.decrement(this.props.card, "reserved")}>remove</i>
          </div>
        </div>
      </div>
    );
  }
}
