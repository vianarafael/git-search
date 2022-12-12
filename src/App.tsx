import { useState, useEffect, SetStateAction } from "react";
import { Octokit } from "@octokit/core";

import Repos from "./components/Repos";
import Pagination from "./components/Pagination";

import "./App.css";

const App = () => {
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
  }, [searchText]);

  const changeHandler = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchText(event.target.value);
  };

  // Get current repos
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

  // Change Page
  const paginate = (pageNumber: SetStateAction<number>) =>
    setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">Search a repo on GitHub</h1>
      <input onChange={changeHandler} type="text" name="search" id="search" />
      <Repos repos={currentRepos} loading={loading} />
      <Pagination
        reposPerPage={reposPerPage}
        totalRepos={repos.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
