const say = require('util.say');

exports.config = {
    poolMax: 6,
    memory: {
        role: 'harvester'
    },
    body: [WORK, WORK, CARRY, MOVE]
};

exports.run = (creep) => {
    if (!creep.memory.sourceCounter) {
        creep.memory.sourceCounter = Math.round(1 + Math.random() * 10);
    }
    
    if(creep.carry.energy < creep.carryCapacity) {
        var sources = creep.room.find(FIND_SOURCES);
        // sources = sources.concat(creep.room.find(FIND_SOURCES));
        
        const source = sources[creep.memory.sourceCounter % sources.length];
        
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            
            var energy = creep.pos.findInRange(
                FIND_DROPPED_ENERGY,
                1
            );
    
            if (energy.length) {
                console.log('found ' + energy[0].energy + ' energy at ', energy[0].pos);
                creep.pickup(energy[0]);
            } else {
            
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
    else {
        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
        });
        
        if(targets.length > 0) {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            } else {
                creep.memory.sourceCounter += 1;
            }
        }
    }
};
