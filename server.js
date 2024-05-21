import express from 'express';
import cors from "cors";
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
const app = express();
app.use(cors());
const port = 3000;
// Список доступных групп
const availableGroups = [
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
function generateRandomEmployees(count) {
    const employees = [];
    for (let i = 0; i < count; i++) {
        employees.push({
            id: uuidv4(),
            name: faker.person.fullName(),
            accountName: faker.internet.userName(),
            email: faker.internet.email(),
            group: Math.random() * 10 < 3 ? null : availableGroups[Math.floor(Math.random() * availableGroups.length)],
            position: faker.person.jobTitle(),
            phoneNumber: faker.helpers.fromRegExp('+[0-9]{3}([0-9]{3})[0-9]{3}-[0-9]{2}-[0-9]{2}'),
        });
    }
    return employees;
}
app.get('/employees', (_req, res) => {
    const employees = generateRandomEmployees(400);
    res.json(employees);
});
app.get('/groups', (_req, res) => {
    res.json(availableGroups);
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
