import { createContext, ReactNode, useContext, useState } from "react";

export interface Employee {
    id: string;
    name: string;
    accountName: string;
    email: string;
    group: string;
    phoneNumber: string;
}

export interface EmployeeDataContextValue {
    groups: string[],
    setGroups: (value: (((prevState: string[]) => string[]) | string[])) => void,
    employees: Employee[],
    setEmployees: (value: (((prevState: Employee[]) => Employee[]) | Employee[])) => void,
    selected: {[k: string]: boolean},
    setSelected: (value: (((prevState: {[k: string]: boolean}) => {[k: string]: boolean}) | {[k: string]: boolean})) => void,
    sortedField: keyof Employee | undefined,
    setSortedField: (value: keyof Employee | undefined) => void,
}

// TODO: fix type error with initializing of context
const EmployeeDataContext = createContext<EmployeeDataContextValue>();


export function useEmployeeData() {
    return useContext(EmployeeDataContext);
}

export default function EmployeeDataProvider({ children }: { children: ReactNode}) {

    const [ groups, setGroups ] = useState<string[]>([]);

    const [ employees, setEmployees ] = useState<Employee[]>([]);

    const [ selected, setSelected ] = useState<{[k: string]: boolean}>({});

    const [ sortedField, setSortedField ] = useState<keyof Employee | undefined>();

    const value = {
        groups,
        setGroups,
        employees,
        setEmployees,
        selected,
        setSelected,
        sortedField,
        setSortedField,
    };

    return (
        <EmployeeDataContext.Provider value={value}>
            {children}
        </EmployeeDataContext.Provider>
    );

}

