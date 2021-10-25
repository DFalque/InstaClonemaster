import { Search as SearchSU } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import "./Search.css";
import { useEffect, useState } from "react";
import { SEARCH } from "../../../gql/user";
import { size } from "lodash";
import { Link } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState(null);
  const [results, setResults] = useState([]);
  const { data, loading } = useQuery(SEARCH, {
    variables: {
      search,
    },
  });

  useEffect(() => {
    if (size(data?.search) > 0) {
      const users = [];
      data.search.forEach((user, index) => {
        users.push({
          key: index,
          title: user.name,
          username: user.username,
          avatar: user.avatar,
        });
      });
      setResults(users);
    } else {
      setResults([]);
    }
  }, [data]);

  // FUNCTIONS
  const onChange = (e) => {
    if (e.target.value) {
      setSearch(e.target.value);
    } else {
      setSearch(null);
    }
  };

  const handlerResultSelect = () => {
    setSearch(null);
    setResults([]);
  };

  console.log(data);

  return (
    <SearchSU
      className="Search-user"
      fluid
      input={{ icon: "search", iconPosition: "left" }}
      onSearchChange={(e) => onChange(e)}
      loading={loading}
      value={search || ""}
      onResultSelect={handlerResultSelect}
      results={results}
      resultRenderer={(e) => <ResultSearch data={e} />}
    />
  );
};

export default Search;

function ResultSearch(props) {
  const { data } = props;

  return (
    <Link to={`/${data.username}`}>
      <h2>{data.title}</h2>
      <h2>{data.username}</h2>
    </Link>
  );
}
