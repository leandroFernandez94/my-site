const fs = require('fs');

function getValueByPath(object, path) {
  const parts = path.split('.');
  let current = object;

  for (const part of parts) {
    if (current == null || !Object.prototype.hasOwnProperty.call(current, part)) {
      return undefined;
    }
    current = current[part];
  }

  return current;
}

function replaceTemplateTags(template, content) {
  let result = '';
  let currentIndex = 0;

  while (currentIndex < template.length) {
    const start = template.indexOf('{{', currentIndex);

    if (start === -1) {
      result += template.slice(currentIndex);
      break;
    }

    result += template.slice(currentIndex, start);

    const end = template.indexOf('}}', start + 2);
    if (end === -1) {
      result += template.slice(start);
      break;
    }

    const key = template.slice(start + 2, end).trim();
    const value = getValueByPath(content, key);

    if (value === undefined || value === null) {
      throw new Error(`Missing content key: ${key}`);
    }

    result += String(value);
    currentIndex = end + 2;
  }

  return result;
}

function replaceFromFiles(templatePath, contentPath) {
  const template = fs.readFileSync(templatePath, 'utf8');
  const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
  return replaceTemplateTags(template, content);
}

module.exports = {
  replaceTemplateTags,
  replaceFromFiles
};
