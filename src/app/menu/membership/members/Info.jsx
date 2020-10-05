import React, { Component, Fragment } from "react";
import { format, parseISO } from "date-fns";

class Info extends Component {
  render() {
    const {
      member,
    } = this.props;
    return (
      <Fragment>
      <div className="columns">
        <div className="column">
          <h3 className="has-text-weight-bold">No Anggota</h3>
          <div className="view">
            <p>{member.code || "-"}</p>
          </div>
        </div>
        <div className="column">
          <h3 className="has-text-weight-bold">Tanggal Bergabung</h3>
          <div className="view">
            <p className="is-capitalized">{member && member.joinDate ? format(parseISO(member.joinDate), "d LLLL yyyy") : "-"}</p>
          </div>
        </div>
        <div className="column">
          <h3 className="has-text-weight-bold">Status Anggota</h3>
          <div className="view">
            <p className="is-capitalized">{member.activeStatus ? 'Aktif' : "Non Aktif"}</p>
          </div>
        </div>
      </div>
        <div className="columns">
          <div className="column is-half">
            <h3 className="has-text-weight-bold">Panggilan</h3>
            <div className="view">
              <p className="is-capitalized">{member.name || "-"}</p>
            </div>
          </div>
          <div className="column is-half">
            <h3 className="has-text-weight-bold">Nama Lengkap</h3>
            <div className="view">
              <p className="is-capitalized">{member.fullname || "-"}</p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <h3 className="has-text-weight-bold">Nomer Telepon</h3>
            <div className="view">
              <p>{member.phone || "-"}</p>
            </div>
          </div>
          <div className="column">
            <h3 className="has-text-weight-bold">Jenis Kelamin</h3>
            <div className="view">
              <p className="is-capitalized">{member.gender || "-"}</p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <h3 className="has-text-weight-bold">Tempat Lahir</h3>
            <div className="view">
              <p className="is-capitalized">{member.pob || "-"}</p>
            </div>
          </div>
          <div className="column">
            <h3 className="has-text-weight-bold">Tanggal Lahir</h3>
            <div className="view">
              <p>
                {member.dob? format(parseISO(member.dob), "d LLLL yyyy")
                  : "-"}
              </p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <h3 className="has-text-weight-bold">Agama</h3>
            <div className="view">
              <p className="is-capitalized">{member.religion || "-"}</p>
            </div>
          </div>
          {member.religionDetail && (
              <div className="column">
                <h3 className="has-text-weight-bold">Detail</h3>
                <div className="view">
                  <p className="is-capitalized">{member.religionDetail || "-"}</p>
                </div>
              </div>
            )}
        </div>
        <div className="columns">
          <div className="column">
            <h3 className="has-text-weight-bold">Status Kawin</h3>
            <div className="view">
              <p className="is-capitalized">{member.maritalStatus || "-"}</p>
            </div>
          </div>
          <div className="column">
            <h3 className="has-text-weight-bold">Pekerjaan</h3>
            <div className="view">
              <p className="is-capitalized">{member.occupation || "-"}</p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <h3 className="has-text-weight-bold">Alamat</h3>
            <div className="view">
              <p className="is-capitalized">{member.address || "-"}</p>
            </div>
          </div>
        </div>
        <br/>
      </Fragment>
    );
  }
}

export default Info;
