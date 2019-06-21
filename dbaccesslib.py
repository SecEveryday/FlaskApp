import sys
old_stdout = sys.stdout

log_file = open("message.log","a")

sys.stdout = log_file
sys.stderr = log_file
import sqlite3
def write_ontoDB(id_user,name):
	conn = sqlite3.connect("newnewDB.db")
	sqlquery = "Insert into Test_id Values(" + str(id_user) +",'"+ str(name) + "');"
	print(sqlquery)
	conn.execute(sqlquery)
	conn.commit()
	conn.close()
def read_fromDB():
	conn = sqlite3.connect("newnewDB.db")
	sqlquery = "Select * from Test_id;"
	values = conn.execute(sqlquery)
	values = values.fetchall()
	conn.commit()
	conn.close()
	return values
