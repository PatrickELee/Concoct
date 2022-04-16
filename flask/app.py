import time
from flask import Flask

app = Flask(__name__)

@app.route('/')
def get_current_time():
    return {'time': time.time()}

if __name__ == "__main__":
  app.run(port=6843)