import React, { Component } from "react";
import "./FileForm.css";

export default class FileForm extends Component {

	constructor(props) {
		super(props);
		this.state = {value: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
	}

	render() {
		return (
			<div class="fileFormContainer">
				<form>
					<label for="avatar" class="uploadCaption">Upload a photo of your ingredients</label>
					<label class="custom-file-upload">
					<input 
						type="file"
						id="photo"
						name="photo"
						accept="image/png, image/jpeg"
						onChange={this.handleChange}
					/>
						Choose File
					</label>
					<button class="submitButton" onClick={this.handleSubmit}>Find Recipes</button>
				</form>
			</div>
		);
	}
}