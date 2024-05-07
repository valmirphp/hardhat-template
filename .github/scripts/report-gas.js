const fs = require('fs');
const readline = require('readline');

const readStream = fs.createReadStream('gas_report.txt');

const rl = readline.createInterface({
  input: readStream,
  output: process.stdout,
  terminal: false,
});

let markdownTable = '## 📊 Gas Report\n';
let tableStarted = false;
let firstBottomLine = true;

markdownTable +=
  '| Contract | Method | Min | Max | Avg | # calls | usd (avg) |\n| --- | --- | --- | --- | --- | --- | --- |\n';

rl.on('line', (line) => {
  // If the table has not started yet, check if this line is the start of the table
  if (!tableStarted) {
    if (
      line.includes(
        '·----------------------------------|----------------------------|-------------|-----------------------------·',
      )
    ) {
      tableStarted = true;
    }
  }

  // If the table has started, process the line
  if (!tableStarted) {
    return;
  }

  // Match the line with the regex
  const match = line.match(/\|(.*?)·(.*?)·(.*?)·(.*?)·(.*?)·(.*?)·(.*?)/);
  if (match && match[1]?.trim() !== 'Contract' && match[1]?.trim() !== '') {
    markdownTable += '| ' + match.slice(1).join(' | ') + ' |\n';
    return;
  }

  // Match the bottom line of the table with the regex
  const matchBottom = line.match(/\|(.*?)·(.*?)·(.*?)·(.*?)·(.*?)·(.*?)/);
  if (
    matchBottom &&
    matchBottom[1]?.trim() !== '' &&
    matchBottom[1]?.trim() !== '---' &&
    matchBottom[1]?.trim() !== 'Contract'
  ) {
    if (firstBottomLine) {
      markdownTable += '| Deployments| | | | | % of limit | |\n';
      firstBottomLine = false;
    }

    let cols = matchBottom.slice(1);
    cols = [cols[0], null, ...cols.slice(1)];
    markdownTable += '| ' + cols.join(' | ') + ' |\n';
  }
});

rl.on('close', () => {
  fs.writeFile('gas_report.md', markdownTable, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
});
