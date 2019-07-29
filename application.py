import os
import sys
old_stdout = sys.stdout
import dbaccesslibUserInfo as dbaUI
import dbaccesslibUserMailInfo as dbaUMI
import logging 
import json
from bson import json_util 
#Create and configure logger 
logging.basicConfig(filename="server.log", 
                    format='%(asctime)s %(message)s', 
                    filemode='a')
#Creating an object 
logger=logging.getLogger() 
  
#Setting the threshold of logger to DEBUG 
logger.setLevel(logging.DEBUG) 
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
@app.route("/getConfig",methods=['POST'])
def getConfig():
    jsonData = request.json
    return dbaUI.read_fromDB(jsonData)
@app.route("/addUser",methods=['POST'])
def addUser():
    #jsonData = request.get_json()#.decode('utf-8')
    jsonData = request.json
    logger.debug("HEY___________________")
    logger.debug(jsonData)
    return dbaUI.add_usertoDB(jsonData)
@app.route("/updateUser",methods=['POST'])
def updateUser():
    jsonData = request.json
    return dbaUI.update_user(jsonData)
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
    logger.debug("Hey reached Start of OCR")
    file = request.files['filename']
    logger.debug(file)
    #file.save(os.path.join("./uploads", "testocr.jpg"))
    #import ocr as to
    ocredText = to.execute(file)
    logger.debug("Before Splitting:")
    logger.debug(ocredText)
    ocredText = ocredText.split()
    logger.debug("After Splitting:")
    logger.debug(ocredText)
    response = dbaUI.read_fromDBSpecfic(ocredText)
    if( not response):
        logger.warning("Response is empty")
        return json.dumps({"status" : "Failed","statusreason" : "user not found"},default=json_util.default),500
    logger.debug(type(response))
    dbaUMI.generateqrcode(response,file)
    return json.dumps(response,default=json_util.default)
if __name__ == '__main__':
    app.run("0.0.0.0",debug = True)
