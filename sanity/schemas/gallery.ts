import {defineField, defineType} from 'sanity'

export default defineType(

{
    name: 'gallery',
    title: 'Gallery',
    type: 'document',
    fields: [
      defineField({
        name: 'name',
        title: 'Name',
        type: 'string',
      }),
    defineField({
    name: 'images',
    title: 'Images',
    type: 'array',
    of: [
        {
          type: 'image',
        
    options: {hotspot: true},
    fields: [
        {
            name: 'alt',
            title: 'Alt',
            type: 'string'
        }
    ]}]})]})