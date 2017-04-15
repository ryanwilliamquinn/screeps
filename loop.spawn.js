exports.run = () => {
    const spawn1 = Game.spawns['Spawn1'];

    if (spawn1.spawning) {
        var spawningCreep = Game.creeps[spawn1.spawning.name];
        spawn1.room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            spawn1.pos.x + 1,
            spawn1.pos.y,
            {align: 'left', opacity: 0.8});
    }
}
