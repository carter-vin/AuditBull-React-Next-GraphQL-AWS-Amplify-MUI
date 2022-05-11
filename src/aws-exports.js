/* eslint-disable */

//TODO: we should have diff configuration for every environment
// for ab-app development
const awsmobile = {
    aws_project_region: 'us-east-1',
    aws_cognito_identity_pool_id:
        'us-east-1:f9fb16e4-7875-4641-9e23-fdbd7691b508',
    aws_cognito_region: 'us-east-1',
    aws_user_pools_id: 'us-east-1_Jfk8aYSs6',
    aws_user_pools_web_client_id: '7e5gc6tsepspn6n5b2gvl7lg96',
    oauth: {
        domain: 'ab-app-development.auth.us-east-1.amazoncognito.com',
        scope: [
            'phone',
            'email',
            'openid',
            'profile',
            'aws.cognito.signin.user.admin',
        ],
        redirectSignIn: 'http://localhost:3000', //'https://ab-app-five.vercel.app/',
        redirectSignOut: 'http://localhost:3000', //'https://ab-app-five.vercel.app/',
        responseType: 'code',
    },
    federationTarget: 'COGNITO_USER_POOLS',
    aws_cognito_username_attributes: [],
    aws_cognito_social_providers: ['GOOGLE'],
    aws_cognito_signup_attributes: ['EMAIL'],
    aws_cognito_mfa_configuration: 'OFF',
    aws_cognito_mfa_types: ['SMS'],
    aws_cognito_password_protection_settings: {
        passwordPolicyMinLength: 8,
        passwordPolicyCharacters: [],
    },
    aws_cognito_verification_mechanisms: ['EMAIL'],
    aws_cloud_logic_custom: [
        {
            name: 'AdminQueries',
            endpoint:
                'https://m7ddlqrhle.execute-api.us-east-1.amazonaws.com/dev',
            region: 'us-east-1',
        },
    ],
};

export default awsmobile;
