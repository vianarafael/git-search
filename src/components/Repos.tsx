interface IReposProps {
  repos: Array<string | any>; // #TODO: remove that any
  loading: boolean;
}

export default function Repos({ repos, loading }: IReposProps) {
  if (loading) {
    return <h2>Loading</h2>;
  }
  return (
    <ul className="list-group mb-4">
      {repos.map((item, id) => (
        <li key={id} className="list-group-item">
          <a href={item.html_url}>
            <p>{item.name}</p>
            <p>{item.description}</p>
          </a>
          <p>Language: {item.language}</p>
        </li>
      ))}
    </ul>
  );
}
