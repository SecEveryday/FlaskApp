
from bson.json_util import dumps
import sys
old_stdout = sys.stdout

log_file = open("message.log","a")

sys.stdout = log_file
sys.stderr = log_file
import pymongo
uri = "mongodb://6824f101-0ee0-4-231-b9ee:sTZfIFjKnQC0CNWcSLj7WSlBgs3gsN9m49bImfnxNLxMtGzu6ETyXHQ8X7NlrsFm5sPW1qYjjLEM2FxBjcJm0Q==@6824f101-0ee0-4-231-b9ee.documents.azure.com:10255/?ssl=true&replicaSet=globaldb"
client = pymongo.MongoClient(uri)
print("Obtained the client")
mydb = client.test	
def read_fromDB():
	return dumps(mydb.userInfo.find({},{'_id' : 0}))
def add_usertoDB(jsonData):
	mydb.userInfo.insert(jsonData)
	return {"status": "Success","statusreason": "addSuccess"}
def delete_userfromDB(jsonData):
	mydb.userInfo.remove({"name":jsonData["name"]})
	return {"status": "Success","statusreason": "deleteSuccess"}
def clear_DB():
	mydb.userInfo.drop()
	mydb.userMailInfo.drop()
	return {"status": "Success","statusreason": "deleteSuccess"}
