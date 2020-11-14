const fs = require("fs");
const path = require("path");
const colors = require("colors");
const mkdirp = require("mkdirp");
const commandLineArgs = require("command-line-args");

const projectDir = path.resolve(__dirname, "../");
const defaultDestination = path.resolve(projectDir, "src/components");

//ex: npm run create-component -- -c Test

const createNewDir = ({ path }) => {
  console.log("creating directory:", path);
  mkdirp.sync(path);
};

const createSassFile = ({ path, component }) => {
  fs.writeFileSync(
    `${path}/${component}.module.scss`,
    `.${component} {\r\r}`,
    "utf-8"
  );
};

const createTestFile = ({ path, component }) => {
  fs.writeFileSync(
    `${path}/${component}.spec.jsx`,
    `
import React from 'react';
import '@testing-library/jest-dom'
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import {render, fireEvent, waitFor, screen} from '@testing-library/react'

import ${component} from './${component}';

describe('${component}', () => {
    it('renders properly', () => {
        expect(true).toBeTruthy();
    })
})
        `
  );
};

const createComponentFile = ({ path, component, isCarbonComponent }) => {
  const componentTemplate = `
import React from 'react';
import classNames from 'classnames';
${
  isCarbonComponent
    ? "import {" + component + "} from 'carbon-components-react';"
    : ""
}

import styles from './${component}.module.scss';

export interface ${component}Props {
}

const ${component}: React.FC<${component}Props> = ({
    ...props
}) => <div data-testid="${component}" className={styles.${component}}></div>;

export default ${component};
`;

  fs.writeFileSync(`${path}/${component}.jsx`, componentTemplate, "utf-8");
};

const createStoryFile = ({ path, component }) => {
  const componentTemplate = `
import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';
import ${component}Component from './${component}';

// uncommment this line to include styles only for the story
// import styles from "./${component}.stories.module.scss"

export default {
    title: '${component}',
    component: ${component}Component
} as Meta;

export const Default = (args) => <${component}Component {...args} />
`;

  fs.writeFileSync(
    `${path}/${component}.stories.jsx`,
    componentTemplate,
    "utf-8"
  );
};

const run = () => {
  if (process.env.NODE_ENV !== "development") {
    throw new Error("Please run this via npm");
  }

  const { destination, component, carbonComponent } = commandLineArgs([
    { name: "component", alias: "c", type: String },
    {
      name: "destination",
      alias: "d",
      type: String,
      defaultValue: defaultDestination,
    },
    { name: "carbonComponent", alias: "C", type: Boolean },
  ]);

  const componentArgs = {
    path: `${destination}/${component}`,
    component,
    isCarbonComponent: carbonComponent,
  };

  createNewDir(componentArgs);
  createSassFile(componentArgs);
  createTestFile(componentArgs);
  createComponentFile(componentArgs);
  createStoryFile(componentArgs);
};

try {
  run();
} catch (err) {
  console.log(err.message);
  console.log(
    `${err.message}:`,
    colors.green(
      `npm run create-component -- ${process.argv
        .slice(process.argv.indexOf("--") - 1)
        .join(" ")}`
    ),
    "\n"
  );
}
