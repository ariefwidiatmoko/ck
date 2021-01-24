import React, { useState, useEffect, Fragment } from 'react';
import DropzoneInput from './DropzoneInput';
import CropperInput from './CropperInput';
import { connect } from 'react-redux';
import {
  memberPhotoUpload,
  memberMainPhotoSet,
  memberPhotoDelete,
} from '../redux/reduxApi';
import { toastr } from 'react-redux-toastr';
import Galleries from './Galleries';

const actions = {
  memberPhotoUpload,
  memberMainPhotoSet,
  memberPhotoDelete,
};

const TabPhoto = ({
  auth,
  profile,
  loading,
  memberPhotoUpload,
  memberMainPhotoSet,
  memberPhotoDelete,
}) => {
  const [files, setFiles] = useState([]);
  const [cropResult, setCropResult] = useState('');
  const [addPic, setAddPic] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files, cropResult]);

  const handleUploadImage = async () => {
    const authData = auth;
    try {
      await memberPhotoUpload(image, files[0].name, authData, profile.userId);
      setAddPic(!addPic);
      handleCancelCrop();
    } catch (error) {
      console.log(error);
      toastr.error('Oops', 'Something went wrong');
    }
  };

  const handleCancelCrop = () => {
    setFiles([]);
    setImage(null);
    setCropResult('');
  };

  const handleMainPhotoSet = async (photo) => {
    try {
      await memberMainPhotoSet(profile.code, photo, auth);
    } catch (error) {
      toastr.error('Oops', error.message);
    }
  };

  const handleDeletePhoto = async (photo) => {
    try {
      await memberPhotoDelete(photo, auth, profile.userId);
    } catch (error) {
      toastr.error('Oops', error.message);
    }
  };

  const handleAddPic = () => {
    setAddPic(!addPic);
  };

  const addPicMenu = (
    <div>
      <div className='columns'>
        <div className='column'>
          <button
            onClick={handleAddPic}
            className={
              addPic
                ? 'button custom-grey is-small is-rounded is-outlined'
                : 'button is-small is-link is-rounded is-outlined'
            }
          >
            {addPic ? (
              <i className='fas fa-times icon' />
            ) : (
              <>
                <i className='fas fa-plus icon mr-1' />
                Foto
              </>
            )}
          </button>
        </div>
      </div>
      <div className={addPic ? 'mb-3' : 'is-hidden'}>
        <div className='columns'>
          <div className='column is-half is-offset-one-quarter has-text-centered'>
            {files.length === 0 && (
              <Fragment>
                Tambah & Upload
                <DropzoneInput setFiles={setFiles} />
              </Fragment>
            )}
            {files.length > 0 && (
              <Fragment>
                <CropperInput
                  setImage={setImage}
                  setCropResult={setCropResult}
                  imagePreview={files[0].preview}
                />
                <div
                  className='field has-addons'
                  style={{
                    display: 'block',
                    marginTop: '-32px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <button
                    onClick={handleUploadImage}
                    className={
                      loading
                        ? 'button is-small is-link is-rounded is-loading'
                        : 'button is-small is-link is-rounded'
                    }
                    style={{ marginRight: '10px' }}
                  >
                    <i className='fas fa-upload icon' />
                  </button>
                  <button
                    disabled={loading}
                    onClick={handleCancelCrop}
                    className='button custom-grey is-small is-rounded'
                  >
                    <i className='fas fa-times icon' />
                  </button>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Fragment>
      {profile.photos === null && addPicMenu}
      {profile.photos &&
        profile.photos.split(',').length < 3 &&
        addPicMenu}
      <Galleries
        mainPhoto={profile.mainPhoto}
        photos={profile.photos}
        memberMainPhotoSet={handleMainPhotoSet}
        deletePhoto={handleDeletePhoto}
        loading={loading}
      />
    </Fragment>
  );
};

export default connect(null, actions)(TabPhoto);
