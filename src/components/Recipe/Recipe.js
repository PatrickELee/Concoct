import React, { Component } from "react";
import "./Recipe.css";
import Spaghetti from "../../spaghetti.jpeg";

export default class Recipe extends Component {

    render() {
    /*    console.log(Object.keys(results.sampleJSON)[0].id);
        let first = results[Object.keys(results)[0]];
        let recipe = first[Object.keys(first)[0]];
        console.log(recipe.usedIngredientCount);
        console.log(recipe.usedIngredients[0].amount + " " + recipe.usedIngredients[0].name); */

        // https://bobbyhadz.com/blog/javascript-replace-space-with-dash#:~:text=using%20replace()%20%23-,To%20replace%20the%20spaces%20with%20dashes%20in%20a%20string%2C%20call,is%20replaced%20by%20a%20dash.
        let link = "https://spoonacular.com/recipes/" + 
                    this.props.name.replace(/\s+/g, '-') + '-' + this.props.id;

        let indices = [];
        for (let i = 0; i < this.props.usedIngredientCount; i++) {
            indices.push(i);
        }

        let indices2 = [];
        for (let i = 0; i < this.props.missedIngredientCount; i++) {
            indices2.push(i);
        }

        return (
            
            <div class="recipeContainer">
                <h3>{this.props.name}</h3>
                <div class="recipeGrid">
                    <div>
                        <img src={this.props.image} />
                    </div>
                    <div>
                        <a href={link}>Link</a>
                        <h4>Ingredients used</h4>
                        {indices.map(index => (<p>{this.props.usedIngredients[index].name}</p>))}
                        <h4>Ingredients needed</h4>
                        {indices2.map(index => (<p>{this.props.missedIngredients[index].name}</p>))}
                    </div>
                </div>
                <br />
            </div>
        );
    }
}