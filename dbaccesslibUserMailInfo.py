from io import BytesIO
from io import StringIO
import json
from bson.dbref import DBRef
import datetime
from bson import json_util
import logging 
import base64
jsonCode ={
        "building":{
            "Essae Vaishnavi Solitaire": {
                "id": "B1", 
                "division": {
                    "SS": {
                        "id": "D1",
                        "dept":{
                            "Semicon":{
                            "id":"DEP1",
                            "floor":{"0":"0",
                                "1":"1",
                                "2":"2",
                                "3":"3",
                                "4":"4",
                                "5":"5",
                                "6":"6" 
                                }
                            },
                            "RND":{
                            "id":"DEP2",
                            "floor":{"0":"0",
                                "1":"1",
                                "2":"2",
                                "3":"3",
                                "4":"4",
                                "5":"5",
                                "6":"6"                     
                                }
                            },
                            "Mobile":{
                            "id":"DEP3",
                            "floor":{"0":"0",                       
                                "1":"1",
                                "2":"2",
                                "3":"3",
                                "4":"4",
                                "5":"5",
                                "6":"6" 
                                }
                            }                   
                        }
                    },
                    "TTEC": {
                        "id": "D2",
                        "dept":{
                            "TTEC-AL":{
                            "id":"DEP1",
                            "floor":{"0":"0",
                                "1":"1",
                                "2":"2",
                                "3":"3",
                                "4":"4",
                                "5":"5",
                                "6":"6"                     
                                }
                            },
                            "TTEC-SL":{
                            "id":"DEP2",
                            "floor":{"0":"0",
                                "1":"1",
                                "2":"2",
                                "3":"3",
                                "4":"4",
                                "5":"5",
                                "6":"6"                                 
                                }
                            },
                            "TTEC-DL":{
                            "id":"DEP3",
                            "floor":{"0":"0",                       
                                "1":"1",
                                "2":"2",
                                "3":"3",
                                "4":"4",
                                "5":"5",
                                "6":"6" 
                                }
                            },                  
                            "TTEC-CI":{
                            "id":"DEP4",
                            "floor":{"0":"0",                       
                                "1":"1",
                                "2":"2",
                                "3":"3",
                                "4":"4",
                                "5":"5",
                                "6":"6" 
                                }
                            }
                        }
                    }
                }               
            },
            "Fortune Summit": {
                "id": "B2", 
                "division": {
                    "TMSC": {
                        "id": "D1",
                        "dept":{
                            "Medical":{
                            "id":"DEP1",
                            "floor":{"0":"0",
                                "1":"1",
                                "2":"2",
                                "3":"3",
                                "4":"4",
                                "5":"5",
                                "6":"6" 
                                }
                            },
                            "RND":{
                            "id":"DEP2",
                            "floor":{"0":"0",
                                "1":"1",
                                "2":"2",
                                "3":"3",
                                "4":"4",
                                "5":"5",
                                "6":"6"                     
                                }
                            },
                            "Imaging":{
                            "id":"DEP3",
                            "floor":{"0":"0",                       
                                "1":"1",
                                "2":"2",
                                "3":"3",
                                "4":"4",
                                "5":"5",
                                "6":"6" 
                                }
                            }                   
                        }
                    },
                    "tmc": {
                        "id": "D2",
                        "dept":{
                            "tmc-1":{
                            "id":"DEP1",
                            "floor":{"0":"0",
                                "1":"1",
                                "2":"2",
                                "3":"3",
                                "4":"4",
                                "5":"5",
                                "6":"6"                         
                                }
                            },
                            "tmc-2":{
                            "id":"DEP2",
                            "floor":{"0":"0",
                                "1":"1",
                                "2":"2",
                                "3":"3",
                                "4":"4",
                                "5":"5",
                                "6":"6"                         
                                }
                            },
                            "tmc-3":{
                            "id":"DEP3",
                            "floor":{"0":"0",                       
                                "1":"1",
                                "2":"2",
                                "3":"3",
                                "4":"4",
                                "5":"5",
                                "6":"6" 
                                }
                            }
                        }
                    }
                }               
            }
        }
    }
#Create and configure logger 
logging.basicConfig(filename="server.log", 
                    format='%(asctime)s %(message)s', 
                    filemode='a')
                    #Creating an object 
logger=logging.getLogger() 
  
#Setting the threshold of logger to DEBUG 
logger.setLevel(logging.DEBUG) 
import pymongo
uri = "mongodb://8d2fac0a-0ee0-4-231-b9ee:qGCLnVCr2mRou2Sep0OoLJzsJoMIQqbCcfWl5QwKJJy54xPGHzOXEGrYBkpmHUmxG4RzWPJtY8UwsUtW7jPdWA==@8d2fac0a-0ee0-4-231-b9ee.documents.azure.com:10255/?ssl=true&replicaSet=globaldb"
client = pymongo.MongoClient(uri)
print("Obtained the client")
mydb = client.test
def checkIfAutoThrashed(jsonData,tags):
    if(len(tags) < 3):
        return False
    a = mydb.userInfo.find_one({"name":jsonData["name"]})
    newDbref = DBRef("mydb.userInfo",a["_id"])
    foundMails = mydb.mltable.find({"otherdbref":newDbref,"status":"Thrash"})
    foundMailsList = list(mydb.mltable.find({"otherdbref":newDbref,"status":"Thrash"}))
    if(len(foundMailsList) < 10):
        return False
    tagcount = 0
    thrashcount = 0
    for item in foundMails:
        for tag in tags:
            if(tag in item["tags"]):
                tagcount+=1
        if(tagcount >= 3):
            thrashcount+=1
    if(thrashcount >=10):
        return True
    return False
