import {
  Log,
  LogFunction,
  LogLevel,
  LogLevels,
  LogCollector,
} from "@/types/logs";

export function createLogCollector(): LogCollector {
  const logs: Log[] = [];
  const getAll = () => logs;

  const logFunctions = {} as Record<LogLevel, LogFunction>;

  LogLevels.forEach(
    (level) =>
      (logFunctions[level] = (message: string) => {
        logs.push({
          message,
          level,
          timeStamp: new Date(),
        });
      })
  );

  return {
    getAll,
    ...logFunctions,
  };
}
