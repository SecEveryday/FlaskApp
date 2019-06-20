from flask import Flask, flash, request, redirect, url_for, render_template,jsonify
app = Flask(__name__)

@app.route("/")
def hello():
    return render_template("new_test.html")

@app.route("/you")
def youprint():
    return "Hello You!"
@app.route("/predict_out",methods=['POST','GET'])
def predict_out():
	id_user = request.form['id']
	name = request.form['name']
	import dbaccesslib as dba
	return_val = dba.write_ontoDB(id_user,name)
	return 200,
@app.route("/GetDBContents", methods=['POST','GET'])
def GetDBContents():
	import dbaccesslib as dba
	return_val = dba.read_fromDB()
	print return_val
	return jsonify(return_val)
