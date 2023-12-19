import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk';
import schemas from './sanity/schemas'

const config = defineConfig({

    projectId: "59jzk62a",

    dataset: "production",

    title: "GRL PWR",

    apiVersion: "2023-11-01",

    basePath: "/admin",

    plugins: [deskTool()],

    schema: {types: schemas}

})

export default config;