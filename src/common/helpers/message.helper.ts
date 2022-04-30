import * as messages from './messages.json';

export const getMessage = (path: string) => {
    return messages[path] || null;
};
