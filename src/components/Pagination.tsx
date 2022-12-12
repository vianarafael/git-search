interface IPaginationProps {
  reposPerPage: number;
  totalRepos: number;
  paginate: (number: number) => void;
}

const Pagination = ({
  reposPerPage,
  totalRepos,
  paginate,
}: IPaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRepos / reposPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
