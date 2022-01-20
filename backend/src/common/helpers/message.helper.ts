import { readFileSync } from 'fs';


const messages = JSON.parse(readFileSync(__dirname + '/messages.json', 'utf-8'));

export const getMessage = (path: string) => {
    return messages[path] || null;
};
