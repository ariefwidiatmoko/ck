import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { checkAuthScope, checkSession } from "./checkAuth";
import { openModal } from "../../menu/modals/redux/modalActions";

const mapState = (state) => {
  return {
    auth: state.auth,
    aS: state.auth.arrAuth.detail,
    expiresIn: state.auth.expiresIn,
  };
};

const actions = {
  checkAuthScope,
  checkSession,
  openModal,
};

export default function (ComposedComponent) {
  class Authenticate extends Component {
    componentDidMount = () => {
      this.checkAndRedirect();
    };

    componentDidUpdate = () => {
      this.checkAndRedirect();
    };

    checkAndRedirect = async () => {
      const { expiresIn, aS, location, checkAuthScope, checkSession, openModal } = this.props;
      try {
        if (Date.now() < expiresIn) {
          checkAuthScope(openModal, aS, location.pathname);
        } else {
          checkSession(openModal);
        }
      } catch (error) {
        console.log(error);
      }
    };
    render() {
      return (
        <Fragment>
          <ComposedComponent {...this.props} />
        </Fragment>
      );
    }
  }

  return connect(mapState, actions)(Authenticate);
}
