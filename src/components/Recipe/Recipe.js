import React, { Component } from "react";
import "./Recipe.css";

export default class Recipe extends Component {

    render() {
        return (
            <div class="recipeContainer">
                <h3>{this.props.name}</h3>
                <ul>
                    <li>Tomato sauce</li>
                    <li>Spaghetti noodles</li>
                    <li>FEFIJAOFIJOAIEJFAWWWWIEFOJFAOEIFJPAO</li>
                </ul>
            </div>
        );
    }
}