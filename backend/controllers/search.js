const WolframClient = require('node-wolfram-alpha').WolframClient;
const client = new WolframClient('R7EXWX-EYJAPQA9G3');
// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate');
// Your Google Cloud Platform project ID
const projectId = 'translate-testin-1540311383431';

// Instantiates a client
const translate = new Translate({
    projectId: projectId,
    keyFilename: './controllers/Translate-Testing-de2b3be52b53.json'
});

async function translate_api(text, target) {
    try {
        // Translates some text into Russian
        const r = await translate.translate(text, target);
        return r[0];
    } catch (e) {
        console.log(e);
        return ''
    }
}


async function callWolframAlpha(name, target) {
    try {
        const result = (await client.query('name ' + name))['data']['queryresult'];
        const pods = result['pods'];

        if (target && target === 'mn') {
            const translate_promises = [];

            for (let i = 0; i < pods.length; i++) {
                translate_promises.push(translate_api(pods[i]['title'], target));

                const subPods = pods[i]['subpods'];

                for (let j = 0; j < subPods.length; j++) {
                    translate_promises.push(translate_api(subPods[j]['title'], target));
                    translate_promises.push(translate_api(subPods[j]['plaintext'], target));
                }
            }

            let index = 0;

            const translate_response = await Promise.all(translate_promises);

            for (let i = 0; i < pods.length; i++) {
                pods[i]['title'] = translate_response[index];
                index++;

                const subPods = pods[i]['subpods'];

                for (let j = 0; j < subPods.length; j++) {
                    subPods[j]['title'] = translate_response[index];
                    index++;
                    subPods[j]['plaintext'] = translate_response[index];
                    index++;
                }
            }
        }

        return result;

    } catch(e) {
        console.log(e);
    }
}


exports.searchName = async (req, res, next) => {
    try {
        const name = req.params.name;
        const target = req.query.target;
        return res.status(200).json(await callWolframAlpha(name, target));


    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Server error'});
    }
};
