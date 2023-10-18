const Creature = require ('../models/Creature');

exports.create = ( createData)=> Creature.create(createData);

exports.getAll = ()=> Creature.find();

exports.getSingleCreature = (creatureId)=> Creature.findById(creatureId);