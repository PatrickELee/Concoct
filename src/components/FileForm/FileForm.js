import React, { Component } from "react";
import IngredientsList from '../IngredientsList/IngredientsList';
import RecipeList from '../RecipeList/RecipeList';
import "./FileForm.css";

class ImagePreview extends Component {
	render() {
		if (this.props.src === 'null') {
			return (
				<label for="avatar" class="uploadCaption">Upload a photo of your ingredients</label>
			);
		}
		else {
			return (
				<img src={this.props.src} />
			);
		}
	}
}

class Result extends Component {
	render() {
		if (this.props.display == 'true') {
			return (
				<>
					<hr />
					<IngredientsList />
					<hr />
					<RecipeList />
				</>
			)
		}
	}
}

export default class FileForm extends Component {

	constructor(props) {
		super(props);
		this.state = {file: 'null', submitted: 'false'};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({file: URL.createObjectURL(event.target.files[0])});
	}

	handleSubmit(event) {
		this.setState({submitted: 'true'});
		event.preventDefault();
	}

	render() {
		return (
		<>
			<div class="fileFormContainer">
				<form>
					<ImagePreview src={this.state.file} />
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
			<Result display={this.state.submitted} />
		</>
		);
	}
}