![Tests](https://github.com/nmathew98/papyrus/actions/workflows/main.yml/badge.svg)

## About

A lightweight PDF renderer for Node.

Uses [Pug](https://github.com/pugjs/pug) and [Puppeteer](https://github.com/puppeteer/puppeteer) to render PDFs.

## Features

- Compile HTML templates using Pug or bring your own templating engine ✅
- Render PDFs using Puppeteer or use a headless browser of your liking ✅
- Hookable PDF generation step ✅

## Usage (with the defaults of Pug and Puppeteer)

1. **Install Papyrus**

   `$: npm i -S @skulpture/papyrus`

2. **Import the makePapyrus function**

   `makePapyrus` requires a configuration object which has the following interface:

   `{ template: string, outputOptions: Record<string, any> }`

   `template` is the Pug template to use

   `outputOptions` is the options to pass to Puppeteer for PDF Generation (see the interface for the `options` object for `page.createPDFStream` [here](https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#pagecreatepdfstreamoptions))

   `// In your TypeScript or JavaScript file`

   `import makePapyrus from '@skulpture/papyrus'`

   `const papyrus = makePapyrus(configuration)`

3. **Use the resulting Papyrus object**

   `papyrus.print(data, transform)`

   `data` is the data you want to print

   `transform` an optional function to transform the data to the shape required for the Pug template

# Contribution

Contributions are welcome, just make a pull request
