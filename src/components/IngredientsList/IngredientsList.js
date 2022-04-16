import React, { Component } from "react";
import "./IngredientsList.css";
import "@fontsource/inter";

export default class FileForm extends Component {

    render() {
        return (
            <div class="ingredientsContainer">
                <h2>Ingredients Recognized</h2>
                <div class="grid-container">
                    <p>food item</p>
                    <p>food item</p>
                    <p>food item</p>
                    <p>food item</p>
                </div>
            </div>
        );
    }
}