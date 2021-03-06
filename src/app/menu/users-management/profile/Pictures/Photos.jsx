import React, { useState, useEffect } from 'react';
import DropzoneInput from './DropzoneInput';
import CropperInput from './CropperInput';
import { connect } from 'react-redux';
import {
  profilePhotoUpload,
  profileMainPhotoSet,
  profilePhotoDelete,
} from '../redux/profileApi';
import { toastr } from 'react-redux-toastr';
import Galleries from './Galleries';

const actions = {
  profilePhotoUpload,
  profilePhotoDelete,
  profileMainPhotoSet,
};

const Photos = ({
  auth,
  profile,
  loading,
  profilePhotoUpload,
  profilePhotoDelete,
  profileMainPhotoSet,
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
      await profilePhotoUpload(image, files[0].name, authData);
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

  const handleDeletePhoto = async (photo) => {
    try {
      await profilePhotoDelete(photo, auth);
    } catch (error) {
      toastr.error('Oops', error.message);
    }
  };

  const handleSetMainPhoto = async (photo) => {
    try {
      await profileMainPhotoSet(photo, auth);
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
                ? 'button custom-grey is-link is-small is-rounded is-outlined'
                : 'button is-small is-link is-rounded is-outlined'
            }
          >
            {addPic ? (
              <i className='fas fa-times icon' />
            ) : (
              <>
                <i className='fas fa-plus icon' style={{ marginRight: 1 }} />
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
              <>
                <DropzoneInput setFiles={setFiles} />
              </>
            )}
            {files.length > 0 && (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {profile.photos === null && addPicMenu}
      {profile.photos &&
        profile.photos.split(',').length < 3 &&
        addPicMenu}
      <Galleries
        mainPhoto={profile.mainPhoto}
        photos={profile.photos}
        setMainPhoto={handleSetMainPhoto}
        deletePhoto={handleDeletePhoto}
        loading={loading}
      />
    </>
  );
};

export default connect(null, actions)(Photos);
