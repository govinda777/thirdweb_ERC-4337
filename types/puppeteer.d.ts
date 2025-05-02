declare module 'puppeteer' {
    export interface Browser {
        newPage(): Promise<Page>;
        close(): Promise<void>;
    }

    export interface Page {
        goto(url: string): Promise<void>;
        click(selector: string): Promise<void>;
        type(selector: string, text: string): Promise<void>;
        waitForSelector(selector: string): Promise<ElementHandle>;
        $$(selector: string): Promise<ElementHandle[]>;
        evaluate<T>(pageFunction: () => T): Promise<T>;
    }

    export interface ElementHandle {
        textContent(): Promise<string | null>;
    }

    export function launch(options?: { headless?: boolean }): Promise<Browser>;
    export const chromium: {
        launch(options?: { headless?: boolean }): Promise<Browser>;
    };
} 