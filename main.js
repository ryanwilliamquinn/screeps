const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const creepCount = require('util.creepCount');
const loopSpawn = require('loop.spawn');

exports.loop = () => {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // SPAWNING
    const spawn1 = Game.spawns['Spawn1'];
    creepCount.maintainCreepCount(roleHarvester.config, spawn1);
    creepCount.maintainCreepCount(roleUpgrader.config, spawn1);
    creepCount.maintainCreepCount(roleBuilder.config, spawn1);

    // SPAWN MANAGEMENT
    loopSpawn.run();

    // var tower = Game.getObjectById('4f4f69dac6cee52a4b964380');
    // if(tower) {
    //     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    //         filter: (structure) => structure.hits < structure.hitsMax
    //     });
    //     if(closestDamagedStructure) {
    //         tower.repair(closestDamagedStructure);
    //     }
    //
    //     var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    //     if(closestHostile) {
    //         tower.attack(closestHostile);
    //     }
    // }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
