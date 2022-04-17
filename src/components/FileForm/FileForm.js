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
		let results = this.props.results;
		if (this.props.display == 'true') {
			return (
				<>
					<hr />
					<IngredientsList results={results}/>
					<hr />
					<RecipeList results={results}/>
				</>
			)
		}
	}
}

export default class FileForm extends Component {

	async fetchdata() {
   /* try {
      fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2`
      )
        .then((res) => res.json())
        .then((res) => {
          //return error if code: 402
          console.log(res.json());
          setRecipesFound(res.json());
        });
    } catch (e) {} */
	}

	constructor(props) {
		super(props);
		this.state = {file: 'null', submitted: 'false', recipesFound: 'null'};
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
			.then(response => response.json())
	}

	render() {
		let results = {
			"title": "Spaghetti",
			"unusedIngredients": [],
			"usedIngredientCount": 2,
			"usedIngredients": [
					{
							"aisle": "Produce",
							"amount": 6.0,
							"id": 9003,
							"image": "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg",
							"meta": [],
							"name": "apples",
							"original": "6 large baking apples",
							"originalName": "baking apples",
							"unit": "large",
							"unitLong": "larges",
							"unitShort": "large"
					},
					{
						"name": "flour",
					}
		]};
		
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
				results={results}
			/>
		</>
		);
	}
}