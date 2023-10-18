const Creature = require ('../models/Creature');

exports.create = ( createData)=> Creature.create(createData);

exports.getAll = ()=> Creature.find();

exports.getSingleCreature = (creatureId)=> Creature.findById(creatureId);

exports.update = (creatureId, creatureData)=> Creature.findByIdAndUpdate (creatureId, creatureData);

exports.delete = (creatureId)=> Creature.findByIdAndDelete(creatureId);

exports.getMyCreatures = (ownerId)=> Creature.find({ owner: ownerId}).populate('owner');