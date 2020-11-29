import React from 'react'
import { parse } from 'papaparse'
import PropTypes from 'prop-types'
import { FileUploader } from 'carbon-components-react'

import './fields.scss'

const ImportStatementForm = ({ setFormValues }) => {
  const clearState = () => {
    setFormValues([])
  }

  const handleFileUpload = async e => {
    const [file] = e.target.files

    const toString = file =>
      new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })

    const data = await toString(file)

    const { data: parsedData } = parse(data, {
      skipEmptyLines: true
    })

    const transformedValues = parsedData
      .slice(1)
      .map(([date, description, paidOn, depositedOn, category]) => ({
        category,
        description,
        date: new Date(date).getTime(),
        amount: Number(paidOn || depositedOn) || 0
      }))

    setFormValues(transformedValues)
  }

  return (
    <FileUploader
      labelTitle='File'
      accept={['.csv']}
      filenameStatus='edit'
      onDelete={clearState}
      className='FileUploader'
      buttonLabel='Choose a File'
      onChange={handleFileUpload}
      iconDescription='Clear file'
      labelDescription='Only .csv files are accepted.'
    />
  )
}

ImportStatementForm.propTypes = {
  formValues: PropTypes.array,
  setFormValues: PropTypes.func
}

export default ImportStatementForm
