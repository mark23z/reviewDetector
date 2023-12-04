from flask import Flask, render_template, request
from flask import jsonify
import webbrowser
from threading import Timer
import Kommentarprufung # this will be your file name; minus the `.py`

app = Flask(__name__)

@app.route('/')
def index():
     return render_template('file.html')
    #return str(Kommentarprufung.predict_review_two_inputs("Supposed to come with extra hardware. The only problem is that it's not really a vacuum,",5.0)[0])

@app.route("/predict")
def predict():
     text = request.args.get('text')
     rating = request.args.get('rating')
     return jsonify({"result": Kommentarprufung.predict_review_two_inputs(text,rating)})

""" def open_browser():
      webbrowser.open_new("http://127.0.0.1:8000") """

if __name__ == '__main__':
    """ Timer(1, open_browser).start() """
    app.run(host='0.0.0.0', port='8000')





