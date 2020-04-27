export function praiseCrom() {
  return {
    type: "PRAISE_CROM",
    showDoom: true
  }
}

export function getAirtable(apiKey) {
  return {
    type: "GET_API",
    airtableApi: apiKey
  }
}
