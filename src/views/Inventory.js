import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import TextField from "@material-ui/core/TextField";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import MaskedInput from "react-text-mask";
import NumberFormat from "react-number-format";
import "date-fns";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import API, { useAPI } from "../config/API";
import useInput from "../hooks/useInput";
import useSnackbar from "../hooks/useSnackbar";
import { MenuItem } from "@material-ui/core";

const useRowStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  textField: {},

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  cellHead: {
    backgroundColor: theme.palette.background.paper,
    // color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 600,
    textTransform: "uppercase",
    borderBottomColor: theme.palette.primary.main,
  },
}));

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        "(",
        /[1-9]/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="₹"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

const Row = ({
  uid,
  name,
  brand_name,
  photos,
  model_number,
  price,
  description,
  category,
  stock,
  last_refill,
}) => {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const quantity = useInput("");
  const { Snackbar, showSnackbar } = useSnackbar();

  const handleRequest = useCallback(() => {
    API({
      url: "/agent/getInventory",
      method: "POST",
      data: {
        product_id: uid,
        quantity: quantity.value,
      },
    }).then(() => {
      showSnackbar("Request made successfully");
      quantity.value = "";
    });
  }, [quantity, showSnackbar, uid]);

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{brand_name}</TableCell>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell align="right">{category}</TableCell>
        <TableCell align="right">{stock}</TableCell>
        <TableCell align="right">{price}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box padding={2} paddingTop={0}>
              <Typography variant="overline" style={{ fontSize: 18 }}>
                Product Details
              </Typography>
              <Box display="flex" flex={1} alignItems="center">
                <Box style={{ borderRadius: 10 }}>
                  <img
                    alt="Product"
                    src={photos[0]}
                    style={{ height: 320, width: 320, objectFit: "contain" }}
                  />
                </Box>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={6}>
                      <Box display="flex" flexDirection="column">
                        <TextField
                          variant="outlined"
                          id="standard-full-width"
                          label="Display Name"
                          placeholder="Name of Product"
                          style={{ marginBottom: 12 }}
                          value={name}
                        />
                        <TextField
                          variant="outlined"
                          id="standard-multiline-flexible"
                          label="Description"
                          multiline
                          rows={5}
                          placeholder="Product Description"
                          style={{ marginBottom: 12 }}
                          value={description}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                      <Box display="flex" flexDirection="column">
                        <TextField
                          variant="outlined"
                          label="Price"
                          name="numberformat"
                          placeholder="Cost"
                          id="formatted-numberformat-input"
                          InputProps={{
                            inputComponent: NumberFormatCustom,
                          }}
                          style={{ marginBottom: 12 }}
                          value={price}
                        />
                        <TextField
                          variant="outlined"
                          label="Stock"
                          id="margin-normal"
                          placeholder="Quantity"
                          className={classes.textField}
                          style={{ marginBottom: 12 }}
                          value={stock}
                        />
                        <TextField
                          variant="outlined"
                          label="Request Quantity"
                          id="margin-normal"
                          placeholder="Enter quantity"
                          className={classes.textField}
                          style={{ marginBottom: 12 }}
                          {...quantity.bind}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                      <TextField
                        variant="outlined"
                        label="Brand"
                        id="margin"
                        placeholder="Brand Name"
                        className={classes.textField}
                        style={{ marginBottom: 12 }}
                        value={brand_name}
                      />
                      <TextField
                        variant="outlined"
                        label="Model Number"
                        id="margin"
                        placeholder="Model Number"
                        className={classes.textField}
                        style={{ marginBottom: 12 }}
                        value={model_number}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<AddShoppingCartIcon />}
                        fullWidth
                        style={{
                          height: 56,
                        }}
                        onClick={handleRequest}
                      >
                        Request stocks
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Snackbar />
    </React.Fragment>
  );
};

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export default function CollapsibleTable() {
  const styles = useRowStyles();
  const [apiRequest] = useAPI("/agent/inventory");
  const [categoryResponse] = useAPI("/agent/categories");
  const [tableData, setTableData] = useState([]);
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");

  console.log(apiRequest, tableData);

  const handleCategoryFilter = useCallback(
    (e) => {
      e.preventDefault();

      if (e.target.value !== "all" && brand !== "all") {
        const filteredData = apiRequest.data?.products.filter(
          ({ category: c, brand_name: b }) =>
            c === e.target.value && b === brand
        );

        setTableData(filteredData);
      } else if (e.target.value !== "all" && brand === "all") {
        const filteredData = apiRequest.data?.products.filter(
          ({ category: c }) => c === e.target.value
        );

        setTableData(filteredData);
      } else if (e.target.value === "all" && brand !== "all") {
        const filteredData = apiRequest.data?.products.filter(
          ({ brand_name: b }) => b === brand
        );

        setTableData(filteredData);
      } else if (e.target.value === "all" && brand === "all") {
        setTableData(apiRequest.data?.products);
      }

      setCategory(e.target.value);
    },
    [apiRequest.data?.products, brand]
  );

  const handleBrandFilter = useCallback(
    (e) => {
      e.preventDefault();

      if (e.target.value !== "all" && category !== "all") {
        const filteredData = apiRequest.data?.products.filter(
          ({ category: c, brand_name: b }) =>
            b === e.target.value && c === category
        );

        setTableData(filteredData);
      } else if (e.target.value !== "all" && category === "all") {
        const filteredData = apiRequest.data?.products.filter(
          ({ brand_name: b }) => b === e.target.value
        );

        setTableData(filteredData);
      } else if (e.target.value === "all" && category !== "all") {
        const filteredData = apiRequest.data?.products.filter(
          ({ category: c }) => c === category
        );

        setTableData(filteredData);
      } else if (e.target.value === "all" && category === "all") {
        setTableData(apiRequest.data?.products);
      }

      setBrand(e.target.value);
    },
    [apiRequest.data?.products, category]
  );

  useEffect(() => {
    if (!apiRequest.loading && apiRequest.data) {
      setTableData(apiRequest.data.products);
    }
  }, [apiRequest]);

  return (
    <Box display="flex" flexDirection="column" padding={4} paddingTop={3}>
      <Box display="flex" flexDirection="row" style={{ marginBottom: 12 }}>
        <Typography variant="h4" style={{ fontWeight: 600 }}>
          Inventory
        </Typography>
        <Box display="flex" flex={1} justifyContent="flex-end">
          <TextField
            select
            variant="filled"
            value={category}
            style={{
              marginLeft: 12,
              width: "20%",
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            onChange={handleCategoryFilter}
            label="Category Filter"
            size="medium"
            InputProps={{ disableUnderline: true }}
          >
            <MenuItem value="all">All</MenuItem>
            {categoryResponse.data?.map(({ name }) => (
              <MenuItem value={name}>{name}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            variant="filled"
            value={brand}
            style={{
              marginLeft: 12,
              width: "20%",
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            onChange={handleBrandFilter}
            label="Brand Filter"
            size="medium"
            InputProps={{ disableUnderline: true }}
          >
            <MenuItem value="all">All</MenuItem>
            {apiRequest.data?.products
              .filter(onlyUnique)
              .map(({ brand_name }) => (
                <MenuItem value={brand_name}>{brand_name}</MenuItem>
              ))}
          </TextField>
        </Box>
      </Box>
      <Typography variant="overline" style={{ fontWeight: 600 }}>
        Your Products
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell classes={{ head: styles.cellHead }} variant="head">
                #
              </TableCell>
              <TableCell
                align="left"
                classes={{ head: styles.cellHead }}
                variant="head"
              >
                Brand
              </TableCell>
              <TableCell
                align="left"
                classes={{ head: styles.cellHead }}
                variant="head"
              >
                Product
              </TableCell>

              <TableCell
                align="right"
                classes={{ head: styles.cellHead }}
                variant="head"
              >
                Category
              </TableCell>
              <TableCell
                align="right"
                classes={{ head: styles.cellHead }}
                variant="head"
              >
                Stock
              </TableCell>
              <TableCell
                align="right"
                classes={{ head: styles.cellHead }}
                variant="head"
              >
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <Row key={row.uid} {...row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
