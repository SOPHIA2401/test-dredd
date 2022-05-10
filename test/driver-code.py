import argparse
import os
# Declaring global parameters: 
endpoint = "https://search-movies-hqrmd5q7cqb7ru7tbypeicwsy4.us-east-1.es.amazonaws.com"
username = "sofigarg"
password = "T@rget2023"
testname = ""
path = ""
tpass = 0
tfail = 0

# Function for dredd framework implementation

def dredd_work(endpoint, username, password, testname, path,tpass,tfail):
    print("===================") 
    print("Endpoint: ",endpoint)
    print("Username: ",username)
    print("Password: ",password)
    print("Path: ",path)
    print("TestName: ",testname)
    print("===================") 
    # Walking a directory tree and printing the names of the directories and files
    # if path == "":
    #    path = "./models"
    for dirpath, dirnames, files in os.walk("./models"):
        curr_path = dirpath.split('/')
        curr_dir = curr_path[len(curr_path)-1] 
        print(f'FOUND DIRECTORY: { dirpath }')            
        if files:
            command = "dredd " + dirpath +"/"+ files[1]+ " " + endpoint+ " --user=" + username + ":" + password + " --hookfiles="+dirpath +"/"+files[0]+" -d"
            # command = "Dredd " + dirpath +"/"+ files[1]+ " " + endpoint+ " --user=" + username + ":" + password + " --hookfiles="+dirpath +"/"+files[0]
            # command = "Dredd " + dirpath +"/"+ files[1]+ " " + endpoint + " --user=" + username + ":" + password 
            if testname != "":
                if testname == curr_dir:
                    print(command)
                    result = os.system(command)
                    print("RESULT: ><><><><><>< ",result)
                    if(result == 0):
                       tpass = tpass+1
                    else:
                        tfail = tfail+1   

            else:
                print(command)
                result = os.system(command)  
                print("RESULT: ><><><><><>< ",result)  
                if(result == 0):
                    tpass = tpass+1
                else:
                    tfail = tfail+1
    return tfail                

# Parsing command line arguments:
parser = argparse.ArgumentParser()

parser.add_argument('--endpoint', type=str, required=False)
parser.add_argument('--user', type=str, required=False)
parser.add_argument('--path', type=str, required=False)
parser.add_argument('--testname', type=str, required=False)
args = parser.parse_args()

# Check whether default arguments provided by user:
if args.endpoint is not None:
    endpoint = args.endpoint

if args.user is not None:
    user = (args.user).split(':')
    username = user[0]
    password = user[1]

if args.path is not None:
    path = args.path

if args.testname is not None:
    testname  = args.testname  

# file_obj = open('./test/url.txt', "w") 
f = open("url.txt", mode='w', encoding='utf-8') 
f.write(endpoint)
f.write("\t")
f.write(username)
f.write("\t")
f.write(password)
f.seek(0,0)

tfail = dredd_work(endpoint, username, password, testname, path,tpass,tfail)

f.close() 
exit(tfail)

# os._exit(tfail)
# COMMAND LINE ARGUMENT PARSER  --> DONE

# ITERATIVELY MOVE INTO DIRECTORY --> DONE

# RUN TERMINAL COMMAND USING PYTHON --> DONE

# CHECK RESULTS AND EXIT