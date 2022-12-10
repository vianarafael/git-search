// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Octokit } from "@octokit/core";

import Repos from "./components/Repos";
import Pagination from "./components/Pagination";

import "./App.css";

function App() {
  const [searchText, setSearchText] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage, setreposPerPage] = useState(5);

  useEffect(() => {
    const octokit = new Octokit({
      auth: "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",
      userAgent: "skylight v1",
    });

    const fetchRepos = async () => {
      setLoading(true);
      let queryArray = searchText.split(" ");
      let queryString = "";
      queryArray.forEach((word) => (queryString += word + "+"));
      queryString = queryString.slice(0, -1);
      console.log(queryString);
      const res = await octokit.request(
        `GET /search/repositories?q=${searchText}&sort=stars&order=desc`,
        {}
      );
      setRepos(res.data.items);
      setLoading(false);
    };

    if (searchText && !repos.length) {
      fetchRepos();
    } else {
      let timeoutID = setTimeout(() => {
        // do not search if input is empty
        if (searchText) {
          fetchRepos();
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

  // Get current repos
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <label>Search a repo on GitHub</label>
      <br></br>
      <input onChange={changeHandler} type="text" name="search" id="search" />
      <h1>{searchText}</h1>
      {/* <button onClick={httpReq}>Make the request</button> */}
      <Repos repos={currentRepos} loading={loading} />
      <Pagination
        reposPerPage={reposPerPage}
        totalRepos={repos.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
