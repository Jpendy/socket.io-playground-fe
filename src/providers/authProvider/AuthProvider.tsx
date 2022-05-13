import React, { useState, useEffect, useContext, SetStateAction, Dispatch } from 'react';
import { fetchVerifyUser, fetchLogout, fetchSignup, fetchLogin } from '../../services/auth';
import { RequestError } from '../../types/error';
import { IUser } from '../../types/user';

export interface UserAuthBody {
    email: string;
    password: string;
}

interface AuthContextInterface {
    activeUser: IUser | null;
    setActiveUser: Dispatch<SetStateAction<IUser | null>>;
    authLoading: boolean;
    authError: RequestError | null;
    setAuthError: Dispatch<SetStateAction<RequestError | null>>
    signup(body: UserAuthBody): void;
    login(body: UserAuthBody): void;
    logout(): void;
    [key: string]: any;
}

const AuthContext = React.createContext<AuthContextInterface>({} as AuthContextInterface);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [activeUser, setActiveUser] = useState<IUser | null>(null);
    const [authLoading, setAuthLoading] = useState<boolean>(false);
    const [authError, setAuthError] = useState<RequestError | null>(null);

    useEffect(() => {
        setAuthLoading(true)
        fetchVerifyUser()
            .then(user => setActiveUser(user))
            .finally(() => setAuthLoading(false))
    }, [])

    const signup = (body: UserAuthBody) => {
        setAuthError(null)
        setAuthLoading(true)
        return fetchSignup(body)
            .then(setActiveUser)
            .catch(err => setAuthError(err.message))
            .finally(() => setAuthLoading(false))
    }

    const login = (body: UserAuthBody) => {
        setAuthError(null)
        setAuthLoading(true)
        return fetchLogin(body)
            .then(setActiveUser)
            .catch(err => setAuthError(err.message))
            .finally(() => setAuthLoading(false))
    }

    const logout = () => {
        setAuthError(null)
        fetchLogout().then(() => setActiveUser(null))
    }

    return (
        <AuthContext.Provider value={{ activeUser, setActiveUser, authLoading, authError, setAuthError, signup, login, logout }} >
            {children}
        </AuthContext.Provider>
    )
}

const useAuthSelector = (value: string) => useContext(AuthContext)[value]

export const useActiveUser = () => useAuthSelector('activeUser')
export const useSetActiveUser = () => useAuthSelector('setActiveUser')
export const useSignup = () => useAuthSelector('signup')
export const useLogin = () => useAuthSelector('login')
export const useLogout = () => useAuthSelector('logout')
export const useAuthError = () => useAuthSelector('authError')
export const useAuthLoading = () => useAuthSelector('authLoading')
export const useSetAuthError = () => useAuthSelector('setAuthError')