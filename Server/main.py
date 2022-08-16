from flask import Flask, render_template
from flask_cors import CORS
import json

app = Flask(__name__)

@app.route("/vocabulary", methods=["GET"])
def get_vocabulary():
    with open('vocabulary.json', 'r', encoding='utf8') as f:
        data = json.load(f)
    return data

@app.route("/", methods=["GET", "POST"])
def home():
    return render_template("index.html")

if __name__ == "__main__":
    CORS(app)
    app.run()
