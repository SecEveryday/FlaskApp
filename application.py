import os
import re
import sys
old_stdout = sys.stdout
import dbaccesslibUserInfo as dbaUI
import dbaccesslibUserMailInfo as dbaUMI
import logging 
import json
from bson import json_util
import datetime
import base64 
#Create and configure logger 
logging.basicConfig(filename="server.log", 
                    format='%(asctime)s %(message)s', 
                    filemode='a')
#Creating an object 
logger=logging.getLogger() 
  
#Setting the threshold of logger to DEBUG 
logger.setLevel(logging.DEBUG) 
lookup_list={"credit","card","debit","confidential","vaishnavi","bluedart","toshiba"}
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
@app.route("/getUserMailInfo",methods=['POST'])
def getUserMailInfo():
    jsonData = request.json
    logger.debug(jsonData)
    return dbaUMI.getspecificDate(jsonData)
@app.route("/generateReportforMFP",methods=['POST'])
def generateReport():
    return dbaUMI.read_fromDB()
@app.route("/updateUserMailInfo",methods=['POST'])
def updateUserMailInfo():
    jsondata = request.json
    return dbaUI.update_DB(jsonData)
@app.route("/do_ocr",methods=['POST'])
def do_ocr():
    logger.debug("Hey reached Start of OCR")
    file = request.files['filename']
    logger.debug(file)
    today = datetime.datetime.now()
    dateTimeNow = ""+str(today.month)+str(today.day)+str(today.hour)+str(today.minute)+str(today.second)+str(today.microsecond)+".jpg";
    file.save(os.path.join("./uploads", dateTimeNow))
    import ocr as to
    ocredText = to.execute(dateTimeNow)
    logger.debug("Before Splitting:")
    logger.debug(ocredText)
    ocredText = ocredText.split()
    logger.debug("After Splitting:")
    logger.debug(ocredText)
    response = dbaUI.read_fromDBSpecfic(ocredText)
    response = json.loads(response)
    if( not response):
        logger.warning("Response is empty")
        return json.dumps({"status" : "Failed","statusreason" : "user not found"},default=json_util.default),500
    logger.debug(type(response))
    tags = list()
    for item in ocredText:
        if(item.lower() in lookup_list):
            tags.append(item.lower())
    response = dbaUMI.generateqrcode(response,dateTimeNow,tags)
    return json.dumps(response,default=json_util.default)
@app.route("/do_ocr_mfp",methods=['POST'])
def do_ocr_mfp():
    logger.debug("Hey reached Start of OCR 2")
    file = request.get_data()
    #logger.debug(file)
    file = file.decode("utf-8").replace('\0', '')
    logger.debug(type(file))
    file = json.loads(file)
    file = file["filename"]
    today = datetime.datetime.now()
    dateTimeNow = ""+str(today.month)+str(today.day)+str(today.hour)+str(today.minute)+str(today.second)+str(today.microsecond)+".jpg";
    file.save(os.path.join("./uploads", dateTimeNow))
    import ocr as to
    ocredText = to.execute(dateTimeNow)
    logger.debug("Before Splitting:")
    logger.debug(ocredText)
    ocredText = ocredText.split()
    logger.debug("After Splitting:")
    logger.debug(ocredText)
    response = dbaUI.read_fromDBSpecfic(ocredText)
    response = json.loads(response)
    if( not response):
        logger.warning("Response is empty")
        return json.dumps({"status" : "Failed","statusreason" : "user not found"},default=json_util.default),500
    logger.debug(type(response))
    tags = list()
    for item in ocredText:
        if(item.lower() in lookup_list):
            tags.append(item.lower())
    response = dbaUMI.generateqrcode(response,dateTimeNow,tags)
    return json.dumps(response,default=json_util.default)
if __name__ == '__main__':
    app.run("0.0.0.0",debug = True)
