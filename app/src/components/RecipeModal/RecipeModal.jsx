import React, { useRef } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  InputLabel,
  FormControl,
  TextField,
  Select,
} from "@mui/material";
import { apiDomain } from "../../utils/utils";
import useFetch from "../../hooks/useFetch";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FormLabel } from "@chakra-ui/react";

//example of creating a mui dialog modal for creating new rows
const RecipeModal = ({
  open,
  columns,
  onClose,
  handleSaveRowEdits,
  handleCreateNewRow,
  tableData,
  currentRowIndex,
}) => {
  const { loading, error, value } = useFetch(`${apiDomain()}/api/categories`);

  const contentRef = useRef(null);
  const currentRowData = tableData?.[currentRowIndex];

  const handleSubmit = (event) => {
    event.preventDefault();
    const { recipeTitle, recipeAuthor, recipeCategory } =
      event.currentTarget.elements;
    const recipeContent = contentRef.current.value;
    const recipe = {
      recipeTitle: recipeTitle.value,
      recipeAuthor: recipeAuthor.value,
      recipeCategory: recipeCategory.value,
      recipeContent,
    };
    if (currentRowIndex) {
      handleSaveRowEdits(recipe);
    } else {
      handleCreateNewRow(recipe);
    }
    onClose();
  };

  return open && (
    <Dialog open={open}>
      <form onSubmit={handleSubmit}>
        <DialogTitle textAlign="center">
          {currentRowIndex !== undefined
            ? "Update Recipe"
            : "Create New Recipe"}
        </DialogTitle>
        <DialogContent>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {columns.map((column) => {
              if (
                column.accessorKey === "recipeId" ||
                column.accessorKey === "createdAt"
              )
                return;
              else if (column.accessorKey === "recipeCategory") {
                return (
                  <Box key={column.accessorKey}>
                    <FormControl fullWidth>
                      <FormLabel mb={8}>{column.header}</FormLabel>
                      <Select
                        name={column.accessorKey}
                        defaultValue={currentRowData?.recipeCategory ?? ""}
                        required
                      >
                        {value?.map((category) => {
                          return (
                            <MenuItem
                              key={category.categoryName}
                              value={category.categoryName}
                            >
                              {category.categoryName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                );
              } else if (column.accessorKey === "recipeContent") {
                return (
                  <Box key={column.accessorKey}>
                    <FormControl sx={{ width: "100%" }}>
                      <FormLabel mb={8}>{column.header}</FormLabel>
                      <ReactQuill
                        ref={contentRef}
                        theme="snow"
                        defaultValue={currentRowData?.[column.accessorKey]}
                      />
                    </FormControl>
                  </Box>
                );
              } else {
                return (
                  <Box key={column.accessorKey}>
                    <FormLabel mb={8}>{column.header}</FormLabel>
                    <TextField
                      key={column.accessorKey}
                      name={column.accessorKey}
                      defaultValue={currentRowData?.[column.accessorKey]}
                      required
                      sx={{ width: "100%" }}
                    />
                  </Box>
                );
              }
            })}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: "1.25rem" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button color="secondary" type="submit" variant="contained">
            {currentRowIndex !== undefined
              ? "Update Recipe"
              : "Create New Recipe"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RecipeModal;
