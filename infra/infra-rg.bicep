targetScope = 'resourceGroup'

@description('ACR registry name')
param registryName string

@description('Frontend App Service name')
param frontendAppName string

@description('Backend App Service name')
param backendAppName string

@description('PostgreSQL server name')
param postgresName string

@description('PostgreSQL database name')
param postgresDbName string

@description('PostgreSQL admin login')
param administratorLogin string

@secure()
@description('PostgreSQL admin password')
param administratorLoginPassword string

@description('Globally unique Storage Account name')
param storageAccountName string

@description('Blob container name')
param storageContainerName string = 'portfolio-media'

@description('Key Vault name')
param keyVaultName string

@secure()
@description('JWT signing secret')
param jwtSecret string

@description('Location')
param location string = resourceGroup().location

// --------------------- VNet & Subnets ---------------------
resource vnet 'Microsoft.Network/virtualNetworks@2023-05-01' = {
  name: 'portfolio-vnet'
  location: location
  properties: {
    addressSpace: {
      addressPrefixes: [ '10.10.0.0/16' ]
    }
    subnets: [
      {
        name: 'appSubnet'
        properties: { addressPrefix: '10.10.1.0/24' }
      }
      {
        name: 'pgSubnet'
        properties: {
          addressPrefix: '10.10.2.0/24'
          delegations: [
            {
              name: 'pgDelegation'
              properties: { serviceName: 'Microsoft.DBforPostgreSQL/flexibleServers' }
            }
          ]
        }
      }
      {
        name: 'peSubnet'
        properties: {
          addressPrefix: '10.10.3.0/24'
          privateEndpointNetworkPolicies: 'Disabled'
        }
      }
    ]
  }
}

var appSubnetId = '${vnet.id}/subnets/appSubnet'
var pgSubnetId = '${vnet.id}/subnets/pgSubnet'
var peSubnetId = '${vnet.id}/subnets/peSubnet'

// --------------------- Private DNS Zones ---------------------
resource dnsKv 'Microsoft.Network/privateDnsZones@2020-06-01' = {
  name: 'privatelink.vaultcore.azure.net'
  location: 'global'
}
resource dnsBlob 'Microsoft.Network/privateDnsZones@2020-06-01' = {
  name: 'privatelink.blob.${environment().suffixes.storage}'
  location: 'global'
}
resource dnsPg 'Microsoft.Network/privateDnsZones@2020-06-01' = {
  name: 'privatelink.postgres.database.azure.com'
  location: 'global'
}

resource dnsKvLink 'Microsoft.Network/privateDnsZones/virtualNetworkLinks@2020-06-01' = {
  name: 'kv-link'
  parent: dnsKv
  properties: {
    virtualNetwork: { id: vnet.id }
    registrationEnabled: false
  }
}
resource dnsBlobLink 'Microsoft.Network/privateDnsZones/virtualNetworkLinks@2020-06-01' = {
  name: 'blob-link'
  parent: dnsBlob
  properties: {
    virtualNetwork: { id: vnet.id }
    registrationEnabled: false
  }
}
resource dnsPgLink 'Microsoft.Network/privateDnsZones/virtualNetworkLinks@2020-06-01' = {
  name: 'pg-link'
  parent: dnsPg
  properties: {
    virtualNetwork: { id: vnet.id }
    registrationEnabled: false
  }
}

// --------------------- Storage Account ---------------------
resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: storageAccountName
  location: location
  sku: { name: 'Standard_LRS' }
  kind: 'StorageV2'
  properties: {
    supportsHttpsTrafficOnly: true
    minimumTlsVersion: 'TLS1_2'
    publicNetworkAccess: 'Disabled'
  }
}

resource blobContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-01-01' = {
  name: '${storageAccount.name}/default/${storageContainerName}'
  properties: { publicAccess: 'None' }
}

