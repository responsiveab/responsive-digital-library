read -p "Enter admin name: " adminName
read -p "Enter admin email: " adminEmail
read -p "Enter admin password: " adminPassword

user='{ "name": "'"$adminName"'", "email": "'"$adminEmail"'", "password": "'"$adminPassword"'" }'
curl --header "Content-Type: application/json" \
     --request POST \
     --data "$user" \
     http://localhost:8080/api/users/register
