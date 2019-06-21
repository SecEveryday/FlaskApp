import sys
old_stdout = sys.stdout

log_file = open("message.log","a")

sys.stdout = log_file
sys.stderr = log_file
import sqlite3
def write_ontoDB(id_user,name):
	conn = sqlite3.connect("newnewDB1.db")
	sqlquery = "Insert into Test_id Values(" + str(id_user) +",'"+ str(name) + "');"
	print(sqlquery)
	try:
		conn.execute(sqlquery)
		conn.commit()
		conn.close()
	except:
		conn.close()
def read_fromDB():
	conn = sqlite3.connect("newnewDB1.db")
	sqlquery = "Select * from Test_id;"
	try:
		values = conn.execute(sqlquery)
		values = values.fetchall()
		conn.commit()
		conn.close()
	except:
		conn.close()
	return values
