const WolframClient = require('node-wolfram-alpha').WolframClient;
const fs = require('fs');
const client = new WolframClient('R7EXWX-EYJAPQA9G3');



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

        // console.log(uniqueNames.size);

        return Array.from(uniqueNames)

    } catch(e) {
        console.log(e);
    }
}





(async() => {
    const uniqueNames = await readNames();

    for (let i = 0; i < uniqueNames.length; i++) {
        const res = await callWolframAlpha(uniqueNames[i]);

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
