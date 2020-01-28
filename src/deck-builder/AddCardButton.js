import React from 'react';
export default class AddCardButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.toggleOpenState = this.toggleOpenState.bind(this);
  }

  toggleOpenState(props) {
    this.setState({open: !this.state.open});
    props.toggleAdditionWindow();
  }

  render() {
    return (
      <a id="add-card-window" onClick={() => this.toggleOpenState(this.props)}>
        <i className={["material-icons add-card-window",
          this.state.open ? 'open' : 'close'].join(' ')}>
            keyboard_arrow_down
        </i>
      </a>
    );
  }
}
