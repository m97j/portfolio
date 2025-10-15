targetScope = 'resourceGroup'

resource dnsPg 'Microsoft.Network/privateDnsZones@2022-12-01' = {
  name: 'privatelink.postgres.database.azure.com'
  location: 'global'
}

resource dnsBlob 'Microsoft.Network/privateDnsZones@2022-12-01' = {
  name: 'privatelink.blob.core.windows.net'
  location: 'global'
}

resource dnsKv 'Microsoft.Network/privateDnsZones@2022-12-01' = {
  name: 'privatelink.vaultcore.azure.net'
  location: 'global'
}
