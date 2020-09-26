import React, { useState, useEffect, Fragment } from "react";
import DropzoneInput from "./DropzoneInput";
import CropperInput from "./CropperInput";
import { connect } from "react-redux";
import {
  profilePictureUpload,
  profileMainPhotoSet,
  profilePictureDelete
} from "../redux/profileApi";
import { toastr } from "react-redux-toastr";
import PictureGalleries from "./PictureGalleries";

const actions = {
  profilePictureUpload,
  profilePictureDelete,
  profileMainPhotoSet
};

const ProfilePictures = ({
  auth,
  profile,
  loading,
  profilePictureUpload,
  profilePictureDelete,
  profileMainPhotoSet
}) => {
  const [files, setFiles] = useState([]);
  const [cropResult, setCropResult] = useState("");
  const [addPic, setAddPic] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [files, cropResult]);

  const handleUploadImage = async () => {
    const authData = auth;
    try {
      await profilePictureUpload(
        image,
        files[0].name,
        authData
      );
      handleCancelCrop();
    } catch (error) {
      console.log(error);
      toastr.error("Oops", "Something went wrong");
    }
  };

  const handleCancelCrop = () => {
    setFiles([]);
    setImage(null);
    setCropResult("");
  };

  const handleDeletePhoto = async photo => {
    try {
      await profilePictureDelete(photo, auth);
    } catch (error) {
      toastr.error("Oops", error.message);
    }
  };

  const handleSetMainPhoto = async photo => {
    try {
      await profileMainPhotoSet(photo, auth);
    } catch (error) {
      toastr.error("Oops", error.message);
    }
  };

  const handleAddPic = () => {
    setAddPic(!addPic);
  };

  const addPicMenu = (
    <div>
      <div className="columns">
        <div className="column">
          <button
            onClick={handleAddPic}
            className={
              addPic
                ? "button custom-grey is-small is-rounded is-outlined"
                : "button is-small is-link is-rounded is-outlined"
            }
          >
            {addPic ? "Batalkan" : "Foto Baru"}
          </button>
        </div>
      </div>
      <div
        className={addPic ? "" : "is-hidden"}
        style={{ marginBottom: 15 }}
      >
        <div className="columns">
          <div className="column is-half is-offset-one-quarter has-text-centered">
            {files.length === 0 && (
              <Fragment>
                Tambah & Upload
                <DropzoneInput setFiles={setFiles} />
              </Fragment>
            )}
            {files.length > 0 && (
              <Fragment>
                Tambah & Upload
                <CropperInput
                  setImage={setImage}
                  setCropResult={setCropResult}
                  imagePreview={files[0].preview}
                />
                <div
                  className="field has-addons"
                  style={{
                    display: "block",
                    marginTop: "-32px",
                    marginLeft: "auto",
                    marginRight: "auto"
                  }}
                >
                  <button
                    onClick={handleUploadImage}
                    className={
                      loading
                        ? "button is-small is-link is-rounded is-loading"
                        : "button is-small is-link is-rounded"
                    }
                    style={{ marginRight: "10px" }}
                  >
                    Upload
                  </button>
                  <button
                    disabled={loading}
                    onClick={handleCancelCrop}
                    className="button custom-grey is-small is-rounded"
                  >
                    Batalkan
                  </button>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Fragment>
      {profile.arrPhotos === null && (
        addPicMenu
      )}
      {profile.arrPhotos && profile.arrPhotos.split(",").length < 3 && addPicMenu }
      <PictureGalleries
        mainPhoto={profile.mainPhoto}
        arrPhotos={profile.arrPhotos}
        setMainPhoto={handleSetMainPhoto}
        deletePhoto={handleDeletePhoto}
        loading={loading}
      />
    </Fragment>
  );
};

export default connect(null, actions)(ProfilePictures);
