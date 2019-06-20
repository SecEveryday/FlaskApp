from flask import Flask
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
	return 203,OK
@app.route("/GetDBContents", methods =['POST','GET'])
def GetDBContents():
	import dbaccesslib as dba
	return_val = dba.read_fromDB()
	return return_val

