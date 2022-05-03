/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
    "aws_project_region": "us-east-1",
    "aws_cognito_identity_pool_id": "us-east-1:ef6a836d-6846-4180-bfe1-3b67a087a12a",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_GNePfVnuf",
    "aws_user_pools_web_client_id": "7v4leh22baubc8749u7hi59dou",
    "oauth": {
        "domain": "auditbull-staging-staging.auth.us-east-1.amazoncognito.com",
        "scope": [
            "phone",
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
        ],
        "redirectSignIn": "https://ab-app-five.vercel.app/,https://ab-app-five.vercel.app/",
        "redirectSignOut": "https://ab-app-five.vercel.app/,https://ab-app-five.vercel.app/",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_AND_IDENTITY_POOLS",
    "aws_cognito_username_attributes": [],
    "aws_cognito_social_providers": [
        "GOOGLE"
    ],
    "aws_cognito_signup_attributes": [
        "EMAIL"
    ],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [
        "SMS"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": []
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ]
};


export default awsmobile;
