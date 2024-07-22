import { EntityManager } from "typeorm";

interface MockManagerArgs  { 
    safeReturn?: object | [object];
    findOneReturn?: object | [object];
}

export const getMockEntityManager = async({
    safeReturn = undefined,
    findOneReturn = undefined,
}:MockManagerArgs):Promise<EntityManager> => {
    const manager : Partial<EntityManager> = {}

    manager.save = jest.fn().mockImplementation( () => Promise.resolve(safeReturn))
    manager.findOne = jest.fn().mockImplementation( () => Promise.resolve(findOneReturn)) 
    return manager as EntityManager;
}