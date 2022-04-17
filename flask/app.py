from werkzeug.utils import secure_filename
from flask_restful import Api, Resource, reqparse
from flask import Flask, jsonify
import werkzeug
import os
from azure.cognitiveservices.vision.customvision.prediction import CustomVisionPredictionClient
from msrest.authentication import ApiKeyCredentials
import requests
import json

class UploadAPI(Resource):
  def get(self):
    return {
      'resultStatus': 'SUCCESS',
      'message': "Upload API GET request"
      }

  def post(self):
    prediction_key = os.environ.get('PREDICTION_KEY')
    endpoint = os.environ.get('ENDPOINT')    
    project_id = os.environ.get('PROJECT_ID')
    spoonacular_api_key = os.environ.get('SPOONACULAR_API_KEY')

    parse = reqparse.RequestParser()
    parse.add_argument('file', type=werkzeug.datastructures.FileStorage, location='files')
    args = parse.parse_args()

    image_file = args['file']
    image_file.save(os.path.join(app.root_path, 'uploads', secure_filename(image_file.filename)))

    prediction_credentials = ApiKeyCredentials(in_headers={"Prediction-key": prediction_key})
    predictor = CustomVisionPredictionClient(endpoint=endpoint,credentials=prediction_credentials)
    with open(os.path.join (app.root_path, "uploads", image_file.filename), mode="rb") as test_data:
      results = predictor.classify_image(project_id, 'Food1', test_data)

    return_data = {'image_includes' : []}
    for prediction in results.predictions:
      print("\t" + prediction.tag_name + ": {0:.2f}%".format(prediction.probability * 100))
      if prediction.probability * 100 >= 30:
        return_data['image_includes'].append(prediction.tag_name)

    URL = "https://api.spoonacular.com/recipes/findByIngredients"
    headers = {
      'Content-Type' : 'application/json'
    }
    joined_string = ",".join(return_data['image_includes'])

    parameters = {
      'apiKey' : spoonacular_api_key,
      'ingredients' : joined_string,
      'number' : 4,
      'limitLicense' : False,
      'ranking' : 2,
      'ignorePantry' : True
    }
    r = requests.get(url=URL, headers=headers, params=parameters)

    return_dict = json.loads(r.text)
    return_dict.append(return_data)

    return jsonify(return_dict)

app = Flask(__name__)
api = Api(app)

api.add_resource(UploadAPI, '/upload')


if __name__ == "__main__":
  app.run(port=6843)