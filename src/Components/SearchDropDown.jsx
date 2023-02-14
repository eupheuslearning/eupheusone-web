import { StyledEngineProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import React, { useState, useEffect } from "react";

const SearchDropDown = ({
  label,
  color,
  data,
  Name,
  getStateAndCity,
  getSeriesData,
  handleOrderProcessingForm,
  disable,
  defaultValue,
  multiple,
  seriesId,
}) => {
  // console.log(data)
  const defaultProps = {
    options: data,
    getOptionLabel: (option) => {
      switch (Name) {
        case "publisher_name":
          return option.name;
          break;
        case "board_name":
          return option.board_name;
          break;
        case "category":
          return option.schoolCategory;
          break;
        case "board_name_addschool":
          return option.board_name;
          break;
        case "category_addschool":
          return option.schoolCategory;
          break;

        case "pref_transpoter":
          return option.name;
          break;
        case "school_name":
          if (option.school_name) {
            return option.school_name;
          } else {
            return null;
          }
          break;
        case "country":
          return option.country;
          break;
        case "state":
          return option.state;
          break;
        case "city":
          return option.city;
          break;
        case "order_type":
          return option.order_type;
          break;
        case "customer_name":
          return option.bp_name;
          break;
        case "school_name":
          return option.school_name;
          break;
        case "contact_id":
          return option.name;
          break;
        case "subject_name":
          return option.subject;
          break;
        case "series_name":
          return option.series;
          break;
        case "order_priority":
          return option.order_priority;
          break;
        case "billing_address":
          return (
            option.address +
            " " +
            option.block +
            " " +
            option.street +
            " " +
            option.fk_state.state +
            " " +
            option.zip_code
          );
          break;
        case "shipping_address":
          return (
            option.address +
            " " +
            option.block +
            " " +
            option.street +
            " " +
            option.fk_state.state +
            " " +
            option.zip_code
          );
          break;
        // manage School
        case "select_state":
          // console.log(option)
          return option.fk_state.state          ;
          break;
        case "select_state_training":
          // console.log(option)
          return option.state;
          break;

          case "select_state_location":
            // console.log(option)
            return option.state;
            break;

            case "select_city_location":
              // console.log(option)
              return option.city;
              break;
          case "select_school_id":
            // console.log(option)
            return option.school_name;
            break;
          case "select_city_training":
          // console.log(option)
          return option.city;
          break;
        case "select_type":
          // console.log(option)
          return option.types;
          break;
        case "to_convert":
          // console.log(option)
          return option.convert;
          break;
        case "select_city":
          // console.log(option);
          return option.city;
          break;
        // aof
        case "publisher":
          // console.log(option)
          return option.bp_name;
          break;
        case "invoice_pdf_data":
            // console.log(option)
            return option.bp_name;
            break;
        case "series_aof":
          return option.series;
          break;
        case "title_aof":
          return option.item_name;
          break;
        // kys
        case "grades":
          return option.name;
          break;
        case "group":
          return option.name;
          break;
        case "individual":
          return option.name;
          break;
        case "fees":
          return option.fees;
          break;
        case "kys_comp_publisher":
          return option.name;
          break;
        // aof
        case "aof_status":
          return option.title;
          break;
        case "aof_acc":
          return option.title;
          break;

        case "select_school_type":
          return option.type;
          break;

        default:
          return "";
          break;
      }
    },
  };

  // const changeCountryAndStateId = (newValue) => {
  //   if (data[1].NAME === "India") {
  //     changeCountryId(newValue.PK_ID);
  //   } else {
  //     setTimeout(() => {
  //       setIsStateTouched(false);
  //     }, 200);
  //     changeStateId(newValue.PK_ID);
  //   }
  // };

  const handleDropDown = (value, type) => {
    // console.log(value, type)
    if (
      type === "order_type" ||
      type === "customer_name" ||
      type === "school_name" ||
      type === "subject_name" ||
      type === "series_name" ||
      type === "date" ||
      type === "order_priority" ||
      type === "shipping_address" ||
      type === "billing_address" ||
      type === "pref_transpoter" ||
      type === "contact_id"
    ) {
      if (type === "subject_name") {
        getSeriesData(value.id);
      }
      handleOrderProcessingForm(value, type);
      // console.log("working");
    }
    if (type === "country") {
      getStateAndCity(value.id, "state");
    }
    if (type === "state") {
      getStateAndCity(value.id, "city");
    }

    if (type === "city") {
      getStateAndCity(value.id, "setCityId");
    }
    if (type === "board_name") {
      getStateAndCity(value.id, "setBoardId");
    }
    if (type === "category") {
      getStateAndCity(value.id, "setCategoryId");
    }
    if (type === "board_name_addschool") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "category_addschool") {
      handleOrderProcessingForm(value, type);
    }

    if (type === "select_state") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "select_state_training") {
      console.log(value, type)
      handleOrderProcessingForm(value, type);
    }
    if (type === "select_city_training") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "select_type") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "publisher_name") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "select_city") {
      handleOrderProcessingForm(value, type);
    }
    // aof
    if (type === "series_aof") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "publisher") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "grades") {
      handleOrderProcessingForm(value, type, seriesId);
    }
    if (type === "group") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "individual") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "select_school_id") {
      handleOrderProcessingForm(value, type, seriesId);
    }
    if (type === "fees") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "to_convert") {
      // console.log(value, type, seriesId)
      handleOrderProcessingForm(value.convert, type, seriesId);
    }
    if (type === "select_state_location") {
      // console.log(value, type, seriesId)
      handleOrderProcessingForm(value, type);
    }
    if (type === "kys_comp_publisher") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "invoice_pdf_data") {
      handleOrderProcessingForm(value, type);
    }  
    if (type === "select_school_type") {
      handleOrderProcessingForm(value, type);
    } 
    else {
      return;
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <Stack spacing={1} sx={{ width: 200 }} className="w-full">
        <Autocomplete
          {...defaultProps}
          disabled={disable}
          disableClearable
          multiple={multiple}
          // onBlur={() => console.log("ldkf")}
          onChange={(event, newValue) => handleDropDown(newValue, Name)}
          id="disable-close-on-select"
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="standard"
              InputLabelProps={{ style: { color: color } }}
            />
          )}
        />
      </Stack>
    </StyledEngineProvider>
  );
};

export default SearchDropDown;
