import React, { Component } from "react";
import "./FileForm.css";

export default class FileForm extends Component {

	constructor(props) {
		super(props);
		this.state = {file: 'null'};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({file: URL.createObjectURL(event.target.files[0])});
	}

	handleSubmit(event) {
		event.preventDefault();
	}

	render() {
		return (
			<div class="fileFormContainer">
				<img src={this.state.file}/>
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