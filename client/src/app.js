import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import Header from "./components/header";

class App extends Component {
	createInput = (type, input, touched, invalid) => {
		if (type === "file") {
			return <input type="file" accept="image/*" onChange={this.handleFileChange} id={input.name} className={`form-control ${touched && invalid && "is-invalid"}`} />;
		}

		return <input type="text" {...input} id={input.name} className={`form-control ${touched && invalid && "is-invalid"}`} />;
	};

	createField = ({ meta: { touched, invalid, error }, input, type, label }) => {
		return (
			<div className="form-group">
				<label htmlFor={input.name}>{label}</label>
				{this.createInput(type, input, touched, invalid)}
				<p className="invalid-feedback">{touched && error}</p>
			</div>
		);
	};

	handleSubmit(values) {
		console.log(values);
	}

	handleFileChange = event => {
		this.props.change("file", event.target.files[0]);
	};

	render() {
		return (
			<Router>
				<div className="container">
					<Header />
					<h1 className="h3 mt-3">Upload your image to AWS S3</h1>
					<hr />
					<form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
						<Field name="filename" label="Filename:" type="text" component={this.createField} />
						<Field name="file" label="File:" type="file" component={this.createField} />
						<button type="submit" className="btn btn-primary d-block mt-3">
							SUBMIT
						</button>
					</form>
				</div>
			</Router>
		);
	}
}

function validation(fields) {
	const errors = {};

	if (!fields["filename"]) {
		errors["filename"] = "Filename is required!";
	}

	if (!fields["file"]) {
		errors["file"] = "File is required!";
	}

	return errors;
}

export default reduxForm({
	form: "Upload Form",
	validate: validation
})(connect()(App));
