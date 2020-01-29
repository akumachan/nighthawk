import React from 'react';
export default class AdditionWindow extends React.Component {
  render() {
    return (
      <div id="addition-window" className={['footer-window', this.props.show ? 'open' : 'close'].join(' ')}>
        <div id="card-selection">
          <div id="card-search-name">
            <i className="material-icons">search</i>
            <input id="card-search-name-input" />
            <i className="material-icons">clear</i>
          </div>
          <div id="card-quantity">
            <i className="material-icons add">add</i>
            <input id="card-quantity-input" defaultValue="4" />
            <i className="material-icons remove">remove</i>
          </div>
        </div>
        <div>
          <a id="add-card" className="add-card-button">
            <i className="material-icons add-in-button">add</i>
            <i className="material-icons subcategory">photo_library</i>
          </a>
        </div>
      </div>
    );
  }
}