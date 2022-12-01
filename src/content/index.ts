console.info("[twitter-ads-blocker-webext] Hello world from content script")

const removeTwitterAds = () => {
  const twitter_ads_selector = document.evaluate(
    "//*[text()[contains(.,'Sponsorisé')]]",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE
  )

  for (var i = 0; i < twitter_ads_selector.snapshotLength; i++) {
    const element = twitter_ads_selector.snapshotItem(i)
    if (element) {
      try {
        const elmToDelete = (element as Element)?.closest(
          `[data-testid="cellInnerDiv"], [data-testid="UserCell"], [data-testid="trend"]`
        )
        elmToDelete?.remove()
      } catch (error) {}
    }
  }
}

setInterval(removeTwitterAds, 5000)
