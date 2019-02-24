const fs = require("fs")
let path = require('path');
const querystring = require('querystring');
const url = require("url");
let filepath = path.join(__dirname, '/svg.txt');
const lines = fs.readFileSync(filepath).toString().split("\n");
let outpath = path.join(__dirname, 'out.txt');
let i = 0;
lines.map(line => {
    
    if (line) {
        // setup 1
        let res = line.split('-H "pragma');        
        if (res) {
            // setup 2
            let urlstr = res[0].replace('curl "', '').replace('"', '');
            if (urlstr) {
                console.log(urlstr);
                let pseurl = url.parse(urlstr);
                console.log(pseurl.pathname);
                let filereg = /([^\\/]+)\.([^\\/]+)/i;
                let filename = filereg.exec(pseurl.pathname);
                if (filename) {
                    // console.log(urlstr.trim() + filename[0]);
                    let formaturl = urlstr.trim();
                    if (/\/get/.test(formaturl)) {
                        formaturl += filename[0] + '\n';
                    }
                    else {
                        formaturl += '\n';
                        // fs.writeFileSync(outpath, formaturl, {flag: 'a'});
                    }
                    
                    fs.writeFileSync(outpath, formaturl, {flag: 'a'});
                } 
                
            }
        }
        console.log(i);
        i++;
    }
    
});