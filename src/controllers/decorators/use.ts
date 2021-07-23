import { RequestHandler } from "express";
import "reflect-metadata";

/** Imports metadata keys */
import { MetadataKeys } from "./MetadataKeys";

export const use = (middleware: RequestHandler) => {
  return (target: any, key: string, desc: PropertyDescriptor) => {
    const middlewares =
      Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];

    Reflect.defineMetadata(
      MetadataKeys.middleware,
      [...middlewares, middleware],
      target,
      key
    );
  };
};
