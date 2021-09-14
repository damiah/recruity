import time
from flask import jsonify
from flask import Flask

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/locations')
def get_locations():
    return jsonify([
        {
        'id': 1,
        'name': 'Wellington, NZ'
        },
        {'id': 2,
        'name': 'Tawa, NZ'
        },
        {'id': 3,
        'name': 'Auckland, NZ'
        },
        ])


@app.route('/employees')
def get_employees():
    employees = [
        {
        'cityId': 'Wellington, NZ',
        'currentJobTitle': 'Data Scientist',
        'currentEmployer' : 'SWEAT',
        'userName': 'Miah',
        'id': 1
        },
        {
        'cityId': 'Wellington, NZ',
        'currentJobTitle': 'Data Engineer',
        'currentEmployer': 'DBT',
        'userName': 'Jeremy',
        'id': 2
        },
        {
        'cityId': 'Tawa, NZ',
        'currentJobTitle': 'Principal Economist',
        'currentEmployer': 'Xero',
        'userName': 'Csaba',
        'id': 3
        },
        ]
    print(jsonify(employees))
    return jsonify(employees)

@app.route('/employers')
def get_employers():
    employers = [
        {
        'name' : 'SWEAT',
        'id': 1
        },
        {
        'name': 'DBT',
        'id': 2
        },
        {
        'name': 'Xero',
        'id': 3
        },
        ]
    print(jsonify(employers))
    return jsonify(employers)