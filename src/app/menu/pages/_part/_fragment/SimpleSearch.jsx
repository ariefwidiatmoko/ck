import React, { Component } from "react";
import { Button } from "../../../../common/components/Button";

class SimpleSearch extends Component {
  state = {
    value: "",
  };

  handleFocus = (event) => {
    event.target.select();
  }

  handleChange = (event) => {
      this.setState({
          value: event.target.value
      });
  }

  handleSearchSubmit = (e) => {
      this.props.onFormSubmit(this.state.value);
      e.preventDefault();
  }

  render() {
    const { loading, tl } = this.props;
    const {value} = this.state;
    return (
      <div className="level-item">
        <form onSubmit={e => this.handleSearchSubmit(e)} autoComplete="off">
          <div className="field has-addons">
            <p className="control">
              <input
                name="searchText"
                value={value}
                onChange={this.handleChange}
                className="input is-small is-rounded"
                type="text"
                placeholder={`Cari ${tl}`}
                onFocus={this.handleFocus}
              />
            </p>
            <p className="control">
              <Button
                type="submit"
                disabled={loading}
                className="button is-small is-link is-rounded is-outlined"
                loading={loading}
                icon="search"
              />
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default SimpleSearch;
