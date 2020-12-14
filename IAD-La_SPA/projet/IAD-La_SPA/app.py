import json
import mariadb
from flask import Flask, session, render_template, url_for, request, redirect
from datetime import datetime

app = Flask(__name__)

app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

db = mariadb.connect(
    host="localhost",
    user="root",
    passwd="pwroot",
    database='progdistri',
    port=3306
)
cursor = db.cursor();

@app.route('/', methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        tmp_name_users = request.form['name_users']
        tmp_password_users = request.form['password_users']
        cursor.execute("SELECT id_users, name_users FROM users WHERE name_users = %s AND password_users = %s;", (tmp_name_users, tmp_password_users,))

        result = cursor.fetchone()
        if result != None:
            session['id_users'] = result[0]
            session['name_users'] = result[1]
            return redirect(url_for('list'))
        else:
            return render_template('index.html', ids=False)
    else:
        return render_template('index.html')

@app.route('/logout')
def logout():
    session.pop('id_users', None)
    session.pop('name_users', None)
    return redirect('/')

@app.route('/list', methods=['POST', 'GET'])
def list():
    if request.method == 'POST':
        tmp_id_flights = request.form['id_flights']
        cursor.execute ("INSERT INTO tickets (id_ticket, id_flights, id_users) VALUES (NULL, ?, ?);" ,(tmp_id_flights,session['id_users'],))
        cursor.execute ("SELECT * FROM tickets WHERE id_flights = ? and id_users = ? ;",(tmp_id_flights,session['id_users'],))
        result = cursor.fetchone()
        cursor.execute ("SELECT seats_flights FROM flights WHERE id_flights = ? ",(tmp_id_flights,))
        resultat = cursor.fetchone()
        places = resultat[0] - 1
        cursor.execute("UPDATE flights set seats_flights = %s where id_flights=%s",(places,tmp_id_flights,))
        if result != None:
            cursor.execute("SELECT f.id_flights, f.id_src, f.id_dest, f.price_flights, f.date_flights, f.seats_flights, dep.short_airports, arr.short_airports FROM flights as f join airports as dep on dep.id_airports=f.id_src join airports as arr on arr.id_airports=f.id_dest WHERE f.seats_flights > 0;")
            result = cursor.fetchall()

            return render_template('list.html', booked=True, result=result)
        else :
            cursor.execute("SELECT f.id_flights, f.id_src, f.id_dest, f.price_flights, f.date_flights, f.seats_flights, dep.short_airports, arr.short_airports FROM flights as f join airports as dep on dep.id_airports=f.id_src join airports as arr on arr.id_airports=f.id_dest WHERE f.seats_flights > 0;")
            result = cursor.fetchall()
            return render_template('list.html', booked=False, result=result)

    if 'id_users' in session:
        cursor.execute("SELECT f.id_flights, f.id_src, f.id_dest, f.price_flights, f.date_flights, f.seats_flights, dep.short_airports, arr.short_airports FROM flights as f join airports as dep on dep.id_airports=f.id_src JOIN airports AS arr ON arr.id_airports=f.id_dest WHERE f.seats_flights > 0;")
        result = cursor.fetchall()
        if result != None:
            return render_template('list.html', result=result)
        else:
            return redirect('/')
    else:
        return redirect('/')

@app.route('/booked', methods=['POST', 'GET'])
def booked():
    if request.method == 'POST':
        tmp_id_flights = request.form['id_flights']
        tmp_id_tickets = request.form['id_tickets']

        cursor.execute("DELETE FROM tickets WHERE id_ticket = ?", (tmp_id_tickets,))

        cursor.execute("SELECT seats_flights FROM flights WHERE id_flights = ? ",(tmp_id_flights,))
        resultat = cursor.fetchone()
        places = resultat[0] + 1
        cursor.execute("UPDATE flights set seats_flights = %s where id_flights=%s",(places,tmp_id_flights,))

        cursor.execute("SELECT t.id_ticket, f.id_flights, f.id_src, f.id_dest, f.price_flights, f.date_flights, dep.short_airports, arr.short_airports FROM flights as f join airports as dep on dep.id_airports=f.id_src join airports as arr on arr.id_airports=f.id_dest JOIN tickets as t on t.id_flights=f.id_flights WHERE t.id_users = %s;",(session['id_users'],))
        result = cursor.fetchall()
        if result != None:
            return render_template('booked.html', result=result)
        else:
            return redirect('/')
    else:
        cursor.execute ("SELECT t.id_ticket, f.id_flights, f.id_src, f.id_dest, f.price_flights, f.date_flights, dep.short_airports, arr.short_airports FROM flights as f join airports as dep on dep.id_airports=f.id_src join airports as arr on arr.id_airports=f.id_dest JOIN tickets as t on t.id_flights=f.id_flights WHERE t.id_users = %s;",(session['id_users'],))
        result = cursor.fetchall()
        if result != None:
            return render_template('booked.html', result=result)
        else:
            return redirect('/')

if __name__ == "__main__":
    app.run(debug=True)
