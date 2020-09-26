import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { memberView } from "./redux/reduxApi";
import Tab from "./Tab";
import TabBasic from "./TabBasic";
import TabPhoto from "./TabPhoto";
import TabAccount from "./TabAccount";
import background from "../../../../images/default-background.jpg";
import profileDefault from "../../../../images/user-default.png";
import { SITE_ADDRESS } from "../../../common/util/siteConfig";
import { PhotoCard } from "./PhotoCard";

const mapState = (state, ownProps) => {
  const memberId = ownProps.match.params.id;

  let aS = {};
  if (state.auth) {
    aS = state.auth.arrAuth.detail.subm.filter((i) => i.id === "anggota")[0];
  }

  let member = {};
  if (state.members && state.members.length > 0) {
    member = state.members.filter(
      (member) => member.id === Number(memberId)
    )[0];
  }
  return {
    auth: state.auth,
    aS: aS,
    member: member,
  };
};

const actions = {
  memberView,
};

class View extends Component {
  _isMounted = false;
  state = {
    tl: "anggota",
    memberId: this.props.match.params.id,
    member: this.props.member,
    activeTab: "basic",
  };

  OnChangeActiveTab = (activeTab) => {
    this.setState({
      activeTab: activeTab,
    });
  };

  render() {
    const { aS, auth, member } = this.props;
    const { memberId, tl } = this.state;
    return (
      <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
        <div className="p-1">
          <div className="columns is-variable">
            <div className="column is-fullwidth">
              <div className="box">
                <div className="level">
                  <div className="level-left">
                    <div className="level-item">
                      <nav
                        className="breadcrumb is-size-7"
                        aria-label="breadcrumbs"
                      >
                        <ul className="margin-10-25">
                          <li className="is-capitalized">
                            <Link to="/keanggotaan/anggota">{tl}</Link>
                          </li>
                          <li className="is-active">
                            <Link
                              to={`/keanggotaan/anggota/detail/${memberId}`}
                            >
                              Detail
                            </Link>
                          </li>
                          <li className="is-active">
                            <Link
                              to={`/keanggotaan/anggota/detail/${memberId}`}
                            >
                              {member.code}
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>

                  <div className="level-right">
                    <div className="level-item">
                      <div className="buttons">
                        {aS.u === true && (
                          <Link
                            to={"/keanggotaan/anggota/edit/" + memberId}
                            className="button is-small is-primary is-rounded is-outlined"
                          >
                            <i className="fas fa-pen icon" />
                          </Link>
                        )}
                        {aS.c === true && (
                          <Link
                            to="/keanggotaan/anggota/tambah"
                            className="button is-small is-primary is-rounded is-outlined"
                          >
                            <i className="fas fa-plus icon" />
                          </Link>
                        )}
                        <Link
                          to="/keanggotaan/anggota"
                          className="button custom-grey is-small is-rounded is-outlined"
                        >
                          <i className="fas fa-arrow-left icon" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-3-desktop is-12-mobile">
                    <PhotoCard
                      background={background}
                      profileDefault={profileDefault}
                      auth={{
                        name: member ? member.name : "",
                        code: member ? member.code : "",
                      }}
                      profile={member ? member : ""}
                      link={SITE_ADDRESS}
                    />
                  </div>
                  <div className="column">
                    <div className="box">
                      <Tab
                        onChangeActiveTab={this.OnChangeActiveTab}
                        activeTab={this.state.activeTab}
                        memberId={memberId}
                      />
                      {this.state.activeTab === "basic" && (
                        <TabBasic member={member} />
                      )}
                      {this.state.activeTab === "photo" && (
                        <TabPhoto profile={member} auth={auth} />
                      )}
                      {this.state.activeTab === "account" && (
                        <TabAccount member={member} />
                      )}
                    </div>
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

export default withRouter(connect(mapState, actions)(View));
