from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

updated_fly = [
	{
		"id": 0,
		"code_depart": "JFK",
		"code_destination": "CDG",
		"prix": "1250",
	},
]

fly_list = [
	{
		"id": 0,
		"code_depart": "JFK",
		"code_destination": "CDG",
		"prix": "405",
	},
	{
		"id": 1,
		"code_depart": "JFK",
		"code_destination": "DTW",
		"prix": "415",
	},
	{
		"id": 2,
		"code_depart": "CDG",
		"code_destination": "JFK",
		"prix": "345",
	},
	{
		"id": 3,
		"code_depart": "CDG",
		"code_destination": "DTW",
		"prix": "295",
	},
	{
		"id": 4,
		"code_depart": "DTW",
		"code_destination": "JFK",
		"prix": "512",
	},
	{
		"id": 5,
		"code_depart": "DTW",
		"code_destination": "CDG",
		"prix": "377",
	},
]

@app.route('/fly', methods=['GET'])
def fly():
	if request.method == 'GET':
		if len(fly_list) > 0:
			return jsonify(fly_list)
		else:
			'Nothing Found', 404

@app.route('/fly/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def single_fly(id):
	if request.method == 'GET':
		for fly in fly_list:
			if fly['id'] == id:
				return jsonify(fly)

				pass

	if request.method == 'PUT':
		for fly in fly_list:
			if fly['id'] == id:
				fly['code_depart'] = request.form['code_depart']
				fly['code_destination'] = request.form['code_destination']
				fly['prix'] = request.form['prix']
				updated_fly = {
					'id': id,
					'code_depart': fly['code_depart'],
					'code_destination': fly['code_destination'],
					'prix': fly['prix']
				}
				return jsonify(updated_fly)

	if request.method == 'DELETE':
		for index, fly in enumerate(fly_list):
			if fly['id'] == id:
				fly_list.pop(index)
				return jsonify(fly_list)

@app.route('/updated_fly/<int:id>', methods=['GET'])
def single_fly(id):
	if request.method == 'GET':
		for fly in updated_fly:
			if fly['id'] == id:
				return jsonify(fly)

if --name == '__main__'
	app.run()