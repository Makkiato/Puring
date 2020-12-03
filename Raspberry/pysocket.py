import socketio
import os
from urllib.request import urlopen


sio = socketio.Client()
#라즈베리 ip로 바꿔놓기
sio.connect('http://192.168.0.3:3000')
toRecieve = 0
checker=[]

directoryPath = os.path.abspath('./recieved/')

@sio.on('Metadata')
def handler(data):
    print('metadata recieved : ')
    print(data)
    global toRecieve
    toRecieve = data['Count']
    print('toRecieve = ')
    print(toRecieve)
    if toRecieve == 0:
        print('No new data')
        sio.emit('disconnect')
    else :
        print('success')
        sio.emit('Send',{'current' : 0})
        

@sio.on('Sending')
def handler(data):
    print('data recieved')
    writer = open(directoryPath+data['Name'],'wb')
    writer.write(data['Data'])
    writer.close
    print('current and toRecieve')
    print(data['current'])
    print(toRecieve)
    if data['current'] == toRecieve - 1 :
        print('complete recieveing all data')
        sio.emit('disconnect')
		#여기서 텐서플로우를 호출
		sio.emit('Start')
    else :
        print('request next data index : ')
        print(data['current']+1)
        sio.emit('Send',{'current' : data['current']+1})
   
    


