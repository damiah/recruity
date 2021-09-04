import time
from flask import jsonify
from flask import Flask

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/employees')
def get_employees():
    employees = [
        {
        'cityId': 'Wellington',
        'currentJobTitle': 'Data Scientist',
        'workingTimeId': 1,
        'name': 'Miah',
        'id': 1
        },
        {
        'cityId': 'Malaysia',
        'currentJobTitle': 'Data Engineer',
        'workingTimeId': 1,
        'name': 'Jeremy',
        'id': 2
        }]
    print(jsonify(employees))
    return jsonify(employees)