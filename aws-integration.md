https://hostadvice.com/how-to/web-hosting/containers/how-to-use-docker-containers-with-aws-ec2-2/
Youtube: https://www.youtube.com/watch?v=RgLt3R2A20s
OS MacM1 issue
https://stackoverflow.com/questions/66662820/m1-docker-preview-and-keycloak-images-platform-linux-amd64-does-not-match-th

Deploying docker image to Aws Elastic Container Service
Docker steps: https://cto.ai/blog/deploying-a-docker-application-to-aws-ecs/

ecs repo: https://us-east-1.console.aws.amazon.com/ecr/repositories?region=us-east-1
ecs image: https://us-east-1.console.aws.amazon.com/ecr/repositories/private/686458311163/mongo-app?region=us-east-1
docker image url: 686458311163.dkr.ecr.us-east-1.amazonaws.com/mongo-app:latest
image username: algomachine
image password: algomachine

deploy ec2 instance with ecs: https://www.permify.co/post/how-to-deploy-your-container-into-aws-ec2-with-ecs/#0

EXPLANATION:

Before we deploy our application to ECS, we need to deploy our image into AWS using Amazon ECR.
Think of ECS as a repository for docker containers that you'll push your docker image to tag your docker image and push to ECS repo
docker tag <app-folder-name> <ecs-url> 4. docker tag mongo 686458311163.dkr.ecr.us-east-1.amazonaws.com/mongo-app:latest
docker login -u AWS -p $(aws ecr get-login-password <aws-region>) <aws-id>.dkr.ecr.the-region-you-are-in.amazonaws.com: Authenticates the user in aws
finally push to mongo
Step 9: Now that our image is in ECR, head over to ECS to create your cluster.
After creating ecr repo, click on view push command, follow it to move docker image to aws
ECS is the container service that is used to deploy the registry

AccessKeyPWD: /GnWaGTEUX+5QqRSojpJpWsfZhP5TO58yRdearLI
AccessKey: AKIAZ7VA2SH5TN47C6EV

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
