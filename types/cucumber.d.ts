declare module '@cucumber/cucumber' {
    export function Given(pattern: string, callback: (...args: any[]) => void | Promise<void>): void;
    export function When(pattern: string, callback: (...args: any[]) => void | Promise<void>): void;
    export function Then(pattern: string, callback: (...args: any[]) => void | Promise<void>): void;
} 