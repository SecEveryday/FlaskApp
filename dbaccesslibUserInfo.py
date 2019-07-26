import json
from bson.dbref import DBRef
from bson import json_util
import sys
import pymongo
import logging 
  
#Create and configure logger 
logging.basicConfig(filename="dbaccessUserInfo.log", 
                    format='%(asctime)s %(message)s', 
                    filemode='a')
                    #Creating an object 
logger=logging.getLogger() 
  
#Setting the threshold of logger to DEBUG 
logger.setLevel(logging.DEBUG) 
uri = "mongodb://56a41323-0ee0-4-231-b9ee:G9c804dv0gVufeDcqrJ0sTJklu0Nw3keGEZbITc5lqU8WZQUup4i9nr7OQf84s8XeLFs7quTKeyO7z6U9Y5g6A==@56a41323-0ee0-4-231-b9ee.documents.azure.com:10255/?ssl=true&replicaSet=globaldb"
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
        try:
            foundUser = dict(mydb.userInfo.find_one({'name':{'$regex':str(item)+"\s.*",'$options':'i'},"userDeleted":False},{'_id' : 0,'user_id':0}))
        except TypeError:
            continue
        if(len(foundUser) >= 1):
            return json.dumps(foundUser,default=json_util.default)
    return json.dumps({},default=json_util.default)
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
