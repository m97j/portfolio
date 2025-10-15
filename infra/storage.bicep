targetScope = 'resourceGroup'

@description('Location')
param location string = resourceGroup().location

@description('Storage account name')
param storageAccountName string

@description('Blob container name')
param storageContainerName string = 'portfolio-media'

@description('VNet/Subnet names')
param vnetName string = 'portfolio-vnet'
param peSubnetName string = 'peSubnet'

var peSubnetId = resourceId('Microsoft.Network/virtualNetworks/subnets', vnetName, peSubnetName)
var dnsBlobId  = resourceId('Microsoft.Network/privateDnsZones', 'privatelink.blob.core.windows.net')

resource sa 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: storageAccountName
  location: location
  sku: { name: 'Standard_LRS' }
  kind: 'StorageV2'
  properties: {
    supportsHttpsTrafficOnly: true
    minimumTlsVersion: 'TLS1_2'
    publicNetworkAccess: 'Enabled'
  }
}

resource container 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-01-01' = {
  name: '${sa.name}/default/${storageContainerName}'
  properties: { publicAccess: 'None' }
}

var storageKeys = sa.listKeys()
var storageKey  = storageKeys.keys[0].value

resource storagePe 'Microsoft.Network/privateEndpoints@2023-05-01' = {
  name: 'pe-storage'
  location: location
  properties: {
    subnet: { id: peSubnetId }
    privateLinkServiceConnections: [
      {
        name: 'pe-storage-conn'
        properties: {
          privateLinkServiceId: sa.id
          groupIds: [ 'blob' ]
        }
      }
    ]
  }
  dependsOn: [ sa ]
}

resource storagePeDns 'Microsoft.Network/privateEndpoints/privateDnsZoneGroups@2020-03-01' = {
  name: 'blob-dnsgrp'
  parent: storagePe
  properties: {
    privateDnsZoneConfigs: [
      { name: 'blobzone', properties: { privateDnsZoneId: dnsBlobId } }
    ]
  }
}
