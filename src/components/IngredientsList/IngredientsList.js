import React, { Component } from "react";
import "./IngredientsList.css";
import "@fontsource/inter";

let results = ["Tomatoes", "Spaghetti noodles", "Water", ""];

export default class FileForm extends Component {

    render() {        
        let indices = [];
        for (let i = 0; i < this.props.usedIngredientCount; i++)
            indices.push(i);
        
        return (
            <div class="ingredientsContainer">
                <h2>Ingredients Recognized</h2>
                {indices.map(index => (<p>{this.props.usedIngredients[index].name}</p>))}
                <br />
            </div>
        );
    }
}