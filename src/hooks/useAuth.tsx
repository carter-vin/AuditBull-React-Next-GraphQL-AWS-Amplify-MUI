/* eslint-disable no-console */
/* eslint-disable default-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-empty-function */
import { useContext, createContext, useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { API, Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const authContext = createContext<any>({});
const { Provider } = authContext;

const addUserToGroup = async (username: string, userRole?: string) => {
    const requestInfo = {
        body: {
            username,
            groupname: userRole || 'users',
        },
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${(await Auth.currentSession())
                .getAccessToken()
                .getJwtToken()}`,
        },
    };
    const res = await API.post('AdminQueries', '/addUserToGroup', requestInfo);
    return res;
};

type LoginPayload = {
    username: string;
    password: string;
    rememberme?: boolean;
};

export type NewPasswordType = {
    username: string;
    password: string;
};

// setting up the state (reducers)
const useAuthProvider = () => {
    const router = useRouter();
    const [loginUser, setLoginUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [newPasswordButton, setNewPasswordButton] = useState(null);

    const checkUser = async () => {
        setLoading(true);
        try {
            const responseUser = await Auth.currentAuthenticatedUser();
            console.log('the responseUser: ', {
                responseUser,
                idToken: responseUser.signInUserSession?.idToken,
                payload: responseUser.signInUserSession?.accessToken?.payload,
                group: responseUser.signInUserSession?.idToken?.payload?.[
                    'cognito:groups'
                ]?.includes('us-east-1_7BaljQxPv_slack'),
            });
            if (
                responseUser &&
                responseUser.signInUserSession?.idToken?.payload?.[
                    'cognito:groups'
                ]?.includes(
                    'us-east-1_7BaljQxPv_slack' ||
                        'us-east-1_GNePfVnuf_azure' ||
                        'us-east-1_GNePfVnuf_slack' ||
                        'us-east-1_GNePfVnuf_Google'
                )
            ) {
                console.log('is this is working');
                await addUserToGroup(
                    responseUser?.username ||
                        responseUser?.attribute?.email ||
                        '',
                    'admin'
                );
                await Auth.updateUserAttributes(responseUser, {
                    'custom:role': 'admin',
                });
            }
            setLoginUser(responseUser);
            setLoading(false);
        } catch (error) {
            console.log('the error: ', error);
            setLoginUser(null);
            setLoading(false);
            router.push('/login');
        }
    };

    const loginBySlack = () => {
        Auth.federatedSignIn({
            customProvider: 'slack',
        });
        checkUser();
    };

    const loginByAzure = () => {
        Auth.federatedSignIn({
            customProvider: 'azure',
        });
        checkUser();
    };

    const loginByUserName = (values: LoginPayload) => {
        Auth.signIn({
            username: values.username,
            password: values.password,
        })
            .then((user) => {
                if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    setNewPasswordButton(user);
                } else {
                    router.push('/');
                    checkUser();
                    setNewPasswordButton(null);
                }
            })
            .catch((error) => {
                checkUser();
                console.log('the error: ', error);
                // toast.error(
                //     error.response?.data?.message || 'Error logging in'
                // );
            });
    };

    const updateNewPassword = ({ username, password }: NewPasswordType) => {
        console.log('the new details', { password, username });
        Auth.completeNewPassword(newPasswordButton, password)
            .then(async () => {
                setNewPasswordButton(null);
                const values = {
                    username,
                    password,
                };
                await loginByUserName(values);
            })
            .catch((error) => {
                toast.error(
                    error.response?.data?.message ||
                        'Password patterns donot match'
                );
            });
    };

    const logOutUser = () => {
        setLoading(true);
        Auth.signOut()
            .then(() => {
                setLoginUser({});
                setLoading(false);
                checkUser();
                router.push('/login');
                toast.success('Logged out successfully');
            })
            .catch((error) => {
                console.log('the error', error);
                toast.error(
                    error.response?.data?.message || 'Error logging out'
                );
            });
        checkUser();
    };

    useEffect(() => {
        checkUser();
    }, []);

    return {
        loading,
        loginUser,
        newPasswordButton,
        setLoginUser,
        logOutUser,
        loginBySlack,
        loginByAzure,
        loginByUserName,
        updateNewPassword,
    };
};

// setup provider
export const AuthProvider = ({ children }: { children: ReactElement }) => {
    const data = useAuthProvider();
    return <Provider value={data}>{children}</Provider>;
};

export const useAuth = () => useContext(authContext);
