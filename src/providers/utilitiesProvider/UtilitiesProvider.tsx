import React, { useContext } from 'react';
import { default as useSnackBarHook } from '../../hooks/useSnackBar'
import { Severity, SnackbarOrigin } from '../../hooks/useSnackBar';

interface UtilitiesContextInterface {
    SnackBar: React.FC;
    triggerSnackBar(severity: Severity, content: string, origin: SnackbarOrigin): void;
    [key: string]: any
}

const UtilitiesContext = React.createContext<UtilitiesContextInterface>({} as UtilitiesContextInterface);

export default function UtilitiesProvider({ children }: { children: React.ReactNode }) {

    const { SnackBar, triggerSnackBar } = useSnackBarHook()

    return (
        <UtilitiesContext.Provider value={{ SnackBar, triggerSnackBar }} >
            {children}
        </UtilitiesContext.Provider>
    )
}

const useUtilitiesSelector = (value: string) => useContext(UtilitiesContext)[value]

export const useSnackBar = () => useUtilitiesSelector('SnackBar')
export const useTriggerSnackBar = () => useUtilitiesSelector('triggerSnackBar')