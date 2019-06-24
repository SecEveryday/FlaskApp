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

def write_ontoDB(id_user,name):
	mydb.my_collection.insert({'user_id':id_user , 'name':name})	
def read_fromDB():
	return mydb.my_collection.find().pretty()
