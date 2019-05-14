
const db = require('../models');
const utils = require('./utils');
module.exports = 
{
    circuit : async (req,res) => 
    {
        try
        {
            let circuit = await db.Circuit.findByPk(req.params.id_circuit,{attributes : ['name','description','duration','need_internet','level']})
            res.json(circuit);
        }
        
        catch(err)
        {
            res.status(500).send(utils.messages.serverError);
        }
    },

    downloadCircuit : async (req,res) =>
    {
        if(utils.verifToken(req.headers['authorization']))
        {
            try
            {
                let circuit = await db.Circuit.findOne(
                {
                    where : {id_circuit : req.params.id_circuit},
                    attributes : ['name','description','duration','need_internet','level'],
                    include : 
                    [
                        {
                            model : db.Step,
                            attributes : ['id_step','name','latitude','longitude','description','order','instruction','validation'],
                            include : 
                            [
                                {
                                    model : db.Question,
                                    attributes : ['id_question','wording','response','type_of','points']
                                }
                            ]
                        }
                    ]
                });
                
                res.status(200).send(circuit);
            }

            catch
            {
                res.status(500).send(utils.messages.serverError);
            }
        }
        else
            res.status(401).send(utils.messages.invalidToken);
    },

    //////////////////////////////////////////////////////////

    nearbyCircuits : async (req,res) =>
    {
        console.log("ah")
        try
        {
           
            let steps = await db.Step.findAll({where : {order : 0}});
            let dist = 0;
            const map = steps.map(async step =>
            {
                dist = await utils.distanceBetweenPoints(step.latitude,req.body.user_latitude,step.longitude,req.body.user_longitude);
                if(dist <= req.body.distance)
                {
                    return await db.Circuit.findOne(
                    {
                        where : {id_circuit : step.id_circuit, published : 1},
                        include : 
                        [
                            {
                                model : db.Step,
                                where : {order: 0},
                                attributes : ['latitude','longitude']
                            },
                            {
                                model : db.Evaluation
                            }
                        ]
                    });
                }
            });

            const circuits = await Promise.all(map);

            let c = [];
            let count = 0;
            let currentCircuit = null;
            circuits.map((circuit) => 
            {
                if(circuit)
                {
                    currentCircuit = circuit.toJSON();
                    note = 0;
                    count = 0;
                    currentCircuit.Evaluations.map(eval =>
                    {
                        note+= eval.stars;
                        count++;
                    });
                    if(count)
                        currentCircuit.note = Math.round( (note / count) * 10 ) / 10;
                    
                    else
                        currentCircuit.note = 0;

                    c.push(currentCircuit)   
                }     
            });

            res.status(201).send(c);
        }

        catch(err)
        {
            res.status(500).send(utils.messages.serverError);
        }
    },

    //////////////////////////////////////////////////////////

    circuits : async (req,res) => 
    {
        try
        {
            res.status(200).send(await db.Circuit.findAll())
        }
        
        catch
        {
            res.status(500).send(utils.messages.serverError);
        }
    },

    //////////////////////////////////////////////////////////

    myCircuits : async (req,res) => 
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            try
            {
               res.json(await db.Circuit.findAll({where : {id_user : id_user}}))
            }
            
            catch
            {
                res.status(500).send(utils.messages.serverError);
            }
        }
        else
            res.status(401).send(utils.messages.invalidToken);
    },

    //////////////////////////////////////////////////////////

    createCircuit : async (req,res) =>
    {
        try
        {
            let id_user = utils.verifToken(req.headers['authorization']);
            if(id_user)
            {
                let circuit = await db.Circuit.create(
                {
                    name : req.body.name,
                    description : req.body.description,
                    length : req.body.length,
                    duration : req.body.duration,
                    need_internet : req.body.need_internet,
                    published : 1,
                    version : 1,
                    level : req.body.level,
                    id_user : id_user
                });

                await utils.createFolder(circuit.id_circuit,1)
                res.status(201).send(circuit);
            }
            else
                res.status(401).send(utils.messages.invalidToken);
            }

        catch
        {
            res.status(500).send(utils.messages.serverError);
        }
    },

    //////////////////////////////////////////////////////////

    publicationCircuit : async (req,res) =>
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            try
            {
                let circuit = await db.Circuit.findOne({where : {id_circuit : req.body.id_circuit}});
                await circuit.update({published: !circuit.published});
                res.sendStatus(204)
            }

            catch
            {
                res.status(500).send(utils.messages.serverError);
            }
        }
        else
            res.status(401).send(utils.messages.invalidToken);
    },

    //////////////////////////////////////////////////////////

    deleteCircuit : async (req,res) =>
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            try
            {
                await db.Circuit.destroy({where : {id_circuit : req.body.id_circuit}})
                res.sendStatus(204);
            }

            catch
            {
                res.status(500).send(utils.messages.serverError);
            }
        }
        else
            res.status(401).send(utils.messages.invalidToken);
    },

    //////////////////////////////////////////////////////////

    publishedCircuits : async (req,res) =>
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
           try
           {
                res.json(await db.Circuit.findAll({where : {published : true}}))
           }
        
           catch
           {
                res.status(500).send(utils.messages.serverError);
           }
        }
        else
            res.status(401).send(utils.messages.invalidToken);
    },

    //////////////////////////////////////////////////////////

    updateCircuit : async (req, res) =>
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            try
            {
                let circuit = await db.Circuit.findByPk(req.params.id_circuit);
                if(circuit.id_user === id_user) 
                {
                    await circuit.update(req.body);
                    res.status(200).send(circuit);
                }

                else
                    res.sendStatus(403);
            }

            catch
            {
                res.status(500).send(utils.messages.serverError)
            }
        }
        else
            res.status(401).send(utils.messages.invalidToken);
    },

    test : (req,res) =>
    {
        console.log(req.body)
    }
}


