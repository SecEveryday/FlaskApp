import json
from bson.dbref import DBRef
import datetime
from bson import json_util
import sys
old_stdout = sys.stdout

log_file = open("message.log","a")

sys.stdout = log_file
sys.stderr = log_file
import pymongo
uri = "mongodb://6824f101-0ee0-4-231-b9ee:sTZfIFjKnQC0CNWcSLj7WSlBgs3gsN9m49bImfnxNLxMtGzu6ETyXHQ8X7NlrsFm5sPW1qYjjLEM2FxBjcJm0Q==@6824f101-0ee0-4-231-b9ee.documents.azure.com:10255/?ssl=true&replicaSet=globaldb"
client = pymongo.MongoClient()
print("Obtained the client")
mydb = client.test	
def addEntry(jsonData):
	a = mydb.userInfo.find_one({"name":jsonData["name"]})
	newDbref = DBRef("mydb.userInfo",a["_id"])
	scan_date = datetime.date.today()
	end_date = scan_date + datetime.timedelta(days=10)
	mydb.userMailInfo.insert({"code":jsonData["code"],"scan_date":scan_date,"end_date":end_date,"otherdbref":newDbref,"userDeleted":False})
	return json.dumps({    
        "status": "Success",
        "statusreason": "WriteToDBSuccess"
    })
def read_fromDB():
	new_list = list()
	for item in mydb.userMailInfo.find({},{"_id":0,"user_id":0}):
		otherdbref = item["otherdbref"]
		newjson = mydb.userInfo.find_one({"_id":otherdbref.id},{"_id":0,"user_id":0})
		newjson = newjson + item
		new_list.append(newjson)
	return json.dumps(newjson,default=json_util.default)
