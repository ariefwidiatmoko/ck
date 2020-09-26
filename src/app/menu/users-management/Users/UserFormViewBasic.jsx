import React, { Component, Fragment } from "react";
import { format, parseISO } from "date-fns";

class UserFormViewBasic extends Component {
  render() {
    const {
      user,
    } = this.props;
    const profile = user && user.profile ? user.profile : null;
    const hobby =  profile && profile.arrHobbies ? profile.arrHobbies.map((hobby) => (
      <span
        key={hobby}
        className="tag is-primary"
        style={{ marginRight: 5, marginBottom: 3 }}
      >
        {hobby}
      </span>
    )) : '-';
    return (
      <Fragment>
        <div className="columns">
          <div className="column is-half">
            <h3 className="has-text-weight-bold">Panggilan</h3>
            <div className="view">
              <p className="is-capitalized">{profile && profile.name ? profile.name : "-"}</p>
            </div>
          </div>
          <div className="column is-half">
            <h3 className="has-text-weight-bold">Nama Lengkap</h3>
            <div className="view">
              <p className="is-capitalized">{profile && profile.fullname ? profile.fullname : "-"}</p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <h3 className="has-text-weight-bold">Nomer Telepon</h3>
            <div className="view">
              <p>{profile && profile.phone ? profile.phone : "-"}</p>
            </div>
          </div>
          <div className="column">
            <h3 className="has-text-weight-bold">Jenis Kelamin</h3>
            <div className="view">
              <p className="is-capitalized">{profile && profile.gender ? profile.gender : "-"}</p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <h3 className="has-text-weight-bold">Tempat Lahir</h3>
            <div className="view">
              <p className="is-capitalized">{profile && profile.pob ? profile.pob : "-"}</p>
            </div>
          </div>
          <div className="column">
            <h3 className="has-text-weight-bold">Tanggal Lahir</h3>
            <div className="view">
              <p>
                {profile && profile.dob
                  ? format(parseISO(profile.dob), "d LLLL yyyy")
                  : "-"}
              </p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <h3 className="has-text-weight-bold">Agama</h3>
            <div className="view">
              <p className="is-capitalized">{profile && profile.religion ? profile.religion : "-"}</p>
            </div>
          </div>
          {profile && profile.religionDetail &&
            profile.religionDetail.length > 0 && (
              <div className="column">
                <h3 className="has-text-weight-bold">Detail</h3>
                <div className="view">
                  <p className="is-capitalized">{profile && profile.religionDetail ? profile.religionDetail : "-"}</p>
                </div>
              </div>
            )}
        </div>
        <div className="columns">
          <div className="column">
            <h3 className="has-text-weight-bold">Alamat</h3>
            <div className="view">
              <p className="is-capitalized">{profile && profile.address ? profile.address : "-"}</p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <h3 className="has-text-weight-bold">Pekerjaan</h3>
            <div className="view">
              <p className="is-capitalized">{profile && profile.occupation ? profile.occupation : "-"}</p>
            </div>
          </div>
          <div className="column">
            <h3 className="has-text-weight-bold">Status Kawin</h3>
            <div className="view">
              <p className="is-capitalized">{profile && profile.status ? profile.status : "-"}</p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <h3 className="has-text-weight-bold">Hobi</h3>
            <div className="view">
              <p className="is-capitalized">{hobby.toString().length > 1 ? hobby : '-'}</p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <h3 className="has-text-weight-bold">Tentang</h3>
            <div className="view">
              <p className="is-capitalized">{profile && profile.about ? profile.about : "-"}</p>
            </div>
          </div>
        </div>
        <br/>
      </Fragment>
    );
  }
}

export default UserFormViewBasic;
