const WEBFLOW_TOKEN = '';
const SITE_ID = '';
const COLLECTION_ID = '';

import { WebflowClient } from 'webflow-api';

const client = new WebflowClient({
  accessToken: WEBFLOW_TOKEN,
});

(async () => {
  try {
    let allItems = [];
    let offset = 0;
    let updatedCount = 0;
    let updateFailures = 0;
    const limit = 100;
    const batchSize = 10;

    const ALLOWED_CATEGORY_IDS = [
      '689278797f1b857908745f26',
      '686bf053f7abd8c52c077358',
      '689278a40823b3290e1ee631',
      '659d51dd82706890390c9573',
      '686bf00c0804c0b39158c0cd',
    ];
    const ALLOWED_TOPIC_IDS = [
      '686bf0309a8946f7a8af76bc',
      '659d51f8bc5fef03f8d36828',
      '659d51f26c96cf6f47f5cef3',
      '688baa9a88fe7bee9866583a',
      '6883fe3da1c35a89265bfa0e',
      '6883fd073dedb677f1890970',
      '6661697cc0be9e9c19c1003e',
    ];
    //-- Get collection
    // const collection = await client.collections.list(SITE_ID);
    // console.log('Collection fetched:', collection);

    //-- Get collection details/fields
    // const collectionDetails = await client.collections.get(COLLECTION_ID);
    // console.log('Collection details fetched:', collectionDetails);

    // Debug: Get collection details to understand field structure
    console.log('Fetching collection details...');
    const collectionDetails = await client.collections.get(COLLECTION_ID);
    console.log('Collection fields:', JSON.stringify(collectionDetails.fields, null, 2));

    // Get all collection items
    console.log('Fetching all items...');
    while (true) {
      const response = await client.collections.items.listItems(COLLECTION_ID, {
        offset: offset,
        limit: limit,
      });
      allItems = allItems.concat(response.items);
      console.log(`Fetched ${response.items.length} items (total: ${allItems.length})`);

      if (response.items.length < limit) break;
      offset += limit;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    console.log(`Total items fetched: ${allItems.length}`);

    if (allItems.length > 0) console.log('Sample item structure:', JSON.stringify(allItems[0], null, 2));

    // Update items
    for (let i = 0; i < allItems.length; i += batchSize) {
      const batch = allItems.slice(i, i + batchSize);
      console.log(`Processing batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(allItems.length / batchSize)}`);

      // Process items sequentially instead of parallel to avoid rate limits
      for (const item of batch) {
        let needsUpdate = false;
        const updateData = { fieldData: {} };

        // Check category
        if (item.fieldData.category) {
          if (!ALLOWED_CATEGORY_IDS.includes(item.fieldData.category)) {
            updateData.fieldData.category = null;
            needsUpdate = true;
            console.log(`Will clear category ${item.fieldData.category} for item: ${item.fieldData.name || item.id}`);
          }
        }

        // Check topics
        if (item.fieldData.topics && Array.isArray(item.fieldData.topics)) {
          const allowedTopics = item.fieldData.topics.filter((topicId) => ALLOWED_TOPIC_IDS.includes(topicId));

          if (allowedTopics.length !== item.fieldData.topics.length) {
            updateData.fieldData.topics = allowedTopics.length > 0 ? allowedTopics : [];
            needsUpdate = true;
            console.log(`Will update topics for item: ${item.fieldData.name || item.id}`);
            console.log(`Original topics: ${item.fieldData.topics.length}(${item.fieldData.topics.join(', ')})}, Filtered: ${allowedTopics.length}`);
          }
        }

        if (needsUpdate) {
          try {
            console.log(`Updating item ${item.id} with data:`, JSON.stringify(updateData, null, 2));

            const result = await client.collections.items.updateItem(COLLECTION_ID, item.id, {
              fieldData: updateData.fieldData,
              skipInvalidFiles: false,
            });

            updatedCount++;
            console.log(`Updated item: ${item.fieldData.name || item.id}`);
            console.log(`Total updated: ${updatedCount}, Total failed: ${updateFailures}`);
          } catch (error) {
            updateFailures++;
            console.error(`Failed to update ${item.id}:`, error.message);

            if (error.response) {
              console.error('Error response:', error.response.status, error.response.statusText);
              console.error('Error data:', error.response.data);
            }
            console.log(`Total updated: ${updatedCount}, Total failed: ${updateFailures}`);
          }

          // Add delay between individual updates
          await new Promise((resolve) => setTimeout(resolve, 700));
        }
      }

      // Delay between batches
      console.log('Waiting before next batch...');
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log('Completed!');
    console.log(`Final stats - Updated: ${updatedCount}, Failed: ${updateFailures}, Total items: ${allItems.length}`);
  } catch (error) {
    console.error('Script error:', error);
    if (error.response) {
      console.error('Error response:', error.response.status, error.response.statusText);
      console.error('Error data:', error.response.data);
    }
  }
})();
