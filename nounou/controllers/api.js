/**
 * Created by JOHNNY on 08/02/14.
 */
/*Variables déclaration*/
var mongoose = require('mongoose');

/**/
module.exports = {
    getNounous : function(req,res){
        return Nounou.find(function (err, nounous) {
            if (!err) {
                return res.send(nounous,200);
            } else {
                return res.send(err,500);
            }
        });
    },
    createNounou : function(req,res){
        var body = req.body,
            newNounou;
        /*Log console*/
        console.log("POST : Creation d'une nounou :");
        console.log(body);
        /*Creation du modèle*/
        newNounou = new Nounou({nom:body.nom,prenom:body.prenom,dateDeNaissance:body.dateDeNaissance,civilite:body.civilite,adresse:body.adresse,email:body.email,tarifHoraire:body.tarifHoraire,descriptionPrestation:body.descriptionPrestation,telephone:body.telephone});
        newNounou.save(function (err, doc) {
            if (err) {
                res.respond(405);/*Les parametres reçut ne sont pas acceptables*/
            } else {
                res.send({"status": 200, "error": null});
            }

        });
    },
    getOneNounou : function(req,res){
        var idNounou = req.param('id');
        Nounou.findById(idNounou,function(err,nounou){
            if(err)
            {
                res.respond(405);/*L'id envoyé n'existe pas*/
            }
            else
            {
                res.send(nounou);
            }
        });
    },
    updateNounou : function(req,res){
        var idnounou = req.param('id'),
            body = req.body;
        Nounou.findById(idnounou,function(err,nounou){
            if(err || nounou.isNull){//Si on a une erreur ou que l'objet n'est pas construit
                res.respond(405); //on renvoie une erreur 405 Invalid arguments
            }
            else
            {
                //affectation des nouveaux paramètres
                nounou.nom = body.nom;
                nounou.prenom = body.prenom;
                nounou.dateDeNaissance = body.dateDeNaissance;
                nounou.civilite = body.civilite;
                nounou.adresse = body.adresse;
                nounou.email = body.email;
                nounou.tarifHoraire = body.tarifHoraire;
                nounou.descriptionPrestation = body.descriptionPrestation;
                nounou.telephone = body.telephone;
                /*Sauvegarde des modifications*/
                nounou.save(function(err,doc){
                    if(err){//Si il y a une erreur lors du save
                        res.send({status : 500,error:err});
                    }
                    else{
                        res.send(doc);//Sinon on renvoi l'objet nounou mis à jour
                    }
                });
            }
        });
    }
}