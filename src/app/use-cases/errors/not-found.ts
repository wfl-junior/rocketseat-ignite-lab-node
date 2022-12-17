export class EntityNotFoundError extends Error {
  constructor(entity = "Entity") {
    super(`${entity} not found.`);
  }
}
