import React, { Component } from "react";
import IngredientsList from '../IngredientsList/IngredientsList';
import RecipeList from '../RecipeList/RecipeList';
import Recipe from '../Recipe/Recipe';
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
		let results = this.props.results;
	/*	console.log('new attempt');
		console.log(results);
		console.log(results[0].usedIngredientCount);
		console.log(results[0].usedIngredients); */

		if (this.props.display == 'true') {
			return (
				<>
					<hr />
					<IngredientsList 
						usedIngredientCount={results[0].usedIngredientCount}
						usedIngredients={results[0].usedIngredients}
					/>
					<hr />
					<Recipe
						name={results[0].title}
						usedIngredientCount={results[0].usedIngredientCount}
						usedIngredients={results[0].usedIngredients}
						missedIngredientCount={results[0].missedIngredientCount}
						missedIngredients={results[0].missedIngredients}
						image={results[0].image}
					/>
				</>
			)
		}
	}
}

export default class FileForm extends Component {

	constructor(props) {
		super(props);
		this.state = {file: 'null', submitted: 'false', recipesFound: 'null', data: 'null', isLoaded : 'false'};
		this.picture = 'null'

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({file: URL.createObjectURL(event.target.files[0])});
		this.picture = event.target.files[0];
	}

	handleSubmit(event) {
		this.setState({submitted: 'true'});
		event.preventDefault();

		console.log(this.picture);

		const formData = new FormData();

		formData.append("file", this.picture);
		const requestOptions = {
			method: 'POST',
			body: formData
		};

		fetch('/upload', requestOptions)
			.then(response => {return response.json()})
			.then(responseData => {console.log(responseData); return responseData;})
			.then(mydata => {this.setState({data : mydata, isLoaded : 'true'});})
			.then(
				console.log(this.state.data)
			)

	}


	render() {
		let results = {};
		
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
			<Result
				display={this.state.submitted}
				results={this.state.data}
			/>
		</>
		);
	}
}