import json
from bson.dbref import DBRef
from bson import json_util
import sys
import pymongo
import logging 
  
#Create and configure logger 
logging.basicConfig(filename="server.log", 
                    format='%(asctime)s %(message)s', 
                    filemode='a')
                    #Creating an object 
logger=logging.getLogger() 
  
#Setting the threshold of logger to DEBUG 
logger.setLevel(logging.DEBUG) 
uri = "mongodb://8d2fac0a-0ee0-4-231-b9ee:qGCLnVCr2mRou2Sep0OoLJzsJoMIQqbCcfWl5QwKJJy54xPGHzOXEGrYBkpmHUmxG4RzWPJtY8UwsUtW7jPdWA==@8d2fac0a-0ee0-4-231-b9ee.documents.azure.com:10255/?ssl=true&replicaSet=globaldb"
client = pymongo.MongoClient(uri)
logger.debug("Obtained the client")
mydb = client.test  
def read_fromDB(jsonData):
    num = int(jsonData['page'])
    skips = 10 * (num - 1)
    return json.dumps(list(mydb.userInfo.find({"userDeleted":False},{'_id' : 0,'user_id':0}).skip(skips).limit(10)), default=json_util.default)
def read_fromDBSpecfic(jsonData):
    logger.debug("This is the JsonData")
    logger.debug(jsonData)
    for item in jsonData:
        logger.debug("Item name is:")
        logger.debug(item)
        for newitem in item:
            try:
                foundUser = dict(mydb.userInfo.find_one({'name':{'$regex':str(newitem)+"\s.*",'$options':'i'},"userDeleted":False},{'_id' : 0,'user_id':0}))
            except TypeError:
                continue
            if(len(foundUser) >= 1):
                return json.dumps(foundUser,default=json_util.default)
    return json.dumps({},default = json_util.default)
def add_usertoDB(jsonData):
    mydb.userInfo.insert({'name':jsonData['name'],'department':jsonData['department'],'building':jsonData['building'],'division':jsonData['division'],'email':jsonData['emailaddress'],'floor':jsonData['floor'],'cubicle':jsonData['cubicle'],"user_id":jsonData["user_id"],"userDeleted":False})
    logger.debug("Sucessfully added")
    return json.dumps({"status": "Success","statusreason": "addSuccess"})
def delete_userfromDB(jsonData):
    founduser = mydb.userInfo.find_one({"userDeleted":False,"name":jsonData["name"]},{"_id":1})
    mydb.userInfo.update_many({"_id":founduser["_id"],"user_id":1},{"$set":{"userDeleted":True}})
    return json.dumps({"status": "Success","statusreason": "deleteSuccess"})
def update_user(jsonData):
    founduser = mydb.userInfo.find_one({"userDeleted":False,"name":jsonData["name"]},{"_id":1})
    mydb.userInfo.update_many({"_id":founduser["_id"],"user_id":1},{"$set":{'department':jsonData['department'],'building':jsonData['building'],'division':jsonData['division'],'email':jsonData['emailaddress'],'floor':jsonData['floor'],'cubicle':jsonData['cubicle']}})
    return json.dumps({"status": "Success","statusreason": "updateSucess"})
    #Production Level Testing code
def clear_DB():
    mydb.userInfo.drop()
    mydb.userMailInfo.drop()
    return json.dumps({"status": "Success","statusreason": "deleteSuccess"})
#
