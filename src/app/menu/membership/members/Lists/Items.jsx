import React, { Component } from "react";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

class Items extends Component {
  render() {
    const { item, cp, itn, index, loading, aS, onDelete } = this.props;
    if (loading)
      return (
        <tr>
          <td>Loading...</td>
        </tr>
      );
    const pg = (cp - 1) * itn;
    return (
      <tr>
        <td className="has-text-centered">{pg + index + 1}</td>
        <td className="has-text-centered">{item.code}</td>
        <td className="is-capitalized has-text-centered">
          {item.name}
        </td>
        <td className="is-capitalized has-text-centered">
          {item.fullname}
        </td>
        <td className="has-text-centered">
          {item.joinDate &&
            format(parseISO(item.joinDate), "d LLLL yyyy")}
        </td>
        <td className="has-text-centered">
          {item.activeStatus ? "Aktif" : "Non Aktif"}
        </td>
        <td className="has-text-centered">
          <div className="buttons">
            {aS.v === true && (
              <Link
                to={`/keanggotaan/anggota/detail/${item.id}`}
                className="button is-small is-rounded is-primary is-outlined"
              >
                <i className="fas fa-eye icon" />
              </Link>
            )}
            {aS.u === true && (
              <Link
                to={`/keanggotaan/anggota/edit/${item.id}`}
                className="button is-small is-rounded is-primary is-outlined"
              >
                <i className="fas fa-pen icon" />
              </Link>
            )}
            {aS.d === true && (
              <button
                className="button is-small is-rounded is-danger is-outlined"
                onClick={() => onDelete(item.id, item.code)}
              >
                <i className="fas fa-trash-alt icon" />
              </button>
            )}
          </div>
        </td>
      </tr>
    );
  }
}

export default Items;
