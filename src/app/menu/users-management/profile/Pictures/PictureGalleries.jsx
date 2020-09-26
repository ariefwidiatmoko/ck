import React, { useState, Fragment } from "react";
import profileDefault from "../../../../../images/user-default.png";
import {SITE_ADDRESS} from "../../../../common/util/siteConfig"

const PictureGalleries = ({
  mainPhoto,
  arrPhotos,
  deletePhoto,
  setMainPhoto,
  loading
}) => {
  const [buttonId, setButtonId] = useState("");
  let filteredPhotos;
  if (arrPhotos) {
    filteredPhotos = arrPhotos.split(",").filter(photo => {
      return photo !== mainPhoto;
    });
  }
  return (
    <Fragment>
      <div className="box is-12">
        <p className="title is-5">Galeri</p>
        <div className="columns">
          <div className="column is-one-quarter-desktop is-half-tablet">
            <div className="card">
              <div className="card-image">
                <figure className="image is-1by1">
                  <img alt="" src={mainPhoto && mainPhoto.length > 0 ? SITE_ADDRESS + mainPhoto : profileDefault} />
                </figure>
              </div>
              <footer className="card-footer" style={{ marginTop: -27 }}>
                <button className="button is-small is-primary is-fullwidth">
                  Foto Profil
                </button>
              </footer>
            </div>
          </div>
        </div>
        <div className="columns is-multiline">
          {arrPhotos &&
            filteredPhotos.map(photo => (
              <div
                className="column is-one-quarter-desktop is-half-tablet"
                key={photo}
              >
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-1by1">
                      <img alt="" src={ SITE_ADDRESS + photo} />
                    </figure>
                  </div>
                  <footer className="card-footer" style={{ marginTop: -27 }}>
                    <button
                      disabled={
                        loading && photo && buttonId !== photo + "set"
                          ? true
                          : false
                      }
                      onClick={() => {
                        setMainPhoto(photo);
                        setButtonId(photo + "set");
                      }}
                      className={
                        buttonId === photo + "set"
                          ? "button is-small is-primary is-fullwidth is-loading"
                          : "button is-small is-primary is-fullwidth"
                      }
                    >
                      <i className="fas fa-check" />
                    </button>
                    <button
                      disabled={
                        loading && photo && buttonId !== photo + "del"
                          ? true
                          : false
                      }
                      onClick={() => {
                        deletePhoto(photo);
                        setButtonId(photo + "del");
                      }}
                      className={
                        buttonId === photo + "del"
                          ? "button is-small is-danger is-fullwidth is-loading"
                          : "button is-small is-danger is-fullwidth"
                      }
                    >
                      <i className="fas fa-trash" />
                    </button>
                  </footer>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default PictureGalleries;