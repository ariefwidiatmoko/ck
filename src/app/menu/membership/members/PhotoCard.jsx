import React from "react";

export const PhotoCard = ({
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
            <p className="subtitle is-7">{auth.code}</p>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};
