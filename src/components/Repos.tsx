// @ts-nocheck

import React from "react";

export default function Repos({ repos, loading }) {
  if (loading) {
    return <h2>Loading</h2>;
  }
  return (
    <ul>
      {repos.map((item, id) => (
        <li key={id}>
          <a href={item.html_url}>
            <p>{item.name}</p>
            <p>{item.description}</p>
          </a>
          <p>{item.language}</p>
          <p>Last update: {item.updated_at}</p>
        </li>
      ))}
    </ul>
  );
}
