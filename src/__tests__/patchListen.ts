import type { Application } from "express";

export const patchListen = (app: Application) => {
  const anyApp = app as Application & { __patchedListen?: boolean };
  if (anyApp.__patchedListen) return;

  const originalListen = app.listen.bind(app);
  app.listen = ((...args: any[]) => {
    if (args.length === 0) return originalListen(0, "127.0.0.1");
    if (args.length === 1 || typeof args[1] === "function") {
      return originalListen(args[0], "127.0.0.1", ...args.slice(1));
    }
    return originalListen(...(args as Parameters<Application["listen"]>));
  }) as Application["listen"];

  anyApp.__patchedListen = true;
};
