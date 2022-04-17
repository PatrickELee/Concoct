import React, { Component } from "react";
import "./RecipeList.css";
import Recipe from "../Recipe/Recipe"

export default class RecipeList extends Component {

    render() {
        let results = this.props.results;

        return (
            <div class="recipeListContainer">
                <h2>Recipes Available</h2>
                <Recipe results={results} />
            </div>
        );
    }
}