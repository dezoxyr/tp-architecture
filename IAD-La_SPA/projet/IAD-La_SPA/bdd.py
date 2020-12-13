import mysql.connector as mariadb
from mysql.connector import Error

host="localhost"
user="root"
passwd="pwroot"
dbname="progdistri"
port=3306

#FUNCTIONS
#--------------------------#
def create_tables():
    try:
        db_open = mariadb.connect(
            host=host,
            user=user,
            passwd=passwd,
            database=dbname,
            port=port
        )
        cursor = db_open.cursor();
        #--------------------------#
        # City
        try:
            cursor.execute("CREATE TABLE city(id_city INT AUTO_INCREMENT,name_city VARCHAR(255),PRIMARY KEY(id_city));")
            print("city table created")
        except mariadb.Error as err:
            cursor.execute("DROP TABLE city")
            cursor.execute("CREATE TABLE city(id_city INT AUTO_INCREMENT,name_city VARCHAR(255),PRIMARY KEY(id_city));")
            print("city table formated")
         #--------------------------#
        # Airports
        try:
            cursor.execute("CREATE TABLE airports(id_airports INT AUTO_INCREMENT,name_airports VARCHAR(255),short_airports VARCHAR(3),id_city INT NOT NULL,PRIMARY KEY(id_airports),FOREIGN KEY(id_city) REFERENCES City(id_city));")
            print("airports table created")
        except mariadb.Error as err:
            cursor.execute("DROP TABLE airports")
            cursor.execute("CREATE TABLE airports(id_airports INT AUTO_INCREMENT,name_airports VARCHAR(255),short_airports VARCHAR(3),id_city INT NOT NULL,PRIMARY KEY(id_airports),FOREIGN KEY(id_city) REFERENCES City(id_city));")
            print("airports table formated")
         #--------------------------#
        # Fligths
        try:
            cursor.execute("CREATE TABLE flights(id_flights INT AUTO_INCREMENT,id_src INT,id_dest INT,price_flights SMALLINT,date_flights DATE,seats_flights SMALLINT,PRIMARY KEY(id_flights),FOREIGN KEY(id_src) REFERENCES airports(id_airports),FOREIGN KEY(id_dest) REFERENCES airports(id_airports));")
            print("flights table created")
        except mariadb.Error as err:
            cursor.execute("DROP TABLE fligths")
            cursor.execute("CREATE TABLE flights(id_flights INT AUTO_INCREMENT,id_src INT,id_dest INT,price_flights SMALLINT,date_flights DATE,seats_flights SMALLINT,PRIMARY KEY(id_flights),FOREIGN KEY(id_src) REFERENCES airports(id_airports),FOREIGN KEY(id_dest) REFERENCES airports(id_airports));")
            print("flights table formated")
        #--------------------------#
        # Users
        try:
            cursor.execute("CREATE TABLE users(id_users INT AUTO_INCREMENT,name_users VARCHAR(255),password_users VARCHAR(255),PRIMARY KEY(id_users));")
            print("users table created")
        except mariadb.Error as err:
            cursor.execute("DROP TABLE users")
            cursor.execute("CREATE TABLE users(id_users INT AUTO_INCREMENT,name_users VARCHAR(255),password_users VARCHAR(255),PRIMARY KEY(id_users));")
            print("users table formated")
        #--------------------------#
        # Tickets
        try:
            cursor.execute("CREATE TABLE tickets(id_ticket INT AUTO_INCREMENT,id_flights INT,id_users INT,PRIMARY KEY(id_ticket),FOREIGN KEY(id_flights) REFERENCES flights(id_flights),FOREIGN KEY(id_users) REFERENCES users(id_users));")
            print("tickets table created")
        except mariadb.Error as err:
            cursor.execute("DROP TABLE tickets")
            cursor.execute("CREATE TABLE tickets(id_ticket INT AUTO_INCREMENT,id_flights INT,id_users INT,PRIMARY KEY(id_ticket),FOREIGN KEY(id_flights) REFERENCES flights(id_flights),FOREIGN KEY(id_users) REFERENCES users(id_users));")
            print("tickets table formated")

        db_open.commit()

    except mariadb.Error as err:
        print("creation of tables {} failed".format(err))

def fill_tables():
    try:
        db_open = mariadb.connect(
            host=host,
            user=user,
            passwd=passwd,
            database=dbname,
            port=port
        )
        cursor = db_open.cursor();
        #--------------------------#
        # City
        try:
            cursor.execute("INSERT INTO `city` (`id_city`, `name_city`) VALUES (NULL, 'New York'), (NULL, 'Paris'), (NULL, 'Detroit');")
            print("city table filled")
        except mariadb.Error as err:
            print(err)
        #--------------------------#
        # City
        try:
            cursor.execute("INSERT INTO `users` (`id_users`, `name_users`, `password_users`) VALUES (NULL, 'Jean', 'mdpjean'), (NULL, 'Bob', 'mdpbob');")
            print("users table filled")
        except mariadb.Error as err:
            print(err)
        #--------------------------#
        # City
        try:
            cursor.execute("INSERT INTO `airports` (`id_airports`, `name_airports`, `short_airports`, `id_city`) VALUES (NULL, 'John F. Kennedy International Airport', 'JFK', '1'), (NULL, 'Aéroport de Paris-Charles-de-Gaulle', 'CDG', '2'), (NULL, 'Detroit Metropolitan Wayne County Airport', 'DTW', '3');")
            print("airports table filled")
        except mariadb.Error as err:
            print(err)
        #--------------------------#
        # Flights
        try:
            cursor.execute("INSERT INTO `flights` (`id_flights`, `id_src`, `id_dest`, `price_flights`, `date_flights`, `seats_flights`) VALUES (NULL, '1', '2', '350', '2020-12-23', '8'), (NULL, '2', '1', '400', '2020-12-16', '180'), (NULL, '3', '1', '550', '2021-01-04', '320'), (NULL, '2', '3', '600', '2021-01-18', '260'), (NULL, '3', '2', '420', '2020-12-29', '260'), (NULL, '1', '3', '480', '2020-12-30', '300');")
            print("flights table filled")
        except mariadb.Error as err:
            print(err)

        db_open.commit()

    except mariadb.Error as err:
        print("filling of tables {} failed".format(err))

try:
    db = mariadb.connect(host=host, user=user, password=passwd, port=port)

    if db.is_connected():
        db_Info = db.get_server_info()
        print("Connected to MariaDB Server version ", db_Info)
        req = db.cursor()

        try:
            req.execute("CREATE DATABASE {} DEFAULT character set 'utf8'".format(dbname))

        except mariadb.Error as err:
            print(err)
            user_input = input("Do you want to delete the database ? y/n\n")
            while user_input != "y" and user_input != "n":
                print(err)
                user_input = input("Do you want to format the database ? y/n\n")

            if user_input == "y":
                req.execute("DROP DATABASE {}".format(dbname))
                print("Database", dbname, "has been deleted")
                req.execute("CREATE DATABASE {} DEFAULT character set 'utf8'".format(dbname))
                print("Database", dbname, "recreated\n")

            else:
                print("Database", dbname, "hasn't been deleted")
                print("Tables will be formated\n")

        create_tables()
        print("\n")
        fill_tables()
        print("\n")

        db.commit()

except Error as e:
    print("Error while connecting to MariaDB", e)

finally:
    if (db.is_connected()):
        req.close()
        db.close()
        print("Connection is closed")
