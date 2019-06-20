from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return render_template("new_test.html")

@app.route("/you")
def youprint():
    return "Hello You!"
