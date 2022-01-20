// Create a tagged template lf`...` that formats text using LF line endings.
var lf = (lines, values) => {
  var msg = '';
  for (let index = 0; index < lines.length; index++) {
    const line = transformLineEnding(lines[index] ?? '', LineEndings.LF);
    let value = values[index] ?? '';

    if (value != this.disableConverter) {
      value = transformLineEnding(value, LineEndings.LF);
    }

    msg += line+value;
  }
  return msg;
};

// Create a tagged template cr`...` that formats text using CR line endings.
var cr = (lines, values) => {
  var msg = '';
  for (let index = 0; index < lines.length; index++) {
    const line = transformLineEnding(lines[index] ?? '', LineEndings.CR);
    let value = values[index] ?? '';

    if (value != this.disableConverter) {
      value = transformLineEnding(value, LineEndings.CR);
    }

    msg += line+value;
  }
  return msg;
};

// Create a tagged template crlf`...` that formats text using CRLF line endings.
var crlf = (lines, values) => {
  var msg = '';
  for (let index = 0; index < lines.length; index++) {
    const line = transformLineEnding(lines[index] ?? '', LineEndings.CRLF);
    let value = values[index] ?? '';

    if (value != this.disableConverter) {
      value = transformLineEnding(value, LineEndings.CRLF);
    }

    msg += line+value;
  }
  return msg;
};

const transformLineEnding = (string, lineEnding) => {
  string = (string != null ? string.toString() : "");

  let {replaceCR, replaceLF, replaceCRLF} = LineEndingReplacements;

  if (lineEnding === LineEndings.CR) {
    string = replaceCRLF(string, "\r");
    string = replaceLF(string, "\r");
  } else if (lineEnding === LineEndings.LF) {
    string = replaceCRLF(string, "\n");
    string = replaceCR(string, "\n");
  } else if (lineEnding === LineEndings.CRLF) {
    string = replaceCR(string, "\r\n");
    string = replaceLF(string, "\r\n");
  }
  return string;
};

const LineEndings = {
  CR: Symbol("CR"),
  LF: Symbol("LF"),
  CRLF: Symbol("CRLF")
};

const LineEndingReplacements = {
  replaceCR: (string, newEnding) =>
    string.replace(/(\r+)([^\n]|$)/g, (_match, p1, p2) => {
      return `${newEnding.repeat(p1.length)}${p2}`;
    }),

  replaceLF: (string, newEnding) =>
    string.replace(/([^\r]|^)(\n+)/g, (_match, p1, p2) => {
      return `${p1}${newEnding.repeat(p2.length)}`;
    }),

  replaceCRLF: (string, newEnding) => string.replace(/\r\n/g, `${newEnding}`)
};

module.exports = {
  lf,
  cr,
  crlf,
  LineEndings,
  transformLineEnding,
  disableConverter: Symbol('crlf-converter-disable')
};
