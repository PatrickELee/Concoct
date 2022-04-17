import React, { Component } from "react";
import "./RecipeList.css";
import Recipe from "../Recipe/Recipe"

export default class RecipeList extends Component {

    render() {
        return (
            <div class="recipeListContainer">
                <h2>Recipes Available</h2>
                <Recipe 
                    name={this.props.names[0]}
                    usedIngredientCount={this.props.usedIngredientCounts[0]}
                    usedIngredients={this.props.usedIngredientsList[0]}
                />
            </div>
        );
    }
}