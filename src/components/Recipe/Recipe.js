import React, { Component } from "react";
import "./Recipe.css";
import Spaghetti from "../../spaghetti.jpeg";

let res = ["Tomatoes", "Spaghetti noodles", "Water"];

export default class Recipe extends Component {

    render() {
        let results = this.props.results;

        let indices = [];
        for (let i = 0; i < results.usedIngredientCount; i++) {
            indices.push(i);
        }

        return (
            
            <div class="recipeContainer">
                <h3>{this.props.name}</h3>
                <img src={Spaghetti} />
                <h4>Ingredients used</h4>
                {indices.map(index => (<p>{results.usedIngredients[index].name}</p>))}
            </div>
        );
    }
}