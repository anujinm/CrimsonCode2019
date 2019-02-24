const WolframClient = require('node-wolfram-alpha').WolframClient;
const fs = require('fs');
const client = new WolframClient('R7EXWX-EYJAPQA9G3');

const axios = require( 'axios' );

const download_image = ( url, image_path ) => axios( { 'url' : url, 'responseType' : 'stream' } ).then( response =>
{
    response.data.pipe( fs.createWriteStream( image_path ) );

    return { 'status' : true, 'error' : '' };

}).catch( error => ( { 'status' : false, 'error' : 'Error: ' + error.message } ) );


async function callWolframAlpha(name) {
    try {

        const result = await client.query('name ' + name);
        return result['data']['queryresult'];

    } catch(e) {
        console.log(e);
    }
}

async function readNames() {
    try {
        const uniqueNames = new Set();

        const files = fs.readdirSync('./names');

        for (let i = 0; i < files.length; i++) {

            const names = fs.readFileSync('./names/' + files[i], 'utf8').trim().split('\n').map(row => row.split(',')[0]);

            for (let i = 0; i < names.length; i++) {
                uniqueNames.add(names[i]);
            }
        }

        return Array.from(uniqueNames)

    } catch(e) {
        console.log(e);
    }
}



async function saveImages(name, nameObject) {
    try {

        const pods = nameObject['pods'];
        const imagePromises = [];
        for (let i = 0; i < pods.length; i++) {

            const subpods = pods[i]['subpods'];

            for (let j = 0; j < subpods.length; j++) {
                if (subpods[j].hasOwnProperty('img')) {
                    imagePromises.push(download_image(subpods[j]['img']['src'], `./results/${name}-${i}-${j}.gif`))
                }
            }
        }

        await Promise.all(imagePromises);
    } catch (e) {
        console.log(e);
    }
}


(async() => {
    const uniqueNames = await readNames();

    for (let i = 0; i < uniqueNames.length; i++) {
        const res = await callWolframAlpha(uniqueNames[i]);


        await saveImages(uniqueNames[i], res);


        fs.writeFileSync('./results/' + uniqueNames[i] + '.txt', JSON.stringify(res));



        console.log('Written: ', uniqueNames[i]);
        break;
    }

// Query wolfram for 'population of France', but only return the first pod


// Or, do the same by passing in the whole, uri-encoded URL
//     const url = 'http://api.wolframalpha.com/v2/query?appid=YOUR_APP_ID&input=population%20of%20france&podindex=1';
//     const result = await client.getFromUrl(url);

    //
    // const pods = result['data']['queryresult'];
    //
    // console.log(pods);

})();
