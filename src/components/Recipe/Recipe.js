import React, { Component } from "react";
import "./Recipe.css";
import Spaghetti from "../../spaghetti.jpeg";

export default class Recipe extends Component {

    render() {
        let results = this.props.results;

    /*    console.log(Object.keys(results.sampleJSON)[0].id);
        let first = results[Object.keys(results)[0]];
        let recipe = first[Object.keys(first)[0]];
        console.log(recipe.usedIngredientCount);
        console.log(recipe.usedIngredients[0].amount + " " + recipe.usedIngredients[0].name); */

        let indices = [];
        for (let i = 0; i < this.props.usedIngredientCount; i++) {
            indices.push(i);
        }

        return (
            
            <div class="recipeContainer">
                <h3>{this.props.name}</h3>
                <img src={Spaghetti} />
                <h4>Ingredients used</h4>
                {indices.map(index => (<p>{this.props.usedIngredients[index].name}</p>))}
            </div>
        );
    }
}