import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
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
import MaskedInput from "react-text-mask";
import NumberFormat from "react-number-format";
import "date-fns";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import SaveIcon from "@material-ui/icons/Save";

import API, { useAPI } from "../config/API";
import useInput from "../hooks/useInput";
import useSnackbar from "../hooks/useSnackbar";
import AddProduct from "../components/Forms/AddProduct";
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
  reRequest,
}) => {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const displayName = useInput(name);
  const descriptionInput = useInput(description);
  const prodPrice = useInput(price);
  const prodStock = useInput(stock);
  const prodBrand = useInput(brand_name);
  const prodModal = useInput(model_number);
  const { Snackbar, showSnackbar } = useSnackbar();
  const theme = useTheme();

  const handleStock = useCallback(
    (e) => {
      const reader = new FileReader();

      reader.readAsText(e.target.files[0]);

      reader.onload = function () {
        const fileData = reader.result;
        console.log(fileData);

        const unit_barcodes = fileData.trim().split("\n");

        API({
          url: `/admin/addStock?product_id=${uid}`,
          method: "POST",
          data: {
            unit_barcodes,
          },
        }).then(() => {
          showSnackbar("Updated successfully");
          reRequest();
        });
      };
    },
    [reRequest, showSnackbar, uid]
  );

  const handleRequest = useCallback(() => {
    API({
      url: `/admin/updateProduct?product_id=${uid}`,
      method: "PUT",
      data: {
        name: displayName.value,
        model_number: prodModal.value,
        brand_name: prodBrand.value,
        price: prodPrice.value,
        description: descriptionInput.value,
      },
    }).then(() => {
      showSnackbar("Updated successfully");
      reRequest();
    });
  }, [
    descriptionInput.value,
    displayName.value,
    prodBrand.value,
    prodModal.value,
    prodPrice.value,
    reRequest,
    showSnackbar,
    uid,
  ]);

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
        <TableCell align="right">{last_refill}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box padding={2}>
              <Typography variant="h6">Product Details</Typography>
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
                          {...displayName.bind}
                        />
                        <TextField
                          variant="outlined"
                          id="standard-multiline-flexible"
                          label="Description"
                          multiline
                          rows={5}
                          placeholder="Product Description"
                          style={{ marginBottom: 12 }}
                          {...descriptionInput.bind}
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
                          {...prodPrice.bind}
                        />
                        <TextField
                          variant="outlined"
                          label="Stock"
                          id="margin-normal"
                          placeholder="Quantity"
                          className={classes.textField}
                          style={{ marginBottom: 12 }}
                          value={stock}
                          {...prodStock.bind}
                        />
                        <Button
                          variant="outlined"
                          style={{ height: 56 }}
                          component="label"
                          fullWidth
                        >
                          Add Stock
                          <input
                            type="file"
                            hidden
                            accept="text/*"
                            onChange={handleStock}
                          />
                        </Button>
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
                        {...prodBrand.bind}
                      />
                      <TextField
                        variant="outlined"
                        label="Model Number"
                        id="margin"
                        placeholder="Model Number"
                        className={classes.textField}
                        style={{ marginBottom: 12 }}
                        {...prodModal.bind}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        fullWidth
                        style={{
                          height: 56,
                        }}
                        onClick={handleRequest}
                      >
                        Update Details
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Snackbar
        ContentProps={{
          style: {
            backgroundColor: theme.palette.success.main,
            fontWeight: 700,
          },
        }}
      />
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
  const [apiRequest, reRequest] = useAPI("/admin/inventory");
  const [categoryResponse] = useAPI("/admin/categories");
  const [addOpen, setAddOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");

  console.log(apiRequest);

  const handleCategoryFilter = useCallback(
    (e) => {
      e.preventDefault && e.preventDefault();

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
          Admin Inventory
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
            label="Categories"
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
            label="Brands"
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
      <Box display="flex" flexDirection="row" alignItems="center">
        <Typography variant="overline" style={{ fontWeight: 600 }}>
          Add Product
        </Typography>
        <IconButton size="small" onClick={() => setAddOpen(!addOpen)}>
          {addOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </Box>
      <Collapse in={addOpen} timeout="auto" unmountOnExit>
        <AddProduct reRequest={reRequest} />
      </Collapse>
      <Grid container spacing={2}>
        {categoryResponse.data?.slice(0, 6).map(({ name, uid, photo }) => (
          <Grid item xs={6} md={3} lg={2}>
            <Paper
              style={{ borderRadius: 10, cursor: "pointer" }}
              onClick={() => handleCategoryFilter({ target: { value: name } })}
            >
              <Box padding={2}>
                <img
                  alt="Category"
                  src={photo}
                  style={{
                    height: 120,
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: 10,
                  }}
                />
                {name}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
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
                Last Refill
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <Row key={row.uid} {...row} {...{ reRequest }} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