// Storage Key 조회 (함수 사용)
var storageKeys = storageAccount.listKeys()
var storageKey = storageKeys.keys[0].value

// Storage Private Endpoint
resource storagePe 'Microsoft.Network/privateEndpoints@2023-05-01' = {
  name: 'pe-storage'
  location: location
  properties: {
    subnet: { id: peSubnetId }
    privateLinkServiceConnections: [
      {
        name: 'pe-storage-conn'
        properties: {
          privateLinkServiceId: storageAccount.id
          groupIds: [ 'blob' ]
        }
      }
    ]
  }
}

resource storagePeDns 'Microsoft.Network/privateEndpoints/privateDnsZoneGroups@2020-03-01' = {
  name: 'blob-dnsgrp'
  parent: storagePe
  properties: {
    privateDnsZoneConfigs: [
      { name: 'blobzone', properties: { privateDnsZoneId: dnsBlob.id } }
    ]
  }
}

// --------------------- Key Vault ---------------------
resource keyVault 'Microsoft.KeyVault/vaults@2023-07-01' = {
  name: keyVaultName
  location: location
  properties: {
    tenantId: subscription().tenantId
    sku: { family: 'A', name: 'standard' }
    enableRbacAuthorization: true
    networkAcls: {
      defaultAction: 'Deny'
      bypass: 'AzureServices'
    }
  }
}

// Key Vault Private Endpoint
resource kvPe 'Microsoft.Network/privateEndpoints@2023-05-01' = {
  name: 'pe-keyvault'
  location: location
  properties: {
    subnet: { id: peSubnetId }
    privateLinkServiceConnections: [
      {
        name: 'pe-kv-conn'
        properties: {
          privateLinkServiceId: keyVault.id
          groupIds: [ 'vault' ]
        }
      }
    ]
  }
}

resource kvPeDns 'Microsoft.Network/privateEndpoints/privateDnsZoneGroups@2020-03-01' = {
  name: 'kv-dnsgrp'
  parent: kvPe
  properties: {
    privateDnsZoneConfigs: [
      { name: 'kvzone', properties: { privateDnsZoneId: dnsKv.id } }
    ]
  }
}

// Secrets 저장 (parent 사용)
resource storageKeySecret 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
  name: 'AZURE-STORAGE-KEY'
  parent: keyVault
  properties: { value: storageKey }
}
resource dbPasswordSecret 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
  name: 'POSTGRES-PASSWORD'
  parent: keyVault
  properties: { value: administratorLoginPassword }
}
resource jwtSecretRes 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
  name: 'JWT-SECRET'
  parent: keyVault
  properties: { value: jwtSecret }
}

// --------------------- ACR ---------------------
resource acr 'Microsoft.ContainerRegistry/registries@2023-01-01-preview' = {
  name: registryName
  location: location
  sku: { name: 'Basic' }
  properties: {}
}

// --------------------- PostgreSQL ---------------------
resource postgres 'Microsoft.DBforPostgreSQL/flexibleServers@2022-12-01' = {
  name: postgresName
  location: location
  sku: { name: 'Standard_B1ms', tier: 'Burstable' }
  properties: {
    administratorLogin: administratorLogin
    administratorLoginPassword: administratorLoginPassword
    version: '15'
    storage: { storageSizeGB: 32 }
    network: {
      delegatedSubnetResourceId: pgSubnetId
      privateDnsZoneArmResourceId: dnsPg.id
    }
    availabilityZone: '1'
    dataEncryption: { type: 'SystemManaged' }
  }
}

resource postgresDb 'Microsoft.DBforPostgreSQL/flexibleServers/databases@2022-12-01' = {
  name: postgresDbName
  parent: postgres
}

// --------------------- App Service Plan ---------------------
resource appServicePlan 'Microsoft.Web/serverfarms@2022-09-01' = {
  name: 'portfolio-plan'
  location: location
  sku: { name: 'B1', tier: 'Basic', size: 'B1', capacity: 1 }
  kind: 'linux'
  properties: { reserved: true }
}

