const page = {

  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
       {
          name: 'title',
          title: 'Title',
          type: 'string'
       },
  
       {
          name: 'slug',
          title: 'Slug',
          type: 'slug',
          options: {
              source: 'title',
              maxLenght: 96,
          },
       },
       ({
        name: 'link',
        title: 'Link',
        type: 'string',
      }),

       {
        name: 'image',
        title: 'Image (Landskap)',
        type: 'image',
        options: {hotspot: true},
        fields: [

            {
                name: 'alt',
                title: 'Alt',
                type: 'string'
            }
        ]
    },

  
       {
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [{type: 'block'}],
  
       },
  ]
  };
  
  export default page;

