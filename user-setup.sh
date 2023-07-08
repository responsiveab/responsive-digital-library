read -p "Enter user name: " userName
read -p "Enter user email: " userEmail
read -p "Enter user password: " userPassword
read -p "Enter full URL to application: " URL

user='{ "name": "'"$userName"'", "email": "'"$userEmail"'", "password": "'"$userPassword"'" }'
curl --header "Content-Type: application/json" \
     --request POST \
     --data "$user" \
     "$URL"/api/users/register
