/**
 * Created by JOHNNY on 21/02/14.
 * permet de vérifier l'identite du client
 */
var mongoose = require('mongoose'),
    text = "",
    crypto = require('crypto'),
    key = 'bonjourbonsoir',
    algorithm = 'sha1',
    hash,
    hmac;
module.exports = {
    verifieIdentite: function (req) {
        var body = req.body,
            timestamp = reg.param('time'),
            login = req.param('login'),
            signature = req.param('signature');
        /*Find du client*/
        Client.findOne({pseudo: login}, function (err, client) {
            if (err)//Si on en trouve pas le client
            {
                return false;//On retourne false
            }
            else {
                var password = client.password;
                //console.log(password)
                Timestamp.find({client: client.pseudo}).sort({_id: 'descending'}).limit(1).exec(function (err, docTimestamp) {//On récupère le dernier timestamp du client
                    var timestampClient;

                    if (!docTimestamp.length) {
                        timestampClient = 0;
                    }
                    else {
                        timestampClient = docTimestamp[0];
                    }
                    //console.log(currentTimestamp);
                    if (parseInt(timestampClient.timestamp) < parseInt(timestamp))//Si le timestamp en base est plus petit que le timestamp reçut
                    {
                        /*Vérification signature*/
                        Object.keys(body).forEach(function (key) {
                            text += body[key];
                        });
                        text += password;
                        hmac = crypto.createHmac(algorithm, key);
                        hmac.setEncoding('hex');
                        hmac.write(text);
                        hmac.end();
                        hash = hmac.read();
                        if (hash == signature) //Si les signatures correspondent
                        {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else //Sinon on retourne false, car celà veut dire que la requete à déjà été envoyée
                    {
                        return false;
                    }
                });
            }
        });
    }
}