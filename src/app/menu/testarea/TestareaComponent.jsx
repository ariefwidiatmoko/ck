import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementCounter, decrementCounter } from './redux/testareaAction';
import { openModal } from '../modals/redux/modalActions';

const mapState = (state) => ({
  data: state.test.data,
  loading: state.async.loading,
  buttonName: state.async.elementName,
});

const actions = {
  incrementCounter,
  decrementCounter,
  openModal,
};

class TestareaComponent extends Component {
  render() {
    const { data, incrementCounter, decrementCounter, openModal } = this.props;
    return (
      <div className='column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile'>
        <div className='p-1'>
          <div className='columns is-variable is-desktop'>
            <div className='column'>
              <div className='box'>
                <h1 className='title'>Test Area</h1>
                <h3>The answer is: {data}</h3>
                <div className='field is-group'>
                  <button
                    name='increment'
                    onClick={incrementCounter}
                    className={'button is-link is-small is-rounded is-outlined'}
                    style={{ marginRight: 5 }}
                  >
                    <i className='icon fas fa-plus' />
                  </button>

                  <button
                    name='decrement'
                    onClick={decrementCounter}
                    className={'button is-link is-small is-rounded is-outlined'}
                    style={{ marginRight: 5 }}
                  >
                    <i className='icon fas fa-minus' />
                  </button>
                </div>
                <div className='field'>
                  <button
                    onClick={() => openModal('TestModal', { data: 42 })}
                    className='button is-primary is-rounded is-small is-outlined'
                  >
                    Open Modal
                  </button>
                </div>
                <div
                  className='field'
                  style={{ marginTop: 20, marginBottom: 20 }}
                >
                  <div className='control'>
                    <button
                      onClick={this.handleClickSubmit}
                      type='submit'
                      className='button is-primary is-small is-rounded is-outlined'
                    >
                      <i className='fas fa-save' aria-hidden='true' />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapState, actions)(TestareaComponent);
