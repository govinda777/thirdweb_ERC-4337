
// utils/logger.ts
const colors = {
    title: 'color: #2563eb; font-weight: bold; font-size: 14px;',
    info: 'color: #0ea5e9; font-weight: normal;',
    success: 'color: #10b981; font-weight: normal;',
    warning: 'color: #f59e0b; font-weight: normal;',
    error: 'color: #ef4444; font-weight: normal;',
    object: 'color: #8b5cf6; font-weight: normal;',
    highlight: 'background: #374151; color: #f3f4f6; padding: 2px 4px; border-radius: 2px;'
  };
  
  export const logger = {
    group: (title: string) => {
      console.group(`%c${title}`, colors.title);
    },
    
    groupEnd: () => {
      console.groupEnd();
    },
    
    info: (message: string, data?: any) => {
      console.log(`%c${message}`, colors.info);
      if (data) {
        console.log('%cData:', colors.object, data);
      }
    },
    
    success: (message: string, data?: any) => {
      console.log(`%c${message}`, colors.success);
      if (data) {
        console.log('%cData:', colors.object, data);
      }
    },
    
    warning: (message: string, data?: any) => {
      console.log(`%c${message}`, colors.warning);
      if (data) {
        console.log('%cData:', colors.object, data);
      }
    },
    
    error: (message: string, data?: any) => {
      console.log(`%c${message}`, colors.error);
      if (data) {
        console.log('%cData:', colors.object, data);
      }
    },
    
    prettyObject: (obj: any, title?: string) => {
      if (title) {
        console.log(`%c${title}:`, colors.title);
      }
      console.log(JSON.stringify(obj, null, 2));
    },
    
    table: (data: any[], columns?: string[]) => {
      console.table(data, columns);
    },
    
    envConfig: (config: Record<string, any>) => {
      logger.group('🔧 Environment Configuration');
      
      Object.entries(config).forEach(([key, value]) => {
        console.log(
          `%c${key}: %c${value}`,
          'color: #6366f1; font-weight: bold;',
          'color: #f97316; background: rgba(249, 115, 22, 0.1); padding: 2px 4px; border-radius: 2px;'
        );
      });
      
      logger.groupEnd();
    }
  };
  