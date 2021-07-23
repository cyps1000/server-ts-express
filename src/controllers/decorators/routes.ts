import { RequestHandler } from "express";
import "reflect-metadata";

/** Imports route methods */
import { Methods } from "./Methods";

/** Imports metadata keys */
import { MetadataKeys } from "./MetadataKeys";

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

const routeBinder = (method: string) => {
  return (path: string) => {
    return (target: any, key: string, desc: RouteHandlerDescriptor) => {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    };
  };
};

export const get = routeBinder(Methods.get);
export const put = routeBinder(Methods.put);
export const post = routeBinder(Methods.post);
export const del = routeBinder(Methods.del);
export const patch = routeBinder(Methods.patch);
