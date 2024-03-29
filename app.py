from werkzeug.utils import secure_filename
from flask_restful import Api, Resource, reqparse
from flask import Flask, jsonify, send_from_directory
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
    project_parameter = os.environ.get('PROJECT_PARAMETER')

    parse = reqparse.RequestParser()
    parse.add_argument('file', type=werkzeug.datastructures.FileStorage, location='files')
    args = parse.parse_args()

    image_file = args['file']

    prediction_credentials = ApiKeyCredentials(in_headers={"Prediction-key": prediction_key})
    predictor = CustomVisionPredictionClient(endpoint=endpoint,credentials=prediction_credentials)
    results = predictor.classify_image(project_id, project_parameter, image_file)

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
    return_dict.append(return_data['image_includes'])

    return jsonify(return_dict)

app = Flask(__name__, static_url_path='', static_folder='build')
api = Api(app)

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

api.add_resource(UploadAPI, '/file/upload')


if __name__ == "__main__":
  app.run()