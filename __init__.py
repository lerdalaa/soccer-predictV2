from flask import Flask, render_template, request, redirect, Response, url_for, jsonify
import json
from calculate import getHUB, teams

app = Flask(__name__)



@app.route('/')
def output():
	return render_template('index.html', teams=teams)

@app.route('/process', methods=['POST'])
def process():
  home = request.form['a']
  away = request.form['b']
  return jsonify(getHUB(home, away))

if __name__ == '__main__':
	app.run(debug=True)