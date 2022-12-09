import React from "react";
import { diffWords } from "diff";
import data from "../assets/data.json";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial;
  }
`;

const Entry = styled.div`
  cursor: pointer;
`;

const SubEntry = styled.div`
  margin: 12px 0;
`;

const Added = styled.span`
  color: green;
`;

const Removed = styled.span`
  color: red;
`;

const results: any = {};

for (let i = 0; i < data.length; i++) {
  const entry = data[i];
  results[entry["Nome completo:"]] = {};

  for (let j = i + 1; j < data.length; j++) {
    const other = data[j];
    results[entry["Nome completo:"]][other["Nome completo:"]] = diffWords(
      entry["Questão 1a"],
      other["Questão 1a"],
      {
        ignoreCase: true,
      }
    );
  }
}

export function App(): JSX.Element {
  return (
    <>
      <GlobalStyles />
      {Object.keys(results).map((name) => {
        const main = results[name];

        return (
          <Entry key={name}>
            <h2>{name}</h2>

            {Object.keys(main).map((otherName) => {
              const other = main[otherName];

              return (
                <SubEntry key={otherName}>
                  <h3>{otherName}</h3>

                  {other.map((e: any) => {
                    if (e.added) {
                      return <Added>{e.value}</Added>;
                    } else if (e.removed) {
                      return <Removed>{e.value}</Removed>;
                    } else {
                      return <span>{e.value}</span>;
                    }
                  })}
                </SubEntry>
              );
            })}
          </Entry>
        );
      })}
    </>
  );
}
