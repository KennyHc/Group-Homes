import React from "react";
import Card from "react-bootstrap";

function Form() {
  return (
    <div
      className="card border-secondary mb-3"
      style={{ maxWidth: "18rem", margin: "70px" }}
    >
      <div class="card-header">Add contact</div>
      <div class="card-body text-secondary">
        <h5 class="card-title">Contact Details</h5>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Name
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">
              E-mail
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>

        <button type="button" className="btn btn-dark">
          Submit
        </button>
      </div>
    </div>
  );
}

export default Form;
