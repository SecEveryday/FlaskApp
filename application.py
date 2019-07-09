#import sys
#old_stdout = sys.stdout
import dbaccesslibUserInfo as dbaUI
import dbaccesslibUserMailInfo as dbaUMI
#log_file = open("message.log","a")

#sys.stdout = log_file
#sys.stderr = log_file
from flask import Flask, flash, request, redirect, url_for, render_template,jsonify
app = Flask(__name__)

UPLOAD_FOLDER = './uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
@app.route("/")
def hello():
    return render_template("new_test.html")
#Production Level Testing code
@app.route("/clearDB")
def clearDB():
	return dbaUI.clear_DB()
#
@app.route("/queryFromDatabase",methods=['POST'])
def queryFromDatabase():
	jsonData = request.json
	return dbaUI.read_fromDBSpecfic(jsonData)
@app.route("/getConfig",methods=['GET'])
def getConfig():	
    return dbaUI.read_fromDB()
@app.route("/addUser",methods=['POST'])
def addUser():
	#jsonData = request.get_json()#.decode('utf-8')
	jsonData = request.json
	print("HEY___________________")
	print(jsonData)
	return dbaUI.add_usertoDB(jsonData)
@app.route("/deleteUser",methods=['POST'])
def deleteUser():
	jsonData = request.json
	return dbaUI.delete_userfromDB(jsonData)
@app.route("/addToUserMailInfo",methods=['POST'])
def addToUserMailInfo():
	jsonData = request.json
	return dbaUMI.addEntry(jsonData)
@app.route("/generateReport",methods=['GET'])
def generateReport():
    return dbaUMI.read_fromDB()
@app.route("/do_ocr",methods=['POST'])
def do_ocr():
	file = request.files['filename']
	file.save(os.path.join(app.config['UPLOAD_FOLDER'], "testocr.png"))
	import ocr as to
	return to.execute()
if __name__ == '__main__':
    app.run("0.0.0.0",debug = True)
