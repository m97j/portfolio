targetScope = 'resourceGroup'

@description('VNet name to link')
param vnetName string = 'portfolio-vnet'

var vnetId   = resourceId('Microsoft.Network/virtualNetworks', vnetName)
var dnsPgId  = resourceId('Microsoft.Network/privateDnsZones', 'privatelink.postgres.database.azure.com')
var dnsBlobId= resourceId('Microsoft.Network/privateDnsZones', 'privatelink.blob.core.windows.net')
var dnsKvId  = resourceId('Microsoft.Network/privateDnsZones', 'privatelink.vaultcore.azure.net')

resource dnsPg 'Microsoft.Network/privateDnsZones@2022-12-01' existing = {
  name: 'privatelink.postgres.database.azure.com'
}
resource dnsBlob 'Microsoft.Network/privateDnsZones@2022-12-01' existing = {
  name: 'privatelink.blob.core.windows.net'
}
resource dnsKv 'Microsoft.Network/privateDnsZones@2022-12-01' existing = {
  name: 'privatelink.vaultcore.azure.net'
}

resource linkPg 'Microsoft.Network/privateDnsZones/virtualNetworkLinks@2022-12-01' = {
  name: 'pg-link'
  parent: dnsPg
  properties: {
    virtualNetwork: { id: vnetId }
    registrationEnabled: false
  }
  dependsOn: [ dnsPg ]
}

resource linkBlob 'Microsoft.Network/privateDnsZones/virtualNetworkLinks@2022-12-01' = {
  name: 'blob-link'
  parent: dnsBlob
  properties: {
    virtualNetwork: { id: vnetId }
    registrationEnabled: false
  }
  dependsOn: [ dnsBlob ]
}

resource linkKv 'Microsoft.Network/privateDnsZones/virtualNetworkLinks@2022-12-01' = {
  name: 'kv-link'
  parent: dnsKv
  properties: {
    virtualNetwork: { id: vnetId }
    registrationEnabled: false
  }
  dependsOn: [ dnsKv ]
}
