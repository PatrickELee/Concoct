from werkzeug.utils import secure_filename
from flask_restful import Api, Resource, reqparse
from flask import Flask
import werkzeug
import os
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
     return {
       'resultStatus': 'SUCCESS'
     }

app = Flask(__name__)
api = Api(app)

api.add_resource(UploadAPI, '/upload')


if __name__ == "__main__":
  app.run(port=6843)