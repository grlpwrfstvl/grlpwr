const artist = {
  name: 'artist',
  title: 'Artist',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },

    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'instagram',
      title: 'Instagram',
      type: 'string',
    },
    {
      name: 'spotify',
      title: 'Spotify',
      type: 'string',
    },

    {
      name: 'image',
      title: 'Image (Kvadrat)',
      type: 'image',
      options: { hotspot: true},
      fields:[
        {
          name: 'alt',
          title: 'Alt',
          type: 'string'
        }
      ]
      
    },
    {
        name: 'stage',
        title: 'Stage',
        type: 'string',
        options: {
          list: [
            {title: 'Tæps Scene', value: 'Tæps Scene'},
            {title: 'St. Croix Scene', value: 'St. Croix Scene'},
            {title: 'Klubbscenen', value: 'Klubbscenen'},
            {title: 'Kafescenen', value: 'Kafescenen'}

          ], 
          layout: 'radio'
        }
      },    
    {
        name: 'time',
        title: 'Time',
        type: 'datetime',
      },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
};

export default artist;
