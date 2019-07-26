import json
from bson.dbref import DBRef
from bson import json_util
import sys
old_stdout = sys.stdout

log_file = open("message.log","a")

sys.stdout = log_file
sys.stderr = log_file
import pymongo
uri = "mongodb://56a41323-0ee0-4-231-b9ee:G9c804dv0gVufeDcqrJ0sTJklu0Nw3keGEZbITc5lqU8WZQUup4i9nr7OQf84s8XeLFs7quTKeyO7z6U9Y5g6A==@56a41323-0ee0-4-231-b9ee.documents.azure.com:10255/?ssl=true&replicaSet=globaldb"
client = pymongo.MongoClient(uri)
print("Obtained the client")
mydb = client.test	
def read_fromDB(jsonData):
	num = int(jsonData['page'])
	skips = 10 * (num - 1)
	return json.dumps(list(mydb.userInfo.find({"userDeleted":False},{'_id' : 0,'user_id':0}).skip(skips).limit(10)), default=json_util.default)
def read_fromDBSpecfic(jsonData):
	for item in jsonData:
		foundUser = mydb.userInfo.find({'name':{'$regex':".*"+item+"\s.*",'$options':'i'},"userDeleted":False},{'_id' : 0,'user_id':0})
		if(foundUser.count() >= 1):
			return json.dumps(list(foundUser),default=json_util.default)
	return json.dumps({},default=json_util.default)
def add_usertoDB(jsonData):
	mydb.userInfo.insert({'name':jsonData['name'],'department':jsonData['department'],'building':jsonData['building'],'division':jsonData['division'],'email':jsonData['emailaddress'],'floor':jsonData['floor'],'cubicle':jsonData['cubicle'],"user_id":jsonData["user_id"],"userDeleted":False})
	print("Sucessfully added")
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
