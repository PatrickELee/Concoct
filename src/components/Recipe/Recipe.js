import React, { Component } from "react";
import "./Recipe.css";
import Spaghetti from "../../spaghetti.jpeg";

let results = ["Tomatoes", "Spaghetti noodles", "Water"];

export default class Recipe extends Component {

    render() {
        let indices = [];
        for (let i = 0; i < results.length; i++)
            indices.push(i);

        return (
            <div class="recipeContainer">
                <h3>{this.props.name}</h3>
                <img src={Spaghetti} />
                <h4>Ingredients used</h4>
                <ul>
                    {indices.map(index => (<li>{results[index]}</li>))}
                </ul>
            </div>
        );
    }
}