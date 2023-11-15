window.addEventListener('load', () => {
  const percentRange = 0.1; // 10% higher or lower
  const threeMostSuitableListings = [];
  const removeCommasAndDots = (str) => parseInt(str.replace(/[,\.]/g, ''));

  const currentListingPrice = removeCommasAndDots(document.querySelector('.listing-price').textContent) || false;
  const currentListingArea = document.querySelector('.listing-area').textContent;
  const currentListingPurpose = document.querySelector('.listing-purpose').textContent;

  console.log(`Current listing: price = ${currentListingPrice}, area = ${currentListingArea}, purpose = ${currentListingPurpose}`);

  const recommendedListings = document.querySelectorAll('.recommended-grid .recommended-item');

  // Get listings withing the same price range
  const listingsWithDifferences = Array.from(recommendedListings)
    .map((listing, i) => {
      const listingPrice = removeCommasAndDots(listing.querySelector('.listing-price').textContent) || false;
      const listingArea = listing.querySelector('.listing-area').textContent || false;
      const listingPurpose = listing.querySelector('.listing-purpose').textContent || false;

      const priceDifference = Math.abs(currentListingPrice - listingPrice);
      if (listingPurpose !== currentListingPurpose || priceDifference / currentListingPrice >= percentRange) return false;
      return {
        listingPrice,
        listingArea,
        priceDifference,
        index: i,
      };
    })
    .filter((listing) => listing)
    .sort((a, b) => a.priceDifference - b.priceDifference);

  threeMostSuitableListings.push(...listingsWithDifferences.slice(0, 3));
  // Display the listings if at least one is within the price range
  if (threeMostSuitableListings.length) {
    threeMostSuitableListings.forEach((listing) => {
      recommendedListings[listing.index].classList.add('is--active');
    });
  } else {
    // Not found any listing withing the price range, get the first three from the same area
    let count = 0;
    recommendedListings.forEach((listing) => {
      if (listing.querySelector('.listing-area').textContent === currentListingArea) {
        listing.classList.add('is--active');
        count++;
      }
      if (count === 3) return;
    });
    // If still not found, just use the first three
    if (count === 0) {
      recommendedListings.forEach((listing, i) => {
        if (i < 3) listing.classList.add('is--active');
      });
    }
  }
});
