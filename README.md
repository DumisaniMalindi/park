Parking Management System

Project Overview
A cloud-based parking management system that detects vehicle registration numbers from uploaded images using AWS services.

Features
- Vehicle image upload
- Number plate detection
- Amazon S3 image storage
- Amazon Rekognition OCR
- React frontend
- AWS Lambda backend
- API Gateway integration

Architecture

React Frontend
↓
API Gateway
↓
AWS Lambda
↓
Amazon S3
↓
Amazon Rekognition

Technologies Used

- React
- JavaScript
- Python
- AWS Lambda
- Amazon API Gateway
- Amazon S3
- Amazon Rekognition
- CloudWatch

How It Works

1. User uploads vehicle image
2. React converts image to Base64
3. API Gateway receives request
4. Lambda processes image
5. Image stored in S3
6. Rekognition extracts text
7. Regex identifies plate number
8. Result returned to user


Dumisani Malindi
