import React from 'react';

export default class Header extends React.Component{
  render() {
    return (
      <header>
        <a href="/#"><i className="material-icons menu">menu</i></a>
        <span className="service_name">Nighthawk</span>
        <a href="/#"><i className="material-icons save">save</i></a>
      </header>
    );
  }
}