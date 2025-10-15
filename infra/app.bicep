targetScope = 'resourceGroup'

@description('Location')
param location string = resourceGroup().location

@description('App Service plan name')
param planName string = 'portfolio-plan'

@description('Frontend and Backend names')
param frontendAppName string
param backendAppName string

@description('Registry name')
param registryName string

@description('Dependent resource names')
param vnetName string = 'portfolio-vnet'
param appSubnetName string = 'appSubnet'
param keyVaultName string
param postgresName string
param postgresDbName string
param administratorLogin string
param storageAccountName string
param storageContainerName string

// Existing references
resource vnet 'Microsoft.Network/virtualNetworks@2023-05-01' existing = {
  name: vnetName
}
resource acr 'Microsoft.ContainerRegistry/registries@2023-01-01-preview' existing = {
  name: registryName
}
resource keyVault 'Microsoft.KeyVault/vaults@2023-07-01' existing = {
  name: keyVaultName
}
resource postgres 'Microsoft.DBforPostgreSQL/flexibleServers@2023-06-01' existing = {
  name: postgresName
}
resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' existing = {
  name: storageAccountName
}

var appSubnetId = resourceId('Microsoft.Network/virtualNetworks/subnets', vnetName, appSubnetName)
var acrLoginServer = '${registryName}.azurecr.io'

// App Service Plan
resource appServicePlan 'Microsoft.Web/serverfarms@2022-09-01' = {
  name: planName
  location: location
  sku: { name: 'B1', tier: 'Basic', size: 'B1', capacity: 1 }
  kind: 'linux'
  properties: { reserved: true }
}

// Frontend App
resource frontendApp 'Microsoft.Web/sites@2022-09-01' = {
  name: frontendAppName
  location: location
  kind: 'app,linux,container'
  identity: { type: 'SystemAssigned' }
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'DOCKER|${acrLoginServer}/${registryName}/frontend:latest'
      appSettings: []
    }
    httpsOnly: true
  }
}

// Backend App
resource backendApp 'Microsoft.Web/sites@2022-09-01' = {
  name: backendAppName
  location: location
  kind: 'app,linux,container'
  identity: { type: 'SystemAssigned' }
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'DOCKER|${acrLoginServer}/${registryName}/backend:latest'
      appSettings: [
        { name: 'POSTGRES_NAME', value: postgresName }
        { name: 'POSTGRES_DB', value: postgresDbName }
        { name: 'POSTGRES_USER', value: administratorLogin }
        { name: 'AZURE_STORAGE_ACCOUNT', value: storageAccountName }
        { name: 'AZURE_CONTAINER', value: storageContainerName }
        { name: 'POSTGRES_PASSWORD', value: '@Microsoft.KeyVault(VaultName=${keyVault.name};SecretName=POSTGRES-PASSWORD)' }
        { name: 'AZURE_STORAGE_KEY', value: '@Microsoft.KeyVault(VaultName=${keyVault.name};SecretName=AZURE-STORAGE-KEY)' }
        { name: 'JWT_SECRET', value: '@Microsoft.KeyVault(VaultName=${keyVault.name};SecretName=JWT-SECRET)' }
      ]
    }
    httpsOnly: true
  }
}

// VNet Integration
resource frontendVnetIntegration 'Microsoft.Web/sites/networkConfig@2022-03-01' = {
  name: 'virtualNetwork'
  parent: frontendApp
  properties: { subnetResourceId: appSubnetId }
}
resource backendVnetIntegration 'Microsoft.Web/sites/networkConfig@2022-03-01' = {
  name: 'virtualNetwork'
  parent: backendApp
  properties: { subnetResourceId: appSubnetId }
}

// ACR Pull Role Assignments
resource backendAcrPull 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = {
  name: guid(acr.id, backendApp.name, 'acrpull-backend')
  scope: acr
  properties: {
    roleDefinitionId: subscriptionResourceId(
      'Microsoft.Authorization/roleDefinitions',
      '7f951dda-4ed3-4680-a7ca-43fe172d538d'
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

// Key Vault Secret Reader Role Assignment
resource kvSecretReader 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = {
  name: guid(resourceGroup().id, backendApp.name, 'kv-secret-user')
  scope: keyVault
  properties: {
    principalId: backendApp.identity.principalId
    roleDefinitionId: subscriptionResourceId(
      'Microsoft.Authorization/roleDefinitions',
      '4633458b-17de-408a-b874-0445c86b69e6'
    )
  }
}
