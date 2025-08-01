import React, { useCallback, useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link } from "react-router-dom";
import RecipeModal from "../../components/RecipeModal/RecipeModal";
import "bulma/css/bulma.min.css";
import { apiDomain } from "../../utils/utils";
import useFetch from "../../hooks/useFetch";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Time from "../../components/Time/Time";

const Recipes = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [currentRowIndex, setCurrentRowIndex] = useState();

  const { loading, error, value } = useFetch(`${apiDomain()}/api/recipes`);

  useEffect(() => {
    setTableData(value);
  }, [value]);

  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "recipeId",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: "recipeTitle",
        header: "Title",
        size: 140,
      },
      {
        accessorKey: "recipeAuthor",
        header: "Author",
        size: 140,
      },
      {
        accessorKey: "recipeContent",
        header: "Content",
        size: 1240,
      },
      {
        accessorKey: "recipeCategory",
        header: "Category",
        size: 140,
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        size: 80,
        Cell: ({ cell }) => <Time dateString={cell.getValue("createdAt")} />,
      },
    ],
    []
  );

  const handleCreateNewRow = async (values) => {
    values.recipeId = uuidv4();
    // here is the change i will make
    values.createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");

    try {
      const { data } = await axios.post(`${apiDomain()}/api/recipes`, values);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits = async (values) => {
    if (!Object.keys(validationErrors).length) {
      const currentRow = tableData[currentRowIndex];
      // send/receive api updates here, then refetch or update local table data for re-render
      try {
        const { data } = await axios.put(
          `${apiDomain()}/api/recipes/${currentRow.recipeId}`,
          values
        );
        console.log(data);
      } catch (err) {
        console.log(err);
      }
      setTableData((prevTableData) => {
        const newTableData = [...prevTableData];
        newTableData[currentRowIndex] = { ...currentRow, ...values };
        return newTableData;
      });
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    async (row) => {
      if (
        !confirm(
          `Are you sure you want to delete ${row.getValue("recipeTitle")}`
        )
      ) {
        return;
      }
      // send api delete request here, then refetch or update local table data for re-render
      try {
        const { data } = await axios.delete(
          `${apiDomain()}/api/recipes/${row.original.recipeId}`
        );
        console.log(data);
      } catch (err) {
        console.log(err);
      }
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData]
  );

  return (
    <Box mt={16} minHeight="100%">
      <MaterialReactTable
        displayColumnDefOptions={{
          "mrt-row-actions": {
            size: 120,
          },
        }}
        columns={columns}
        data={tableData ?? []}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => {
          return (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton
                  onClick={() => {
                    setCreateModalOpen(true);
                    setCurrentRowIndex(row.index);
                  }}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="View">
                <Link to={`/recipes/${row.original.recipeId}`}>
                  <IconButton color="primary">
                    <OpenInNewIcon />
                  </IconButton>
                </Link>
              </Tooltip>
            </Box>
          );
        }}
        renderTopToolbarCustomActions={() => (
          <button
            className="button is-primary mb-4 mt-4"
            onClick={() => {
              setCreateModalOpen(true);
              setCurrentRowIndex();
            }}
          >
            Create Recipe
          </button>
        )}
      />
      <RecipeModal
        columns={columns}
        open={createModalOpen}
        onClose={() => {
          setCreateModalOpen(false);
        }}
        handleSaveRowEdits={handleSaveRowEdits}
        handleCreateNewRow={handleCreateNewRow}
        tableData={tableData}
        currentRowIndex={currentRowIndex}
      />
    </Box>
  );
};

export default Recipes;
