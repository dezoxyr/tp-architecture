import sqlite3 , pandas
from sqlite3 import Error

def create_connection(db_file):
    """ create database connection to a SQLite database """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        print(sqlite3.version)
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()
if __name__ == '__main__':
    create_connection(r"./airplane.db")
