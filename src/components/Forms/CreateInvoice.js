import React, { useCallback, useState } from "react";
import Box from "@material-ui/core/Box";
import {
  Paper,
  Grid,
  Button,
  MenuItem,
  Typography,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles,
  InputAdornment,
} from "@material-ui/core";
import { Add, CameraAlt } from "@material-ui/icons";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import API, { useAPI, serverUrl } from "../../config/API";
import useSnackbar from "../../hooks/useSnackbar";
import useInput from "../../hooks/useInput";
import BarcodeScanner from "../BarcodeScanner/BarcodeScanner";

const useStyles = makeStyles((theme) => ({
  fullWidth: {
    height: 1400,
  },
  cellHead: {
    backgroundColor: theme.palette.background.paper,
    fontSize: 16,
    fontWeight: 600,
    textTransform: "uppercase",
    borderBottomColor: theme.palette.primary.main,
  },
}));

const CreateInvoice = () => {
  const [apiResponse] = useAPI("/agent/categories");
  const { Snackbar, showSnackbar } = useSnackbar();
  const customer = useInput("");
  const transaction = useInput("");
  const categorySelect = useInput("");
  const barcode = useInput("");
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const styles = useStyles();

  const onSubmit = useCallback(() => {
    API({
      url: "/agent/addInvoice",
      method: "POST",
      data: {
        customer_name: customer.value,
        transaction_id: transaction.value,
        units: rows.map(({ uid }) => uid),
      },
    }).then(() => {
      showSnackbar("Invoice generated successfully");

      window.open(
        `${serverUrl}/invoice?transaction_id=${transaction.value}`,
        "_blank"
      );

      customer.setValue("");
      transaction.setValue("");
      categorySelect.setValue("");
      barcode.setValue("");
      setRows([]);
    });
  }, [barcode, categorySelect, customer, rows, showSnackbar, transaction]);

  const handleAdd = useCallback(() => {
    API({
      url: `/agent/unit?category_id=${categorySelect.value}&barcode=${barcode.value}`,
      method: "GET",
    }).then(
      ({
        data: {
          uid,
          product_name,
          model_number,
          brand_name,
          price,
          product_id,
          barcode: b,
          category,
        },
      }) => {
        setRows((oldRows) => [
          ...oldRows,
          {
            uid,
            product_name,
            model_number,
            brand_name,
            price,
            product_id,
            barcode: b,
            category,
          },
        ]);

        barcode.setValue("");
      }
    );
  }, [barcode, categorySelect.value]);

  return (
    <div style={{ padding: 16, margin: "auto", maxWidth: 720 }}>
      <Paper style={{ padding: 16 }}>
        <Typography variant="h6" style={{ marginBottom: 12, fontWeight: 600 }}>
          Generate Invoice
        </Typography>
        <Box>
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                name="customer"
                type="text"
                label="Customer  Name"
                variant="outlined"
                {...customer.bind}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                name="transactionId"
                type="text"
                label="Transaction Id"
                variant="outlined"
                {...transaction.bind}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                select
                name="category"
                label="Select a Category"
                formControlProps={{ fullWidth: true }}
                variant="outlined"
                {...categorySelect.bind}
              >
                {apiResponse.data?.map(({ uid, name }) => (
                  <MenuItem value={uid} key={uid}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={5}>
              <TextField
                name="barcode"
                fullWidth
                label="Barcode"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setOpen(!open)}
                      >
                        <CameraAlt />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                {...barcode.bind}
              />
            </Grid>
            <Grid item xs={1}>
              <Box display="flex" alignItems="center">
                <IconButton onClick={handleAdd}>
                  <Add />
                </IconButton>
                <Typography
                  variant="overline"
                  style={{
                    fontWeight: 700,
                    color: "rgba(0, 0, 0, 0.54)",
                  }}
                >
                  Add
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item style={{ marginTop: 12 }} xs={4}></Grid>
            <Grid item style={{ marginTop: 12 }} xs={5}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                style={{ height: 44 }}
                onClick={onSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Typography variant="h6" style={{ fontWeight: 600 }}>
          Products
        </Typography>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  variant="head"
                  classes={{ head: styles.cellHead }}
                >
                  Brand
                </TableCell>
                <TableCell
                  align="left"
                  variant="head"
                  classes={{ head: styles.cellHead }}
                >
                  Category
                </TableCell>
                <TableCell
                  align="left"
                  variant="head"
                  classes={{ head: styles.cellHead }}
                >
                  Product
                </TableCell>
                <TableCell
                  align="right"
                  variant="head"
                  classes={{ head: styles.cellHead }}
                >
                  Model
                </TableCell>
                <TableCell
                  align="right"
                  variant="head"
                  classes={{ head: styles.cellHead }}
                >
                  Barcode
                </TableCell>
                <TableCell
                  align="right"
                  variant="head"
                  classes={{ head: styles.cellHead }}
                >
                  ₹ Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(
                ({
                  uid,
                  product_name,
                  model_number,
                  brand_name,
                  price,
                  barcode: b,
                  category,
                }) => (
                  <TableRow key={uid}>
                    <TableCell>{brand_name}</TableCell>
                    <TableCell>{category}</TableCell>
                    <TableCell component="th" scope="row">
                      {product_name}
                    </TableCell>
                    <TableCell align="right">{model_number}</TableCell>
                    <TableCell align="right">{b}</TableCell>
                    <TableCell align="right">{price}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="lg"
        classes={{ paperFullWidth: styles.fullWidth }}
      >
        <DialogTitle>Scan Barcode</DialogTitle>
        <DialogContent>
          <BarcodeScanner
            appendMessage={(data) => {
              barcode.setValue(data);
              setOpen(false);
            }}
          ></BarcodeScanner>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar />
    </div>
  );
};

export default CreateInvoice;
