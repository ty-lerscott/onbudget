import React from "react";
import { parse } from "papaparse";
import PropTypes from "prop-types";
import { FileUploader } from "carbon-components-react";

import "./ImportStatement.scss";

const ImportStatementForm = ({ formValues, setFormValues }) => {
  const stateName = "csv";

  const setState = (key) => (value) => {
    const nextState = {
      ...formValues,
      [key]: isNaN(value) ? value : Number(value),
    };

    setFormValues(nextState);
  };

  const clearState = () => {
    setState(stateName)();
  };

  const handleFileUpload = async (e) => {
    const [file] = e.target.files;

    const toString = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    const data = await toString(file);

    const { data: parsedData } = parse(data, {
      skipEmptyLines: true,
    });

    setState(stateName)(
      parsedData
        .slice(1)
        .map(([date, description, paidOn, depositedOn, category]) => ({
          category,
          description,
          date: new Date(date).getTime(),
          amount: Number(paidOn || depositedOn) || 0,
        }))
    );
  };

  return (
    <div className="ImportStatementForm" data-testid="ImportStatementForm">
      <div className="Row">
        <p className="bx--label-description no-margin">
          Please format the file in this order "date", "description", "debit",
          "credit", "category"
        </p>
      </div>
      <div className="Row">
        <FileUploader
          labelTitle="File"
          accept={[".csv"]}
          filenameStatus="edit"
          onDelete={clearState}
          className="FileUploader"
          buttonLabel="Choose a File"
          onChange={handleFileUpload}
          iconDescription="Clear file"
          labelDescription="Only .csv files are accepted."
        />
      </div>
    </div>
  );
};

ImportStatementForm.propTypes = {
  formValues: PropTypes.object,
  setFormValues: PropTypes.func,
};

export default ImportStatementForm;
