# Behavidence Care as SDK - REST API     
Simple example of integration of Behavidence Care API to add value to clinicians and patients using Mental Health Similarity Scores         

## Direct link to MHSS of patient in BehavidenceCare
``` https://care.behavidence.com/similarity-scores/detail/?userId=[UserID]&userCode=[UserAssociationCode]&refreshtoken=[token] ```

### Query Parameters
**userId**      
    (required) UserID, as received from Behavidence when requesting MHSS for Code   
**userCode**      
    (required) Association Code of a patient    
**refreshtoken**      
    (required) Refresh Token, as received when connecting     
      
## Connect to Behavidence Care API   
This call is required to get an access token, which serves as credentials in all subsequent API calls.   
### Request Syntax   
```POST /auth```    
### Request Headers    
``` X-API-Key```         
### Request Body   
```
{   
  "Username": "string",   
  "Password": "string"    
}
```    
### Request Parameters    
**Username**   
    (required) Client’s username, as received from Behavidence   
**Password**   
    (required) Client’s password   
### Response Syntax    
```
{   
  "Token": "string",   
  "Expiration": number,     
  "RefToken": "string",   
  "RefExpiration": number,        
}
```   
### Response Elements   
**Token**      
    Access token, used as credentials in subsequent API calls   
**Expiration**   
    Validity duration in seconds   
**ReToken**      
    Refresh token, used as credentials in direct link to Behavidence Care     
**RefExpiration**   
    Validity duration in seconds    
    
## Get Association Code / Invitation Link for Patient   
### Request Syntax   
```POST /code```    
### Request Headers      
```
X-API-Key              
Token
```   
### Request Body   
```
{    
  "SubscriptionId": "string",   
  "DepartmentId": "string",   
  "Amount": number   
}
```  
### Request Parameters    
**SubscriptionId**  
    (required) Client’s account ID, as received from Behavidence   
**DepartmentId**    
    (required) Alphanumeric unique identifier of a department, clinic or therapist. Minimum length of 4. Maximum length of 32.    
**Amount**    
    (optional) Amount of Association Codes / Invitation links to generate. Positive. Default value: 1    
### Response Syntax    
```
{   
  "Items": [ { "Code": "string", "Link": "string", "QRCode": "string" } ],   
  "Amount": number,   
  "Error": "string"   
}
```   
### Response Elements    
**Items**   
    Array of Association Codes / Invitation links, if generation was successful. Each item contains a unique code identifier for the patient, a link to download the application with automatic connection to the code, and a QR-Code (Base64 image data) which leads to the same link.   
**Amount**   
    Amount of generated items. Negative if error.    
**Error**   
    Error message, if error occurs; otherwise, empty string.    
**Errors**    
(-101)    
    Invalid Subscription ID    
(-103)    
    Invalid Department ID    
(-105)    
    Invalid Amount    
(-107)    
    Invalid Access Token    
     
## Get MHSS for Patient Code   
### Request Syntax   
```POST /mhss```    
### Request Headers    
```
X-API-Key          
Token
```   
### Request Body    
```
{   
  "Code": "string",    
  "From": "string",    
  "Average": number,    
}
```    
### Request Parameters    
**Code**   
    (required) Unique patient code, for which to retrieve MHSS   
**From**    
    (optional) Fetch MHSS from this date until today. If omitted, fetch all MHSS. Format: YYYY-MM-dd    
**Average**    
    (optional) Fetch average MHSS for the last number of scores.
### Response Syntax    
```
{   
  "Items": {   
    "YYYY-MM-dd": {    
        "anxiety": number,   
        "adhd": number,    
        "depression": number,   
        "stress": number   
    },    
  },    
  "Amount": number,
  "Status": "string",
  "UserID": "string",
  "QuestStats": {
    "sent": number,
    "answered": number
  },
  "Thresholds": {
    "anxiety": number,   
    "adhd": number,    
    "depression": number,   
    "stress": number 
  }       
  "Error": "string"   
}
```     
### Response Elements      
**Items**     
    Object of MHSS of the patient per day, if the code was used; otherwise, empty. Mental Health Similarity Scores are between 0 and 1.     
**Amount**    
    Amount of days with MHSS. Negative if error. Zero if the code is unused. For average, number of days actually averaged.
**Status**     
	Status of code - Invited, Used, Disconnected.  
**UserID**     
	Anonimized UserID which is connected to this code; used to create direct link to Behavidence Care MHSS Dashboard.     
**QuestStats**     
	Status of PROs, number of sent and answered      
**Thresholds**     
	Object of custom thresholds for MHSS, per phenotype. May be empty. Values are between 0 and 100.    
**Error**    
    Error message, if error occurs; otherwise, empty string.   
**Errors**    
(-109)   
    Invalid Code    
(-111)     
    Invalid Date     
(-107)     
    Invalid Access Token    
     
## Batch Get MHSS for Patient Code    
### Request Syntax    
```POST /mhss-batch```    
### Request Headers    
```
X-API-Key        
Token   
```    
### Request Body    
```
{    
  "Codes": [ "string" ],    
  "From": "string"     
}
```    
### Request Parameters    
**Codes**    
    (required) Array of unique patient codes, for which to retrieve MHSS    
**From**    
    (optional) Fetch MHSS from this date until today. If omitted, fetch all MHSS. Format: YYYY-MM-dd      
### Response Syntax     
```
{   
  "Items": [    
    { "YYYY-MM-dd": {    
        "anxiety": number,   
        "adhd": number,   
        "depression": number,   
        "stress": number      
      },   
    }    
  ],    
  "Amount": number,    
  "Error": "string"    
}
```         
### Response Elements     
**Items**    
    Array of MHSS, matching the order of request array. Unused codes will have an empty object.    
**Amount**   
    Amount of codes with MHSS. Negative if error.    
**Error**    
    Error message, if error occurs; otherwise, empty string.     
**Errors**    
(-109)    
    Invalid Codes     
(-111)    
    Invalid Date    
(-107)    
    Invalid Access Token    
     
## Get Codes Status Report     
### Request Syntax    
```POST /status```    
### Request Headers    
```
X-API-Key        
Token
```   
### Request Body    
```
{   
  "Detailed": boolean,
  "Code": string   
}
```   
### Request Parameters    
**Detailed**    
    (optional) Request per-code report. Default value: false    
**Code**   
    (optional) Unique patient code, for which to get status report   
### Response Syntax    
```
{    
  "Items": {   
    "Free": number,   
    "Invited": number,     
    "Used": number,    
    "Codes": [    
      {
        "Code": "string",   
        "DepartmentId": "string",   
        "Invited": number,   
        "Used": number,
        "Disconnected": number    
      },
    ]
  },
  "Error": "string"    
}
```    
### Response Elements    
**Items**     
    Amount of codes that are used by patients, amount of codes that were allocated to patients but not yet used, amount of remaining codes. If a detailed status report was requested, array of information per code, including its Department unique ID, timestamp of allocation and timestamp of association by patient (milliseconds UTC). If a code was allocated for a patient but is not yet used, the timestamp of association will be zero. If a patient disconnected from a code, a timestamp of disconnection time will be included.    
**Error**    
    Error message, if error occurs; otherwise, empty string.    
**Errors**   
(-107)   
    Invalid Access Token   
