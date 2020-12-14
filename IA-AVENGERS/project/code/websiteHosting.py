# KHETIM Wassil, MALDEREZ Alexis, MARGNAC Thomas, MESSIBAH Elias, ZEIDAN Carla
import flask

app = flask.Flask(__name__,template_folder='Template')
app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def home():
	return flask.render_template('index.html')

app.run(host="localhost", port=8000)