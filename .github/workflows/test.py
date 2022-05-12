import os

for i in range(0,6):
    command = "curl 'https://admin:admin@localhost:9200' -H 'Content-Type:application/json' --insecure -v"
    result = os.system(command)
    print("result of curl command: ",result)
    if result !=0:
        os.system("sleep 30s")
    else:
        break
    print("i", i)    

print("over")        