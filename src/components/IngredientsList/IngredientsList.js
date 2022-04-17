import React, { Component } from "react";
import "./IngredientsList.css";
import "@fontsource/inter";

let results = ["Tomatoes", "Spaghetti noodles", "Water", ""];

export default class FileForm extends Component {

    render() {
        let results = this.props.results;
        
        let indices = [];
        for (let i = 0; i < results.usedIngredientCount; i++)
            indices.push(i);
        
        return (
            <div class="ingredientsContainer">
                <h2>Ingredients Recognized</h2>
                {indices.map(index => (<p>{results.usedIngredients[index].name}</p>))}
                <br />
            </div>
        );
    }
}