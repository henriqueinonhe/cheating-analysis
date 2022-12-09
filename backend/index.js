const lcs = require("string-algorithms").longestCommonSubstring;
const fs = require("fs");
const diff = require("diff");

const data = JSON.parse(fs.readFileSync("data.json").toString());

const results = {};

for (let i = 0; i < data.length; i++) {
  const entry = data[i];
  results[entry["Nome completo:"]] = {};

  for (let j = i + 1; j < data.length; j++) {
    const other = data[j];
    results[entry["Nome completo:"]][other["Nome completo:"]] = diff.diffWords(
      entry["Questão 3"],
      other["Questão 3"],
      {
        ignoreCase: true,
      }
    );
  }
}

fs.writeFileSync("results.json", JSON.stringify(results, null, 2));
