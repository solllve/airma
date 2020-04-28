
export function getAirtableApi(api) {
  return {
    type: "GET_API",
    airtableCreds: {
      airApi: api
    }
  }
}

export function getAirtableBaseId(baseId) {
  return {
    type: "GET_BASEID",
    airtableCreds: {
      baseId: baseId
    }
  }
}

export function getAirtableTableName(tableName) {
  return {
    type: "GET_TABLENAME",
    airtableCreds: {
      tableName: tableName
    }
  }
}
