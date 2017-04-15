const say = require('util.say');

exports.config = {
    poolMax: 3,
    memory: {
        role: 'builder'
    },
    body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE]
};

exports.run = (creep) => {
    
    if (!creep.memory.sourceCounter) {
        creep.memory.sourceCounter = Math.round(1 + Math.random() * 10);
    }

    if(creep.memory.building && creep.carry.energy == 0) {
        creep.memory.building = false;
        creep.memory.sourceCounter += 1;
        say.harvest(creep);
    }
    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
        creep.memory.building = true;
        say.build(creep);
    }

    if(creep.memory.building) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(targets.length) {
            if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
    else {
        var sources = creep.room.find(FIND_SOURCES);
        const source = sources[creep.memory.sourceCounter % sources.length];
        
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
};
