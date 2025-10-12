targetScope = 'subscription'

param resourceGroupName string
param resourceGroupLocation string = 'koreacentral'

resource rg 'Microsoft.Resources/resourceGroups@2024-11-01' = {
  name: resourceGroupName
  location: resourceGroupLocation
}

module infra 'infra-rg.bicep' = {
  name: 'infraDeployment'
  scope: rg
  params: {
    registryName: registryName
    frontendAppName: frontendAppName
    backendAppName: backendAppName
    postgresName: postgresName
    postgresDbName: postgresDbName
    administratorLogin: administratorLogin
    administratorLoginPassword: administratorLoginPassword
  }
}

param registryName string
param frontendAppName string
param backendAppName string
param postgresName string
param postgresDbName string = 'portfolio'
@secure()
param administratorLoginPassword string
param administratorLogin string = 'pgadmin'
