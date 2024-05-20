import express, { Request, Response } from 'express';
import cors from "cors";
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(cors());
const port = 3000;

interface Employee {
    id: string;
    name: string;
    accountName: string;
    email: string;
    group?: string;
    phoneNumber: string;
}

// Список доступных групп
const availableGroups: string[] = [
    'Group 1', 'Group 2', 'Group 3', 'Group 4', 'Group 5',
    'Group 6', 'Group 7', 'Group 8', 'Group 9', 'Group 10'
];

// Функция для генерации случайных данных сотрудников
function generateRandomEmployees(count: number): Employee[] {
    const employees: Employee[] = [];
    for (let i = 0; i < count; i++) {
        employees.push({
            id: uuidv4(),
            name: `Employee ${i + 1}`,
            accountName: `account${i + 1}`,
            email: `employee${i + 1}@company.com`,
            group: availableGroups[Math.floor(Math.random() * availableGroups.length)],
            phoneNumber: `+123456789${String(i).padStart(4, '0')}`
        });
    }
    return employees;
}

app.get('/employees', (_req: Request, res: Response) => {
    const employees = generateRandomEmployees(400);
    res.json(employees);
});

app.get('/groups', (_req: Request, res: Response) => {
    res.json(availableGroups);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
