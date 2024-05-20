import { Employee } from "../../EmployeeContext.tsx";

export interface EntryProps {
    employee: Employee,
    isSelected: boolean,
    setIsSelected: (value: (((prevState: { [ k: string ]: boolean }) => { [ k: string ]: boolean }) | { [ k: string ]: boolean })) => void,
}