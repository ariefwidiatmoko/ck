import React from "react";
import { formatDistance, parseISO } from "date-fns";
import Tooltip from "react-tooltip-lite";

export const Profilecard = ({
  background,
  profileDefault,
  auth,
  profile,
  link,
}) => {
  return (
    <div className="card" style={{ borderRadius: 7 }}>
      <div className="card-image">
        <figure className="image is-4by3">
          <img
            src={background}
            alt=""
            style={{
              borderTopLeftRadius: 7,
              borderTopRightRadius: 7,
            }}
          />
        </figure>
        <div className="image custom-profile is-128x128">
          <img
            className="is-rounded"
            src={profile.mainPhoto ? link + profile.mainPhoto : profileDefault}
            alt=""
          />
        </div>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content has-text-centered">
            <p className="title is-5 is-capitalized">{auth.name}</p>
            <p className="subtitle is-7">{auth.username}</p>
            <p className="subtitle is-7">{auth.code}</p>
          </div>
        </div>

        <div className="content has-text-centered is-italic">
          {profile.about ? `"${profile.about}"` : ""}
        </div>
        <br />
        <div className="has-text-centered">
          {profile.joinDate && (
            <Tooltip content="Dibuat">
              <i className="fas fa-user-clock icon" />
            </Tooltip>
          )}{" "}
          {profile.joinDate &&
            formatDistance(Date.now(), parseISO(profile.joinDate)) + " ago"}
        </div>
      </div>
    </div>
  );
};
