#import sys
#old_stdout = sys.stdout
import dbaccesslib as dba
#log_file = open("message.log","a")

#sys.stdout = log_file
#sys.stderr = log_file
from flask import Flask, flash, request, redirect, url_for, render_template,jsonify
app = Flask(__name__)

@app.route("/")
def hello():
    return render_template("new_test.html")
#Production Level Testing code
@app.route("/clearDB")
def clearDB():
	return dba.clear_DB()
#
@app.route("/queryFromDatabase",methods=['POST'])
def queryFromDatabase():
	jsonData = request.json
	return dba.read_fromDBSpecfic(jsonData)
@app.route("/getConfig",methods=['GET'])
def getConfig():	
    return dba.read_fromDB()
@app.route("/addUser",methods=['POST'])
def addUser():
	#jsonData = request.get_json()#.decode('utf-8')
	jsonData = request.json
	print("HEY___________________")
	print(jsonData)
	return dba.add_usertoDB(jsonData)
@app.route("/deleteUser",methods=['POST'])
def deleteUser():
	jsonData = request.json
	return dba.delete_userfromDB(jsonData)
if __name__ == '__main__':
    app.run("0.0.0.0",debug = True)
