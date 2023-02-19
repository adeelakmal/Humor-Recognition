from flask import Flask, render_template, request
import pickle
import math
import numpy as np
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)

model = pickle.load(open("model.pkl", "rb"))
sc = pickle.load(open("scalar.pkl", "rb"))


@ app.route("/")
def index():
    return render_template("index.html")


@ app.route("/data", methods=["GET"])
def data():
    data = []
    if request.method == "GET":
        for num in request.args.values():
            data.append(math.ceil(float(num)))

        # Normalizing the input data
        X = np.array([data])
        X = sc.transform(X)

        Y_pred = model.predict(X)
        Y_pred = np.round_(Y_pred)
        if Y_pred.argmax() == 0:
            return render_template('index.html', type='Affiliative')
        if Y_pred.argmax() == 1:
            return render_template('index.html', type='Self-Enhancing')
        if Y_pred.argmax() == 2:
            return render_template('index.html', type='Aggressive')
        if Y_pred.argmax() == 3:
            return render_template('index.html', type='Self-Defeating')

# data?slider=3.95&slider1=4.1&slider2=4.1&slider3=4.5&slider4=4.35&slider5=4.15&slider6=4.75&slider7=4.6&slider8=4.35&slider9=4.3&slider10=4.05&slider11=1.95&slider12=2.65&slider13=2.45&slider14=3.75&slider15=4.2&slider16=4.2&slider17=3.7&slider18=3.2&slider19=3.3&slider20=4.85&slider21=3.05&slider22=2.4&slider23=4.6&slider24=4.4&slider25=2.15&slider26=4.2&slider27=4&slider28=4.75&slider29=3.75&slider30=3.15&slider31=3.5


if __name__ == "__main__":
    app.run(debug=True)
