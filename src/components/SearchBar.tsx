import axios from "axios";
import { Search } from "chakra-ui-search";
import { useEffect, useState } from "react";
import { ChangeEvent } from "react"; // Import ChangeEvent

interface ISearchResult {
  id: number;
  fname: string;
  lname: string;
}

export const SearchBar: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<ISearchResult[]>([]);

  const onValueChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue); // Update the input value
    setIsLoading(true); // Set loading to true while fetching data

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

        // Assuming the API returns an array of search results
        setResults(response.data.data as ISearchResult[]);
      } else {
        setResults([]); // Clear results if the search input is less than 4 characters
      }
    } catch (error) {
      console.error("Error searching for users:", error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching data
    }
  };

  const handleResultSelect = (selectedResult: any) => {
    // Implement your logic for handling the selected result here
    console.log("Selected Result:", selectedResult);
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
  // Render the search result as you want
  return (
    <div key={friend?.id}>
      <p>
        {friend.fname} {friend.lname}
      </p>
    </div>
  );
};