// --------------------- Backend App Service ---------------------
resource backendApp 'Microsoft.Web/sites@2022-09-01' = {
  name: backendAppName
  location: location
  kind: 'app,linux,container'
  identity: { type: 'SystemAssigned' }
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'DOCKER|${acr.properties.loginServer}/${registryName}/backend:latest'
      appSettings: [
        // 비밀 아님: 평문 환경 변수
        { name: 'POSTGRES_NAME', value: postgresName }
        { name: 'POSTGRES_DB', value: postgresDbName }
        { name: 'POSTGRES_USER', value: administratorLogin }
        { name: 'AZURE_STORAGE_ACCOUNT', value: storageAccountName }
        { name: 'AZURE_CONTAINER', value: storageContainerName }

        // 비밀: Key Vault 참조
        { name: 'POSTGRES_PASSWORD', value: '@Microsoft.KeyVault(VaultName=${keyVault.name};SecretName=POSTGRES-PASSWORD)' }
        { name: 'AZURE_STORAGE_KEY', value: '@Microsoft.KeyVault(VaultName=${keyVault.name};SecretName=AZURE-STORAGE-KEY)' }
        { name: 'JWT_SECRET', value: '@Microsoft.KeyVault(VaultName=${keyVault.name};SecretName=JWT-SECRET)' }
      ]
    }
    httpsOnly: true
  }
}

// Backend VNet 통합
resource backendVnetIntegration 'Microsoft.Web/sites/networkConfig@2022-03-01' = {
  name: 'virtualNetwork'
  parent: backendApp
  properties: {
    subnetResourceId: appSubnetId
  }
}

// Key Vault Secret 접근 권한 (RBAC)
resource kvSecretReader 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = {
  name: guid(resourceGroup().id, backendApp.name, 'kv-secret-user')
  scope: keyVault
  properties: {
    principalId: backendApp.identity.principalId
    roleDefinitionId: subscriptionResourceId(
      'Microsoft.Authorization/roleDefinitions',
      '4633458b-17de-408a-b874-0445c86b69e6' // Key Vault Secrets User
    )
  }
}

// --------------------- Frontend App Service ---------------------
resource frontendApp 'Microsoft.Web/sites@2022-09-01' = {
  name: frontendAppName
  location: location
  kind: 'app,linux,container'
  identity: { type: 'SystemAssigned' }
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'DOCKER|${acr.properties.loginServer}/${registryName}/frontend:latest'
      appSettings: [
        // 프런트엔드가 공개값만 필요하다면 여기 추가 (예: PUBLIC_API_BASE_URL)
      ]
    }
    httpsOnly: true
  }
}

// Frontend VNet 통합 (필요 시)
resource frontendVnetIntegration 'Microsoft.Web/sites/networkConfig@2022-03-01' = {
  name: 'virtualNetwork'
  parent: frontendApp
  properties: {
    subnetResourceId: appSubnetId
  }
}

// --------------------- ACR Pull Role Assignments ---------------------
resource backendAcrPull 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = {
  name: guid(acr.id, backendApp.name, 'acrpull-backend')
  scope: acr
  properties: {
    roleDefinitionId: subscriptionResourceId(
      'Microsoft.Authorization/roleDefinitions',
      '7f951dda-4ed3-4680-a7ca-43fe172d538d' // AcrPull
    )
    principalId: backendApp.identity.principalId
  }
}

resource frontendAcrPull 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = {
  name: guid(acr.id, frontendApp.name, 'acrpull-frontend')
  scope: acr
  properties: {
    roleDefinitionId: subscriptionResourceId(
      'Microsoft.Authorization/roleDefinitions',
      '7f951dda-4ed3-4680-a7ca-43fe172d538d'
    )
    principalId: frontendApp.identity.principalId
  }
}
