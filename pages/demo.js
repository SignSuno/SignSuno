import React, { useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Input,
  Button,
  VStack,
  HStack,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
} from "@chakra-ui/react";
import FavCard from "@/components/FavCardss-front";
import { useLayoutEffect } from "react";
import axios from "axios";

// const list = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'kiwi', 'lemon', 'mango'];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState("");

  useLayoutEffect(() => {
    const userId = localStorage.getItem("user");
    setUser(userId);

    axios
      .post("http://127.0.0.1:8000/api/getPhrases", {
        username: userId,
      })
      .then((response) => {
        const xyz = response.data;
        setList(xyz);
      })
      .catch(console.log);
  }, []);
  const [list, setList] = useState([]);

  const handleSearch = () => {
    if (searchTerm === "") {
      setSearchResults([]);
    } else {
      const results = list.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    setSearchResults([]);
  };

  return (
    <Box p={4}>
      <VStack alignItems="left" spacing={4}>
        <HStack>
          <Input
            type="text"
            placeholder="Search for words"
            color="#9FB1CF"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <Button colorScheme="blue" onClick={handleSearch}>
            Search
          </Button>
        </HStack>
        <Grid
          gap={4}
          width="100%"
          templateColumns="repeat(3, minmax(200px,1fr))"
        >
          {(searchTerm === "" ? list : searchResults).map((item, index) => (
            <FavCard
              key={item}
              fav={item}
              onDelete={() => HandleDelete(item)}
            />
          ))}
        </Grid>
      </VStack>
    </Box>
  );
}
