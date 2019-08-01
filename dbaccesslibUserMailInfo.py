import json
from bson.dbref import DBRef
import datetime
from bson import json_util
import logging 
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
uri = "mongodb://56a41323-0ee0-4-231-b9ee:G9c804dv0gVufeDcqrJ0sTJklu0Nw3keGEZbITc5lqU8WZQUup4i9nr7OQf84s8XeLFs7quTKeyO7z6U9Y5g6A==@56a41323-0ee0-4-231-b9ee.documents.azure.com:10255/?ssl=true&replicaSet=globaldb"
client = pymongo.MongoClient(uri)
print("Obtained the client")
mydb = client.test

def generateqrcode(jsonData,filenameJPG):
    logger.debug("Received data for generating color code = ")
    logger.debug(jsonData)
    ilocation=1
    today = datetime.datetime.now()
    date = str(today.year)+':'+str(today.month)+':'+str(today.day);
    time = str(today.hour) + ":" + str(today.minute) + ":" + str(today.second)+":"+str(today.microsecond);
    dateTimeNow = date+':'+time;
    logger.debug("Current Datetime - "+dateTimeNow)
    dateTimeNow = ""+str(today.month)+str(today.day)+str(today.hour)+str(today.minute)+str(today.second)+str(today.microsecond);
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
    import sendEmail as se
    se.execute(str(jsonData["email"]),filenameJPG,str(colorCode),img)
    newjsonData = {"name":jsonData["name"],"code":colorCode}
    addEntry(newjsonData)
    return colorCode;
def addEntry(jsonData):
    a = mydb.userInfo.find_one({"name":jsonData["name"]})
    newDbref = DBRef("mydb.userInfo",a["_id"])
    scan_date = datetime.datetime.today()
    end_date = scan_date + datetime.timedelta(days=10)
    scan_date = str(scan_date)
    end_date = str(end_date)
    mydb.userMailInfo.insert({"code":jsonData["code"],"scan_date":scan_date,"end_date":end_date,"otherdbref":newDbref,"userDeleted":False,"user_id":1})
    return json.dumps({"status": "Success","statusreason": "WriteToDBSuccess"})
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
def update_DB(jsonData):
    foundmail = mydb.userMailInfo.find_one({"code":jsonData["code"]},{"_id":1})
    mydb.userInfo.update_many({"_id":foundmail["_id"],"user_id":1},{"$set":{'end_date':str(jsonData['end_date'])}})
    return json.dumps({"status": "Success","statusreason": "updateSucess"})
#Clear DB only for testing
def clear_db():
    mydb.userMailInfo.remove({})
