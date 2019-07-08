import json
from bson.dbref import DBRef
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
def read_fromDB():
	return json.dumps(list(mydb.userInfo.find({},{'_id' : 0,'user_id':0})), default=json_util.default)
def read_fromDBSpecfic(jsonData):
	return json.dumps(list(mydb.userInfo.find({'name':{'$regex':".*"+jsonData["name"]+".*",'$options':'i'}},{'_id' : 0,'user_id':0})),default=json_util.default)
def add_usertoDB(jsonData):
	mydb.userInfo.insert({'name':jsonData['name'],'department':jsonData['department'],'building':jsonData['building'],'division':jsonData['division'],"user_id":jsonData["user_id"]})
	print("Sucessfully added")
	return json.dumps({"status": "Success","statusreason": "addSuccess"})
def delete_userfromDB(jsonData):
	a = mydb.userInfo.find_one({"name":jsonData["name"]})
	newDbref = DBRef("mydb.userInfo",a["_id"])
	mydb.userMailInfo.update({"otherdbref":newDbref},{"$set":{"userDeleted":True}})
	mydb.userInfo.remove({"name":jsonData["name"]})
	return json.dumps({"status": "Success","statusreason": "deleteSuccess"})
#Production Level Testing code
def clear_DB():
	mydb.userInfo.drop()
	mydb.userMailInfo.drop()
	return json.dumps({"status": "Success","statusreason": "deleteSuccess"})
#
