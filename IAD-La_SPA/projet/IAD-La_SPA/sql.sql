CREATE TABLE city(
   id_city INT AUTO_INCREMENT,
   name_city VARCHAR(255),
   PRIMARY KEY(id_city)
);

CREATE TABLE airports(
   id_airports INT AUTO_INCREMENT,
   name_airports VARCHAR(255),
   short_airports VARCHAR(3),
   id_city INT NOT NULL,
   PRIMARY KEY(id_airports),
   FOREIGN KEY(id_city) REFERENCES city(id_city)
);

CREATE TABLE flights(
   id_flights INT AUTO_INCREMENT,
   id_src INT,
   id_dest INT,
   price_flights SMALLINT,
   date_flights DATE,
   seats_flights SMALLINT,
   PRIMARY KEY(id_flights),
   FOREIGN KEY(id_src) REFERENCES airports(id_airports),
   FOREIGN KEY(id_dest) REFERENCES airports(id_airports)
);

CREATE TABLE tickets(
   id_ticket INT AUTO_INCREMENT,
   id_flights INT,
   id_users INT,
   PRIMARY KEY(id_ticket),
   FOREIGN KEY(id_flights) REFERENCES flights(id_flights),
   FOREIGN KEY(id_users) REFERENCES users(id_users)
);

CREATE TABLE users(
   id_users INT AUTO_INCREMENT,
   name_users VARCHAR(255),
   password_users VARCHAR(255),
   PRIMARY KEY(id_users)
);

INSERT INTO `city` (`id_city`, `name_city`) VALUES (NULL, 'New York'), (NULL, 'Paris'), (NULL, 'Detroit');
INSERT INTO `users` (`id_users`, `name_users`, `password_users`) VALUES (NULL, 'Jean', 'mdpjean'), (NULL, 'Bob', 'mdpbob');
INSERT INTO `airports` (`id_airports`, `name_airports`, `short_airports`, `id_city`) VALUES (NULL, 'John F. Kennedy International Airport', 'JFK', '1'), (NULL, 'Aéroport de Paris-Charles-de-Gaulle', 'CDG', '2'), (NULL, 'Detroit Metropolitan Wayne County Airport', 'DTW', '3');
INSERT INTO `flights` (`id_flights`, `id_src`, `id_dest`, `price_flights`, `date_flights`, `seats_flights`) VALUES (NULL, '1', '2', '350', '2020-12-23', '250'), (NULL, '2', '1', '400', '2020-12-16', '180'), (NULL, '3', '1', '550', '2021-01-04', '320'), (NULL, '2', '3', '600', '2021-01-18', '260'), (NULL, '3', '2', '420', '2020-12-29', '260'), (NULL, '1', '3', '480', '2020-12-30', '300');
