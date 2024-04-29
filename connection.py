import mysql.connector

import logging


import os

filepath='connection.log'

if os.path.exists(filepath):
    os.remove(filepath)
    
logger_conn=logging.getLogger('connection')
logger_conn.setLevel(logging.INFO)

con_handler=logging.FileHandler('connection.log')
con_handler.setLevel(logging.INFO)
logger_conn.addHandler(con_handler)

logger_conn.info("Creating connection")
connection=mysql.connector.connect(
    user='root',
    password='Js23242526@$',
    host='localhost',
    database='BI_ERP'
)

cursor=connection.cursor()
logger_conn.info("Cursor created")