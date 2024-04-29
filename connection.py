import mysql.connector

import logging

logging.basicConfig(filename='connection.log',level=logging.INFO)

logging.info("Creating connection")
connection=mysql.connector.connect(
    user='jishnu',
    password='jishnusuneesh',
    host='localhost',
    database='BI_ERP'
)

cursor=connection.cursor()
logging.info("Cursor created")