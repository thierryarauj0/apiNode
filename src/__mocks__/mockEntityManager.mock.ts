import { EntityManager } from "typeorm";

interface MockManagerArgs  { 
    safeReturn?: object | [object];
}

export const getMockEntityManager = async({
    safeReturn = undefined
}:MockManagerArgs):Promise<EntityManager> => {
    const manager : Partial<EntityManager> = {}

    manager.save = jest.fn().mockImplementation( () => Promise.resolve(safeReturn))

    return manager as EntityManager;
}