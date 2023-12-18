import { StyledEngineProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import React, { useState, useEffect } from "react";
import { CheckBox } from "@mui/icons-material";

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
  textColor,
  variant,
}) => {
  const formAddress = (a, b, c, d, e) => {
    let ans = "";
    if (a !== null && a !== "NA") {
      ans += a;
    }
    if (b !== null && b !== "NA") {
      ans += b;
    }
    if (c !== null && c !== "NA") {
      ans += c;
    }
    if (d !== null && d !== "NA") {
      ans += d;
    }
    if (e !== null && e !== "NA") {
      ans += e;
    }
    return ans;
  };

  const defaultProps = {
    options: data,
    getOptionLabel: (option) => {
      switch (Name) {
        case "publisher_name":
          return option.name;
          break;
        case "printing_titles":
          return option?.title;
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

        case "user_addschool":
          // console.log(option)
          let userShow = `${option.emp_id} - ${
            option.first_name ? option.first_name : ""
          } ${option.middle_name ? option.middle_name : ""} ${
            option.last_name ? option.last_name : ""
          }`;
          return userShow;
          break;

        case "pref_transpoter":
          return option.name;
          break;
        case "school_name":
          if (option?.school_name) {
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
        case "state_manageSchool":
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
          if (option?.subject) {
            return option.subject;
          }
          break;
        case "series_name":
          return option.series;
          break;
        case "order_priority":
          return option.order_priority;
          break;
        case "billing_address":
          return formAddress(
            option?.address,
            option?.block,
            option?.street,
            option?.fk_state?.state,
            option?.zip_code
          );
          // option.address +
          // " " +
          // option.block +
          // " " +
          // option.street +
          // " " +
          // option.fk_state.state +
          // " " +
          // option.zip_code
          break;
        case "shipping_address":
          return formAddress(
            option?.address,
            option?.block,
            option?.street,
            option?.fk_state?.state,
            option?.zip_code
          );
          // option?.address +
          // " " +
          // option?.block +
          // " " +
          // option?.street +
          // " " +
          // option?.fk_state?.state +
          // " " +
          // option?.zip_code
          break;
        // manage School
        case "select_state":
          // console.log(option);
          if (option.state === "Null") return "";
          // else return option.state;
          else return option.fk_state.state;

          break;

        case "select_state_kys":
          // console.log(option);
          if (option.state === "Null") return "";
          else return option.fk_state.state;
          break;

        case "select_state_2":
          // console.log(option)
          return option.state;
          break;
        case "select_state_training":
          // console.log(option)
          return option.state;
          break;

        case "select_state_location":
          // console.log(option)
          return option.state;
          break;

        case "select_schools":
          // console.log(option)
          return option.school_name;
          break;

        case "select_ck_state":
          // console.log(option)
          return option.name;
          break;

        case "party_type":
          // console.log(option)
          return option.title;
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
        case "invoice_data":
          // console.log(option)
          return option.bp_name;
          break;
        case "get_all_user":
          let firstName = "",
            middleName = "",
            lastName = "";
          if (option.first_name) firstName = option.first_name;
          if (option.middle_name) middleName = option.middle_name;
          if (option.last_name) lastName = option.last_name;
          let fullName = `${firstName} ${middleName} ${lastName}`;
          // console.log(option)
          return fullName;
          break;
        case "select_represent":
          let data = option.fk_user;
          let fstName = "",
            mdlName = "",
            lstName = "";
          if (data.first_name) fstName = data.first_name;
          if (data.middle_name) mdlName = data.middle_name;
          if (data.last_name) lstName = data.last_name;
          let flName = `${fstName} ${mdlName} ${lstName}`;
          // console.log(flName);
          return flName;
          break;
        case "selec_typ":
          return option.title;
          break;
        case "series_aof":
          return option.series;
          break;
        case "schools_aof":
          if (option?.school_name) {
            return option.school_name;
          } else {
            return "";
          }
          break;
        case "series_aof_item":
          return option.series;
          break;
        case "title_aof":
          // console.log(option)
          return option.item_name;
          break;
        case "cred_lim_type":
          // console.log(option)
          return option.title;
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

        case "items_aof":
          return option.series;
          break;
        case "message":
          // console.log(option);
          return option.message;
          break;
        case "employee_info":
          return `${option.first_name ? option.first_name : ""} ${
            option.middle_name ? option.middle_name : ""
          } ${option.first_name ? option.first_name : ""} - ${
            option.emp_id ? option.emp_id : ""
          } - ${option.phone ? option.phone : ""}`;
          break;

        default:
          return option;
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
    if (type === "select_state_kys") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "state_manageSchool") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "select_state_2") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "selec_typ") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "select_state_training") {
      console.log(value, type);
      handleOrderProcessingForm(value, type);
    }
    if (type === "party_type") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "select_city_training") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "select_type") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "select_represent") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "items_aof") {
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
    if (type === "schools_aof") {
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
    if (type === "title_aof") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "series_aof_item") {
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
    if (type === "select_city_location") {
      // console.log(value, type, seriesId)
      handleOrderProcessingForm(value, type);
    }
    if (type === "select_schools") {
      // console.log(value, type, seriesId)
      handleOrderProcessingForm(value, type);
    }
    if (type === "kys_comp_publisher") {
      handleOrderProcessingForm(value, type);
    }

    if (type === "user_addschool") {
      handleOrderProcessingForm(value, type);
    }

    if (type === "cred_lim_type") {
      handleOrderProcessingForm(value, type);
    }

    if (type === "invoice_pdf_data") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "select_ck_state") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "invoice_data") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "get_all_user") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "select_school_type") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "aof_status") {
      // console.log(value, type)
      handleOrderProcessingForm(value, type);
    }
    if (type === "employee_info") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "message") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "aof_acc") {
      handleOrderProcessingForm(value, type);
    } else {
      handleOrderProcessingForm(value, type);
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
          loading={true}
          // multiple={multiple}
          defaultValue={defaultValue ? defaultValue : null}
          color={color}
          // onBlur={() => console.log("ldkf")}
          onChange={(event, newValue) => handleDropDown(newValue, Name)}
          id="disable-close-on-select"
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant={variant ? variant : "standard"}
              InputLabelProps={{ style: { color: color } }}
            />
          )}
        />
      </Stack>
    </StyledEngineProvider>
  );
};

export default SearchDropDown;
