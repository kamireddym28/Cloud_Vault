# Cloud Vault -- CMPE 281 -- Project1

A 3-tier cloud-based file management application hosted in AWS where users will be able to store and manage their files. Authorized users will be able to manage their files by performing CRUD operations by uploading, downloading, updating and deleting any file of size 10 MB. In admin mode, admin will be given access to view list of files from all the users along with privileges to delete users’ files.

Hosted on AWS using Route53 at http://www.cloud-vault-mounicakamireddy.link/

# AWS Resources Used:

**Route53**: This application is hosted on web using Route53, a registered web domain provided by AWS.

**Elastic Beanstalk**: Cloud vault was deployed using Elastic bean stalk, a service to host web applications. It manages the web application using important features such as load balancing, auto scaling, health monitoring etc. It comes with EC2 instances by default.

**S3**: S3 bucket was used to store the files in AWS where a life cycle policy was enabled for the bucket in such a way that the files exist in standard s3 for 75 days, then moves to standard IA and stays there for 365 days and then moves to s3 glacier for another 365 days and finally gets deleted. Transfer acceleration was enabled to avoid any delays due to internet routing and speed.

**Cloud Front**: Cloud front was enabled for S3 bucket and the files can be accessed and downloaded through lambda edge location. Cloud Front acts as a cache storage. Geo location restriction was enabled for restricted countries.

**Amazon RDS**: A DB with MySQL engine has been used to store the files uploaded. Database operations such as INSERT, SELECT, UPDATE and DELETE were used to write to or read from database.

**Lambda**: Lambda function which triggers an SNS email notification was enabled for certain operations on S3 bucket. Email notification will be sent to bucket owners if an event triggers.

**SNS**: A notification service which helps users to monitor and track their activity as desired.

**Cloud Watch**: A monitoring service to keep track of the health and utilization of resources.

# Features:

- Both user and admin can sign up and then login using their respective signup and custom login forms provided.

- User mode in which users can upload, delete, update and download the files.

- Admin mode in which lists of files from all the users can be seen and deleted if necessary.

- Listed files keeps track of file name, file description, author, date created, and date modified.

- On every operation, database updates were made to reflect the latest changes.

# Technology Stack:

**Frontend**: React, Bootstrap

**Backend**: Node 17.x, Express

**Database**: Amazon RDS (MySQL)

**Tools**: MySQL Work Bench, AWS-SDK for Node

# Architecture Diagram:

![image](https://user-images.githubusercontent.com/27188674/138378368-663e5e3d-ce60-424f-9260-1d15994c46da.png)








