# Concocte

## Inspiration
We wanted to encourage people to cook more to explore their skills, save money on going out to eat, and avoid wasting food in their fridges.

## What it does
Users upload a photo of the ingredients they have on hand, and are given a list of up to four recipes that make use of what is found in their photo. They are provided with a full list of ingredients, and an external link containing more information about the dish.

## How we built it
We used React, HTML, and CSS for the frontend, and Python and Flask for the backend. We used Microsoft's Azure Custom Vision to recognize objects in the images using machine learning, and the Spoonacular API to find food recipes using the ingredients found in the images. We also trained the model in the Custom Vision by uploading images and tagging them with what they are, so the AI could learn how to recognize food.

## Challenges we ran into
We had a lot of trouble with the JSON format used for sending information to and from the APIs. Setting up the environments for backend development also caused a few bugs.

## Accomplishments that we're proud of
We have aa working version of the website, which can accurately recognize foods and provide a range of dishes to make.

## What we learned
This was the first hackathon for all of us so we learned a lot about developing under a short time frame, prioritizing tasks, and debugging for long sessions. We also became a lot more familiar with all the technologies we used.

## What's next for Concocte
We want to continue training the model with more images so it can recognize a wider range of foods, and also provide users a way to sort and filter the recipes for what they really want.
