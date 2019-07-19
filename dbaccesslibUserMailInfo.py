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
uri = "mongodb://56a41323-0ee0-4-231-b9ee:G9c804dv0gVufeDcqrJ0sTJklu0Nw3keGEZbITc5lqU8WZQUup4i9nr7OQf84s8XeLFs7quTKeyO7z6U9Y5g6A==@56a41323-0ee0-4-231-b9ee.documents.azure.com:10255/?ssl=true&replicaSet=globaldb"
client = pymongo.MongoClient()
print("Obtained the client")
mydb = client.test	
def addEntry(jsonData):
	a = mydb.userInfo.find_one({"name":jsonData["name"]})
	newDbref = DBRef("mydb.userInfo",a["_id"])
	scan_date = datetime.datetime.today()
	end_date = scan_date + datetime.timedelta(days=10)
	mydb.userMailInfo.insert({"code":jsonData["code"],"scan_date":scan_date,"end_date":end_date,"otherdbref":newDbref,"userDeleted":False})
	return json.dumps({    
        "status": "Success",
        "statusreason": "WriteToDBSuccess"
    })
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
#Clear DB only for testing
def clear_db():
	mydb.userMailInfo.remove({})
