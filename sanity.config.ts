import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk';
import schemas from './sanity/schemas'

const config = defineConfig({

    projectId: "59jzk62a",

    dataset: "production",

    "useCdn": false,

    title: "GRL PWR",

    apiVersion: "2024-02-20",

    basePath: "/admin",

    plugins: [deskTool()],

    schema: {types: schemas}

})

export default config;