def generateqrcode(jsonData,filenameJPG,tags,fromMFP):
    logger.debug("Received data for generating color code = ")
    logger.debug(jsonData)
    ilocation=1
    today = datetime.datetime.now()
    date = str(today.year)+':'+str(today.month)+':'+str(today.day);
    time = str(today.hour) + ":" + str(today.minute) + ":" + str(today.second)+":"+str(today.microsecond);
    dateTimeNow = date+':'+time;
    logger.debug("Current Datetime - "+dateTimeNow)
    dateTimeNow = ""+str(today.month)+str(today.day)+str(today.hour)+str(today.minute)+str(today.second)+str(today.microsecond)[:3];
    logger.debug("Unique Code - "+dateTimeNow)
    if(int(jsonData["cubicle"])>25 and int(jsonData["cubicle"])<=50):
        ilocation=2
    elif(int(jsonData["cubicle"])>50 and int(jsonData["cubicle"])<=75):
        ilocation=3
    else:
        ilocation=4
    logger.debug(jsonData["building"])
    colorCode=jsonCode["building"][jsonData["building"]]["id"]+':'+jsonCode["building"][jsonData["building"]]["division"][jsonData["division"]]["id"]+':'+jsonCode["building"][jsonData["building"]]["division"][jsonData["division"]]["dept"][jsonData["department"]]["id"]+':'+jsonCode["building"][jsonData["building"]]["division"][jsonData["division"]]["dept"][jsonData["department"]]["floor"][jsonData["floor"]]+'F:'+str(ilocation)+'L:'+dateTimeNow
    logger.debug("ColorCode - "+colorCode)
    logger.debug("generateColorCode:: ColorCode value ="+colorCode)
    import qrcode
    img = qrcode.make(colorCode)
    logger.debug(type(img))
    autoThrashed = checkIfAutoThrashed(jsonData,tags)
    logger.debug("Auto thrashed value is %d" % autoThrashed)
    logger.debug("Tags are %s" % tags)
    import sendEmail as se
    se.execute(str(jsonData["email"]),filenameJPG,str(colorCode),img,autoThrashed,fromMFP)
    img = qrcode.make(colorCode)
    logger.debug(type(img))
    buf = BytesIO()
    img.save(buf)
    image_stream = buf.getvalue()
    logger.debug(type(image_stream))
    #newImage = base64.b64encode(image_stream)
    #newImage = image_stream
    #logger.debug(newImage)
    #logger.debug(type(newImage))
    newjsonData = {"name":jsonData["name"],"code":colorCode,"email":jsonData["email"],"division":jsonData["division"],"department":jsonData["department"],"floor":jsonData["floor"],"cubicle":jsonData["cubicle"],"building":jsonData["building"],"img":image_stream}
    return addEntry(newjsonData,tags,autoThrashed);
def addEntry(jsonData,tags,autoThrashed):
    a = mydb.userInfo.find_one({"name":jsonData["name"]})
    newDbref = DBRef("mydb.userInfo",a["_id"])
    scan_date = datetime.datetime.today()
    end_date = scan_date + datetime.timedelta(days=10)
    scan_date = str(scan_date.day) +"-"+ str(scan_date.month)+"-" + str(scan_date.year)
    end_date = str(end_date.day) +"-" +str(end_date.month)+"-" + str(end_date.year)
    if( not autoThrashed and len(tags) >= 3):
        #mydb.mltable.insert({"code":jsonData["code"],"tags": tags,"status":"Keep","user_id":1,"otherdbref":newDbref})  Actual Code
        mydb.mltable.insert({"code":jsonData["code"],"tags": tags,"status":"Keep","user_id":1,"otherdbref":newDbref})#Test code to be removed
        #end_date = scan_date
    mydb.userMailInfo.insert({"code":jsonData["code"],"scan_date":scan_date,"end_date":end_date,"otherdbref":newDbref,"userDeleted":False,"user_id":1})
    return json.dumps(jsonData)
def read_fromDB():
    new_list = list()
    for item in mydb.userMailInfo.find({},{"_id":0,"user_id":0}):
        print(item)
        otherdbref = item["otherdbref"]
        newjson = mydb.userInfo.find_one({"_id":otherdbref.id},{"_id":0,"user_id":0})
        dall = {}
        item.pop("otherdbref")
        dall.update(item)
        dall.update(newjson)
        print(dall)
        new_list.append(dall)
    return json.dumps(new_list,default=json_util.default)
def getspecificDate(jsonData):
    logger.debug(jsonData)
    num = int(jsonData['page'])
    skips = 10 * (num - 1)
    if(jsonData["action"] == "all"):
        return json.dumps(list(mydb.userMailInfo.find({"userDeleted":False},{'_id' : 0,'user_id':0}).skip(skips).limit(10)), default=json_util.default)
    else:
        thrash_date = datetime.datetime.today()
        thrash_date = str(thrash_date.day) + "-" +str(thrash_date.month)+"-" + str(thrash_date.year) 
        return json.dumps(list(mydb.userMailInfo.find({"userDeleted":False,"end_date":thrash_date},{'_id' : 0,'user_id':0}).skip(skips).limit(10)), default=json_util.default)
def update_DB(jsonData):
    foundmail = mydb.userMailInfo.find_one({"code":jsonData["code"]},{"_id":1})
    foundMl = mydb.mltable.find_one({"code":jsonData["code"]},{"_id":1})
    mydb.userInfo.update_many({"_id":foundmail["_id"],"user_id":1},{"$set":{'end_date':str(jsonData['end_date'])}})
    mydb.mltable.update_many({"_id":foundMl["_id"],"user_id":1},{"$set":{"status":"Thrash"}})
    return json.dumps({"status": "Success","statusreason": "updateSucess"})
#Clear DB only for testing
def clear_db():
    mydb.userMailInfo.remove({})
