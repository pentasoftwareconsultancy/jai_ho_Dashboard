import React, { useState, useMemo, useEffect, useCallback } from "react";
import { MaterialReactTable } from "material-react-table";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton, Tooltip, Menu, MenuItem, } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styles from "./withMaterialTable.module.css";

const withMaterialTable = (WrappedComponent, tableConfig) => {
  return (props) => {
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState({});
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);

    // Fetch Data on Mount
    useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await tableConfig.getData();
          setData(result);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, [tableConfig]);

    // Open and Close Handlers
    const openAddDialog = useCallback(() => {
      setSelectedRow({});
      setIsAddOpen(true);
    }, []);

    const openEditDialog = useCallback((rowData) => {
      setSelectedRow(rowData);
      setIsEditOpen(true);
    }, []);

    const openViewDialog = useCallback((rowData) => {
      setSelectedRow(rowData);
      setIsViewOpen(true);
    }, []);

    const closeDialogs = useCallback(() => {
      setIsAddOpen(false);
      setIsEditOpen(false);
      setIsViewOpen(false);
      setSelectedRow({});
    }, []);

    // Add Handler
    const handleAddSubmit = useCallback(async () => {
      try {
        const newRow = await tableConfig.addData(selectedRow);
        setData((prevData) => [...prevData, newRow]);
        closeDialogs();
      } catch (error) {
        console.error("Error adding data:", error);
      }
    }, [selectedRow, tableConfig, closeDialogs]);

    // Edit Handler
    const handleEditSubmit = useCallback(async () => {
      try {
        await tableConfig.updateData(selectedRow);
        setData((prevData) =>
          prevData.map((item) =>
            item.id === selectedRow.id ? selectedRow : item
          )
        );
        closeDialogs();
      } catch (error) {
        console.error("Error updating data:", error);
      }
    }, [selectedRow, tableConfig, closeDialogs]);

    // Delete Handler
    const handleDelete = useCallback(
      async (rowData) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
          try {
            await tableConfig.deleteData(rowData.id);
            setData((prevData) =>
              prevData.filter((item) => item.id !== rowData.id)
            );
          } catch (error) {
            console.error("Error deleting data:", error);
          }
        }
      },
      [tableConfig]
    );

    // Dynamic Form Fields
    const renderFormFields = useCallback(() => {
      return tableConfig.columns.map((col) => (
        <TextField
          key={col.accessorKey}
          margin="dense"
          label={col.header}
          fullWidth
          value={selectedRow[col.accessorKey] || ""}
          onChange={(e) =>
            setSelectedRow((prev) => ({
              ...prev,
              [col.accessorKey]: e.target.value,
            }))
          }
        />
      ));
    }, [selectedRow, tableConfig.columns]);

    // Render View Fields
    const renderViewFields = useCallback(() => {
      return tableConfig.columns.map((col) => (
        <div key={col.accessorKey} className={styles.ViewField}>
          <strong>{col.header}:</strong> {selectedRow[col.accessorKey]}
        </div>
      ));
    }, [selectedRow, tableConfig.columns]);

    const columns = useMemo(
      () => [
        ...tableConfig.columns,
        {
          id: "actions",
          header: "Actions",
          Cell: ({ row }) => {
            const [anchorEl, setAnchorEl] = useState(null);

            const handleMenuOpen = (event) => {
              setAnchorEl(event.currentTarget);
            };

            const handleMenuClose = () => {
              setAnchorEl(null);
            };

            return (
              <>
                <IconButton onClick={handleMenuOpen}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    onClick={() => {
                      openViewDialog(row.original);
                      handleMenuClose();
                    }}
                  > View</MenuItem>
                  <MenuItem
                    onClick={() => {
                      openEditDialog(row.original);
                      handleMenuClose();
                    }}
                  >Edit</MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleDelete(row.original);
                      handleMenuClose();
                    }}
                  >Delete</MenuItem>
                </Menu>
              </>
            );
          },
        },
      ],
      [openViewDialog, openEditDialog, handleDelete]
    );

    return (
      <>
        <div className={styles.Container}>
          <div className={styles.Header}>
            <h2 className={styles.Heading}>{tableConfig.title}</h2>
            <Tooltip title="Add New">
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={openAddDialog}
                className={styles.AddButton}
              >Add New</Button>
            </Tooltip>
          </div>

          <div className={styles.TableWrapper}>
            <MaterialReactTable
              columns={columns}
              data={data}
              enableSorting
              enablePagination
              enableRowSelection={false}
              enableGlobalFilter
            />
          </div>

          <Dialog open={isAddOpen} onClose={closeDialogs}>
            <DialogTitle>Add New</DialogTitle>
            <DialogContent>{renderFormFields()}</DialogContent>
            <DialogActions>
              <Button onClick={closeDialogs}>Cancel</Button>
              <Button onClick={handleAddSubmit} color="primary">Add</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={isEditOpen} onClose={closeDialogs}>
            <DialogTitle>Edit</DialogTitle>
            <DialogContent>{renderFormFields()}</DialogContent>
            <DialogActions>
              <Button onClick={closeDialogs}>Cancel</Button>
              <Button onClick={handleEditSubmit} color="primary">
                Update
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={isViewOpen} onClose={closeDialogs}>
            <DialogTitle>View Details</DialogTitle>
            <DialogContent>{renderViewFields()}</DialogContent>
            <DialogActions>
              <Button onClick={closeDialogs}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
      </>
    );
  };
};

export default withMaterialTable;
