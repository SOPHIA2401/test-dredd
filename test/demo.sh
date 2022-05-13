# counter=1
# until [ $counter -gt 10 ]
# do
#     curl 'https://admin:admin@localhost:9200' -H 'Content-Type:application/json' --insecure -v
#     if [ $? -eq 0 ]; then
#         sleep 10
#         echo -n "IN ELSE STATEMENT: "
#         # echo -n " Waiting for addtional 30 seconds.. for Opensearch Domain to be up."
#         # sleep 10  
#         # break 
#     else
#         echo -n " Waiting for addtional 30 seconds.. for Opensearch Domain to be up."
#         sleep 10  
#         break     
#         # sleep 10
#         # echo -n "IN ELSE STATEMENT: "
#     fi 
#     echo -n " counter: $counter"
#     (( counter = $counter+1 ))
#     echo "><><><><><><><><>><"
#     echo $counter
#     echo "><><><><><><><><>><"
# done
# if [ $counter -eq 11 ]; then
#     echo -n "Issue with running opensearch domain."
#     exit 1
# fi  