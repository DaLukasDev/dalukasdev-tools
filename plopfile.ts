import { NodePlopAPI } from 'plop';

export default function (plop: NodePlopAPI) {
  plop.setGenerator('package', {
    description: 'Create a package in this monorepo',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your package name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/{{kebabCase name}}/src/index.ts',
        templateFile: 'plop-templates/package/src/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{kebabCase name}}/.eslintrc.js',
        templateFile: 'plop-templates/package/.eslintrc.js.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{kebabCase name}}/package.json',
        templateFile: 'plop-templates/package/package.json.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{kebabCase name}}/tsconfig.json',
        templateFile: 'plop-templates/package/tsconfig.json.hbs',
      },
    ],
  });
}
