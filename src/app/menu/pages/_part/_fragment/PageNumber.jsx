import React, { Component } from "react";

export default class PageNumber extends Component {
  state = {
    value: 10,
  }
  handleSelect = (event) => {
    this.setState({
      value: event.target.value,
    })
    this.props.handleNumber(event.target.value);
  };
  handlePage = (number) => {
    this.props.getPage(number);
  };
  render() {
    const { cp, itn, tt, tl } = this.props;
    return (
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <div className="field has-addons">
              <div className="control">
                <button
                  disabled={cp === 1}
                  onClick={() => this.handlePage(-1)}
                  className="button is-small is-rounded is-primary is-outlined"
                >
                  <span className="icon is-small">
                    <i className="fas fa-chevron-left" />
                  </span>
                </button>
              </div>
              <div className="control">
                <div className="button is-small is-disabled">
                  {tt > 0 &&
                  <span>
                    {(cp - 1) * itn + 1}-
                    {cp === Math.ceil(tt / itn)
                      ? (cp - 1) * itn + (tt % itn)
                      : cp * itn}{" "}
                    dari {tt ? tt : ""} {tl}
                  </span>}
                  {tt < 1 &&
                  <span>0 {tl}</span>}
                </div>
              </div>
              <div className="control">
                <button
                  disabled={cp === Math.ceil(tt / itn)}
                  onClick={() => this.handlePage(1)}
                  className="button is-small is-rounded is-primary is-outlined"
                >
                  <span className="icon is-small">
                    <i className="fas fa-chevron-right" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <div className="select is-small is-rounded">
              <select value={this.state.value} onChange={this.handleSelect}>
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


