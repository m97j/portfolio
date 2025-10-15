targetScope = 'resourceGroup'

@description('VNet name to link')
param vnetName string = 'portfolio-vnet'

var vnetId    = resourceId('Microsoft.Network/virtualNetworks', vnetName)
var dnsPgName = 'privatelink.postgres.database.azure.com'
var dnsBlobName = 'privatelink.blob.${environment().suffixes.storage}'
var dnsKvName = 'privatelink.vaultcore.azure.net'

resource dnsPg 'Microsoft.Network/privateDnsZones@2024-06-01' existing = {
  name: dnsPgName
}
resource dnsBlob 'Microsoft.Network/privateDnsZones@2024-06-01' existing = {
  name: dnsBlobName
}
resource dnsKv 'Microsoft.Network/privateDnsZones@2024-06-01' existing = {
  name: dnsKvName
}

resource linkPg 'Microsoft.Network/privateDnsZones/virtualNetworkLinks@2024-06-01' = {
  name: 'pg-link'
  parent: dnsPg
  properties: {
    virtualNetwork: { id: vnetId }
    registrationEnabled: false
  }
}

resource linkBlob 'Microsoft.Network/privateDnsZones/virtualNetworkLinks@2024-06-01' = {
  name: 'blob-link'
  parent: dnsBlob
  properties: {
    virtualNetwork: { id: vnetId }
    registrationEnabled: false
  }
}

resource linkKv 'Microsoft.Network/privateDnsZones/virtualNetworkLinks@2024-06-01' = {
  name: 'kv-link'
  parent: dnsKv
  properties: {
    virtualNetwork: { id: vnetId }
    registrationEnabled: false
  }
}
