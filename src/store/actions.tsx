
export function getAirtableApi(api) {
  return {
    type: "GET_API",
    airApi: api
  }
}

export function getAirtableBaseId(baseId) {
  return {
    type: "GET_BASEID",
    baseId: baseId
  }
}

export function getAirtableTableName(tableName) {
  return {
    type: "GET_TABLENAME",
    tableName: tableName
  }
}

export function getAirtableTableConnection() {
  return {
    type: "GET_CONNECTION",
    fetchUrl: true
  }
}

export function getAirtableData(data) {
  return {
    type: "GET_AIRTABLE_DATA",
    airtableData: data
  }
}
