import mysql.connector
import json
from flask import make_response
class user_model:
    
    def __init__(self) :
       try:
          self.con= mysql.connector.connect(host="localhost",user="root",password="root",database="test")
          self.con.autocommit=True
          self.cur= self.con.cursor(dictionary=True)
          print("DB connected") 
       except:
           print("Some error") 


    def user_getall_model(self):
        self.cur.execute("SELECT * FROM user")
        result=self.cur.fetchall()
        print(result)
        #query execution 
        if(len(result)>0):
        #   return json.dumps(result)
           res = make_response({"payload": result}, 200)

          # Set CORS headers to allow requests from any origin
           res.headers['Access-Control-Allow-Origin'] = "*"
           return res
        else:
           return  make_response({"message":"No data found"},204)
        

    def user_addone_model(self,data):
        self.cur.execute(f"insert into user(name ,email,phone,role,password) values('{data['name']}','{data['email']}','{data['phone']}','{data['role']}','{data['password']}')")
        print(data)
        return make_response({"message":"user created successfully"},201)
    
    def user_update_model(self,data):
        self.cur.execute(f"UPDATE user SET name='{data['name']}',email='{data['email']}',phone='{data['phone']}',role='{data['role']}',password='{data['password']}'WHERE id={data['id']}")
        if(self.cur.rowcount>0):
           return make_response({"message":"user updated successfully"},201)
        else:
           return make_response({"message":"Nothing to update"},202)
      
    def user_delete_model(self,id):
        self.cur.execute(f"DELETE from user where id={id}")
        if(self.cur.rowcount>0):
           return make_response({"message":"user deleted successfully"},200)
        else:
           return make_response({"message":"Nothing to deleted"},204)
      