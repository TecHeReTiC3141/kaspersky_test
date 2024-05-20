import express, { Request, Response } from 'express';
import cors from "cors";
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';


const app = express();
app.use(cors());
const port = 3000;

interface Employee {
    id: string;
    name: string;
    accountName: string;
    email: string;
    group?: string;
    position: string;
    phoneNumber: string;
}

// Список доступных групп
const availableGroups: string[] = [
    'Frontend Developers',
    'Backend Developers',
    'DevOps',
    'QA Engineers',
    'Designers',
    'Project Managers',
    'Product Owners',
    'HR',
    'Marketing',
    'Support'
];

// Функция для генерации случайных данных сотрудников
function generateRandomEmployees(count: number): Employee[] {
    const employees: Employee[] = [];
    for (let i = 0; i < count; i++) {
        employees.push({
            id: uuidv4(),
            name: faker.person.fullName(),
            accountName: faker.internet.userName(),
            email: faker.internet.email(),
            group: availableGroups[ Math.floor(Math.random() * availableGroups.length) ],
            position: faker.person.jobTitle(),
            phoneNumber: faker.helpers.fromRegExp('+[0-9]{3}([0-9]{3})[0-9]{3}-[0-9]{2}-[0-9]{2}'),
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
