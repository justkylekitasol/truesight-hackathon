# TrueSight Backend

##Setup guide

```
git clone https://github.com/justkylekitasol/truesight-hackathon.git
cd truesight-backend
```
### Setup Database

Run src/main/resources/sql/db-setup.sql on your local MySQL server

### Build and run spring-boot application
```
./mvnw package
java -jar target/*.jar --MYSQL_HOST=$dbhost --MYSQL_PORT=$dbport --MYSQL_USER
=$dbuser --MYSQL_PASSWORD=$dbpass     
```
