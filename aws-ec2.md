AccessKeyPWD: /GnWaGTEUX+5QqRSojpJpWsfZhP5TO58yRdearLI
AccessKey: AKIAZ7VA2SH5TN47C6EV

current cluster and task: https://us-east-1.console.aws.amazon.com/ecs/home?region=us-east-1#/clusters/MongoAppECSCluster/tasks/14fc98f54a5a4a57a46756827cd25e97/details

<app-folder-name> : mongo
<aws-id>: 686458311163
<aws-region>: us-east-1
<8081> : The url the app instance is forwarded to
docker image in aws : 686458311163.dkr.ecr.us-east-1.amazonaws.com/mongo-app:latest

1. docker build -t <app-folder-name> .
2. docker images
3. docker run -p 8081:5001 <app-folder-name>
4. docker tag mongo 686458311163.dkr.ecr.us-east-1.amazonaws.com/mongo-app:latest
5. docker login -u AWS -p $(aws ecr get-login-password --region us-east-1) 686458311163.dkr.ecr.us-east-1.amazonaws.com/mongo-app:latest
6. docker push 686458311163.dkr.ecr.us-east-1.amazonaws.com/mongo-app:latest
7. create a cluster in ecs ==> infrastructure ==>
   <!-- 3a. http://localhost:8081/user should return the forwarded url from 5001 -->

Resource on how to create one: https://www.youtube.com/watch?v=-bv_WU4gvOw
Using an Ubuntu server to prevent pushing extremely large docker images everytime
Go to aws console and create a server
Get the .pem
Open it with chmod
Step 2 logs the user into the machine
You can edit file with nano <filename> i.e nano Dockerfile
<control> + <X> to save, Y then enter to close
control + k to delete
touch <filename> would create a file

ECS Always map to port i.e 8001 ===> 5001

1. chmod 400 test-kv.pem
2. ssh -i "test-kv.pem" ubuntu@ec2-44-201-177-251.compute-1.amazonaws.com
   ep 2 logs the user into the machine
3. you can do a git add . and git push here, rerun all docker steps above to update the ECS
