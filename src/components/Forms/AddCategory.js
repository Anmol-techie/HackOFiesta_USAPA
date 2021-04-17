import React, { useCallback, useState } from "react";
import { Form, Field } from "react-final-form";
import { TextField } from "final-form-material-ui";
import { Paper, Grid, Button, MenuItem, Typography } from "@material-ui/core";

import API, { useAPI } from "../../config/API";
import useSnackbar from "../../hooks/useSnackbar";

const AddCategory = ({ reRequest }) => {
  const [apiResponse] = useAPI("/admin/categories");
  const [fileState, setFileState] = useState(null);
  const { Snackbar, showSnackbar } = useSnackbar();

  const onSubmit = useCallback(
    (values) => {
      const reader = new FileReader();
      let unit_barcodes = [];

      if (fileState) {
        console.log(fileState);
        reader.readAsText(fileState);

        reader.onload = function () {
          const fileData = reader.result;
          console.log(fileData);

          unit_barcodes = fileData.trim().split("\n");

          API({
            url: "/admin/addProduct",
            method: "POST",
            data: { ...values, photos: [values.photos], unit_barcodes },
          }).then(() => {
            showSnackbar("Product added successfully");
            reRequest();
          });
        };
      } else {
        API({
          url: "/admin/addProduct",
          method: "POST",
          data: { ...values, photos: [values.photos], unit_barcodes: [] },
        }).then(() => {
          showSnackbar("Product added successfully");
          reRequest();
        });
      }
    },
    [fileState, reRequest, showSnackbar]
  );

  const handleFileUpload = useCallback((e) => {
    setFileState(e.target.files[0]);
  }, []);

  return (
    <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
      <Form
        onSubmit={onSubmit}
        initialValues={{
          name: "",
          model_number: "",
          brand_name: "",
          price: 0,
          description: "",
          photos: "",
          category_id: "",
        }}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Typography
                variant="h6"
                style={{ marginBottom: 12, fontWeight: 600 }}
              >
                Enter product details
              </Typography>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="name"
                    component={TextField}
                    type="text"
                    label="Product Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="model_number"
                    component={TextField}
                    type="text"
                    label="Model Number"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="brand_name"
                    fullWidth
                    required
                    component={TextField}
                    type="text"
                    label="Brand Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="description"
                    component={TextField}
                    multiline
                    label="Description"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="category_id"
                    component={TextField}
                    select
                    label="Select a Category"
                    formControlProps={{ fullWidth: true }}
                    variant="outlined"
                  >
                    {apiResponse.data?.map(({ uid, name }) => (
                      <MenuItem value={uid} key={uid}>
                        {name}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="price"
                    component={TextField}
                    fullWidth
                    label="Price"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="photos"
                    component={TextField}
                    fullWidth
                    label="Photos"
                    variant="outlined"
                  />
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={3}></Grid>
                  <Grid item style={{ marginTop: 12 }} xs={4}>
                    <Button
                      variant="outlined"
                      style={{ height: 44 }}
                      component="label"
                      fullWidth
                    >
                      Add Stock
                      <input
                        type="file"
                        hidden
                        accept="text/*"
                        onChange={handleFileUpload}
                      />
                    </Button>
                  </Grid>
                  <Grid item style={{ marginTop: 12 }} xs={5}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={submitting}
                      fullWidth
                      style={{ height: 44 }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
      />
      <Snackbar />
    </div>
  );
};

export default AddCategory;
