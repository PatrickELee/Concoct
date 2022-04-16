import React, { Component } from "react";
import "./FileForm.css";

export default class FileForm extends Component {

  render() {
  	return (
      <div class="fileFormContainer">
        <label for="avatar" class="uploadCaption">Upload an photo of your ingredients</label>
					<label class="custom-file-upload">
						<input 
							type="file"
							id="photo" 
							name="photo"
							accept="image/png, image/jpeg"
						/>
						Choose File
					</label>
    	</div>
    );
  }
}