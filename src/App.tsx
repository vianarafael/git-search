// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Octokit } from "@octokit/core";

import "./App.css";

function App() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const octokit = new Octokit({
      auth: "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",
      userAgent: "skylight v1",
    });

    const httpReq = async () => {
      let queryArray = searchText.split(" ");
      let queryString = "";
      queryArray.forEach((word) => (queryString += word + "+"));
      queryString = queryString.slice(0, -1);
      console.log(queryString);
      const res = await octokit.request(
        `GET /search/repositories?q=${searchText}&sort=stars&order=desc`,
        {}
      );
      setSearchResults(res.data.items);
      console.log(res.data.items);
    };

    if (searchText && !searchResults.length) {
      httpReq();
    } else {
      let timeoutID = setTimeout(() => {
        // do not search if input is empty
        if (searchText) {
          httpReq();
        }
      }, 500);

      return () => {
        clearTimeout(timeoutID);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const changeHandler = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="App">
      <label>Search a repo on GitHub</label>
      <br></br>
      <input onChange={changeHandler} type="text" name="search" id="search" />
      <h1>{searchText}</h1>
      {/* <button onClick={httpReq}>Make the request</button> */}
      {searchResults.map((item) => (
        <div>
          <a href={item.html_url}>
            <h2>{item.name}</h2>
            <h3>{item.description}</h3>
          </a>
          <p>{item.language}</p>
          <p>Last update: {item.updated_at}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
