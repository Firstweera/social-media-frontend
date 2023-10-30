import axios from "axios";
import { Search } from "chakra-ui-search";
import { useContext, useEffect, useState } from "react";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

interface ISearchResult {
  id: number;
  fname: string;
  lname: string;
}

export const SearchBar: React.FC = () => {
  const { setUser } = useContext(UserContext);
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<ISearchResult[]>([]);
  const navigate = useNavigate();

  const onValueChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setIsLoading(true);
    try {
      if (newValue.length > 2) {
        const response = await axios.post(
          `${import.meta.env.VITE_PUBLIC_BASE_URL}/user/searchUser`,
          {
            searchInput: newValue,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        setResults(response.data.data as ISearchResult[]);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error searching for users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultSelect = (selectedResult: {
    fname: string;
    id: number;
    lname: string;
  }) => {
    console.log("Selected Result:", selectedResult);

    setUser({
      isAuthen: true,
      profileMode: {
        mode: "friendProfile",
        userId: selectedResult?.id,
      },
    });
    navigate("/profile");
  };

  const renderResult = (friend: ISearchResult) => {
    return <SearchResult friend={friend} />;
  };

  useEffect(() => {
    console.log("results", results);
  }, [results]);

  return (
    <>
      <div className="tw-fixed tw-top-3">
        <Search
          placeholder="Search friend..."
          value={value}
          isLoading={isLoading}
          onSearchChange={onValueChange}
          searchResults={results}
          onResultSelect={handleResultSelect}
          resultRenderer={renderResult}
        />
      </div>
    </>
  );
};

type SearchResultProps = {
  friend: ISearchResult; // Replace YourBookType with the actual type of your search results
};

const SearchResult: React.FC<SearchResultProps> = ({ friend }) => {
  return (
    <div key={friend?.id}>
      <p>
        {friend.fname} {friend.lname}
      </p>
    </div>
  );
};
