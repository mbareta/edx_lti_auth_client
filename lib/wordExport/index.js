const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');
const expressions = require('angular-expressions');
const fs = require('fs');
const path = require('path');

const render = (data, templateName = 'input.docx') => {
  const template = fs.readFileSync(path.resolve(__dirname, templateName), 'binary');
  const zip = new JSZip(template);
  const angularParser = tag => ({
    get: tag === '.' ? s => s : expressions.compile(tag.replace(/’/g, "'")),
  });

  const doc = new Docxtemplater();

  doc.loadZip(zip);
  doc.setOptions({ parser: angularParser });
  doc.setData(data);
  doc.render();

  return doc.getZip().generate({ type: 'nodebuffer' });
};

module.exports = { render };
