interface SearchProps {
  searchQuery: string;
  handleChange: (query: string) => void;
  getSearch: () => void;
}

export default SearchProps;
