import sqlite3
def write_ontoDB(id_user,name):
	conn = sqlite3.connect("newDB.db")
	sqlquery = "Insert into Test_id Values(" + str(id_user) +",'"+ str(name) + "');"
	print(sqlquery)
	conn.execute(sqlquery)
	conn.commit()
	conn.close()
def read_fromDB():
	conn = sqlite3.connect("newDB.db")
	sqlquery = "Select * from Test_id;"
	values = conn.execute(sqlquery)
	values = values.fetchall()
	conn.close()
	return values
