type BasicObjectType = Record<string | number | symbol, any>;

function isObject(value: any): value is BasicObjectType {
  return Object.prototype.toString.call(value) === "[object Object]";
}

type DateToString<T> = T extends Date ? string : T;

type EntityDatesTransformed<T extends {}> = {
  [K in keyof T]: DateToString<T[K]>;
};

export function transformEntitiesDatesToString<T extends {}>(
  entities: T[],
): Array<EntityDatesTransformed<T>> {
  return entities.map(entity => transformEntityDatesToString(entity));
}

export function transformEntityDatesToString<T extends {}>(
  entity: T,
): EntityDatesTransformed<T> {
  const copy: any = { ...entity };

  for (const key in copy) {
    const value = copy[key];

    if (value instanceof Date) {
      copy[key] = value.toISOString();
    } else if (Array.isArray(value)) {
      copy[key] = transformEntitiesDatesToString(value);
    } else if (isObject(value)) {
      copy[key] = transformEntityDatesToString(value);
    }
  }

  return copy;
}
