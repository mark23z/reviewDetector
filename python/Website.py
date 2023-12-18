from flask import Flask, render_template, request, Blueprint, jsonify
from flask_cors import CORS, cross_origin
import webbrowser
from threading import Timer
import Kommentarprufung # this will be your file name; minus the `.py`


app = Flask(__name__)
CORS(app)

""" @app.route('/')
def index():
     return render_template('file.html') """
    #return str(Kommentarprufung.predict_review_two_inputs("Supposed to come with extra hardware. The only problem is that it's not really a vacuum,",5.0)[0])

""" @app.route("/predict")
def predict():
     text = request.args.get('text')
     rating = request.args.get('rating')
     return jsonify({"result": Kommentarprufung.predict_review_two_inputs(text,rating)})
"""
@app.route('/predict', methods = ['POST'])
@cross_origin(origin='*')
def predict():
    text = request.get_data()
    text2 = text.decode()
      
    result = text2.split("^°")
    textInput = str(result[0])
    ratingInput = int(result[-1])

    #text = request.args.get('text')
    #rating = request.args.get('rating')

    #result = request.args.to_dcit()
    #text = result[0]
    #rating = result[1]
    #text1 = request.args.get('text')
    #rating1 = request.args.get('rating')

    #text = request.get_json(force=True)
    

    #rating = request.args.get('rating')
    #rating = rating.decode()
    rating = str(Kommentarprufung.predict_review_two_inputs(textInput, ratingInput))
    
    #return jsonify(result), 200

    #print(taken2)
    #strength = int(taken2)   
    #my_variable = taken2                   
    return jsonify(rating), 200

@app.route('/predictContext', methods = ['POST'])
@cross_origin(origin='*')
def predictContext():
    text = str(request.get_data())
    #text2 = text.decode()

    rating = str(Kommentarprufung.predict_review_one_input(text))
                  
    return jsonify(rating), 200

if __name__ == '__main__':
     """ Timer(1, open_browser).start() """
app.run(host='0.0.0.0', port='8000') 



