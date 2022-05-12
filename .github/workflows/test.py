import os

for i in range(0,6):
    command = "curl 'https://admin:admin@localhost:9200' -H 'Content-Type:application/json' --insecure -v"
    result = os.system(command)
    print("result of curl command: ",result)
    if result:
        break
    else:
        os.system("sleep 30s")
    print("i", i)    

print("over")        