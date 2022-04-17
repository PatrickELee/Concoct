from werkzeug.utils import secure_filename
from flask_restful import Api, Resource, reqparse
from flask import Flask, jsonify
import werkzeug
import os
from azure.cognitiveservices.vision.customvision.prediction import CustomVisionPredictionClient
from dotenv import load_dotenv
from skimage import io, filters
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
    parse = reqparse.RequestParser()
    parse.add_argument('file', type=werkzeug.datastructures.FileStorage, location='files')
    args = parse.parse_args()
    image_file = args['file']
    image_file.save(os.path.join(app.root_path, 'uploads', secure_filename(image_file.filename)))
    prediction_key = os.environ.get('PREDICTION_KEY')
    endpoint = os.environ.get('ENDPOINT')    
    prediction_credentials = ApiKeyCredentials(in_headers={"Prediction-key": prediction_key})

    predictor = CustomVisionPredictionClient(endpoint=endpoint,credentials=prediction_credentials)
    print(f'{predictor}\n\n\n\n\n\n')

    project_id = "/subscriptions/4d5e5e05-5852-4193-849f-10cac78ecb0a/resourceGroups/HackDavis2022/providers/Microsoft.CognitiveServices/accounts/HackDavis2022-Prediction"#os.environ.get('PROJECT_ID')
    project_id = "02b67c75-8622-457e-ae36-4691e16ae869"
    with open(os.path.join (app.root_path, "uploads", image_file.filename), mode="rb") as test_data:
      results = predictor.classify_image(project_id, 'Food1', test_data)
    
    return_data = {'image_includes' : []}
    for prediction in results.predictions:
      print("\t" + prediction.tag_name + ": {0:.2f}%".format(prediction.probability * 100))
      if prediction.probability * 100 >= 30:
        return_data['image_includes'].append(prediction.tag_name)
    
    print(return_data['image_includes'])
    json_data = json.dumps(return_data)
    print(return_data)

    with open("sample.json", "w") as outfile:
      outfile.write(json_data)

    URL = "https://api.spoonacular.com/recipes/findByIngredients"
    headers = {
      'Content-Type' : 'application/json'
    }
    joined_string = ",".join(return_data['image_includes'])

    parameters = {
      'apiKey' : "cc0f711982ad401aa2d0f2f091bc9162",
      'ingredients' : joined_string,
      'number' : 4,
      'limitLicense' : False,
      'ranking' : 2,
      'ignorePantry' : True
    }
    r = requests.get(url=URL, headers=headers, params=parameters)


    with open("sample.json", "w") as outfile:
      outfile.write(r.text)

    return jsonify(r.json())

app = Flask(__name__)
api = Api(app)

api.add_resource(UploadAPI, '/upload')


if __name__ == "__main__":
  app.run(port=6843)