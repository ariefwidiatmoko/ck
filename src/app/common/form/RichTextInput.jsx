import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class RichTextInput extends Component {
  render() {
    const {
      input,
      label,
      type,
      placeholder,
      meta: { touched, error }
    } = this.props;
    return (
      <div className="field">
        <label className="label">{label}</label>
        <div className="control">
          <ReactQuill
            {...input}
            onChange={(newValue, delta, source) => {
              if (source === "user") {
                input.onChange(newValue);
              }
            }}
            onBlur={(range, source, quill) => {
              input.onBlur(quill.getHTML());
            }}
            modules={this.modules}
            formats={this.formats}
            type={type}
            placeholder={placeholder}
          />
        </div>
        {touched && error && <p className="help is-danger">{error}</p>}
      </div>
    );
  }

  modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image", "video"],
      ["code-block"],
      ["clean"]
    ]
  };

  formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "code-block"
  ];
}

export default RichTextInput;
