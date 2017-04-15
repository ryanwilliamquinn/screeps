exports.maintainCreepCount = (config, spawn) => {
    const role = config.memory.role;

    const creeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);

    if (creeps.length < config.poolMax && spawn.canCreateCreep(config.body) === OK) {
        const creepName = spawn.createCreep(config.body, undefined, config.memory);
    }
};
