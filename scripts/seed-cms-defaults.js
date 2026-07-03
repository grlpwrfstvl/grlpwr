// Populates new CMS fields on the home document with the current hardcoded defaults.
// Uses setIfMissing so it will never overwrite values you have already set in Sanity Studio.
//
// Usage:
//   SANITY_WRITE_TOKEN=<token> node scripts/seed-cms-defaults.js
//
// Get a write token at: https://www.sanity.io/manage → your project → API → Tokens
// The token needs "Editor" or "Administrator" permissions.

const { createClient } = require('@sanity/client');

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error('Error: SANITY_WRITE_TOKEN environment variable is not set.');
  console.error('Run: SANITY_WRITE_TOKEN=<your_token> node scripts/seed-cms-defaults.js');
  process.exit(1);
}

const client = createClient({
  projectId: '59jzk62a',
  dataset: 'production',
  apiVersion: '2024-02-20',
  token,
  useCdn: false,
});

const DEFAULTS = {
  ticketsLink: 'https://checkout.ebillett.no/178/events/151120/purchase/setup',
  eventYear: 2026,
  eventLocation: 'Fredrikstad',
  eventDates: '8. - 9. mai',
  festivalDays: [
    { _key: 'day-8', dayName: 'Fredag', displayDate: '8. mai', dayOfMonth: 8 },
    { _key: 'day-9', dayName: 'Lørdag', displayDate: '9. mai', dayOfMonth: 9 },
  ],
  primaryColor: '#e82265',
  secondaryColor: '#039645',
  accentColor: '#f8b9ce',
};

async function run() {
  const docs = await client.fetch('*[_type == "home"]{ _id, title }');

  if (docs.length === 0) {
    console.error('No home document found in Sanity. Create one in the Studio first.');
    process.exit(1);
  }

  for (const doc of docs) {
    console.log(`Patching "${doc.title ?? doc._id}" …`);
    await client.patch(doc._id).setIfMissing(DEFAULTS).commit();
    console.log(`  Done.`);
  }

  console.log('Seed complete. Fields that were already set in Sanity were left unchanged.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
