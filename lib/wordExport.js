const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');


const render = (data, templateName = 'input.docx') => {
  const template = fs.readFileSync(path.resolve(__dirname, templateName), 'binary');
  const zip = new JSZip(template);

  const doc = new Docxtemplater();

  doc.loadZip(zip);
  doc.setData(data);
  doc.render();

  return doc.getZip().generate({ type: 'nodebuffer' });
};

module.exports = { render };
