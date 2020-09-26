import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
// import { composeValidators, combineValidators, isRequired } from "revalidate";
import TextInput from "../../../common/form/TextInput";
import SelectInput from "../../../common/form/SelectInput";
import DateInput from "../../../common/form/DateInput";
import { gender } from "../../../common/helpers/optionHelpers";

// const validate = combineValidators({
//   name: composeValidators(
//     isRequired({ message: "Panggilan harus diisi" })
//   )(),
// });

class ProfileBasic extends Component {
  render() {
    const {
      handleSubmit,
      updateProfile,
      //  loading,
      //  pristine,
    } = this.props;
    return (
      <form autoComplete="off" onSubmit={handleSubmit(updateProfile)}>
        <div className="field is-horizontal">
          <div className="field-body">
            <Field
              label="No Anggota"
              name="code"
              type="text"
              component={TextInput}
              placeholder="No Anggota"
              disabled
              fullwidth={true}
            />
            <Field
              label="Tanggal Gabung"
              name="joinDate"
              type="date"
              component={DateInput}
              placeholder="Pilih Tanggal"
              disabled
              showMonthDropdown
              showYearDropdown
              defaultSelected={null}
              fullwidth={true}
            />
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <Field
              label="Panggilan"
              name="name"
              type="text"
              disabled
              component={TextInput}
              placeholder="Panggilan"
              className="is-expanded"
            />
            <Field
              label="Nama Lengkap"
              name="fullname"
              type="text"
              disabled
              component={TextInput}
              placeholder="Nama Lengkap"
              className="is-expanded"
            />
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <Field
              label="Tempat Lahir"
              name="pob"
              type="text"
              disabled
              component={TextInput}
              placeholder="Tempat Lahir"
              fullwidth={true}
            />
            <Field
              label="Tanggal Lahir"
              name="dob"
              type="date"
              disabled
              component={DateInput}
              placeholder="Pilih Tanggal"
              showMonthDropdown
              showYearDropdown
              defaultSelected={null}
              fullwidth={true}
            />
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <Field
              label="Jenis Kelamin"
              name="gender"
              type="text"
              disabled
              component={SelectInput}
              options={gender}
              fullwidth={true}
            />
            <Field
              label="Nomer Telepon"
              name="phone"
              type="tel"
              disabled
              component={TextInput}
              placeholder="Nomer Telepon"
            />
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <Field
              label="Email"
              name="email"
              type="text"
              disabled
              component={TextInput}
              placeholder="Email"
            />
            <Field
              label="Alamat"
              name="address"
              type="text"
              disabled
              component={TextInput}
              placeholder="Alamat"
            />
          </div>
        </div>
        <br />
        {/* <div
          className="field is-grouped"
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          <div className="control">
            <button
              type="submit"
              disabled={loading || pristine}
              className={
                loading
                  ? "button is-primary is-small is-rounded is-outlined is-loading"
                  : "button is-primary is-small is-rounded is-outlined"
              }
            >
              Simpan
            </button>
          </div>
        </div> */}
      </form>
    );
  }
}

export default reduxForm({
  form: "profileBasic",
  onSubmitSuccess: (result, dispatch, props) => {
    dispatch(props.reset("profileBasic"));
    props.updateInitialValues();
  },
  // validate,
  enableReinitialize: true,
})(ProfileBasic);
