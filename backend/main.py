import json
import urllib.request
import objectpath

### To access data points
from flask import Flask
from flask_restful import Api, Resource, reqparse

intervals = ['1', '5', '15', '30', '60']

class Data(Resource):
    def get(selt, symbol, interval):
        if interval in intervals:
            return get_stock_prices_by_symbol(symbol, interval), 200
        else:
            return 'No this interval.'

# def get_interval(interval):
#     return interval

def create_url(symbol, interval):
    return 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + symbol + '&interval=' + interval + 'min&apikey=D01PQMVRIUNEQYRW'

def _request(symbol, interval):
    with urllib.request.urlopen(create_url(symbol, interval)) as req:
        data = req.read().decode("UTF-8")
    return data

def get_stock_prices_by_symbol(symbol, interval):
    c = json.loads(_request(symbol, interval))['Time Series ('+ interval +'min)']
    json.dumps(c)

    ## 1. open values
    tree = objectpath.Tree(c)
    result = tree.execute("$..'1. open'")
    values = list()
    for i in result:
        values.append(i)

    ### time
    times = list()
    for i in c:
        times.append(i)

    ### data
    data_points = []
    data_points_len = len(times)
    idx = 0
    while idx != data_points_len:
        data_points.append({"time": times[idx],"value": float(values[idx])})
        idx = idx + 1

    return data_points

# print(Data_points)
#### To access data points
app = Flask(__name__)
api = Api(app)

api.add_resource(Data, "/api/data/<string:symbol>/<string:interval>")
app.run(debug=True)
