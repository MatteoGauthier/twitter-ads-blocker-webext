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
        ) as HTMLElement
        if (elmToDelete) {
          elmToDelete.style.display = "none"
          console.log("[twitter-ads-blocker-webext] removed an ad")
        }
      } catch (error) {}
    }
  }
}

if (window.location.href.includes("twitter.com")) {
  console.log("[twitter-ads-blocker-webext] Extension is running")
  setInterval(removeTwitterAds, 10000)
}
